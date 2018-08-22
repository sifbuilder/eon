/*******************************************
   *    @ctlWen
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.ctlWen = global.ctlWen || {})))
}(this, function (exports) {
  'use strict'

  async function ctlWen (__mapper = {}) {
    let [
      d3,
      d3geo,
      mgeom,
      rrenderport,
    ] = await Promise.all([
      __mapper('xs').b('d3'),
      __mapper('xs').b('d3-geo'),
      __mapper('xs').m('geom'),
      __mapper('xs').r('renderport'),
    ])

    let d3drag = d3
    let d3selection = d3

    let getPos = rrenderport.getPos // event position

    function tick () {
      if (state.timer) state.timer = requestAnimationFrame(tick)
    }

    function stopMomentum () { cancelAnimationFrame(state.timer); state.timer = null }

    // .................. rebase
    function rebase () {
      state.rotInDrag_radians = [0, 0, 0] // reset to default rotation
    }


    // ....................... versorControl
    let versorControl = {
      dragstarted,
      dragged,
      dragended,

    }

    // .................. start drag control
    let control = elem => elem.call(d3drag.drag().on('start', versorControl.dragstarted).on('drag', versorControl.dragged).on('end', versorControl.dragended))

    // .................. stop drag control
    let reset = elem => elem.call(d3drag.drag().on('start', null).on('drag', null).on('end', null))


    // .................. inits
    let inits = {
      decay: 0.95,

      mult_radians: 2e-3,                       // rotInDrag_radians factor
      rotInit_radians: [0, 0, 0],

      timeSpan: 200,
      epsilon: 1e-3,
    }

    let xsign = 1 //  1 if x goes left to right
    let ysign = -1 // 1 if y goes up down

    // .................. state
    let state = {

      projection: () => d3geo.geoOrthographic()
        .rotate([0, 0])
        .translate([0, 0])
        .scale(1),

      rotAccum_radians: [0, 0, 0],
      rotInDrag_radians: [0, 0, 0], // rotInDrag_radians in radians

      grabbed: false,
      moved: false,

      rotVel_radians: [0, 0, 0], // [-6e-3,7.6e-3,2.13e-3],   // [0,0,0],
      vel_radians: [0, 0, 0],

      moveSpan: 16,
      autoRot: false,
      lastMoveTime: null,
      timer: null,
      rotMatrix: null,
      cPos: null, // current position
      pPos: null, // previous position

    }


    // .................. dragstarted listener
    function dragstarted () {
      // s: screen  state.sp, state.sq,
      // g: geographic
      // c: cartesian
      // q: quaternion
      // dP: delta present - rotAccum
      // dQ: delta current - rotInDrag


      let e = d3selection.event

      if (state.grabbed) return // drag ongoing

      stopMomentum()
      state.moved = false // not moved yet


      state.grabbed = getPos(e)

  state.sq = getPos(e)

      state.p0 = state.grabbed

  state.sp = state.sq


      state.pPos = state.p0 // previous position
      state.cPos = state.pPos // current position

      state.rotAccum_radians =
            mgeom.add(
              state.rotAccum_radians,
              state.rotInDrag_radians) // rotation

      rebase()  // rebase rotInDrag
    }

    // .................. dragged  listener
    function dragged () {
      if (!state.grabbed) return

      let e = d3selection.event
      // let pos = getPos(e) //  d3.mouse(this)


  state.sp = state.grabbed
  state.sq = getPos(e)


      // let dx = xsign * (pos[1] - state.grabbed[1]),
          // dy = ysign * (state.grabbed[0] - pos[0])


  // state.ds = [
        let dx =   xsign * (state.sq[1] - state.sp [1]),
            dy =   ysign * (state.sp[0] - state.sq[0])
      // ]
  // state.ddist = state.ds[0]  * state.ds[0]  + state.ds[1]  * state.ds[1]
  let ddist = dx  * dx  + dy * dy
  

      if (!state.moved) {
        // if (dx * dx + dy * dy < state.moveSpan) return
        if (ddist < state.moveSpan) return
        state.moved = true // moved
        state.autoRot = false
        
        state.rotInDrag_radians = inits.rotInit_radians
        rebase()
      }
      
      
      state.lastMoveTime = Date.now()
      
      // state.pPos = state.cPos
      // state.cPos = pos

      let r1 = [
        state.rotVel_radians[0] + dx * inits.mult_radians,
        state.rotVel_radians[1] + dy * inits.mult_radians,
        state.rotVel_radians[2] + 0,
      ]

      // let r1 = [
        // state.rotVel_radians[0] + state.ds[0] * inits.mult_radians,
        // state.rotVel_radians[1] + state.ds[1] * inits.mult_radians,
        // state.rotVel_radians[2] + 0,
      // ]

      state.rotInDrag_radians = r1
    }

    // .................. dragended
    function dragended () {
      if (!state.grabbed) return
      state.grabbed = false
      if (!state.moved) return

      
      // state.vel_radians = [ // velocity

        // xsign * (state.cPos[1] - state.pPos[1]) * inits.mult_radians,
        // ysign * (state.cPos[0] - state.pPos[0]) * inits.mult_radians,

      // ]      
      
      
      state.vel_radians = [ // velocity

        xsign * (state.sq[1] - state.sp[1]) * inits.mult_radians,
        ysign * (state.sq[0] - state.sp[0]) * inits.mult_radians,

      ]

      state.timer = requestAnimationFrame(momentum)
    }

    // .................. momentum
    function momentum () {

      if (Math.abs(state.vel_radians[0]) < inits.epsilon && Math.abs(state.vel_radians[1]) < inits.epsilon) return

      state.vel_radians[0] *= inits.decay
      state.vel_radians[1] *= inits.decay

      state.rotInDrag_radians[0] += state.vel_radians[0]
      state.rotInDrag_radians[1] -= state.vel_radians[1]

      if (state.timer) state.timer = requestAnimationFrame(momentum)

    }

    // .................. enty
    let enty = function (p = {}) {

      let rotInit_degrees = p.rotInit
      let rotInit_radians = mgeom.to_radians(rotInit_degrees)

      state.rotAccum_radians = rotInit_radians || inits.rotInit_radians

      state.timer = requestAnimationFrame(tick)

      return enty
    }

    enty.dragstarted = dragstarted
    enty.dragged = dragged
    enty.dragended = dragended

    enty.control = control
    enty.reset = reset

    enty.projection = _ => _ !== undefined ? (state.projection = _, enty) : state.projection

    enty.rotation = () => mgeom.add(state.rotAccum_radians, state.rotInDrag_radians)
                                  .map(mgeom.to_degrees)

    return enty
  }

  exports.ctlWen = ctlWen
}))
