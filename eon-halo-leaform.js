/**********************
 *    @haloLeaform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloLeaform = global.haloLeaform || {})))
}(this, function (exports) {
  'use strict'

  // eon-halo-leaform
  // *process h.leaform anigrams**

  // xpects `a.geofold` to be `geojson.FeatureCollection`
  // or the feature collection
  // order the collection on z dax, `muonGeoj.zorder(gjcollection)`
  // identify to features on index, `muonRic.enric(ric, anigram, gjcollection)`

  // hen for each feature,
  // geochrom, decoding style properties
  // set sort. `feature.properties.sort` will determine rendering. default to feature
  // inherit avatars

  // then pass the collection back to `m.animation` for rendering

  async function haloLeaform (__mapper = {}) {
    let [
      muonRic,
      muonGeochrom,
      muonGeoj,
      mprops,
    ] = await Promise.all([
      __mapper('xs').m('ric'),
      __mapper('xs').m('geochrom'),
      __mapper('xs').m('geoj'),
      __mapper('xs').m('props'),
    ])

    const getgj = ani => {
      let gj = mprops.v(ani.geofold, ani)
      gj.properties = gj.properties || {} // geofold properties
      gj.properties.geoformed = muonGeoj.deprop(gj)
      // gj.properties.geonode = gj.properties.geonode || {}
      // gj.properties.nodeGeoformed = gj.properties.geonode
      return gj
    }

    // ............................. gramm
    function haloing (anigram) {
      let gj = getgj(anigram)
      let gjcollection = muonGeoj.featurecollect(gj)

      console.assert(gjcollection.type === 'FeatureCollection')
      gjcollection = muonGeoj.zorder(gjcollection) // order features in collection
      gjcollection = muonRic.enric(anigram.ric, anigram, gjcollection) // ric to feature or collection

      let newAnigrams = gjcollection.features.map((feature, i) => {
        feature = muonGeochrom.geochromer(anigram, feature)

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
        anitem.inited = anitem.gelded = 1

        return [anitem]
      } else {
        return []
      }
    }

    // ............................. halo
    let haloLeaform = {}
    haloLeaform.ween = anima => ween(anima)
    haloLeaform.gramm = anima => gramm(anima)

    // ............................. enty
    let enty = haloLeaform
    return enty
  }

  exports.haloLeaform = haloLeaform
}))
