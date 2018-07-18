/***************************
 *        @forceCenter
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.forceCenter = global.forceCenter || {})))
}(this, function (exports) {
  'use strict'

  var forceCenter = function forceCenter (__mapper = {}) {
  // .................. force
    let force = function (params) {
      let d3_force = __mapper('d3Force3d')
      let x = params.center.x || 0
      let y = params.center.y || 0
      let z = params.center.z || 0

      let d3src = (params.src !== undefined) ? params.src : d3_force // d3

      let d3force = d3src.forceCenter(x, y, z)

      return d3force
    }

    var enty = function () {}
    enty.force = force

    return enty
  }

  exports.forceCenter = forceCenter
}))
