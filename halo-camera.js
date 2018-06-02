/**********************
 *    @haloCamera
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloCamera = global.haloCamera || {})))
}(this, function (exports) {
  'use strict'

  let haloCamera = function haloCamera (__mapper = {}) {

    let f = __mapper('xs').m('props'),
      r = __mapper('xs').r('renderport'),
      manitem = __mapper('xs').m('anitem')

    // let haloCamera_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []

    let haloCamera_ween = function (anima) {

      let anigram = manitem(anima).anigram(), // anigram
        halo = anigram.halo, // halo
        geofold = anigram.geofold, // geofold
        payload = anigram.payload // payload

      if (payload.camera !== undefined)  {

        r.cameraProjer(payload.camera)

      }
      
      return []
    }

    let haloCamera_gramm = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []

    /**********************
    *    @enty
    */
    let haloCamera = {}
    haloCamera.ween = anima => haloCamera_ween(anima)
    haloCamera.gramm = anima => haloCamera_gramm(anima)

    let enty = haloCamera

    return enty
  }

  exports.haloCamera = haloCamera
}))
