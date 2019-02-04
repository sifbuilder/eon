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

  async function ctlVersor (__eo = {}) {
    let [
      d3,
      d3geo,
      muonGeom,
      muonVersor,
      renderPortview,
    ] = await Promise.all([
      __eo('xs').b('d3'),
      __eo('xs').b('d3-geo'),
      __eo('xs').m('geom'),
      __eo('xs').m('versor'),
      __eo('xs').r('portview'),
    ])

    let d3drag = d3
    let d3selection = d3
    let getPos = renderPortview.getPos // event position

    function tick () {
      if (state.timer) state.timer = requestAnimationFrame(tick)
    }

    function stopMomentum () { cancelAnimationFrame(state.timer); state.timer = null }

    // .................. dragControl
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

      position: false,
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

    // .................. dragstarted
    function dragstarted () {
      let e = d3selection.event

      if (state.position) return // drag ongoing

      let projection = state.projection
      console.assert(projection.invert !== undefined)
      console.assert(projection.rotate !== undefined)

      stopMomentum()

      state.moved = false // not moved yet
      state.position = getPos(e)

      state.s2 = state.position // present
      state.s1 = state.s2 // present first
      state.s0 = state.s1 // current

      let inveGeo2 = state.projection.invert(state.s2)
      state.c2 = muonGeom.cartesian(inveGeo2)
      state.r2_degrees = inits.rotInit_radians

      state.q2 = muonVersor(state.r2_degrees) // quaternion of initial rotation

      state.c0 = state.c2
      state.c1 = state.c2
      state.r1_degrees = state.r2_degrees
      // state.q1 = state.q2
      // state.q0 = state.q1

      _v0 = muonVersor.cartesian(projection.invert(state.position))
      state._r0 = projection.rotate()
      state._q0 = muonVersor(state._r0)
// if (1 && 1) console.log('_q0', state._q0)

      // var rotation = versor.rotation(
        // versor.multiply(q10, versor.delta(v10, v11, t * 1000))
      // )

    }

    let
      _v0, // Mouse position in Cartesian coordinates at start of drag gesture.
      _r0, // Projection rotation as Euler angles at start.
      _q0, // Projection rotation as versor at start.
      _v10, // Mouse position in Cartesian coordinates just before end of drag gesture.
      _v11, // Mouse position in Cartesian coordinates at end.
      _q10 // Projection rotation as versor at end.

    let
       _r1,
       _v1,
       _q1

    // .................. dragged
    function dragged () {
      if (!state.position) return

      let e = d3selection.event

      state.s1 = state.s2
      state.s2 = getPos(e)

      state.c2Rads = state.projection
        .rotate(state.r1_degrees)
        .invert(state.s2)

      state.c0 = state.c0
      state.c1 = state.c2
      state.c2 = muonGeom.cartesian(state.c2Rads)

      state.qd1 = muonVersor.delta(state.c1, state.c2) // c2-c1
      state.qd2 = muonVersor.delta(state.c0, state.c2) // c1-c0

      let sd = [
        xsign * (state.s2[1] - state.s1[1]),
        ysign * (state.s1[0] - state.s2[0]),
      ]

      if (!state.moved) {
        let sdist = sd[0] * sd[0] + sd[1] * sd[1]
        if (sdist < inits.moveSpan) return
        state.moved = true // moved
        state.rotInDrag_degrees = inits.rotInit_degrees
      }

      let rotInDrag_degrees = muonVersor.rotation(state.qd2)
      state.rotInDrag_degrees = rotInDrag_degrees
      state.lastMoveTime = Date.now()



      state._inv = state.projection.rotate(state._r0).invert(state.position)
      if (isNaN(state._inv[0])) return
      _v1 = muonVersor.cartesian(state._inv),
        _q1 = muonVersor.multiply(state._q0, muonVersor.delta(_v0, _v1)),
        _r1 = muonVersor.rotation(_q1);
// if (1 && 1) console.log('_r1',  _r1)
      // var rotation = versor.rotation(
        // versor.multiply(q10, versor.delta(v10, v11, t * 1000))
      // )
    }

    // .................. dragended
    function dragended () {
      state.velocity = [0,0]
      _v10 = muonVersor.cartesian(
        state.projection.invert(
          state.position.map(function(d, i) {
            return d - state.velocity[i] / 1000;
          })
        )
      )
      _q10 = muonVersor(state.projection.rotate());
      _v11 = muonVersor.cartesian(state.projection.invert(state.position))



      if (!state.position) return
      state.position = false
      if (!state.moved) return

      state.vel_degrees = muonVersor.rotation(state.qd1) // vel c2-c1

      // if (1 && 1) console.log('vel_degrees', state.vel_degrees)

      state.timer = requestAnimationFrame(momentum)
    }

    // .................. momentum
    function momentum () {
      state.vel_degrees[0] *= inits.decay
      state.vel_degrees[1] *= inits.decay

      state.rotInDrag_degrees[0] += state.vel_degrees[0]
      state.rotInDrag_degrees[1] += state.vel_degrees[1]

      if (state.timer) state.timer = requestAnimationFrame(momentum)
    }

    // .................. enty
    let enty = function (p = {}) {
      let rotInit_degrees = p.rotInit
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


      // let res = [0,0,0]
      // if (_v10 !== undefined && _v11 !== undefined ) {
        // res = muonVersor.rotation(
          // muonVersor.multiply(_q10, muonVersor.delta(_v10, _v11, _r1 * 1000))
        // )
        // if (1 && 1) console.log('res', res)
      // }


      let res = muonGeom.add(
        state.rotAccum_degrees,
        state.rotInDrag_degrees)
      return res
    }

    return enty
  }

  exports.ctlVersor = ctlVersor
}))
