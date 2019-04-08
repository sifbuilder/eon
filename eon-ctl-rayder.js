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
      // renderSvg,
      renderPortview,
    ] = await Promise.all([
      // __eo('xs').r('svg'),
      __eo('xs').r('portview'),
    ])

    let renderSvg = __eo('renderSvg')


    let state = {
      showpos: false,
      grabbed: false,
      domNode: undefined, // renderSvg.svg()
    }

    let getPos = renderPortview.getPos // event position

    // ............................. mouseDownListener
    function mouseDownListener (event) {
      let e = event
      state.moved = false // not moved yet
      let pos = getPos(e) // mouse position
      if (state.showpos && 1) console.log('pos:', pos)
      enty.setGrabbed(pos)
    }

    // ............................. mouseMoveListener
    function mouseMoveListener (event) {
      if (!enty.getGrabbed()) return

      let e = event
      let pos = getPos(e) //  d3.mouse(this)

      let g = enty.getGrabbed()

      let dx = pos[1] - g[1], // _e_1
        dy = pos[0] - g[0]

      if (!state.moved) {
        if (dx * dx + dy * dy < state.moveSpan) {
          return
        }
        state.moved = true // moved
      }

      enty.setGrabbed(pos)
      state.lastMoveTime = Date.now()
    }

    // ............................. mouseUpListener
    function mouseUpListener (event) {
      if (!enty.getGrabbed()) return
      enty.setGrabbed(false)
    }

    // ............................. subscribe
    let subscribe = function (listener, domNode, sensor) {
      if (typeof listener !== 'function') throw new Error('Listener to be function')

      // listener: {mousedown, mousemove, mouseup}
      domNode.node().addEventListener(sensor, listener)
    }

    // ............................. controlrayder
    let control = function (domNode) {
      state.domNode = renderSvg.svg() // _e_
      enty.domNode(domNode)

      subscribe(mouseDownListener, state.domNode, 'mousedown')
      subscribe(mouseMoveListener, state.domNode, 'mousemove')
      subscribe(mouseUpListener, state.domNode, 'mouseup')
    }

    // ............................. enty
    let enty = {}

    enty.domNode = _ => (_ !== undefined) ? (state.domNode = _, enty) : state.domNode
    enty.showpos = _ => (_ !== undefined) ? (state.showpos = _, enty) : state.showpos

    enty.getGrabbed = function () {
      return state.grabbed
    }
    enty.setGrabbed = function (_, by) {
      state.grabbed = _
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
