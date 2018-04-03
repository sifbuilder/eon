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
                  
    //  nodeGeoformed = props.geonode.properties.nodeGeoformed
    //  nodeEreformed = props.geonode.properties.nodeEreformed
    //  nodeProformed = props.geonode.properties.nodeProformed

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
    
      //  get GEOFORM
      //
      let gj  
      gj = f.v(geofold, anigram)  // get geoform
      gj.properties = gj.properties || {} // recall genode
      gj.properties.geonode = gj.properties.geonode || {} // recall genode properties
if (1 && 1) console.log("gj", gj)
    
      if (2 && 2 && !mgeoj.isValid(gj)) { console.error("h.ent:gj not valid", geofold, gj) }
      gj.properties.formGeoformed = mgeoj.deprop(gj) // store geoform
      gj.properties.nodeGeoformed = gj.properties.geonode // nodeGeoformed : geonode

      let features = mgeoj.featurize(gj)  // geojson to geojson features
if (0 && 1) console.log("features", features.length, gj)
      
      features = features.map( (feature,i) => {
if (0 && 1) console.log("h.ent features", i, features[i].properties.boform.co)      
            // ///
            //    CONFORM
            //    conform does not affect geonode
            // //
            feature = mprofier.conformer(anigram)(feature)  // get conform
            feature.properties.formConformed = mgeoj.deprop(feature) // store conform
            feature.properties.nodeConformed = feature.properties.geonode // nodeConformed : geonode

            // ///
            //    EREFORM the conformed geofold
            //    uniwen: prerotation, tranlations, scale, project, rotation
            //    geonode in geonode..nodeProformed - retains GEOFORM domain
            // //
            if (payload.ereform) {
              let ereformion = mprofier.ereformion(anigram)
              feature = mproj3ct(feature, ereformion)
              feature.properties.formEreformed = mgeoj.deprop(feature) // store ereform
              feature.properties.nodeEreformed = mproj3ct(feature.properties.nodeConformed, ereformion)   //
              nodeConformed => nodeEreformed
            } else {
              feature.properties.nodeEreformed = feature.properties.nodeConformed
            }

            // ///
            //    PROFORM the conformed geofold
            //    uniwen: prerotation, tranlations, scale, project, rotation
            //    geonode in geonode..nodeProformed - retains GEOFORM domain
            // //
            if (payload.proform) {
if (0 && 1) console.log("feature ", i, payload.proform)              
              let proformion = mprofier.proformion(anigram)
              feature = mproj3ct(feature, proformion)
              feature.properties.nodeProformed = mproj3ct(feature.properties.nodeEreformed, proformion) // nodeEreformed => nodeProformed
            } else {
              feature.properties.nodeProformed = feature.properties.nodeEreformed
            }

           feature = mboform.boformer(anigram, feature) // boform feature or feature collection
            
            return feature
      })
        
        let gjcollection = {type: 'FeatureCollection', features}
    
        // gj = mgeoj.featurecollect(gj) // featurecollect - pack features in collection
        gjcollection = mgeoj.zorder(gjcollection) // order features in feature collection
        gjcollection = mric.enric(ric, anigram, gjcollection) // ric to feature or feature collection

        newAnigrams = gjcollection.features.map((d, i) => { // d is feature

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
