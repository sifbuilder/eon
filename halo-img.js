/***********
 *    @haloImg
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloImg = global.haloImg || {})))
}(this, function (exports) { "use strict"

  let haloImg = function haloImg(__mapper = {}) {

    let f = __mapper("props")()
		let mgeoj = __mapper("xs").m("geoj")

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
        anigram = ani.anigram(),             // anigram
        stace =   ani.stace(),               // stace
        proform = ani.proform(),             // proform
        geoform = ani.geoform()              // geoform				
				
      let json
			if (geoform) json = (typeof geoform === "function") ? geoform(ani.anigram()) : geoform 
      if (proform) json = __mapper("xs").m("profier").getProjier(proform)(json)
      if (stace) json =  __mapper("xs").m("stace").getLocifier(anigram)(json)

			
			json = __mapper("xs").m("boform").boformer(anigram)(json)   // boform
			json = __mapper("xs").m("ric").ricker(anigram)(json)   // boform
			json.properties.sort = "img"
			
			
      let featurecollection = mgeoj.geonormalize(json)
			anigram.featurecollection = featurecollection
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
