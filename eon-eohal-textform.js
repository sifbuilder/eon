/***********
 *    @eohalTextform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalTextform = global.eohalTextform || {})))
}(this, function (exports) {
  'use strict'

  //... process text anitems
  //... ## functions
  //... * [_geofold](#_geofold) - uploads eoload text form to eofold properties
  //...
  //...
  //... ## methods
  //... * [ween](#ween) - process anima
  //... * [gramm](#gramm) - process anigram
  //...  buils the newitem eoform and pass it to h.sol
  //...
  //... # license
  //... MIT

  async function eohalTextform (__mapper = {}) {
    let [
      muonProps,
      eohalSol,
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').e('sol'),
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
    function gramm (anitem) {
      let newitem = muonProps.clone(anitem)

      newitem.eofold = _geofold(anitem)
      newitem.eonode = _geofold(anitem)

      return eohalSol.gramm(newitem)
    }

    // .................. ween
    let ween = anitem => {
      let newitems = []
      if (anitem.eoinited !== 1) {
        anitem.eoinited = 1
        anitem.eogelded = 1
        newitems = Array.of(anitem)
      }
      return newitems
    }

    // .................. eohal
    let eohal = {
      ween: anitem => ween(anitem),
      gramm: anitem => gramm(anitem),
    }

    // .................. enty
    let enty = eohal
    return enty
  }

  exports.eohalTextform = eohalTextform
}))
