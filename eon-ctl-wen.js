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

  async function ctlWen (__eo = {}) {
    let [
      d3,
      d3Geo,
      muonGeom,
      // muonVector2,
      renderPortview,
    ] = await Promise.all([
      __eo('xs').b('d3'),
      __eo('xs').b('d3-geo'),
      __eo('xs').m('geom'),
      // __eo('xs').m('vector2'),
      __eo('xs').r('portview'),
    ])

    let d3drag = d3
    let d3selection = d3
    let getPos = renderPortview.getPos // event position

    // .................. inits
    let inits = {

      decay: 0.95,
      mult_degrees_s: 1e-1, // rotInDrag_s_degrees factor
      mult_degrees_c: 90,
      rotInit_degrees: [0, 0, 0],
      moveSpan: 16,

    }

    let epsilon = 1e-3

    let xsign = -1 //  up/down
    let ysign = -1 // left/right

    // .................. state
    let state = {

      projection: () => d3Geo.geoOrthographic()
        .rotate([0, 0])
        .translate([0, 0])
        .scale(1),

      // screen

      rotAccum_s_degrees: [0, 0, 0],
      rotInDrag_s_degrees: [0, 0, 0], // rotInDrag_s_degrees in radians
      rotVel_s_degrees: [0, 0, 0], // [-6e-3,7.6e-3,2.13e-3],   // [0,0,0],
      vel_s_degrees: [0, 0, 0], // from dragEnd to momemtum

      grabbed: false,
      moved: false,

      lastMoveTime: null,
      timer: null,

      s0: null, // previous position
      s1: null, // previous position
      s2: null, // current position

      showrot: false,

    }

    // ..................
    function tick () {
      if (state.timer) state.timer = requestAnimationFrame(tick)
    }

    function stopMomentum () { cancelAnimationFrame(state.timer); state.timer = null }

    // .................. rebaseDrag
    function rebaseDrag () {
      state.rotInDrag_s_degrees = [0, 0, 0]
      state.rotInDrag_c_degrees = [0, 0, 0]
    }

    // ....................... dragControl
    let dragControl = {
      dragstarted,
      dragged,
      dragended,

    }

    // .................. start drag control
    let control = elem => {
      elem.call(d3drag.drag()
        .on('start.wen', dragControl.dragstarted)
        .on('drag.wen', dragControl.dragged)
        .on('end.wen', dragControl.dragended)
      )
      return enty
    }

    // .................. stop drag control
    let reset = elem => {
      elem.call(d3drag.drag()
        .on('start.wen', null)
        .on('drag.wen', null)
        .on('end.wen', null)
      )
      return enty
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

      rebaseDrag() // reset rotInDrag
    }

    // .................. dragged  listener
    function dragged () {
      if (!state.grabbed) return

      let e = d3selection.event

      // screen

      state.s1 = state.s2
      state.s2 = getPos(e)

      // sd02 is delta from beginning of drag to current tick
      let sd02 = [ // present  // invert
        xsign * (state.s2[1] - state.s0[1]),
        ysign * (state.s0[0] - state.s2[0]),
      ]

      // if this is the first tick in dragged (after dragstart)
      if (!state.moved) {
        let sdist = sd02[0] * sd02[0] + sd02[1] * sd02[1]
        if (sdist < state.moveSpan) return
        state.moved = true // moved
        state.rotInDrag_s_degrees = state.rotInit_degrees
        rebaseDrag() // reset rotInDrag
      }

      let rotInDrag_s_degrees = [
        state.rotVel_s_degrees[0] + sd02[0] * state.mult_degrees_s,
        state.rotVel_s_degrees[1] + sd02[1] * state.mult_degrees_s,
      ]
      state.rotInDrag_s_degrees = rotInDrag_s_degrees

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
        state.s2[0] - state.s1[0],
      ]
      let msd12 = [
        xsign * sd12[0] * state.mult_degrees_s,
        ysign * sd12[1] * state.mult_degrees_s,
      ]
      state.vel_s_degrees = msd12

      state.timer = requestAnimationFrame(momentum)
    }

    // .................. momentum
    function momentum () {
      // screen
      if (Math.abs(state.vel_s_degrees[0]) < epsilon &&
        Math.abs(state.vel_s_degrees[1]) < epsilon) return

      state.vel_s_degrees[0] *= state.decay
      state.vel_s_degrees[1] *= state.decay

      state.rotInDrag_s_degrees[0] += state.vel_s_degrees[0]
      state.rotInDrag_s_degrees[1] -= state.vel_s_degrees[1]

      if (state.timer) state.timer = requestAnimationFrame(momentum)
    }

    // .................. enty
    let enty = function (p = {}) {
      state.decay = p.decay || inits.decay
      state.moveSpan = p.moveSpan || inits.moveSpan
      state.mult_degrees_s = p.mult_degrees_s || inits.mult_degrees_s
      state.rotInit_degrees = p.rotInit_degrees || inits.rotInit_degrees

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
      let res = muonGeom.add(
        state.rotAccum_s_degrees,
        state.rotInDrag_s_degrees
      )
      if (state.showrot && 1) console.log('rotation:', res)

      return res
    }

    return enty
  }

  exports.ctlWen = ctlWen
}))
