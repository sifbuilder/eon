/**********************
 *    @haloGeojson
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloGeojson = global.haloGeojson || {})))
}(this, function (exports) { "use strict"

  let haloGeojson = function haloGeojson(__mapper = {}) {

    let f = __mapper("props")(),
				mgeoj = __mapper("xs").m("geoj"),
				mprofier = __mapper("xs").m("profier"),
				mboform = __mapper("xs").m("boform"),
				mric = __mapper("xs").m("ric"),
				mstace = __mapper("xs").m("stace")

    let _geoform = p => ({     // geoform
      type:  "Feature",
      geometry: {"type": "Point","coordinates": [0, 0]},
      properties: {sort: "feature", }})

  /**********************
   *    @gramify
   */
  let gramn = function (anima, newAnigrams=[]) {
		if (0 && 1) console.log("anima",anima)
		let ani = __mapper("xs").m("anitem")(anima),
			anigram = ani.anigram(),            	// anigram
			boform =  ani.boform(),             	// boform
			ric =   	ani.ric(),               		// ric
			payload = ani.payload(),            	// payload
			proform = ani.proform(),            	// proform
			conform = ani.conform(),            	// conform
			geoform = ani.geoform() || _geoform,  // geoform
			json

		if (geoform) json = (typeof geoform === "function") ? geoform(anigram) : geoform // geoform
		if (conform) json = mprofier.getProjier(conform, anigram)(json)  		// conform
		if (proform) json =  mprofier.getProformer(proform, anigram)(json)	// proform
		if (boform) json = mboform.boformer(boform, anigram)(json)   				// boform
		if (ric) json = mric.ricker(ric, anigram)(json)  							 			// ric


		if (1 && 1) console.log("json",json)

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
