/***********
 *    @eonEohalImgform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonEohalImgform = global.eonEohalImgform || {})))
}(this, function (exports) {
  'use strict'

  async function eonitem (__eo = {}) {
    let [
      eonEohalMars,
      eonMuonProps,
    ] = await Promise.all([
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-muon-props'),
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

      let newAnigram = eonMuonProps.clone(anigram)
      newAnigrams = [...newAnigrams, ...__eo('eonEohalMars').gramify(newAnigram)]
      return newAnigrams
    }
    // ............................. anify
    let gramify = anitem => eohale(anitem)

    // ............................. anify
    let anify = anitem => {
      if (anitem.eoinited !== undefined) {
        anitem.eoinited = 1
        return eonMuonProps.a(anitem)
      } else {
        return []
      }
    }
    // ............................. eonEohalImgform
    let eonEohalImgform = {}
    eonEohalImgform.anify = anima => Array.of(anima)
    eonEohalImgform.gramify = anima => eohale(anima)

    // .................. enty
    let enty = eonEohalImgform
    return enty
  }

  exports.eonEohalImgform = eonitem
}))
