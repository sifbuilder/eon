/****************************
 *    @haloAxis
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloAxis = global.haloAxis || {})))
}(this, function (exports) {
  'use strict'

  var haloAxis = function (__mapper = {}) {
    let f = __mapper('props')(),
      manitem = __mapper('xs').m('anitem')

   let _geoform = p => ({ // geofold
      type: 'Feature',
      geometry: {

        'type': 'Point',
        'coordinates': [0, 0]

      },
      properties: {}
    })

    /****************************
   *    @gramm
   */
    let gramm = function (anima, newAnigrams = []) {

      let anigram = manitem(anima).anigram(),                         // anigram
        halo =        anigram.halo, // halo
        geofold =     anigram.geofold || _geoform, // geofold
        payload =     anigram.payload, // payload
        boform =      payload.boform, // boform
        ric =         payload.ric, // ric
        tim =         payload.tim, // tim
        proform =     payload.proform, // proform
        conform =     payload.conform, // conform
        uid =         payload.uid, // uid
        parentuid =   payload.parentuid, // parentuid
        axis =        payload.axis // axis

      let distx = axis.distx || 0,
        disty = axis.disty || 0,
        range0 = axis.range0 || 0,
        range1 = axis.range1 || 0,
        domain0 = axis.domain0 || 0,
        domain1 = axis.domain1 || 0,
        tickSize = axis.tickSize || 2,
        tickFormat = axis.tickFormat || '',
        scaleType = axis.scaleType,
        orient = axis.orient
        
        // tranlateX
        // tranlateY
        // rotate
        
      let _scale = (scaleType) ? d3[scaleType]() : d3['scaleTime']()
      let _d3Axis = (orient) ? d3[orient] : d3['axisBottom']

      
      let newAnigram = { halo, geofold, payload }
      newAnigram.geofold.properties = {
        sort: 'axis',
        ric: ric,
        uid: uid,
        axis: {
          scale: _scale.domain([domain0, domain1]).range([range0, range1]),
          d3Axis: _d3Axis(_scale)
              .tickSize(tickSize)
              .tickFormat((tickFormat === '') ? '' : d3.format(tickFormat))
              .tickSizeOuter(0),
          textAnchor: 'middle',
          fontSize: 12,
          fontFamily: 'sans-serif',
        }
      }



if (0 && 1) console.log("newAnigram", anigram, newAnigram)
      // newAnigrams.push(newAnigram)
      newAnigrams = [...newAnigrams, ...__mapper('xs').h('ent').gramm(newAnigram)]
      return newAnigrams
    }

    /***************************
 *        @enty
 */
    let haloAxis = {}
    haloAxis.ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = 1, [anima]) : []
    haloAxis.gramm = anima => gramm(anima)

    let enty = haloAxis

    return enty
  }

  exports.haloAxis = haloAxis
}))
