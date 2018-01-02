/**********************
 *    @haloCore
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloCore = global.haloCore || {})))
}(this, function (exports) { "use strict"

  let haloCore = function haloCore(__mapper = {}) {

    let haloCore_ween = anima => (anima.inited !== true) ? (anima.inited = anima.gelded = true, [anima]) : []
    let haloCore_gramn = anima => Array.of(__mapper("xs").m("anitem")(anima).anigram())
  
    /**********************
    *    @enty
    */
    let haloCore = {}
        haloCore.ween = anima => haloCore_ween(anima)
        haloCore.gramn = anima => haloCore_gramn(anima)
        
    let enty = haloCore

    return enty

  }

  exports.haloCore = haloCore

}));
