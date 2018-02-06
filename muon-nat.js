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
      mlacer = __mapper('xs').m('lacer'),
      mgraticule = __mapper('xs').m('graticule'),
      mprofier = __mapper('xs').m('profier'),
      mproj3ct = __mapper('xs').m('proj3ct')

		let cache = {} // points, form

    const cos = Math.cos, sin = Math.sin
    const neg = x => x < 0 || (x === 0 && (1 / x < 0))
    const pos = x => x > 0 || (x === 0 && (1 / x > 0))
    const radians = Math.PI / 180
    const tau = 2 * Math.PI


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

        let radUnit = 1 / maxRadio //  Math.SQRT1_2 / maxRadio 	normalize
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
		
			let formm = nform(form)					// nform
		
			if (0 && 1) console.log("m.nat.natform:formm", formm) 

			let formmvv = Object.values(formm)
				
			let doms = formmvv.map(d => d.dom3)
			// doms = [ [-180,180], [-180,180], [0,360], [0,360] ]				// _e_	
			let radions = Object.values(formm).map((v, i) => radorm(v, doms[i]))
			
			let radioform = Object.values(formm).map((d, i) => p => radions[i](p))


      let scale = [1, 1, 1], rotation = [0, 0, 0], location = [0, 0, 0]
      if (formm) scale = formmvv.map(dim => dim.ra2)
			if (formm) rotation = formmvv.map(dim => (dim.w4 || 0 + dim.fas8 || 0) * radians)
      let coForm = {location, scale, rotation}

			let rad = scale
			let w = rotation

      let vertex = function (l, p, radio = 1) { // spherical degrees [0,360]


        let lambda = l * radians
        let phi = p * radians


				if (0 && 1) console.log("r", l, p, r0,r1,r2)
	

				let exps = formmvv.map(d => d.exp9)

				
				let ff = []
					ff[0] = formmvv[0].fn0(lambda + w[0])
					ff[1] = formmvv[1].fn0(lambda + w[1])
					ff[2] = (radioform[2] !== undefined) ? formmvv[2].fn0(phi + w[2]) : 1  
					ff[3] = (radioform[3] !== undefined) ? formmvv[3].fn0(phi + w[3]) : 1

				
				let rs = []
					rs[0] = (radioform[0] !== undefined) ? radioform[0](l) : 1
					rs[1] = (radioform[1] !== undefined) ? radioform[1](l) : 1
					rs[2] = (radioform[2] !== undefined) ? radioform[2](p) : 1
					rs[3] = (radioform[3] !== undefined) ? radioform[3](p) : 1

				let point = formmvv.map( (d,i) => {
					let r
					if (i === 0) r = rad[0] * ff[0] * ff[2] * rs[0]**exps[0][0] * rs[1]**exps[0][1] * rs[2]**exps[0][2] * rs[3]**exps[0][3]
					if (i === 1) r = rad[1] * ff[1] * ff[2] * rs[0]**exps[1][0] * rs[1]**exps[1][1] * rs[2]**exps[1][2] * rs[3]**exps[1][3]
					if (i === 2) r = rad[2] * ff[3] * 				rs[0]**exps[2][0] * rs[1]**exps[2][1] * rs[2]**exps[2][2] * rs[3]**exps[2][3]
					if (i === 3) r = rad[3] * ff[2] * 				rs[0]**exps[3][0] * rs[1]**exps[3][1] * rs[2]**exps[3][2] * rs[3]**exps[3][3]					
					return r
				})


        return [ point[0], point[1], point[2] ] // [x,y,z]
      }

			return vertex
    }

    /**********************
   *    @nform
   *      compleate form for natform
   */
    let nform = function (form, nformed = {}) {
			
			let defs = {"v0":0,"v1":1,"ra2": 120,"w4":0,"seg5":360,"pa6":0,"pb7":-1,}	// defs
			
      if (form &&	typeof form === 'object' &&					// {obj}
            (form.x === undefined && form.y === undefined && form.z === undefined)) {
							
							
					let fas8x = (form.fas8 !== undefined) ? form.fas8 : 0
					
					nformed.x = Object.assign({}, defs, form, {fas8: fas8x}) // fas8 def 0
					nformed.y = Object.assign({}, defs, (form.y || form), {fas8: fas8x - 90})
				
      } else if (form && typeof form === 'object' && // {x,y}
            (form.x !== undefined && form.y !== undefined)) {
							
					let fas8x = (form.x.fas8 !== undefined) ? form.x.fas8 : 0
					nformed.x = Object.assign({}, defs, form.x, {fas8: fas8x})
					
					let fas8y = (form.y.fas8 !== undefined) ? form.y.fas8 : fas8x-90
					nformed.y = Object.assign({}, defs, form.y, {fas8: fas8y})
					
					if (form.z !== undefined && form.r !== undefined) {	// {x,y,z,r}
						
						let fas8z = (form.z.fas8 !== undefined) ? form.z.fas8 : 0
						nformed.z = Object.assign({}, defs, form.z, {fas8: fas8z})
						
						nformed.r = form.r					
						
					} else if (form.z !== undefined && form.r === undefined) {	// {x,y,z}
						
						let fas8z = (form.z.fas8z !== undefined) ? form.z.fas8 : 0
						nformed.z = Object.assign({}, defs, form.z, {fas8: fas8z})
						
						nformed.r = Object.assign({}, defs, form.z, 
							{fas8: fas8z - 90,
								exp9: [ 0, 0, 0, 1 ],
							}) // fas8
					}
					
      } else if (form && typeof form === 'object' &&				// form:{x:obj}
            (form.x !== undefined && form.y === undefined)) {
							
						let fas8x = (form.x.fas8 !== undefined) ? form.x.fas8 : 0
						nformed.x = Object.assign({}, defs, form.x, {fas8: fas8x})
						
						nformed.y = Object.assign({}, defs, (form.y || form.x), {fas8: fas8x - 90}) // fas8
						
						if (form.z !== undefined && form.r !== undefined) {	// {x,y,z,r}
							
							nformed.z = form.z
							nformed.r = form.r					
							
						} else if (form.z !== undefined && form.r === undefined) {	// {x,y,z}
							
							let fas8z = (form.z.fas8 !== undefined) ? form.z.fas8 : 0
							nformed.z = Object.assign({}, defs, form.z, {fas8: fas8z})
							
							nformed.r = Object.assign({}, defs, form.z, {fas8: fas8z - 90}) // fas8
						}
						
      } else if (form && Array.isArray(form)) {										// [x,y]
					
						nformed.x = form[0]
						nformed.y = form[1] || Object.assign({}, defs, form[0], {fas8: form.fas8 - 90})
						
						if (form[2] !== undefined && form[3] !== undefined) {	// [x,y,z,r]
							
							nformed.z = form[2]
							nformed.r = form[3] 					
							
						} else if (form[2] !== undefined && form[3] === undefined) {	// [x,y,z]
							
							let fas8 = (form[2].fas8 !== undefined) ? form[2].fas8 : 0
							nformed.z = Object.assign({}, defs, form[2], {fas8: fas8})
							nformed.r = Object.assign({}, defs, form[2], {fas8: form[2].fas8 - 90}) // fas8
						}						
				
      }
			
			let formkeys = Object.keys(nformed)
			for (let i=0; i<formkeys.length; i++) {
				let key = formkeys[i]
				let form = nformed[key]
				if (form.fn0 === undefined) form.fn0 = Math.cos	// fn0 defs to cos on fas8
			}
			for (let i=0; i<formkeys.length; i++) {
				let key = formkeys[i]
				let form = nformed[key]
				if (form.dom3 === undefined) form.dom3 = [-180,180]	// dom3 defs to [-180,180] 
			}
			for (let i=0; i<formkeys.length; i++) {			// ext9 defs to spheric exps
				let key = formkeys[i]
				let form = nformed[key]
				if (i==0 && form.exp9 === undefined) form.exp9 = [1,0,1,0]
				if (i==1 && form.exp9 === undefined) form.exp9 = [0,1,1,0]
				if (i==2 && form.exp9 === undefined) form.exp9 = [0,0,0,1]
				if (i==3 && form.exp9 === undefined) form.exp9 = [0,0,1,0]
			}
			
      return nformed
    }

   /**********************
     *    @natPolygon
     *       coordinates = Array.of(__mapper("xs").m("nat").natPolygon(p.form))
     */
    let natPolygon = function (form) {	

				let formm = nform(form)					// NFORM		
				let gj
		
				if (0 && 1) console.log("mnat:formm", formm)	
					
				if (Object.keys(formm).length > 2) { 
						let dx =  360 / formm.x.seg5
						let dy =  360 / formm.y.seg5
				
				
						let graticule = {

							'frame': [ [ [-180, 180, dx, dx], [-90, 90, dy, dy] ],
												[ [-180, 180, dx, dx], [-90, 90, dy, dy] ] 
											]
							}
				
						let conform = {'projection': 'natform', 'form': formm}		
				

						let edges = mgraticule.gedges(graticule)
						gj = {
								type: 'MultiLineString', 
								coordinates: edges
						}
			

						let projdef = conform
						
							let projection = mprofier.protion(projdef)
							let projer = json => mproj3ct(json, projection)

						gj = projer(gj)
				
						if (0 && 1) console.log("mnat:gj", gj)

				} else {
					
						if (0 && 1) console.log('m.nat natPolygon formm', formm)
							
						let dimstreams = Object.keys(formm)

						dimstreams = dimstreams
							.map(d => rador(formm[d])) 	// RADOR of dim d

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
							}))		// dim x cartesian

						let streams = dimstreams		// streams
							.map((d, i) => {
								let dim = Object.keys(formm)[i]
								let pa6 = formm[dim].pa6
								let pb7 = formm[dim].pb7
								return f.streamRange(d, pa6, pb7)
							})
							.map(d => [...d, d[0]]) // close polygon

						let ring = mlacer.slide(streams, 'max')

						gj = Array.of(ring)
					}
						
						return gj
    }		
    /***************************
     *        @enty
     */
    let enty = function () {}

    enty.natPolygon = natPolygon
    enty.natform	 = natform
    enty.nform = nform

    return enty
  }

  exports.muonNat = muonNat
}))
