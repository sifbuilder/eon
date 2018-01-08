/*******************************************
 *    @geoAniwen
 *
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.geoAniwen = global.geoAniwen || {})))
}(this, function (exports) { "use strict"

  let geoAniwen = function geoAniwen(__mapper = {}) {

    let g = __mapper("xs").m("geom")
    let mwen = __mapper("xs").m("wen")
    let cwen = __mapper("xs").c("wen")

    let state = {},
      scale  = [1, 1, 1],
      rotate = [0, 0, 0],
      translate = [0, 0, 0],
      center = [0, 0, 0],
      focale = Infinity,
      zafin = [0,1]


    let proform = function() {
      let geoTrans = d3.geoTransform({
        point: pointStreamInverse // pointStream // inverse stream
      })
      let geoProj = p => geoTrans(p)
      geoProj.stream = s =>  geoTrans.stream(s)
      return geoProj
    }


    /****************************
   *    @enty
   */
    let enty = function (p={}) {
      let m =  proform(p)
      m.translate = _ => _ !== undefined ? (translate = _, m) : m
      m.rotate = _ => _ !== undefined ? (rotate = _, m) : m

      m.scale = _ => _ !== undefined ? (scale = _, m) : m
      m.focale = _ => _ !== undefined ? (focale = _, m) : m
      m.zafin = _ => _ !== undefined ? (zafin = _, m) : m

      return m

    }

    return enty
  }

  exports.geoAniwen = geoAniwen

}));
