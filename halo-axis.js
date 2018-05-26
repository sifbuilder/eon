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
      manitem = __mapper('xs').m('anitem'),
      mstace = __mapper('xs').m('stace')

   let _geoform = p => ({ // geofold
      type: 'Feature',
      geometry: {

        'type': 'Point',
        'coordinates': [0, 0]

      },
      properties: {}
    })


    // ............................. gramm
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
        range = axis.range || [0,1],
        domain = axis.domain || [0,1],
        rotate = axis.rotate || 0,
        tickSize = axis.tickSize || 2,
        tickPadding = axis.tickPadding || 20,
        tickFormat = axis.tickFormat || '',
        scaleType = axis.scaleType,
        orient = axis.orient

        // tranlateX
        // tranlateY
        // rotate

      let situs = mstace.getSitus(anigram)

      let _scale = (scaleType) ? d3[scaleType]() : d3['scaleTime']()
      let _d3Axis = (orient) ? d3[orient] : d3['axisBottom']


      let newAnigram = { halo, geofold, payload }
      newAnigram.geofold.properties = {
        sort: 'axis',
        ric: ric,
        uid: uid,
        axis: Object.assign(axis, {
          scale: _scale.domain(domain).range(range),
          rotate: rotate,
          d3Axis: _d3Axis(_scale.domain(domain).range(range))
              .tickFormat((tickFormat === '') ? '' : d3.format(tickFormat))
              .tickSizeOuter(0)
              .tickSize(tickSize)
              .tickPadding(tickPadding),
          style: {
            'text-anchor': 'middle',
            'font-size': 12,
            'font-family': 'sans-serif',
          },
        })
      }

      newAnigrams = [...newAnigrams, ...__mapper('xs').h('ent').gramm(newAnigram)]
      return newAnigrams
    }

    // ............................. enty

    let haloAxis = {}
    haloAxis.ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = 1, [anima]) : []
    haloAxis.gramm = anima => gramm(anima)

    let enty = haloAxis

    return enty
  }

  exports.haloAxis = haloAxis
}))
