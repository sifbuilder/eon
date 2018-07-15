/*******************************************
 *    @prjNatform
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.prjNatform = global.prjNatform || {})))
}(this, function (exports) {
  'use strict'

  async function prjNatform (__mapper = {}) {
    let [
      mnat,
      d3,
    ] = await Promise.all([
      __mapper('xs').m('nat'),
      __mapper('xs').b('d3'),
    ])

    // ............................. pointStream
    let pointStream = function (prjdef) {
      let natPoint = mnat.natVertex(prjdef.form) // m.nat.natVertex (a,b,c) => [a,b,c]

      let stream = function (lambda, phi, radio = 1) {
        this.stream.point(...natPoint(lambda, phi, radio))
      }

      return stream
    }

    // ............................. natprofion
    let natprofion = prjdef => { // projection:natPoint, form:{x,y,z}
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

  exports.prjNatform = prjNatform
}))
