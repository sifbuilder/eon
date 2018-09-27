/**********************
 *    @eohalMars
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalMars = global.eohalMars || {})))
}(this, function (exports) {
  'use strict'

  //... eon-eohal-mars
  //... *process h.mars anigrams**
  //...
  //... xpects `a.eofold` to be `geojson.FeatureCollection`
  //... or the feature collection
  //... order the collection on z dax, `muonGeoj.zorder(gjcollection)`
  //... identify to features on index, `muonEoric.enric(eoric, anigram, gjcollection)`
  //...
  //... hen for each feature,
  //... eocrom, decoding style properties
  //... set sort. `feature.properties.sort` will determine rendering. default to feature
  //... inherit avatars
  //...
  //... then pass the collection back to `m.animation` for rendering

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

    // ............................. gramm
    function eohale (anigram) {
      
      let eofold = anigram.eofold
      let gjcollection = muonGeoj.featurecollect(eofold)

      console.assert(gjcollection.type === 'FeatureCollection')
      
      //... z-order features in the gj collection
      
      gjcollection = muonGeoj.zorder(gjcollection) 
      
      //... eoric collection
      
      gjcollection = muonEoric.enric(anigram.eoric, anigram, gjcollection)

      let newAnigrams = gjcollection.features.map((feature, i) => {
        feature = muonEocrom.geocromer(anigram, feature)

        //... eotim feature in eofold
        feature.properties.eotim = anigram.eotim 
        
        //... define render sort
        feature.properties.sort = feature.properties.sort || 'feature'

        let newAnigram = {
          eohal: anigram.eohal,
          eonode: anigram.eonode,
          
          eofold: feature,
          eoric: feature.properties.eoric,
          
          eoload: {},
          
          avatars: anigram.avatars,
        }

        return newAnigram // per feature
      })

      return newAnigrams // new anigrams are stored by m.animation
    }

    // ............................. gramm
    let gramm = anitem => {
      let newAnitems = eohale(anitem)
      return newAnitems
    }

    // ............................. ween
    let ween = anitem => {
      if (anitem.eoinited !== undefined) {
        anitem.eoinited = 1
        return muonProps.a(anitem)
      } else {
        return []
      }
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
