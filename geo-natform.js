/*******************************************
 *    @geoNatform
 *
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.geoNatform = global.geoNatform || {})))
}(this, function (exports) { "use strict"

  let geoNatform = function geoNatform(__mapper = {}) {

    let f = __mapper("props")()
    let g = __mapper("xs").m("geom")
    let mwen = __mapper("xs").m("wen")
    let cwen = __mapper("xs").c("wen")

    const geoscale = extent => d3.scaleLinear().domain(extent[0]).range(extent[1])
    const cos = Math.cos, sin = Math.sin
    const neg = x =>  x < 0 || (x === 0 && (1/x < 0))
    const pos = x =>  x > 0 || (x === 0 && (1/x > 0))
    const radians = Math.PI / 180
    const tau = 2 * Math.PI

    let state = {},
      scale  = [1, 1, 1],
      rotate = [0, 0, 0],
      translate = [0, 0, 0],
      focale = Infinity,
      zafin = [0,1],
      dims = 3

    let pointStream = function(props) {
      let form = (props.form !== undefined) ? props.form : props  // anitem or form
      let natform =  __mapper("xs").m("nat").natform(form)
      let natstream = function (lambda, phi, radio=1) {
          this.stream.point(...natform(lambda, phi, radio))
      }
      return natstream
    }

    let proform = function(props) {
      let geoTrans = d3.geoTransform({
        point: pointStream(props)})
      let geoProj = p => geoTrans(p)
      geoProj.stream = s =>  geoTrans.stream(s)
      return geoProj
    }

    /****************************
   *    @enty
   */
    let enty = function (props={}) {
      let m =  proform(props)

      m.translate = _ => _ !== undefined ? (translate = _, m) : m
      m.rotate = _ => _ !== undefined ? (rotate = _, m) : m

      m.scale = _ => _ !== undefined ? (scale = _, m) : m
      m.focale = _ => _ !== undefined ? (focale = _, m) : m
      m.zafin = _ => _ !== undefined ? (zafin = _, m) : m

      return m

    }

    return enty
  }

  exports.geoNatform = geoNatform

}))
