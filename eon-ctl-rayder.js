/***********
   *    @ctlRayder
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.ctlRayder = global.ctlRayder || {})))
}(this, function (exports) {
  'use strict'

// # eon-control-rayder
// ** **
// ### refs
// * https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
// # license
// MIT

  async function ctlRayder (__mapper) {
    let [
      d3,
      rsvg,
      rrenderport,
    ] = await Promise.all([
      __mapper('xs').b('d3'),
      __mapper('xs').r('svg'),
      __mapper('xs').r('renderport'),
    ])

    let d3selection = d3

    let mouse = {
      x: -2, // Initialize off canvas
      y: -2,
    }

    let pointer = mouse
    let touch = {}
    let domNode = rsvg.svg()

    let getPos = rrenderport.getPos // event position
    let xsign = 1 //  1 if x goes left to right
    let ysign = -1 // 1 if y goes up down

    let state = {
      pointer,
      mouse,
      touch,
      domNode,
    }

    state.grabbed = false

    let cameraProjer = rrenderport.cameraProjer()

    // ............................. projector
    function projector (event) {
      if (event.type === 'mousemove') {
        let t = cameraProjer.invert([event.x, event.y])

        state.mouse.x = t[0]
        state.mouse.y = t[1]

        state.pointer.x = t[0]
        state.pointer.y = t[1]
     
      } else if (event.type === 'touchmove') {
        let touch = event.changedTouches[0]

        let t = cameraProjer.invert([touch.clientX, touch.clientY])

        state.mouse.x = t[0]
        state.mouse.y = t[1]

        state.pointer.x = t[0]
        state.pointer.y = t[1]
      }
    }

    // ............................. touchStartListener
    function touchStartListener (event) {
      event.preventDefault()
      enty.touchStart(1)
      enty.touchStartShared(1)
      enty.event(event)
    }

    // ............................. touchMoveListener
    function touchMoveListener (event) {
      event.preventDefault()
      enty.touchMove(1)
      enty.touchStartShared(1)
      enty.event(event)
      projector(event)
    }

    // ............................. touchEndListener
    function touchEndListener (event) {
      enty.touchStart(0)
      enty.touchStartShared(0)
      enty.event(event)
    }

    // ............................. mouseDownListener
    function mouseDownListener (event) {
      let e = event
      state.moved = false // not moved yet
      let pos = getPos(e) // mouse position
console.log('pos', pos)
      state.grabbed = pos
    }

    // ............................. mouseMoveListener
    function mouseMoveListener (event) {
      if (!state.grabbed) return
    

      let e = event
      let pos = getPos(e) //  d3.mouse(this)
      
      let dx = xsign * (pos[1] - state.grabbed[1]),
        dy = ysign * (state.grabbed[0] - pos[0])

      if (!state.moved) {
        if (dx * dx + dy * dy < state.moveSpan) return
        state.moved = true // moved
      }
      
      state.grabbed = pos
      state.lastMoveTime = Date.now()
    }

    // ............................. mouseUpListener
    function mouseUpListener (event) {
      if (!state.grabbed) return
      state.grabbed = false
      if (!state.moved) return
    }

    // ............................. subscribe
    let subscribe = function (listener, domNode, sensor) {
      if (typeof listener !== 'function') throw new Error('Listener to be function')
        
      // listener: {mousedown, mousemove, mouseup}
      
      domNode.node().addEventListener(sensor, listener) 
    }

    // ............................. controlrayder
    let control = function (domNode) {
      enty.domNode(domNode)

      subscribe(mouseUpListener, state.domNode, 'mouseup')
      subscribe(mouseDownListener, state.domNode, 'mousedown')
      subscribe(mouseMoveListener, state.domNode, 'mousemove')

      // subscribe(touchStartListener, state.domNode, 'touchstart')
      // subscribe(touchMoveListener, state.domNode, 'touchmove')
      // subscribe(touchEndListener, state.domNode, 'touchend')
    }

    // ............................. enty
    let enty = {}

    enty.domNode = _ => (_ !== undefined) ? (state.domNode = _, enty) : state.domNode

    enty.grabbed = () => {
        return state.grabbed
    }

    enty.mouse = () => state.mouse
    enty.touch = () => state.touch
    enty.pointer = () => state.pointer //

    enty.control = control
    enty.event = _ => _ !== undefined ? (state.event = _, enty) : state.event

    // enty.mouseDown = _ => (_ !== undefined) ? (state.mouseDown = _, enty) : state.mouseDown
    // enty.mouseDownShared = _ => (_ !== undefined) ? (state.mouseDownShared = _, enty) : state.mouseDownShared
    // enty.mouseMove = _ => (_ !== undefined) ? (state.mouseMove = _, enty) : state.mouseMove
    // enty.mouseUp = _ => (_ !== undefined) ? (state.mouseUp = _, enty) : state.mouseUp

    // enty.touchStart = _ => (_ !== undefined) ? (state.touchStart = _, enty) : state.touchStart
    // enty.touchStartShared = _ => (_ !== undefined) ? (state.touchStartShared = _, enty) : state.touchStartShared
    // enty.touchMove = _ => (_ !== undefined) ? (state.touchMove = _, enty) : state.touchMove
    // enty.touchEnd = _ => (_ !== undefined) ? (state.touchEnd = _, enty) : state.touchEnd

    return enty
  }

  exports.ctlRayder = ctlRayder
}))
