/***************************
 *        @forceMagnetic
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.forceMagnetic = global.forceMagnetic || {})))
}(this, function (exports) {
  'use strict'

  // https://bl.ocks.org/vasturiano/2da88fb89cc75d18b20d8a7776fd6860

  var forceMagnetic = function (__eo = {}) {
  // .................. force
    let force = function (params) {
      let d3_force = __eo('d3Force3d')

      let strength = params.strength || (() => 0.1)

      let d3src = (params.src !== undefined) ? params.src : d3_force // d3

      let d3force = d3src.forceMagnetic()
        .strength(strength)

      return d3force
    }

    // .................. enty
    var enty = function enty () {}
    enty.force = force
    return enty
  }

  exports.forceMagnetic = forceMagnetic
}))
