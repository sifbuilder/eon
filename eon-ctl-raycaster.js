/*******************************************
   *    @controlRaycaster
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.controlRaycaster = global.controlRaycaster || {})))
}(this, function (exports) {
  'use strict'

  // md: # md:{filename}
  // md: **returns mouse move coordinates in the unit square space**
  // md: called by r.webgl
  // md: r.webgl sets renderer.domElement and gets mouse
  // md: mouse on camera is then used to get ray intersection on items on canvas
  // md: ### getters/setters
  // md: domNode
  // md: ### getters
  // md: mouse
  // md: ### methods
  // md: control
  // md: usage: `control(domnode)`
  // md:
  // md: # license
  // md: MIT

  async function controlRaycaster (__mapper = {}) {
    let mouse = {
      x: -2, // Initialize off canvas
      y: -2,
    }

    let pointer = {
      x: -2,
      y: -2,
    }

    let touch = {}

    let domNode = null

    let state = {
      pointer,
      mouse,
      touch,
      domNode,
    }

    // ............................. subscribe
    let subscribe = function (listener, domNode, sensor) {
      if (typeof listener !== 'function') throw new Error('Listener to be function')

      enty.domNode(domNode)
      state.domNode.node().addEventListener(sensor, listener)
    }

    // ............................. listerner
    let projector = function (event) {
      let domElem = enty.domNode()
      let width = domElem.getBoundingClientRect().width
      let height = domElem.getBoundingClientRect().height

      const offset = getOffset(domElem), // {top: 0, left: 0}
        relPos = {
          x: event.pageX - offset.left,
          y: event.pageY - offset.top,
        }

      state.mouse.x = (relPos.x / width) * 2 - 1
      state.mouse.y = -(relPos.y / height) * 2 + 1

      function getOffset (el) {
        const rect = el.getBoundingClientRect(),
          scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
          scrollTop = window.pageYOffset || document.documentElement.scrollTop
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
      }
    }

    // ............................. control
    let control = function (domNode) {
      enty.domNode(domNode)

      state.domNode.addEventListener('mousemove', mouseMoveListener) // event listener
      // subscribe(mouseMoveListener, domNode, 'mousemove') // event listener
    }

    // ............................. mouseMoveListener
    function mouseMoveListener (event) {
      projector(event)
    }
    // ............................. enty
    let enty = () => enty

    // enty.domNode = _ => (_ !== undefined) ? (state.domNode = _, enty) : state.domNode
    enty.domNode = function (_) {
      if (_ !== undefined) {
        state.domNode = _
        return enty
      } else {
        return state.domNode
      }
    }

    enty.mouse = () => state.mouse
    enty.touch = () => state.touch
    enty.pointer = () => state.pointer //

    enty.control = control

    return enty
  }

  exports.controlRaycaster = controlRaycaster
}))
