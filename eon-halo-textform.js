/***********
 *    @haloTextform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloTextform = global.haloTextform || {})))
}(this, function (exports) {
  'use strict'

  async function haloTextform (__mapper = {}) {
    let [
      manitem,
      hent
    ] = await Promise.all([
      __mapper('xs').m('anitem'),
      __mapper('xs').h('ent')
    ])

    // .................. _geofold
    let _geofold = function (ani) { // geofold
      let textform = ani.payload.textform // needs text

      return {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0] },
        properties: {
          sort: 'text',
          string: textform.string || '',
          style: {

            'rotate': textform.style['rotate'],
            'font-size': textform.style['font-size'],
            'font-family': textform.style['font-family'],
            'text-anchor': textform.style['text-anchor'],

            'width': textform.style.width,
            'height': textform.style.height,

            'dx': textform.style.dx,
            'dy': textform.style.dy,

            'textLength': textform.style.textLength,
            'lengthAdjust': textform.style.lengthAdjust

          }
        }
      }
    }

    // .................. gramm
    async function gramm (anima, newAnigrams = []) {
      let anigram = manitem(anima).anigram(),
        halo = 				anigram.halo,
        payload = 		anigram.payload

      let geofold = _geofold(anigram) // geofold

      let newAnigram = {
        halo,
        geofold,
        payload
      }

      newAnigrams = await hent.gramm(newAnigram)

      return newAnigrams
    }

    // .................. enty
    let haloEon_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloEon_gramm = anima => gramm(anima)

    let haloEon = {}
    haloEon.ween = anima => haloEon_ween(anima)
    haloEon.gramm = anima => haloEon_gramm(anima)

    let enty = haloEon

    return enty
  }

  exports.haloTextform = haloTextform
}))
