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
        ereform = ani.ereform(),             // ereform
        proform = ani.proform(),             // proform
        conform = ani.conform(),             // conform
        geoform = ani.geoform() || _geoform  // geoform

				
      let json = (typeof geoform === "function") ? geoform(ani.anigram()) : geoform // geoform

			
			
if (1 && 1) console.log("h.img.gramn json ",json)					

      if (stace) json =  __mapper("xs").m("stace").getLocifier(anigram)(json)  // lociform

      if (proform) json = __mapper("xs").m("profier").getProjier(proform)(json)  // proform

			
			let properties = json.properties
					properties.ric = anigram.ric
					properties.sort = "img"
			
			
			
      let newAnigram = ani.anigram()
			
					newAnigram.gjson = json						// feature is transformed geojson
			
      newAnigrams.push(newAnigram)

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
