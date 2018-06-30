/*******************************************
 *    @haloScene
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloScene = global.haloScene || {})))
}(this, function (exports) {
  'use strict'

  async function haloScene(__mapper = {}) {

    let [
          mscene,
       ] = await Promise.all( [
          __mapper('xs').m('scene'),
       ])    
    
    
    // .................... ween    
    let ween = function (anima, newAnimas = []) {
      let p = anima.payload.context
      mscene.scenify(p)
      newAnimas = Array.of(anima)
      return newAnimas
    }

    let haloNat_ween = anima => ween(anima)
    
    let haloNat_gramm = anima => anima

    let haloNat = {
    
      ween: anima => haloNat_ween(anima),
      gramm: anima => haloNat_gramm(anima)
      
    }

    // .................... enty
    let enty = haloNat
    return enty
  }

  exports.haloScene = haloScene
}))
