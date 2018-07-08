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

    // ............................. ereform
    async function e (feature, proj) {
if (1 && 1) console.log('_ ereform _______________ 1 feature', feature)
      if (proj) { // EREFORM

        return proj.then(x => {

          feature = mproj3ct(feature, x)
          feature.properties.formEreformed = mgeoj.deprop(feature) // store ereform
          feature.properties.nodeEreformed = mproj3ct(feature.properties.nodeConformed, x) //
          nodeConformed => nodeEreformed
if (1 && 1) console.log('_ ereform _______________ 2 feature', feature)
          return feature
        })
      } else {
        Promise.resolve(feature)
          .then(feature => {
            feature.properties.formEreformed = feature.properties.formConformed
            feature.properties.nodeEreformed = feature.properties.nodeConformed
if (1 && 1) console.log('_ ereform _______________ 2 feature', feature)
            return feature
        })
      }
    }

    // ............................. conform
    function c (feature, proj) {
if (1 && 1) console.log('_ conform _______________ 1 feature', feature, proj)

      let enproj = f => {
                  f.properties.formConformed = mgeoj.deprop(f)   // store proform
                  f.properties.nodeConformed = f.properties.geonode
                  return f
                }

      return Promise.resolve(proj)
          .then(projection => enproj(mproj3ct(feature, projection)))

    }

    // ............................. proform
    function p (feature, projection) {
if (1 && 1) console.log('_ proform _______________ 1 feature', feature, projection)


      return Promise.all([feature, projection])
        .then(r => {
if (1 && 1) console.log('_ proform _______________ 2a0 r', r[0], r[1])
                  let f = mproj3ct(r[0], r[1])
                  f.properties.formProformed = mgeoj.deprop(f) // store proform
                  f.properties.nodeProformed = mproj3ct(f.properties.nodeEreformed,r[1])
if (1 && 1) console.log('_ proform _______________ 2a1 f', f, r[1])
                  return f
                })
        .catch(e => {console.log('error', e)})




      // if (projection) { // PROFORM


        // return Promise.resolve(projection)
          // .then(x => {
            // return Promise.resolve(feature)
                // .then(feature => mproj3ct(feature, x))
                // .then(feature => {

                  // feature.properties.formProformed = mgeoj.deprop(feature) // store proform
                  // feature.properties.nodeProformed = mproj3ct(feature.properties.nodeEreformed, x)
// if (1 && 1) console.log('_ proform _______________ 2a feature', feature, x)
                  // return feature
                // })
          // })
      // } else {
        // feature.properties.formProformed = feature.properties.formEreformed
        // feature.properties.nodeProformed = feature.properties.nodeEreformed
// if (1 && 1) console.log('_ proform _______________ 2b feature', feature)
        // return feature
      // }
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
    let transformer = (ani) => {
                              let cproj = mprofier.conformion_(ani)
                              // let eproj = mprofier.ereformion_(ani)
                              let pproj = mprofier.proformion_(ani)
                              // return f => p(e(c(f,cproj),eproj),pproj)
                              return f => p(c(f,cproj),pproj)
                           }
    let transforms = (f, ani) => transformer(ani)(f)



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
