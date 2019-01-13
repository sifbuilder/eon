/***********
 *    @muonGraticule
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonGraticule = global.muonGraticule || {})))
}(this, function (exports) {
  'use strict'

  async function muonGraticule (__eo = {}) {
    let [
      muonGeoj,
      d3array,
    ] = await Promise.all([
      __eo('xs').m('geoj'),
      __eo('xs').b('d3-array'),
    ])

    let d3Range = d3array.range

    const acos = Math.acos, asin = Math.asin, atan2 = Math.atan2, cos = Math.cos,
      max = Math.max, min = Math.min, PI = Math.PI, sin = Math.sin, sqrt = Math.sqrt,
      radians = PI / 180, degrees = 180 / PI, eps = 1e-5

    const epsilon = 1e-5

    let defaultMajor = [ [-180, 180, 90, 2.5], [-90, 90, 360, 2.5] ]
    let defaultMinor = [ [-180, 180, 10, 2.5], [-80, 80, 10, 2.5] ]

    let state = {}

    let cache = {} // entryparams, gratiparams
    cache.entryparams = {}
    cache.gratiparams = {}

    // .................. tidx
    let tidx = function (horq, verq, hd = 1, vd = 1) { // tidx(6,4,1,1)
      return function (col, row) { // ridx([3,5]) => 17
        let ret = (row * hd) * (horq * vd) + col
        return ret
      }
    }

    // .................. ridx
    let ridx = function (horq, verq, hd = 1, vd = 1) { // ridx(6,4,1,1)
      return function (idx) { // ridx(3) => [0,2], ridx(17) => [3,5]
        // let ret = [Math.floor(((idx / hd) / vd) / horq), idx % horq]
        let ret = [ idx % horq, Math.floor(((idx / hd) / vd) / horq) ]
        return ret
      }
    }

    // .................. oneface
    let oneface = function (a, b, c, xn, yn) { //  xy,ru,ry
      let indexer = tidx(xn, yn)

      let v0 = indexer(a[0], a[1])
      let v1 = indexer(b[0], b[1])
      let v2 = indexer(c[0], c[1])

      let f = [ v0, v1, v2 ]
      return f
    }

    // .................. bifaces
    let bifaces = function (i, j, xn, yn) {
      let indexer = tidx(xn, yn)

      let i0 = i
      let i1 = (i + 1) % xn // _e_
      let j0 = j
      let j1 = (j + 1)

      let f1 = oneface([i0, j0], [i1, j0], [i1, j1], xn, yn)
      let f2 = oneface([i0, j0], [i1, j1], [i0, j1], xn, yn)

      return [ f1, f2 ]
    }

    // .................. quads
    let quads = function (i, j, xn, yn) {
      let indexer = tidx(xn, yn)

      let i0 = i
      let i1 = (i + 1) % xn // _e_
      let j0 = j
      let j1 = (j + 1)

      let v0 = indexer(i0, j0)
      let v1 = indexer(i1, j0)
      let v2 = indexer(i1, j1)
      let v3 = indexer(i0, j1)

      let f = [ v0, v1, v2, v3 ]

      return [ f ]
    }

    // .................. gratiparams
    // ... @params::{}
    // ... multiframe: frame: [ xa , xb, d, p ]
    // ...    eg. [ [-180, 180, 55, 1], 
    // ...          [-90, 90, 2.5, 1] ]
    // ...
    // ... geoframe: [ [X, Y, D ,P], [x, y, d ,p] ]
    // ...      [ [X_extent, Y_extent], [x_extent, y_extent] ]
    // ... geoframe.length::2 : major and minor extents ([[X,Y],[x,y]])
    // ...  X,Y,x,y are segments (arrays) [Xa,Xb,Xd,Xp]
    // ... eg. [ [ [-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ],
    // ...       [ [-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ]
    // ...      ]
    // ... geoframe.length::1 : minor defaults to major extent ([[X,Y]]])
    // ...    X and Y are in the same array
    // ... eg. [ [ [-180, 180, 45, 45],
    // ...          [-90, 90, 22.5, 22.5] ] ]
    // ...
    // ... @params::[] defaults to geoframe
    // ...    eg.: [
    // ...            [ [ -180, 180, 45, 6],
    // ...              [ -180, 180, 45, 6] ]
    // ...          ]
    // ...
    let gratiparams = function (params = {}) {
      let rp = {}

      let X0, X1, DX, PX, x0, x1, dx, px,
        Y0, Y1, DY, PY, y0, y1, dy, py

      let X_extent, Y_extent, x_extent, y_extent

      if (params.multiframe !== undefined) { // multiframe

        let multiframe = params.multiframe

        X_extent = multiframe[0] // x major
        x_extent = multiframe[0] // x minor
        Y_extent = multiframe[1] // y major
        y_extent = multiframe[1] // y minor

      } else if (params.geoframe !== undefined) { // geoframe

        let geoframe = params.geoframe

        if (geoframe.length === 2) { // [Major, minor] Mxy, mxy

          X_extent = geoframe[0][0]
          Y_extent = geoframe[0][1]
          x_extent = geoframe[1][0]
          y_extent = geoframe[1][1]

        } else if (geoframe.length === 1) { // [Major :: minor] Mx.mx, My.my

          X_extent = geoframe[0][0]
          Y_extent = geoframe[0][1]
          x_extent = geoframe[0][0]
          y_extent = geoframe[0][1]
        }

      } else if (Array.isArray(params)) { // default to geoframe

        let geoframe = params

        if (geoframe.length === 2) { // [Major, minor] Mxy, mxy

          X_extent = geoframe[0][0]
          Y_extent = geoframe[0][1]
          x_extent = geoframe[1][0]
          y_extent = geoframe[1][1]

        } else if (geoframe.length === 1) { // [Major :: minor] Mx.mx, My.my

          X_extent = geoframe[0][0]
          Y_extent = geoframe[0][1]
          x_extent = geoframe[0][0]
          y_extent = geoframe[0][1]
        }

      }

      X0 = X_extent[0]
      X1 = X_extent[1]
      DX = X_extent[2]
      PX = X_extent[3]

      x0 = x_extent[0]
      x1 = x_extent[1]
      dx = x_extent[2]
      px = x_extent[3]

      Y0 = Y_extent[0]
      Y1 = Y_extent[1]
      DY = Y_extent[2]
      PY = Y_extent[3]

      y0 = y_extent[0]
      y1 = y_extent[1]
      dy = y_extent[2]
      py = y_extent[3]

      rp = {X0, X1, DX, PX, x0, x1, dx, px, Y0, Y1, DY, PY, y0, y1, dy, py}

      return rp
    }

    // .................. arywinopen
    let arywinopen = (d0, d1, dd) => { // _e_
      let res = []
      let md = Math.max(Math.abs(d0), Math.abs(d1)) - epsilon
      let mt = Math.ceil(md / dd)
      for (let i = -mt; i < mt; i++) { if (d0 < i * dd && i * dd < d1) { res.push(i * dd) } }
      return res
    }

    // .................. arywinclosed
    let arywinclosed = (d0, d1, dd) => [d0, ...arywinopen(d0, d1, dd), d1]

    function grt (d0, d1, dd, c = 0, f = 0, p = 0) { // def: x, sym, closed
      // ...[d0,d1,dd] : ...[x0,x1,dx], ...[y0,y1,dy]
      // sym: origin in the center. delta towards the extremes
      // asym: interval from left to right border
      // open: from left to right border
      // closed: set left border as right extreme
      // c: 0: x,       1: y
      // f: 0: sym,     1: asym
      // p: 0: closed,  1: open
      let res
      if (f === 0 && p === 0) { // sym closed
        let d = arywinclosed(d0, d1, dd)
        res = c === 0 ? _ => d.map(d => [_, d]) : _ => d.map(d => [d, _]) // x | y
      } else if (f === 0 && p === 1) { // sym open
        let d = arywinopen(d0, d1, dd)
        res = c === 0 ? _ => d.map(d => [_, d]) : _ => d.map(d => [d, _]) // x | y
      } else if (f === 1 && p === 0) { // asym closed
        let d = d3Range(d0, d1 - eps, dd).concat(d1) // [y0,y1) ,y1]
        res = c === 0 ? _ => d.map(d => [_, d]) : _ => d.map(d => [d, _]) // x | y
      } else if (f === 1 && p === 1) { // asym open
        let d = d3Range(d0, d1 - eps, dd)
        res = c === 0 ? _ => d.map(d => [_, d]) : _ => d.map(d => [d, _]) // x | y
      }
      return res
    }

    // .................. grarr
    let grarr = function (params = {}) {
      let d3Range = d3array.range
      let {X0, X1, DX, PX, x0, x1, dx, px,
        Y0, Y1, DY, PY, y0, y1, dy, py} = gratiparams(params)

      let {
        gsa = 0,
        gco = 0,
      } = params

      // get circles from point in sphere and step
      let X = grt(Y0, Y1, PY, 0, gsa, gco), // get X(Y) by PY
        Y = grt(X0, X1, PX, 1, gsa, gco), // get Y(X) by PX
        x = grt(y0, y1, py, 0, gsa, gco), // get x(y) by py
        y = grt(x0, x1, px, 1, gsa, gco) // get y(x) by px

      // include first meridian
      let bigmer = (params.bigmer !== undefined) ? params.bigmer : 1

      // function to generate meridians
      let merfn = (params.merfn !== undefined)
        ? params.merfn
        : (a, b, d) => d3Range(Math.ceil(a / d) * d, b, d)

      let mmBig = merfn(X0, X1, DX) // long mers
      let mmShort = merfn(x0, x1, dx) // short mers
      let mmAll = _merge(mmBig, mmShort) // deg location of mers in [-180,180] xy
      let mmLines = mmAll.map(d => (Math.abs(d % DX) > eps) ? x(d) : X(d))

      // meridians
      let mms = { type: 'MultiLineString', coordinates: mmLines }
      if (!muonGeoj.isValid(mms)) { console.error('mms not valid') }

      // include equator
      let bigpar = (params.bigpar !== undefined) ? params.bigpar : 1

      // function to generate parallels
      let parfn = (params.parfn !== undefined)
        ? params.parfn
        : (a, b, d) => d3Range(Math.ceil(a / d) * d, b, d)

      let ppBig = parfn(Y0, Y1, DY)
      let ppShort = parfn(y0, y1 + eps, dy)
      let ppAll = _merge(ppBig, ppShort) // deg location of pars in [-90,90] z
      let ppLines = ppAll.map(d => (Math.abs(d % DY) > eps) ? y(d) : Y(d)) // d:120

      // parallels
      let pps = { type: 'MultiLineString', coordinates: ppLines }
      if (!muonGeoj.isValid(pps)) { console.error('pps not valid') }

      let ret = {mms, pps}
      return ret
    }

    // .................. equator
    let equator = function (params) {
      let p = params || [ [ [-180, 180, 360, 1], [-90, 90, 360, 1] ] ] // [xMm, yMm]
      let g = grarr(p)
      let coords = g.pps.coordinates[0] // first and only ring

      let gj = {
        type: 'Feature',
        geometry: {type: 'LineString', coordinates: coords},
        properties: {muonGraticule: 'equator'},
      }
      if (!muonGeoj.isValid(gj)) console.error('gj not valid')

      return gj
    }


    // .................. gjfMultiLineString
    let gjfMultiLineString = function (params = {}) {
      let g = grarr(params)
      let mersCoords = g.mms.coordinates
      let parsCoords = g.pps.coordinates

      const {
        ghv = 0, // get horizontal, vertical, horizontal+vertical geodesics
      } = params

      let coords = []
      if (ghv === 0) {      // ghv: 0 pars+mers [ [h], [v] ]
        // coords = [].concat(mersCoords).concat(parsCoords)
        coords = [].concat(parsCoords).concat(mersCoords)
      } else if (ghv === 1) { // ghv: 1 pars [ [h]  ]
        coords = [].concat(parsCoords)
      } else if (ghv === 2) { // ghv: 2 mers [ [v]  ]
        coords = [].concat(mersCoords)
      }

      let gj = {
        type: 'Feature',
        geometry: {type: 'MultiLineString', coordinates: coords},
        properties: {},
      }
      if (!muonGeoj.isValid(gj)) console.error('gj not valid')

      return gj
    }

    // .................. dedges
    let dedges = function (params) {
      let g = grarr(params)
      let mersCoords = g.mms.coordinates
      let parsCoords = g.pps.coordinates

      let mersq = mersCoords.length // 12 x 7
      let parsq = parsCoords.length //  7 x 13
      let index = tidx(mersq, parsq) // 12, 7

      let m0 = 0 // 0
      let mn = mersq // 12
      let p0 = 0 // 0
      let pn = parsq // 6

      let lines = []
      let line = []
      for (let i = m0; i < mn; i++) { // meridians    0 - 11
        for (let j = p0; j < pn - 1; j++) { // exclude upper segement
          let i0 = i
          let i1 = (i + 1) % mersq // mer 12 is mer 0

          let j0 = j
          let j1 = (j + 1) // % (parsq) // parabolic

          let coord = [ index(i0, j0), index(i1, j1) ]
          line.push(coord)
        }
        lines.push(line)
      }

      let gj = {
        type: 'Feature',
        geometry: {type: 'MultiLineString', coordinates: lines},
        properties: {muonGraticule: 'vhMultiLine'},
      }
      if (!muonGeoj.isValid(gj)) console.error('gj not valid')

      return gj
    }

    // .................. gVertices
    let gVertices = function (params = {}) {
      let g = grarr(params)
      let mersCoords = g.mms.coordinates // with y delta, precision
      let parsCoords = g.pps.coordinates // with x delta, precision

      let {X0, X1, DX, PX, x0, x1, dx, px,
        Y0, Y1, DY, PY, y0, y1, dy, py} = gratiparams(params)
      let ry = dy / py // step to precision ratio in meridiam

      let mersq = mersCoords.length //  [-90, 90]   [dy,py]
      let parsq = parsCoords.length //  [-180, 180] [dx,px]

      let index = tidx(mersq, parsq) // 12, 7

      let m0 = 0
      let mn = mersq // eg. 4  mers with 5 coords each
      let p0 = 0
      let pn = parsq // eg. 3

      let vertices = []
      for (let i = m0; i < mn; i++) { // meridians
        // for (let j = p0; j < pn; j++) { // parallels   exclude upper lat
        for (let j = p0; j < mersCoords[i].length - 1; j++) { // parallels   exclude upper lat
          let i0 = i // mer index
          let i1 = (i + 1) % mersq // return to origin

          let j0 = j // par index
          let j1 = (j + 1) //

          let j0p = Math.round(j0 * ry) //  revert precision to step
          let j1p = Math.round(j1 * ry)

          let verts = []

          vertices[index(i0, j0)] = verts[0] = mersCoords[i0][j0p] // [0,0] [0,0]
          vertices[index(i0, j1)] = verts[1] = mersCoords[i0][j1p] // [0,1] [0,1]
          vertices[index(i1, j0)] = verts[2] = mersCoords[i1][j0p] // [1,0] [1,0]
          vertices[index(i1, j1)] = verts[3] = mersCoords[i1][j1p] // [1,1] [1,1]
        }
      }

      return vertices
    }

    // .................. gjfMultiPoint
    let gjfMultiPoint = function (params = {}) {
      let vertices = gVertices(params)

      return { // return vertices
        type: 'Feature',
        geometry: {
          type: 'MultiPoint',
          coordinates: vertices
        },
        properties: {},
      }
    }

    // .................. gfaces
    // ... bifaces
    let gfaces = function (params, range = null, tile = null, inPolygons = []) {
      let g = grarr(params)
      let mersCoords = g.mms.coordinates
      let parsCoords = g.pps.coordinates

      let mersq = mersCoords.length // 12 x 7
      let parsq = parsCoords.length //  7 x 13
      // let index = tidx(mersq, parsq) // 12, 7

      let m0 = 0 // 0
      let mn = mersq // 12
      let p0 = 0 // 0
      let pn = parsq // 6

      let faces = []
      for (let i = m0; i < mn; i++) { // meridians    0 - 11
        // for (let j = p0; j < pn - 1; j++) { // exclude upper segement
        for (let j = p0; j < mersCoords[i].length - 1; j++) { // exclude upper segement
          let i0 = i
          let i1 = (i + 1) % mersq // mer 12 is mer 0

          let j0 = j
          let j1 = (j + 1) // % (parsq) // parabolic

          let fs = bifaces(i, j, mersq, parsq, mersCoords, inPolygons)  // bifaces
          fs.forEach(f => faces.push(f))
        }
      }

      return faces
    }
    // .................. qfaces
    // ... quads
    let qfaces = function (params, range = null, tile = null, inPolygons = []) {
      let g = grarr(params)
      let mersCoords = g.mms.coordinates
      let parsCoords = g.pps.coordinates

      let mersq = mersCoords.length // 12 x 7
      let parsq = parsCoords.length //  7 x 13
      // let index = tidx(mersq, parsq) // 12, 7

      let m0 = 0 // 0
      let mn = mersq // 12
      let p0 = 0 // 0
      let pn = parsq // 6

      let faces = []
      for (let i = m0; i < mn; i++) { // meridians    0 - 11
        // for (let j = p0; j < pn - 1; j++) { // exclude upper segement
        for (let j = p0; j < mersCoords[i].length - 1; j++) { // exclude upper segement
          let i0 = i
          let i1 = (i + 1) % mersq // mer 12 is mer 0

          let j0 = j
          let j1 = (j + 1) // % (parsq) // parabolic

          let fs = quads(i, j, mersq, parsq, mersCoords, inPolygons)  // quads
          fs.forEach(f => faces.push(f))
        }
      }

      return faces
    }

    // .................. _merge
    let _merge = function (major, minor, ret = {}) {
      ret = [...major, ...minor]
        .sort((a, b) => a - b)
        .filter((elem, pos, arr) => arr.indexOf(elem) == pos)

      return ret
    }

    // .................. enty
    let enty = function (p = {}) {
      state.graticule = gratiparams(p)
      return enty
    }

    enty.reset = function () {
      cache = cacheGraticule = null
      return enty
    }

    enty.tidx = tidx
    enty.ridx = ridx
    enty.gratiparams = gratiparams
    enty.grarr = grarr

    enty.dedges = dedges

    enty.gfaces = gfaces
    enty.qfaces = qfaces
    enty.equator = equator

    enty.gjfMultiLineString = gjfMultiLineString
    enty.gjfMultiPoint = gjfMultiPoint

    return enty
  }

  // ...
  // ... # license
  // ... MIT

  exports.muonGraticule = muonGraticule
}))
