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
    let f = __mapper('props')(),
      mgeoj = __mapper('xs').m('geoj')
      

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
 *
 *      lattice.[ Xx, Yy ]
 *      frame.[ [X,Y], [x,y] ]   X:[X0,X1,DX,PX]
 *      frame.[ [ Xx, Yy ] ]    Xx:[X0,X1,DX,PX]
 *      [ Xx, Yy ]
 */

    let gratiparams = function (params = {}, rp = {}) {
      let X0, X1, DX, PX, x0, x1, dx, px,
        Y0, Y1, DY, PY, y0, y1, dy, py

      let X_extent, Y_extent, x_extent, y_extent
      
      if (params.lattice !== undefined) {							// lattice
      // lattice: [x_extent, y_extent]
      // eg. [ [180, 55], [90, 2.5] ]
      
        let lattice = params.lattice
      
        x_extent = lattice[0] // x major::minor
        y_extent = lattice[1] // y major::minor

        if (Array.isArray(x_extent[0])) {
          // eg. [ [ [-40,180], 55], [] ] 
          X1 = x_extent[0][1] // x_extentMajor 	eg. 180
          X0 = x_extent[0][0]
        } else {
          // eg. [ [ 180, 55], [] ] 
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
        DY = y_extent[1] // y_stepMajor		eg. 360
        dy = DY						// y_stepMinor		eg. 10
        PY = DY						// y_precision		eg. 2.5
        py = PY

        rp = {X0,X1,DX,PX,x0,x1,dx,px,Y0,Y1,DY,PY,y0,y1,dy,py}        
        
      } else if (params.frame !== undefined) {		// frame
        // frame: [ [X_extent, Y_extent] , [x_extent, y_extent] ]
        
        let graticule = params.frame // major, minor
        
        if (graticule.length === 2) {
        // eg. [ [ [-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ],
            // [	[-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ] ]
        
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

        rp = {X0,X1,DX,PX,x0,x1,dx,px,Y0,Y1,DY,PY,y0,y1,dy,py}
        
      } else if (Array.isArray(params)) {		// default to frame 
      // eg. [ [-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ]
        let p = {frame: params}
        rp = gratiparams(p)
      }

      return rp
      
    }

    /* *******************
 *        grarr
 */

    let grarr = function (params = {}) {
      
      let {X0, X1, DX, PX, x0, x1, dx, px,
        Y0, Y1, DY, PY, y0, y1, dy, py} = gratiparams(params)
       
        
      let bigmer = (params.bigmer !== undefined) ? params.bigmer : 1
      let bigpar = (params.bigpar !== undefined) ? params.bigpar : 1

      let merfn = (params.merfn !== undefined) ? params.merfn : (a, b, d) => d3.range(Math.ceil(a / d) * d, b, d)
      let parfn = (params.parfn !== undefined) ? params.parfn : (a, b, d) => d3.range(Math.ceil(a / d) * d, b, d)

      let X = graticuleX(Y0, Y1, PY),		// get X for Y with precision PY
        Y = graticuleY(X0, X1, PX)

      let x = graticuleX(y0, y1, py),		// get y for x with precision py
        y = graticuleY(x0, x1, px)

      function graticuleX (y0, y1, dy) {
        let y = d3.range(y0, y1 - epsilon, dy).concat(y1) // by intervals and close
        return x => y.map(y => [x, y])
      }

      function graticuleY (x0, x1, dx) {
        let x = d3.range(x0, x1 - epsilon, dx).concat(x1)
        return y => x.map(x => [x, y])
      }

      let mmBig = merfn(X0, X1, DX) // long mers
      let mmShort = merfn(x0, x1, dx) // short mers
      let mmAll = merge(mmBig, mmShort)

         
      let ppBig = parfn(Y0, Y1, DY)
      let ppShort = parfn(y0, y1 + epsilon, dy)
      let ppAll = merge(ppBig, ppShort)     
      
      
      
      let mms = {
        type: 'MultiLineString',
        coordinates: mmAll.map(d => (Math.abs(d % DX) > epsilon) ? x(d) : X(d))
      }
      if (!mgeoj.isValid(mms)) {
          console.error("mms not valid")
      }


      let pps = {
        type: 'MultiLineString',
        coordinates: ppAll.map(d => (Math.abs(d % DY) > epsilon) ? y(d) : Y(d))
      }
      if (!mgeoj.isValid(pps)) {
          console.error("pps not valid")
      }

        
      let ret = {mms, pps}

      return ret
    }
    

    /* *******************
 *        equator
 */
    let equator = function (params) {
    
      let p = params || [ [ [-180, 180, 360, 1], [-90, 90, 360, 1] ] ] // [xMm, yMm]
      let g = grarr(p)
      let coords = g.pps.coordinates[0] // first and only ring
      
      let gj = {
        type: 'Feature',
        geometry: {type: 'LineString',coordinates: coords,},
        properties: {mgraticule:'equator'}
      }   
      if (!mgeoj.isValid(gj)) console.error("gj not valid")

      return gj
    }  
    
    /* *******************
 *        gedges
 */
    let gedges = function (params = {}) {
      let g = grarr(params)
      let mersCoords = g.mms.coordinates
      let parsCoords = g.pps.coordinates

      let coords = [].concat(mersCoords).concat(parsCoords)
      
      let gj = {
        type: 'Feature',
        geometry: {type: 'MultiLineString',coordinates: coords,},
        properties: {mgraticule:'gedges'}
      }   
      if (!mgeoj.isValid(gj)) console.error("gj not valid")

      return gj
    }
    
    /* *******************
 *        medges
 */
    let medges = function (params = {}) {
      let g = grarr(params)
      let mersCoords = g.mms.coordinates
      let parsCoords = g.pps.coordinates

      let coords = [].concat(mersCoords)
      
      let gj = {
        type: 'Feature',
        geometry: {type: 'MultiLineString',coordinates: coords,},
        properties: {mgraticule:'gedges'}
      }   
      if (!mgeoj.isValid(gj)) console.error("gj not valid")

      return gj
    }
    
    /* *******************
 *        pedges
 */
    let pedges = function (params = {}) {
      let g = grarr(params)
      let mersCoords = g.mms.coordinates
      let parsCoords = g.pps.coordinates

      let coords = [].concat(parsCoords)
      
      let gj = {
        type: 'Feature',
        geometry: {type: 'MultiLineString',coordinates: coords,},
        properties: {mgraticule:'gedges'}
      }   
      if (!mgeoj.isValid(gj)) console.error("gj not valid")

      return gj
    }    
    /* *********************
     *    @gvertices

     */
    let gvertices = function (params = {}) {

      let g = grarr(params)
      let mersCoords = g.mms.coordinates	// with y delta, precision
      let parsCoords = g.pps.coordinates	// with x delta, precision

      let {X0, X1, DX, PX, x0, x1, dx, px,
        Y0, Y1, DY, PY, y0, y1, dy, py} = gratiparams(params)

      let ry = dy / py			// step to precision ratio in meridiam

      let mersq = mersCoords.length // 	[-90, 90]		[dy,py]
      let parsq = parsCoords.length //  [-180, 180] [dx,px]

      let index = tidx(mersq, parsq) // 12, 7

      let m0 = 0 // 0
      let mn = mersq // 12
      let p0 = 0 // 0
      let pn = parsq // 6

      let vertices = []
      for (let i = m0; i < mn; i++) { // meridians
        for (let j = p0; j < pn; j++) { // parallels   exclude upper lat
          let i0 = i							// mer index
          let i1 = (i + 1) % mersq 	// return to origin

          let j0 = j							// par index
          let j1 = (j + 1) 				//

          vertices[index(i0, j0)] = mersCoords[i0][j0 * ry] // [0,0]	revert precision to step
          vertices[index(i0, j1)] = mersCoords[i0][j1 * ry]	// [0,1]

          vertices[index(i1, j0)] = mersCoords[i1][j0 * ry]	// [1,0]
          vertices[index(i1, j1)] = mersCoords[i1][j1 * ry]	// [1,1]
        }
      }

      // return vertices
      return {
        type: 'Feature',
        geometry: {type: 'LineString',coordinates: vertices},
        properties: {}
      }      
      
    }

    /* *********************
     *    @gfaces
     */
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
        for (let j = p0; j < pn - 1; j++) { // exclude upper segement
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

    /* *****************
 *        merge
 */
    let merge = function (major, minor, ret = {}) {
      ret = [...major, ...minor]
        .sort((a, b) => a - b)
        .filter((elem, pos, arr) => arr.indexOf(elem) == pos)

      return ret
    }


    /* *****************
 *        enty
 */
    let enty = function () {}

    enty.grarr = grarr


    enty.gedges = gedges
    enty.medges = medges
    enty.pedges = pedges
    enty.gfaces = gfaces
    enty.gvertices = gvertices
    enty.equator = equator


    return enty
  }

  exports.muonGraticule = muonGraticule
}))
