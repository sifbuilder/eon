/***********
 *    @eohalImgform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalImgform = global.eohalImgform || {})))
}(this, function (exports) {
  'use strict'

  async function eohalImgform (__mapper = {}) {
    let [
      eohalMars,
      muonProps,
    ] = await Promise.all([
      __mapper('xs').e('mars'),
      __mapper('xs').m('props'),
    ])

    let _eofold = p => ({ // eofold
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0, 0],
      },
      properties: {
        sort: 'img',
        attr: {
          'width': p.eoload.img.style.width,
          'height': p.eoload.img.style.height,
          'rotate': p.eoload.img.style.rotate,
          'xlink:href': p.eoload.img.url,
        },
      },
    })

    // .................. eohale
    let eohale = function (anigram, newAnigrams = []) {
      let eohal = anigram.eohal, // eohal
        eoload = anigram.eoload // eoload

      let newAnigram = muonProps.clone(anigram)
      newAnigrams = [...newAnigrams, ...__mapper('eohalMars').gramm(newAnigram)]
      return newAnigrams
    }
    // ............................. ween
    let gramm = anitem => eohale(anitem)

    // ............................. ween
    let ween = anitem => {
      if (anitem.eoinited !== undefined) {
        anitem.eoinited = 1
        return muonProps.a(anitem)
      } else {
        return []
      }
    }
    // ............................. eohalImgform
    let eohalImgform = {}
    eohalImgform.ween = anima => Array.of(anima)
    eohalImgform.gramm = anima => eohale(anima)

    // .................. enty
    let enty = eohalImgform
    return enty
  }

  exports.eohalImgform = eohalImgform
}))
