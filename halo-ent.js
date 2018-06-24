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

  async function haloEnt(__mapper = {}) {
    
    let [
        manitem, 
        mgeoj, 
        mprofier, 
        mproj3ct, 
        hformed, 
        mprops, 
      ] = await Promise.all([
        __mapper('xs').m('anitem'),
        __mapper('xs').m('geoj'),
        __mapper('xs').m('profier'),
        __mapper('xs').m('proj3ct'),
        __mapper('xs').h('formed'),
        __mapper('xs').m('props'),        

      ])    
    

    // ............................. gramm
    async function gramm(anima, newAnigrams = []) {
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
      gj = mprops.v(geofold, anigram) // get geofold
      gj.properties = gj.properties || {} // recall genode
      gj.properties.geonode = gj.properties.geonode || {} // recall genode properties

      if (2 && 2 && !mgeoj.isValid(gj)) { console.log('** h.ent:gj not valid', geofold, gj) }
      gj.properties.formGeoformed = mgeoj.deprop(gj) // store geoform
      gj.properties.nodeGeoformed = gj.properties.geonode // nodeGeoformed : geonode

      let gjcollection = mgeoj.featurecollect(gj) // FEATURE COLLECT

      
      const [
            conformion, 
            ereformion, 
            proformion 
        ] = await Promise.all([
            mprofier.conformer_(anigram), 
            mprofier.ereformion_(anigram),
            mprofier.proformion_(anigram),
        ]);


            gjcollection.features = gjcollection.features.map((ifeature, i) => { // per feature
            
            if (1 && 1) console.log(' ====================================== ifeature', ifeature)

         
              // let conformion = await mprofier.conformer_(anigram) // CONFORM
              let feature = conformion(ifeature) // CONFORM
                feature.properties.formConformed = mgeoj.deprop(feature) // store conform
                feature.properties.nodeConformed = feature.properties.geonode // nodeConformed : geonode

              if (payload.ereform) { // EREFORM
                // let ereformion = await mprofier.ereformion_(anigram)
                feature = mproj3ct(feature, ereformion)
                feature.properties.formEreformed = mgeoj.deprop(feature) // store ereform
                feature.properties.nodeEreformed = mproj3ct(feature.properties.nodeConformed, ereformion) //
                nodeConformed => nodeEreformed
              } else {
                feature.properties.formEreformed = feature.properties.formConformed
                feature.properties.nodeEreformed = feature.properties.nodeConformed
              }

              if (payload.proform) { // PROFORM
                // let proformion = await mprofier.proformion_(anigram)
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
      newAnigrams = await hformed.gramm(anigram)  //_
      if (1 && 1) console.log('hent newAnigrams:', newAnigrams)

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
