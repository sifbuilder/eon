/* *********************
*       @haloNums
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloNums = global.haloNums || {})))
}(this, function (exports) {
  'use strict'

  let haloNums = function (__mapper = {}) {
    let f = __mapper('props')(),
      manitem = __mapper('xs').m('anitem'),
      mstore = __mapper('xs').m('store'),
      mgeoj = __mapper('xs').m('geoj')

    /* *********************
   *    @gramm
   */
    let gramm = function (anima, newAnigrams = []) {
      if (0 && 1) console.log('h.nums.gram:anima  ', anima)

      let anigram = manitem(anima).anigram(), // anigram
        halo = anigram.halo, // halo
        geofold = anigram.geofold // geofold

      let payload = anigram.payload, // payload
        ric = payload.ric, // ric
        parentuid = payload.parentuid, // parentuid
        nums = payload.nums || {}, // nums payload
        text = payload.text || {} // nums payload

      let parentCoords
      let parentAnigram = mstore.findAnigramFromUid(parentuid)
      if (parentAnigram) {
        let geometry = parentAnigram.geofold.geometry
        if (!mgeoj.isValid(geometry)) { console.error('h.ent:gj not valid', geometry) }
        parentCoords = mgeoj.getCoords(geometry) // outer ring
      }

        
      let locations = []
      if (nums.pos !== undefined && parentCoords !== undefined) {
        if (Array.isArray(nums.pos)) { // pos is array
          locations = d3.range(nums.pos[0], nums.pos[1], nums.step)
            .map(d => d % parentCoords.length) // mod
        } else if (typeof (nums.pos) === 'number') { // one position
          locations = [Math.floor(nums.pos % parentCoords.length)]
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
            let payload = p.payload,
              text = payload.nums, // nums
              boform = p.boform || {}
              
            text.style = text.style || {}
              

            let json = {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: [0, 0] },
              properties: {
                sort: 'text'  ,
                text: locations[i],   // nums
                style: {

                  'rotate': text.style['rotate'],
                  'font-size': text.style['font-size'],
                  'font-family': text.style['font-family'],
                  'text-anchor': text.style['text-anchor'],

                  'width': text.style.width,
                  'height': text.style.height,

                  'dx': text.style.dx,
                  'dy': text.style.dy,

                  'textLength': text.style.textLength,
                  'lengthAdjust': text.style.lengthAdjust

                }
              }
            }
            return json
          }
    
    
        anima.geofold = _geoform
        anima.payload.proform = _proform
        newAnigrams = [...newAnigrams, ...__mapper('xs').h('ent').gramm(anima)]
      }

      
      return newAnigrams
    }

    /**********************
     *    @enty
     */
    let haloNums = {}
    haloNums.ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = 1, [anima]) : []
    haloNums.gramm = anima => gramm(anima)

    let enty = haloNums

    return enty
    
  }

  exports.haloNums = haloNums
}))
