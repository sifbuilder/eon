/*******************************************
 *      @muonCastel
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonCastel = global.muonCastel || {})))
}(this, function (exports) {
  'use strict'

  async function muonCastel (__eo = {}) {
    let [
      muonBezierjs,
    ] = await Promise.all([
      __eo('xs').m('bezierjs'),
    ])

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

    let castelrings = function (svgdata) {
      let str = svgdata.path.d
      let svgRings = str.trim().split('M').slice(1) // M C Z

      let ringCases = []
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

        ringCases[i] = cas
      }
      return ringCases
    }

    let castelcurves = function (svgdata) {
      let ringCases = castelrings(svgdata)

      let curverings = []

      for (let j = 0; j < ringCases.length; j++) { // rings of knots
        let ringCas = ringCases[j]
        curverings[j] = []
        for (let k = 0; k < ringCas.length; k++) {
          let cas = ringCas[k]
          let curve = new muonBezierjs.Bezier(cas)
          curverings[j].push(curve)
        }
      }

      return curverings
    }

    let castelstring = function (curverings, geoframe = {start: 0, stop: 0.90, step: 0.33}) {
      let range = d3range(geoframe.start, geoframe.stop, geoframe.step)
      let coords = []

      for (let n = 0; n < curverings.length; n++) { // rings of knots
        let curvering = curverings[n]
        let ring = []
        for (let k = 0; k < curvering.length; k++) { // curves
          let curve = curvering[k]
          let points = []
          for (let m = 0; m < range.length; m++) {
            let point = Object.values(curve.compute(range[m])) // each point in cast
            points.push(point)
          }

          ring = [...ring, ...points]
        }
        coords[n] = ring
      }

      return coords
    }

    let castelscoords = function (svgdata, geoframe = {start: 0, stop: 0.90, step: 0.33}) {
      if (1 && 1) console.log('svgdata', svgdata)

      let coords = []
      let curverings = castelcurves(svgdata)
      coords = castelstring(curverings, geoframe)

      return coords
    }

    let castels = function (svgdata, geoframe = {start: 0, stop: 0.90, step: 0.33}) {
      let coords = castelscoords(svgdata, geoframe)
      let gj = {
        type: 'Feature',
        geometry: { type: 'MultiLineString', coordinates: coords },
        properties: {},
      }

      return gj
    }

    let svgprj = function (svg, renderPortview) {
      let res = {}

      let extent = svg.viewBox.split(' ').map(d => parseInt(d))

      let x0 = extent[0],
        y0 = extent[1],
        x1 = extent[2],
        y1 = extent[3]

      let width = renderPortview.width(), height = renderPortview.height()

      let r0 = width / (x1 - x0)
      let r1 = height / (y1 - y0)
      let rx = Math.sign(r0) * Math.min(Math.abs(r0), Math.abs(r1))
      let ry = -Math.sign(r1) * Math.min(Math.abs(r0), Math.abs(r1))

      let dx = (width - (x1 - x0)) / 2
      let dy = -(height - (y1 - y0)) / 2

      res.translate = [dx, dy]
      res.scale = [rx, ry]

      return res
    }

    // .................. castel
    let castel = function (svgdata, pathdata) {
      return castels(svgdata, pathdata)[0]
    }

    // .................. enty
    var enty = function () {}
    enty.castelrings = castelrings
    enty.castelcurves = castelcurves
    enty.castelstring = castelstring
    enty.castelscoords = castelscoords
    enty.castels = castels
    enty.castel = castel
    enty.svgprj = svgprj

    return enty
  }

  exports.muonCastel = muonCastel
}))
