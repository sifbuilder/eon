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

    /**********************
   *    @gramify
   */
   let gramify = function (anima, newAnigrams=[]) {

      let ani = __mapper("xs").m("anitem")(anima)

      let stace =   ani.stace(),                // stace
        ereform = ani.ereform(),                // ereform
        proform = ani.proform(),                // proform
        conform = ani.conform(),                // conform
        geoform = ani.geoform()                 // geoform

      let json = (typeof geoform === "function") ? geoform(ani.anigram()) : geoform


      if (ereform) {
          let ereformer = __mapper("xs").b("gist")(ereform)
          json =  __mapper("xs").b("proj3ct")(json, ereformer)  // ereform
      }

      if (conform) {
          let conformer = __mapper("xs").b("gist")(conform)
          json =  __mapper("xs").b("proj3ct")(json, conformer)  // conform
      }

      if (stace) {
          let reformer = __mapper("xs").m("stace").getReform(stace)
          json =  __mapper("xs").b("proj3ct")(json, reformer)      // reform
      }

      if (proform) {
          let proformer = __mapper("xs").b("gist")(proform)
          json =  __mapper("xs").b("proj3ct")(json, proformer)  // proform
      }

      if (stace) {
          let lociformer =  __mapper("xs").m("stace").getLociform(ani.anigram())
        json =  __mapper("xs").b("proj3ct")(json, lociformer)  // lociform
      }

  
      newAnigrams =  __mapper("xs").m("geoj").geojize(json, ani.anigram())

      return newAnigrams
    }
    
    
    /**********************
   *    @enty
   */
    let enty = function enty() {}
    enty.ween = anima => (anima.inited !== true) ? (anima.inited = true, [anima]) : []
    enty.gramn = anima => gramify(anima)
    enty.gramify = gramify

    return enty

  }

  exports.haloGeojson = haloGeojson

}));
