/***************************
 *        @muonNat
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonNat = global.muonNat || {})))
}(this, function (exports) {
  'use strict'

  let muonNat = function muonNat (__mapper = {}) {
		
    let f = __mapper('props')(),
      mlacer = __mapper('xs').m('lacer')

		let cache = {} // points, form

    const cos = Math.cos, sin = Math.sin
    const neg = x => x < 0 || (x === 0 && (1 / x < 0))
    const pos = x => x > 0 || (x === 0 && (1 / x > 0))
    const radians = Math.PI / 180
    const tau = 2 * Math.PI

    function reset () {
      cache = cacheStream = null
      return projection
    }

    /* **************************
     *        @rador : seg5 unit circle rador
     *          m.snap.snap (dim form => rador)
     */
    let rador = function (forml) {		// polarCoords
		
      let pts = []
      let t = 0
      let maxRadio = 0

      if (0 && 1) console.log('m.rador.rador forml', forml, cache.forml)

      if (f.isSame(forml, cache.forml)) {
        pts = cache.points

        if (0 && 1) console.log('m.rador.rador cashed')
      } else {
        const {m1, m2, n1, n2, n3, a, b, v0, v1, seg5} = forml
        const angUnit = tau / seg5 // dots per period

        let angi = (forml.angi) ? forml.angi : (i, ang) => (i * ang) - Math.PI
        let abs = (forml.abs) ? forml.abs : Math.abs

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

        let radUnit = 1 / maxRadio // * Math.SQRT1_2 / maxRadio 	normalize
        pts = pts.map(d => d * radUnit)

        cache.forml = forml
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
   *    @natform
   *      called by g.natform.pointStream to build nat conform point stream
   *      callls m.nat.radorm
   */
    let natform = function (form) {		// getVertex
		
			let formdims = Object.values(form)
			
			if (0 && 1) console.log("m.nat.natform:form", form) 
	

			let extents = [
				[-180,180], [-180,180], [-180,180], [-180,180]  // [-180,180], [-180,180], [-180,180]
			]


			// let extents = formdims.map((d, i) => {
					// let g3 = (d.g3 !== undefined) ? f.a(d.g3) : []

					// let a =  (g3[g3.length-1] !== undefined) ? g3[g3.length-1] : -180
					// let b = (a + 360)
					// return [a,b]
			// })

			
			let radions = formdims.map((d, i) => radorm(d, extents[i]))
			let radioform = formdims.map((d, i) => p => radions[i](p))


      let scale = [1, 1, 1], rotation = [0, 0, 0], location = [0, 0, 0]
      if (form) scale = Object.values(form).map(dim => dim.ra2)
			if (form) rotation = Object.values(form).map(dim => (dim.w4 || 0 + dim.fas8 || 0) * radians)
      let coForm = {location, scale, rotation}

			let rad = scale
			let w = rotation

      let vertex = function (l, p, radio = 1) { // spherical degrees [0,360]


        let lambda = l * radians
        let phi = p * radians

				let fn = Math.cos

				let r0 = radioform[0](l) * fn(lambda + w[0])
				let r1 = radioform[1](l) * fn(lambda + w[1])
				let r2 = radioform[2](p) * fn(phi + w[2])
				let r3 = radioform[3](p) * fn(phi + w[3])

				if (0 && 1) console.log("r", l, p, r0,r1,r2)
				let exps = [ [1,0,1,0 ], [0,1,1,0], [0,0,0,1] ]

				exps = exps.map( (d,i) => d.map( (u,j) => {
					let formi = formdims[i]
					let ex = (formi.g3 !== undefined &&
						Array.isArray(formi.g3) &&
						formi.g3[j] !== undefined) ? formi.g3[j] : exps[i][j]
					return ex
					}))


				// square, square,circle, r2,r2, extent [-180,180], [-180,180], [0,360]  		// once
				// square, square,square, r2,r2, extent [-180,180], [-180,180], [-180,180]			// cube

				// let x = rad[0] * r0 * cos(lambda + w[0]) * cos(phi + w[2]) * r2
				// let y = rad[1] * r1 * sin(lambda + w[1]) * cos(phi + w[2]) * r2
				// let z = rad[2] * r2	* r2  					 * sin(phi + w[2])
				let x = rad[0] * r0**exps[0][0] * r1**exps[0][1] * r2**exps[0][2] * r3**exps[0][3]
				let y = rad[1] * r0**exps[1][0] * r1**exps[1][1] * r2**exps[1][2] * r3**exps[1][3]
				let z = rad[2] * r0**exps[2][0] * r1**exps[2][1] * r2**exps[2][2] * r3**exps[2][3]



        return [x, y, z]
      }

			return vertex
    }


 
    /**********************
   *    @nform
   *      compleate form for natform
   */
    let nform = function (form, nform = {}) {
			
			
      if (form &&	typeof form === 'object' &&					// {obj}
            (form.x === undefined && form.y === undefined && form.z === undefined)) {
							
					let fas8x = (form.fas8 !== undefined) ? form.fas8 : 0
					nform.x = Object.assign({}, form, {fas8: fas8x}) // fas8 def 0
					
					nform.y = Object.assign({}, (form.y || form), {fas8: fas8x - 90})
				
      } else if (form && typeof form === 'object' && // {x,y}
            (form.x !== undefined && form.y !== undefined)) {
							
					let fas8x = (form.x.fas8 !== undefined) ? form.x.fas8 : 0
					nform.x = Object.assign({}, form.x, {fas8: fas8x})
					
					let fas8y = (form.y.fas8 !== undefined) ? form.y.fas8 : fas8x-90
					nform.y = Object.assign({}, form.y, {fas8: fas8y})
					
					if (form.z !== undefined && form.r !== undefined) {	// {x,y,z,r}
						
						let fas8z = (form.z.fas8 !== undefined) ? form.z.fas8 : 0
						nform.z = Object.assign({}, form.z, {fas8: fas8z})
						
						nform.r = form.r					
						
					} else if (form.z !== undefined && form.r === undefined) {	// {x,y,z}
						
						let fas8z = (form.z.fas8z !== undefined) ? form.z.fas8 : 0
						nform.z = Object.assign({}, form.z, {fas8: fas8z})
						
						nform.r = Object.assign({}, form.z, {fas8: fas8z - 90}) // fas8
					}
					
      } else if (form && typeof form === 'object' &&				// form:{x:obj}
            (form.x !== undefined && form.y === undefined)) {
							
						let fas8x = (form.x.fas8 !== undefined) ? form.x.fas8 : 0
						nform.x = Object.assign({}, form.x, {fas8: fas8x})
						
						nform.y = Object.assign({}, (form.y || form.x), {fas8: fas8x - 90}) // fas8
						
						if (form.z !== undefined && form.r !== undefined) {	// {x,y,z,r}
							
							nform.z = form.z
							nform.r = form.r					
							
						} else if (form.z !== undefined && form.r === undefined) {	// {x,y,z}
							
							let fas8z = (form.z.fas8 !== undefined) ? form.z.fas8 : 0
							nform.z = Object.assign({}, form.z, {fas8: fas8z})
							
							nform.r = Object.assign({}, form.z, {fas8: fas8z - 90}) // fas8
						}
						
      } else if (form && Array.isArray(form)) {										// [x,y]
					
						nform.x = form[0]
						nform.y = form[1] || Object.assign({}, form[0], {fas8: form.fas8 - 90})
						
						if (form[3] !== undefined && form[4] !== undefined) {	// [x,y,z,r]
							
							nform.z = form[3]
							nform.r = form[4] 					
							
						} else if (form[3] !== undefined && form[4] === undefined) {	// [x,y,z]
							
							let fas8 = (form[3].fas8 !== undefined) ? form[3].fas8 : 0
							nform.z = Object.assign({}, form[3], {fas8: fas8})
							nform.r = Object.assign({}, form[3], {fas8: form[3].fas8 - 90}) // fas8
						}						
				
      }
			
			let formkeys = Object.keys(nform)
			for (let i=0; i<formkeys.length; i++) {
				let key = formkeys[i]
				let form = nform[key]
				if (form.f0 === undefined) form.f0 = Math.cos	// def to cos on fas8
				
			}
			
			
			if (1 && 1) console.log("nform", nform)
			
      return nform
    }


   /**********************
     *    @natPolygon
     *       coordinates = Array.of(__mapper("xs").m("nat").natPolygon(p.form))
     */
    let natPolygon = function (form) {

			let formm = nform(form)					// rador
			
      if (0 && 1) console.log('m.nat natPolygon formm', formm)
				
      let dimstreams = Object.keys(formm)

      dimstreams = dimstreams
        .map(d => rador(formm[d])) // rador of dim d

      dimstreams = dimstreams
        .map((d, i) => d.map(p => p * formm[ Object.keys(formm)[i]].ra2)) // size

      dimstreams = dimstreams
        .map((d, i) => d.map((p, j) => { // rotation
          let formdim = formm[Object.keys(formm)[i]]
          let angUnit = tau / d.length
          let refAng = (formdim.w4 + formdim.fas8) * radians
          let v1 = formdim.v1
          let ang = ((j * angUnit * v1) - refAng + tau) % tau // j point
          let r = p * Math.cos(ang) // each point
          return r
        }))

      let streams = dimstreams		// streams
        .map((d, i) => {
          let dim = Object.keys(formm)[i]
          let pa6 = formm[dim].pa6
          let pb7 = formm[dim].pb7
          return f.streamRange(d, pa6, pb7)
        })
        .map(d => [...d, d[0]]) // close polygon

      let ring = mlacer.slide(streams, 'max')				//

      return Array.of(ring)
    }		
    /***************************
     *        @enty
     */
    let enty = function () {}

    enty.natPolygon = natPolygon //
    enty.nform = nform //
    enty.natform	 = natform

    return enty
  }

  exports.muonNat = muonNat
}))
