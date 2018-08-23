/*******************************************
   *    @ctlVersor
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.ctlVersor = global.ctlVersor || {})))
}(this, function (exports) {
  'use strict'

  async function ctlVersor (__mapper = {}) {
    let [
      d3,
      rrenderport,
      mversor,
      mgeom,
      d3geo,
      // d3selection,
      // d3drag,
    ] = await Promise.all([
      __mapper('xs').b('d3'),
      __mapper('xs').r('renderport'),
      __mapper('xs').m('versor'),
      __mapper('xs').m('geom'),
      __mapper('xs').b('d3-geo'),
      // __mapper('xs').b('d3-selection'),
      // __mapper('xs').b('d3-drag'),
    ])

    let d3drag = d3
    let d3selection = d3
    let getPos = rrenderport.getPos // event position

    function tick () {
      if (state.timer) state.timer = requestAnimationFrame(tick)
    }

    function stopMomentum () { cancelAnimationFrame(state.timer); state.timer = null }

    // .................. rebase
    function rebase () {
      state.rotInDrag_radians = [0, 0, 0] // reset to default rotation
    }

    // ....................... versorControl
    let versorControl = {
      dragstarted,
      dragged,
      dragended,

    }

    // .................. start drag control
    let control = elem => elem.call(d3drag.drag().on('start', versorControl.dragstarted).on('drag', versorControl.dragged).on('end', versorControl.dragended))

    // .................. stop drag control
    let reset = elem => elem.call(d3drag.drag().on('start', null).on('drag', null).on('end', null))

    // .................. inits
    let inits = {
      decay: 0.95,
      mult_radians: 2e-3, // rotInDrag_radians factor
      rotInit_radians: [0, 0, 0],

      mult_grads: 2e-5, // rotInDrag_rads factor
      rotInit_grads: [0, 0, 0],

      timeSpan: 200,
      moveSpan: 16,
    }

    let epsilon = 1e-3

    let xsign = 1 //  1 if x goes left to right
    let ysign = -1 // 1 if y goes up down

    // .................. state
    let state = {

      projection: d3geo.geoOrthographic()
        .rotate([0, 0])
        .translate([0, 0])
        .scale(1),

      rotAccum_radians: [0, 0, 0],
      rotInDrag_radians: [0, 0, 0], // rotInDrag_radians in radians
      rotVel_radians: [0, 0, 0], // [-6e-3,7.6e-3,2.13e-3],   // [0,0,0],
      vel_radians: [0, 0, 0], // from dragEnd to momemtum

      rotAccum_grads: [0, 0, 0],
      rotInDrag_grads: [0, 0, 0],
      rotInitial_grads: [0, 0, 0],
      rotVel_grads: [0, 0, 0], // [-6e-3,7.6e-3,2.13e-3],   // [0,0,0],
      vel_grads: [0, 0, 0],

      grabbed: false,
      moved: false,

      lastMoveTime: null,
      timer: null,

      c0: null, // Mouse cartesian position invprojected
      r0_grads: null, // Projection rotation as Euler angles at start
      q0: null, // Quaternion. Projection rotation
      p0: null, // Mouse position (spher)
      dtc: null, // Distance initial dot to center untransformed
      s1: null, // previous position
      s2: null, // current position
    }

    // .................. dragstarted listener
    function dragstarted () {
      let e = d3selection.event

      if (state.grabbed) return // drag ongoing

      let projection = state.projection

      console.assert(projection.invert !== undefined)
      console.assert(projection.rotate !== undefined)

      stopMomentum()

      state.moved = false // not moved yet
      state.grabbed = getPos(e)

      state.s2 = getPos(e) // current
      let inveGeo2 = state.projection.invert(state.s2)
      state.c2 = mgeom.cartesian(inveGeo2)
      state.r2_grads = inits.rotInit_radians
      state.q2 = mversor(state.r2_grads) // quaternion of initial rotation

      state.s1 = state.s2 // present first
      state.c1 = state.c2
      state.r1_grads = state.r2_grads
      state.q1 = state.q2

      state.rotAccum_radians =
            mgeom.add(
              state.rotAccum_radians,
              state.rotInDrag_radians) // rotation

      rebase() // rebase rotInDrag
    }

    // .................. dragged  listener
    function dragged () {
      if (!state.grabbed) return

      let e = d3selection.event

      state.s2 = getPos(e)

      state.c2Rads = state.projection.invert(state.s2)
      state.c2 = mgeom.cartesian(state.c2Rads)

      state.qd = mversor.delta(state.c1, state.c2) // q(c0 to c1)
      let q2 = mversor.multiply(state.q1, state.qd) // conmpose rotations
      let rotInDrag_grads = mversor.rotation(q2) // [a1,a2,a3] euler angles in degrees

      let sd = [
        xsign * (state.s2[1] - state.s1[1]),
        ysign * (state.s1[0] - state.s2[0]),
      ]
      let sdist = sd[0] * sd[0] + sd[1] * sd[1]
      if (!state.moved) {
        if (sdist < inits.moveSpan) return
        state.moved = true // moved
        state.rotInDrag_grads = inits.rotInit_grads
        rebase()
      }
      state.lastMoveTime = Date.now()

      let r2 = rotInDrag_grads

      state.rotInDrag_grads = r2
    }

    // .................. dragended
    function dragended () {
      if (!state.grabbed) return
      state.grabbed = false
      if (!state.moved) return

      // state.vel_radians = [ // velocity
      // xsign * (state.s2[1] - state.s1[1]) * inits.mult_radians,
      // ysign * (state.s2[0] - state.s1[0]) * inits.mult_radians,
      // ]

      state.timer = requestAnimationFrame(momentum)
    }

    // .................. momentum
    function momentum () {
      // if (Math.abs(state.vel_radians[0]) < epsilon && Math.abs(state.vel_radians[1]) < epsilon) return

      // state.vel_radians[0] *= inits.decay
      // state.vel_radians[1] *= inits.decay

      // state.rotInDrag_radians[0] += state.vel_radians[0]
      // state.rotInDrag_radians[1] -= state.vel_radians[1]

      state.qd = [
        state.qd[0] *= inits.decay,
        state.qd[1],
        state.qd[2],
        state.qd[3],
      ]

      state.rotInDrag_grads = mversor.rotation(state.qd)

      if (state.timer) state.timer = requestAnimationFrame(momentum)
    }

    // .................. enty
    let enty = function (p = {}) {
      let rotInit_degrees = p.rotInit
      let rotInit_radians = mgeom.to_radians(rotInit_degrees)

      state.rotAccum_radians = rotInit_radians || inits.rotInit_radians

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
        state.projection = _.projection // .projection
        return enty
      } else {
        return state.projection
      }
    }

    enty.rotation = () => mgeom.add(state.rotAccum_grads, state.rotInDrag_grads)
    // enty.rotation = () => mgeom.add(state.rotAccum_radians, state.rotInDrag_radians)
    // .map(mgeom.to_degrees)

    return enty
  }

  exports.ctlVersor = ctlVersor
}))
