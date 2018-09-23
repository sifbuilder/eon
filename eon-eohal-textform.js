/***********
 *    @eohalTextform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalTextform = global.eohalTextform || {})))
}(this, function (exports) {
  'use strict'

  // md: # eon-eohal-textform
  // md: process text anitems
  // md: ## functions
  // md: * [_geofold](#_geofold) - uploads eoload text form to eofold properties
  // md:
  // md:
  // md: ## methods
  // md: * [ween](#ween) - process anima
  // md: * [gramm](#gramm) - process anigram
  // md:  buils the newitem eoform and pass it to h.tornasol
  // md:
  // md: # license
  // md: MIT

  async function eohalTextform (__mapper = {}) {
    let [
      muonProps,
      eohalTornasol,
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').e('tornasol'),
    ])

    // .................. _geofold
    let _geofold = function (ani) { // eofold
      let textform = ani.eoload.textform // needs text

      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0],
        },
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
            'lengthAdjust': textform.style.lengthAdjust,

          },
        },
      }
    }

    // .................. gramm
    function gramm (anigram, newAnigrams = []) {
      let newitem = muonProps.clone(anigram)

      newitem.eofold = _geofold(anigram)
      newitem.eonode = _geofold(anigram)

      return eohalTornasol.gramm(newitem)
    }

    // .................. ween
    let ween = anima => (anima.eoinited !== 1) ? (anima.eoinited = anima.gelded = 1, [anima]) : []

    // .................. eohal
    let eohal = {
      ween: anima => ween(anima),
      gramm: anima => gramm(anima),
    }

    // .................. enty
    let enty = eohal
    return enty
  }

  exports.eohalTextform = eohalTextform
}))
