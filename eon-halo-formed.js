/**********************
 *    @haloFormed
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloFormed = global.haloFormed || {})))
}(this, function (exports) {
  'use strict'

  async function haloFormed (__mapper = {}) {
    let [
      manitem,
      mric,
      mboform,
      mgeoj,
      mprops
    ] = await Promise.all([
      __mapper('xs').m('anitem'),
      __mapper('xs').m('ric'),
      __mapper('xs').m('boform'),
      __mapper('xs').m('geoj'),
      __mapper('xs').m('props')
    ])

    const functor = (d, ...p) => (typeof d === 'function') ? d(...p) : d
    const getgj = ani => {
      let gj = mprops.v(ani.geofold, ani) // get geofold
      gj.properties = gj.properties || {} // recall genode
      gj.properties.geonode = gj.properties.geonode || {} // recall genode properties
      gj.properties.formGeoformed = mgeoj.deprop(gj) // store geoform
      gj.properties.nodeGeoformed = gj.properties.geonode // nodeGeoformed : geonode
      return gj
    }

    // ............................. gramm
    async function gramm (anigram) {

      let gjcollection = await mgeoj.featurecollect(getgj(anigram))
      
      if (2 && 2 && gjcollection.type !== 'FeatureCollection') console.log('** gjcollection is not FeatureCollection', gjcollection)
      gjcollection = mgeoj.zorder(gjcollection) // order features in collection
      gjcollection = mric.enric(anigram.payload.ric, anigram, gjcollection) // ric to feature or collection

      let newAnigrams = gjcollection.features.map((feature, i) => {
        feature = mboform.boformer(anigram, feature)

        feature.properties.tim = anigram.payload.tim // tim in geofold
        feature.properties.vim = anigram.payload.vim // vim in geofold to render
        feature.properties.sort = feature.properties.sort || 'feature' // svg sort

        let newAnigram = {
          halo: anigram.halo, // inherit halo
          geofold: feature, // inherit geofold
          payload: { // payload is lost in m.animation before rendering
            ric: feature.properties.ric, // hoist ric
            id: feature.properties.uid, // hoist uid
            uid: feature.properties.uid // hoist uid
          },
          avatars: anigram.avatars // inherit avatars
        }
        return newAnigram
      })

      return newAnigrams //    new anigrams are stored by m.animation
    }

    // ............................. enty
    let haloGeofold_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloGeofold_gramm = anima => gramm(anima)

    let haloFormed = {}
    haloFormed.ween = anima => haloGeofold_ween(anima)
    haloFormed.gramm = anima => haloGeofold_gramm(anima)

    let enty = haloFormed
    return enty
  }

  exports.haloFormed = haloFormed
}))
