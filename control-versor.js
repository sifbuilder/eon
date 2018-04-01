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


    let f = __mapper('props')(),
      r = __mapper('xs').r('renderport'),
      mversor = __mapper('xs').m('versor')(),
      mgeom = __mapper('xs').m('geom')

      let versor = mversor // fil
      let d3Drag = d3
      let d3Selection = d3
      let d3Timer = d3

      let drag = d3.drag()

      let state = {

        projection: d3.geoOrthographic(),

        rotationInit_degrees: [0, 0, 0],
        rotation: [0, 0, 0],

        inve0_cart: null, // Mouse cartesian position invprojected
        r0: null, // Projection rotation as Euler angles at start
        q0: null, // Quaternion. Projection rotation
        p0: null, // Mouse position (polar)
        dtc: null // Distance initial dot to center untransformed
      }


    let getPos = e => (e.touches && e.touches.length) ? (e = e.touches[0], [e.x, e.y]) : [e.x, e.y]
    getPos = r.getPos

    // start drag control
    let control = elem => elem.call(drag.on('start', dragstarted).on('drag', dragged).on('end', dragended))

    // stop drag control
    let reset = elem => elem.call(drag.on('start', null).on('drag', null).on('end', null))

    // ///
    // dragstarted listener
    // //
    let dragstarted = function () {

      let e = d3.event

      let proj = state.projection

      if (proj.invert === undefined
        || proj.rotate === undefined) if (2 && 2) console.error("invert")

      state.p0 = getPos(e) // d3.mouse(this)

      
      // let inve0_spher = proj.invert(state.p0) // spherical invert mouse position
      let inve0_spher = proj.rotate(state.rotationInit_degrees).invert(state.p0) // spherical invert mouse position
      if (2 && 2 && inve0_spher === undefined) console.error("inve0_spher undefined")

      state.inve0_cart = mgeom.cartesian(inve0_spher)

      state.r0 = proj.rotate(state.rotationInit_degrees).rotate()      // rotation

      state.q0 = mversor(state.r0) // versor takes degrees


    }

    // dragged  listener
    let dragged = function () {
      let e = d3.event
      // if (0 && 1) console.log("rotation move a", state.projection.rotate().map(d => d.toPrecision(2)))
      let proj = state.projection

      if (proj.invert === undefined
        || proj.rotate === undefined) if (2 && 2) console.error("invert")
      if (state.inve0_cart === undefined || state.r0 === undefined) if (2 && 2) console.error("inve0_cart")

      let inve1_spher = proj.rotate(state.rotationInit_degrees).rotate(state.r0).invert(getPos(e))
      if (inve1_spher === undefined) if (2 && 2) console.error("inve1_spher")

      state.inve1_cart = mgeom.cartesian(inve1_spher)

      let q1 = mversor.multiply(state.q0, mversor.delta(state.inve0_cart, state.inve1_cart))
      let r1_degrees = mversor.rotation(q1) // in degrees

      state.rotation = r1_degrees // set global rotation in degrees

      // _ revert effect of rotate.invert _
if (1 && 1) console.log("state.rotation", state.rotation)

    }

    // dragended  listener
    let dragended = function () {}

    /*******************************************
   *    @enty
   */
    let enty = function enty () {}

    enty.dragstarted = dragstarted
    enty.dragged = dragged
    enty.control = control
    enty.reset = reset

    // enty.projection = _ => _ !== undefined ? (state.projection = _, enty) : state.projection
    enty.rotation = _ => _ !== undefined ? (state.rotation = _, enty) : state.rotation

    enty.projection = _ => {
      if (_ !== undefined) {
            state.projection = _.projection
            state.rotationInit_degrees = _.rotate || [0,0,0]

if (0 && 1) console.log(" ***** projection", state.projection)

        return enty
      } else {
        return state.projection
      }
    }


    return enty
  }

  exports.controlVersor = controlVersor
}))
