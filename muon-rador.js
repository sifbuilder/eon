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

    const tau = 2 * Math.PI



    /* **************************
     *        @rador : seg5 unit circle rador
     *          m.snap.snap (dim form => rador)
     */
    let rador = function (form) {		// polarCoords
      let pts = []
      let t = 0
      let maxRadio = 0

      if (0 && 1) console.log('m.rador.rador form', form, cacheForm)

      if (f.isSame(form, cacheForm)) {
        pts = cachePoints

        if (0 && 1) console.log('m.rador.rador cashed')
      } else {
        const {m1, m2, n1, n2, n3, a, b, v0, v1, seg5} = form
        const angUnit = tau / seg5 // dots per period

        let angi = (form.angi) ? form.angi : (i, ang) => (i * ang) - Math.PI
        let abs = (form.abs) ? form.abs : Math.abs

        for (let i = 0; i < seg5; i++) {
          let ang = angi(i, angUnit * v1) // [0,360] => [-180,180]

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

        cacheForm = form
        cachePoints = pts
      }

      return pts // dots in path: [0,...,seg5] => [0,1]
    }

    function reset () {
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
