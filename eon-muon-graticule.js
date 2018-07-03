/***********
 *    @muonGraticule
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonGraticule = global.muonGraticule || {})))
}(this, function (exports) {
  'use strict'

  async function muonGraticule (__mapper = {}) {
    let [
      mgeoj,
      d3
    ] = await Promise.all([
      __mapper('xs').m('geoj'),
      __mapper('xs').q('d3')
    ])

    let d3Range = d3.range

    const acos = Math.acos, asin = Math.asin, atan2 = Math.atan2, cos = Math.cos,
      max = Math.max, min = Math.min, PI = Math.PI, sin = Math.sin, sqrt = Math.sqrt,
      radians = PI / 180, degrees = 180 / PI, eps = 1e-5

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
        let ret = [Math.floor(((idx / hd) / vd) / horq), idx % horq]
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

    // .................. gratiparams
    let gratiparams = function (params = {}, rp = {}) {
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
        // frame: [ [X_extent, Y_extent] , [x_extent, y_extent] ]

        let graticule = params.frame // major, minor

        if (graticule.length === 2) {
        // eg. [ [ [-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ],
          // [  [-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ] ]

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
    let arywinopen = (x0, x1, dx) => {
      let epsilon = 1e-5
      let xx = []
      let mx = Math.max(Math.abs(x0), Math.abs(x1)) - epsilon
      let mt = Math.ceil(mx / dx)
      for (let i = -mt; i < mt; i++) { if (x0 < i * dx && i * dx < x1) { xx.push(i * dx) } }
      return xx
    }

    // .................. arywinclosed
    let arywinclosed = (x0, x1, dx) => [x0, ...arywinopen(x0, x1, dx), x1]

    // .................. symgraticuleX
    function symgraticuleX (y0, y1, dy) {
      let y = arywinclosed(y0, y1, dy) // sym win
      return _ => y.map(y => [_, y])
    }

    // .................. symgraticuleY
    function symgraticuleY (x0, x1, dx) {
      let x = arywinclosed(x0, x1, dx) // sym win
      return _ => x.map(x => [x, _])
    }

    // .................. asymgraticuleX
    function asymgraticuleX (y0, y1, dy) {
      let y = d3Range(y0, y1 - eps, dy).concat(y1) // [y0,y1) ,y1]
      return _ => y.map(y => [_, y])
    }

    // .................. asymgraticuleY
    function asymgraticuleY (x0, x1, dx) {
      let x = d3Range(x0, x1 - eps, dx).concat(x1) // [x0,x1) ,x1]
      return _ => x.map(x => [x, _])
    }

    // .................. grarr
    let grarr = function (params = {}) {
      let {X0, X1, DX, PX, x0, x1, dx, px,
        Y0, Y1, DY, PY, y0, y1, dy, py} = gratiparams(params)

      // get circles from point in sphere and step
      let X = symgraticuleX(Y0, Y1, PY), // get X(Y) by PY
        Y = symgraticuleY(X0, X1, PX), // get Y(X) by PX
        x = symgraticuleX(y0, y1, py), // get x(y) by py
        y = symgraticuleY(x0, x1, px) // get y(x) by px

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
      if (!mgeoj.isValid(mms)) { console.error('mms not valid') }

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
      if (!mgeoj.isValid(pps)) { console.error('pps not valid') }

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
        properties: {mgraticule: 'equator'}
      }
      if (!mgeoj.isValid(gj)) console.error('gj not valid')

      return gj
    }

    // .................. vhMultiLine
    let vhMultiLine = function (params = {}) {
      let g = grarr(params)
      let mersCoords = g.mms.coordinates
      let parsCoords = g.pps.coordinates

      let coords = [].concat(mersCoords).concat(parsCoords)

      let gj = {
        type: 'Feature',
        geometry: {type: 'MultiLineString', coordinates: coords},
        properties: {mgraticule: 'vhMultiLine'}
      }
      if (!mgeoj.isValid(gj)) console.error('gj not valid')

      return gj
    }

    // .................. vMultiLine
    let vMultiLine = function (params = {}) {
      let g = grarr(params)
      let mersCoords = g.mms.coordinates
      let parsCoords = g.pps.coordinates

      let coords = [].concat(mersCoords)

      let gj = {
        type: 'Feature',
        geometry: {type: 'MultiLineString', coordinates: coords},
        properties: {mgraticule: 'vhMultiLine'}
      }
      if (!mgeoj.isValid(gj)) console.error('gj not valid')

      return gj
    }

    // .................. hMultiLine
    let hMultiLine = function (params = {}) {
      let g = grarr(params)
      let mersCoords = g.mms.coordinates
      let parsCoords = g.pps.coordinates

      let coords = [].concat(parsCoords)

      let gj = {
        type: 'Feature',
        geometry: {type: 'MultiLineString', coordinates: coords},
        properties: {mgraticule: 'vhMultiLine'}
      }
      if (!mgeoj.isValid(gj)) console.error('gj not valid')

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
        properties: {mgraticule: 'vhMultiLine'}
      }
      if (!mgeoj.isValid(gj)) console.error('gj not valid')

      return gj
    }

    // .................. gvertices
    let gvertices = function (params = {}) {
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

          verts[0] = vertices[index(i0, j0)] = mersCoords[i0][j0p] // [0,0] [0,0]
          verts[1] = vertices[index(i0, j1)] = mersCoords[i0][j1p] // [0,1] [0,1]
          verts[2] = vertices[index(i1, j0)] = mersCoords[i1][j0p] // [1,0] [1,0]
          verts[3] = vertices[index(i1, j1)] = mersCoords[i1][j1p] // [1,1] [1,1]
        }
      }

      return { // return vertices
        type: 'Feature',
        geometry: {type: 'LineString', coordinates: vertices},
        properties: {}
      }
    }

    // .................. gfaces
    let gfaces = function (params, range = null, tile = null, inPolygons = []) {
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

    enty.vhMultiLine = vhMultiLine
    enty.vMultiLine = vMultiLine
    enty.hMultiLine = hMultiLine

    enty.dedges = dedges

    enty.gfaces = gfaces
    enty.gvertices = gvertices
    enty.equator = equator

    return enty
  }

  exports.muonGraticule = muonGraticule
}))
