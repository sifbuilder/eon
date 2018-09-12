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
    function ween (anima, newAnimas = []) {
      let p = anima.payload.context
      mscene.scenify(p)
      newAnimas = Array.of(anima)
      return newAnimas
    }
    // .................. gramm
    function gramm (anima, newAnigrams = []) {
      return newAnigrams
    }

    // .................. halo
    let haloEon = {}
    haloEon.ween = anima => ween(anima)
    haloEon.gramm = anima => gramm(anima)

    // .................. enty
    let enty = haloEon

    return enty
  }

  exports.haloScene = haloScene
}))
