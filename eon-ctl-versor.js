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

// # eon-ctl-versor
// ** **

// quaternion to rotate between inve0Cart and inve1_cart
// compose rotations of pdeltaCart, then of q0
// euler rotation angles

// # license
// MIT


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

    let getPos = rrenderport.getPos


    function tick () {
      if (state.timer) state.timer = requestAnimationFrame(tick)
    }

    function stopMomentum () { cancelAnimationFrame(state.timer); state.timer = null }


    // .................. rebase
    function rebase () {
      // state.rotInDrag_radians = [0, 0, 0] // reset to default rotation
    }

    // ....................... versorControl
    let versorControl = {
      dragstarted,
      dragged,
      dragended,

    }

    // start drag control
    let control = function (elem, props = {}) {
      elem.call(d3drag.drag()
        .on('start', versorControl.dragstarted)
        .on('drag', versorControl.dragged)
        .on('end', versorControl.dragended))
    }


    // .................. stop drag control
    let reset = elem => elem.call(d3drag.drag().on('start', null).on('drag', null).on('end', null))


    // .................. inits
    let inits = {
      decay: 0.95,

      mult_radians: 2e-3,                       // rotInDrag_radians factor
      mult_grads: 2e-3, // rotInDrag_rads factor

      rotInit_radians: [0, 0, 0],
      rotInit_grads: [0, 0, 0],

      timeSpan: 200,
      epsilon: 1e-3,
    }


    let xsign = 1 //  1 if x goes left to right
    let ysign = -1 // 1 if y goes up down

    // .................. state
    let state = {

      projection: d3geo.geoOrthographic()
        .rotate([0, 0])
        .translate([0, 0])
        .scale(1),

      rotAccum_grads: [0, 0, 0],
      rotInDrag_grads: [0, 0, 0],
      rotInitial_grads: [0, 0, 0],
      rotInit_rads: [0, 0, 0],

      grabbed: false,
      moved: false,

      rotVel_grads: [0, 0, 0], // [-6e-3,7.6e-3,2.13e-3],   // [0,0,0],
      vel_grads: [0, 0, 0],

      inve0Cart: null, // Mouse cartesian position invprojected
      r0_grads: null, // Projection rotation as Euler angles at start
      q0: null, // Quaternion. Projection rotation
      p0: null, // Mouse position (spher)
      dtc: null, // Distance initial dot to center untransformed

      timeSpan: 200,
      moveSpan: 16,
      epsilon: 1e-3,
      vel_grads: [0, 0, 0],
      lastMoveTime: null,
      timer: null,
      rotMatrix: null,
      cPos: null, // current position
      pPos: null, // previous position

    }


    // ....................... dragstarted
    function dragstarted () {
      let e = d3selection.event

      if (state.grabbed) return // drag ongoing

      stopMomentum()

      state.moved = false // not moved yet       // stopMomentum()
      state.grabbed = getPos(e) // mouse position

      state.p0 = state.grabbed  // initial position in geometric space

      let projection = state.projection
      console.assert(projection.invert !== undefined)
      console.assert(projection.rotate !== undefined)

      let inve0Spher = state.projection.invert(state.p0)
      state.inve0Cart = mgeom.cartesian(inve0Spher)

      state.r0_grads = state.projection.rotate() // rotation in proform/proj in degrees
      state.q0 = mversor(state.r0_grads) // quaternion of initial rotation

      state.rotAccum_grads =
            mgeom.add(
              state.rotAccum_grads,
              // state.rotInitial_grads) // rotation
              state.rotInDrag_grads) // rotation
      rebase()
    }

    // ....................... dragged
    function dragged () {
      if (!state.grabbed) return

      let e = d3selection.event

      state.p1 = getPos(e)

      if (!state.moved) {
        state.moved = true // moved // state.autoRot = false
        state.autoRot = false
        // state.rotAccum_grads = state.rotInitial_grads
        state.rotInDrag_grads = inits.rotInit_grads
        rebase()
      }

      state.inve1_spher = state.projection
        .rotate(state.r0_grads)
        .invert(state.p1)

      state.inve1_cart = mgeom.cartesian(state.inve1_spher)

      state.lastMoveTime = Date.now()
      state.pPos = state.cPos
      state.cPos = state.inve1_spher

      let pdeltaCart = mversor.delta(state.inve0Cart, state.inve1_cart)
      let q1 = mversor.multiply(state.q0, pdeltaCart)

      let r1 = mversor.rotation(q1) // in degrees

      state.rotInDrag_grads = r1
    }

    // ....................... dragended
    function dragended () {
      if (!state.grabbed) return
      state.grabbed = false
      if (!state.moved) return

      state.vel_grads = [ // velocity

        xsign * (state.cPos[1] - state.pPos[1]) * inits.mult_grads,
        ysign * (state.cPos[0] - state.pPos[0]) * inits.mult_grads,

      ]

      // state.timer = requestAnimationFrame(momentum)
    }

    // ....................... momentum
    function momentum () {

      if (Math.abs(state.vel_grads[0]) < state.epsilon && Math.abs(state.vel_grads[1]) < state.epsilon) return

      state.vel_grads[0] *= inits.decay
      state.vel_grads[1] *= inits.decay


      state.rotInDrag_grads[0] += state.vel_grads[0]
      state.rotInDrag_grads[1] -= state.vel_grads[1]


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
      // return mgeom.add(state.rotInDrag_grads, state.rotAccum_grads)
      return mgeom.add(state.rotInDrag_grads, [0,0,0])
      // return mgeom.add([0,0,0], state.rotAccum_grads)
      // }
    }

    return enty
  }

  exports.ctlVersor = ctlVersor
}))
