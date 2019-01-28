/***************************
 *        @prtOrthographic
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.prtOrthographic = global.prtOrthographic || {})))
}(this, function (exports) {
  'use strict'

  async function prtOrthographic (__eo = {}) {
    let [
      d3Geo,
    ] = await Promise.all([
      __eo('xs').b('d3-geo'),
    ])

    let prtRaw = d3Geo.geoOrthographicRaw // prtRaw

    let projection = function (x, y) {
      let forward = (x, y) => prtRaw(x, -y)
      forward.invert = (x, y) => prtRaw.invert(x, -y)
      return forward
    }

    let prt = d3Geo.geoProjection(projection())
      .clipAngle(90)

    let enty = prt
    return enty
  }

  exports.prtOrthographic = prtOrthographic
}))
