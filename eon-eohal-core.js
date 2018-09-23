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
    let [
      muonGeoj,
      muonProfier,
      muonProj3ct,
      muonProps,
      eohalPetiole,
    ] = await Promise.all([
      __mapper('xs').m('geoj'),
      __mapper('xs').m('profier'),
      __mapper('xs').m('proj3ct'),
      __mapper('xs').m('props'),
      __mapper('xs').e('petiole'),
    ])

    // ....................... ween
    let ween = anitem => Array.of(anitem)

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
