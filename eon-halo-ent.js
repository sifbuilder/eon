/**********************
 *    @haloEnt
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloEnt = global.haloEnt || {})))
}(this, function (exports) {
  'use strict'

  // md: # eon-halo-ent
  // md: **process h.ent animas**
  // md: Feature Collect gj. for each feature
  // md: geoform, conform, ereform and proform anigrams
  // md: then pass the FeatureCollection to h.formed
  // md: define `geofold.properties.geonode` if undefined

  async function haloEnt (__mapper = {}) {
    let [
      mgeoj,
      mprofier,
      mproj3ct,
      mprops,
      haloFormed,
    ] = await Promise.all([
      __mapper('xs').m('geoj'),
      __mapper('xs').m('profier'),
      __mapper('xs').m('proj3ct'),
      __mapper('xs').m('props'),
      __mapper('xs').h('formed'),

    ])

    // ............................. ereform
    function e (feat, proj) {
      return Promise.all([feat, proj])
        .then(r => {
          let feature = r[0]
          let projection = r[1]
          if (projection) {
            let f = mproj3ct(feature, projection)
            f.properties.formEreformed = mgeoj.deprop(f) // store proform
            f.properties.nodeEreformed = mproj3ct(f.properties.nodeConformed, projection)
            return f
          } else {
            let f = feature
            f.properties.formEreformed = f.properties.formConformed
            f.properties.nodeEreformed = f.properties.nodeConformed
            return f
          }
        })
    }

    // ............................. conform
    function c (feature, proj) {
      let enproj = f => {
        f.properties.formConformed = mgeoj.deprop(f) // store proform
        f.properties.nodeConformed = f.properties.geonode
        return f
      }

      return Promise.resolve(proj)
        .then(projection =>
          projection
            ? enproj(mproj3ct(feature, projection))
            : enproj(feature)
        )
    }

    // ............................. proform
    function p (feat, proj) {
      return Promise.all([feat, proj])
        .then(r => {
          let [feature, projection] = r
          let res

          if (projection) {
            res = mproj3ct(feature, projection)
            res.properties.formProformed = mgeoj.deprop(res) // store proform
            res.properties.nodeProformed = mproj3ct(res.properties.nodeEreformed, projection)
          } else {
            res = feature
            res.properties.formProformed = res.properties.formEreformed
            res.properties.nodeProformed = res.properties.nodeEreformed
          }

          return res
        })
    }

    // ............................. getgj
    const getgj = anitem => {
      let ani = anitem
      if (Array.isArray(ani)) ani = ani[0]
      let gj = mprops.v(ani.payload.geofold, ani) // get geofold
      gj.properties = gj.properties || {} // recall genode
      gj.properties.geonode = gj.properties.geonode || {} // recall genode properties
      gj.properties.formGeoformed = mgeoj.deprop(gj) // store geoform
      gj.properties.nodeGeoformed = gj.properties.geonode // nodeGeoformed : geonode
      return gj
    }

    // ............................. transforms
    let transformer = (ani) => {
      let cproj = mprofier.conformion_(ani)
      let eproj = mprofier.ereformion_(ani)
      let pproj = mprofier.proformion_(ani)
      return f => p(e(c(f, cproj), eproj), pproj)
    }

    // ............................. transforms
    let transforms = (f, ani) => transformer(ani)(f)

    // ............................. enent
    async function enent (anitem) {
if (1 && 1) console.log('anitem', anitem)   
  
      let anigram = anitem.length > 0 ? anitem[0] : anitem

      // anigram geofold to feature collection
      
      let gjcollection = mgeoj.featurecollect(getgj(anigram))
      
      
      // geojson conform, ereform, proform transforms 
      
      let promisesForTransformedFeatures = gjcollection.features.map(f => transforms(f, anigram))
      let newfeatures = await Promise.all(promisesForTransformedFeatures)

      // newitem geofold is collection of transformed features
      
      let newcollection = Object.assign({}, gjcollection, {features: newfeatures})
      let newpayload = Object.assign({}, anigram.payload, {geofold: newcollection})
      let newAni = Object.assign({}, anigram, {payload: newpayload})

      // return h.formed newitems 
      
      let newAnitems = haloFormed.gramm(newAni)
if (1 && 1) console.log('newAnitems', newAnitems)
      return newAnitems
    }

    // ............................. gramm
    let gramm = anitem => enent (anitem)
    
    // ............................. ween
    let ween = anitem => (anitem.payload.inited !== 1) ? (anitem.payload.inited = anitem.payload.gelded = 1, [anitem]) : []

    // ............................. halo
    let haloEnt = {}
    haloEnt.ween = anitem => ween(anitem)
    haloEnt.gramm = anitem => gramm(anitem)

    // ............................. enty
    let enty = haloEnt
    return enty
  }

  exports.haloEnt = haloEnt
}))
