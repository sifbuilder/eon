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

    // ............................. proform
    const c = (feature, proj) => {


      if (proj) { // PROFORM
        if (1 && 1) console.log('_conform_', feature, proj)
        return Promise.resolve(proj)
          .then(x => {
            return Promise.resolve(feature)
                .then(feature => mproj3ct(feature, x))
                .then(feature => {
                  feature.properties.formConformed = mgeoj.deprop(feature)   // store proform
                  feature.properties.nodeConformed = feature.properties.geonode

                  // if (1 && 1) console.log('PROFORM', feature)

                  return feature
                })
          })
      } else {

      }
      return feature
    }

    // ............................. ereform
    const e = (feature, proj) => {

      if (proj) { // EREFORM
        if (1 && 1) console.log('_ereform_', feature, x)
        return proj.then(x => {

          feature = mproj3ct(feature, x)
          feature.properties.formEreformed = mgeoj.deprop(feature) // store ereform
          feature.properties.nodeEreformed = mproj3ct(feature.properties.nodeConformed, x) //
          nodeConformed => nodeEreformed
          return feature
        })
      } else {
        feature.properties.formEreformed = feature.properties.formConformed
        feature.properties.nodeEreformed = feature.properties.nodeConformed
      }
      return feature
    }

    // ............................. proform
    const p = (feature, proj) => {

      if (proj) { // PROFORM
        if (1 && 1) console.log('_proform_', feature, proj)
        return Promise.resolve(proj)
          .then(x => {
            return Promise.resolve(feature)
                .then(feature => mproj3ct(feature, x))
                .then(feature => {
                  feature.properties.formProformed = mgeoj.deprop(feature) // store proform
                  feature.properties.nodeProformed = mproj3ct(feature.properties.nodeEreformed, x)

                  return feature
                })
          })
      } else {
        feature.properties.formProformed = feature.properties.formEreformed
        feature.properties.nodeProformed = feature.properties.nodeEreformed
      }
      return feature
    }

    

    const getgj = ani => {

      let gj = mprops.v(ani.geofold, ani) // get geofold
      gj.properties = gj.properties || {} // recall genode
      gj.properties.geonode = gj.properties.geonode || {} // recall genode properties
      gj.properties.formGeoformed = mgeoj.deprop(gj) // store geoform
      gj.properties.nodeGeoformed = gj.properties.geonode // nodeGeoformed : geonode
      return gj
    }

    
    // ............................. transforms
    let transforms = (f, ani) => Promise.resolve(f)
                            .then(f => c(f, mprofier.conformion_(ani)))
                            .then(f => e(f, mprofier.ereformion_(ani)))
                            .then(f => p(f, mprofier.proformion_(ani)))

    // ............................. gramm
    async function gramm (anigram, newAnigrams = []) {


      // return Promise.resolve(mgeoj.featurecollect(getgj(anigram)))
        // .then(gjcollection => Promise.all(gjcollection.features.map(f => transforms(anigram)(f)))
                // .then(newfeatures => {
                    // let newcollection = Object.assign({}, gjcollection, {features:newfeatures})
                    // let newanigram = Object.assign({}, anigram, {geofold: newcollection})
                    // return hformed.gramm(newanigram)
                // }))


      return Promise.resolve({anigram, gjcollection:mgeoj.featurecollect(getgj(anigram))})
          .then(ag => Promise.all(ag.gjcollection.features.map(f => transforms(f, ag.anigram)))
                .then(newfeatures => {
                  if (1 && 1) console.log(' -------------------- newfeatures', newfeatures.length)

                    let newcollection = Object.assign({}, ag.gjcollection, {features:newfeatures})
                    let newanigram = Object.assign({}, ag.anigram, {geofold: newcollection})
                    return hformed.gramm(newanigram)
                }))



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
