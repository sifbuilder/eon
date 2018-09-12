/****************************
 *      @haloNatform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloNatform = global.haloNatform || {})))
}(this, function (exports) {
  'use strict'

  async function haloNatform (__mapper = {}) {
    let [
      muonNatform,
      haloEoform,
      muonBoform,
    ] = await Promise.all([
      __mapper('xs').m('natform'),
      __mapper('xs').h('eoform'),
      __mapper('xs').m('boform'),
    ])

    
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
    
    // .................... gramm
    let gramm = function (anitem) {
      console.assert(anitem.payload.geoform !== undefined, 'geoform is undefined')

      anitem.halo = 'natform'
      anitem.geofold = muonNatform.natFeature(anitem.payload.geoform)

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
