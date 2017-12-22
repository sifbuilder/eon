/**********************
 *      @bosonGramify
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.bosonGramify = global.bosonGramify || {})))
}(this, function (exports) { "use strict"

  let bosonGramify = function bosonGramify(__mapper) {

    /****************************
   *    @enty
   */
    let gramify = function (anima, newAnigrams=[]) {

      let ani = __mapper("xs").m("anitem")(anima)

      let stace =   ani.stace(),                // stace
        proform = ani.proform(),                // proform
        conform = ani.conform(),                // conform
        geoform = ani.geoform()                 // geoform

      let json = (typeof geoform === "function") ? geoform(ani.anigram()) : geoform

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

      newAnigrams = __mapper("xs")
        .m("geoj").zorder(__mapper("xs")
          .m("geoj").featurize(json, ani.anigram()))


      return newAnigrams
    }

    let enty = anima =>  gramify(anima)

    return enty

  }

  exports.bosonGramify = bosonGramify

}));
