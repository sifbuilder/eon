/****************************
 *      @haloNat
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloNat = global.haloNat || {})))
}(this, function (exports) {
  'use strict'

  let haloNat = function haloNat (__mapper = {}) {
    let f = __mapper('props')(),
      manitem = __mapper('xs').m('anitem')

    let r = __mapper('xs').r('renderer'),
      width = r.width(),
      height = r.height()

    let _geoform = p => ({
      type: 'Feature',

      geometry: {
        type: 'Polygon',
        coordinates: Array.of(__mapper('xs').m('nat')
          .multiconform(__mapper('xs').m('nat')
            .nform(p.payload.form || p.form)))
      },

      properties: {
        sort: 'feature'
      }
    })

    /****************************
   *    @gramm
   */
    let gramm = function (anima, newAnigrams = []) {
      let anigram = manitem(anima).anigram(),						// anigram
        halo = 				anigram.halo, // halo
        geoform = 		anigram.geoform || _geoform				// geoform

      anima.geoform = geoform

      newAnigrams = __mapper('xs').h('geojson').gramm(anima)

      return newAnigrams
    }

    /****************************
   *    @enty
   */
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
