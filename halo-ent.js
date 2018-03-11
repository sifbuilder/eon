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
        avatars = payload.avatars, // avatars
        ric = payload.ric, // ric
        tim = payload.tim, // tim
        vim = payload.vim, // vim
        proform = payload.proform, // proform
        conform = payload.conform, // conform
        uid = payload.uid, // uid
        parentuid = payload.parentuid // parentuid
        
    if (0 && 1) console.log("h.nat proform", ric)
    if (0 && 1) if (proform !== undefined) console.log("h.nat proform", ric, proform.rotate)
      
      let gjGeoformed = f.v(geofold, anigram)
      if (!mgeoj.isValid(gjGeoformed)) { console.error("h.ent:gj not valid", gjGeoformed)}
        
    if (0 && 1) if (uid === 'trace_trace_traceani') console.log("h.nat anigram:proform", halo, anigram, proform)

      // conform does not affect geonode. impacts siti of avatars
      let gjConformed = mprofier.conformer(anigram)(gjGeoformed)

      
      //    uniwen: prerotation, tranlations, scale, project, rotation
      let proformion = mprofier.proformion(anigram),
          gjProformed = mproj3ct(gjConformed, proformion),
          gj = gjProformed
          
          
          
        if (gj.properties.geonode !== undefined) {    
          let pgj = mproj3ct(gj.properties.geonode, proformion)
          gj.properties.geonode.properties.nodeProformed = pgj
          if (0 && 1) console.log("gj", gj)
        }
      
      
      
      
        gj = mgeoj.featurize(gj) // featurize
        gj = mboform.boformer(anigram, gj) // boform
        gj = mgeoj.zorder(gj) // order
        gj = mric.qualier(ric, anigram, gj) // qualify

        newAnigrams = gj.features.map((d, i) => { // d is feature

      
          d.properties.tim = tim  // tim in geofold 
          d.properties.vim = vim  // vim in geofold needed to render
           
          let newAnigram = {
            halo: halo, // inherit halo
            geofold: d, // inherit geofold
            payload: {  // payload is lost in m.animation before rendering
              avatars, // inherit avatars
              ric: d.properties.ric, // hoist ric
              id: d.properties.uid, // hoist uid
              uid: d.properties.uid, // hoist uid
              // preani: mstore.findAnigramFromUid(d.properties.uid)
            },
          }
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
