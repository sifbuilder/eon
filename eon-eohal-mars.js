/**********************
 *    @eohalMars
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eohalMars = global.eohalMars || {}))
})(this, function (exports) {
  'use strict'

  // ... **process h.mars animas**
  // ... transparent to animas, applies to anigrams
  // ... eoform, conform, ereform and proform anigrams
  // ... parse result through h.sol.gramify

  async function eohalMars (__eo = {}) {
    let [
      eohalSol,
      eohalPacer,
      muonGeoj,
      muonProfier,
      muonProj3ct,
      muonProps,
    ] = await Promise.all([
      __eo('xs').e('sol'),
      __eo('xs').e('pacer'),
      __eo('xs').m('geoj'),
      __eo('xs').m('profier'),
      __eo('xs').m('proj3ct'),
      __eo('xs').m('props'),
    ])

    // ............................. eohale
    function eohale (anitem) {
      console.assert(typeof anitem === 'object')
      console.assert(Array.isArray(anitem) === false)

      let newAni = anitem // muonProps.clone(anitem) // _e_

      let eonode = muonProps.v(anitem.eonode, anitem) // newAni.eonode

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

            let prtion = muonProfier.formion(proton, anitem)
            let gjobj = muonGeoj.deprop(eonode) // remove properties from eonode

            if (gjobj.geometry !== null) {
              // geometry has non null coordinates
              console.assert(gjobj.geometry.coordinates !== null)
            }

            let projed = muonProj3ct(gjobj, prtion)
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

      let eofold = muonProps.v(anitem.eofold, anitem) // newAni.eofold
      let gjcollection = muonGeoj.featurecollect(eofold)

      if (eofold && anitem.eomot) {
        for (let [mot, proton] of Object.entries(anitem.eomot)) {
          gjcollection.features = gjcollection.features.map(feature => {
            let properties = feature.properties || {}

            let prtion = muonProfier.formion(proton, anitem)
            let gjobj = muonGeoj.deprop(feature)

            if (gjobj.geometry !== null) {
              console.assert(gjobj.geometry.coordinates !== null)
            }

            let projed = muonProj3ct(gjobj, prtion)
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
      let newAnitems = eohalSol.gramify(newItem)

      let pacedItems = []
      anitem.eoload = anitem.eoload || {}
      if (
        anitem.eoload.pacer !== undefined &&
        anitem.eoload.pacer.anigram !== undefined
      ) {
        pacedItems = eohalPacer.eopace(anitem)

      }

      return [...newAnitems, ...pacedItems]
    }

    // ............................. anify
    let anify = anitem => {
      let newAnitems = muonProps.a(anitem)

      let pacedItems = []
      anitem.eoload = anitem.eoload || {}
      if (
        anitem.eoload.pacer !== undefined &&
        anitem.eoload.pacer.anima !== undefined
      ) {
        pacedItems = eohalPacer.eopace(anitem)

      }

      return [...newAnitems, ...pacedItems]
    }

    // ............................. eohal
    let eohalMars = {}
    eohalMars.anify = anitem => anify(anitem)
    eohalMars.gramify = anitem => gramify(anitem)

    // ............................. enty
    let enty = eohalMars
    return enty
  }

  exports.eohalMars = eohalMars
})
