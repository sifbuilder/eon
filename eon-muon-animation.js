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
    const getweens = (animas, elapsed) => {
      sequence(animas, anima => mstore.ween(anima))
      return mstore.animasLive()
    }

    // .................. getgramms
    const getgramms = (animas, elapsed) => {
      sequence(animas, anima => mstore.gramm(anima)) // store anigrams
      return mstore.anigrams() // get anigrams from store
    }

    // .................. aniListener
    function animate () {
      if (state.animationStop === undefined) {
        state.animationStop = ctimer.subscribe(aniListener)
      }
    }

    // .................. aniListener
    function aniListener (elapsed) {
      console.log(` ................................... animation ${elapsed} ${state.animas.length}`)      
      mstore = __mapper('muonStore') // store with state from __mapper
      state.animas = mstore.animasLive()

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
            (elapsed > maxlimit))) { // stop if anigrams spired
        state.animationStop()
      }

      // ............................. @WEEN SIM GRAMM RENDEr
      Promise.resolve(state.animas)
        .then(animas => {
          return getweens(animas, elapsed)
        })
        .then(animas => getsims(animas))
        .then(animas => {
          let anigrams = getgramms(animas)
          return anigrams
        })
        .then(anigrams => {
          return { type: 'FeatureCollection', features: anigrams.map(d => d.geofold) }
        })
        .then(featurecollection => {
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
