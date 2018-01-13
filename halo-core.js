/**********************
 *    @haloCore
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloCore = global.haloCore || {})))
}(this, function (exports) { "use strict"

  let haloCore = function haloCore(__mapper = {}) {

    let haloCore_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloCore_gramm = anima => Array.of(__mapper("xs").m("anitem")(anima).anigram())
  
    /**********************
    *    @enty
    */
    let haloCore = {}
        haloCore.ween = anima => haloCore_ween(anima)
        haloCore.gramm = anima => haloCore_gramm(anima)
        
    let enty = haloCore

    return enty

  }

  exports.haloCore = haloCore

}));
