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
    let [
      mnat,
      hent,
    ] = await Promise.all([
      __mapper('xs').m('nat'),
      __mapper('xs').h('ent'),
    ])

    // .................... gramm
    let gramm = function (anitem) {
      console.assert(anitem.payload.geoform !== undefined, 'geoform is undefined')

      anitem.halo = 'ent'
      anitem.geofold = mnat.natFeature(anitem.payload.geoform)

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
