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

  // ... muonAnimation
  // ... animas, simnodes, anigrams, viewnodes
  // ... render viewnodes

  async function muonAnimation (__eo) {
    let [
      ctlTimer,
      muonEotim,
      renderRenderer,
    ] = await Promise.all([
      __eo('xs').c('timer'),
      __eo('xs').m('eotim'),
      __eo('xs').r('renderer'),
    ])

    let muonStore
    let muonSim

    let state = {}
    state.animas = [] // global animas

    const a = d => {
      let ret = []
      if (d === undefined) { // ret = []
      } else if (d === null) { // ret = []
      } else if (Array.isArray(d)) {
        ret = [...d]
      } else {
        ret = [d]
      }
      return ret
    }

    // ... getsims
    const getsims = (animas, elapsed) => {
      if (muonSim && typeof muonSim === 'object' && typeof muonSim.sim === 'function') {
        console.assert(muonSim !== undefined, `muonSim undefined`)

        let sim = muonSim.sim() // simulation on animas

        // let aninodes = animas.map(anitem => muonAnitem.snapani(anitem))
        let aninodes = animas

        muonSim.simulate(sim, aninodes, elapsed) // stored
      } else {

      }
      return muonStore.animasLive()
    }

    // ... sequence
    function sequence (items, fromitem) {
      function chain (items, index) {
        return (index === items.length)
          ? Promise.resolve()
          : Promise.resolve(fromitem(items[index])).then(() => chain(items, index + 1))
      }
      return chain(items, 0)
    }

    // ... getweens
    function getweens (animas, elapsed) {
      return sequence(animas, anima => muonStore.ween(anima))
    }

    // ... async animate
    function animate (time) {

      muonStore = __eo('muonStore')
      muonSim = __eo('muonSim')
      renderRenderer = __eo('renderRenderer')

      state.animas = muonStore.animasLive()

      state.anigrams = muonStore.anigrams()
      if (time !== undefined) {
        return animier(time)
      } else {
        if (state.animationStop === undefined) {
          state.animationStop = ctlTimer.subscribe(animier)
        }
        return state
      }
    }

    // ... collect
    function collect (animas, elapsed) {
      getweens(state.animas, elapsed)

      let animasLive = muonStore.animas()

      // _e_ getsims snapani for force properties - tbf
      let anisimmed = getsims(animasLive, elapsed)

      // _e_ double snapani in getsims - tbf
      anisimmed.map(ani => muonStore.gramm(ani))

      let anigrams = muonStore.anigrams()

      let featurecollection = {
        type: 'FeatureCollection',
        features: anigrams
          .filter(p => p.eofold !== null)
          .reduce((p, q, i) =>
            q.eofold.type === 'Feature'
              ? [...p, q.eofold] // Feature
              : [...p, ...q.eofold.features] // FeatureCollection
            , []),

      }
      return featurecollection
    }

    // ... ANIMIER
    function animier (elapsed, s) {
      // state = s || state

      muonStore = __eo('muonStore')
      state.animas = muonStore.animasLive()
      state.anigrams = muonStore.anigrams()

      if (0 && 1) console.log(` ******************* animas ${elapsed} ${state.animas.length}`, state.animas)
      if (0 && 1) console.log(` ******************* anigrams ${elapsed} ${state.animas.length}`, state.anigrams)

      // ... TIME
      state.animas = a(muonStore.animasLive())
      for (let i = 0; i < state.animas.length; i++) {
        let anima = state.animas[i]
        anima.eotim = muonEotim.timing(anima.eotim, elapsed) // set time

        // if (elapsed > anima.eotim.msLimit + anima.eotim.msStart) {
        // anima.eodelled = 1 // crop by time
        // }
        if (anima.eotim.unElapsed > anima.eotim.unEnd) {
          anima.eodelled = 1 // crop by time
        }
      }

      // ... @STOP
      let maxlimit = state.animas.reduce((pre, item) => Math.max(pre, item.eotim.unEnd), 0)
      let overtime = state.animas.reduce((pre, item) => (pre && item.eotim.unTime > item.eotim.unEnd), true)
      let nostop = state.animas.reduce((pre, item) => (pre || item.eotim.nostop), 0)

      if (!nostop &&
        isNaN(maxlimit) &&
        maxlimit > 0 &&
        overtime // stop if spired
      ) { // stop if anigrams spired
        state.animationStop()
      }

      // ... @WEEN SIM GRAMM RENDER
      // ... from the anigrams, collect the feature collection to be rendered

      let featurecollection = collect(state.animas, elapsed)

      // ... then render by sort the features in the collection
      renderRenderer.render(featurecollection, elapsed)

      // return { dat: featurecollection, t: elapsed }
      return featurecollection
      // return state
    }

    // ............................. enty
    let enty = {}
    enty.animier = animier
    enty.animate = animate
    enty.animationStop = () => state.animationStop
    return enty
  }

  exports.muonAnimation = muonAnimation
}))
