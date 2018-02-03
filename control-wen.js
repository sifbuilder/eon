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
    let f = __mapper('props')(),
			mgeom = __mapper('xs').m('geom')

    let drag = d3.drag()



    function momentum () {
      if (Math.abs(vel[0]) < 0.001 && Math.abs(vel[1]) < 0.001) return
      vel[0] *= decay; vel[1] *= decay
      rotInDrag[0] += vel[0]; rotInDrag[1] += vel[1]
      if (timer) timer = requestAnimationFrame(momentum)
    }
	
		// reset to default rotation
    function rebase () {
      rotBase = rotMatrix
      rotInDrag = [0, 0, 0]
    }
		
    function tick () {
      if (autorotimer) autorotimer = requestAnimationFrame(tick)
    }

    let defaults = {},
      decay = 0.95,
      mult = 2e-3, // rotInDrag factor
      rotInit = [0, 0, 0] // [60,60,60],

    let grabbed = false,
      moved = false,
      cPos,
      pPos
			
    let state = {},
      rotVel = [0, 0, 0], // [-6e-3,7.6e-3,2.13e-3],   // [0,0,0],
      rotInDrag = [0, 0, 0], // rotInDrag in radians
      rotPreDrag = [0, 0, 0],
      rotAccum = [0, 0, 0],
      autoRot = false,
      vel = [0, 0, 0],
      moveSpan = 16,
      rotBase = [1, 0, 0, 0, 1, 0, 0, 0, 1], // identity matrix
      lastMoveTime,
      timer,
      autorotimer,
      rotMatrix

		 // get event position			
    let getPos = e => (e.touches && e.touches.length) ? (e = e.touches[0], [e.x, e.y]) : [e.x, e.y]

		 // start drag control		
    let control = elem => elem.call(drag.on("start", dragstarted).on("drag", dragged).on("end", dragended))

		 // stop drag control		
    let reset = elem => elem.call(drag.on('start', null).on('drag', null).on('end', null))

    function stopMomentum () { cancelAnimationFrame(timer); timer = null }

    // dragstarted listener		
    let dragstarted = function () {
      let e = d3.event

      if (grabbed) return // drag ongoing
      if (!e.touches) e.sourceEvent.preventDefault()
      stopMomentum()
      cPos = pPos = grabbed = getPos(e) // position from event
      moved = false // not moved yet
      rotAccum = mgeom.add(rotAccum, rotInDrag)
      rotInDrag = [0, 0, 0]
    }
		
    // dragged  listener
    let dragged = function () {
      let e = d3.event

      if (!grabbed) return
      let pos = getPos(e) //  d3.mouse(this)
      let dx = grabbed[1] - pos[1],
        dy = pos[0] - grabbed[0]
      if (!moved) {
        if (dx * dx + dy * dy < moveSpan) return
        moved = true // moved
        autoRot = false
        rotInDrag = [0, 0, 0]
        rebase()
      }
      lastMoveTime = Date.now()
      pPos = cPos
      cPos = pos
      rotInDrag = [
        rotVel[0] + dx * mult,
        rotVel[1] + dy * mult,
        rotVel[2] + 0
      ]
    }

    // dragended  listener		
    let dragended = function () {

      if (!grabbed) return
      grabbed = false
      if (!moved) return
      let f = Math.max(0, 1 - (Date.now() - lastMoveTime) / 200)
      vel = [(pPos[1] - cPos[1]) * mult * f, (cPos[0] - pPos[0]) * mult * f]

      timer = requestAnimationFrame(momentum)
    }

    /*******************************************
   *    @ENTY
   */
    let enty = function (p = {}) {
      rotInit = mgeom.to_radians(p.rotInit) || [0, 0, 0]
      autorotimer = requestAnimationFrame(tick)
      return enty
    }

    enty.dragstarted = dragstarted
    enty.dragged = dragged
    enty.dragended = dragended
    enty.control = control
    enty.reset = reset

    enty.mult = _ => _ !== undefined ? (mult = _, enty) : mult // effect multiplier
    enty.rotInDrag = _ => _ !== undefined ? (rotInDrag = mgeom.to_radians(_), enty) : rotInDrag.map(mgeom.to_degrees)
    enty.rotAccum = _ => _ !== undefined ? (rotAccum = mgeom.to_radians(_), enty) : rotAccum.map(mgeom.to_degrees)
    enty.rotVel = _ => _ !== undefined ? (rotVel = mgeom.to_radians(_), enty) : rotVel.map(mgeom.to_degrees)
    enty.rotInit = _ => _ !== undefined ? (rotInit = mgeom.to_radians(_), enty) : rotInit.map(mgeom.to_degrees)
		
    enty.rotation =  () => mgeom.add(rotAccum,rotInDrag).map(mgeom.to_degrees)
		

    return enty
  }

  exports.controlWen = controlWen
}))
