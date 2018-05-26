/***********
 *    @haloTextform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloTextform = global.haloTextform || {})))
}(this, function (exports) {
  'use strict'

//md: # md:{filename}
//md: process text anitems
//md: ## functions
//md: * [_geofold](#_geofold) - uploads payload text form to geofold properties
//md:
//md:
//md: ## methods
//md: * [ween](#ween) - process anima
//md: * [gramm](#gramm) - process anigram
//md:   buils the newitem geoform and pass it to h.ent
//md:
//md: # license
//md: MIT

  let haloTextform = function (__mapper = {}) {
    let f = __mapper('props')(),
      manitem = __mapper('xs').m('anitem'),
      mgeoj = __mapper('xs').m('geoj'),
      mprofier = __mapper('xs').m('profier'),
      mboform = __mapper('xs').m('boform'),
      mric = __mapper('xs').m('ric'),
      mstace = __mapper('xs').m('stace')

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
    let gramm = function (anima, newAnigrams = []) {

      let anigram = manitem(anima).anigram(),
        halo = 				anigram.halo,
        payload = 		anigram.payload

      let geofold = _geofold(anigram) // geofold

      let newAnigram = { 
        halo, 
        geofold, 
        payload 
      }
      
      newAnigrams = [...newAnigrams, ...__mapper('xs').h('ent').gramm(newAnigram)]
      return newAnigrams
    }

    // .................. enty
    let haloTextform_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloTextform_gramm = anima => gramm(anima)

    let haloTextform = {}
    haloTextform.ween = anima => haloTextform_ween(anima)
    haloTextform.gramm = anima => haloTextform_gramm(anima)

    let enty = haloTextform

    return enty
  }

  exports.haloTextform = haloTextform
}))
