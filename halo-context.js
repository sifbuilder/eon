/*******************************************
 *    @haloContext
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloContext = global.haloContext || {})))
}(this, function (exports) {
  'use strict'

  let haloContext = function (__mapper = {}) {
    
    let f = __mapper('xs').m('props'),
      manitem = __mapper('xs').m('anitem'),
      minit = __mapper('xs').m('init')
    
    let ween = function (anima, newAnimas = []) {

    
      let p = anima.payload.context

      minit.setContext(p)
      
      newAnimas = Array.of(anima)
      
      return newAnimas
    }

    // .................... enty
    
    let haloNat_ween = anima => ween(anima)
    
    let haloNat_gramm = anima => anima

    let haloNat = {
    
      ween: anima => haloNat_ween(anima),
      gramm: anima => haloNat_gramm(anima)
      
    }

    let enty = haloNat

    return enty
  }

  exports.haloContext = haloContext
}))
