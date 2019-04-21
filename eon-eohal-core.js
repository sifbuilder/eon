/**********************
 *    @eonEohalCore
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonEohalCore = global.eonEohalCore || {})))
}(this, function (exports) {
  'use strict'

  async function eonitem (__eo = {}) {
    let [
      eonMuonGeoj,
      eonMuonProfier,
      eonMuonProj3ct,
      eonMuonProps,
      eonEohalSol,
    ] = await Promise.all([
      __eo('xs').b('eon-muon-geoj'),
      __eo('xs').b('eon-muon-profier'),
      __eo('xs').b('eon-muon-proj3ct'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-eohal-sol'),
    ])

    // ....................... eohale
    let eohale = function (anitem) {
      return anitem
    }

    // ....................... anify
    let anify = anitem => {
      let newItem = eohale(anitem)

      let newItems = eonMuonProps.a(newItem)

      return newItems
    }

    // ....................... gramify
    let gramify = anitem => {
      let newItem = eohale(anitem)

      let newItems = eonMuonProps.a(newItem)

      return newItems
    }

    let eonEohalCore = {
      anify: anitem => anify(anitem),
      gramify: anitem => gramify(anitem),
    }

    // ....................... enty
    let enty = eonEohalCore
    return enty
  }

  exports.eonEohalCore = eonitem
}))
