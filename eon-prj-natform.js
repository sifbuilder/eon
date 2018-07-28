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
      d3geo,
    ] = await Promise.all([
      __mapper('xs').m('nat'),
      __mapper('xs').b('d3-geo'),
    ])

    let enty = prjdef => mnat.natprojection(prjdef)
    return enty
  }

  exports.prjNatform = prjNatform
}))
