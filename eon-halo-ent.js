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
            if (1 && 1) console.log('_conform_', f, xpromise)
      let feature = f
      if (xpromise) { // CONFORM
        return Promise.resolve(xpromise)
          .then(x => {

            return Promise.resolve(feature)
                .then(feature => x(feature)) // CONFORM
                .then(feature => {
                  feature.properties.formConformed = mgeoj.deprop(feature)   // store proform
                  feature.properties.nodeConformed = feature.properties.geonode

                  // if (1 && 1) console.log('CONFORM ', feature)

                  return feature
                })
            })
      }
      return feature
    }



    // ............................. ereform
    const e = (f, xpromise) => {
      let feature = f
      if (xpromise) { // EREFORM
        return xpromise.then(x => {
                    if (1 && 1) console.log('_ereform_', feature, x)
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
    const p = (f, xpromise) => {
            if (1 && 1) console.log('_proform_', f, xpromise)

      let feature = f
      if (xpromise) { // PROFORM
        return Promise.resolve(xpromise)
          .then(x => {
            return Promise.resolve(feature)
                .then(feature => mproj3ct(feature, x))
                .then(feature => {
                  feature.properties.formProformed = mgeoj.deprop(feature) // store proform
                  feature.properties.nodeProformed = mproj3ct(feature.properties.nodeEreformed, x)

                  // if (1 && 1) console.log('PROFORM', feature)

                  return feature
                })
          })
      } else {
        feature.properties.formProformed = feature.properties.formEreformed
        feature.properties.nodeProformed = feature.properties.nodeEreformed
      }
      return feature
    }

    // ............................. transforms
    let transforms = ani => f => Promise.resolve(f)
                            .then(f => c(f, mprofier.conformion_(ani)))
                            .then(f => e(f, mprofier.ereformion_(ani)))
                            .then(f => p(f, mprofier.proformion_(ani)))





    const getgj = ani => {

      let gj = mprops.v(ani.geofold, ani) // get geofold
      gj.properties = gj.properties || {} // recall genode
      gj.properties.geonode = gj.properties.geonode || {} // recall genode properties
      gj.properties.formGeoformed = mgeoj.deprop(gj) // store geoform
      gj.properties.nodeGeoformed = gj.properties.geonode // nodeGeoformed : geonode
      return gj
    }


    let conformed = ani => f => c(f, mprofier.conformion_ (ani)),
        ereformed = ani => f => e(f, mprofier.ereformion_(ani)),
        proformed = ani => f => p(f, mprofier.proformion_(ani))


    // ............................. gramm
    async function gramm (anigram, newAnigrams = []) {


      return Promise.resolve(mgeoj.featurecollect(getgj(anigram)))
        .then(gjcollection => Promise.all(gjcollection.features.map(f => transforms(anigram)(f)))
                .then(newfeatures => {
                    let newcollection = Object.assign({}, gjcollection, {features:newfeatures})
                    let newanigram = Object.assign({}, anigram, {geofold: newcollection})
                    return hformed.gramm(newanigram)
                }))

// function sequence(array, callback) {
  // function chain(array, index) {
    // if (index == array.length) return Promise.resolve();
    // return Promise.resolve(callback(array[index])).then(function () {
      // return chain(array, index + 1)
    // })
  // }
  // return chain(array, 0)
// }

      // let gjcollection = mgeoj.featurecollect(getgj(anigram))
      // let features = gjcollection.features
      // let feature = gjcollection.features[0]

      // let [cer,
            // per,
           // ] = await Promise.all ([
              // mprofier.conformer_ (anigram),
              // mprofier.proformion_ (anigram)
             // ])



// if (1 && 1) console.log('cer', cer)
// if (1 && 1) console.log('per', per)

      // let cpromis = f => c(f, cer)
      // let ppromis = f => p(f, per)


      // let transforms = [cpromis, ppromis]
      // sequence(transforms, function (transform) {

        // return Promise.resolve(transform(feature))
          // .then(function (newFeature) {
          // console.log('got transformed feature ' + newFeature + transform)
        // })
      // }).catch(function (reason) {
        // console.log(' ********* ', reason)
      // })

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
