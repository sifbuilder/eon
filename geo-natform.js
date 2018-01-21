/*******************************************
 *    @geoNatform
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.geoNatform = global.geoNatform || {})))
}(this, function (exports) {
  'use strict'

  let geoNatform = function geoNatform (__mapper = {}) {

    let state = {},
      scale = [1, 1, 1],
      rotate = [0, 0, 0],
      translate = [0, 0, 0],
      focale = Infinity,
      zafin = [0, 1],
      dims = 3

    let pointStream = function (p) { // anitem or form
      let form = (p.form !== undefined) ? p.form : p
if (1 && 1) console.log("form", form)			
      let natform = __mapper('xs').m('nat').natform(form) // m.nat.natform
		
      let stream = function (lambda, phi, radio = 1) {
        this.stream.point(...natform(lambda, phi, radio))
      }
			
      return stream
    }

    let proform = function (p) {
      let geoTrans = d3.geoTransform({
        point: pointStream(p)})
      let geoProj = p => geoTrans(p)
      geoProj.stream = s => geoTrans.stream(s)
      return geoProj
    }

    /****************************
   *    @enty
   */
    let enty = function (p = {}) {
      let m = proform(p)

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
