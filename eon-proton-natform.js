/*******************************************
 *    @protonNatform
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.protonNatform = global.protonNatform || {})))
}(this, function (exports) {
  'use strict'

  // ... **returns nat projection**
  // ... ### functions
  // ... prtdef
  // ... return nat projection
  // ... # license
  // ... MIT

  async function protonNatform (__eo = {}) {
    let [
      muonNatform,
    ] = await Promise.all([
      __eo('xs').m('natform'),
    ])

    let enty = prtdef => muonNatform.natprojection(prtdef)
    return enty
  }

  exports.protonNatform = protonNatform
}))
