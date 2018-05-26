/****************************
 *      @haloNat
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloNat = global.haloNat || {})))
}(this, function (exports) {
  'use strict'


  // md: # md:{filename}
  // md: **expose nat form**
  // md: h.ent with  anima.geofold : `mnat.natFeature(p.payload.form)`
  // md:
  // md: # license
  // md: MIT


  let haloNat = function haloNat (__mapper = {}) {
    let f = __mapper('props')(),
      manitem = __mapper('xs').m('anitem'),
      mnat = __mapper('xs').m('nat')


    // .................... gramm
    let gramm = function (anima, newAnigrams = []) {

      let anigram = manitem(anima).anigram() // anigram

      anigram.halo = 'ent' // halo
      anigram.geofold = p => mnat.closeFeature(mnat.natFeature(p.payload.form)) // geofold

      newAnigrams = __mapper('xs').h('ent').gramm(anigram)

      return newAnigrams

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
