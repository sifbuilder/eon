/***************************
 *        @protonOrthographic
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.protonOrthographic = global.protonOrthographic || {})))
}(this, function (exports) {
  'use strict'

  async function protonOrthographic (__eo = {}) {
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

    let proton = d3Geo.geoProjection(projection())
      .clipAngle(90)

    let enty = proton
    return enty
  }

  exports.protonOrthographic = protonOrthographic
}))
