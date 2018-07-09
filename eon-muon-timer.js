/***************************
 *        @muonTimer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonTimer = global.muonTimer || {})))
}(this, function (exports) {
  'use strict'

  // copyright mbostock
  // https://github.com/d3/d3-timer/blob/master/src/timer.js
  async function muonTimer (__mapper = {}) {
    let frame = 0, // is an animation frame pending?
      timeout = 0, // is a timeout pending?
      interval = 0, // are any timers active?
      pokeDelay = 1000, // how frequently we check for clock skew
      taskHead,
      taskTail,
      clockLast = 0,
      clockNow = 0,
      clockSkew = 0,
      clock = typeof performance === 'object' && performance.now ? performance : Date,
      setFrame = typeof window === 'object' && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (f) { setTimeout(f, 17) }

    let now = function now () {
      return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew)
    }

    function clearNow () {
      clockNow = 0
    }

    let timer = function (callback, delay, time) {
      let t = new Timer()
      t.restart(callback, delay, time)
      return t
    }

    let timerFlush = function timerFlush () {
      now() // Get the current time, if not already set.
      ++frame // Pretend we’ve set an alarm, if we haven’t already.
      let t = taskHead, e
      while (t) {
        if ((e = clockNow - t._time) >= 0) t._call.call(null, e)
        t = t._next
      }
      --frame
    }

    let Timer = function Timer () {
      this._call =
        this._time =
        this._next = null
    }

    Timer.prototype = timer.prototype = {
      constructor: Timer,
      restart: function (callback, delay, time) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')
        time = (time == null ? now() : +time) + (delay == null ? 0 : +delay)
        if (!this._next && taskTail !== this) {
          if (taskTail) taskTail._next = this
          else taskHead = this
          taskTail = this
        }
        this._call = callback
        this._time = time
        sleep()
      },
      stop: function () {
        if (this._call) {
          this._call = null
          this._time = Infinity
          sleep()
        }
      },
      resume: function (callback, delay, time) { // _e_
        // _e_ move delay :: restartTime back on rist resume
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')
        time = (time == null ? now() : time) + (delay == null ? 0 : +delay)
        if (!this._next && taskTail !== this) {
          if (taskTail) taskTail._next = this
          else taskHead = this
          taskTail = this
        }
        this._call = callback
        this._time = time
        sleep()
      },

    }

    function wake () {
      clockNow = (clockLast = clock.now()) + clockSkew
      frame = timeout = 0
      try {
        timerFlush()
      } finally {
        frame = 0
        nap()
        clockNow = 0
      }
    }

    function poke () {
      let now = clock.now(), delay = now - clockLast
      if (delay > pokeDelay) clockSkew -= delay, clockLast = now
    }

    function nap () {
      let t0, t1 = taskHead, t2, time = Infinity
      while (t1) {
        if (t1._call) {
          if (time > t1._time) time = t1._time
          t0 = t1, t1 = t1._next
        } else {
          t2 = t1._next, t1._next = null
          t1 = t0 ? t0._next = t2 : taskHead = t2
        }
      }
      taskTail = t0
      sleep(time)
    }

    function sleep (time) {
      if (frame) return // Soonest alarm already set, or will be.
      if (timeout) timeout = clearTimeout(timeout)
      let delay = time - clockNow
      if (delay > 24) {
        if (time < Infinity) timeout = setTimeout(wake, delay)
        if (interval) interval = clearInterval(interval)
      } else {
        if (!interval) clockLast = clockNow, interval = setInterval(poke, pokeDelay)
        frame = 1, setFrame(wake)
      }
    }

    /***************************
 *        @enty
 */
    let enty = {}

    enty.now = now
    enty.Timer = Timer
    enty.timer = timer
    enty.timerFlush = timerFlush

    return enty
  }

  exports.muonTimer = muonTimer
}))
