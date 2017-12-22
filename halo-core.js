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
    
    enty.ween = anima => (anima.inited !== true) ? (anima.inited = true, [anima]) : []
    enty.gramn = anima => Array.of(__mapper("xs").b("snap")(anima, anima.tim.unitTime))

    return enty

  }

  exports.haloCore = haloCore

}));
