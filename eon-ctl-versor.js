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
    ] = await Promise.all([
      __mapper('xs').b('d3'),
      __mapper('xs').r('renderport'),
      __mapper('xs').m('versor'),
      __mapper('xs').m('geom'),
      __mapper('xs').b('d3-geo'),
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
      decay: 0.85,
      mult_radians: 2e-3, // rotInDrag_radians factor
      rotInit_radians: [0, 0, 0],

      mult_degrees: 2e-5, // rotInDrag_rads factor
      rotInit_degrees: [0, 0, 0],

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

      rotAccum_degrees: [0, 0, 0],
      rotInDrag_degrees: [0, 0, 0],
      rotInitial_degrees: [0, 0, 0],
      rotVel_degrees: [0, 0, 0], // [-6e-3,7.6e-3,2.13e-3],   // [0,0,0],
      vel_degrees: [0, 0, 0],

      grabbed: false,
      moved: false,

      lastMoveTime: null,
      timer: null,

      c0: null, // Mouse cartesian position invprojected
      r0_degrees: null, // Projection rotation as Euler angles at start
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
      state.r2_degrees = inits.rotInit_radians
      state.q2 = mversor(state.r2_degrees) // quaternion of initial rotation

      state.s1 = state.s2 // present first
      state.c0 = state.c2
      state.c1 = state.c2
      state.r1_degrees = state.r2_degrees
      state.q1 = state.q2

      // rot at the start of new drag
      state.rotAccum_degrees =
            mgeom.add(
              [0, 0, 0],
              [0, 0, 0]
              // state.rotAccum_degrees, //
              // state.rotInDrag_degrees // at end of last drag
            )

      rebase() // rebase rotInDrag
    }

    // .................. dragged  listener
    function dragged () {
      if (!state.grabbed) return

      let e = d3selection.event
      state.s2 = getPos(e)

      state.c2Rads = state.projection
        .rotate(state.r1_degrees)
        .invert(state.s2)

      state.c1 = state.c2
      state.c2 = mgeom.cartesian(state.c2Rads)

      state.qd1 = mversor.delta(state.c1, state.c2)
      state.vel_degrees = mversor.rotation(state.qd1)
      if (1 && 1) console.log('vel_degrees', state.vel_degrees)

      state.qd2 = mversor.delta(state.c0, state.c2) // q(c0 to c0)
      let rotInDrag_degrees = mversor.rotation(state.qd2)

      let sd = [
        xsign * (state.s2[1] - state.s1[1]),
        ysign * (state.s1[0] - state.s2[0]),
      ]

      if (!state.moved) {
        let sdist = sd[0] * sd[0] + sd[1] * sd[1]
        if (sdist < inits.moveSpan) return
        state.moved = true // moved
        state.rotInDrag_degrees = inits.rotInit_degrees
        rebase()
      }

      state.rotInDrag_degrees = rotInDrag_degrees
      state.lastMoveTime = Date.now()
    }

    // .................. dragended
    function dragended () {
      if (!state.grabbed) return
      state.grabbed = false
      if (!state.moved) return

      state.timer = requestAnimationFrame(momentum)
    }

    // .................. momentum
    function momentum () {
      // state.qd2 = [
      // state.qd2[0] *= inits.decay,
      // state.qd2[1],
      // state.qd2[2],
      // state.qd2[3],
      // ]
      // let rotInDrag_degrees = mversor.rotation(state.qd2)
      // state.rotInDrag_degrees = rotInDrag_degrees

      state.vel_degrees[0] *= inits.decay
      state.vel_degrees[1] *= inits.decay

      state.rotInDrag_degrees[0] += state.vel_degrees[0]
      state.rotInDrag_degrees[1] += state.vel_degrees[1]

      if (state.timer) state.timer = requestAnimationFrame(momentum)
    }

    // .................. enty
    let enty = function (p = {}) {
      let rotInit_degrees = p.rotInit
      let rotInit_radians = mgeom.to_radians(rotInit_degrees)

      state.rotAccum_degrees = rotInit_degrees || inits.rotInit_degrees

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

    enty.rotation = () => {
      let res = mgeom.add(
        state.rotAccum_degrees,
        state.rotInDrag_degrees)
      return res
    }
    // enty.rotation = () => mgeom.add(state.rotAccum_radians, state.rotInDrag_radians)
    // .map(mgeom.to_degrees)

    return enty
  }

  exports.ctlVersor = ctlVersor
}))
