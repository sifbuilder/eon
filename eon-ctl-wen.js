/*******************************************
   *    @ctlWen
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.ctlWen = global.ctlWen || {})))
}(this, function (exports) {
  'use strict'

  async function ctlWen (__mapper = {}) {
    let [
      d3,
      d3geo,
      mgeom,
      rrenderport,
    ] = await Promise.all([
      __mapper('xs').b('d3'),
      __mapper('xs').b('d3-geo'),
      __mapper('xs').m('geom'),
      __mapper('xs').r('renderport'),
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
      timeSpan: 200,
      moveSpan: 16,
    }

    let epsilon = 1e-3

    let xsign = -1 //  up/down
    let ysign = -1 // left/right

    // .................. state
    let state = {

      projection: () => d3geo.geoOrthographic()
        .rotate([0, 0])
        .translate([0, 0])
        .scale(1),

      rotAccum_radians: [0, 0, 0],
      rotInDrag_radians: [0, 0, 0], // rotInDrag_radians in radians
      rotVel_radians: [0, 0, 0], // [-6e-3,7.6e-3,2.13e-3],   // [0,0,0],
      vel_radians: [0, 0, 0], // from dragEnd to momemtum

      grabbed: false,
      moved: false,

      lastMoveTime: null,
      timer: null,

      s1: null, // previous position
      s2: null, // current position
    }

    // .................. dragstarted listener
    function dragstarted () {
      // s: screen  state.s1, state.s2,
      // g: geographic
      // c: cartesian
      // q: quaternion
      // dP: delta present - rotAccum
      // dQ: delta current - rotInDrag

      let e = d3selection.event

      if (state.grabbed) return // drag ongoing

      stopMomentum()
      state.moved = false // not moved yet

      state.grabbed = getPos(e)

      state.s2 = state.grabbed // present
      state.s1 = state.s2 // current

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

      let sd = [
        xsign * (state.s2[1] - state.s1[1]),
        ysign * (state.s1[0] - state.s2[0]),
      ]
      let sdist = sd[0] * sd[0] + sd[1] * sd[1]
      if (!state.moved) {
        if (sdist < inits.moveSpan) return
        state.moved = true // moved
        state.rotInDrag_radians = inits.rotInit_radians
        rebase()
      }
      state.lastMoveTime = Date.now()

      let r2 = [
        state.rotVel_radians[0] + sd[0] * inits.mult_radians,
        state.rotVel_radians[1] + sd[1] * inits.mult_radians,
      ]

      state.rotInDrag_radians = r2
    }

    // .................. dragended
    function dragended () {
      if (!state.grabbed) return
      state.grabbed = false
      if (!state.moved) return

      state.vel_radians = [ // velocity

        xsign * (state.s2[1] - state.s1[1]) * inits.mult_radians,
        ysign * (state.s2[0] - state.s1[0]) * inits.mult_radians,

      ]

      state.timer = requestAnimationFrame(momentum)
    }

    // .................. momentum
    function momentum () {
      if (Math.abs(state.vel_radians[0]) < epsilon && Math.abs(state.vel_radians[1]) < epsilon) return

      state.vel_radians[0] *= inits.decay
      state.vel_radians[1] *= inits.decay

      state.rotInDrag_radians[0] += state.vel_radians[0]
      state.rotInDrag_radians[1] -= state.vel_radians[1]

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

    enty.projection = _ => _ !== undefined ? (state.projection = _, enty) : state.projection

    enty.rotation = () => mgeom.add(state.rotAccum_radians, state.rotInDrag_radians)
      .map(mgeom.to_degrees)

    return enty
  }

  exports.ctlWen = ctlWen
}))
