/**********************
   *    @ctlTouchEnd
   */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.ctlTouchEnd = global.ctlTouchEnd || {})))
}(this, function (exports) {
  'use strict'

  async function ctlTouchEnd (__eo = {}) {
    let [
      d3,
    ] = await Promise.all([
      __eo('xs').b('d3'),
    ])

    let d3selection = d3

    var currentListeners = []
    var nextListeners = currentListeners

    // ....................... ensureCanMutateNextListeners
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

    function controlAction (svg) {
      var e = d3selection.event
      pauseEvent(e)

      var listeners = currentListeners = nextListeners
      for (let i = 0; i < listeners.length; i++) {
        listeners[i](e)
      }
    }

    // ....................... enty
    function enty () {}

    // ....................... start
    enty.start = function (svg) {
      svg.on('touchend', function () { controlAction(this) })
      return enty
    }
    // ....................... subscribe
    enty.subscribe = function (listener) {
      if (typeof listener !== 'function') {
        throw new Error('Expected listener to be a function.')
      }
      var isSubscribed = true
      ensureCanMutateNextListeners()
      nextListeners.push(listener)
      return function unsubscribe () {
        if (!isSubscribed) {
          return
        }

        isSubscribed = false

        ensureCanMutateNextListeners()
        var index = nextListeners.indexOf(listener)
        nextListeners.splice(index, 1)
      }
    }

    return enty
  }

  exports.ctlTouchEnd = ctlTouchEnd
}))
