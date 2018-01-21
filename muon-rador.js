/***************************
 *        @muonRador
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonRador = global.muonRador || {})))
}(this, function (exports) {
  'use strict'

  let muonRador = function muonRador (__mapper = {}) {
		
		 let f = __mapper('props')()
		
		let cachePoints,
      cacheForm


    const cos = Math.cos, sin = Math.sin
    const neg = x => x < 0 || (x === 0 && (1 / x < 0))
    const pos = x => x > 0 || (x === 0 && (1 / x > 0))
    const radians = Math.PI / 180
    const tau = 2 * Math.PI

		// http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html
		function isSame(a, b) {
			
			let ret = false
			if (a !== undefined && b !== undefined) {
				var aProps = Object.getOwnPropertyNames(a)
				var bProps = Object.getOwnPropertyNames(b)

				if (aProps.length != bProps.length) {
						return false
				}

				for (var i = 0; i < aProps.length; i++) {
						var propName = aProps[i];

						if (a[propName] !== b[propName]) {
								return false
						}
				}
				
				ret = true
			} 

			return ret
		}		
		
    /* **************************
     *        @rador : seg5 unit circle rador
     *          m.snap.snap (dim form => rador)
     */
    let rador = function rador (form) {
			
			let pts = []
							if (0 && 1) console.log("m.rador.rador form", form, cacheForm)
			
			if (isSame(form,cacheForm)) {
				
				pts = cachePoints
				
							if (0 && 1) console.log("m.rador.rador cashed")

			} else {

					const {m1, m2, n1, n2, n3, a, b, v0, v1, seg5} = form
					const angUnit = tau / seg5 // dots per period

					let angi = (form.angi) ? form.angi : (i, ang) => (i * ang) - Math.PI
					let radi = (form.radi) ? form.radi : (i, rad, mult) => rad * (1 + mult * i)
					let abs = (form.abs) ? form.abs : Math.abs
					let nat = function (m1, m2, n1, n2, n3, a, b) {
						return function (ang) {
							let t1 = m1 * ang / 4
							let t2 = m2 * ang / 4

							let t = Math.pow(

								Math.pow(abs(Math.cos(t1) / a), n2) // n2
										 +
										 Math.pow(abs(Math.sin(t2) / b), n3), // n3

								-1 / n1) // n1

							return t
						}
					}

					for (let i = 0; i < seg5; i++) {
						let ang = angi(i, angUnit * v1) // [0,360] => [-180,180]
						let t = nat(m1, m2, n1, n2, n3, a, b)(ang)
						let r = radi(i, t, v0) // increment radius with ang

						pts.push(r)
					}
					
	      pts = f.norma(pts)
	
				cacheForm = form
				cachePoints = pts
			}	

      return pts // dots in path: [0,...,seg5] => [0,1]
    }

   function reset() {
    cache = cacheStream = null
    return projection
  }
	
    /***************************
     *        @enty
     */
    let enty = form => rador(form)



    return enty
  }

  exports.muonRador = muonRador
}))
