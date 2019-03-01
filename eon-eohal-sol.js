/**********************
 *    @eohalSol
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalSol = global.eohalSol || {})))
}(this, function (exports) {
  'use strict'

  // ... *process h.sol anigrams**
  // ...
  // ... is transparent to animas and prepares anigrams to be rendered
  // ...
  // ... ani.eofold is a functor that returns a geojson
  // ... the geojson is then converted to a FeatureCollection
  // ... the features are z-ordered by centroid of their geometry
  // ... the renderer takes a featurecollection
  // ... info is passed in each feature.properties:
  // ...   geometry in geofold
  // ...   id in eoric, functor fid
  // ...   style in eocrom
  // ...   tim
  // ...   sort will define how the feature will be rendered
  // ... lose eoload
  // ... maintain eohal, eonode, avatar
  // ... the new anigrams are saved in m.animation and passed to renderer

  async function eohalSol (__eo = {}) {
    let [
      muonEoric,
      muonEocrom,
      muonGeoj,
      muonProps,
    ] = await Promise.all([
      __eo('xs').m('eoric'),
      __eo('xs').m('eocrom'),
      __eo('xs').m('geoj'),
      __eo('xs').m('props'),
    ])

    // ............................. eohale
    function eohale (inani) {
      let newAnigrams = []

      let anitem = {}

      let ownProps = Object.getOwnPropertyNames(inani)
      for (let prop of ownProps) {
        let newpropval = muonProps.v(inani[prop], inani)
        anitem[prop] = newpropval // functorize anitem
      }

      let eofold = anitem.eofold
      let gjcollection = muonGeoj.featurecollect(eofold)
      console.assert(gjcollection.type === 'FeatureCollection')

      gjcollection.features = muonGeoj.zorder(gjcollection.features)

      gjcollection = muonEoric.enric(anitem.eoric, anitem, gjcollection)

      let newcollection = {type: 'FeatureCollection', features: []}

      let newfeatues = []
      for (let i = 0; i < gjcollection.features.length; i++) {
        let feature = gjcollection.features[i]
        feature = muonEocrom.geocromer(anitem, feature)
        feature.properties.eotim = anitem.eotim
        feature.properties.sort = feature.properties.sort || 'feature'
        newfeatues.push(feature)
      }

      newcollection.features = newfeatues
      anitem.eofold = newcollection

      return Array.of(anitem)
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

    // ............................. eohalSol
    let eohalSol = {}
    eohalSol.ween = anima => ween(anima)
    eohalSol.gramm = anima => gramm(anima)

    // ............................. enty
    let enty = eohalSol
    return enty
  }

  exports.eohalSol = eohalSol
}))
