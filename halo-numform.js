/* *********************
*       @haloNumform
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloNumform = global.haloNumform || {})))
}(this, function (exports) {
  'use strict'


  // md: # md:{filename}
  // md: **expose numform halo**
  // md:
  // md:
  // md: # license
  // md: MIT

  let haloNumform = function (__mapper = {}) {
    let f = __mapper('props')(),
      manitem = __mapper('xs').m('anitem'),
      mstore = __mapper('xs').m('store'),
      mgeoj = __mapper('xs').m('geoj')

    // .................. _geofolder
    let _geofolder = function (ani, prob) { // geofold
      let textform = ani.payload.textform // needs text

      return {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0] },
        properties: {
          sort: 'text',
        }
      }
    }

    // ............................. _stacer      
    let _stacer = {
      autoSitus: function(ani) {
        return mstace.getLocus(ani.payload.pacer.stace, ani)
      },
      initSitus: function(ani) {
        return {x: 0, y: 0, z: 0 }
      },
      eventSitus: function(ani) {
        return {x: crayder.pointer().x, y: crayder.pointer().y, z: 0 }
      }
    }
    
    
  // .................. gramm
    let gramm = function (anima, newAnigrams = []) {
      let anigram = manitem(anima).anigram(), // anigram
        halo = anigram.halo, // halo
        geofold = anigram.geofold // geofold

      let payload = anigram.payload, // payload
        ric = payload.ric, // ric
        parentuid = payload.parentuid, // parentuid
        numform = payload.numform || {}

        
      // stacefy the numform location  
      let stacer = Object.assign({}, payload.pacer.stacer , _stacer)
      let situs = stacer.autoSitus(anigram)       
        
      let parentCoords
      let parentAnigram = mstore.findAnigramFromUid(parentuid)
      if (parentAnigram) {
        let geometry = parentAnigram.geofold.geometry
        if (!mgeoj.isValid(geometry)) { console.error('** h.ent:gj not valid', geometry) }
        parentCoords = mgeoj.getCoords(geometry) // outer ring
      }

      let locations = []
      if (numform.pos !== undefined && parentCoords !== undefined) {
        if (Array.isArray(numform.pos)) { // pos is array
          locations = d3.range(numform.pos[0], numform.pos[1], numform.step)
            .map(d => d % parentCoords.length) // mod
        } else if (typeof (numform.pos) === 'number') { // one position
          locations = [Math.floor(numform.pos % parentCoords.length)]
        }
      }

      for (let i = 0; i < locations.length; i++) {
        let idx = i
        let gid = ric.gid // from ava ric
        let cid = ric.cid
        let fid = (ric.fid === undefined) ? ric.cid + '_' + idx : ric.fid
        let _ric = {gid, cid, fid}

        let _proform = { // proform each candy
          'projection': 'uniwen',
          'translate': parentCoords[locations[i]] // translate each candy to candy location
        }

        let _geoform = function (p) { // geofold
          anima.geofold = _geoform
          anima.payload.proform = _proform
          newAnigrams = [...newAnigrams, ...__mapper('xs').h('ent').gramm(anima)]
        }

        return newAnigrams
      }
    }

  // .................. enty
    let haloNumform = {}
    haloNumform.ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = 1, [anima]) : []
    haloNumform.gramm = anima => gramm(anima)

    let enty = haloNumform

    return enty
  }

  exports.haloNumform = haloNumform
}))
