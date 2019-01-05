/**********************
 *    @eohalMars
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalMars = global.eohalMars || {})))
}(this, function (exports) {
  'use strict'

  // ... **process h.mars animas**
  // ... transparent to animas, applies to anigrams
  // ... eoform, conform, ereform and proform anigrams
  // ... parse result through h.sol.gramm

  async function eohalMars (__eo = {}) {
    let [
      eohalSol,
      muonGeoj,
      muonProfier,
      muonProj3ct,
      muonProps,
    ] = await Promise.all([
      __eo('xs').e('sol'),
      __eo('xs').m('geoj'),
      __eo('xs').m('profier'),
      __eo('xs').m('proj3ct'),
      __eo('xs').m('props'),

    ])

    // ............................. eohale
    function eohale (anitem) {
      console.assert(typeof anitem === 'object')
      console.assert(Array.isArray(anitem) === false)

      let newAni = muonProps.clone(anitem) // newAni

      let eonode = muonProps.v(anitem.eonode, anitem) // newAni.eonode
      if (eonode && anitem.eomot) {
        for (let [mot, prt] of Object.entries(anitem.eomot)) {
          let properties = eonode.properties || {}

          let prtion = muonProfier.formion(prt, anitem)
          let gjobj = muonGeoj.deprop(eonode)

          if (gjobj.geometry !== null) {
            console.assert(gjobj.geometry.coordinates !== null)
          }

          let node = muonProj3ct(gjobj, prtion)
          node.properties = properties
          node.properties[mot] = muonGeoj.deprop(node) // save [prt] pure node

          newAni.eonode = node
        }
      }

      let eofold = muonProps.v(anitem.eofold, anitem) // newAni.eofold
      let gjcollection = muonGeoj.featurecollect(eofold)

      if (eofold && anitem.eomot) {
        for (let [mot, prt] of Object.entries(anitem.eomot)) {
          gjcollection.features = gjcollection.features.map(
            feature => {
              let properties = feature.properties || {}

              let prtion = muonProfier.formion(prt, anitem)
              let gjobj = muonGeoj.deprop(feature)

              if (gjobj.geometry !== null) {
                console.assert(gjobj.geometry.coordinates !== null)
              }

              let node = muonProj3ct(gjobj, prtion)
              node.properties = properties
              node.properties[mot] = node

              return node
            }
          )
        }
      }

      newAni.eofold = gjcollection

      return newAni
    }

    // ............................. gramm
    let gramm = anitem => {
      let newItem = eohale(anitem)
      let newAnitems = eohalSol.gramm(newItem)
      return newAnitems
    }

    // ............................. ween
    let ween = anitem => {
      let newitems = muonProps.v(anitem)
      return newitems
    }

    // ............................. eohal
    let eohalMars = {}
    eohalMars.ween = anitem => ween(anitem)
    eohalMars.gramm = anitem => gramm(anitem)

    // ............................. enty
    let enty = eohalMars
    return enty
  }

  exports.eohalMars = eohalMars
}))
