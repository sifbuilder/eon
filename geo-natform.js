/*******************************************
 *    @geoNatform
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.geoNatform = global.geoNatform || {})))
}(this, function (exports) {
  'use strict'

  let geoNatform = function geoNatform (__mapper = {}) {

		let f = __mapper('props')(),
      mnat = __mapper('xs').m('nat')

    let state = {},
      scale = [1, 1, 1],
      rotate = [0, 0, 0],
      translate = [0, 0, 0],
      lens = [0, 1, Infinity]

    const cos = Math.cos, sin = Math.sin,
      neg = x => x < 0 || (x === 0 && (1 / x < 0)),
      pos = x => x > 0 || (x === 0 && (1 / x > 0)),
      radians = Math.PI / 180,
      degrees = 180 / Math.PI,
      tau = 2 * Math.PI
      
    let cache = {} // points, form
      
      
    /* **************************
     *        @rador : seg5 unit circle rador
     *          m.snap.snap (dax form => rador)
     */
    let rador = function (form) { // polarCoords
      let pts = []
      let t = 0
      let maxRadio = 0
      
      const {m1, m2, n1, n2, n3, a, b, v0, v1, seg5} = form
      const bform = {m1, m2, n1, n2, n3, a, b, v0, v1, seg5}
        
      if (f.isSame(bform, cache.bform)) {
        
        pts = cache.points
        
      } else {

        const angUnit = tau / seg5 // dots per period

        let angi = (form.angi) ? form.angi : (i, ang) => (i * ang) - Math.PI
        let abs = (form.abs) ? form.abs : Math.abs

        for (let i = 0; i < seg5; i++) {
          let ang = angi(i, angUnit * v1) // [0,360] => [-180,180] // v1

          let t1 = m1 * ang / 4
          let t2 = m2 * ang / 4

          t = Math.pow(

            Math.pow(abs(Math.cos(t1) / a), n2) // n2
                     +
                     Math.pow(abs(Math.sin(t2) / b), n3), // n3

            -1 / n1) // n1

          t = t * (1 + v0 * i)

          if (t > maxRadio) maxRadio = t
          pts.push(t)
        }

        let radUnit = 1 / maxRadio //  Math.SQRT1_2 / maxRadio  normalize
        pts = pts.map(d => d * radUnit)

        cache.bform = bform
        cache.points = pts
      }

      return pts // dots in path: [0,...,seg5] => [0,1]
    }




    /* **************************
     *        @radorm
     *            g.natform
     */
    function radorm (form, s1extent = [-1, 1]) { //  radorm: [-1,1) => [-1,1]
    
      let radorPts = rador(form) //  rador:  [-1,1] => [0,seg5)
      let s1range = [0, radorPts.length - 1] // [0, seg5]

      let s2extent = d3.range(0, radorPts.length - 1) // [0,...,seg5]
      let s2range = radorPts // mormed form

      let s1 = d3.scaleLinear().domain(s1extent).range(s1range) // [-1,1] => [0,seg5]
      let s2 = d3.scaleLinear().domain(s2extent).range(s2range) // [0,..,seg5] => rador

      return p => s2(s1(p)) //  [0,1) =s1=> [0,seg5) =rador=> [0,1]
      
    }
    
    /* *********************
   *    @natVertex
   *      called by g.natVertex.pointStream to build nat conform point stream
   *      calls m.nat.radorm
   */
    let natVertex = function (form) { // getVertex
if (1 && 1) console.log("g.nat.natVertex form", form)      
      let nformed = mnat.natNform(form) // natNform

      let unfeld = Object.values(nformed)

      let dominos = unfeld.map(d => d.dom3) // [ [-180,180], [-180,180], [-90,90], [-90,90] ]

      let radions = unfeld.map((d, i) => radorm(d, dominos[i])) // radorm
      let rayscale = unfeld.map((d, i) => p => radions[i](p* degrees)) // rayscale on degres

      let scale = [1, 1, 1], rotation = [0, 0, 0], location = [0, 0, 0], rad, wr, wd
      if (nformed) rad = scale = unfeld.map(dax => dax.ra2)
      if (nformed) wd = rotation = unfeld.map(dax => (dax.w4 || 0 )) //  yfase

      let vertex = function (lambdaD, phiD = 0, radio = 1) { // spherical degrees
      
        let ppD = []      // pars in degrees
          ppD[0] = lambdaD + wd[0]
          ppD[1] = lambdaD + wd[1]
          ppD[2] = phiD    + (wd[2] || 0)
          ppD[3] = phiD    + (wd[3] || 0)
          
        let ppR = ppD.map( d => d * radians)  // pars in radians per dax
        let rs = unfeld.map( (d,i) => rayscale[i](ppR[i]) || 1)  // radorn on dax par
        let rr = unfeld.map( (d, i) => d.fn0(...ppR, ...rs) ) // 
        
        let point = unfeld.map( (d, i) => radio * rad[i] * rr[i])

        let projpnt = (point[2] !== undefined) ? 
              [ point[0], point[1], point[2] ] :    // 3D
              [ point[0], point[1] ]                // 2D
        return projpnt // [x,y,z]
      }

      return vertex
    }
      
      
      
      
      
      
		// 		pointStream
    let pointStream = function (prjdef) {
			
      let natPoint = natVertex(prjdef.form) // m.nat.natVertex (a,b,c) => [a,b,c]
				
      let stream = function (lambda, phi, radio = 1) {
        
        this.stream.point(...natPoint(lambda, phi, radio))
      }

      return stream
    }


		// 		natprofion
    let natprofion = prjdef => {		// projection:natPoint, form:{x,y,z}

      let geoTrans = d3.geoTransform({
					point: pointStream(prjdef)})

      let geoProj = p => geoTrans(p)

					geoProj.stream = s => geoTrans.stream(s)

      return geoProj

    }

    /****************************
   *    @enty
   */
    let enty = function (prjdef = {}) {
			
      let m = natprofion(prjdef)

      return m
    }

    return enty
  }

  exports.geoNatform = geoNatform
}))
