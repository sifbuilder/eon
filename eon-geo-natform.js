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


  async function geoNatform (__mapper = {}) {
    let mnat = await __mapper('xs').m('nat'),
      d3 = await __mapper('d3')

    let cache = {} // points, form

    // ............................. pointStream
    let pointStream = function (prjdef) {
      let natPoint = mnat.natVertex(prjdef.form) // m.nat.natVertex (a,b,c) => [a,b,c]

      let stream = function (lambda, phi, radio = 1) {
        this.stream.point(...natPoint(lambda, phi, radio))
      }

      return stream
    }

    // ............................. natprofion
    let natprofion = prjdef => {		// projection:natPoint, form:{x,y,z}
      let geoTrans = d3.geoTransform({
        point: pointStream(prjdef)})

      let geoProj = p => geoTrans(p)

      geoProj.stream = s => geoTrans.stream(s)

      return geoProj
    }

    // ............................. enty
    let enty = function (prjdef = {}) {
      return natprofion(prjdef)
    }

    return enty
  }

  exports.geoNatform = geoNatform
}))
