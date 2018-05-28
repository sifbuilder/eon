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
      
 
      
      
    // ............................. pointStream
    let pointStream = function (prjdef) {
			
      let natPoint = mnat.natVertex(prjdef.form) // m.nat.natVertex (a,b,c) => [a,b,c]
				
      let stream = function (lambda, phi, radio = 1) {
        
        this.stream.point(...natPoint(lambda, phi, radio))
      }

      return stream
    }


    // ............................. natprofion
    let natprofion = prjdef => {		// projection:natPoint, form:{x,y,z}

      let geoTrans = d3.geoTransform({
					point: pointStream(prjdef)})

      let geoProj = p => geoTrans(p)

					geoProj.stream = s => geoTrans.stream(s)

      return geoProj

    }

    // ............................. enty
    let enty = function (prjdef = {}) {
			
      let m = natprofion(prjdef)

      return m
    }

    return enty
  }

  exports.geoNatform = geoNatform
}))
