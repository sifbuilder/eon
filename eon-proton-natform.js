/*******************************************
 *    @eonProtonNatform
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonProtonNatform = global.eonProtonNatform || {})))
}(this, function (exports) {
  'use strict'

  // ... **returns nat projection**
  // ... ### functions
  // ... prtdef
  // ... return nat projection
  // ... # license
  // ... MIT

  async function eonitem (__eo = {}) {
    let [
      eonMuonNatform,
    ] = await Promise.all([
      __eo('xs').b('eon-muon-natform'),
    ])

    let enty = prtdef => eonMuonNatform.natprojection(prtdef)
    return enty
  }

  exports.eonProtonNatform = eonitem
}))
