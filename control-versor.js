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

    function tick () {
      if (state.autorotimer) state.autorotimer = requestAnimationFrame(tick)
    }

    function stopMomentum () { cancelAnimationFrame(state.timer); state.timer = null }

    
    let inits = {
      decay: 0.95,
      mult: 2e-3, // rotInDrag factor
      rotInit: [0, 0, 0],
      timeSpan: 200,
      epsilon: 1e-3
    }
    
    
    let state = {
      
      projection: d3.geoOrthographic()
        .rotate([0, 0])
        .translate([0, 0])
        .scale(1),
        
      rotation: [0, 0, 0],
      v0: null, // Mouse cartesian position inv-projected
      r0: null, // Projection rotation as Euler angles at start
      q0: null, // Quaternion. Projection rotation
      p0: null, // Mouse position (polar)
      dtc: null // Distance initial dot to center untransformed
    }

    
   // event position
    // let getPos = e => (e.touches && e.touches.length) ? (e = e.touches[0], [e.x, e.y]) : [e.x, e.y]
    let getPos = r.getPos

    
    // start drag control
    let control = elem => elem.call(drag.on('start', dragstarted).on('drag', dragged).on('end', dragended))

    // stop drag control
    let reset = elem => elem.call(drag.on('start', null).on('drag', null).on('end', null))

    // dragstarted listener
    let dragstarted = function () {
      let e = d3.event

      let projection = state.projection

      if (projection.invert !== undefined && projection.rotate !== undefined) {
        
        state.p0 = getPos(e) // d3.mouse(this) // initial position in geometric space
        
        let inve0 = projection.invert(state.p0)	// spherical invert mouse position  
        if (inve0 !== undefined) {
          state.v0 = mgeom.cartesian(inve0) // cartesian in unit 3d-sphere
          state.r0 = projection.rotate()		// rotation from (stated) projection
          state.q0 = mversor(state.r0)      // quaternion from rotation
        }
        
      }
    }

    // dragged  listener
    let dragged = function () {
      
      let e = d3.event

      let projection = state.projection

      // if projection has invert and rotate ...
      if (projection.invert !== undefined && projection.rotate !== undefined) {
        
        // if there is an initial rotation (r0) and initial velocity (v0)
        if (state.r0 !== undefined && state.v0 !== undefined) {
          
          let p1 = getPos(e)  // position (p1) of moving mouse in geometric space
          
          let rinvp0 = projection // 
                          .rotate(state.r0)
                          .invert(p1) 
          
          
          if (0 && 1) console.log('c.versor.dragged', state.q0, rinvp0)        
            
          if (rinvp0 !== undefined) {
            let v1 = mgeom.cartesian(rinvp0)
            
            // state.q0 is the quaternion from the start of the movement
            
            let delta = mversor.delta(state.v0, v1)
            
            if (1 && 1) console.log("delta", state.v0, v1, delta)
            let q1 = mversor.multiply(state.q0, delta)
            let r1 = mversor.rotation(q1)
         if (1 && 1) console.log('c.versor.dragged rotation', r1)        
 
            state.rotation = r1 // set global rotate
          }
        }
      }
    }

    // dragended  listener
    let dragended = function () {
      
      state.timer = requestAnimationFrame(momentum)
      
    }

    function momentum () {
      if (Math.abs(state.vel[0]) < inits.epsilon && Math.abs(state.vel[1]) < inits.epsilon) return
        // state.vel[0] *= inits.decay 
        // state.vel[1] *= inits.decay
        

        // state.rotInDrag[0] += state.vel[0] 
        // state.rotInDrag[1] -= state.vel[1]
        
      if (state.timer) state.timer = requestAnimationFrame(momentum)
    }
  
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
