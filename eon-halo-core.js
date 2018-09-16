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
    // ....................... ween
    let ween = anitem => (anitem.inited !== 1) ? (anitem.inited = anitem.payload.gelded = 1, Array.of(anitem)) : []

    // ....................... gramm
    let gramm = anitem => Array.of(anitem)

    let haloCore = {
      ween: anitem => ween(anitem),
      gramm: anitem => gramm(anitem),
    }

    // ....................... enty
    let enty = haloCore
    return enty
  }

  exports.haloCore = haloCore
}))
