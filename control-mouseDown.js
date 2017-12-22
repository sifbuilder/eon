/**********************
 *      @controlMouseDown
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.controlMouseDown = global.controlMouseDown || {})))
}(this, function (exports) { "use strict"

  function controlMouseDown(payload) {

    let state = {}
        state.domNode = null

    let currentListeners = []
    let nextListeners = currentListeners

    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice()
      }
    }

    function pauseEvent(e){
      if(e.stopPropagation) e.stopPropagation()
      if(e.preventDefault) e.preventDefault()
      e.cancelBubble=true
      e.returnValue=false
      return false
    }
    
    function controlAction(_) {

      let e = d3.event
      pauseEvent(e)

      let listeners = currentListeners = nextListeners
      for (let i = 0; i < listeners.length; i++) {
        listeners[i](e)
      }
    }
    /*******************************************
   * @enty
   *
   **/
    function enty() {}

    enty.domNode = function domNode(domNode) {

      if (domNode === undefined ) return state.domNode
      state.domNode = domNode
      return enty

    }

    enty.control = function control(svg) {
      return enty
    }

    enty.subscribe = function subscribe (listener, domNode) {

      if (typeof listener !== "function") {
        throw new Error("Expected listener to be a function.")
      }

      enty.domNode(domNode.node())
      state.domNode.addEventListener("mousedown", listener) // event listener

    }

    return enty
  }

  exports.controlMouseDown = controlMouseDown

}));
