/***********
 *    @haloText
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloText = global.haloText || {})))
}(this, function (exports) { "use strict"

  let haloText = function (__mapper = {}) {

    let f = __mapper("props")(),
				mgeoj = __mapper("xs").m("geoj"),
				mprofier = __mapper("xs").m("profier"),
				mboform = __mapper("xs").m("boform"),
				mric = __mapper("xs").m("ric"),
				mstace = __mapper("xs").m("stace")

    let _geoform = function (p) {     // geoform

      let payload = p.payload,
        text = payload.text,         // needs text
        boform = p.boform || {}

      let json = {
          type:  "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {
            text: text.text,
            style: {

              ["rotate"]: text.style["rotate"],
              ["font-size"]: text.style["font-size"],
              ["font-family"]: text.style["font-family"],
              ["text-anchor"]: text.style["text-anchor"],

              "width": text.style.width,
              "height": text.style.height,

              "dx": text.style.dx,
              "dy": text.style.dy,

              "textLength": text.style.textLength,
              "lengthAdjust": text.style.lengthAdjust,

            }
          }
      }
      return json

    }

    let gramm = function gramm(anima, newAnigrams = []) {

		let ani = __mapper("xs").m("anitem")(anima),
			anigram = ani.anigram(),            // anigram
			boform =  ani.boform(),             // boform
			ric =   	ani.ric(),               	// ric
			payload = ani.payload(),            // payload
			proform = ani.proform(),            // proform
			conform = ani.conform(),            // conform
			geoform = ani.geoform() || _geoform,   // geoform
			json
			
			anima.payload.geoform = geoform
			newAnigrams = __mapper("xs").h("geojson").gramm(anima)
			
      return newAnigrams
			
    }


/***************************
 *        @enty
 */

    let haloText_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloText_gramm = anima => gramm(anima)

    let haloText = {}
        haloText.ween = anima => haloText_ween(anima)
        haloText.gramm = anima => haloText_gramm(anima)

    let enty = haloText

    return enty

  }

  exports.haloText = haloText

}));
