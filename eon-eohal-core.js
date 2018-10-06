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
      eohalSol,
    ] = await Promise.all([
      __mapper('xs').m('geoj'),
      __mapper('xs').m('profier'),
      __mapper('xs').m('proj3ct'),
      __mapper('xs').m('props'),
      __mapper('xs').e('sol'),
    ])

    // ....................... eohale
    let eohale = function (anitem) {
      return anitem
    }

    // ....................... ween
    let ween = anitem => {
      let newItem = eohale(anitem)

      let newItems = muonProps.a(newItem)

      return newItems
    }

    // ....................... gramm
    let gramm = anitem => {
      let newItem = eohale(anitem)

      let newItems = muonProps.a(newItem)

      return newItems
    }

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
