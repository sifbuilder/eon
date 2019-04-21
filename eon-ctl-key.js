/**********************
   *    @eonCtlKey
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonCtlKey = global.eonCtlKey || {})))
}(this, function (exports) {
  'use strict'

  async function eonitem (__eo) {
    let keys = []

    let currentListeners = []
    let nextListeners = currentListeners

    let __currentListeners = {}
    let __nextListeners = __currentListeners

    // ....................... ensureCanMutateNextListeners
    function ensureCanMutateNextListeners (target) {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice()
      }

      if (target && __nextListeners[target]) {
        if (__nextListeners[target] === __currentListeners[target]) {
          __nextListeners[target] = __currentListeners[target].slice()
        }
      }
    }

    // ....................... pauseEvent
    function pauseEvent (e) {
      if (e.stopPropagation) e.stopPropagation()
      if (e.preventDefault) e.preventDefault()
      e.cancelBubble = true
      e.returnValue = false
      return false
    }
    // ....................... controlAction
    function controlAction (e) {
      pauseEvent(e)
      let listeners = currentListeners = nextListeners
      for (let i = 0; i < listeners.length; i++) {
        listeners[i](e)
      }
    }

    // ....................... subscribe
    function subscribe (listener, target) {
      if (typeof listener !== 'function') {
        throw new Error('Expected listener to be a function.')
      }
      let isSubscribed = true
      ensureCanMutateNextListeners(target)
      nextListeners.push(listener)

      if (target) {
        if (typeof __nextListeners[target] === 'undefined') __nextListeners[target] = []
        __nextListeners[target].push(listener)
      }

      return function unsubscribe () {
        if (!isSubscribed) {
          return
        }

        isSubscribed = false

        ensureCanMutateNextListeners()
        let index = nextListeners.indexOf(listener)
        nextListeners.splice(index, 1)

        if (target) {
          let index = __nextListeners[target].indexOf(listener)
          __nextListeners[target].splice(index, 1)
        }
      }
    }

    // ....................... handleKeyDown
    // https://www.kirupa.com/html5/keyboard_events_in_javascript.htm
    // https://github.com/gaearon/redux-devtools-dock-monitor
    let handleKeyDown = function (event) {
      switch (event.key) {
        case 'ArrowLeft':
        case 'Left': // hack for IE and old Gecko
          if (event.getModifierState('Alt')) {
            leftArrowAlt()
            event.preventDefault()
          }
          break
        case 'ArrowRight':
        case 'Right': // hack for IE and old Gecko
          if (event.getModifierState('Alt')) {
            rightArrowAlt()
            event.preventDefault()
          }
          break
        case 'ArrowUp':
        case 'Up': // hack for IE and old Gecko
          if (event.getModifierState('Alt')) {
            upArrowAlt()
            event.preventDefault()
          }
          break
        case 'ArrowDown':
        case 'Down': // hack for IE and old Gecko
          if (event.getModifierState('Alt')) {
            downArrowAlt()
            event.preventDefault()
          }
          break
      }
    }
    // ....................... fKeyCtrl
    let fKeyCtrl = function fKeyCtrl () { // change view
      // // Ctrl 17 + Shift 16  + f 70
    }
    // ....................... dKeyCtrl
    let dKeyCtrl = function dKeyCtrl () { // change debug mode
      // // Ctrl 17 + Shift 16  + d 68
    }
    // ....................... handleKeyPressed
    let handleKeyPressed = function handleKeyPressed (e) {
    }
    // ....................... handleKeyReleased
    let handleKeyReleased = function handleKeyReleased (e) {
      keys[e.keyCode] = false
    }

    // ....................... leftArrowAlt
    let leftArrowAlt = function leftArrowAlt (e) {
      console.log('leftArrowAltFn')

      let listeners = __currentListeners['leftArrowAlt'] = __nextListeners['leftArrowAlt']
      for (let i = 0; i < listeners.length; i++) {
        listeners[i](e)
      }
    }
    // ....................... rightArrowAlt
    let rightArrowAlt = function rightArrowAlt (e) {
      let listeners = __currentListeners['rightArrowAlt'] = __nextListeners['rightArrowAlt']
      for (let i = 0; i < listeners.length; i++) {
        listeners[i](e)
      }
    }
    // ....................... upArrowAlt
    let upArrowAlt = function upArrowAlt (e) {
      console.log('upArrowAltFn')

      let listeners = __currentListeners['rightArrowAlt'] = __nextListeners['upArrowAlt']
      for (let i = 0; i < listeners.length; i++) {
        listeners[i](e)
      }
    }
    // ....................... downArrowAlt
    let downArrowAlt = function downArrowAlt (e) {
      let listeners = __currentListeners['downArrowAlt'] = __nextListeners['downArrowAlt']
      for (let i = 0; i < listeners.length; i++) {
        listeners[i](e)
      }
      console.log('downArrowAltFn')
    }

    // ....................... leftArrowCtrl
    let leftArrowCtrl = function leftArrowCtrl (e) {
      console.log('leftArrowCtrlFn')

      let listeners = __currentListeners['leftArrowCtrl'] = __nextListeners['leftArrowCtrl']
      for (let i = 0; i < listeners.length; i++) {
        listeners[i](e)
      }
    }
    // ....................... rightArrowCtrl
    let rightArrowCtrl = function rightArrowCtrl (e) {
      console.log('rightArrowCtrlFn')

      let listeners = __currentListeners['rightArrowCtrl'] = __nextListeners['rightArrowCtrl']
      for (let i = 0; i < listeners.length; i++) {
        listeners[i](e)
      }
    }
    // ....................... upArrowCtrl
    let upArrowCtrl = function upArrowCtrl () {
      console.log('upArrowCtrlFn')
    }
    // ....................... downArrowCtrl
    let downArrowCtrl = function downArrowCtrl () {
      console.log('downArrowCtrlFn')
    }

    // ............................. controlrayder
    let control = function (domNode) {
      enty.domNode(domNode)
      document.addEventListener('keydown', handleKeyDown, false)
      document.addEventListener('keypress', handleKeyPressed, false)
      document.addEventListener('keyup', handleKeyReleased, false)
    }
    // ....................... enty
    function enty () {}
    enty.subscribe = subscribe
    enty.control = control

    return enty
  }

  exports.eonCtlKey = eonitem
}))
