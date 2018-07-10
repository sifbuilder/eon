/*******************************************
 *    @haloScene
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloScene = global.haloScene || {})))
}(this, function (exports) {
  'use strict'

  async function haloScene (__mapper = {}) {
    let [
      mscene,
    ] = await Promise.all([
      __mapper('xs').m('scene'),
    ])

    // .................... ween
    async function ween (anima, newAnimas = []) {
      let p = anima.payload.context
      mscene.scenify(p)
      newAnimas = Array.of(anima)
      return newAnimas
    }
    // .................. gramm
    async function gramm (anima, newAnigrams = []) {
      return newAnigrams
    }

    // .................. halo
    let haloEon_ween = anima => ween(anima)
    let haloEon_gramm = anima => gramm(anima)

    let haloEon = {}
    haloEon.ween = anima => haloEon_ween(anima)
    haloEon.gramm = anima => haloEon_gramm(anima)

    // .................. enty    
    let enty = haloEon

    return enty
  }

  exports.haloScene = haloScene
}))
