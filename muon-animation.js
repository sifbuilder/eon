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

   async function muonAnimation(__mapper) {

    let [
          mprops,
          mstore,
          msim,
          mtim,
          msnap,
          rcanvas,
          rsvg,
          rwebgl,
          rrenderport,
          ctimer,
      ] = await Promise.all( [
          __mapper('xs').m('props'),
          __mapper('xs').m('store'),
          __mapper('xs').m('sim'),
          __mapper('xs').m('tim'),
          __mapper('xs').m('snap'),
          __mapper('xs').r('canvas'),
          __mapper('xs').r('svg'),
          __mapper('xs').r('webgl'),
          __mapper('xs').r('renderport'),
          __mapper('xs').c('timer'),
        ]
      )

    let state = {}
    state.animas = [] // global animas


    // .................. getsims
    const getsims = (animas, elapsed) => {

        let sim = msim.sim() // simulation on animas
        msim.simulate(sim, animas, elapsed)	// stored
        return mprops.a(mstore.animasLive())
        
    }

    // .................. getweens
    const getweens = async (animas, elapsed) => {

      // let promises = animas.map(anima => mstore.ween(anima))
      // Promise.all(promises)
        // .then((resolved) => {
          // let newAnimas = resolved.reduce((p, q) => [...p, ...q], [])
          // mstore.apply({type: 'UPDANIMA', animas: newAnimas})
        // })
        // .catch(e => {console.log(e)})
      // return mprops.a(mstore.animasLive())
 
      let newAnimas = animas.map(anima => mstore.ween(anima))
      let allAnimas = mstore.animasLive()
   
      return allAnimas
      
    }

    // .................. getgramms
    const getgramms = (animas, elapsed) => {
if (1 && 1) console.log('animas', animas)   
      let newAnigrams = animas.map(anima => mstore.gramm(anima)) // stores anigrams
if (1 && 1) console.log('newAnigrams', newAnigrams)   
      let allAnigrams = mstore.anigrams()
if (1 && 1) console.log('allAnigrams', allAnigrams)
      
      return allAnigrams

    }
 
     // .................. aniListener
    function animate () {   

        if (state.animationStop === undefined) {
          if (1 && 1) console.log(' ------------------- animate')
          state.animationStop = ctimer.subscribe(aniListener)
        }    
        
    }

    // .................. aniListener
    function aniListener (elapsed) {


    // .................. register aniListener
      mstore = __mapper('muonStore')  // store in mapper
    
      state.animas = mstore.animasLive()
      if (1 && 1) console.log(' _____________________________ aniListener', state.animas.length, elapsed)


    // .................. time
      state.animas = mprops.a(mstore.animasLive())
      for (let i = 0; i < state.animas.length; i++) {
        let anima = state.animas[i]
        anima.payload.tim = mtim.timing(anima.payload.tim, elapsed) // set time
        if (elapsed > anima.payload.tim.limit + anima.payload.tim.msStart) {
          anima.payload.delled = 1 // crop by time
        }
      }

      // ............................. @STOP
      let maxlimit = state.animas.reduce((pre, item) => Math.max(pre, item.payload.tim.limit + item.payload.tim.msStart), 0)

      let nostop = state.animas.reduce((pre, item) => (pre || item.payload.tim.nostop), false)

      if (!nostop && (isNaN(maxlimit) ||
            (maxlimit > 0 && elapsed > maxlimit) || // stop if spired
            (elapsed > maxlimit) )) { // stop if anigrams spired

        state.animationStop()

      }

      // ............................. @WEEN SIM GRAMM RENDEr

      getweens(state.animas, elapsed)
      .then(animas => {
        return getsims(state.animas)
      })
      .then(animas => {
        return getgramms(state.animas)
      })
      .then(anigrams => {
        let featurecollection = { type: 'FeatureCollection', features: anigrams.map(d => d.geofold) }
        rsvg.render(elapsed, featurecollection)
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
