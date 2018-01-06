/**********************
 *    @haloGeojson
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloGeojson = global.haloGeojson || {})))
}(this, function (exports) { "use strict"

  let haloGeojson = function haloGeojson(__mapper = {}) {

    let f = __mapper("props")()
		let mgeoj = __mapper("xs").m("geoj")

  /**********************
   *    @gramify
   */
  let gramn = function (anima, newAnigrams=[]) {
		if (0 && 1) console.log("anima",anima)
		let ani = __mapper("xs").m("anitem")(anima),
			anigram = ani.anigram(),             // anigram
			stace =   ani.stace(),               // stace
			ereform = ani.ereform(),             // ereform
			proform = ani.proform(),             // proform
			conform = ani.conform(),             // conform
			geoform = ani.geoform()              // geoform

		let json 
		if (geoform) json = (typeof geoform === "function") ? geoform(anigram) : geoform // geoform
		if (conform) json = __mapper("xs").m("profier").getProjier(conform)(json)  // conform
		if (stace)   json = __mapper("xs").m("stace").getReffier(anigram)(json)    // refform
		if (proform) json = __mapper("xs").m("profier").getProjier(proform)(json)  // proform
		if (stace)   json = __mapper("xs").m("stace").getLocifier(anigram)(json)   // lociform

		json = __mapper("xs").m("boform").boformer(anigram)(json)   // boform
		json = __mapper("xs").m("ric").ricker(anigram)(json)   // boform
		
		anigram.featurecollection = mgeoj.geonormalize(json)
		newAnigrams.push(anigram)

		return newAnigrams

  }

  /**********************
   *    @enty
   */
    let haloGeojson_ween = anima => (anima.inited !== true) ? (anima.inited = anima.gelded = true, [anima]) : []
    let haloGeojson_gramn = anima => gramn(anima)

    let haloGeojson = {}
        haloGeojson.ween = anima => haloGeojson_ween(anima)
        haloGeojson.gramn = anima => haloGeojson_gramn(anima)

    let enty = haloGeojson

    return enty

  }

  exports.haloGeojson = haloGeojson

}));
