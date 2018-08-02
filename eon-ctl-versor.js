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

    let getPos = e => (e.touches && e.touches.length) ? (e = e.touches[0], [e.x, e.y]) : [e.x, e.y]
    getPos = rrenderport.getPos

    // start drag control
    let control = function (elem, props = {}) {
      elem.call(d3drag.drag()
        .on('start', versorControl.dragstarted)
        .on('drag', versorControl.dragged)
        .on('end', versorControl.dragended))
    }

    // stop drag control
    let reset = elem => elem.call(d3drag.drag()
      .on('start', null)
      .on('drag', null)
      .on('end', null))

    // ..................
    let state = {

      projection: d3geo.geoOrthographic(),

      rotation: [0, 0, 0],

      inve0Cart: null, // Mouse cartesian position invprojected
      r0: null, // Projection rotation as Euler angles at start
      q0: null, // Quaternion. Projection rotation
      p0: null, // Mouse position (spher)
      dtc: null, // Distance initial dot to center untransformed

      grabbed: false,
      moved: false,
      rotInitial_grads: [0, 0, 0],
      rotInDrag_grads: [0, 0, 0],
      rotAtInit_grads: [0, 0, 0],

      decay: 0.95,
      mult: 2e-3, // rotInDrag_rads factor
      rotInit_rads: [0, 0, 0],
      timeSpan: 200,
      epsilon: 1e-3,
      vel_spher: [0, 0, 0],
      moveSpan: 16,
      autoRot: false,
      lastMoveTime: null,
      timer: null,
      rotMatrix: null,
      cPos: null, // current position
      pPos: null, // previous position

    }

    // ....................... versorControl
    let versorControl = {
      dragstarted,
      dragged,
      dragended,

    }

    // ....................... dragstarted
    function dragstarted () {
      if (1 && 1) console.log(' ************* ')

      let e = d3selection.event
      state.proj = state.projection

      if (state.grabbed) return // drag ongoing
      state.moved = false // not moved yet       // stopMomentum()
      state.grabbed = true

      // -----------------
      state.p0 = getPos(e) // d3.mouse(this)

      let inve0Spher = state.proj.invert(state.p0)
      state.inve0Cart = mgeom.cartesian(inve0Spher)

      state.r0 = state.proj.rotate() // rotation in projection in degrees

      state.q0 = mversor(state.r0) // quaternion of initial rotation
      // -----------------

      state.rotAtInit_grads = state.rotInitial_grads // rebase()
    }

    // ....................... dragged
    function dragged () {
      let e = d3selection.event

      state.proj = state.projection

      if (!state.grabbed) return
      if (!state.moved) {
        state.moved = true // moved // state.autoRot = false
        state.autoRot = false
        state.rotAtInit_grads = state.rotInitial_grads // rebase()
      }

      // -----------------
      state.lastMoveTime = Date.now()

      // -----------------
      state.p1 = getPos(e)

      // -----------------
      state.inve1_spher = state.proj
        .rotate(state.r0)
        .invert(state.p1)

      state.inve1_cart = mgeom.cartesian(state.inve1_spher)

      // -----------------

      state.pPos = state.cPos
      state.cPos = state.inve1_spher

      // -----------------
      // quaternion to rotate between inve0Cart and inve1_cart
      // compose rotations of pdeltaCart, then of q0
      // euler rotation angles

      let pdeltaCart = mversor.delta(state.inve0Cart, state.inve1_cart)
      let q1 = mversor.multiply(state.q0, pdeltaCart)
      let r1 = mversor.rotation(q1) // in degrees
      // -----------------

      state.rotInDrag_grads = r1
    }

    // ....................... dragended
    function dragended () {
      if (!state.grabbed) return
      state.grabbed = false
      if (!state.moved) return

      state.vel_spher = [

        (state.cPos[1] - state.pPos[1]) * state.mult,
        (state.cPos[0] - state.pPos[0]) * state.mult,

      ]
      state.timer = requestAnimationFrame(momentum)
    }

    // ....................... momentum
    function momentum () {
      if (Math.abs(state.vel_spher[0]) < state.epsilon && Math.abs(state.vel_spher[1]) < state.epsilon) return

      state.vel_spher[0] *= state.decay
      state.vel_spher[1] *= state.decay

      if (state.timer) state.timer = requestAnimationFrame(momentum)
    }

    // ....................... enty
    function enty () {}
    enty.dragstarted = dragstarted
    enty.dragged = dragged
    enty.control = control
    enty.reset = reset

    enty.projection = _ => {
      if (_ !== undefined) {
        state.projection = _.projection
        return enty
      } else {
        return state.projection
      }
    }

    // enty.rotation = _ => {
    enty.rotation = () => {
      // if (_ !== undefined) {
      // state.rotation = _
      // return enty
      // } else {
      return mgeom.add(state.rotInDrag_grads, state.rotAtInit_grads)
      // return mgeom.add([0,0,0], state.rotAtInit_grads)
      // }
    }

    return enty
  }

  exports.ctlVersor = ctlVersor
}))
