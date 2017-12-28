/*******************************************
   *    @controlVersor
   *
   */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.controlVersor = global.controlVersor || {})))
}(this, function (exports) { "use strict"

  let controlVersor = function controlVersor(__mapper = {}) {

    let f = __mapper("props")()
    let bversor = __mapper("xs").b("versor")()

    let drag = d3.drag()

    let state = Object.assign({})
    state.projection = d3.geoOrthographic()
    state.rotation = [0,0,0]

    state.v0 // Mouse position in Cartesian coordinates at start of drag gesture
    state.r0 // Projection rotation as Euler angles at start
    state.q0 // Projection rotation as versor at start

    state.p0  // Polar coordintes
    state.dtc // Distance initial dot to center untransformed

    // inside
    function inside(p) {
      let pt0 = p
      let k = state.projection.scale()
      let dx = state.projection.translate()[0]
      let dy = state.projection.translate()[1]
      let radians = Math.PI / 180
      let pt1 = [(pt0[0] - dx) / k, (dy - pt0[1]) / k]
      let x = pt1[0]
      let y = pt1[1]
      let dtc = Math.sqrt(x * x + y * y)    // abs < 1

      return Math.abs(dtc) < 1
    }

    let getPos = e => (e.touches && e.touches.length) ? (e = e.touches[0], [e.x,e.y]) : [e.x,e.y]

    // let control = elem => elem.call(drag.on("start", dragstarted).on("drag", dragged))
    let control = function (elem) {
        console.log(" control versor ")
        elem.call(drag.on("start", dragstarted).on("drag", dragged) )
    }

    let reset = elem => elem.call(drag.on("start", null).on("drag", null))
    
    // dragstarted
    let dragstarted = function() {
      let e = d3.event

      let projection = state.projection

      if (projection.invert !== undefined && projection.rotate !== undefined) {
        state.p0 = getPos(e) // d3.mouse(this)
        let inve0 = projection.invert(state.p0)
        if (inve0 !== undefined) {
          state.v0 = bversor.cartesian(inve0)
          state.r0 = projection.rotate()
          state.q0 = bversor(state.r0)
        }
      }
    }

    // dragged
    let dragged = function() {
      let e = d3.event

      let projection = state.projection

      if (projection.invert !== undefined && projection.rotate !== undefined) {

        if (state.v0 !== undefined && state.r0 !== undefined) {
          let inve0 = projection.rotate(state.r0).invert(getPos(e))
          if (inve0 !== undefined) {
            let v1 = bversor.cartesian(inve0)
            let q1 = bversor.multiply(state.q0, bversor.delta(state.v0, v1))
            let r1 = bversor.rotation(q1)

            state.rotation = r1             // set global rotate
          }
        }
      }
    }

    /*******************************************
   * @API
   *
   */
    let enty = function enty() {}

    enty.dragstarted = dragstarted
    enty.dragged = dragged
    enty.control = control
    enty.reset = reset

    enty.projection = _ => _ !== undefined ? (state.projection = _ , enty) : state.projection
    enty.rotation = _ => _ !== undefined ? (state.rotation = _ , enty) : state.rotation

    return enty

  }

  exports.controlVersor = controlVersor

}))
