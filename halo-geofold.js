/**********************
 *    @haloGeofold
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloGeofold = global.haloGeofold || {})))
}(this, function (exports) {
  'use strict'

  let haloGeofold = function haloGeofold (__mapper = {}) {
    let f = __mapper('props')(),
      manitem = __mapper('xs').m('anitem'),
      mric = __mapper('xs').m('ric'),
      mboform = __mapper('xs').m('boform'),
      mgeoj = __mapper('xs').m('geoj'),
      mprofier = __mapper('xs').m('profier'),
      mstore = __mapper('xs').m('store'),
      mproj3ct = __mapper('xs').m('proj3ct')

    /**********************
   *    @gramify
   */
    let gramm = function (anima, newAnigrams = []) {
      let anigram = manitem(anima).anigram(), // anigram
        halo = anigram.halo, // halo
        geoform = anigram.geoform, // geoform
        payload = anigram.payload // payload

      let boform = payload.boform, // boform
        ric = payload.ric, // ric
        tim = payload.tim, // tim
        proform = payload.proform, // proform
        conform = payload.conform, // conform
        uid = payload.uid, // uid
        parentuid = payload.parentuid // parentuid
        
        
      let gjGeoformed = f.v(geoform, anigram)
        
// let stream =  gjGeoformed.geometry.coordinates   
// if (0 && 1) console.log("stream", stream)        
// let tr = stream.map((p,i,a) => (i==0) ? p : p.map( (c,j,q) => {
  // console.log("c", a[i+1][j], a[i][j])
    // let r = (a[i+1][j] - a[i][j])
    // return r
  // }    )) 
// if (1 && 1) console.log("tr", tr) 
// if (1 && 1) console.log("gjGeoformed", gjGeoformed) 

      
      if (!mgeoj.isValid(gjGeoformed)) { console.error("h.geofold:gj not valid", gjGeoformed)}
        
      let gjConformed = mprofier.conformer(anigram)(gjGeoformed)

      let gjProformed = mprofier.proformer(anigram)(gjConformed)

      let gj = gjProformed
      
      // let gjGeonode = payload.geonode || {
        // type: 'Feature',
        // geometry: { type: 'Point', coordinates: [0, 0, 0] },
        // properties: {orgen: null, velin: null, velang: null, prevous: null, geodelta: null}
      // }
      // if (gjGeonode.properties.velin) {
        // let fieldEffect = {
          // 'projection': 'uniwen',
          // 'translate': gjGeonode.properties.velin   // velin
        // }
        // gj = mprofier.projier(fieldEffect, anigram)(gjProformed)
      // } else {
        // gj = gjProformed
      // }
      // gjGeonode = mprofier.proformer(anigram)(gjGeonode) // projected position
      
      let geonode = payload.geonode
      if (geonode) { // if payload.geonode
        let fieldEffect = {
          'projection': 'uniwen',
          'translate': [ geonode.geometry.coordinates[0], geonode.geometry.coordinates[1], geonode.geometry.coordinates[2] ]}
        gj = mprofier.projier(fieldEffect, anigram)(gj)

        geonode = mprofier.proformer(anigram)(geonode) // projected position
      }
      
      gj = mgeoj.featurize(gj) // featurize
        gj = mboform.boformer(anigram, gj) // boform
        gj = mgeoj.zorder(gj) // order
        gj = mric.qualier(ric, anigram, gj) // qualify

        newAnigrams = gj.features.map((d, i) => { // d is feature
      
          let newAnigram = {}
          newAnigram.payload = {}
          newAnigram.payload.avatars = anigram.payload.avatars // inherit avatars
          newAnigram.payload.ric = d.properties.ric // hoist ric
          newAnigram.payload.uid = d.properties.uid // hoist uid
          newAnigram.payload.preani = mstore.findAnigramFromUid(d.properties.uid)
          newAnigram.payload.geonode = geonode // assign projected geonode

          newAnigram.geoform = d // inherit geoform

          return newAnigram
          
        })

      return newAnigrams
    }

    /**********************
   *    @enty
   */
    let haloGeofold_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloGeofold_gramm = anima => gramm(anima)

    let haloGeofold = {}
    haloGeofold.ween = anima => haloGeofold_ween(anima)
    haloGeofold.gramm = anima => haloGeofold_gramm(anima)

    let enty = haloGeofold

    return enty
  }

  exports.haloGeofold = haloGeofold
}))
