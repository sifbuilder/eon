/**********************
 *    @eonEohalSol
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonEohalSol = global.eonEohalSol || {})))
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

  async function eonitem (__eo = {}) {
    let [
      eonMuonEoric,
      eonMuonEocrom,
      eonMuonGeoj,
      eonMuonProps,
    ] = await Promise.all([
      __eo('xs').b('eon-muon-eoric'),
      __eo('xs').b('eon-muon-eocrom'),
      __eo('xs').b('eon-muon-geoj'),
      __eo('xs').b('eon-muon-props'),
    ])

    // ............................. eohale
    function eohale (inani) {
      let newAnigrams = []

      let anitem = {}

      let ownProps = Object.getOwnPropertyNames(inani)
      for (let prop of ownProps) {
        let newpropval = eonMuonProps.v(inani[prop], inani)
        anitem[prop] = newpropval // functorize anitem
      }

      let eofold = anitem.eofold
      let gjcollection = eonMuonGeoj.featurecollect(eofold)
      console.assert(gjcollection.type === 'FeatureCollection')

      gjcollection.features = eonMuonGeoj.zorder(gjcollection.features)

      gjcollection = eonMuonEoric.enric(anitem.eoric, anitem, gjcollection)

      let newcollection = {type: 'FeatureCollection', features: []}

      let newfeatues = []
      for (let i = 0; i < gjcollection.features.length; i++) {
        let feature = gjcollection.features[i]
        feature = eonMuonEocrom.geocromer(anitem, feature)
        feature.properties.eotim = anitem.eotim
        feature.properties.sort = feature.properties.sort || 'feature'
        newfeatues.push(feature)
      }

      newcollection.features = newfeatues
      anitem.eofold = newcollection

      return Array.of(anitem)
    }

    // ............................. anify
    let anify = anitem => {
      let newitems = []

      newitems = eonMuonProps.a(anitem)

      return newitems
    }

    // ............................. gramify

    let gramify = anitem => {
      let newitems = []

      newitems = eohale(anitem)

      return newitems
    }

    // ............................. eonEohalSol
    let eonEohalSol = {}
    eonEohalSol.anify = anima => anify(anima)
    eonEohalSol.gramify = anima => gramify(anima)

    // ............................. enty
    let enty = eonEohalSol
    return enty
  }

  exports.eonEohalSol = eonitem
}))
