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

    /**********************
   *    @gramify
   */
    let gramm = function (anima, newAnigrams = []) {
      let anigram = manitem(anima).anigram(), // anigram
        halo = anigram.halo, // halo
        geofold = anigram.geofold, // geofold
        payload = anigram.payload // payload

      let boform = payload.boform, // boform
        ric = payload.ric, // ric
        tim = payload.tim, // tim
        proform = payload.proform, // proform
        conform = payload.conform, // conform
        uid = payload.uid, // uid
        parentuid = payload.parentuid // parentuid
        
        
      let gjGeoformed = f.v(geofold, anigram)
      if (!mgeoj.isValid(gjGeoformed)) { console.error("h.ent:gj not valid", gjGeoformed)}
        

      // conform does not affect geonode. impacts siti of avatars
      let gjConformed = mprofier.conformer(anigram)(gjGeoformed)

       
       
       
      let prebased = gjConformed
      
      
      //    geonode translation
      //    translate geofold geometry by geonode coordinates
      //    need tranlation before rotation
      //
      // if (prebased.properties && prebased.properties.geonode) { // if payload.geonode
        // let geonode = prebased.properties.geonode
        // let situation = {   // situs defined in geonode
          // 'projection': 'uniwen',
          // 'translate': geonode.geometry.coordinates
        // }
        // prebased = mproj3ct(prebased, mprofier.profiom(situation)) 
      // }
      
      if (1 && 1) if (anigram.geofold.properties.name == 'ball') console.log("anigram", anigram)
      
      //    rotation, control rotation, proform stace translation
      //    uniwen: rotation, tranlations
      //
      let proformion = mprofier.proformion(anigram),
          gjProformed = mproj3ct(prebased, proformion),
          gj = gjProformed
          
          
  console.log("anigram", anigram.payload.uid,
                          gj.geometry.coordinates,
                          // gj.properties.geonode.geometry.coordinates
                          )
          
      // let gjProformed = gjConformed
      // if (anigram.payload.proform) {
        
        // let projdef = anigram.payload.proform
        
        // if (projdef.translate) {
          // projdef.translate = mstace.getTranspot(projdef.translate, anigram)
        // }
        
        // let projection = mprofier.profiom(projdef) 
        // gjProformed = mproj3ct(gjConformed, projection) 

      // }

      
      // let gj = gjProformed
      // if (gj.properties && gj.properties.geonode) { // if payload.geonode
        // let geonode = gj.properties.geonode
        // let situation = {   // situs defined in geonode
          // 'projection': 'uniwen',
          // 'translate': geonode.geometry.coordinates
        // }
        // gj = mproj3ct(gj, mprofier.profiom(situation)) 
        
        // geonode = mprofier.proformer(anigram)(geonode) // projected position
        // geonode.properties.projs = (geonode.properties.projs) ? geonode.properties.projs : []
        // gj.properties.geonode = geonode
      // }
      
      
      
      gj = mgeoj.featurize(gj) // featurize
        gj = mboform.boformer(anigram, gj) // boform
        gj = mgeoj.zorder(gj) // order
        gj = mric.qualier(ric, anigram, gj) // qualify

        newAnigrams = gj.features.map((d, i) => { // d is feature
      
          let newAnigram = {}
          newAnigram.payload = {}
          newAnigram.payload.avatars = anigram.payload.avatars // inherit avatars
          newAnigram.payload.ric = d.properties.ric // hoist ric
          newAnigram.payload.id = d.properties.uid // hoist uid
          newAnigram.payload.uid = d.properties.uid // hoist uid
          newAnigram.payload.preani = mstore.findAnigramFromUid(d.properties.uid)

          newAnigram.geofold = d // inherit geofold

          return newAnigram
          
        })

      return newAnigrams
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
