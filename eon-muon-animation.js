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

  // md: muonAnimation
  // md: animas, simnodes, anigrams, viewnodes
  // md: render viewnodes

  async function muonAnimation (__mapper) {
    let [
      ctlTimer,
      muonEotim,
      muonSim,
      muonStore,
      muonProps,
      renderSvg,
    ] = await Promise.all([
      __mapper('xs').c('timer'),
      __mapper('xs').m('eotim'),
      __mapper('xs').m('sim'),
      __mapper('xs').m('store'),
      __mapper('xs').m('props'),
      __mapper('xs').r('svg'),
    ]
    )

    let state = {}
    state.animas = [] // global animas
    state.promise = null

    // .................. getsims
    const getsims = (animas, elapsed) => {
      let sim = muonSim.sim() // simulation on animas
      muonSim.simulate(sim, animas, elapsed) // stored
      return muonStore.animasLive()
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
      return sequence(animas, anima => muonStore.ween(anima))
    }

    // .................. getgramms
    function getgramms (animas, elapsed) {
      return sequence(animas, anima => muonStore.gramm(anima)) // store anigrams
    }

    // .................. animate
    async function animate (time) {
      if (time !== undefined) {
        animier(time)
      } else {
        if (state.animationStop === undefined) {
          state.animationStop = ctlTimer.subscribe(animier)
        }
      }
    }

    // .................. collect
    async function collectDyn (animas, elapsed) {
      let featurecollectionPromise = Promise.resolve(state.animas)
        .then(animas => {
          // md: get animas from eohal.ween
          // md: animas reside in the store

          getweens(animas, elapsed)
        })
        .then(animas => {
          // md: animas are subject to fields
          // md: fields are d3.forces and act upon nodes or anisims
          // md: the field nodes correlate with the animas geonodes

          return getsims(muonStore.animasLive())
        })
        .then(anisimmed => {
          // md: animas reveal anigrams at any point in time
          // md: anigrams reside in a different section of the store

          return getgramms(anisimmed)
        })
        .then(() => {
          // md: only feature collection can be rendered
          // md: and that is the feature collection of the existing anigrams
          // md: all the information to render an anigram must be in its eofold

          let featurecollection = {
            type: 'FeatureCollection',
            features: muonStore.anigrams().map(d => d.eofold),
          }
          return featurecollection
        })

      return featurecollectionPromise
    }

    // .................. collect
    function collect (animas, elapsed) {
      getweens(state.animas, elapsed)
      
      let animasLive = muonStore.animasLive()
      if (1 && 1) console.log('animasLive', animasLive.length, animasLive)

      let anisimmed = getsims(animasLive)
      if (1 && 1) console.log('anisimmed', anisimmed.length, anisimmed)
      
      anisimmed.map(ani => muonStore.gramm(ani))
      
      let featurecollection = {
        type: 'FeatureCollection',
        features: muonStore.anigrams().map(d => d.eofold),
      }
      return featurecollection
    }

    // ............................. ANIMIER
    function animier (elapsed) {
      muonStore = __mapper('muonStore')
      state.animas = muonStore.animasLive()

      if (1 && 1) console.log(` ................ animation ${elapsed} ${state.animas.length}`, state.animas)

      // ............................. TIME
      state.animas = muonProps.a(muonStore.animasLive())
      for (let i = 0; i < state.animas.length; i++) {
        let anima = state.animas[i]
        anima.eotim = muonEotim.timing(anima.eotim, elapsed) // set time

        if (elapsed > anima.eotim.limit + anima.eotim.msStart) {
          anima.eodelled = 1 // crop by time
        }
      }

      // ............................. @STOP
      let maxlimit = state.animas.reduce((pre, item) => Math.max(pre, item.eotim.limit + item.eotim.msStart), 0)

      let nostop = state.animas.reduce((pre, item) => (pre || item.eotim.nostop), false)

      if (!nostop && (isNaN(maxlimit) ||
            (maxlimit > 0 && elapsed > maxlimit) || // stop if spired
            (elapsed > maxlimit))) { // stop if anigrams spired
        state.animationStop()
      }

      // ............................. @WEEN SIM GRAMM RENDER
      // md: from the anigrams, collect the feature collection to be rendered

      // let featurecollectionPromise = collect(state.animas, elapsed)
      let featurecollection = collect(state.animas, elapsed)
      renderSvg.render(featurecollection)

      // md: then render by sort the features in the collection

      // featurecollectionPromise
      // .then(featurecollection => {
      // renderSvg.render(featurecollection)
      // })
    }

    // ............................. enty
    let enty = {}
    enty.animate = animate
    enty.animationStop = () => state.animationStop
    return enty
  }

  exports.muonAnimation = muonAnimation
}))
