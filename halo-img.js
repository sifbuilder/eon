/***********
 *    @haloImg
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloImg = global.haloImg || {})))
}(this, function (exports) { "use strict"

  let haloImg = function haloImg(__mapper = {}) {

    let f = __mapper("props")(),
				mgeoj = __mapper("xs").m("geoj"),
				mprofier = __mapper("xs").m("profier"),
				mboform = __mapper("xs").m("boform"),
				mric = __mapper("xs").m("ric"),
				mstace = __mapper("xs").m("stace")

    let _geoform = p => ({     // geoform
      type:  "Feature",
      geometry: {

        "type": "Point",
        "coordinates": [0, 0]

      },
      properties: {
				sort: "img",
        attr: {
          "width": p.payload.img.width,
          "height": p.payload.img.height,
          ["xlink:href"]: p.payload.img.url,
        }
      }
    })

    let gramn = function gramn(anima, newAnigrams = []) {

		let ani = __mapper("xs").m("anitem")(anima),
			anigram = ani.anigram(),            // anigram
			boform =  ani.boform(),             // boform
			ric =   	ani.ric(),               	// ric
			payload = ani.payload(),            // payload
			proform = ani.proform(),            // proform
			conform = ani.conform(),            // conform
			geoform = ani.geoform() || _geoform,   // geoform
			json


			if (geoform) json = (typeof geoform === "function") ? geoform(anigram) : geoform // geoform
			if (conform) json = mprofier.getProjier(conform, anigram)(json)  		// conform
			if (proform) json =  mprofier.getProformer(proform, anigram)(json)	// proform
			if (boform) json = mboform.boformer(boform, anigram)(json)   				// boform
			if (ric) json = mric.ricker(ric, anigram)(json)  							 			// ric
			
			
			json.properties.sort = "img"


			anigram.featurecollection = mgeoj.geonormalize(json)
			newAnigrams.push(anigram)

      return newAnigrams
    }

    /***************************
 *        @enty
 */
    let enty = function enty() {}
    enty.ween = anima => (anima.inited !== true) ? (anima.inited = true, [anima]) : []
    enty.gramn = anima  => gramn(anima)

    return enty

  }

  exports.haloImg = haloImg

}));
