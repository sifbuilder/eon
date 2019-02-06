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

  async function ctlVersor (__eo = {}) {
    let [
      d3,
      d3geo,
      muonGeom,
      muonVersor,
      renderPortview,
    ] = await Promise.all([
      __eo('xs').b('d3'),
      __eo('xs').b('d3-geo'),
      __eo('xs').m('geom'),
      __eo('xs').m('versor'),
      __eo('xs').r('portview'),
    ])

    let d3drag = d3
    let d3selection = d3
    let getPos = renderPortview.getPos // event position

    function tick () {
      if (timer) timer = requestAnimationFrame(tick)
    }

    function stopMomentum () { cancelAnimationFrame(timer); timer = null }

    // .................. dragControl
    let dragControl = {
      dragstarted,
      dragged,
      dragended,

    }

    // .................. start drag control
    let control = elem => elem.call(d3drag.drag().on('start', dragControl.dragstarted).on('drag', dragControl.dragged).on('end', dragControl.dragended))

    // .................. stop drag control
    let reset = elem => elem.call(d3drag.drag().on('start', null).on('drag', null).on('end', null))

    // .................. inits

    const
      decay = 0.85,
      moveSpan = 16

    let
      projection = d3geo.geoOrthographic() // default projection
        .rotate([0, 0])
        .translate([0, 0])
        .scale(1),
      rotAccum_degrees = [0, 0, 0], // rotation accumulated from previous drags
      rotInDrag_degrees = [0, 0, 0], // rotation in current drag
      vel_degrees = [0, 0, 0],
      position = false, // position in view coordinates while draggging
      preposition, // position in view coordinates before current drag
      moved = false, // move is effective while dragging
      timer = null, // host animation frame
      v0, // cartesian coordinates at start of drag [x, y, z]
      v1, // cartesian coordinates during drag
      v10, // cartesian coordinates before current in drag
      inv0, // spherical coordinates [lam, fi] at drag start
      inv, // spherical coordinates [lam, fi] while dragging
      r0, // rotation at the beginning of draft. used during drag
      r1, // rotation to get to new spherical
      q1, // quaternion from drag start to current drag
      q10 // quaternion from previous to drag current drag

    // .................. dragstarted
    function dragstarted () {
      let e = d3selection.event

      if (position) return // wait while drag ongoing

      stopMomentum()

      moved = false // not moved yet
      position = getPos(e) // get position after view projection

      r0 = projection.rotate() // projection rotation in degrees
      inv0 = projection.rotate(r0).invert(position) // spherical coordinates [λ, φ]
      v0 = muonVersor.cartesian(inv0) // cartesian coordinates [x, y, z]

      v1 = v0 // initialize drag cartesian
      inv = inv0 // initialize drag spherical

      rotAccum_degrees = muonGeom.add( // ctl rotation since instance in z
        rotAccum_degrees,
        rotInDrag_degrees)
      rotInDrag_degrees = [0, 0, 0] // reset drag rotation
    }

    // .................. dragged
    function dragged () {
      if (!position) return

      let e = d3selection.event
      preposition = position // stash view position
      position = getPos(e) // view position from screen event
      if (!moved) {
        let sd = [ position[1] - preposition[1], position[0] - preposition[0] ]
        let sdist = sd[0] * sd[0] + sd[1] * sd[1] // distance in pixels
        if (sdist < moveSpan) return
        moved = true // moved
      }

      v10 = v1 // stash cartesian before update

      inv = projection.rotate(r0).invert(position) // s
      if (isNaN(inv[0])) return
      v1 = muonGeom.cartesian(inv) // update cartesian
      q1 = muonVersor.delta(v0, v1) // quaternion from drag start
      r1 = muonVersor.rotation(q1)

      rotInDrag_degrees = r1 //  rotation from start for prerotation

      q10 = muonVersor.delta(v10, v1) // quaternion from consecutive in drag for velocity
    }

    // .................. dragended
    function dragended () {
      if (!position) return
      position = false
      if (!moved) return

      vel_degrees = muonVersor.rotation(q10) // vel v0-c1
      timer = requestAnimationFrame(momentum)
    }

    // .................. momentum
    function momentum () {
      vel_degrees[0] *= decay
      vel_degrees[1] *= decay

      rotInDrag_degrees[0] += vel_degrees[0]
      rotInDrag_degrees[1] += vel_degrees[1]

      if (timer) timer = requestAnimationFrame(momentum)
    }

    // .................. enty
    let enty = function () {
      timer = requestAnimationFrame(tick)

      return enty
    }

    enty.dragstarted = dragstarted
    enty.dragged = dragged
    enty.dragended = dragended

    enty.control = control
    enty.reset = reset

    enty.projection = _ => {
      if (_ !== undefined) {
        projection = _.projection
        return enty
      } else {
        return projection
      }
    }

    enty.rotation = () => {
      let res = muonGeom.add(
        rotAccum_degrees,
        rotInDrag_degrees)
      return res
    }

    return enty
  }

  exports.ctlVersor = ctlVersor
}))
