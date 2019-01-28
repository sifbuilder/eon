/*******************************************
 *      @muonSvg
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonSvg = global.muonSvg || {})))
}(this, function (exports) {
  'use strict'

  async function muonSvg (__eo = {}) {
    let [
      mbezierjs,
      d3Array,
    ] = await Promise.all([
      __eo('xs').m('bezierjs'),
      __eo('xs').b('d3-array'),
    ])

    let rarray = d => (Array.isArray(d)) ? [ ...d ].reverse() : [d]

    // source: https://github.com/d3/d3-array/blob/master/src/range.js
    // license: https://github.com/d3/d3-array/blob/master/LICENSE
    let d3range = function (start, stop, step) {
      start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step

      var i = -1,
        n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
        range = new Array(n)

      while (++i < n) {
        range[i] = start + i * step
      }

      return range
    }

    // .................. castels
    // ... m.svg.castels(svgdata, geoframe={start:0, stop:0.90, step:0.33} )
    // ...  svgdata: cubic beziers: MC...CZ
    // ...  geoframe.start: bezier interaval beginning
    // ...  geoframe.stop: bezier interval end
    // ...  geoframe.step: space between points
    // ...    eg: castels(svg, {start:0, stop:0.90, step:0.33}) will return 3 curve points in bezier

    let castels = function (svgdata, geoframe = {start: 0, stop: 0.90, step: 0.33}) {
      let gj = {
        type: 'Feature',
        geometry: { type: 'MultiLineString', coordinates: [] },
        properties: {},
      }

      let pathdata = []
      let range = d3range(geoframe.start, geoframe.stop, geoframe.step)

      let str = svgdata.path.d
      let svgRings = str.trim().split('M').slice(1) // M C Z

      let ncas = [], ringCases = []
      for (let i = 0; i < svgRings.length; i++) {
        let svgRing = svgRings[i]

        let c0 = svgRing.substring(svgRing.lastIndexOf('M') + 1, svgRing.lastIndexOf('C')).split(',').map(Number)
        let cn = svgRing.substring(svgRing.lastIndexOf('C') + 1, svgRing.lastIndexOf('Z'))

        if (cn.charAt(0) === 'i') {
          cn = cn
            .substring(1).trim()
            .split(/\r?\n/)
            .reverse()
            .map(d => d.trim())
            .map(d => d.split(' ').reverse())

            .map(d => d.map(c => c.split(',').map(Number)))
            .map(d => d.reduce((p, q) => [...p, ...q], [])) //
        } else {
          cn = cn
            .split(/\r?\n/)
            .map(d => d.trim())
            .map(d => d.split(' '))
            .map(d => d.map(c => c.split(',').map(Number)))
            .map(d => d.reduce((p, q) => [...p, ...q], [])) //
        }

        let cas = []
        cas[0] = [...c0, ...cn[0]]

        if (cn.length > 1) {
          for (let i = 0; i < cn.length - 1; i++) {
            cas[i + 1] = [ ...cn[i].slice(-2), ...cn[i + 1] ]
          }
          let m = cn.length - 2
          cas[m] = [ ...cn[m].slice(-2), ...cn[m + 1] ] // close
        }

        gj.geometry.coordinates.push(cas)

        ringCases[i] = cas
      }

      for (let j = 0; j < ringCases.length; j++) { // rings of knots
        let ringCas = ringCases[j]
        let ring = []
        for (let k = 0; k < ringCas.length; k++) {
          let cas = ringCas[k]
          let curve = new mbezierjs.Bezier(cas)
          let points = []
          for (let j = 0; j < range.length; j++) {
            let point = Object.values(curve.compute(range[j])) // each point in cast
            points.push(point)
          }

          ring = [...ring, ...points]
        }

        gj.geometry.coordinates[j] = ring
      }

      return gj
    }

    // .................. castel
    let castel = function (svgdata, pathdata) {
      return castels(svgdata, pathdata)[0]
    }

    // .................. enty
    var enty = function () {}
    enty.castels = castels
    enty.castel = castel

    return enty
  }

  exports.muonSvg = muonSvg
}))
