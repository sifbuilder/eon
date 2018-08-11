/******************************************
  *       @muonAnimation
  *
  **/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonAnimation = global.muonAnimation || {})))
}(this, function (exports) {
  'use strict'

  async function muonAnimation (__mapper) {
    let [
      mprops,
      mstore,
      msim,
      mtim,
      rsvg,
      ctimer,
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').m('store'),
      __mapper('xs').m('sim'),
      __mapper('xs').m('tim'),
      __mapper('xs').r('svg'),
      __mapper('xs').c('timer'),
    ]
    )

    let state = {}
    state.animas = [] // global animas
    state.promise = null

    // .................. getsims
    const getsims = (animas, elapsed) => {
      let sim = msim.sim() // simulation on animas
      msim.simulate(sim, animas, elapsed) // stored
      return mstore.animasLive()
    }

    // .................. sequence
    function sequence (items, fromitem) {
      function chain (items, index) {
        return (index === items.length)
          ? Promise.resolve()
          : Promise.resolve(fromitem(items[index])).then(() => chain(items, index + 1))
      }
      return chain(items, 0)
    }

    // .................. getweens
     function getweens (animas, elapsed) {
      return sequence(animas, anima => mstore.ween(anima))
        // sequence(animas, anima => mstore.ween(anima))
        // then(sequenced => {
              // return mstore.animasLive()
        // })
        // return mstore.animasLive()
    }

    // .................. getgramms
     function getgramms (animas, elapsed) {
        return sequence(animas, anima => mstore.gramm(anima)) // store anigrams
          // .then(sequenced => {
              // return mstore.anigrams()
        // })
      // return mstore.anigrams() // get anigrams from store
    }

    // .................. animate
    async function animate (time) {
        
        if (time !== undefined ) {
          
          animier(time)
        
        } else {
          
          if (state.animationStop === undefined) {
            state.animationStop = ctimer.subscribe(animier)
          }
          
        }


    }

     // .................. collect
    async function collect (animas, elapsed) {
      let featurecollectionPromise = Promise.resolve(state.animas)
        .then(animas => {
          getweens(animas, elapsed)
            // .then(weened => mstore.animasLive())
          // if (1 && 1) console.log('weened', weened)
          // return weened
        })
        .then(animas => {
           let simmed = getsims(mstore.animasLive())
          if (1 && 1) console.log('simmed', simmed)
           return simmed
        })
        .then(anisimmed => {
            return getgramms(anisimmed)
          // let anigrams = getgramms(anisimmed)
          // if (1 && 1) console.log('anigrams', anigrams)
          // return anigrams
        })
        .then(() => {
          // if (1 && 1) console.log('anigrams', anigrams)          
          let featurecollection = { type: 'FeatureCollection', features: mstore.anigrams().map(d => d.geofold) }
          if (1 && 1) console.log('featurecollection', featurecollection)          
          return featurecollection
        })
        .catch(e => { console.log(e) })

        return featurecollectionPromise
    }

    // ............................. ANIMIER
    function animier (elapsed) {
      console.log(` ................................... animation ${elapsed} ${state.animas.length}`)
      mstore = __mapper('muonStore') // store with state from __mapper
      state.animas = mstore.animasLive()

      // ............................. TIME
      state.animas = mprops.a(mstore.animasLive())
      for (let i = 0; i < state.animas.length; i++) {
        let anima = state.animas[i]
        anima.payload.tim = mtim.timing(anima.payload.tim, elapsed) // set time
        if (1 && 1) console.log('tim', anima.payload.tim)

        if (elapsed > anima.payload.tim.limit + anima.payload.tim.msStart) {
          anima.payload.delled = 1 // crop by time
        }
      }

      // ............................. @STOP
      let maxlimit = state.animas.reduce((pre, item) => Math.max(pre, item.payload.tim.limit + item.payload.tim.msStart), 0)

      let nostop = state.animas.reduce((pre, item) => (pre || item.payload.tim.nostop), false)

      if (!nostop && (isNaN(maxlimit) ||
            (maxlimit > 0 && elapsed > maxlimit) || // stop if spired
            (elapsed > maxlimit))) { // stop if anigrams spired
        state.animationStop()
      }

      // ............................. @WEEN SIM GRAMM RENDER
      let featurecollectionPromise = collect (state.animas, elapsed)
      featurecollectionPromise
        .then(featurecollection =>  {
          if (1 && 1) console.log('featurecollection', featurecollection)

            rsvg.render(featurecollection)
        })

    }


    // ............................. enty
    function enty () {}
    enty.animate = animate
    enty.animationStop = () => state.animationStop
    return enty
  }

  exports.muonAnimation = muonAnimation
}))
