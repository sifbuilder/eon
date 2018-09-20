/***********
 *    @haloTextform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloTextform = global.haloTextform || {})))
}(this, function (exports) {
  'use strict'

  // md: # eon-halo-textform
  // md: process text anitems
  // md: ## functions
  // md: * [_geofold](#_geofold) - uploads payload text form to eofold properties
  // md:
  // md:
  // md: ## methods
  // md: * [ween](#ween) - process anima
  // md: * [gramm](#gramm) - process anigram
  // md:  buils the newitem eoform and pass it to h.turnform
  // md:
  // md: # license
  // md: MIT

  async function haloTextform (__mapper = {}) {
    let [
      mprops,
      haloTurnform,
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').h('turnform'),
    ])

    // .................. _geofold
    let _geofold = function (ani) { // eofold
      let textform = ani.payload.textform // needs text

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
      let newitem = mprops.clone(anigram)

      newitem.eofold = _geofold(anigram)
      newitem.eonode = _geofold(anigram)

      return haloTurnform.gramm(newitem)
    }

    // .................. ween
    let ween = anima => (anima.inited !== 1) ? (anima.inited = anima.gelded = 1, [anima]) : []

    // .................. halo
    let halo = {
      ween: anima => ween(anima),
      gramm: anima => gramm(anima),
    }

    // .................. enty
    let enty = halo
    return enty
  }

  exports.haloTextform = haloTextform
}))
