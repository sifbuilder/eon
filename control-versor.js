/*******************************************
   *    @controlVersor
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.controlVersor = global.controlVersor || {})))
}(this, function (exports) {
  'use strict'

  let controlVersor = function (__mapper = {}) {


    let r = __mapper('xs').r('renderport'),
      mversor = __mapper('xs').m('versor')(),
      mgeom = __mapper('xs').m('geom')

    let versor = mversor // fil
    let d3Drag = d3
    let d3Selection = d3
    let d3Timer = d3

    let drag = d3.drag()


    let getPos = e => (e.touches && e.touches.length) ? (e = e.touches[0], [e.x, e.y]) : [e.x, e.y]
    getPos = r.getPos

    // start drag control
    let control = elem => elem.call(drag.on('start', dragstarted).on('drag', dragged).on('end', dragended))

    // stop drag control
    let reset = elem => elem.call(drag.on('start', null).on('drag', null).on('end', null))

   /*******************************************
   *    @state
   *
   */   
    let state = {

      projection: d3.geoOrthographic(),

      rotation: [0, 0, 0],

      inve0_cart: null, // Mouse cartesian position invprojected
      r0: null, // Projection rotation as Euler angles at start
      q0: null, // Quaternion. Projection rotation
      p0: null, // Mouse position (polar)
      dtc: null // Distance initial dot to center untransformed
    }


  /*******************************************
   *    @dragstarted
   *
   */
    let dragstarted = function () {

      let e = d3.event

      let projection = state.projection

      if (projection.invert === undefined
        || projection.rotate === undefined) if (1 && 2) console.error("invert")

      // -----------------          
      state.p0 = getPos(e) // d3.mouse(this)

      let inve0_spher = projection.invert(state.p0)
      state.inve0_cart = mgeom.cartesian(inve0_spher)

      state.r0 = projection.rotate() // rotation in projection
      state.q0 = mversor(state.r0) // versor takes degrees
      // -----------------

    }

  /*******************************************
   *    @dragged
   *
   */
    let dragged = function () {
      let e = d3.event
      let proj = state.projection

      if (proj.invert === undefined
        || proj.rotate === undefined) if (1 && 2) console.error("invert")


      let inve1_spher = proj.rotate(state.r0).invert(getPos(e))
      let inve1_cart = mgeom.cartesian(inve1_spher)

      let q1 = mversor.multiply(state.q0, mversor.delta(state.inve0_cart, inve1_cart))
      let r1 = mversor.rotation(q1) // in degrees

      state.rotation = r1 // set global rotation in degrees

      // _ revert effect of rotate.invert _
      // proj = state.rotation


    }

  /*******************************************
   *    @dragended
   *
   */
    let dragended = function () {
       
    }

    /*******************************************
   *    @enty
   */
    let enty = function enty () {}

    enty.dragstarted = dragstarted
    enty.dragged = dragged
    enty.control = control
    enty.reset = reset

    enty.projection = _ => _ !== undefined ? (state.projection = _.projection, enty) : state.projection
    enty.rotation = _ => _ !== undefined ? (state.rotation = _, enty) : state.rotation

    return enty
  }

  exports.controlVersor = controlVersor
}))
