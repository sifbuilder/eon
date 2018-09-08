/**********************
 *    @haloEnt
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloEnt = global.haloEnt || {})))
}(this, function (exports) {
  'use strict'

  // md: # eon-halo-ent
  // md: **process h.ent animas**
  // md: Feature Collect gj. for each feature
  // md: geoform, conform, ereform and proform anigrams
  // md: then pass the FeatureCollection to h.formed
  // md: define `geonode` if undefined

  async function haloEnt (__mapper = {}) {
    let [
      mgeoj,
      mprofier,
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

      let geonode = mprops.v(anitem.payload.geonode, anitem)

      if (geonode && anitem.payload.geobach) {
        for (let [bach, prt] of Object.entries(anitem.payload.geobach)) {
          let properties = geonode.properties || {}
          let node = mproj3ct(mgeoj.deprop(geonode), mprofier.formion(prt, anitem))
          node.properties = properties
          node.properties[bach] = node

          newAni.payload.geonode = node
        }
      }

      // anifold

      let geofold = mprops.v(anitem.payload.geofold, anitem)
      let gjcollection = mgeoj.featurecollect(geofold)

      if (geofold && anitem.payload.geobach) {
        for (let [bach, prt] of Object.entries(anitem.payload.geobach)) {
          gjcollection.features = gjcollection.features.map(
            feature => {
              let properties = feature.properties || {}
              let prtion = mprofier.formion(prt, anitem)
              let gjobj = mgeoj.deprop(feature)
              
              console.assert(gjobj.geometry.coordinates !== null)
              
              let node = mproj3ct(gjobj, prtion)
              node.properties = properties
              node.properties[bach] = node

              return node
            }
          )
        }
      }

      newAni.payload.geofold = gjcollection

      let newAnitems = haloFormed.gramm(newAni)
      return newAnitems
    }

    // ............................. gramm
    let gramm = anitem => enent(anitem)

    // ............................. ween
    let ween = anitem => (anitem.payload.inited !== 1) ? (anitem.payload.inited = anitem.payload.gelded = 1, [anitem]) : []

    // ............................. halo
    let haloEnt = {}
    haloEnt.ween = anitem => ween(anitem)
    haloEnt.gramm = anitem => gramm(anitem)

    // ............................. enty
    let enty = haloEnt
    return enty
  }

  exports.haloEnt = haloEnt
}))
