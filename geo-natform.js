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

		let mnat = __mapper('xs').m('nat')

    let state = {},
      scale = [1, 1, 1],
      rotate = [0, 0, 0],
      translate = [0, 0, 0],
      focale = Infinity,
      zafin = [0, 1],
      lens = [0, 1, Infinity],
      dims = 3


		// 		pointStream
    let pointStream = function (prjdef) {
			
      let form = mnat.nform(prjdef.form)								// conform form

      let natform = mnat.natform(form) // m.nat.natform
      // natform = (a,b,c) => [a,b,c]
		  if (0 && 1)	console.log('m.natform.geoNatform:natform', natform)
      let stream = function (lambda, phi, radio = 1) {
        this.stream.point(...natform(lambda, phi, radio))
      }

      return stream
    }


		// 		profion
    let profion = prjdef => {		// projection:natform, form:{x,y,z}

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
			
      let m = profion(prjdef)

      return m
    }

    return enty
  }

  exports.geoNatform = geoNatform
}))
