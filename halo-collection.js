 /**********************
 *    @haloCollection
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloCollection = global.haloCollection || {})))
}(this, function (exports) {
  'use strict'

  let haloCollection = function haloCollection (__mapper = {}) {
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
    
      //  get GEOFORM
      //
      let gjcollection = f.v(geofold, anigram)  // get geoform
        // gjcollection = mric.enric(ric, anigram, gjcollection) 

        newAnigrams = gjcollection.features.map((d, i) => { // d is feature
 
if (0 && 1) console.log("ric", i, d.properties.ric) 

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
            },
          }
          return newAnigram

        })


      return newAnigrams //    new anigrams are stored by m.animation
    }

    /**********************
   *    @enty
   */
    let haloGeofold_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloGeofold_gramm = anima => gramm(anima)

    let haloCollection = {}
    haloCollection.ween = anima => haloGeofold_ween(anima)
    haloCollection.gramm = anima => haloGeofold_gramm(anima)

    let enty = haloCollection

    return enty
  }

  exports.haloCollection = haloCollection
}))
