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

  // xpects `a.eofold` to be `geojson.FeatureCollection`
  // or the feature collection
  // order the collection on z dax, `muonGeoj.zorder(gjcollection)`
  // identify to features on index, `muonEoric.enric(eoric, anigram, gjcollection)`

  // hen for each feature,
  // eochrom, decoding style properties
  // set sort. `feature.properties.sort` will determine rendering. default to feature
  // inherit avatars

  // then pass the collection back to `m.animation` for rendering

  async function haloLeaform (__mapper = {}) {
    let [
      muonEoric,
      muonEochrom,
      muonGeoj,
      muonProps,
    ] = await Promise.all([
      __mapper('xs').m('eoric'),
      __mapper('xs').m('eochrom'),
      __mapper('xs').m('geoj'),
      __mapper('xs').m('props'),
    ])

    const getgj = ani => {
      let gj = muonProps.v(ani.eofold, ani)
      gj.properties = gj.properties || {} // eofold properties
      gj.properties.geoformed = muonGeoj.deprop(gj)
      // gj.properties.eonode = gj.properties.eonode || {}
      // gj.properties.nodeGeoformed = gj.properties.eonode
      return gj
    }

    // ............................. gramm
    function haloing (anigram) {
      let gj = getgj(anigram)
      let gjcollection = muonGeoj.featurecollect(gj)

      console.assert(gjcollection.type === 'FeatureCollection')
      gjcollection = muonGeoj.zorder(gjcollection) // order features in collection
      gjcollection = muonEoric.enric(anigram.eoric, anigram, gjcollection) // eoric to feature or collection

      let newAnigrams = gjcollection.features.map((feature, i) => {
        feature = muonEochrom.geochromer(anigram, feature)

        feature.properties.eotim = anigram.eotim // eotim in eofold
        feature.properties.vim = anigram.eoload.vim // vim in eofold to render
        feature.properties.sort = feature.properties.sort || 'feature' // svg sort

        let newAnigram = {
          halo: anigram.halo, // inherit halo
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
    let gramm = anitem => haloing(anitem)

    // ............................. ween
    let ween = anitem => {
      if (anitem.inited !== undefined) {
        anitem.inited = 1
        return muonProps.a(anitem)
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
