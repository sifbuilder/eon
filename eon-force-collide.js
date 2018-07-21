/***********
   *    @forceCollide
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.forceCollide = global.forceCollide || {})))
}(this, function (exports) {
  'use strict'

  var forceCollide = function (__mapper = {}) {
  // .................. force
    let force = function (params) {
      let d3_force = __mapper('d3Force3d')

      let strength = params.strength || 1
      let radius = params.radii || 12

      let d3src = (params.src !== undefined) ? params.src : d3_force // d3

      let d3force = d3src.forceCollide(radius)
        .strength(strength)

      return d3force
    }

    var enty = function () {}
    enty.force = force
    return enty
  }

  exports.forceCollide = forceCollide
}))
