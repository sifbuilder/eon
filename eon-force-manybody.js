/***************************
 *        @forceManybody
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.forceManybody = global.forceManybody || {})))
}(this, function (exports) {
  'use strict'

  let forceManybody = function (__mapper = {}) {
  // .................. force
    let force = function (params) {
      let d3_force = __mapper('d3Force3d')
      let strength = params.strength || (() => 0.1)
      let theta = params.theta || (() => 0.9)

      let d3src = (params.src !== undefined) ? params.src : d3_force // d3

      let d3force = d3src.forceManyBody()
        .strength(strength)
        .theta(theta)

      return d3force
    }

    // .................. enty
    var enty = function enty () {}
    enty.force = force
    return enty
  }

  exports.forceManybody = forceManybody
}))
