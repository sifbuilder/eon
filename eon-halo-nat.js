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
    let gramm = async function (anitem) {
      anitem.halo = 'ent'
      anitem.payload.geofold = mnat.natFeature(anitem.payload.geoform)
      return hent.gramm(anitem)
    }

    // .................... ween
    let ween = anitem => (anitem.payload.inited !== 1) ? (anitem.payload.inited = anitem.payload.gelded = 1, [anitem]) : []

    // .................... halo
    let haloNat = {}
    haloNat.ween = anitem => ween(anitem)
    haloNat.gramm = anitem => gramm(anitem)

    // .................... enty
    let enty = haloNat
    return enty
  }

  exports.haloNat = haloNat
}))
