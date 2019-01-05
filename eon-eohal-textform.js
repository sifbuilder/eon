/***********
 *    @eohalTextform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalTextform = global.eohalTextform || {})))
}(this, function (exports) {
  'use strict'

  // ... process text anitems
  // ... ## functions
  // ... * [_geofold](#_geofold) - uploads eoload text form to eofold properties
  // ...
  // ...
  // ... ## methods
  // ... * [ween](#ween) - process anima
  // ... * [gramm](#gramm) - process anigram
  // ...  buils the newitem eoform and pass it to h.mars
  // ...
  // ... # license
  // ... MIT

  async function eohalTextform (__eo = {}) {
    let [
      muonProps,
      eohalMars,
    ] = await Promise.all([
      __eo('xs').m('props'),
      __eo('xs').e('mars'),
    ])

    // .................. _geofold
    let _geofold = function (ani) { // eofold
      let textform = ani.eoload.textform // needs text

      let eofold = ani.eofold

      let res
      if (eofold === undefined ||
        (eofold.type === 'Feature' && eofold.geometry.type === 'Point') ||
        eofold.type === 'Point'
      ) {
        res = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0],
          },
        }

        res.properties = Object.assign({}, {
          sort: 'text',
          string: textform.string || '',
          style: {

            'rotate': textform.style['rotate'],
            'font-size': textform.style['font-size'],
            'font-family': textform.style['font-family'],
            'text-anchor': textform.style['text-anchor'],
            'fill-opacity': textform.style['fill-opacity'],
            'stroke-opacity': textform.style['stroke-opacity'],

            'width': textform.style.width,
            'height': textform.style.height,

            'dx': textform.style.dx,
            'dy': textform.style.dy,

            'textLength': textform.style.textLength,
            'lengthAdjust': textform.style.lengthAdjust,

          },
        })
      } else if (eofold.type === 'Feature' &&
          (eofold.geometry.type === 'LineString')
      ) {
        res = eofold

        res.properties = Object.assign({}, res.properties, {
          sort: 'text',
          string: textform.string || '',
          style: {

            'rotate': textform.style['rotate'],
            'font-size': textform.style['font-size'],

            // sans-serif, karla, BankFuturistic, arial, Helvetica
            'font-family': textform.style['font-family'],
            'text-anchor': textform.style['text-anchor'],
            'fill-opacity': textform.style['fill-opacity'],
            'stroke-opacity': textform.style['stroke-opacity'],

            'width': textform.style.width,
            'height': textform.style.height,

            'dx': textform.style.dx,
            'dy': textform.style.dy,

            'textLength': textform.style.textLength,
            'lengthAdjust': textform.style.lengthAdjust,

          },

        })
      } else {
        console.log('text support not supported')
      }

      return res
    }

    // .................. gramm
    function gramm (anitem) {
      let newitem = muonProps.clone(anitem)

      newitem.eofold = _geofold(anitem)
      newitem.eonode = _geofold(anitem)

      return eohalMars.gramm(newitem)
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
