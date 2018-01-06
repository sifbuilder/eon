/******************************************
  *       @muonAnimation
  *
  **/
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.muonAnimation = global.muonAnimation || {})))
}(this, function (exports) { "use strict"

  let muonAnimation = function muonAnimation(__mapper) {

    let f = __mapper("props")()
    let state = {}
        state.animas = []              // global animas

		let mstore = 	__mapper("xs").m("store")
    /*******************************************
     *
     *      @aniListener
     *
     **/
    let aniListener =  function aniListener(elapsed) {

      state.animas = f.a(__mapper("muonStore").animasLive() )

      if (0 && 1) console.log(" .............. animas", elapsed, state.animas.length)

    /*******************************************
     *    @TIME
     */
      state.animas = f.a(__mapper("muonStore").animasLive() )
      for (let i=0; i<state.animas.length; i++) {

        let anima = state.animas[i]
        anima.tim  = __mapper("bosonTim")(anima.tim, elapsed) // set time
        if (elapsed > anima.tim.limit) {
          anima.delled = 1        // crop by time
        }
      }

    /*******************************************
     *    @STOP
     */
      let maxlimit = state.animas.reduce((pre,item) => Math.max(pre,item.tim.limit),0)
      if (isNaN(maxlimit)) state.animationStop()
      if (maxlimit > 0 && elapsed > maxlimit)   state.animationStop()    // stop if spired
      if (elapsed > maxlimit)   state.animationStop()    // stop if anigrams spired

    /*******************************************
     *    @WEEN generate animas and offsprings
     */
      for (let i=0; i<state.animas.length; i++) {

        let anima  = state.animas[i]                     // each anima in animas live
        let newAnimas = __mapper("xs").m("store").ween(anima)   // has generated animas
        __mapper("xs").m("store").apply({"type":"UPDANIMA","caller":"alima","animas":newAnimas})

      }
      state.animas = f.a(__mapper("muonStore").animasLive() )

    /*******************************************
     *    @SIM defaults position of nodes
     */
      let sim = __mapper("xs").m("simulation").sim()     // simulation on animas
      state.animas =  __mapper("xs").m("simulation").simulate(sim, state.animas, elapsed)

    /*******************************************
     *    @GRAMN animas to anigrams
     */
      let anigrams = __mapper("xs").m("store").anigrams()

      for (let i=0; i<state.animas.length; i++) {
				let anima = state.animas[i]
if (0 && 1) console.log("animation anima ",i, anima)
        let newAnigrams = f.a(mstore.gramn(anima)) /* GRAMN */
if (0 && 1) console.log("animation newAnigrams ",i, newAnigrams)
        __mapper("xs").m("store").apply({"type":"UPDANIGRAM","caller":"m.animation","anigrams":newAnigrams})

      }

      anigrams = __mapper("xs").m("store").anigrams()

if (0 && 1) console.log("animation anigrams ",anigrams)
    /*******************************************
    *     @RENDER
    */

			// let features = __mapper("xs").m("geoj").zorder(anigrams.map(d => d.gjson))
			// let featurecollection = { type: 'FeatureCollection',features: features }
			let featurecollection = anigrams.map(d => d.featurecollection)
if (0 && 1) console.log("animation features ", featurecollection.features)			
	
      if (__mapper("renderSVG") !== undefined) __mapper("renderSVG").render(elapsed, featurecollection)
      if (__mapper("renderWebgl") !== undefined) __mapper("renderWebgl").render(elapsed, featurecollection )
      if (__mapper("renderCanvas") !== undefined) __mapper("renderCanvas").render(elapsed, featurecollection )

    }

    /*******************************************
     *     @LISTENER
     */
     if (state.animationStop === undefined) state.animationStop = __mapper("xs").c("timer").subscribe(aniListener)

  /*******************************************
   *      @enty
   */
    function enty() {}

        enty.animationStop = () => state.animationStop

    return enty

  }

  exports.muonAnimation = muonAnimation

}));
