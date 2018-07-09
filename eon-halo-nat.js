/****************************
 *      @haloNat
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloNat = global.haloNat || {})))
}(this, function (exports) {
  'use strict'

  async function haloNat (__mapper = {}) {
    let mnat = await __mapper('xs').m('nat'),
      hent = await __mapper('xs').h('ent')

    // .................... gramm
    let gramm = function (anigram, newAnigrams = []) {
      return hent.gramm(Object.assign(
        {},
        anigram,
        {geofold: p => mnat.natFeature(p.payload.form)}
      ))
    }

    // .................... enty
    let haloNat_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloNat_gramm = anima => gramm(anima)

    let haloNat = {}
    haloNat.ween = anima => haloNat_ween(anima)
    haloNat.gramm = anima => haloNat_gramm(anima)

    let enty = haloNat

    return enty
  }

  exports.haloNat = haloNat
}))
