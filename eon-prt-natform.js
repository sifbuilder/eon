/*******************************************
 *    @prtNatform
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.prtNatform = global.prtNatform || {})))
}(this, function (exports) {
  'use strict'

  // # eon-prt-natform
  // **returns nat projection**

  // ### functions
  // pointStream
  // `pointStream projectionDefinition`
  // projectionDefinition: {type:nat, form:form}
  // get the nat for mvertices
  // natPoint returns the nat projection per polar coordinates

  // ### methods
  // natprofion
  // compleate form for natform

  // # license
  // MIT

  async function prtNatform (__mapper = {}) {
    let [
      mnat,
    ] = await Promise.all([
      __mapper('xs').m('nat'),
    ])

    let enty = prtdef => mnat.natprojection(prtdef)
    return enty
  }

  exports.prtNatform = prtNatform
}))
