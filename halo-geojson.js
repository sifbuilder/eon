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
      geometry: {"type": "Point","coordinates": [0, 0, 0]},
      properties: {sort: "feature", }})

  /**********************
   *    @gramify
   */
  let gramm = function (anima, newAnigrams=[]) {
		if (0 && 1) console.log(" ---------- h.geojson anima",anima)
		let ani = __mapper("xs").m("anitem")(anima),
			anigram = ani.anigram(),            	// anigram
			payload = ani.payload(),            	// payload
			boform =  ani.boform(),             	// boform
			ric =   	ani.ric(),               		// ric
			tim =   	ani.tim(),               		// tim
			proform = ani.proform(),            	// proform
			conform = ani.conform(),            	// conform
			parentuid = ani.parentuid(),          // parentuid
			geoform = ani.geoform() || _geoform,  // geoform
			geonode = anigram.payload.geonode,				// geonode
			json

		if (0 && 1) console.log(" ---------- h.geojson anigram", anigram)
		if (0 && 1) console.log(" ---------- h.geojson anima", anima)


		json = f.v(geoform, anigram)

		json = mprofier.projier(f.v(conform, anigram), anigram)(json)
		json = mprofier.proformer(f.v(proform, anigram), anigram)(json)






		let fileffect =  {
					"projection": "uniwen",
					"translate": [  geonode.geometry[0], geonode.geometry[1], geonode.geometry[2] ]}
		json =  mprofier.projier(fileffect, anigram)(json)

	



		json = mboform.boformer(anigram, json)	// boform
		json = mgeoj.featurize(json) 										// featurize
		json = mgeoj.zorder(json) 											// order
		json = mric.qualier(ric, anigram, json)					// qualify




		if (0 && 1) console.log(" ---------- h.geojson json",json)

		newAnigrams = json.features.map( (d, i) => {
			let newAnigram = Object.assign({}, anigram)
					newAnigram.payload.feature = d
					newAnigram.payload.ric = d.properties.ric
					newAnigram.payload.uid = d.id
			return newAnigram
		})

		return newAnigrams

  }

  /**********************
   *    @enty
   */
    let haloGeojson_ween = anima => (anima.payload.inited !== true) ? (anima.payload.inited = anima.payload.gelded = true, [anima]) : []
    let haloGeojson_gramm = anima => gramm(anima)

    let haloGeojson = {}
        haloGeojson.ween = anima => haloGeojson_ween(anima)
        haloGeojson.gramm = anima => haloGeojson_gramm(anima)

    let enty = haloGeojson

    return enty

  }

  exports.haloGeojson = haloGeojson

}));
