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

  let controlRaycaster = function controlRaycaster (__mapper = {}) {
    
    let f = __mapper('props')()

    let raycaster = new THREE.Raycaster()

    let state = {
      mouse: new THREE.Vector2(),
      domNode: null
    }
    state.mouse.x = -2 // Initialize off canvas
    state.mouse.y = -2

    /*******************************************
   *      @listerner
   *
   */
    let listerner = function (event) {
      
      let domElem = enty.domNode()
      let width = domElem.getBoundingClientRect().width
      let height = domElem.getBoundingClientRect().height

      const offset = getOffset(domElem),
        relPos = {
          x: event.pageX - offset.left,
          y: event.pageY - offset.top
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

    /*******************************************
   *      @enty
   *
   */
    let enty = () => enty

    enty.domNode = _ => (_ !== undefined) ? (state.domNode = _, enty) : state.domNode
    
    enty.control = function (domNode) {
      enty.domNode(domNode)
      domNode.addEventListener('mousemove', listerner) // event listener
    }

    enty.mouse = () => state.mouse

    return enty
  }

  exports.controlRaycaster = controlRaycaster
}))
