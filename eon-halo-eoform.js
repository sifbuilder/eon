/**********************
 *    @haloEoform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloEoform = global.haloEoform || {})))
}(this, function (exports) {
  'use strict'

  // md: # eon-halo-natform
  // md: **process h.eoform animas**
  // md: Feature Collect gj. for each feature
  // md: geoform, conform, ereform and proform anigrams
  // md: then pass the FeatureCollection to h.leaform
  // md: define `geonode` if undefined

  async function haloEoform (__mapper = {}) {
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

    // ............................. enent
    function enent (anitem) {
      console.assert(typeof anitem === 'object')
      console.assert(Array.isArray(anitem) === false)

      let newAni = mprops.clone(anitem)

      // aninode

      let geonode = mprops.v(anitem.geonode, anitem)

      if (geonode && anitem.geodrift) {
        for (let [drift, prt] of Object.entries(anitem.geodrift)) {
          let properties = geonode.properties || {}
          let node = muonProj3ct(muonGeoj.deprop(geonode), muonProfier.formion(prt, anitem))
          node.properties = properties
          node.properties[drift] = node

          newAni.geonode = node
        }
      }

      // anifold

      let geofold = mprops.v(anitem.geofold, anitem)
      let gjcollection = muonGeoj.featurecollect(geofold)

      if (geofold && anitem.geodrift) {
        for (let [drift, prt] of Object.entries(anitem.geodrift)) {
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

      newAni.geofold = gjcollection
      return newAni

    }

    // ............................. gramm
    let gramm = anitem => {
      let newItem = enent(anitem)
      let newAnitems = haloLeaform.gramm(newItem)
      return newAnitems
    }

    // ............................. ween
    let ween = anitem => {
      if (anitem.inited !== 1) {
        anitem.inited = 1
        anitem.gelded = 1
        return mprops.v(anitem)
      } else {
        return []
      }
    }

    // ............................. halo
    let haloEoform = {}
    haloEoform.ween = anitem => ween(anitem)
    haloEoform.gramm = anitem => gramm(anitem)

    // ............................. enty
    let enty = haloEoform
    return enty
  }

  exports.haloEoform = haloEoform
}))
