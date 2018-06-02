/*******************************************
 *      @forcecenter
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.forcecenter = global.forcecenter || {})))
}(this, function (exports) {
  'use strict'

  var forcecenter = function forcecenter (__mapper = {}) {
    let props = __mapper('xs').m('props')

    /***********
		*		@force
		*/
    let force = function (params) {
      let x = params.center.x || 0
      let y = params.center.y || 0
      let z = params.center.z || 0

      let d3src = (params.src !== undefined) ? params.src : d3 // d3_force

      let d3force = d3src.forceCenter(x, y, z)

      return d3force
    }

    var enty = function () {}
    enty.force = force

    return enty
  }

  exports.forcecenter = forcecenter
}))
