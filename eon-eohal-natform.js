/****************************
 *      @eohalNatform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalNatform = global.eohalNatform || {})))
}(this, function (exports) {
  'use strict'

// md: # eon-eohal-natform 
// md: **expose natform** 
// md: h.turnform with  anima.eofold : `muonNatform.natFeature(p.eoload.form)` 
// md: 
// md: # license 
// md: MIT 
  
  
  async function eohalNatform (__mapper = {}) {
    let [
      muonNatform,
      eohalTurnform,
      muonEochrom,
      muonEotim,
      muonEoric,
      muonEonode,
      muonProfier,
      prtUniwen,
      muonProj3ct,      
    ] = await Promise.all([
      __mapper('xs').m('natform'),
      __mapper('xs').e('turnform'),
      __mapper('xs').m('eocrom'),
      __mapper('xs').m('eotim'),
      __mapper('xs').m('eoric'),
      __mapper('xs').m('eonode'),
      __mapper('xs').m('profier'),
      __mapper('xs').p('uniwen'),
      __mapper('xs').m('proj3ct'),      
    ])

    
    // eotim definition
    
    let gettim = function( eotim ) {
      
      let res = {}
      let ref = muonEotim.getdefault()
      if (eotim === undefined) {
        res = ref
      } else {
        res = Object.assign({ ...ref }, eotim)
      }
      return res
      
    }    
    
    // eoric definition
    
    let getric = function( eoric ) {
      
      let res = {}
      let ref = muonEoric.getdefault()
      if (eoric === undefined) {
        res = ref
      } else {
        res = Object.assign({ ...ref }, eoric)
      }
      return res
      
    }    
    
    // eocrom definition
    
    let getgeochrom = function( eoform ) {
      
      let res = {}
      let ref = muonEochrom.getdefault()
      
      if (eoform === undefined) {
        res = ref
      } else {
        
        let { ...ref } = eoform
        res = ref
        
      }
      return res
    }    
    
    // eonode definition
    
    let gettranslate = function( eoform ) {
      
      let res = {}
      let translate = []
      
        
        if (eoform.tx !== undefined ) {
          translate[0] = eoform.tx || 0
        }
        if (eoform.ty !== undefined ) {
          translate[1] = eoform.ty || 0
        }
        if (eoform.tz !== undefined ) {
          translate[2] = eoform.tz
        }

        return translate
    }   
    
    // .................... gramm
    let gramm = function (anitem) {
      
      console.assert(anitem.eoform !== undefined, 'eoform is undefined')

      anitem.eohal = 'natform'


      let translate = gettranslate(anitem.eoform)
     
      let prt = {
        projection: 'uniwen',
        translate: translate,
        scale: 1,
        rotate: [ 0, 0 ],
        lens: [0, 1, Infinity],        
      }

      anitem.eofold = muonNatform.natFeature(anitem.eoform)
      anitem.eofold = muonProj3ct(anitem.eofold, muonProfier.formion(prt, anitem)) // eofold
   
      if (anitem.eocrom === undefined) anitem.eocrom = getgeochrom(anitem.eoform)        // eoform
     
      
      return eohalTurnform.gramm(anitem)
    }

    // .................... ween
    let ween = anitem => (anitem.eoinited !== 1) ? (anitem.eoinited = anitem.gelded = 1, [anitem]) : []

    // .................... eohal
    let eohalNatform = {}
    eohalNatform.ween = anitem => ween(anitem)
    eohalNatform.gramm = anitem => gramm(anitem)

    // .................... enty
    let enty = eohalNatform
    return enty
  }

  exports.eohalNatform = eohalNatform
}))
