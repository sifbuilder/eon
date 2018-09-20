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
      eohalTurnform,
    ] = await Promise.all([
      __mapper('xs').e('turnform'),
    ])

    let _geofold = p => ({ // eofold
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [0, 0] },
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

    let gramm = function gramm (anigram, newAnigrams = []) {
      let eohal = anigram.eohal, // eohal
        eoload = anigram.eoload // eoload

      let eofold = _geofold(anigram) // eofold

      let newAnigram = {
        eohal,
        eofold,
        eoload,
      }

      newAnigrams = [...newAnigrams, ...__mapper('eohalTurnform').gramm(newAnigram)]
      return newAnigrams
    }

    // .................. enty
    let enty = function () {}
    enty.ween = anima => (anima.inited !== 1) ? (anima.inited = 1, [anima]) : []
    enty.gramm = anima => gramm(anima)

    return enty
  }

  exports.eohalImgform = eohalImgform
}))
