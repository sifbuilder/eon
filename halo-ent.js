/**********************
 *    @haloEnt
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloEnt = global.haloEnt || {})))
}(this, function (exports) {
  'use strict'

  // md: # md:{filename}
  // md: **process h.ent animas**
  // md: Feature Collect gj. for each feature
  // md:  geoform, conform, ereform and proform anigrams
  // md:  then pass the FeatureCollection to h.formed
  // md:  define `geofold.properties.geonode` if undefined

  let haloEnt = function (__mapper = {}) {
    let f = __mapper('xs').m('props'),
      manitem = __mapper('xs').m('anitem'),
      mric = __mapper('xs').m('ric'),
      mboform = __mapper('xs').m('boform'),
      mgeoj = __mapper('xs').m('geoj'),
      mprofier = __mapper('xs').m('profier'),
      mstore = __mapper('xs').m('store'),
      mproj3ct = __mapper('xs').m('proj3ct'),
      mstace = __mapper('xs').m('stace'),
      hformed = __mapper('xs').h('formed')

    // ............................. gramm
    let gramm = function (anima, newAnigrams = []) {
      let anigram = manitem(anima).anigram(), // anigram
        halo = anigram.halo, // halo
        geofold = anigram.geofold, // geofold
        payload = anigram.payload, // payload
        avatars = anigram.avatars // avatars

      let boform = payload.boform, // boform
        ric = payload.ric, // ric
        tim = payload.tim, // tim
        vim = payload.vim, // vim
        proform = payload.proform, // proform
        conform = payload.conform, // conform
        uid = payload.uid, // uid
        parentuid = payload.parentuid // parentuid

      let gj
      gj = f.v(geofold, anigram) // get geofold
      gj.properties = gj.properties || {} // recall genode
      gj.properties.geonode = gj.properties.geonode || {} // recall genode properties

      if (2 && 2 && !mgeoj.isValid(gj)) { console.log('** h.ent:gj not valid', geofold, gj) }
      gj.properties.formGeoformed = mgeoj.deprop(gj) // store geoform
      gj.properties.nodeGeoformed = gj.properties.geonode // nodeGeoformed : geonode

      let gjcollection = mgeoj.featurecollect(gj) // FEATURE COLLECT

      gjcollection.features = gjcollection.features.map((f, i) => { // per feature
   
        let feature = mprofier.conformer(anigram)(f) // CONFORM
          feature.properties.formConformed = mgeoj.deprop(feature) // store conform
          feature.properties.nodeConformed = feature.properties.geonode // nodeConformed : geonode

        if (payload.ereform) { // EREFORM
          let ereformion = mprofier.ereformion(anigram)
          feature = mproj3ct(feature, ereformion)
          feature.properties.formEreformed = mgeoj.deprop(feature) // store ereform
          feature.properties.nodeEreformed = mproj3ct(feature.properties.nodeConformed, ereformion) //
          nodeConformed => nodeEreformed
        } else {
          feature.properties.formEreformed = feature.properties.formConformed
          feature.properties.nodeEreformed = feature.properties.nodeConformed
        }

        if (payload.proform) { // PROFORM
          let proformion = mprofier.proformion(anigram)
          feature = mproj3ct(feature, proformion)
          feature.properties.formProformed = mgeoj.deprop(feature) // store proform
          feature.properties.nodeProformed = mproj3ct(feature.properties.nodeEreformed, proformion)
        } else {
          feature.properties.formProformed = feature.properties.formEreformed
          feature.properties.nodeProformed = feature.properties.nodeEreformed
        }

        return feature
      })

      anigram.geofold = gjcollection // new anigram geofold is FeatureCollection
      newAnigrams = hformed.gramm(anigram)

      return newAnigrams //    new anigrams are stored by m.animation
    }

    // ............................. enty
    let haloGeofold_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloGeofold_gramm = anima => gramm(anima)

    let haloEnt = {}
    haloEnt.ween = anima => haloGeofold_ween(anima)
    haloEnt.gramm = anima => haloGeofold_gramm(anima)

    let enty = haloEnt
    return enty
  }

  exports.haloEnt = haloEnt
}))
