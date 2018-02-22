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
      

      if (0 && 1) console.log("anigram", anigram)
      
      //    rotation, control rotation, proform stace translation
      //    uniwen: rotation, tranlations
      //
      let proformion = mprofier.proformion(anigram),
          gjProformed = mproj3ct(prebased, proformion),
          gj = gjProformed
          

      
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
