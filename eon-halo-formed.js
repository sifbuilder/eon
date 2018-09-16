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
      let gj = mprops.v(ani.geofold, ani)
      gj.properties = gj.properties || {} // geofold properties
      gj.properties.geoformed = mgeoj.deprop(gj)
      // gj.properties.geonode = gj.properties.geonode || {}
      // gj.properties.nodeGeoformed = gj.properties.geonode
      return gj
    }

    // ............................. gramm
    function haloing (anigram) {
      let gj = getgj(anigram)
      let gjcollection = mgeoj.featurecollect(gj)

      console.assert(gjcollection.type === 'FeatureCollection')
      gjcollection = mgeoj.zorder(gjcollection) // order features in collection
      gjcollection = mric.enric(anigram.ric, anigram, gjcollection) // ric to feature or collection

      let newAnigrams = gjcollection.features.map((feature, i) => {
        feature = mboform.boformer(anigram, feature)

        feature.properties.tim = anigram.tim // tim in geofold
        feature.properties.vim = anigram.payload.vim // vim in geofold to render
        feature.properties.sort = feature.properties.sort || 'feature' // svg sort

        let newAnigram = {
          halo: anigram.halo, // inherit halo
          geofold: feature, // inherit geofold
          geonode: anigram.geonode,
          ric: feature.properties.ric, // hoist ric
          id: feature.properties.uid, // hoist uid
          uid: feature.properties.uid, // hoist uid
          payload: {}, // payload is lost in m.animation before rendering
          avatars: anigram.avatars, // inherit avatars
        }

        return newAnigram
      })

      return newAnigrams //    new anigrams are stored by m.animation
    }

    // ............................. ween
    let gramm = anitem => haloing(anitem)

    // ............................. ween
    let ween = anitem => {
      if (anitem.inited !== 1) {
        anitem.inited = anitem.payload.gelded = 1

        return [anitem]
      } else {
        return []
      }
    }

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
