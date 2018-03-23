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

      

    // ///
    //
    // anigram.geofold :: last of geoform, conform, ereform, proformed
    //
    // ani:nodeSitus : ani.geofold.properties.geonode.geometry.coordinates
    // parentani:situs : parent.payload.geonode.geometry.coordinates
    //
    //  geoform conform ereform proform
    
    //  geoForm = props.geoform
    //  conForm = props.conform
    //  ereForm = props.ereform
    //  proForm = props.proform
                  
    //  geoNode = props.geonode.properties.nodeGeoformed
    //  ereNode = props.geonode.properties.nodeEreformed
    //  proNode = props.geonode.properties.nodeProformed

    //  forms and nodes have geometry.coordinates
    //
    // //

          
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
     
    
    
      //  get GEOFORM
      //
      gj = f.v(geofold, anigram)  // get geoform
      gj.properties = gj.properties || {} // recall genode
      gj.properties.genode = gj.properties.genode || {} // recall genode properties
     
      
    if (gj.type === 'FeatureCollection') {
      
    } else if (gj.type === 'Feature') {
      
    } else {
      
    }
    
    
      if (!mgeoj.isValid(gj)) { console.error("h.ent:gj not valid", geofold, gj) }
      gj.properties.geoform = mgeoj.deprop(gj) // store geoform
      
      gj.properties.nodeGeoformed = gj.properties.geonode // nodeGeoformed : geonode
    
      // ///
      //    CONFORM
      //    conform does not affect geonode
      // //
      gj = mprofier.conformer(anigram)(gj)  // get conform
      gj.properties.conform = mgeoj.deprop(gj) // store conform
      
      gj.properties.nodeConformed = gj.properties.geonode // nodeConformed : geonode


      // ///
      //    EREFORM the conformed geofold
      //    uniwen: prerotation, tranlations, scale, project, rotation
      //
      //    EREFORM geonode in geonode..nodeProformed
      //    geonode retains GEOFORM domain
      // //
      let ereformion = mprofier.ereformion(anigram)
      gj = mproj3ct(gj, ereformion)
      
      gj.properties.ereform = mgeoj.deprop(gj) // store ereform

      gj.properties.nodeEreformed = mproj3ct(gj.properties.nodeConformed, ereformion)   // nodeConformed => nodeEreformed


      // ///
      //    PROFORM the conformed geofold
      //    uniwen: prerotation, tranlations, scale, project, rotation
      //
      //    PROFORM geonode in geonode..nodeProformed
      //    geonode retains GEOFORM domain
      // //
 if (1 && 1) console.log("proform ________", gj)      
      let proformion = mprofier.proformion(anigram)
      gj = mproj3ct(gj, proformion)
      gj.properties.proform = mgeoj.deprop(gj)  // store proform
 if (1 && 1) console.log("proform", gj.properties.uid, gj.properties.proform)
      gj.properties.nodeProformed = mproj3ct(gj.properties.nodeEreformed, proformion) // nodeEreformed => nodeProformed

    
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

    let haloEnt = {}
    haloEnt.ween = anima => haloGeofold_ween(anima)
    haloEnt.gramm = anima => haloGeofold_gramm(anima)

    let enty = haloEnt

    return enty
  }

  exports.haloEnt = haloEnt
}))
