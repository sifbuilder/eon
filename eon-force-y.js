/***********
   *    @forceY
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.forceY = global.forceY || {})))
}(this, function (exports) {
  'use strict'

  let forceY = function (__mapper = {}) {
  // .................. force
    let force = function (params) {
      let d3_force = __mapper('d3Force3d')

      let position = params.position || 0
      let strength = params.strength || (() => 0.1)

      let d3src = (params.src !== undefined) ? params.src : d3_force // d3

      let d3force = d3src.forceY(position)    // forceY
        .strength(strength)

      return d3force
    }

    // .................. enty
    var enty = function () {}
    enty.force = force
    return enty
  }

  exports.forceY = forceY
}))
