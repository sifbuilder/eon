/*******************************************
   *    @controlVersor
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.controlVersor = global.controlVersor || {})))
}(this, function (exports) {
  'use strict'

  let controlVersor = function (__mapper = {}) {
    let mversor = __mapper('xs').m('versor')(),
      mgeom = __mapper('xs').m('geom')

    let drag = d3.drag()

    let state = {
      projection: d3.geoOrthographic(),
      rotation: [0, 0, 0],
      v0: null, // Mouse cartesian position invprojected
      r0: null, // Projection rotation as Euler angles at start
      q0: null, // Quaternion. Projection rotation
      p0: null, // Mouse position (polar)
      dtc: null // Distance initial dot to center untransformed
    }
    // inside
    function inside (p) {
      let pt0 = p
      let k = state.projection.scale()
      let dx = state.projection.translate()[0]
      let dy = state.projection.translate()[1]
      let pt1 = [(pt0[0] - dx) / k, (dy - pt0[1]) / k]
      let x = pt1[0]
      let y = pt1[1]
      let dtc = Math.sqrt(x * x + y * y) // abs < 1
      return Math.abs(dtc) < 1
    }

    // event position
    let getPos = e => (e.touches && e.touches.length) ? (e = e.touches[0], [e.x, e.y]) : [e.x, e.y]

    // start drag control
    let control = elem => elem.call(drag.on('start', dragstarted).on('drag', dragged).on('end', dragended))

    // stop drag control
    let reset = elem => elem.call(drag.on('start', null).on('drag', null).on('end', null))

    // dragstarted listener
    let dragstarted = function () {
      let e = d3.event

      let projection = state.projection

      if (projection.invert !== undefined && projection.rotate !== undefined) {
        state.p0 = getPos(e) // d3.mouse(this)
        let inve0 = projection.invert(state.p0)	// spherical invert mouse position
        if (inve0 !== undefined) {
          state.v0 = mgeom.cartesian(inve0)
          state.r0 = projection.rotate()			// rotation
          state.q0 = mversor(state.r0)
        }
      }
    }

    // dragged  listener
    let dragged = function () {
      
      let e = d3.event

      let projection = state.projection

      if (projection.invert !== undefined && projection.rotate !== undefined) {
        if (state.v0 !== undefined && state.r0 !== undefined) {
          let inve0 = projection.rotate(state.r0).invert(getPos(e))
          if (inve0 !== undefined) {
            let v1 = mgeom.cartesian(inve0)
            let q1 = mversor.multiply(state.q0, mversor.delta(state.v0, v1))
            let r1 = mversor.rotation(q1)

            state.rotation = r1 // set global rotate
          }
        }
      }
    }

    // dragended  listener
    let dragended = function () {}

    /*******************************************
   *    @enty
   */
    let enty = function enty () {}

    enty.dragstarted = dragstarted
    enty.dragged = dragged
    enty.control = control
    enty.reset = reset

    enty.projection = _ => _ !== undefined ? (state.projection = _, enty) : state.projection
    enty.rotation = () => state.rotation

    return enty
  }

  exports.controlVersor = controlVersor
}))
