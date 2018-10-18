/*******************************************
   *    @ctlEul
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.ctlEul = global.ctlEul || {})))
}(this, function (exports) {
  'use strict'

  async function ctlEul (__mapper = {}) {
    let [
      d3,
      d3geo,
      muonGeom,
      renderPortview,
    ] = await Promise.all([
      __mapper('xs').b('d3'),
      __mapper('xs').b('d3-geo'),
      __mapper('xs').m('geom'),
      __mapper('xs').r('portview'),
    ])

    let d3drag = d3
    let d3selection = d3
    let getPos = renderPortview.getPos // event position

    function tick () {
      if (state.timer) state.timer = requestAnimationFrame(tick)
    }

    function stopMomentum () { cancelAnimationFrame(state.timer); state.timer = null }

    // .................. rebase
    function rebase () {
      state.rotInDrag_s_degrees = [0, 0, 0] // reset to default rotation
      state.rotInDrag_c_degrees = [0, 0, 0] // reset to default rotation
    }

    // ....................... dragControl
    let dragControl = {
      dragstarted,
      dragged,
      dragended,

    }

    // .................. start drag control
    let control = elem => elem.call(d3drag.drag().on('start', dragControl.dragstarted).on('drag', dragControl.dragged).on('end', dragControl.dragended))

    // .................. stop drag control
    let reset = elem => elem.call(d3drag.drag().on('start', null).on('drag', null).on('end', null))

    // .................. inits
    let inits = {
      decay: 0.95,

      mult_degrees: 1e-1, // rotInDrag_s_degrees factor
      rotInit_degrees: [0, 0, 0],
      timeSpan: 200,
      moveSpan: 16,
      
      mult_degrees_c: 90,
      
      
    }

    let epsilon = 1e-3

    let xsign = -1 //  up/down
    let ysign = -1 // left/right
    let zsign = 1

    // .................. state
    let state = {

      projection: () => d3geo.geoOrthographic()
        .rotate([0, 0])
        .translate([0, 0])
        .scale(1),

      // screen  
        
      rotAccum_s_degrees: [0, 0, 0],
      rotInDrag_s_degrees: [0, 0, 0], // rotInDrag_s_degrees in radians
      rotVel_s_degrees: [0, 0, 0], // [-6e-3,7.6e-3,2.13e-3],   // [0,0,0],
      vel_s_degrees: [0, 0, 0], // from dragEnd to momemtum

      // cartesian
      
      rotAccum_c_degrees: [0, 0, 0],
      rotInDrag_c_degrees: [0, 0, 0], // rotInDrag_c_degrees in radians
      rotVel_c_degrees: [0, 0, 0], // [-6e-3,7.6e-3,2.13e-3],   // [0,0,0],
      vel_c_degrees: [0, 0, 0], // from dragEnd to momemtum

      grabbed: false,
      moved: false,

      lastMoveTime: null,
      timer: null,

      s0: null, // previous position
      s1: null, // previous position
      s2: null, // current position

      c0: null, // previous position
      c1: null, // previous position
      c2: null, // current position
    }

    // .................. dragstarted listener
    function dragstarted () {

      let e = d3selection.event
      if (state.grabbed) return // drag ongoing
      stopMomentum()
      state.moved = false // not moved yet
      state.grabbed = getPos(e)

      // screen coordinates 
      
      state.s2 = state.grabbed // present
      state.s1 = state.s2 // current
      state.s0 = state.s1 // current
      
      // screen rotation accumulation 
      
      state.rotAccum_s_degrees =
            muonGeom.add(
              state.rotAccum_s_degrees,
              state.rotInDrag_s_degrees) // rotation


      // cartesian coordinates 

      state.c2 = muonGeom.cartesian(state.s2)
      state.c1 = state.c2
      state.c0 = state.c2      
      
      // cartesian rotation accumulation 
      
      state.rotAccum_c_degrees =
            muonGeom.add(
              state.rotAccum_c_degrees,
              state.rotInDrag_c_degrees) // rotation             
      
              
      rebase() // rebase rotInDrag
    }

    // .................. dragged  listener
    function dragged () {
      if (!state.grabbed) return

      let e = d3selection.event

      // screen
      
      state.s1 = state.s2
      state.s2 = getPos(e)
      
      let sd12 = [ // qurrent  // invert
        xsign * (state.s2[1] - state.s1[1]), 
        ysign * (state.s1[0] - state.s2[0]),
      ]

      let sd02 = [ // present  // invert
        xsign * (state.s2[1] - state.s0[1]),
        ysign * (state.s0[0] - state.s2[0]),
      ]

      let sdist = sd02[0] * sd02[0] + sd02[1] * sd02[1]
      if (!state.moved) {
        if (sdist < inits.moveSpan) return
        state.moved = true // moved
        state.rotInDrag_s_degrees = inits.rotInit_degrees
        rebase()
      }

      let rotInDrag_s_degrees = [
        state.rotVel_s_degrees[0] + sd02[0] * inits.mult_degrees,
        state.rotVel_s_degrees[1] + sd02[1] * inits.mult_degrees,
      ]
      state.rotInDrag_s_degrees = rotInDrag_s_degrees

      
      // cartesian

      state.c0 = state.c0
      state.c1 = state.c2
      state.c2 = muonGeom.cartesian(state.s2)      


      let cd12 = [ // qurrent

        state.c2[0] - state.c1[0],
        state.c2[1] - state.c1[1],
        state.c2[2] - state.c1[2],
        
      ]

      let cd02 = [ // present
        state.c2[0] - state.c0[0],
        state.c2[1] - state.c0[1],
        state.c2[2] - state.c0[2],
      ]

      let cdist = cd02[0] * cd02[0] + cd02[1] * cd02[1] + cd02[2] * cd02[2]
      if (!state.moved) {
        if (cdist < inits.moveSpan) return
        state.moved = true // moved
        state.rotInDrag_c_degrees = inits.rotInit_degrees
        rebase()
      }

      let rotInDrag_c_degrees = [
        state.rotVel_c_degrees[0] + cd02[0] * inits.mult_degrees_c,
        state.rotVel_c_degrees[1] + cd02[1] * inits.mult_degrees_c,
        state.rotVel_c_degrees[2] + cd02[2] * inits.mult_degrees_c,
      ]
      state.rotInDrag_c_degrees = rotInDrag_c_degrees
      
      
      state.lastMoveTime = Date.now()
    }

    // .................. dragended
    function dragended () {
      if (!state.grabbed) return
      state.grabbed = false
      if (!state.moved) return


      // screen
      
      let sd12 = [
        state.s2[1] - state.s1[1],
        state.s2[0] - state.s1[0]
      ]
      let msd12 = [
        xsign * sd12[0] * inits.mult_degrees,
        ysign * sd12[1] * inits.mult_degrees,
      ]
      state.vel_s_degrees = msd12


      // cartesian delta and modified cartesian delta

      let cd12 = [
        state.c2[0] - state.c1[0],
        state.c2[1] - state.c1[1],
        state.c2[2] - state.c1[2],
      ]
      let mcd12 = [
        xsign * cd12[0] * inits.mult_degrees_c,
        ysign * cd12[1] * inits.mult_degrees_c,
        zsign * cd12[2] * inits.mult_degrees_c,
      ]        
      
      state.vel_c_degrees = mcd12
if (1 && 1) console.log('dragended', state.vel_c_degrees)
  
      state.timer = requestAnimationFrame(momentum)
    }

    // .................. momentum
    function momentum () {
      // screen
      if (Math.abs(state.vel_s_degrees[0]) < epsilon &&
        Math.abs(state.vel_s_degrees[1]) < epsilon) return
      
      state.vel_s_degrees[0] *= inits.decay
      state.vel_s_degrees[1] *= inits.decay

      state.rotInDrag_s_degrees[0] += state.vel_s_degrees[0]
      state.rotInDrag_s_degrees[1] -= state.vel_s_degrees[1]

      // cartesian
      // if (Math.abs(state.vel_c_degrees[0]) < epsilon &&
        // Math.abs(state.vel_c_degrees[1]) < epsilon) return

        
      // state.vel_c_degrees[0] = state.vel_c_degrees[0] * inits.decay
      // state.vel_c_degrees[1] = state.vel_c_degrees[1] * inits.decay
      // state.vel_c_degrees[2] = state.vel_c_degrees[2] * inits.decay
      
      // state.rotInDrag_c_degrees[0] = state.rotInDrag_c_degrees[0] - state.vel_c_degrees[0]
      // state.rotInDrag_c_degrees[1] = state.rotInDrag_c_degrees[1] - state.vel_c_degrees[1]
      // state.rotInDrag_c_degrees[2] = state.rotInDrag_c_degrees[2] - state.vel_c_degrees[2]

      
      if (state.timer) state.timer = requestAnimationFrame(momentum)
    }

    // .................. enty
    let enty = function (p = {}) {
      let rotInit_degrees = p.rotInit || rotInit_degrees

      // screen
      state.rotAccum_s_degrees = rotInit_degrees || inits.rotInit_degrees
      

      state.timer = requestAnimationFrame(tick)

      return enty
    }

    enty.dragstarted = dragstarted
    enty.dragged = dragged
    enty.dragended = dragended

    enty.control = control
    enty.reset = reset

    enty.projection = _ => {
      if (_ !== undefined) {
        state.projection = _
        return enty
      } else {
        return state.projection
      }
    }

    enty.rotation = () => {
      let res_s = muonGeom.add(state.rotAccum_s_degrees,state.rotInDrag_s_degrees)
      let res_c = muonGeom.add(state.rotAccum_c_degrees,state.rotInDrag_c_degrees)      
      let res = res_c
      return res
    }

    return enty
  }

  exports.ctlEul = ctlEul
}))
