/******************************************
  *       @eonMuonAnimation
  *
  **/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonMuonAnimation = global.eonMuonAnimation || {})))
}(this, function (exports) {
  'use strict'

  // ... eonMuonAnimation
  // ... animas, simnodes, anigrams, viewnodes
  // ... render viewnodes

  async function eonitem (__eo) {
    let [
      eonCtlTimer,
      eonMuonEotim,
      eonRenderRenderer,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-timer'),
      __eo('xs').b('eon-muon-eotim'),
      __eo('xs').b('eon-render-renderer'),
    ])

    let eonMuonStore
    let eonMuonSim

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
      if (eonMuonSim && typeof eonMuonSim === 'object' && typeof eonMuonSim.sim === 'function') {
        console.assert(eonMuonSim !== undefined, `eonMuonSim undefined`)

        let sim = eonMuonSim.sim() // simulation on animas

        // let aninodes = animas.map(anitem => eonMuonAnitem.snapani(anitem))
        let aninodes = animas

        eonMuonSim.simulate(sim, aninodes, elapsed) // stored
      } else {

      }
      return eonMuonStore.animasLive()
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

    // ... genAnimasFromStore
    function genAnimasFromStore (animas, elapsed) {
      return sequence(animas, anima => eonMuonStore.anify(anima))
    }

    // ... async animate
    function animate (time) {

      eonMuonStore = __eo('eonMuonStore')
      eonMuonSim = __eo('eonMuonSim')
      eonRenderRenderer = __eo('eonRenderRenderer')

      state.animas = eonMuonStore.animasLive()

      state.anigrams = eonMuonStore.anigrams()
      if (time !== undefined) {
        return animier(time)
      } else {
        if (state.animationStop === undefined) {
          state.animationStop = eonCtlTimer.subscribe(animier)
        }
        return state
      }
    }

    // ... collect
    function collect (animas, elapsed) {
      let promise = genAnimasFromStore(state.animas, elapsed)

      let animasLive = eonMuonStore.animas()

      // _e_ getsims snapani for force properties - tbf
      let anisimmed = getsims(animasLive, elapsed)

      // _e_ double snapani in getsims - tbf
      anisimmed.map(ani => eonMuonStore.gramify(ani))

      let anigrams = eonMuonStore.anigrams()

      let featurecollection = {
        type: 'FeatureCollection',
        features: anigrams
          .filter(p => p.eofold !== null)
          .filter(p => p.eofold !== undefined)
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

      eonMuonStore = __eo('eonMuonStore')
      state.animas = eonMuonStore.animas()
      state.anigrams = eonMuonStore.anigrams()

      if (0 && 1) console.log(` ================= ${parseInt(elapsed)} ${state.animas.length}`, state.animas)
      if (0 && 1) console.log(` ----------------- ${parseInt(elapsed)} ${state.anigrams.length}`, state.anigrams)

      // ... TIME
      state.animas = a(eonMuonStore.animasLive())
      for (let i = 0; i < state.animas.length; i++) {
        let anima = state.animas[i]
        anima.eotim = eonMuonEotim.timing(anima.eotim, elapsed) // set time

        if (anima.eotim.unElapsed > anima.eotim.unEnd && !anima.eotim.nostop) {
          anima.eodelled = 1 // crop by time _e_
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

      // ... @ANIFY SIM GRAMIFY RENDER
      // ... from the anigrams, collect the feature collection to be rendered

      let featurecollection = collect(state.animas, elapsed)
      state.featurecollection = featurecollection
      state.elapsed = elapsed

      // ... then render by sort the features in the collection
      eonRenderRenderer.render(featurecollection, elapsed)
      
      return state
    }

    // ............................. enty
    let enty = {}
    enty.animier = animier
    enty.animate = animate
    enty.animationStop = () => state.animationStop
    return enty
  }

  exports.eonMuonAnimation = eonitem
}))
