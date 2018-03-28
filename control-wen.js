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
    
    let r = __mapper('xs').r('renderport'),
      mversor = __mapper('xs').m('versor')(),
      mgeom = __mapper('xs').m('geom')

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

    
    function rebase () {     
      state.rotInDrag = [0, 0, 0] // reset to default rotation
    }

    let state = {

      // projection: null, // __mapper('xs').g('uniwen'), // _e_tbd
      projection: d3.geoOrthographic()
        .rotate([0, 0])
        .translate([0, 0])
        .scale(1),
        
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
      cPos: null,   // current position
      pPos: null   // previous position

    }

    
    let getPos = r.getPos // event position

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
      
      state.p0 = state.grabbed // d3.mouse(this) // initial position in geometric space
     
      let projection = state.projection
      if (projection.invert !== undefined && projection.rotate !== undefined) {
         if (1 && 2) console.log('projection misses invert or rotate')        
      }

       
      state.pPos = state.p0 // previous position
      state.cPos = state.pPos // current position

      state.rotAccum = mgeom.add(state.rotAccum, state.rotInDrag) // rotation
      rebase()

    }

    // dragged  listener
    let dragged = function () {
    
      if (!state.grabbed) return

      let e = d3.event
      let pos = getPos(e) //  d3.mouse(this)

      let ipos = pos
      
      let xsign = 1 //  y goes botton-up ?
      let ysign = 1 //  x goes left to right ?
      let dx = xsign * (ipos[1] - state.grabbed[1]),
          dy = ysign * (ipos[0] - state.grabbed[0])

      if (!state.moved) {
        if (dx * dx + dy * dy < state.moveSpan) return
        state.moved = true // moved
        state.autoRot = false
        state.rotInDrag = inits.rotInit
        rebase()
      }
      state.lastMoveTime = Date.now()
      state.pPos = state.cPos
      state.cPos = ipos
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
      
      let xsign = 1 //  y goes botton-up ?
      let ysign = 1 //  x goes left to right ?
      state.vel = [ // velocity

        xsign *  (state.cPos[1] - state.pPos[1]) * inits.mult,
        ysign * (state.cPos[0] - state.pPos[0]) * inits.mult
        
      ]

      state.timer = requestAnimationFrame(momentum)
    }

    function momentum () {
      if (Math.abs(state.vel[0]) < inits.epsilon && Math.abs(state.vel[1]) < inits.epsilon) return
        state.vel[0] *= inits.decay 
        state.vel[1] *= inits.decay
        
        state.rotInDrag[0] += state.vel[0] 
        state.rotInDrag[1] -= state.vel[1]
        
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
