/**********************
 *      @ctlTimer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.ctlTimer = global.ctlTimer || {})))
}(this, function (exports) {
  'use strict'

  async function ctlTimer (__eo) {
    let [
      mtimer,
    ] = await Promise.all([
      __eo('xs').m('timer'),
    ])

    let now = performance.now()
    let state = {
      now,
      restartTime: now,
      resumeTime: now,
      stopTime: now,
    }

    let currentListeners = []
    let nextListeners = currentListeners
    let d3timers = []
    let started = false

    // ......................... ensureCanMutateNextListeners
    function ensureCanMutateNextListeners () {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice()
      }
    }

    // ......................... start
    let start = function () {
      started = false

      let main = function (timestamp) {
        window.requestAnimationFrame(main)

        let listeners = currentListeners = nextListeners
        for (let i = 0; i < listeners.length; i++) {
          listeners[i]() // run each listener
        }
      }

      if (!started) {
        started = true
        console.log(' ************ c.timer set restartTime:', state.restartTime)
        state.restartTime = performance.now() - (state.stopTime - state.restartTime)
        main()
      }

      return enty
    }

    // ......................... restart
    let restart = function () {
      started = true
      let listeners = currentListeners = nextListeners

      for (let i = 0; i < listeners.length; i++) {
        state.restartTime = performance.now() - (state.stopTime - state.restartTime)
        console.log('c.timer restart', state.restartTime)

        d3timers[i].restart(listeners[i], 0, 0)
      }
      return enty
    }

    // ......................... resume
    let resume = function () {
      started = true
      let listeners = currentListeners = nextListeners

      for (let i = 0; i < listeners.length; i++) {
        state.resumeTime = performance.now() - (state.stopTime - state.resumeTime)

        d3timers[i].stop(listeners[i])
        d3timers[i].resume(listeners[i], -state.restartTime, state.resumeTime) // _e_ restartTime in advance
      }
      return enty
    }

    // ......................... stop
    let stop = function () {
      started = false
      let listeners = currentListeners = nextListeners

      state.stopTime = performance.now()

      for (let i = 0; i < listeners.length; i++) {
        d3timers[i].stop()
      }
      return enty
    }

    // ......................... subscribe
    let subscribe = function (listener, wait = 0) {
      started = true

      if (typeof listener !== 'function') {
        throw new Error('Expected listener to be a function.')
      }
      let isSubscribed = true
      ensureCanMutateNextListeners()
      nextListeners.push(listener)

      d3timers[nextListeners.length - 1] =
        mtimer.timer(listener, wait, 0)

      return function unsubscribe () {
        if (!isSubscribed) {
          return
        }
        started = false
        isSubscribed = false
        ensureCanMutateNextListeners()
        let index = nextListeners.indexOf(listener)

        d3timers[index].stop()
      }
    }
    // ......................... enty
    let enty = {}
    enty.started = () => started
    enty.start = start
    enty.restart = restart
    enty.resume = resume
    enty.stop = stop
    enty.subscribe = subscribe

    return enty
  }
  exports.ctlTimer = ctlTimer
}))
