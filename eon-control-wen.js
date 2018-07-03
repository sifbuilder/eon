/*******************************************
   *    @controlWen
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.controlWen = global.controlWen || {})))
}(this, function (exports) {
  'use strict'

  // http://codepen.io/bali_balo/pen/XbyrME?editors=1100)
  // https://github.com/wenliang-developer
  // https://codepen.io/wenliang-developer/pen/gMwvXR
  // https://github.com/wenliang-developer/web-developer-site

  async function controlWen (__mapper = {}) {
    let [
      rrenderport,
      mversor,
      d3,
      mgeom
    ] = await Promise.all([
      __mapper('xs').r('renderport'),
      __mapper('xs').m('versor'),
      __mapper('xs').q('d3'),
      __mapper('xs').m('geom')
    ])

    function tick () {
      if (state.timer) state.timer = requestAnimationFrame(tick)
    }

    function stopMomentum () { cancelAnimationFrame(state.timer); state.timer = null }

    function rebase () {
      state.rotInDrag_radians = [0, 0, 0] // reset to default rotation
    }

    let inits = {
      decay: 0.95,
      mult: 2e-3, // rotInDrag_radians factor
      rotInit_radians: [0, 0, 0],
      timeSpan: 200,
      epsilon: 1e-3
    }

    let getPos = rrenderport.getPos // event position
    let xsign = 1 //  1 if x goes left to right
    let ysign = -1 // 1 if y goes up down

    let state = {

      // projection: null, // __mapper('xs').g('uniwen'), // _e_tbd
      projection: () => d3.geoOrthographic()
        .rotate([0, 0])
        .translate([0, 0])
        .scale(1),

      rotAccum_radians: [0, 0, 0],
      rotInDrag_radians: [0, 0, 0], // rotInDrag_radians in radians

      grabbed: false,
      moved: false,
      rotVel: [0, 0, 0], // [-6e-3,7.6e-3,2.13e-3],   // [0,0,0],

      vel: [0, 0, 0],
      moveSpan: 16,
      autoRot: false,
      lastMoveTime: null,
      timer: null,
      timer: null,
      rotMatrix: null,
      cPos: null, // current position
      pPos: null // previous position

    }

    // .................. start drag control
    let control = elem => elem.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended))

    // .................. stop drag control
    let reset = elem => elem.call(d3.drag().on('start', null).on('drag', null).on('end', null))

    // .................. dragstarted listener
    let dragstarted = function () {
      let e = d3.event

      if (state.grabbed) return // drag ongoing

      stopMomentum()

      state.moved = false // not moved yet

      state.grabbed = getPos(e) // mouse position

      state.p0 = state.grabbed // initial position in geometric space

      let projection = state.projection()
      if (projection.invert === undefined) {
        if (2 && 2) console.log('** projection invert missing', projection)
      } else if (projection.rotate === undefined) {
        if (2 && 2) console.log('** projection rotate missing', projection)
      }

      state.pPos = state.p0 // previous position
      state.cPos = state.pPos // current position

      state.rotAccum_radians = mgeom.add(state.rotAccum_radians, state.rotInDrag_radians) // rotation
      rebase()
    }

    // .................. dragged  listener
    let dragged = function () {
      if (!state.grabbed) return

      let e = d3.event
      let pos = getPos(e) //  d3.mouse(this)

      let dx = xsign * (pos[1] - state.grabbed[1]),
        dy = ysign * (state.grabbed[0] - pos[0])

      if (!state.moved) {
        if (dx * dx + dy * dy < state.moveSpan) return
        state.moved = true // moved
        state.autoRot = false
        state.rotInDrag_radians = inits.rotInit_radians
        rebase()
      }
      state.lastMoveTime = Date.now()
      state.pPos = state.cPos
      state.cPos = pos
      state.rotInDrag_radians = [
        state.rotVel[0] + dx * inits.mult,
        state.rotVel[1] + dy * inits.mult,
        state.rotVel[2] + 0
      ]
    }

    // .................. dragended  listener
    let dragended = function () {
      if (!state.grabbed) return
      state.grabbed = false
      if (!state.moved) return
      let f = Math.max(0, 1 - (Date.now() - state.lastMoveTime))

      state.vel = [ // velocity

        xsign * (state.cPos[1] - state.pPos[1]) * inits.mult,
        ysign * (state.cPos[0] - state.pPos[0]) * inits.mult

      ]

      state.timer = requestAnimationFrame(momentum)
    }

    // .................. momentum
    function momentum () {
      if (Math.abs(state.vel[0]) < inits.epsilon && Math.abs(state.vel[1]) < inits.epsilon) return
      state.vel[0] *= inits.decay
      state.vel[1] *= inits.decay

      state.rotInDrag_radians[0] += state.vel[0]
      state.rotInDrag_radians[1] -= state.vel[1]

      if (state.timer) state.timer = requestAnimationFrame(momentum)
    }

    // .................. enty
    let enty = function (p = {}) {
      state.rotAccum_radians = mgeom.to_radians(p.rotInit) || inits.rotInit_radians
      state.timer = requestAnimationFrame(tick)
      return enty
    }

    enty.dragstarted = dragstarted
    enty.dragged = dragged
    enty.dragended = dragended

    enty.control = control
    enty.reset = reset

    enty.projection = _ => _ !== undefined ? (state.projection = _, enty) : state.projection
    enty.rotation = () => mgeom.add(state.rotAccum_radians, state.rotInDrag_radians).map(mgeom.to_degrees)

    return enty
  }

  exports.controlWen = controlWen
}))
