/***********
 *    @eohalImgform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalImgform = global.eohalImgform || {})))
}(this, function (exports) {
  'use strict'

  async function eohalImgform (__eo = {}) {
    let [
      eohalMars,
      muonProps,
    ] = await Promise.all([
      __eo('xs').e('mars'),
      __eo('xs').m('props'),
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
      newAnigrams = [...newAnigrams, ...__eo('eohalMars').gramify(newAnigram)]
      return newAnigrams
    }
    // ............................. anify
    let gramify = anitem => eohale(anitem)

    // ............................. anify
    let anify = anitem => {
      if (anitem.eoinited !== undefined) {
        anitem.eoinited = 1
        return muonProps.a(anitem)
      } else {
        return []
      }
    }
    // ............................. eohalImgform
    let eohalImgform = {}
    eohalImgform.anify = anima => Array.of(anima)
    eohalImgform.gramify = anima => eohale(anima)

    // .................. enty
    let enty = eohalImgform
    return enty
  }

  exports.eohalImgform = eohalImgform
}))
