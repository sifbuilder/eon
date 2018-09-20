/**********************
 *    @eohalCore
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalCore = global.eohalCore || {})))
}(this, function (exports) {
  'use strict'

  async function eohalCore (__mapper = {}) {
    // ....................... ween
    let ween = anitem => (anitem.eoinited !== 1) ? (anitem.eoinited = anitem.gelded = 1, Array.of(anitem)) : []

    // ....................... gramm
    let gramm = anitem => Array.of(anitem)

    let eohalCore = {
      ween: anitem => ween(anitem),
      gramm: anitem => gramm(anitem),
    }

    // ....................... enty
    let enty = eohalCore
    return enty
  }

  exports.eohalCore = eohalCore
}))
