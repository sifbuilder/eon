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

        rotation: [0, 0, 0],

        v0: null, // Mouse cartesian position invprojected
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

    // dragstarted listener
    let dragstarted = function () {

if (0 && 1) console.log("rotation begin", state.projection.rotate().map(d => d.toPrecision(2)))

      let e = d3.event

      let projection = state.projection

      if (projection.invert === undefined
        || projection.rotate === undefined) if (2 && 2) console.error("invert")

      state.p0 = getPos(e) // d3.mouse(this)

      let inve0 = projection.invert(state.p0) // spherical invert mouse position
      if (inve0 === undefined) if (2 && 2) console.error("inve0")

      state.v0 = mgeom.cartesian(inve0)



      // at start rotation is given by projection
      state.r0 = projection.rotate()      // rotation

      state.q0 = mversor(state.r0) // versor takes degrees


    }

    // dragged  listener
    let dragged = function () {
      let e = d3.event
if (0 && 1) console.log("rotation move a", state.projection.rotate().map(d => d.toPrecision(2))) 
      let proj = state.projection

      if (proj.invert === undefined
        || proj.rotate === undefined) if (2 && 2) console.error("invert")

      if (state.v0 === undefined || state.r0 === undefined) if (2 && 2) console.error("v0")

      // rotate projection to start of drag movement
      if (0 && 1) console.log("rotate a", proj.rotate())

      let inve0 = proj.rotate(state.r0).invert(getPos(e))
      // let inve0 = proj.invert(getPos(e))
      if (0 && 1) console.log("rotate b", proj.rotate())

      if (inve0 === undefined) if (2 && 2) console.error("inve0")

      let v1 = mgeom.cartesian(inve0)

      // q0 is versor from rotation at start of drag movement
      let q1 = mversor.multiply(state.q0, mversor.delta(state.v0, v1))
      let r1 = mversor.rotation(q1) // in degrees

      state.rotation = r1 // set global rotation in degrees

      // _ revert effect of rotate.invert _
      proj = state.rotation
if (0 && 1) console.log("rotation move b", state.projection.rotate().map(d => d.toPrecision(2))) 

    }

    // dragended  listener
    let dragended = function () {
if (0 && 1) console.log("rotation end", state.projection.rotate().map(d => d.toPrecision(2)))      
    }

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
    
        state.projection = f.cloneObj(_)
        return enty 
      } else {
        return state.projection
      }
    }

    
    return enty
  }

  exports.controlVersor = controlVersor
}))
