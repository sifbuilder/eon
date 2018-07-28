/**********************
   *    @muonTim
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonTim = global.muonTim || {})))
}(this, function (exports) {
  'use strict'

  async function muonTim (__mapper = {}) {
    let d3scale = await __mapper('xs').b('d3-scale')

    function timing (pTim, pElapsed) {
      let epsilon = 1e-5

      let scaleLinear = d3scale.scaleLinear

      let tim = Object.assign({}, pTim)
      let _tim = Object.assign({}, pTim)

      if (pElapsed < 0) tim.msStart = undefined // reset

      let timeunits = tim.tu || 1000 // tim.tu: time unit
      let duration = tim.td // tim.td: time duration
      let t0 = tim.t0 // tim.t0: time init/wait
      let t1 = tim.t1 // tim.t1: time limit
      let step = Math.abs(tim.t2) || 1 // tim.t2: time step
      let period = Math.abs(tim.t3) || 1 // tim.t3: time period
      let window = !!(tim.tw) // tim.tw: time window
      let timeinverse = tim.inverse || false // tim.inverse: time direction
      let common = tim.common // tim.common: shared time
      let msDelta = (tim.msDelta !== undefined) ? tim.msDelta : 0 // time (ms) between ticks

      let elapsed = tim.elapsed = pElapsed // abs msPassed time (ms)
      let msElapsed = tim.elapsed // abs msPassed time - life (ms)
      let msStart = tim.msStart // abs start time (ms)
      let msPassed = tim.msPassed // rel time msPassed - life (ms)
      let stopped = tim.stopped // is time stopped
      let unitElapsed = tim.unitElapsed // common time elapsed (units)
      let unitPassed = tim.unitPassed // rel time msPassed - life (units)
      let unitStart = tim.unitStart // ref time start (common or relative) (units)
      let unitTime = tim.unitTime // ref time msPassed (common or relative) (units)
      let unitDelta = (tim.unitDelta !== undefined) ? tim.unitDelta : 0 // time (units) between ticks

      let tp = (tim.tp !== undefined) ? tim.tp : t => t

      let tick = tim.tick // time msPassed (ticks)

      let timefactor = duration / timeunits // time factor
      let wait = tim.wait = Math.abs(timefactor * t0) // t0 wait
      let limit = tim.limit = Math.abs(timefactor * t1) // t1 limit
      let slots = tim.slots = [] // slots

      let d = (window === false) ? [tim.wait, tim.limit] : [0, duration] // time window
      if ((Math.sign(t0) === -1) || (Math.sign(t1) === -1)) timeinverse = true // inverse
      let r = (timeinverse === false) ? [0, 1] : [1, 0] // time inversion
      let timescale = () => scaleLinear().domain(d).range(r) // timescale: scale of life

      tim.msStart = tim.msStart || elapsed // -- start time (abs, ms)
      tim.msElapsed = tim.elapsed // -- abs time elapsed (abs, ms)
      tim.msPassed = tim.elapsed - tim.msStart // -- relative time msPassed (abs, ms)

      tim.msDelta = tim.elapsed - _tim.elapsed // -- time msPassed (abs, ms) between ticks
      tim.stopped = 1 // -- time is stopped

      let elapsedInPeriod = (period > epsilon) ? ((tim.elapsed % (duration / period)) * period) : elapsed
      let unitTimeElapsedInPeriod = timescale()(elapsedInPeriod) // abs elapsed time in period (units)
      let elapsedstep = Math.round(elapsed / step) // elapsedstep
      if ((wait <= elapsed) && (elapsed <= limit) && (slots.indexOf(elapsedstep) !== null)) {
        slots.push(elapsedstep)
        tim.unitElapsed = unitTimeElapsedInPeriod // TimeElapsedInPeriod (units)
      }

      let passedInPeriod = (period > epsilon) ? ((tim.msPassed % (duration / period)) * period) : tim.msPassed
      let unitTimePassedInPeriod = timescale()(passedInPeriod) // rel msPassed time in period (units)
      let passedstep = Math.round(tim.msPassed / step) // passedstep

      if ((wait <= tim.msPassed) && (tim.msPassed <= limit) && (slots.indexOf(passedstep) !== null)) {
        slots.push(passedstep)
        tim.unitPassed = unitTimePassedInPeriod // TimePassedInPeriod (units)
      }
      tim.unitDelta = tim.unitPassed - _tim.unitPassed // -- time units between ticks

      tim.unitTime = (common !== undefined) ? tim.unitElapsed : tim.unitPassed //  time (units)

      tim.unitTime = tp(tim.unitTime)

      tim.msTime = (common !== undefined) ? tim.msElapsed : tim.msPassed //  time (ms)

      if (tim.unitTime !== null) { // do not start yet if no unitTime
        tim.stopped = 0 // -- time unstopped
        tim.unitStart = tim.unitStart || tim.unitTime // -- time started (units)
        tim.tick = (tim.tick === undefined) ? 0 : tim.tick + 1 // -- time tick
      }

      return tim
    }

    // .................. enty
    let enty = {}
    enty.timing = timing

    return enty
  }

  exports.muonTim = muonTim
}))
