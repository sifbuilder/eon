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
    let inits = {
      decay: 0.85,
      mult_radians: 2e-3, // rotInDrag_radians factor
      rotInit_radians: [0, 0, 0],

      mult_degrees: 2e-5, // rotInDrag_rads factor
      rotInit_degrees: [0, 0, 0],

      timeSpan: 200,
      moveSpan: 16,
    }

    let xsign = 1 //  1 if x goes left to right
    let ysign = -1 // 1 if y goes up down

    // ..................
    // let = {
    let
      projection = d3geo.geoOrthographic()
        .rotate([0, 0])
        .translate([0, 0])
        .scale(1),

      rotAccum_radians = [0, 0, 0],
      rotInDrag_radians = [0, 0, 0], // rotInDrag_radians in radians
      rotVel_radians = [0, 0, 0], // [-6e-3,7.6e-3,2.13e-3],   // [0,0,0],
      vel_radians = [0, 0, 0], // from dragEnd to momemtum

      rotAccum_degrees = [0, 0, 0],
      rotInDrag_degrees = [0, 0, 0],
      rotInitial_degrees = [0, 0, 0],
      rotVel_degrees = [0, 0, 0], // [-6e-3,7.6e-3,2.13e-3],   // [0,0,0],
      vel_degrees = [0, 0, 0],

      position = false,
      moved = false,

      lastMoveTime = null,
      timer = null,

      c0 = null, // Mouse cartesian position invprojected
      r0_degrees = null, // Projection rotation as Euler angles at start
      q0 = null, // Quaternion. Projection rotation
      p0 = null, // Mouse position (spher)
      dtc = null, // Distance initial dot to center untransformed
      s1 = null, // previous position
      s2 = null // current position

    let s0,
      v0,
      v1,
      r1,
      r2_zero,
      r1_zero,
      velocity,
      q1,
      q2,
      c1,
      inv,
      qd01,
      qd1,
      qd2,
      r0,
      preposition
    // }



    // .................. dragstarted
    function dragstarted () {
      let e = d3selection.event

      if (position) return // drag ongoing

      stopMomentum()

      moved = false // not moved yet
      position = getPos(e)

      s2 = position // present
      s1 = s2 // present first
      s0 = s1 // current

      // Returns Cartesian coordinates [x, y, z] given spherical coordinates [λ, φ]
      v0 = muonVersor.cartesian(projection.invert(position))
      r0 = projection.rotate()  // degrees
      q0 = muonVersor(r0)




    }


    // .................. dragged
    function dragged () {
      if (!position) return

      let e = d3selection.event

      preposition = position
      position = getPos(e)

      if (!moved) {
        let sd = [ position[1] - preposition[1], position[0] - preposition[0] ]
        let sdist = sd[0] * sd[0] + sd[1] * sd[1]
        if (sdist < inits.moveSpan) return
        moved = true // moved
        rotInDrag_degrees = inits.rotInit_degrees
      }


      inv = projection.rotate(r0).invert(position)
      if (isNaN(inv[0])) return
      v1 = muonGeom.cartesian(inv)
      q1 = muonVersor.multiply(q0, muonVersor.delta(v0, v1)),
      r1 = muonVersor.rotation(q1)
      rotInDrag_degrees = r1

      let inv01 = projection.rotate(r0).invert(preposition)
      let v01 = muonGeom.cartesian(inv01)
      qd01 = muonVersor.delta(v01, v1) 


    }

    // .................. dragended
    function dragended () {

      if (!position) return
      position = false
      if (!moved) return

      vel_degrees = muonVersor.rotation(qd01) // vel v0-c1

      timer = requestAnimationFrame(momentum)
    }

    // .................. momentum
    function momentum () {
      vel_degrees[0] *= inits.decay
      vel_degrees[1] *= inits.decay

      rotInDrag_degrees[0] += vel_degrees[0]
      rotInDrag_degrees[1] += vel_degrees[1]

      if (timer) timer = requestAnimationFrame(momentum)
    }

    // .................. enty
    let enty = function (p = {}) {
      let rotInit_degrees = p.rotInit
      rotAccum_degrees = rotInit_degrees || inits.rotInit_degrees

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
        projection = _.projection // .projection
        return enty
      } else {
        return projection
      }
    }

    enty.rotation = () => {


      // let res = [0,0,0]
      // if (_v10 !== undefined && _v11 !== undefined ) {
        // res = muonVersor.rotation(
          // muonVersor.multiply(_q10, muonVersor.delta(_v10, _v11, _r1 * 1000))
        // )
        // if (1 && 1) console.log('res', res)
      // }


      let res = muonGeom.add(
        rotAccum_degrees,
        rotInDrag_degrees)
      return res
    }

    return enty
  }

  exports.ctlVersor = ctlVersor
}))
