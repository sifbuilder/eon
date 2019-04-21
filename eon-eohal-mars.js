/**********************
 *    @eonEohalMars
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonEohalMars = global.eonEohalMars || {}))
})(this, function (exports) {
  'use strict'

  // ... **process h.mars animas**
  // ... transparent to animas, applies to anigrams
  // ... eoform, conform, ereform and proform anigrams
  // ... parse result through h.sol.gramify

  async function eonitem (__eo = {}) {
    let [
      eonEohalSol,
      eonEohalPacer,
      eonMuonGeoj,
      eonMuonProfier,
      eonMuonProj3ct,
      eonMuonProps,
    ] = await Promise.all([
      __eo('xs').b('eon-eohal-sol'),
      __eo('xs').b('eon-eohal-pacer'),
      __eo('xs').b('eon-muon-geoj'),
      __eo('xs').b('eon-muon-profier'),
      __eo('xs').b('eon-muon-proj3ct'),
      __eo('xs').b('eon-muon-props'),
    ])

    // ............................. eohale
    function eohale (anitem) {
      console.assert(typeof anitem === 'object')
      console.assert(Array.isArray(anitem) === false)

      let newAni = anitem // eonMuonProps.clone(anitem) // _e_

      let eonode = eonMuonProps.v(anitem.eonode, anitem) // newAni.eonode

      // apply eomot projections to
      //
      //  eonode
      //

      if (eonode && anitem.eomot) {
        for (let [mot, proton] of Object.entries(anitem.eomot)) {
          newAni.eonode = eonode

          if (proton.applyProtonToNode) {
            let geometry = eonode.geometry || {}
            let properties = eonode.properties || {}

            let prtion = eonMuonProfier.formion(proton, anitem)
            let gjobj = eonMuonGeoj.deprop(eonode) // remove properties from eonode

            if (gjobj.geometry !== null) {
              // geometry has non null coordinates
              console.assert(gjobj.geometry.coordinates !== null)
            }

            let projed = eonMuonProj3ct(gjobj, prtion)
            properties[mot] = projed

            let node = Object.assign({}, projed)
            node.properties = properties

            newAni.eonode = node
          }
        }
      }

      // apply eomot projections to
      //
      //  geofold
      //
      // if eomot.addNodeToTranslate:1, the eoanod offset is added to the projection translate
      //

      let eofold = eonMuonProps.v(anitem.eofold, anitem) // newAni.eofold
      let gjcollection = eonMuonGeoj.featurecollect(eofold)

      if (eofold && anitem.eomot) {
        for (let [mot, proton] of Object.entries(anitem.eomot)) {
          gjcollection.features = gjcollection.features.map(feature => {
            let properties = feature.properties || {}

            let prtion = eonMuonProfier.formion(proton, anitem)
            let gjobj = eonMuonGeoj.deprop(feature)

            if (gjobj.geometry !== null) {
              console.assert(gjobj.geometry.coordinates !== null)
            }

            let projed = eonMuonProj3ct(gjobj, prtion)
            properties[mot] = projed

            let node = Object.assign({}, projed)
            node.properties = properties

            return node
          })
        }
      }

      newAni.eofold = gjcollection

      return newAni
    }

    // ............................. gramify
    let gramify = anitem => {
      let newItem = eohale(anitem)
      let newAnitems = eonEohalSol.gramify(newItem)

      let pacedItems = []
      anitem.eoload = anitem.eoload || {}
      if (
        anitem.eoload.pacer !== undefined &&
        anitem.eoload.pacer.anigram !== undefined
      ) {
        pacedItems = eonEohalPacer.eopace(anitem)

      }

      return [...newAnitems, ...pacedItems]
    }

    // ............................. anify
    let anify = anitem => {
      let newAnitems = eonMuonProps.a(anitem)

      let pacedItems = []
      anitem.eoload = anitem.eoload || {}
      if (
        anitem.eoload.pacer !== undefined &&
        anitem.eoload.pacer.anima !== undefined
      ) {
        pacedItems = eonEohalPacer.eopace(anitem)

      }

      return [...newAnitems, ...pacedItems]
    }

    // ............................. eohal
    let eonEohalMars = {}
    eonEohalMars.anify = anitem => anify(anitem)
    eonEohalMars.gramify = anitem => gramify(anitem)

    // ............................. enty
    let enty = eonEohalMars
    return enty
  }

  exports.eonEohalMars = eonitem
})
