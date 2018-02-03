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
    let mgeom = __mapper('xs').m('geom')

    let drag = d3.drag()

    function momentum () {
      if (Math.abs(state.vel[0]) < 0.001 && Math.abs(state.vel[1]) < 0.001) return
      state.vel[0] *= inits.decay; state.vel[1] *= inits.decay
      state.rotInDrag[0] += state.vel[0]; state.rotInDrag[1] += state.vel[1]
      if (state.timer) state.timer = requestAnimationFrame(momentum)
    }

    function tick () {
			state.rotation = mgeom.add(state.rotAccum, state.rotInDrag).map(mgeom.to_degrees)
      if (state.autorotimer) state.autorotimer = requestAnimationFrame(tick)
    }

    function stopMomentum () { cancelAnimationFrame(state.timer); state.timer = null }

    function rebase () {				// reset to default rotation
      state.rotInDrag = [0, 0, 0]
    }

    const inits = {
      decay: 0.95,
      mult: 2e-3, // rotInDrag factor
      rotInit: [0, 0, 0], // [60,60,60],
			moveSpan: 16,
			timeSpan: 200
    }

    let state = {
      grabbed: false,
      moved: false,
      rotVel: [0, 0, 0], // [-6e-3,7.6e-3,2.13e-3],   // [0,0,0],
      rotInDrag: [0, 0, 0], // rotInDrag in radians
      rotAccum: [0, 0, 0],
      rotation: [0, 0, 0],
      autoRot: false,
      vel: [0, 0, 0],
      lastMoveTime: null,
      timer: null,
      autorotimer: null,
      cPos: null,
      pPos: null
		}

    
    let getPos = e => (e.touches && e.touches.length) ? (e = e.touches[0], [e.x, e.y]) : [e.x, e.y]			// event position

    let control = elem => elem.call(drag.on('start', dragstarted).on('drag', dragged).on('end', dragended))	// start drag control

    let reset = elem => elem.call(drag.on('start', null).on('drag', null).on('end', null))

		// dragstarted listener
    let dragstarted = function () {		
      let e = d3.event

      if (state.grabbed) return // drag ongoing

      if (!e.touches) e.sourceEvent.preventDefault()
      stopMomentum()
      state.cPos = state.pPos = state.grabbed = getPos(e) // position from event
      state.moved = false // not moved yet
      state.rotAccum = mgeom.add(state.rotAccum, state.rotInDrag)
      state.rotInDrag = [0, 0, 0]
			
    }
    
		// dragged  listener
    let dragged = function () {		
      let e = d3.event

      if (!state.grabbed) return
			
      let pos = getPos(e) //  d3.mouse(this)
      let dx = state.grabbed[1] - pos[1], dy = pos[0] - state.grabbed[0]
      if (!state.moved) {
        if (dx * dx + dy * dy < inits.moveSpan) return
        state.moved = true // moved
        state.autoRot = false
        state.rotInDrag = [0, 0, 0]
        rebase()
      }
      state.lastMoveTime = Date.now()
      state.pPos = state.cPos
      state.cPos = pos
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
      let f = Math.max(0, 1 - (Date.now() - state.lastMoveTime) / inits.timeSpan)
      state.vel = [
					(state.pPos[1] - state.cPos[1]) * inits.mult * f,
					(state.cPos[0] - state.pPos[0]) * inits.mult * f ]

      state.timer = requestAnimationFrame(momentum)
    }

    /*******************************************
   *    @ENTY
   */
    let enty = function (p = {}) {
      inits.rotInit = mgeom.to_radians(p.rotInit)
      state.autorotimer = requestAnimationFrame(tick)
      return enty
    }

    enty.dragstarted = dragstarted
    enty.dragged = dragged
    enty.dragended = dragended
    enty.control = control
    enty.reset = reset

    enty.rotation = () => state.rotation

    return enty
  }

  exports.controlWen = controlWen
}))
