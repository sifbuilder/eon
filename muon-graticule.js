/***********
 *    @muonGraticule
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonGraticule = global.muonGraticule || {})))
}(this, function (exports) {
  'use strict'

  // Version 0.0.0. Copyright 2017 Mike Bostock.
  // GeoJSON in Three.js

  let muonGraticule = function (__mapper = {}) {
    let f = __mapper('props')()

    const acos = Math.acos, asin = Math.asin, atan2 = Math.atan2, cos = Math.cos,
      max = Math.max, min = Math.min, PI = Math.PI, sin = Math.sin, sqrt = Math.sqrt,
      radians = PI / 180, degrees = 180 / PI, epsilon = 1e-5

    let defaultMajor = [ [-180, 180, 90, 2.5], [-90, 90, 360, 2.5] ]
    let defaultMinor = [ [-180, 180, 10, 2.5], [-80, 80, 10, 2.5] ]

    /* *********************
     *    @idx  index
     *      given number of rows and columsn and span between rows and columns
     *      give position of row.column
     */
    let tidx = function (horq, verq, hd = 1, vd = 1) {
      return function (col, row) { // col, row
        let ret = (row * hd) * (horq * vd) + col
        return ret
      }
    }
    /* *********************
     *    @ridx reverse index
     */
    let ridx = function (horq, verq, hd = 1, vd = 1) {
      return function (idx) {
        let ret = [Math.floor(((idx / hd) / vd) / horq), idx % horq]
        return ret
      }
    }

    /* *********************
     *    @oneface
     *    a,b,c coord-vertices in [xn, yn] space give face verts indices
     */
    let oneface = function (a, b, c, xn, yn) { //  xy,ru,ry
      let index = tidx(xn, yn)
      return [ index(a[0], a[1]), index(b[0], b[1]), index(c[0], c[1]) ]
    }

    /* *********************
     *    @bifaces
     *    (i,h) in [xn,yn[]
     *      vertices to ...
     *      inPolygons to filter coords if in pols
     *      mersCoords to get vert coords
     */
    let bifaces = function bifaces (i, j, xn, yn, mersCoords, inPolygons=[]) {
      let ret = []
      let index = tidx(xn, yn)

      let i0 = i
      let i1 = (i + 1) % xn
      let j0 = j
      let j1 = (j + 1)

      let inside = true
      if (inPolygons.length > 0) {
        inside = __mapper('xs').m('geom').polygonInMultiPolygon(
          [ mersCoords[i0][j0], mersCoords[i1][j0], mersCoords[i1][j1], mersCoords[i0][j1] ],
          inPolygons // _e_
        )
      }

      let f1 = oneface([i0, j0], [i1, j0], [i1, j1], xn, yn)
      let f2 = oneface([i0, j0], [i1, j1], [i0, j1], xn, yn)

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


			let mer = 1
			let par = 1

			let X0, X1, DX, PX, x0, x1, dx, px
			let Y0, Y1, DY, PY, y0, y1, dy, py

			if (params.extent !== undefined) {							// extent
				let extent = params.extent, // major, minor
					x_extent = extent[0],
					y_extent = extent[1]


					X1 = x_extent[0], X0 = -X1, // x_extentMajor 	eg. 180
					x1 = x_extent[1], x0 = -x1, // x_extentMinor 	eg. 180
					DX = x_extent[2],						// x_stepMajor 		eg. 90
					dx = x_extent[3],						// x_stepMinor 		eg. 10
					px = x_extent[4],						// x_precision 		eg. 2.5

					Y1 = y_extent[0], Y0 = -Y1, // y_extentMajor 	eg. 90
					y1 = y_extent[1], y0 = -y1, // y_extentMinor 	eg. 80
					DY = y_extent[2],  					// y_stepMajor		eg. 360	
					dy = y_extent[3],						// y_stepMinor		eg. 10
					py = y_extent[4]						// y_precision		eg. 2.5

			} else 	if (params.graticule !== undefined) {		// graticule


				let graticule = params.graticule, // major, minor
					X_extent = graticule[0][0],
					Y_extent = graticule[0][1],
					x_extent = graticule[1][0],
					y_extent = graticule[1][1]

					X0 = X_extent[0],
					X1 = X_extent[1],
					DX = X_extent[2],
					PX = X_extent[3],

					x0 = x_extent[0],
					x1 = x_extent[1],
					dx = x_extent[2],
					px = x_extent[3],

					Y0 = Y_extent[0],
					Y1 = Y_extent[1],
					DY = Y_extent[2],
					PY = Y_extent[3],

					y0 = y_extent[0],
					y1 = y_extent[1],
					dy = y_extent[2],
					py = y_extent[3]

			}

				let X = graticuleX(Y0, Y1, py),
					Y = graticuleY(X0, X1, px)

				let x = graticuleX(y0, y1, py),
					y = graticuleY(x0, x1, px)



      function graticuleX (y0, y1, dy) {
        let y = d3.range(y0, y1 - epsilon, dy).concat(y1) // by intervals and close
        return function (x) { return y.map(function (y) { return [x, y] }) }
      }

      function graticuleY (x0, x1, dx) {
        let x = d3.range(x0, x1 - epsilon, dx).concat(x1)
        return function (y) { return x.map(function (x) { return [x, y] }) }
      }




				let mm1 = function mm1(_X, _X0, _X1, _DX, _x, _x0, _x1, _dx, _epsilon) {
					return d3.range(Math.ceil(_X0 / _DX) * _DX, _X1, _DX)
				}
				let mm2 = function mm2(_X, _X0, _X1, _DX, _x, _x0, _x1, _dx, _epsilon) {
					return d3.range(Math.ceil(_x0 / _dx) * _dx, _x1,	_dx)
				}
				let mm3 = function mm3(_X, _X0, _X1, _DX, _x, _x0, _x1, _dx, _epsilon) {
						let _mm1 = mm1(_X, _X0, _X1, _DX, _x, _x0, _x1, _dx, _epsilon)
						let _mm2 = mm2(_X, _X0, _X1, _DX, _x, _x0, _x1, _dx, _epsilon)

						let _mm3 = ((mer) ? [..._mm1, ..._mm2] : [..._mm2])	// meridian ?
										.sort((a, b) => a - b)
										.filter((elem, pos, arr) => arr.indexOf(elem) == pos)

						let ret = {type: "MultiLineString"}
						ret.coordinates = _mm3.map(d => {

								if (Math.abs(d % _DX) > _epsilon) {
									return _x(d)
								} else {
									return _X(d)
								}
						})

						return ret
				}
				let mms = mm3(X, X0, X1, DX, x, x0, x1, dx, epsilon)		// _e_



				let pp1 = function pp1(_Y, _Y0, _Y1, _DY, _y, _y0, _y1, _dy, _epsilon) {
					return d3.range(Math.ceil(_Y0 / _DY) * _DY, _Y1, _DY)
				}
				let pp2 = function pp2(_Y, _Y0, _Y1, _DY, _y, _y0, _y1, _dy, _epsilon) {
					return d3.range(Math.ceil(_y0 / _dy) * _dy, _y1  + _epsilon,	_dy)
				}

				let pp3 = function pps(_Y, _Y0, _Y1, _DY, _y, _y0, _y1, _dy, _epsilon) {
						let _pp1 = mm1(_Y, _Y0, _Y1, _DY, _y, _y0, _y1, _dy, _epsilon)
						let _pp2 = mm2(_Y, _Y0, _Y1, _DY, _y, _y0, _y1, _dy, _epsilon)

						let pp3 = ((par) ? [..._pp1, ..._pp2] : [..._pp2])	// meridian ?
									.sort((a, b) => a - b)
									.filter((elem, pos, arr) => arr.indexOf(elem) === pos)

						let ret = {type: "MultiLineString"}
						ret.coordinates = pp3.map(d => {

								if (Math.abs(d % _DY) > _epsilon) {
									return _y(d)
								} else {
									return _Y(d)

								}
						})

						return ret

				}
					let pps = pp3(Y, Y0, Y1, DY, y, y0, y1, dy, epsilon)		// _e_



					let bmm = {			// long meridians
							type: "MultiLineString",
							coordinates: mm1(X, X0, X1, DX, x, x0, x1, dx, epsilon)
					}
					let mm = {			// meridians
							type: "MultiLineString",
							coordinates: mm2(X, X0, X1, DX, x, x0, x1, dx, epsilon)
					}
					let bp = {			// long parallel
							type: "MultiLineString",
							coordinates: pp1(Y, Y0, Y1, DY, y, y0, y1, dy, epsilon)
					}
					let pp = {			// parallels
							type: "MultiLineString",
							coordinates: pp2(Y, Y0, Y1, DY, y, y0, y1, dy, epsilon)
					}
					let ret = {
										bp, bmm, pp , mm,
										mms, pps,
								}



      return ret
    }
    /* *******************
 *        gedges
 */
    let gedges = function (params = {}) {
      let g = grarr(params)
      let mersCoords = g.mms.coordinates
      let parsCoords = g.pps.coordinates
      let coords = [...mersCoords, ...parsCoords]
      return coords
    }
    /* *********************
     *    @gvertices

     */
    let gvertices = function (params = {}) {
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

      let vertices = []
      let faces = []

      for (let j = p0; j < pn; j++) { // paralles   0 -  5
        for (let i = m0; i < mn; i++) { // meridians    0 - 11
          let i0 = i
          let i1 = (i + 1) % mersq // mer 12 is mer 0

          let j0 = j
          let j1 = (j + 1) //

          vertices[index(i0, j0)] = mersCoords[i0][j0] // VERTICES
          vertices[index(i0, j1)] = mersCoords[i0][j1]
          vertices[index(i1, j0)] = mersCoords[i1][j0]
          vertices[index(i1, j1)] = mersCoords[i1][j1]
        }
      }

      return vertices
    }

    /* *********************
     *    @gfaces
     */
    let gfaces = function (params, range=null, tile=null, inPolygons=[]) {
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
        for (let j = p0; j < pn; j++) { // parallels  0 -  5
          let i0 = i
          let i1 = (i + 1) % mersq // mer 12 is mer 0

          let j0 = j
          let j1 = (j + 1) // % (parsq) // parabolic

          let fs = bifaces(i, j, mersq, parsq, mersCoords,  inPolygons)
          fs.forEach(f => faces.push(f))
        }
      }

      return faces
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
      ret = {type: 'MultiLineString'}
      ret.coordinates = [...major, ...minor]
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
        d3.range(retRad[0], retRad[1], retRad[2]) // range rad
          .map(ro =>
            d3.range(retAng[0], retAng[1] + epsilon, retAng[2]) // range ang - +epsilon
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

    enty.grarr = grarr

    enty.gedges = gedges
    enty.gfaces = gfaces
    enty.gvertices = gvertices

    enty.geodes = geodes
		enty.reticule = reticule
    enty.ridx = ridx

    return enty
  }

  exports.muonGraticule = muonGraticule
}))
