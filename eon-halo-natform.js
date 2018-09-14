/****************************
 *      @haloNatform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloNatform = global.haloNatform || {})))
}(this, function (exports) {
  'use strict'

// md: # eon-halo-natform 
// md: **expose natform** 
// md: h.eoform with  anima.geofold : `muonNatform.natFeature(p.payload.form)` 
// md: 
// md: # license 
// md: MIT 
  
  
  async function haloNatform (__mapper = {}) {
    let [
      muonNatform,
      haloEoform,
      muonBoform,
      muonTim,
      muonRic,
      muonGeonode,
      muonProfier,
      prtUniwen,
      mproj3ct,      
    ] = await Promise.all([
      __mapper('xs').m('natform'),
      __mapper('xs').h('eoform'),
      __mapper('xs').m('boform'),
      __mapper('xs').m('tim'),
      __mapper('xs').m('ric'),
      __mapper('xs').m('geonode'),
      __mapper('xs').m('profier'),
      __mapper('xs').p('uniwen'),
      __mapper('xs').m('proj3ct'),      
    ])

    
    // tim definition
    
    let gettim = function( tim ) {
      
      let res = {}
      let ref = muonTim.getdefault()
      if (tim === undefined) {
        res = ref
      } else {
        res = Object.assign({ ...ref }, tim)
      }
      return res
      
    }    
    
    // ric definition
    
    let getric = function( ric ) {
      
      let res = {}
      let ref = muonRic.getdefault()
      if (ric === undefined) {
        res = ref
      } else {
        res = Object.assign({ ...ref }, ric)
      }
      return res
      
    }    
    
    // boform definition
    
    let getboform = function( geoform ) {
      
      let res = {}
      let ref = muonBoform.getdefault()
      
      if (geoform === undefined) {
        res = ref
      } else {
        
        let { ...ref } = geoform
        res = ref
        
      }
      return res
    }    
    
    // geonode definition
    
    let gettranslate = function( geoform ) {
      
      let res = {}
      let translate = []
      
        
        if (geoform.tx !== undefined ) {
          translate[0] = geoform.tx || 0
        }
        if (geoform.ty !== undefined ) {
          translate[1] = geoform.ty || 0
        }
        if (geoform.tz !== undefined ) {
          translate[2] = geoform.tz
        }

        return translate
    }   
    
    // .................... gramm
    let gramm = function (anitem) {
      
      console.assert(anitem.payload.geoform !== undefined, 'geoform is undefined')

      anitem.halo = 'natform'


      let translate = gettranslate(anitem.payload.geoform)
     
      let prt = {
        projection: 'uniwen',
        translate: translate,
        scale: 1,
        rotate: [ 0, 0 ],
        lens: [0, 1, Infinity],        
      }

      anitem.geofold = muonNatform.natFeature(anitem.payload.geoform)
      anitem.geofold = mproj3ct(anitem.geofold, muonProfier.formion(prt, anitem)) // geofold
   
      if (anitem.boform === undefined) anitem.boform = getboform(anitem.payload.geoform)        // geoform
     
      
      return haloEoform.gramm(anitem)
    }

    // .................... ween
    let ween = anitem => (anitem.payload.inited !== 1) ? (anitem.payload.inited = anitem.payload.gelded = 1, [anitem]) : []

    // .................... halo
    let haloNatform = {}
    haloNatform.ween = anitem => ween(anitem)
    haloNatform.gramm = anitem => gramm(anitem)

    // .................... enty
    let enty = haloNatform
    return enty
  }

  exports.haloNatform = haloNatform
}))
