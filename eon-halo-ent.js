  /**********************
 *    @haloEnt
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloEnt = global.haloEnt || {})))
}(this, function (exports) {
  'use strict'

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

    // ............................. conform
    const c = (f, xpromise) => {
      return xpromise.then( x => {
        let feature
        feature = x(f) // CONFORM
        feature.properties.formConformed = mgeoj.deprop(feature) // store conform
        feature.properties.nodeConformed = feature.properties.geonode
        if (1 && 1) console.log('conform feature', feature)
        return feature
      })
    }

    // ............................. ereform
    const e = (f, xpromise) => {
      let feature = f
      if (xpromise) { // EREFORM
        return xpromise.then(x => {
          feature = mproj3ct(feature, x)
          feature.properties.formEreformed = mgeoj.deprop(feature) // store ereform
          feature.properties.nodeEreformed = mproj3ct(feature.properties.nodeConformed, x) //
          nodeConformed => nodeEreformed
        return feature})
      } else {
        feature.properties.formEreformed = feature.properties.formConformed
        feature.properties.nodeEreformed = feature.properties.nodeConformed
      }
      return feature
    }

    // ............................. proform
    const p = (f, xpromise) => {
      let feature = f
      if (xpromise) { // PROFORM
        return xpromise.then(x => {
          feature = mproj3ct(feature, x)
          feature.properties.formProformed = mgeoj.deprop(feature) // store proform
          feature.properties.nodeProformed = mproj3ct(feature.properties.nodeEreformed, x)
        return feature})
      } else {
        feature.properties.formProformed = feature.properties.formEreformed
        feature.properties.nodeProformed = feature.properties.nodeEreformed
      }
      return feature
    }


    let transforms = ani => f => c(f, mprofier.conformer_(ani))
                            .then(f => e(f, mprofier.ereformion_(ani)))
                            .then(f => p(f, mprofier.proformion_(ani)))

    // ............................. gramm
    async function gramm (anima, newAnigrams = []) {
      let anigram = manitem(anima).anigram()

      if (1 && 1) console.log(' ----------- 1 h.ent gramm', anigram)



      // let conformed = f => c(f, mprofier.conformer_(anigram)),
          // ereformed = f => e(f, mprofier.ereformion_(anigram)),
          // proformed = f => p(f, mprofier.proformion_(anigram))


      let gj
      gj = mprops.v(anigram.geofold, anigram) // get geofold
      gj.properties = gj.properties || {} // recall genode
      gj.properties.geonode = gj.properties.geonode || {} // recall genode properties
      gj.properties.formGeoformed = mgeoj.deprop(gj) // store geoform
      gj.properties.nodeGeoformed = gj.properties.geonode // nodeGeoformed : geonode
      if (1 && 1) console.log(' ----------- 2 h.ent gramm', anigram)

      let gjcollection = mgeoj.featurecollect(gj) // FEATURE COLLECT
      if (1 && 1) console.log(' ----------- 3 h.ent gramm', anigram)

      let features = gjcollection.features
      if (1 && 1) console.log(' ----------- 4 h.ent gramm', anigram)

      // features = await Promise.all(features.map(feature => conformed(feature)))
      // features = await Promise.all(features.map(feature => ereformed(feature)))
      // features = await Promise.all(features.map(feature => proformed(feature)))


      if (1 && 1) console.log(' ----------- 5 h.ent gramm', anigram)

      features = await Promise.all(features.map(f => transforms(anigram)(f)))

      // features = await Promise.all(features.map(
                                    // feature => conformed(feature)
                                      // .then(feature => ereformed(feature) )
                                      // .then(feature => proformed(feature) )
                                      // ))



if (1 && 1) console.log(' ------------ 6 features', features)

  gjcollection.features = features


      anigram.geofold = gjcollection
      return hformed.gramm(anigram) // _
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
