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
    ] = await Promise.all([
      __mapper('xs').m('nat'),
    ])

    let enty = prjdef => mnat.natprojection(prjdef)
    return enty
  }

  exports.prjNatform = prjNatform
}))
