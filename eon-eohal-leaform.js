/**********************
 *    @eohalLeaform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalLeaform = global.eohalLeaform || {})))
}(this, function (exports) {
  'use strict'

  // eon-eohal-leaform
  // *process h.leaform anigrams**

  // xpects `a.eofold` to be `geojson.FeatureCollection`
  // or the feature collection
  // order the collection on z dax, `muonGeoj.zorder(gjcollection)`
  // identify to features on index, `muonEoric.enric(eoric, anigram, gjcollection)`

  // hen for each feature,
  // eocrom, decoding style properties
  // set sort. `feature.properties.sort` will determine rendering. default to feature
  // inherit avatars

  // then pass the collection back to `m.animation` for rendering

  async function eohalLeaform (__mapper = {}) {
    let [
      muonEoric,
      muonEochrom,
      muonGeoj,
      muonProps,
    ] = await Promise.all([
      __mapper('xs').m('eoric'),
      __mapper('xs').m('eocrom'),
      __mapper('xs').m('geoj'),
      __mapper('xs').m('props'),
    ])

    const getgj = ani => {
      let gj = muonProps.v(ani.eofold, ani)
      gj.properties = gj.properties || {} // eofold properties
      // gj.properties.geoformed = muonGeoj.deprop(gj)
      // gj.properties.eonode = gj.properties.eonode || {}
      // gj.properties.nodeGeoformed = gj.properties.eonode
      return gj
    }

    // ............................. gramm
    function eohale (anigram) {
      let gj = getgj(anigram)
      let gjcollection = muonGeoj.featurecollect(gj)

      console.assert(gjcollection.type === 'FeatureCollection')
      gjcollection = muonGeoj.zorder(gjcollection) // order features in collection
      gjcollection = muonEoric.enric(anigram.eoric, anigram, gjcollection) // eoric to feature or collection

      let newAnigrams = gjcollection.features.map((feature, i) => {
        feature = muonEochrom.geochromer(anigram, feature)

        feature.properties.eotim = anigram.eotim // eotim in eofold
        feature.properties.sort = feature.properties.sort || 'feature' // svg sort

        let newAnigram = {
          eohal: anigram.eohal, // inherit eohal
          eofold: feature, // inherit eofold
          eonode: anigram.eonode,
          eoric: feature.properties.eoric, // hoist eoric
          id: feature.properties.uid, // hoist uid
          uid: feature.properties.uid, // hoist uid
          eoload: {}, // eoload is lost in m.animation before rendering
          avatars: anigram.avatars, // inherit avatars
        }

        return newAnigram
      })

      return newAnigrams //    new anigrams are stored by m.animation
    }

    // ............................. ween
    let gramm = anitem => eohale(anitem)

    // ............................. ween
    let ween = anitem => {
      if (anitem.eoinited !== undefined) {
        anitem.eoinited = 1
        return muonProps.a(anitem)
      } else {
        return []
      }
    }

    // ............................. eohal
    let eohalLeaform = {}
    eohalLeaform.ween = anima => ween(anima)
    eohalLeaform.gramm = anima => gramm(anima)

    // ............................. enty
    let enty = eohalLeaform
    return enty
  }

  exports.eohalLeaform = eohalLeaform
}))
