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

    let geoform = p => ({     // geoform
      type:  "Feature",
      geometry: {

        "type": "Point",
        "coordinates": [0, 0]

      },
      properties: {
        attr: {
          "width": p.payload.img.width,
          "height": p.payload.img.height,
          ["xlink:href"]: p.payload.img.url,
        }
      }
    })

    let gramn = function gramn(anima, newAnigrams = []) {

      let ani = __mapper("xs").m("anitem")(anima),
        anigram = ani.anigram(),
        stace =   ani.stace(),
        geoform = ani.geoform() || geoform

      let json = (typeof geoform === "function") ? geoform(ani.anigram()) : geoform

      if (stace) {
          json =  __mapper("xs").m("stace").getLociformer(anigram)(json)  // lociform
      }

      let newAnigram = ani.anigram()

      newAnigram.sort = "img"
      newAnigram.feature = json
      newAnigram.feature.id = newAnigram.uid

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

}))
