/***********
   *    @ctlRayder
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.ctlRayder = global.ctlRayder || {})))
}(this, function (exports) {
  'use strict'

  // ... ** **
  // ... ### refs
  // ... * https://developer.mozilla.org/en-US/docs/Web/API/Touch_events

  async function ctlRayder (__eo) {
    let [
      d3,
      renderSvg,
      renderPortview,
    ] = await Promise.all([
      __eo('xs').b('d3'),
      __eo('xs').r('svg'),
      __eo('xs').r('portview'),
    ])

    // let d3selection = d3
    // let renderSvg = __eo('renderSvg')

    let mouse = {
      x: -2, // Initialize off canvas
      y: -2,
    }

    let pointer = mouse
    let touch = {}
    let domNode = renderSvg.svg()
    // let domNode

    let getPos = renderPortview.getPos // event position
    let xsign = 1 //  1 if x goes left to right
    let ysign = -1 // 1 if y goes up down

    let state = {
      pointer,
      mouse,
      touch,
      domNode,
    }


    let grabbed = false

    let viewScreenPrt = renderPortview.viewScreenPrt()

    // ............................. projector
    function projector (event) {
      if (event.type === 'mousemove') {
        let t = viewScreenPrt.invert([event.x, event.y])

        state.mouse.x = t[0]
        state.mouse.y = t[1]

        state.pointer.x = t[0]
        state.pointer.y = t[1]
      } else if (event.type === 'touchmove') {
        let touch = event.changedTouches[0]

        let t = viewScreenPrt.invert([touch.clientX, touch.clientY])

        state.mouse.x = t[0]
        state.mouse.y = t[1]

        state.pointer.x = t[0]
        state.pointer.y = t[1]
      }
    }


    // ............................. mouseDownListener
    function mouseDownListener (event) {
      if (1 && 1) console.log(' ************** event', event)

      let e = event
      state.moved = false // not moved yet
      let pos = getPos(e) // mouse position
            if (1 && 1) console.log('mouseDownListener') 
      enty.setGrabbed(pos)
    }

    // ............................. mouseMoveListener
    function mouseMoveListener (event) {
      if (!enty.getGrabbed()) return

      let e = event
      let pos = getPos(e) //  d3.mouse(this)
    

      let g =  enty.getGrabbed()
      let dx = pos[1] - g[1], // _e_1
          dy = pos[0] - g[0]
          

      if (!state.moved) {
        if (dx * dx + dy * dy < state.moveSpan) {
          if (1 && 1) console.log('short move')
          return
        }
        state.moved = true // moved
      }

      enty.setGrabbed(pos)
      state.lastMoveTime = Date.now()
    }

    // ............................. mouseUpListener
    function mouseUpListener (event) {
      if (1 && 1) console.log('mouseUpListener', state)      
      if (! enty.getGrabbed()) return
      if (1 && 1) console.log('mouseUpListener')    
      enty.setGrabbed(false)
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

      subscribe(mouseDownListener, state.domNode, 'mousedown')
      subscribe(mouseMoveListener, state.domNode, 'mousemove')
      subscribe(mouseUpListener, state.domNode, 'mouseup')

    }

    // ............................. enty
    let enty = {}

    enty.domNode = _ => (_ !== undefined) ? (state.domNode = _, enty) : state.domNode

    enty.getGrabbed = function() {

      return grabbed
    }
    enty.setGrabbed = function(_,by) {
      grabbed = _
    }

    enty.mouse = () => state.mouse
    enty.touch = () => state.touch
    enty.pointer = () => state.pointer

    enty.control = control
    enty.event = _ => _ !== undefined ? (state.event = _, enty) : state.event

    enty.mouseDown = _ => (_ !== undefined) ? (state.mouseDown = _, enty) : state.mouseDown
    enty.mouseDownShared = _ => (_ !== undefined) ? (state.mouseDownShared = _, enty) : state.mouseDownShared
    enty.mouseMove = _ => (_ !== undefined) ? (state.mouseMove = _, enty) : state.mouseMove
    enty.mouseUp = _ => (_ !== undefined) ? (state.mouseUp = _, enty) : state.mouseUp

    enty.touchStart = _ => (_ !== undefined) ? (state.touchStart = _, enty) : state.touchStart
    enty.touchStartShared = _ => (_ !== undefined) ? (state.touchStartShared = _, enty) : state.touchStartShared
    enty.touchMove = _ => (_ !== undefined) ? (state.touchMove = _, enty) : state.touchMove
    enty.touchEnd = _ => (_ !== undefined) ? (state.touchEnd = _, enty) : state.touchEnd

    return enty
  }

  exports.ctlRayder = ctlRayder
}))
