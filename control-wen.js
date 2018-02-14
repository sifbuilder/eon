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

  let controlWen = function controlWen (__mapper = {}) {
    let mgeom = __mapper('xs').m('geom')

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

    // reset to default rotation
    function rebase () {
      state.rotInDrag = [0, 0, 0]
    }

    let state = {

      projection: null, // _e_tbd

      rotAccum: [0, 0, 0],
      rotInDrag: [0, 0, 0], // rotInDrag in radians

      grabbed: false,
      moved: false,
      rotVel: [0, 0, 0], // [-6e-3,7.6e-3,2.13e-3],   // [0,0,0],

      vel: [0, 0, 0],
      moveSpan: 16,
      autoRot: false,
      lastMoveTime: null,
      timer: null,
      autorotimer: null,
      rotMatrix: null,
      cPos: null,
      pPos: null

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

      if (state.grabbed) return // drag ongoing

      stopMomentum()

      state.moved = false // not moved yet

      state.grabbed = getPos(e) // mouse position
      state.pPos = state.grabbed // previous position
      state.cPos = state.pPos // current position

      state.rotAccum = mgeom.add(state.rotAccum, state.rotInDrag) // rotation

      rebase()
    }

    // dragged  listener
    let dragged = function () {
      if (!state.grabbed) return

      let e = d3.event
      let pos = getPos(e) //  d3.mouse(this)

      let dx = state.grabbed[1] - pos[1],
        dy = -(state.grabbed[0] - pos[0])

      if (!state.moved) {
        if (dx * dx + dy * dy < state.moveSpan) return
        state.moved = true // moved
        state.autoRot = false
        state.rotInDrag = inits.rotInit
        rebase()
      }
      state.lastMoveTime = Date.now()
      state.pPos = state.cPos
      state.cPos = pos
      state.rotInDrag = [
        state.rotVel[0] + dx * inits.mult,
        state.rotVel[1] + dy * inits.mult,
        state.rotVel[2] + 0
      ]
    }

    // dragended  listener
    let dragended = function () {
      if (!state.grabbed) return
      state.grabbed = false
      if (!state.moved) return
      let f = Math.max(0, 1 - (Date.now() - state.lastMoveTime))
      state.vel = [ // velocity

        (state.pPos[1] - state.cPos[1]) * inits.mult,
        (state.cPos[0] - state.pPos[0]) * inits.mult

      ]

      state.timer = requestAnimationFrame(momentum)
    }

    function momentum () {
      if (Math.abs(state.vel[0]) < inits.epsilon && Math.abs(state.vel[1]) < inits.epsilon) return
        state.vel[0] *= inits.decay 
        state.vel[1] *= inits.decay
        
        state.rotInDrag[0] += state.vel[0] 
        state.rotInDrag[1] += state.vel[1]
        
      if (state.timer) state.timer = requestAnimationFrame(momentum)
    }

    /*******************************************
   *    @ENTY
   */
    let enty = function (p = {}) {
      state.rotAccum = mgeom.to_radians(p.rotInit) || inits.rotInit
      state.autorotimer = requestAnimationFrame(tick)
      return enty
    }

    enty.dragstarted = dragstarted
    enty.dragged = dragged
    enty.dragended = dragended
    enty.control = control
    enty.reset = reset

    enty.projection = _ => _ !== undefined ? (state.projection = _, enty) : state.projection
    enty.rotation = () => mgeom.add(state.rotAccum, state.rotInDrag).map(mgeom.to_degrees)

    return enty
  }

  exports.controlWen = controlWen
}))
