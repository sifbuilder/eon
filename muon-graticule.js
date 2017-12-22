/***********
 *    @muonGraticule
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.muonGraticule = global.muonGraticule || {})))
}(this, function (exports) { "use strict"

// Version 0.0.0. Copyright 2017 Mike Bostock.
// GeoJSON in Three.js

  let muonGraticule = function (__mapper = {}) {

    let f = __mapper("props")()

    const acos = Math.acos, asin = Math.asin, atan2 = Math.atan2, cos = Math.cos,
      max = Math.max, min = Math.min, PI = Math.PI, sin = Math.sin, sqrt = Math.sqrt,
      radians = PI / 180, degrees = 180 / PI, epsilon = 1e-5

    let defaultMajor = [ [-180, 180, 90, 2.5],  [-90, 90, 360, 2.5] ]
    let defaultMinor = [ [-180, 180, 10, 2.5],  [-80, 80, 10, 2.5] ]

    /* *********************
     *    @idx  index
     *      given number of rows and columsn and span between rows and columns
     *      give position of row.column
     */
    let tidx = function (horq, verq, hd = 1, vd =1) {
      return function(col, row) {                 // col, row
        let ret = (row * hd) * (horq * vd) + col
        return ret
      }
    }
    /* *********************
     *    @ridx reverse index
     */
    let ridx = function(horq, verq, hd = 1, vd =1) {
      return function(idx) {
        let ret = [Math.floor((( idx / hd) / vd) /horq), idx % horq]
        return ret
      }
    }
    /* *********************
     *    @getVerts
     *      mersCoords
     *      parsCoords
     */
    let getVerts = function (mersCoords, parsCoords) {

      let mersq = mersCoords.length   // 12 x 7
      let parsq = parsCoords.length   //  7 x 13

      let index = tidx(mersq, parsq)    // 12, 7

      let m0 = 0          // 0
      let mn = mersq      // 12
      let p0 = 0          // 0
      let pn = parsq      // 6

      let vertices = []
      let faces = []


      for (let j=p0; j<pn; j++) {   // paralles   0 -  5
        for (let i=m0; i<mn ; i++) {  // meridians    0 - 11

          let i0 = i
          let i1 = (i + 1)  % mersq     // mer 12 is mer 0

          let j0 = j
          let j1 = (j + 1)              //

          vertices[index(i0,j0)]  = mersCoords[i0][j0]    // VERTICES
          vertices[index(i0,j1)]  = mersCoords[i0][j1]
          vertices[index(i1,j0)]  = mersCoords[i1][j0]
          vertices[index(i1,j1)]  = mersCoords[i1][j1]

        }
      }

      return vertices
    }

    /* *********************
     *    @getFaces
     */
    let getFaces = function (mersCoords, parsCoords, range, tile, vertices, bigPolygons) {

      let mersq = mersCoords.length   // 12 x 7
      let parsq = parsCoords.length   //  7 x 13
      let index = tidx(mersq, parsq)    // 12, 7

      let m0 = 0          // 0
      let mn = mersq      // 12
      let p0 = 0          // 0
      let pn = parsq      // 6

      let faces = []

      for (let i=m0; i<mn ; i++) {  // meridians    0 - 11
        for (let j=p0; j<pn; j++) {   // parallels  0 -  5

          let i0 = i
          let i1 = (i + 1)  % mersq     // mer 12 is mer 0

          let j0 = j
          let j1 = (j + 1)              //

          let fs = bifaces(i,j, mersq, parsq, vertices, bigPolygons, mersCoords)
          fs.forEach(f => faces.push(f))

        }
      }

      return faces
    }

    /* *********************
     *    @getFacesParabolic
     */
    let getFacesParabolic = function (mersCoords, parsCoords, vertex3, range, tile, vertices, bigPolygons) {

      let mersq = mersCoords.length   // 12 x 7
      let parsq = parsCoords.length   //  7 x 13
      let index = tidx(mersq, parsq)    // 12, 7

      let m0 = 0          // 0
      let mn = mersq      // 12
      let p0 = 0          // 0
      let pn = parsq      // 6

      let faces = []

      for (let i=m0; i<mn - 1; i++) { // meridians    0 - 11  parabolic:  mn - 1
        for (let j=p0; j<pn; j++) {   // parallels  0 -  5

          let i0 = i
          let i1 = (i + 1)  % (mersq)     // mer 12 is mer 0

          let j0 = j
          let j1 = (j + 1)   % (parsq)            //

          let fs = bifaces(i,j, mersq, parsq, vertices, bigPolygons, mersCoords)
          fs.forEach(f => faces.push(f))

        }
      }

      return faces
    }

    /* *********************
     *    @oneface
     *    a,b,c coord-vertices in [xn, yn] space give face verts indices
     */
    let oneface = function (a, b, c, xn, yn) {    //  xy,ru,ry
      let index = tidx(xn, yn)
      return [ index(a[0],a[1]) , index(b[0],b[1]) , index(c[0],c[1]) ]
    }

    /* *********************
     *    @bifaces
     *    (i,h) in [xn,yn[]
     *      vertices to ...
     *      bigPolygons to filter coords if in pols
     *      mersCoords to get vert coords
     */
    let bifaces = function bifaces (i, j, xn, yn, vertices, bigPolygons, mersCoords) {

      let ret = []
      let index = tidx(xn, yn)

      let i0 = i
      let i1 = (i + 1)  % xn
      let j0 = j
      let j1 = (j + 1)

      let inside = true
      if (bigPolygons) inside = __mapper("xs").m("geom").polygonInMultiPolygon(
        [ mersCoords[i0][j0], mersCoords[i1][j0], mersCoords[i1][j1], mersCoords[i0][j1] ],
        bigPolygons // _e_
      )

      let f1 = oneface([i0,j0], [i1,j0], [i1,j1], xn, yn)
      let f2 = oneface([i0,j0], [i1,j1], [i0,j1], xn, yn)

      if (inside) {
        ret.push(f1)
        ret.push(f2)
      }

      return ret
    }
    /* *******************
 *        grarr
 */
    let grarr = function (params = {}) {

      let extent = params.extent      // major, minor
      let x_extent = extent[0]
      let y_extent = extent[1]

      let
        X0 = x_extent[0],
        X1 = x_extent[1],
        DX = x_extent[2],
        px = x_extent[3],

        Y0 = y_extent[0],
        Y1 = y_extent[1],
        DY = y_extent[2],
        py = y_extent[3]

      let graticuleX = function graticuleX(y0, y1, dy) {
        let y = d3.range(y0, y1 - epsilon, dy).concat(y1)    // by intervals and close
        return function(x) { return y.map(function(y) { return [x, y] }) }
      }

      let graticuleY = function graticuleY(x0, x1, dx) {
        let x = d3.range(x0, x1 - epsilon, dx).concat(x1)
        return function(y) { return x.map(function(x) { return [x, y] }) }
      }

      let X = graticuleX(Y0, Y1, py),
        Y = graticuleY(X0, X1, px)

      let mm1 = function mm1(_X, _X0, _X1, _DX) {   // main meridinas
        return d3.range(Math.ceil(_X0 / _DX) * _DX, _X1, _DX)
      }
      let mers = function mers(_X, _X0, _X1, _DX) {
        let _mm1 = mm1(_X, _X0, _X1, _DX)
          .sort((a, b) => a - b)
          .filter((elem, pos, arr) => arr.indexOf(elem) == pos)

        let ret = {type: "MultiLineString"}
        ret.coordinates = _mm1.map(d => _X(d))

        return ret
      }
      let mms = mers(X, X0, X1, DX)   // _e_

      let pp1 = function pp1(_Y, _Y0, _Y1, _DY) {
        return d3.range(Math.ceil(_Y0 / _DY) * _DY, _Y1, _DY)
      }
      let pars = function pars(_Y, _Y0, _Y1, _DY) {
        let _pp1 = pp1(_Y, _Y0, _Y1, _DY)
          .sort((a, b) => a - b)
          .filter((elem, pos, arr) => arr.indexOf(elem) === pos)

        let ret = {type: "MultiLineString"}
        ret.coordinates = _pp1.map(d => _Y(d))

        return ret
      }
      let pps = pars(Y, Y0, Y1, DY)

      let ret = { mms, pps }
      return ret

    }
    /* *******************
 *        grarrx
 */
    let grarrx = function (params = {}) {
      let g = grarr(params)
      let mersCoords = g.mms.coordinates
      let parsCoords = g.pps.coordinates
      let coords = [...mersCoords, ...parsCoords]
      return coords
    }
    /* *******************
 *        geodes
 */
    let geodes = function () {
      let extent = [ [-180, 180, 90, 1], [-90, 90, 360, 1] ]
      let ret = grarr({extent})
      return ret
    }

    /* *******************
 *        equator
 */
    let equator = function () {
      let extent = [ [-180, 180, 90, 1], [-90, 90, 360, 1] ]
      let ret = grarr({extent})
      return ret.pps[0]
    }

    /* *****************
 *        merge
 */
    let merge = function (major, minor, ret = {}) {
      ret = {type: "MultiLineString"}
      ret.coordinates =  [...major, ...minor]
        .sort((a, b) => a - b)
        .filter((elem, pos, arr) => arr.indexOf(elem) == pos)

      return ret
    }
    /* *****************
 *        reticule
 */
    let reticule = function (ret = []) {
      let retAng = ret[0]
      let retRad = ret[1]

      let ccs =
        d3.range(retRad[0], retRad[1], retRad[2])   // range rad
          .map(ro =>
            d3.range(retAng[0], retAng[1] + epsilon , retAng[2])  // range ang - +epsilon
              .map(t => [ro * Math.cos(t * Math.PI / 180), ro * Math.sin(t * Math.PI / 180)]))

      let rrs =
        d3.range(retAng[0], retAng[1], retAng[2])
          .map(fi =>
            d3.range(retRad[0], retRad[1], retRad[2])
              .map(t => [t * Math.cos(fi * Math.PI / 180), t * Math.sin(fi * Math.PI / 180)]))




      return { ccs, rrs }
    }

    /* *****************
 *        enty
 */
    let enty = function () {}

    enty.defaultMajor = () => defaultMajor
    enty.defaultMinor = () => defaultMinor
    enty.grarr = grarr
    enty.grarrx = grarrx
    enty.geodes = geodes

    enty.getFaces = getFaces
    enty.getFacesParabolic = getFacesParabolic
    enty.getVerts = getVerts

    enty.reticule = reticule
    enty.ridx = ridx

    return enty

  }

  exports.muonGraticule = muonGraticule

}))
