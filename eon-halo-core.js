/**********************
 *    @haloCore
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloCore = global.haloCore || {})))
}(this, function (exports) {
  'use strict'

  async function haloCore (__mapper = {}) {
    let manitem = await __mapper('xs').m('anitem')

    // ....................... ween
    let ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, Array.of(anima)) : []

    // ....................... gramm
    let gramm = anitem => manitem.snapani(anitem)
      .then(snapped => manitem.functorgeofold(snapped))
      .then(snapped => manitem.functorpayload(snapped))

    let haloCore = {}
    haloCore.ween = anima => ween(anima)
    haloCore.gramm = anima => gramm(anima)

    // ....................... enty
    let enty = haloCore
    return enty
  }

  exports.haloCore = haloCore
}))
