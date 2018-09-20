/**********************
 *    @haloTurnform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloTurnform = global.haloTurnform || {})))
}(this, function (exports) {
  'use strict'

  // md: # eon-halo-natform
  // md: **process h.turnform animas**
  // md: Feature Collect gj. for each feature
  // md: eoform, conform, ereform and proform anigrams
  // md: then pass the FeatureCollection to h.leaform
  // md: define `eonode` if undefined

  async function haloTurnform (__mapper = {}) {
    let [
      muonGeoj,
      muonProfier,
      muonProj3ct,
      mprops,
      haloLeaform,
    ] = await Promise.all([
      __mapper('xs').m('geoj'),
      __mapper('xs').m('profier'),
      __mapper('xs').m('proj3ct'),
      __mapper('xs').m('props'),
      __mapper('xs').h('leaform'),

    ])

    // ............................. haloing
    function haloing (anitem) {
      console.assert(typeof anitem === 'object')
      console.assert(Array.isArray(anitem) === false)

      let newAni = mprops.clone(anitem)

      // aninode

      let eonode = mprops.v(anitem.eonode, anitem)

      if (eonode && anitem.eodrift) {
        for (let [drift, prt] of Object.entries(anitem.eodrift)) {
          let properties = eonode.properties || {}
          let node = muonProj3ct(muonGeoj.deprop(eonode), muonProfier.formion(prt, anitem))
          node.properties = properties
          node.properties[drift] = node
          newAni.eonode = node
        }
      }

      // anifold

      let eofold = mprops.v(anitem.eofold, anitem)
      let gjcollection = muonGeoj.featurecollect(eofold)

      if (eofold && anitem.eodrift) {
        for (let [drift, prt] of Object.entries(anitem.eodrift)) {
          gjcollection.features = gjcollection.features.map(
            feature => {
              let properties = feature.properties || {}
              let prtion = muonProfier.formion(prt, anitem)
              let gjobj = muonGeoj.deprop(feature)

              console.assert(gjobj.geometry.coordinates !== null)

              let node = muonProj3ct(gjobj, prtion)
              node.properties = properties
              node.properties[drift] = node

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
      let newItem = haloing(anitem)
      let newAnitems = haloLeaform.gramm(newItem)
      return newAnitems
    }

    // ............................. ween
    let ween = anitem => {
      if (anitem.inited === undefined) {
        anitem.inited = 1
        return mprops.v(anitem)
      } else {
        return []
      }
    }

    // ............................. halo
    let haloTurnform = {}
    haloTurnform.ween = anitem => ween(anitem)
    haloTurnform.gramm = anitem => gramm(anitem)

    // ............................. enty
    let enty = haloTurnform
    return enty
  }

  exports.haloTurnform = haloTurnform
}))
