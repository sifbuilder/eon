/**********************
 *    @haloCore
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloCore = global.haloCore || {})))
}(this, function (exports) { "use strict"

  let haloCore = function haloCore(__mapper = {}) {

   /**********************
   *    @enty
   */
    let enty = function enty() {}
    
    enty.ween = anima => (anima.inited !== true) ? (anima.inited = anima.gelded = true, [anima]) : []
    enty.gramn = anima => Array.of(__mapper("xs").m("anitem")(anima).anigram())

    return enty

  }

  exports.haloCore = haloCore

}));
