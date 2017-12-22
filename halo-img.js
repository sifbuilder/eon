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

    let gramn = function gramn(anima, newAnigrams = []) {

      let ani = __mapper("xs").m("anitem")(anima)
      let stace =   ani.stace(),                // stace
        geoform = ani.geoform()                 // geoform

      let newAnigram = ani.anigram()

      let json = (typeof geoform === "function") ? geoform(ani.anigram()) : geoform

      if (stace) {
        let lociformer =  __mapper("xs").m("stace").getLociform(ani.anigram())
        json =  __mapper("xs").b("proj3ct")(json, lociformer)  // lociform
      }

      let feature = json
          feature.id = newAnigram.uid

      newAnigram.sort = "img"
      newAnigram.feature = feature

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
