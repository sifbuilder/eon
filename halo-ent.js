 /**********************
 *    @haloEnt
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloEnt = global.haloEnt || {})))
}(this, function (exports) {
  'use strict'

  let haloEnt = function haloEnt (__mapper = {}) {
    let f = __mapper('props')(),
      manitem = __mapper('xs').m('anitem'),
      mric = __mapper('xs').m('ric'),
      mboform = __mapper('xs').m('boform'),
      mgeoj = __mapper('xs').m('geoj'),
      mprofier = __mapper('xs').m('profier'),
      mstore = __mapper('xs').m('store'),
      mproj3ct = __mapper('xs').m('proj3ct'),
      mstace = __mapper('xs').m('stace')
      

    //md: ## h.ent
    //md: h.ent.ween(anima)  sets inited and gelded and returns anima  
    //md: h.ent.gramm(anima) gets newAnigrams and pass them to h.formed    
    //md:   get anigram.geofold and initialize geonode if not defined  
    //md:   keep formGeoformed from deprop'ed geofold  
    //md:   keep formGeoformed has property nodeGeoformed  
    //md:   featurize the geofold  
    //md:  corform, ereform and proform the geofold and the geonode  
          
    /**********************
   *    @gramify
   */
    let gramm = function (anima, newAnigrams = []) {

      let anigram = manitem(anima).anigram(), // anigram
        halo = anigram.halo, // halo
        geofold = anigram.geofold, // geofold
        payload = anigram.payload // payload

      let boform = payload.boform, // boform
        avatars = payload.avatars, // avatars
        ric = payload.ric, // ric
        tim = payload.tim, // tim
        vim = payload.vim, // vim
        proform = payload.proform, // proform
        conform = payload.conform, // conform
        uid = payload.uid, // uid
        parentuid = payload.parentuid // parentuid
    

      let gj  
      gj = f.v(geofold, anigram)  // get geofold
      gj.properties = gj.properties || {} // recall genode
      gj.properties.geonode = gj.properties.geonode || {} // recall genode properties

      if (2 && 2 && !mgeoj.isValid(gj)) { console.log("** h.ent:gj not valid", geofold, gj) }
      gj.properties.formGeoformed = mgeoj.deprop(gj) // store geoform
      gj.properties.nodeGeoformed = gj.properties.geonode // nodeGeoformed : geonode

      
      let gjcollection = mgeoj.featurecollect(gj)
      gjcollection.features = gjcollection.features.map( (feature,i) => {
      // let features = mgeoj.featurize(gj)  // geojson to geojson features
      // features = features.map( (feature,i) => {


        feature = mprofier.conformer(anigram)(feature)  // get conform
        feature.properties.formConformed = mgeoj.deprop(feature) // store conform
        feature.properties.nodeConformed = feature.properties.geonode // nodeConformed : geonode


        if (payload.ereform) {  // EREFORM
          let ereformion = mprofier.ereformion(anigram)
          feature = mproj3ct(feature, ereformion)
          feature.properties.formEreformed = mgeoj.deprop(feature) // store ereform
          feature.properties.nodeEreformed = mproj3ct(feature.properties.nodeConformed, ereformion)   //
          nodeConformed => nodeEreformed
        } else {
          feature.properties.nodeEreformed = feature.properties.nodeConformed
        }

if (1 && 1) console.log("proform", payload.proform)
        if (payload.proform) {
          let proformion = mprofier.proformion(anigram)
          feature = mproj3ct(feature, proformion)

          feature.properties.nodeProformed = mproj3ct(feature.properties.nodeEreformed, proformion)
        } else {
          feature.properties.nodeProformed = feature.properties.nodeEreformed
        }
        
        return feature
      })
        
        // let gjcollection = {type: 'FeatureCollection', features}
        
        
        anigram.geofold = gjcollection
        newAnigrams = __mapper('xs').h('formed').gramm(anigram)
        
      return newAnigrams //    new anigrams are stored by m.animation
    }

    /**********************
   *    @enty
   */
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
