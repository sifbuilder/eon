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
    // ....................... eohale
    let eohale = anitem => anitem

    // ....................... anify
    let anify = anitem => {
      let newItem = eohale(anitem)
      return Array.isArray(newItem) ? newItem : Array.of(newItem)
    }

    // ....................... gramify
    let gramify = anitem => {
      let newItem = eohale(anitem)
      return Array.isArray(newItem) ? newItem : Array.of(newItem)
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
