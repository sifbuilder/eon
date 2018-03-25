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
    
    let r = __mapper('xs').r('renderport'),
      mversor = __mapper('xs').m('versor')(),
      mgeom = __mapper('xs').m('geom')

    let drag = d3.drag()

    let state = {
      projection: d3.geoOrthographic()
        .rotate([0,0,0])
        .translate([0, 0])
        .scale(90),
      rotation: [0, 0, 0],
      v0: null, // Mouse cartesian position invprojected
      r0: null, // Projection rotation as Euler angles at start
      q0: null, // Quaternion. Projection rotation
      p0: null, // Mouse position (polar)
      dtc: null // Distance initial dot to center untransformed
    }

    
    // start drag control
    let control = elem => elem.call(drag.on('start', dragstarted).on('drag', dragged).on('end', dragended))

    // stop drag control
    let reset = elem => elem.call(drag.on('start', null).on('drag', null).on('end', null))

    // dragstarted listener
    let dragstarted = function () {
      let e = d3.event

      let projection = state.projection

      if (projection.invert !== undefined && projection.rotate !== undefined) {
        state.p0 = r.getPos(e) // d3.mouse(this)
         if (1 && 1) console.log('c.versor.dragstarted:p0', state.p0)                
        let inve0 = projection.invert(state.p0)	// spherical invert mouse position
        if (1 && 1) console.log('c.versor.dragstarted:inve0', inve0)
          
        if (inve0 !== undefined) {
          state.v0 = mgeom.cartesian(inve0)
          state.r0 = projection.rotate()			// rotation
          state.q0 = mversor(state.r0)
        }
        
         if (1 && 1) console.log('c.versor.dragstarted:p0', state.v0, state.q0)
       
        
      }
    }

    // dragged  listener
    let dragged = function () {
      let e = d3.event

      let projection = state.projection

      if (projection.invert !== undefined && projection.rotate !== undefined) {
        if (state.v0 !== undefined && state.r0 !== undefined) {
          
          let p0 = r.getPos(e)

          // let rinvp0 = projection.rotate(state.r0).invert(getPos(e))
          let rinvp0 = projection.rotate(state.r0).invert(p0)
          
          
          if (0 && 1) console.log('c.versor.dragged', p0, rinvp0)        
            
          if (rinvp0 !== undefined) {
            let v1 = mgeom.cartesian(rinvp0)
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
