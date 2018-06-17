/******************************************
  *       @bosonAnimation
  *
  **/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.bosonAnimation = global.bosonAnimation || {})))
}(this, function (exports) {
  'use strict'

  async function bosonAnimation(__mapper) {

    let ctimerPromise = 	__mapper('xs').c('timer'),
      propsPromise = __mapper('xs').m('props'),
      mstorePromise = 	__mapper('xs').m('store'),
      msimPromise = 	__mapper('xs').m('sim'),
      mtimPromise = 	__mapper('xs').m('tim')

  let [ctimer, f, mstore, msim, mtim] 
      = await Promise.all([ctimerPromise, propsPromise, mstorePromise, msimPromise, mtimPromise])
      
    let state = {}
    state.animas = [] // global animas


  // .................. register aniListener
    if (state.animationStop === undefined) {
      state.animationStop = ctimer.subscribe(aniListener)  
    }
  
  // .................. aniListener
    function aniListener (elapsed) {
      
      state.animas = f.a(mstore.animasLive())

  // .................. time
      state.animas = f.a(mstore.animasLive())
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
      

      // ............................. @WEEN generate animas and offsprings
      for (let i = 0; i < state.animas.length; i++) {
        let anima = state.animas[i] // each anima in animas live
        let newAnimas = mstore.ween(anima) // has generated animas
        mstore.apply({'type': 'UPDANIMA', 'caller': 'animation', 'animas': newAnimas})
      }
      state.animas = f.a(mstore.animasLive())
      

      // ............................. @SIM defaults position of nodes  
      let sim = msim.sim() // simulation on animas

      msim.simulate(sim, state.animas, elapsed)	// stored

      state.animas = f.a(mstore.animasLive())
      

      // ............................. @GRAMM animas to anigrams      
      for (let i = 0; i < state.animas.length; i++) {
        let anima = state.animas[i]

        let newAnigrams = []
        
        
        //md: mstore.gramm calls UPDANIGRAM
        //md: anigrams geofolds are saved in the proformed domain
        newAnigrams = f.a(mstore.gramm(anima)) /* GRAMM */
        
      }

      let anigrams = mstore.anigrams()

      // ............................. render
      let featurecollection = { 'type': 'FeatureCollection', 'features': anigrams.map(d => d.geofold) }

      if (__mapper('renderSvg') !== undefined) __mapper('renderSvg').render(elapsed, featurecollection)
      if (__mapper('renderWebgl') !== undefined) __mapper('renderWebgl').render(elapsed, featurecollection)
      if (__mapper('renderCanvas') !== undefined) __mapper('renderCanvas').render(elapsed, featurecollection)
    }


  // ............................. enty
    function enty () {}

    enty.animationStop = () => state.animationStop

    return enty
  }

  exports.bosonAnimation = bosonAnimation
}))
