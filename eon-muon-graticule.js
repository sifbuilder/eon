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

    // http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html
    let isSame = function (a, b) {
      let ret = false
      if (a !== undefined && b !== undefined) {
        var aProps = Object.getOwnPropertyNames(a)
        var bProps = Object.getOwnPropertyNames(b)

        if (aProps.length != bProps.length) {
          return false
        }

        for (var i = 0; i < aProps.length; i++) {
          var propName = aProps[i]

          if (a[propName] !== b[propName]) {
            return false
          }
        }

        ret = true
      }

      return ret
    }

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
      let index = tidx(xn, yn)
      return [ index(a[0], a[1]), index(b[0], b[1]), index(c[0], c[1]) ]
    }

    // .................. bifaces
    let bifaces = function (i, j, xn, yn) {
      let index = tidx(xn, yn)

      let i0 = i
      let i1 = (i + 1) % xn // _e_
      let j0 = j
      let j1 = (j + 1)

      let f1 = oneface([i0, j0], [i1, j0], [i1, j1], xn, yn)
      let f2 = oneface([i0, j0], [i1, j1], [i0, j1], xn, yn)

      return [f1, f2]
    }

    // .................. quads
    let quads = function (i, j, xn, yn) {
      // if (1 && 1) console.log('quads', i,j,' : ', xn,yn)

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

      return [f ]
    }

    // .................. gratiparams
    let gratiparams = function (params = {}) {
      let rp = {}
      
      let X0, X1, DX, PX, x0, x1, dx, px,
        Y0, Y1, DY, PY, y0, y1, dy, py

      let X_extent, Y_extent, x_extent, y_extent

      if (params.lattice !== undefined) { // lattice
      // lattice: [x_extent, y_extent]
      // eg. [ [180, 55], [90, 2.5] ]

        let lattice = params.lattice

        x_extent = lattice[0] // x major::minor
        y_extent = lattice[1] // y major::minor

        if (Array.isArray(x_extent[0])) { // eg. [ [ [-40,180], 55], [] ]
          X1 = x_extent[0][1] // x_extentMajor  eg. 180
          X0 = x_extent[0][0]
        } else { // eg. [ [ 180, 55], [] ]
          X1 = x_extent[0] // x_extentMajor   eg. 180
          X0 = -X1
        }

        x1 = X1 // x_extentMinor   eg. 180
        x0 = -x1
        DX = x_extent[1] // x_stepMajor    eg. 90
        dx = DX // x_stepMinor    eg. 10
        PX = DX // x_precision    eg. 2.5
        px = PX

        if (Array.isArray(y_extent[0])) {
          Y1 = y_extent[0][1] // x_extentMajor  eg. 180
          Y0 = y_extent[0][0]
        } else {
          Y1 = y_extent[0] // x_extentMajor   eg. 180
          Y0 = -Y1
        }

        y1 = Y1 // y_extentMinor   eg. 80
        y0 = -y1
        DY = y_extent[1] // y_stepMajor   eg. 360
        dy = DY // y_stepMinor    eg. 10
        PY = DY // y_precision    eg. 2.5
        py = PY

        rp = {X0, X1, DX, PX, x0, x1, dx, px, Y0, Y1, DY, PY, y0, y1, dy, py}
      } else if (params.frame !== undefined) { // frame
        // frame: [ [X_extent, Y_extent] ,
        //          [x_extent, y_extent] ]

        let graticule = params.frame // major, minor

        if (graticule.length === 2) {
        // eg. [ [ [-180, 180, 45, 45],
        //         [-90, 90, 22.5, 22.5] ],
        //       [ [-180, 180, 45, 45],
        //          [-90, 90, 22.5, 22.5] ] ]

          X_extent = graticule[0][0]
          Y_extent = graticule[0][1]
          x_extent = graticule[1][0]
          y_extent = graticule[1][1]
        } else if (graticule.length === 1) { // major, minor coincide
        // eg. [ [ [-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ]

          X_extent = graticule[0][0]
          Y_extent = graticule[0][1]
          x_extent = graticule[0][0]
          y_extent = graticule[0][1]
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
      } else if (Array.isArray(params)) { // default to frame
        let p = {frame: params} // eg. [ [-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ]
        rp = gratiparams(p)
      }

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
        asyg = 0,
        closeg = 0,
      } = params

      // get circles from point in sphere and step
      let X = grt(Y0, Y1, PY, 0, asyg, closeg), // get X(Y) by PY
        Y = grt(X0, X1, PX, 1, asyg, closeg), // get Y(X) by PX
        x = grt(y0, y1, py, 0, asyg, closeg), // get x(y) by py
        y = grt(x0, x1, px, 1, asyg, closeg) // get y(x) by px

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
        hvg = 0, // get horizontal, vertical, horizontal+vertical geodesics
      } = params
      
      let coords = []
      if (hvg === 0) {
        coords = [].concat(mersCoords).concat(parsCoords)
      } else if (hvg === 1) {
        coords = [].concat(parsCoords)
      } else if (hvg === 2) {
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

          let fs = bifaces(i, j, mersq, parsq, mersCoords, inPolygons)
          fs.forEach(f => faces.push(f))
        }
      }

      return faces
    }
    // .................. qfaces
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

          let fs = quads(i, j, mersq, parsq, mersCoords, inPolygons)
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

    enty.gjfMultiLineString = gjfMultiLineString

    enty.dedges = dedges

    enty.gfaces = gfaces
    enty.qfaces = qfaces
    enty.gjfMultiPoint = gjfMultiPoint
    enty.equator = equator

    return enty
  }

  exports.muonGraticule = muonGraticule
}))
