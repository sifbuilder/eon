/**********************
 *    @eohalMars
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalMars = global.eohalMars || {})))
}(this, function (exports) {
  'use strict'

  //... *process h.mars anigrams**
  //...
  //... is transparent to animas and prepares anigrams to be rendered
  //...
  //... ani.eofold is a functor that returns a geojson
  //... the geojson is then converted to a FeatureCollection
  //... the features are z-ordered by centroid of their geometry
  //... the renderer takes a featurecollection
  //... info is passed in each feature.properties:
  //...   geometry in geofold
  //...   id in eoric, functor fid
  //...   style in eocrom
  //...   tim
  //...   sort will define how the feature will be rendered
  //... lose eoload
  //... maintain eohal, eonode, avatar
  //... the new anigrams are saved in m.animation and passed to renderer


  async function eohalMars (__mapper = {}) {
    let [
      muonEoric,
      muonEocrom,
      muonGeoj,
      muonProps,
    ] = await Promise.all([
      __mapper('xs').m('eoric'),
      __mapper('xs').m('eocrom'),
      __mapper('xs').m('geoj'),
      __mapper('xs').m('props'),
    ])

    // ............................. eohale
    function eohale (anitem) {
      let newAnigrams = []

      let eofold = muonProps.v(anitem.eofold, anitem)
      let gjcollection = muonGeoj.featurecollect(eofold)

      console.assert(gjcollection.type === 'FeatureCollection')
      
      gjcollection = muonGeoj.zorder(gjcollection)
      
      gjcollection = muonEoric.enric(anitem.eoric, anitem, gjcollection)

      for (let i=0; i< gjcollection.features.length; i++) {
        
        let feature = gjcollection.features[i]
        
        feature = muonEocrom.geocromer(anitem, feature)

        feature.properties.eotim = anitem.eotim
        feature.properties.sort = feature.properties.sort || 'feature'

        let newAnigram = {
          eohal: anitem.eohal,
          eofold: feature,
          eonode: anitem.eonode,
          eoric: feature.properties.eoric,
          eoload: {},
          avatars: anitem.avatars,
        }

        newAnigrams.push(newAnigram)
        
      }

      return newAnigrams
    }


    // ............................. ween
    let ween = anitem => {

      let newitems = []

      newitems = muonProps.a(anitem)

      return newitems

    }

    // ............................. gramm

    let gramm = anitem => {

      let newitems = []

      newitems = eohale(anitem)

      return newitems

    }

    // ............................. eohalMars
    let eohalMars = {}
    eohalMars.ween = anima => ween(anima)
    eohalMars.gramm = anima => gramm(anima)

    // ............................. enty
    let enty = eohalMars
    return enty
  }

  exports.eohalMars = eohalMars
}))
