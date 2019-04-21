/****************************
 *      @eonEohalNatform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonEohalNatform = global.eonEohalNatform || {})))
}(this, function (exports) {
  'use strict'

  // ... **expose natform**
  // ... transparent to animas, parses anigrams
  // ... get natFeature geojson and uniwen project by nat [tx, ty, tz]
  // ... complete eocrom definition

  async function eonitem (__eo = {}) {
    let [
      eonEohalMars,
      eonMuonNatform,
      eonMuonEocrom,
      eonMuonProfier,
      eonMuonProj3ct,
    ] = await Promise.all([
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-eocrom'),
      __eo('xs').b('eon-muon-profier'),
      __eo('xs').b('eon-muon-proj3ct'),
    ])

    // eocrom definition

    let geteocrom = function (eoform) {
      let res = {}
      let ref = eonMuonEocrom.getdefault()

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

      anitem.eofold = eonMuonNatform.natMultiLineString({eoform: eoform})

      anitem.eofold = eonMuonProj3ct(anitem.eofold, eonMuonProfier.formion(proton, anitem))

      if (anitem.eocrom === undefined) anitem.eocrom = geteocrom(eoform)

      return eonEohalMars.gramify(anitem)
    }

    // .................... gramify
    let gramify = anitem => {
      return eohale(anitem)
    }
    // .................... anify
    let anify = anitem => {
      return anitem
    }

    // .................... eohal
    let eonEohalNatform = {}
    eonEohalNatform.anify = anitem => anify(anitem)
    eonEohalNatform.gramify = anitem => gramify(anitem)

    // .................... enty
    let enty = eonEohalNatform
    return enty
  }

  exports.eonEohalNatform = eonitem
}))
