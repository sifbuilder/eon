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
      
      let anigram = manitem(anima).anigram(),													// anigram
			  halo = 				anigram.halo, // halo
        geofold = 		anigram.geofold || _geoform, // geofold
        payload = 		anigram.payload, // payload
        boform = 			payload.boform, // boform
        ric = payload.ric, // ric
        tim = payload.tim, // tim
        proform =			payload.proform, // proform
        conform = 		payload.conform, // conform
        uid = 				payload.uid, // uid
        parentuid = 	payload.parentuid, // parentuid
        axis = 	payload.axis // axis
      
      
      // defaults
      let orient = 'axisBottom',
        scaleType = 'scaleTime'

      let distx = axis.distx || 0,
        disty = axis.disty || 0,
        range0 = axis.range0 || 0,
        range1 = axis.range1 || 0,
        domain0 = axis.domain0 || 0,
        domain1 = axis.domain1 || 0,
        tickSize = axis.tickSize || 2,
        tickFormat = axis.tickFormat || ''

      let scale = d3['scaleTime']()
      if (scaleType !== undefined) {
        scale = d3[scaleType]() // d3.scaleTime
      }
      
      let d3Axis = d3['axisBottom']
      if (orient !== undefined) {
        d3Axis = d3[orient] // d3.axisBottom
      }


      
      let newAnigram = {}
      
      newAnigram.halo = 'axis'  // renderee
      newAnigram.geofold = geofold
      newAnigram.payload = Object.assign({},newAnigram.payload,anigram.payload)
      
      newAnigram.geofold.properties = {}
      
      newAnigram.geofold.properties.sort = 'axis'  // renderee
      
      newAnigram.geofold.properties.ric = anigram.payload.ric
      newAnigram.geofold.properties.uid = anigram.payload.uid
      
      
      newAnigram.geofold.properties.axis = {}
      
      newAnigram.geofold.properties.axis.scale = scale
        .domain([domain0, domain1])
        .range([range0, range1])

      newAnigram.geofold.properties.axis.d3Axis = d3Axis(scale)
        .tickSize(tickSize)
        .tickFormat((tickFormat === '') ? '' : d3.format(tickFormat))
        .tickSizeOuter(0)

      newAnigram.geofold.properties.axis.textAnchor = 'middle'
      newAnigram.geofold.properties.axis.fontFamily = 'sans-serif'

if (1 && 1) console.log("newAnigram", anigram, newAnigram)
      newAnigrams.push(newAnigram)

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
