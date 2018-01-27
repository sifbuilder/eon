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
    let bifaces = function bifaces (i, j, xn, yn) {
			
			if (0 && 1) console.log("m.graticule.bifaces:", i, j, xn, yn)
      let index = tidx(xn, yn)

      let i0 = i
      let i1 = (i + 1) % xn
      let j0 = j
      let j1 = (j + 1)

      let f1 = oneface([i0, j0], [i1, j0], [i1, j1], xn, yn)
      let f2 = oneface([i0, j0], [i1, j1], [i0, j1], xn, yn)

      return [f1, f2]
    }
		

		
  /* *******************
 *        gratiparams
 */

    let gratiparams = function (params = {}) {
			
			let X0, X1, DX, PX, x0, x1, dx, px,
				Y0, Y1, DY, PY, y0, y1, dy, py

			if (params.lattice !== undefined) {							// lattice
				let extent = params.lattice, // major, minor
					x_extent = extent[0],
					y_extent = extent[1]
					

					if (Array.isArray(x_extent[0])) {
						X1 = x_extent[0][1] // x_extentMajor 	eg. 180
						X0 = x_extent[0][0]
					} else {
						X1 = x_extent[0] // x_extentMajor 	eg. 180
						X0 = -X1
					}
					
					x1 = X1 					 // x_extentMinor 	eg. 180
					x0 = -x1
					DX = x_extent[1]						// x_stepMajor 		eg. 90
					dx = DX										// x_stepMinor 		eg. 10
					PX = DX						// x_precision 		eg. 2.5
					px = PX

					
					
					if (Array.isArray(y_extent[0])) {
						Y1 = y_extent[0][1] // x_extentMajor 	eg. 180
						Y0 = y_extent[0][0]
					} else {
						Y1 = y_extent[0] // x_extentMajor 	eg. 180
						Y0 = -Y1
					}					
					
					y1 = Y1 					 // y_extentMinor 	eg. 80
					y0 = -y1
					DY = y_extent[1]  					// y_stepMajor		eg. 360	
					dy = DY														// y_stepMinor		eg. 10
					PY = DY						// y_precision		eg. 2.5
					py = PY
					
			if (1 && 1) console.log("lattice xs", X0, X1, DX, PX, x0, x1, dx, px)
			if (1 && 1) console.log("lattice ys", Y0, Y1, DY, PY, y0, y1, dy, py)

					
			} else 	if (params.frame !== undefined) {		// frame

				let graticule = params.frame, // major, minor
					X_extent = graticule[0][0],
					Y_extent = graticule[0][1],
					x_extent = graticule[1][0],
					y_extent = graticule[1][1]

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

				if (1 && 1) console.log("frame xs", X0, X1, DX, PX, x0, x1, dx, px)
				if (1 && 1) console.log("frame ys", Y0, Y1, DY, PY, y0, y1, dy, py)
					
			}

			return {
				X0, X1, DX, PX, x0, x1, dx, px,
				Y0, Y1, DY, PY, y0, y1, dy, py
			}
		}
		
  /* *******************
 *        grarr
 */

    let grarr = function (params = {}) {

			let {X0, X1, DX, PX, x0, x1, dx, px,
					Y0, Y1, DY, PY, y0, y1, dy, py} = gratiparams(params)
					
			let bigmer = (params.bigmer !== undefined) ? params.bigmer : 1
			let bigpar = (params.bigpar !== undefined) ? params.bigpar : 1
			
			let merfn = (params.merfn !== undefined) ? params.merfn : (a,b,d) => d3.range(Math.ceil(a / d) * d, b, d)
			let parfn = (params.parfn !== undefined) ? params.parfn : (a,b,d) => d3.range(Math.ceil(a / d) * d, b, d)

			let X = graticuleX (Y0, Y1, PY),		// get X for Y with precision PY
					Y = graticuleY (X0, X1, PX)

			let x = graticuleX (y0, y1, py),		// get y for x with precision py
					y = graticuleY (x0, x1, px)


			function graticuleX (y0, y1, dy) {
				let y = d3.range(y0, y1 - epsilon, dy).concat(y1) // by intervals and close
				return function (x) { return y.map(function (y) { return [x, y] }) }
			}

			function graticuleY (x0, x1, dx) {
				let x = d3.range(x0, x1 - epsilon, dx).concat(x1)
				return function (y) { return x.map(function (x) { return [x, y] }) }
			}

			let mm3 = function (_X, _X0, _X1, _DX, _x, _x0, _x1, _dx, _epsilon) {
				
					let _mm1 = merfn(_X0, _X1, _DX) // long mers
					
					let _mm2 = merfn(_x0, _x1, _dx) // short mers

					let _mm3 = ((bigmer) ? [..._mm1, ..._mm2] : [..._mm2])	// meridian ?
									.sort((a, b) => a - b)
									.filter((elem, pos, arr) => arr.indexOf(elem) == pos)

					let type = "MultiLineString",
							coordinates = _mm3.map(d => (Math.abs(d % _DX) > _epsilon) ? _x(d) : _X(d)),
							gj = {type, coordinates}
					return gj
					
			}
			let mms = mm3(X, X0, X1, DX, x, x0, x1, dx, epsilon)		// _e_
			let bmm = {			// long meridians
					type: "MultiLineString",
					coordinates: merfn(X0, X1, DX)
			}
			let mm = {			// meridians
					type: "MultiLineString",
					coordinates: merfn(x0, x1, dx)
			}
			
			
			let ppBig = parfn(Y0, Y1, DY)
			let ppShort = parfn(y0, y1 + epsilon, dy)
			let ppAll = [...ppBig, ...ppShort]
								.sort((a, b) => a - b)
								.filter((elem, pos, arr) => arr.indexOf(elem) === pos)
			let pps = {type: "MultiLineString",
					coordinates: ppAll.map(d => (Math.abs(d % DY) > epsilon) ? y(d) : Y(d))}
			let bp = {type: "MultiLineString",coordinates: ppBig}// long parallel
			let pp = {type: "MultiLineString",coordinates: ppShort}// parallels
			
			
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
			if (1 && 1) console.log('m.graticule.gvertices:params', params)
			
      let g = grarr(params)
      let mersCoords = g.mms.coordinates	// with y delta, precision
      let parsCoords = g.pps.coordinates	// with x delta, precision


			let {X0, X1, DX, PX, x0, x1, dx, px,
					Y0, Y1, DY, PY, y0, y1, dy, py} = gratiparams(params)			
			
			let ry = dy / py			// step to precision ratio in meridiam
			
			if (0 && 1) console.log('m.graticule.gvertiecs:mersCoords', mersCoords)
			if (0 && 1) console.log('m.graticule.gvertiecs:parsCoords', parsCoords)
			
			
      let mersq = mersCoords.length // 	[-90, 90]		[dy,py]
      let parsq = parsCoords.length //  [-180, 180] [dx,px]
			
      let index = tidx(mersq, parsq) // 12, 7

			if (1 && 1) console.log('m.graticule.gvertiecs:q', mersq, parsq)
			
      let m0 = 0 // 0
      let mn = mersq // 12
      let p0 = 0 // 0
      let pn = parsq // 6

      let vertices = []
      for (let i = m0; i < mn; i++) { // meridians
				for (let j = p0; j < pn ; j++) { // parallels   exclude upper lat
				
          let i0 = i							// mer index
          let i1 = (i + 1) % mersq 	// return to origin

          let j0 = j							// par index
          let j1 = (j + 1) 				//

					if (mersCoords[i0][j0] === undefined) console.log("coord", i0, j0, "undefined")
					if (mersCoords[i0][j1] === undefined) console.log("coord", i0, j1, "undefined")
					if (mersCoords[i1][j0] === undefined) console.log("coord", i1, j0, "undefined")
					if (mersCoords[i1][j1] === undefined) console.log("coord", i1, j1, "undefined")
					
          vertices[index(i0, j0)] = mersCoords[i0][j0 * ry] // [0,0]	revert precision to step
          vertices[index(i0, j1)] = mersCoords[i0][j1 * ry]	// [0,1]
					
          vertices[index(i1, j0)] = mersCoords[i1][j0 * ry]	// [1,0]
          vertices[index(i1, j1)] = mersCoords[i1][j1 * ry]	// [1,1]
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
        for (let j = p0; j < pn - 1; j++) { // exclude upper segement
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
