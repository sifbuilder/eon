/*******************************************
 *    @eohalScene
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalScene = global.eohalScene || {})))
}(this, function (exports) {
  'use strict'

  async function eohalScene (__eo = {}) {
    let [
      mscene,
    ] = await Promise.all([
      __eo('xs').m('scene'),
    ])

    // .................... anify
    function anify (anima, newAnimas = []) {
      let p = anima.eoload.context
      mscene.scenify(p)
      newAnimas = Array.of(anima)
      return newAnimas
    }
    // .................. gramify
    function gramify (anima, newAnigrams = []) {
      return newAnigrams
    }

    // .................. eohal
    let eohalEon = {}
    eohalEon.anify = anima => anify(anima)
    eohalEon.gramify = anima => gramify(anima)

    // .................. enty
    let enty = eohalEon

    return enty
  }

  exports.eohalScene = eohalScene
}))
