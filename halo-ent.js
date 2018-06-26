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

  async function haloEnt (__mapper = {}) {
    let [
      manitem,
      mgeoj,
      mprofier,
      mproj3ct,
      hformed,
      mprops
    ] = await Promise.all([
      __mapper('xs').m('anitem'),
      __mapper('xs').m('geoj'),
      __mapper('xs').m('profier'),
      __mapper('xs').m('proj3ct'),
      __mapper('xs').h('formed'),
      __mapper('xs').m('props')

    ])

      const c = (f,x) => {
        let feature
        feature = x(f) // CONFORM
        feature.properties.formConformed = mgeoj.deprop(feature) // store conform
        feature.properties.nodeConformed = feature.properties.geonode
        return feature
      }

      const e = (f,x) => {
        let feature = f
        if (x) { // EREFORM
          feature = mproj3ct(feature, x)
          feature.properties.formEreformed = mgeoj.deprop(feature) // store ereform
          feature.properties.nodeEreformed = mproj3ct(feature.properties.nodeConformed, x) //
          nodeConformed => nodeEreformed
        } else {
          feature.properties.formEreformed = feature.properties.formConformed
          feature.properties.nodeEreformed = feature.properties.nodeConformed
        }
        return feature
      }

      const p = (f,x) => {
        let feature = f
        if (x) { // PROFORM
          feature = mproj3ct(feature, x)
          feature.properties.formProformed = mgeoj.deprop(feature) // store proform
          feature.properties.nodeProformed = mproj3ct(feature.properties.nodeEreformed, x)
        } else {
          feature.properties.formProformed = feature.properties.formEreformed
          feature.properties.nodeProformed = feature.properties.nodeEreformed
        }
        return feature
      }

    // ............................. gramm
    async function grammify (anigram, newAnigrams = []) {
       if (1 && 1) console.log('grammify', anigram)

      let [
            conformion,
            ereformion,
            proformion
           ] = await Promise.all([
            mprofier.conformer_(anigram),
            mprofier.ereformion_(anigram),
            mprofier.proformion_(anigram)
           ])
      const t = f => p(e(c(f,conformion),ereformion),proformion)

      let gj
      gj = mprops.v(anigram.geofold, anigram) // get geofold
      gj.properties = gj.properties || {} // recall genode
      gj.properties.geonode = gj.properties.geonode || {} // recall genode properties
      gj.properties.formGeoformed = mgeoj.deprop(gj) // store geoform
      gj.properties.nodeGeoformed = gj.properties.geonode // nodeGeoformed : geonode

      let gjcollection = mgeoj.featurecollect(gj) // FEATURE COLLECT

      gjcollection.features = gjcollection.features.map(t)
      anigram.geofold = gjcollection
      return hformed.gramm(anigram) // _

    }

    // ............................. gramm
    async function gramm (anima) {
      if (1 && 1) console.log('gramm', anima)

      return await grammify(manitem(anima).anigram())


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
