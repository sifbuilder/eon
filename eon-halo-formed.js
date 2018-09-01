/**********************
 *    @haloFormed
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloFormed = global.haloFormed || {})))
}(this, function (exports) {
  'use strict'

  // eon-halo-formed
  // *process h.formed anigrams**

  // xpects `a.geofold` to be `geojson.FeatureCollection`
  // or the feature collection
  // order the collection on z dax, `mgeoj.zorder(gjcollection)`
  // identify to features on index, `mric.enric(ric, anigram, gjcollection)`

  // hen for each feature,
  // boform, decoding style properties
  // set sort. `feature.properties.sort` will determine rendering. default to feature
  // inherit avatars

  // then pass the collection back to `m.animation` for rendering

  async function haloFormed (__mapper = {}) {
    let [
      mric,
      mboform,
      mgeoj,
      mprops,
    ] = await Promise.all([
      __mapper('xs').m('ric'),
      __mapper('xs').m('boform'),
      __mapper('xs').m('geoj'),
      __mapper('xs').m('props'),
    ])

    const getgj = ani => {
      let gj = mprops.v(ani.payload.geofold, ani) // get geofold
      gj.properties = gj.properties || {} // recall genode
      gj.properties.geonode = gj.properties.geonode || {} // recall genode properties
      gj.properties.formGeoformed = mgeoj.deprop(gj) // store geoform
      gj.properties.nodeGeoformed = gj.properties.geonode // nodeGeoformed : geonode
      return gj
    }

    // ............................. gramm
    function gramm (anigram) {
      let gjcollection = mgeoj.featurecollect(getgj(anigram))

      console.assert(gjcollection.type === 'FeatureCollection')
      gjcollection = mgeoj.zorder(gjcollection) // order features in collection
      gjcollection = mric.enric(anigram.payload.ric, anigram, gjcollection) // ric to feature or collection

      let newAnigrams = gjcollection.features.map((feature, i) => {
        feature = mboform.boformer(anigram, feature)

        feature.properties.tim = anigram.payload.tim // tim in geofold
        feature.properties.vim = anigram.payload.vim // vim in geofold to render
        feature.properties.sort = feature.properties.sort || 'feature' // svg sort

        let newAnigram = {
          halo: anigram.halo, // inherit halo
          // geofold: feature, // inherit geofold
          payload: { // payload is lost in m.animation before rendering
            geofold: feature, // inherit geofold
            ric: feature.properties.ric, // hoist ric
            id: feature.properties.uid, // hoist uid
            uid: feature.properties.uid, // hoist uid
          },
          avatars: anigram.avatars, // inherit avatars
        }

        return newAnigram
      })

      return newAnigrams //    new anigrams are stored by m.animation
    }

    // ............................. ween
    let ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []

    // ............................. halo
    let haloFormed = {}
    haloFormed.ween = anima => ween(anima)
    haloFormed.gramm = anima => gramm(anima)

    // ............................. enty
    let enty = haloFormed
    return enty
  }

  exports.haloFormed = haloFormed
}))
