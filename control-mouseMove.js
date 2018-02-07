/*******************************************
   * @controlMouseMove
	 *
   **/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.controlMouseMove = global.controlMouseMove || {})))
}(this, function (exports) {
  'use strict'

  function controlMouseMove (payload) {
    let stace = {}

    stace.domNode = null
    stace.width = null
    stace.height = null

    var currentListeners = []
    var nextListeners = currentListeners

    function ensureCanMutateNextListeners () {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice()
      }
    }

    function pauseEvent (e) {
      if (e.stopPropagation) e.stopPropagation()
      if (e.preventDefault) e.preventDefault()
      e.cancelBubble = true
      e.returnValue = false
      return false
    }
    /*******************************************
   * @controlAction
	 *
   **/
    function controlAction (_) {
      console.log('controlAction', _)			// _ : div id:wireframe

      var e = d3.event
      pauseEvent(e)

      var listeners = currentListeners = nextListeners
      for (var i = 0; i < listeners.length; i++) {
        listeners[i](e)
      }
    }
    /*******************************************
   * @enty
	 *
   **/
    function enty () {}

    /*******************************************
   * @domNode
	 *
   **/
	 enty.domNode = function domNode (domNode) {
      if (domNode === undefined) return stace.domNode
      stace.domNode = domNode
      return enty
    }

    /*******************************************
   * @control
	 *
   **/
    enty.control = function control (svg) {
      // svg.on('mousedown', 	function() {controlAction(this)})
      return enty
    }
    /*******************************************
   * @subscribe
	 *
   **/
    enty.subscribe = function subscribe (listener, domNode) {
      if (typeof listener !== 'function') {
        throw new Error('Expected listener to be a function.')
      }
      // var isSubscribed = true
      // ensureCanMutateNextListeners()
      // nextListeners.push(listener)
      // return function unsubscribe() {
      // if (!isSubscribed) {
      // return
      // }

      // isSubscribed = false

      // ensureCanMutateNextListeners()
      // var index = nextListeners.indexOf(listener)
      // nextListeners.splice(index, 1)
      // }

      enty.domNode(domNode.node())
      stace.domNode.addEventListener('mousemove', listener)	// event listener
    }

    return enty
  }

  exports.controlMouseMove = controlMouseMove
}))
