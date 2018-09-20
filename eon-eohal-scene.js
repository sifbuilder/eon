/*******************************************
 *    @eohalScene
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalScene = global.eohalScene || {})))
}(this, function (exports) {
  'use strict'

  async function eohalScene (__mapper = {}) {
    let [
      mscene,
    ] = await Promise.all([
      __mapper('xs').m('scene'),
    ])

    // .................... ween
    function ween (anima, newAnimas = []) {
      let p = anima.eoload.context
      mscene.scenify(p)
      newAnimas = Array.of(anima)
      return newAnimas
    }
    // .................. gramm
    function gramm (anima, newAnigrams = []) {
      return newAnigrams
    }

    // .................. eohal
    let eohalEon = {}
    eohalEon.ween = anima => ween(anima)
    eohalEon.gramm = anima => gramm(anima)

    // .................. enty
    let enty = eohalEon

    return enty
  }

  exports.eohalScene = eohalScene
}))
