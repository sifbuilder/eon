/**********************
 *      @controlTimer
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.controlTimer = global.controlTimer || {})))
}(this, function (exports) { "use strict"

  function controlTimer(__mapper) {

    let state = {}
    state.now = performance.now()
    state.restartTime = performance.now()
    state.stopTime = performance.now()

    let currentListeners = []
    let nextListeners = currentListeners
    let d3timers = []
    let started = false

    // ......................... ensureCanMutateNextListeners
    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice()
      }
    }

    // ......................... start
    let start = function start() {
      started = false

      let main = function(timestamp) {
        window.requestAnimationFrame(main)

        let listeners = currentListeners = nextListeners
        for (let i = 0; i < listeners.length; i++) {
          listeners[i]()          // run each listener
        }
      }

      if (!started) {
        started = true
        main()
      }

      state.restartTime = performance.now() - (state.stopTime - state.restartTime)

      return enty
    }

    // ......................... restart
    let restart = function restart() {
      started = true
      let listeners = currentListeners = nextListeners


      for (let i = 0; i < listeners.length; i++) {

        state.restartTime = performance.now() - (state.stopTime - state.restartTime)
        console.log("restart **", state.restartTime )

        d3timers[i].restart(listeners[i],0,0)
      }
      return enty
    }

    // ......................... resume
    let resume = function resume() {
      started = true
      let listeners = currentListeners = nextListeners


      for (let i = 0; i < listeners.length; i++) {

        state.restartTime = performance.now() - (state.stopTime - state.restartTime)
        console.log("resume **", state.restartTime )

        d3timers[i].stop(listeners[i])
        d3timers[i].resume(listeners[i],0,state.restartTime)
      }
      return enty
    }

    // ......................... stop
    let stop = function stop() {
      started = false
      let listeners = currentListeners = nextListeners

      state.stopTime =  performance.now()

      for (let i = 0; i < listeners.length; i++) {
        d3timers[i].stop()
      }
      return enty
    }

    // ......................... subscribe
    let subscribe = function subscribe (listener, wait =0) {
      started = true
      if (typeof listener !== "function") {
        throw new Error("Expected listener to be a function.")
      }
      let isSubscribed = true
      ensureCanMutateNextListeners()
      nextListeners.push(listener)

      d3timers[nextListeners.length - 1] =
        __mapper("xs").m("timer").timer(listener, wait, 0)

      return function unsubscribe() {
        if (!isSubscribed) {
          return
        }
        let started = false   // 
        isSubscribed = false
        ensureCanMutateNextListeners()
        let index = nextListeners.indexOf(listener)

        d3timers[index].stop()
      }
    }
    // ......................... enty
    function enty() {}

    enty.started = () => started
    enty.start = start
    enty.restart = restart
    enty.resume = resume
    enty.stop = stop
    enty.subscribe = subscribe

    return enty
  }
  exports.controlTimer = controlTimer

}))
