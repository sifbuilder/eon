/*******************************************
 *    @geoUniwen
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.geoUniwen = global.geoUniwen || {})))
}(this, function (exports) {
  'use strict'

  let geoUniwen = function geoUniwen (__mapper = {}) {
    let f = __mapper('props')(),
      mgeom = __mapper('xs').m('geom'),
      mwen = __mapper('xs').m('wen'),
      cwen = __mapper('xs').c('wen')

    const init 					= {}
    init.scale 					= [1, 1, 1]
    init.rotate 				= [0, 0, 0]
    init.translate 			= [0, 0, 0]
    init.center 				= [0, 0, 0]
    init.lens 					= [0, 1, Infinity]

    let state = {}
    state.scale 				= init.scale
    state.rotate 				= init.rotate
    state.translate 		= init.translate
    state.center 				= init.center
    state.lens 					= init.lens

    let wenRotation = function (rot) {
      let rox = mwen.matrix(rot !== undefined ? mgeom.to_radians(rot) : cwen.rotInDrag())
      return function (x, y, z = 0) {
        return mwen.rotateMatrix([x, y, z], rox)
      }
    }

    let projectionInverse = function (p, d, s) {
      let h = Array.isArray(s) ? s : Array.of(s)
      let f0 = (h[0] || 1) / (1 - p[2] / d)
      let f1 = (h[1] || h[0]) / (1 - p[2] / d)
      return [p[0] / f0, p[1] / f1, p[2]]
    }

    let rotationInverse = function (rot) {
      let rox = mwen.matrix(rot !== undefined ? mgeom.to_radians(rot) : cwen.rotInDrag())
      return function (x, y, z = 0) {
        return mwen.transpose33([x, y, z], rox)
      }
    }

    let pointStreamInverse = function (x, y, z = 0) {
      let c = [x, y, z]
      c = c.map((d, i) => d - (state.translate[i] || 0)) //   inverse translation
      z = (c[2] - state.zafin[0]) / state.zafin[1] // inverse perspective
      // c = mwen.projectionInverse([ c[0], c[1], z ], state.focale, state.scale) //   inverse projection
      c = mwen.projectionInverse([ c[0], c[1], z ], state.lens[2], state.scale) //   inverse projection
      c = wenRotationInverse(state.rotate)(...c) //   inverse rotation

      this.stream.point(...c)
    }

    let pointStream = function (x, y, z = 0) {
      let c = [x, y, z]
      c = wenRotation(state.rotate)(...c)														// rotate
      // z = (c[2] * state.zafin[1]) + state.zafin[0]
      z = (c[2] * state.lens[1]) + state.lens[0]
      // c = mwen.projection([ c[0], c[1], z ], state.focale, state.scale)	// scale
      c = mwen.projection([ c[0], c[1], z ], state.lens[2], state.scale)	// scale

      if (f.isPureArray(state.translate)) {
        c = c.map((d, i) => d + (state.translate[i] || 0))						// translate
      }	else {																		// assume multiple translates
        for (let k = 0; k < state.translate.length; k++) {
          let trans = state.translate[k]									// if {} assume {x,y,z} => [,,]
          if (typeof trans === 'object') trans = Object.values(trans).map(d => d || 0)
          c = c.map((d, i) => d + (trans[i] || 0))						// translate
        }
      }
      this.stream.point(...c)
    }

    let profion = () => {
      let geoTrans = d3.geoTransform({
        point: pointStream,
        sphere: d => d })
      let geoProj = p => geoTrans(p)
      geoProj.stream = s => geoTrans.stream(s)
      return geoProj
    }

    /****************************
   *    @enty
   */
    let enty = function (prjdef = {}) {
      let m = profion(prjdef)
			let vars = Object.keys(prjdef)

			state = Object.assign({}, init)			// reste proj state
			
			for (let i=0; i<vars.length; i++) {
				if (state[vars[i]] !== undefined) state[vars[i]] = prjdef[vars[i]]	// upd state
			}
			
      m.translate = _ => _ !== undefined ? (state.translate = _, m) : m
      m.center = _ => _ !== undefined ? (state.center = _, m) : m
      m.rotate = _ => _ !== undefined ? (state.rotate = _, m) : m

      m.scale = _ => _ !== undefined ? (state.scale = _, m) : m
      m.lens = _ => _ !== undefined ? (state.lens = _, m) : m

      return m
    }

    return enty
  }

  exports.geoUniwen = geoUniwen
}))
