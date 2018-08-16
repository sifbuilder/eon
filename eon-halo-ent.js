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
      hformed,
      mprops,
    ] = await Promise.all([
      __mapper('xs').m('geoj'),
      __mapper('xs').m('profier'),
      __mapper('xs').m('proj3ct'),
      __mapper('xs').h('formed'),
      __mapper('xs').m('props'),

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
        .catch(e => { console.log('error', e) })
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
          let feature = r[0]
          let projection = r[1]
          if (projection) {
            let f = mproj3ct(feature, projection)
            f.properties.formProformed = mgeoj.deprop(f) // store proform
            f.properties.nodeProformed = mproj3ct(f.properties.nodeEreformed, projection)
            return f
          } else {
            let f = feature
            f.properties.formProformed = f.properties.formEreformed
            f.properties.nodeProformed = f.properties.nodeEreformed
            return f
          }
        })
        .catch(e => { console.log('error', e) })
    }

    // ............................. getgj
    const getgj = anitem => {
          let ani = anitem
          if (Array.isArray(ani)) ani = ani[0]
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
      let eproj = mprofier.ereformion_(ani)
      let pproj = mprofier.proformion_(ani)
      return f => p(e(c(f, cproj), eproj), pproj)
    }
    
    // ............................. transforms    
    let transforms = (f, ani) => transformer(ani)(f)

    // ............................. gramm
    async function gramm (ani) {

      let anigram = ani.length > 0 ? ani[0] : ani
      
      let gj = getgj(anigram) 
      
      let gjcollection = mgeoj.featurecollect(gj)
      
      let newfeatures = await Promise.all(gjcollection.features.map(f => transforms(f, anigram)))
    
      let newcollection =  Object.assign({}, gjcollection, {features: newfeatures})
    
      let newAni = Object.assign({}, anigram, {geofold: newcollection})    
    
      let newAnitems = await hformed.gramm(newAni)
      
      return newAnitems

    }
    
    // ............................. ween
    let ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []

    // ............................. halo
    let haloEnt = {}
    haloEnt.ween = anima => ween(anima)
    haloEnt.gramm = anima => gramm(anima)

    // ............................. enty
    let enty = haloEnt
    return enty
  }

  exports.haloEnt = haloEnt
}))
