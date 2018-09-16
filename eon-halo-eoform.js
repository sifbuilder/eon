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
  // md: then pass the FeatureCollection to h.formed
  // md: define `geonode` if undefined

  async function haloEoform (__mapper = {}) {
    let [
      mgeoj,
      muonProfier,
      mproj3ct,
      mprops,
      haloFormed,
    ] = await Promise.all([
      __mapper('xs').m('geoj'),
      __mapper('xs').m('profier'),
      __mapper('xs').m('proj3ct'),
      __mapper('xs').m('props'),
      __mapper('xs').h('formed'),

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
          let node = mproj3ct(mgeoj.deprop(geonode), muonProfier.formion(prt, anitem))
          node.properties = properties
          node.properties[drift] = node

          newAni.geonode = node
        }
      }

      // anifold

      let geofold = mprops.v(anitem.geofold, anitem)
      let gjcollection = mgeoj.featurecollect(geofold)

      if (geofold && anitem.geodrift) {
        for (let [drift, prt] of Object.entries(anitem.geodrift)) {
          gjcollection.features = gjcollection.features.map(
            feature => {
              let properties = feature.properties || {}
              let prtion = muonProfier.formion(prt, anitem)
              let gjobj = mgeoj.deprop(feature)

              console.assert(gjobj.geometry.coordinates !== null)

              let node = mproj3ct(gjobj, prtion)
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
      let newAnitems = haloFormed.gramm(newItem)
      return newAnitems
    }

    // ............................. ween
    let ween = anitem => {
console.log('aniform', anitem.payload.aniform)      
      if (anitem.inited !== 1) {
        anitem.inited = 1
        anitem.payload.gelded = 1
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
