/****************************
 *      @eohalNatform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalNatform = global.eohalNatform || {})))
}(this, function (exports) {
  'use strict'

  // ... **expose natform**
  // ... transparent to animas, parses anigrams
  // ... get natFeature geojson and uniwen project by nat [tx, ty, tz]
  // ... complete eocrom definition

  async function eohalNatform (__eo = {}) {
    let [
      eohalMars,
      muonNatform,
      muonEocrom,
      muonProfier,
      muonProj3ct,
    ] = await Promise.all([
      __eo('xs').e('mars'),
      __eo('xs').m('natform'),
      __eo('xs').m('eocrom'),
      __eo('xs').m('profier'),
      __eo('xs').m('proj3ct'),
    ])

    // eocrom definition

    let geteocrom = function (eoform) {
      let res = {}
      let ref = muonEocrom.getdefault()

      if (eoform === undefined) {
        res = ref
      } else {
        let ref = eoform
        res = ref
      }
      return res
    }

    // eonode definition

    let gettranslate = function (eoform) {
      let translate = []

      if (eoform.tx !== undefined) {
        translate[0] = eoform.tx || 0
      }
      if (eoform.ty !== undefined) {
        translate[1] = eoform.ty || 0
      }
      if (eoform.tz !== undefined) {
        translate[2] = eoform.tz
      }

      return translate
    }

    // .................... eohale
    let eohale = function (anitem) {
      
      let eoform = anitem.eoform || anitem.eoload.eoform
      console.assert(eoform !== undefined, 'eoform is undefined')
      
      anitem.eohal = 'natform'

      let translate = gettranslate(eoform)

      let proton = {
        projection: 'uniwen',
        translate: translate,
        scale: 1,
        rotate: [ 0, 0 ],
        lens: [0, 1, Infinity],
      }

      anitem.eofold = muonNatform.natMultiLineString({eoform: eoform})

      anitem.eofold = muonProj3ct(anitem.eofold, muonProfier.formion(proton, anitem))

      if (anitem.eocrom === undefined) anitem.eocrom = geteocrom(eoform)

      return eohalMars.gramm(anitem)
    }

    // .................... gramm
    let gramm = anitem => {
      return eohale(anitem)
    }
    // .................... ween
    let ween = anitem => {
      return anitem
    }

    // .................... eohal
    let eohalNatform = {}
    eohalNatform.ween = anitem => ween(anitem)
    eohalNatform.gramm = anitem => gramm(anitem)

    // .................... enty
    let enty = eohalNatform
    return enty
  }

  exports.eohalNatform = eohalNatform
}))
