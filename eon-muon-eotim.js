/**********************
   *    @muonEotim
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonEotim = global.muonEotim || {})))
}(this, function (exports) {
  'use strict'

  // ... tf: t => t
  // ... tf: t => 2 * (t - 2 * Math.max(0, t - 0.5)),
  // ... tf: t => 1 - 4 * (t - 0.5)* (t - 0.5),
  // ... tf: t => 1,
  // ... tf: t => Math.sin( (Math.PI /2) * t)
  // ... tf: t => Math.pow(t, 2)
  // ... tf: t => (1 / Math.PI) * ((Math.PI / 2 ) +  Math.arcsin(-1 + 2 * t))

  async function muonEotim (__mapper = {}) {
    let d3scale = await __mapper('xs').b('d3-scale')

    function timing (pTim, pElapsed) {
      let epsilon = 1e-5

      let scaleLinear = d3scale.scaleLinear

      let eotim = Object.assign({}, pTim)
      let _tim = Object.assign({}, pTim)

      if (pElapsed < 0) eotim.msStart = undefined // reset

      let timeunits = eotim.tu || 1000 // eotim.tu: time unit
      let duration = eotim.td // eotim.td: time duration
      let t0 = eotim.t0 // eotim.t0: time init/wait
      let t1 = eotim.t1 // eotim.t1: time limit
      let step = Math.abs(eotim.t2) || 1 // eotim.t2: time step
      let period = Math.abs(eotim.t3) || 1 // eotim.t3: time period
      let window = !!(eotim.tw) // eotim.tw: time window
      let timeinverse = eotim.inverse || false // eotim.inverse: time direction
      let common = eotim.common // eotim.common: shared time
      let msDelta = (eotim.msDelta !== undefined) ? eotim.msDelta : 0 // time (ms) between ticks

      let elapsed = eotim.elapsed = pElapsed // abs msPassed time (ms)
      let msElapsed = eotim.elapsed // abs msPassed time - life (ms)
      let msStart = eotim.msStart // abs start time (ms)
      let msPassed = eotim.msPassed // rel time msPassed - life (ms)
      let stopped = eotim.stopped // is time stopped
      let unitElapsed = eotim.unitElapsed // common time elapsed (units)
      let unitPassed = eotim.unitPassed // rel time msPassed - life (units)
      let unitStart = eotim.unitStart // ref time start (common or relative) (units)
      let unitTime = eotim.unitTime // ref time msPassed (common or relative) (units)
      let unitDelta = (eotim.unitDelta !== undefined) ? eotim.unitDelta : 0 // time (units) between ticks

      let tp = (eotim.tp !== undefined) ? eotim.tp : t => t

      let tick = eotim.tick // time msPassed (ticks)

      let timefactor = duration / timeunits // time factor
      let wait = eotim.wait = Math.abs(timefactor * t0) // t0 wait
      let limit = eotim.limit = Math.abs(timefactor * t1) // t1 limit
      let slots = eotim.slots = [] // slots

      let d = (window === false) ? [eotim.wait, eotim.limit] : [0, duration] // time window
      if ((Math.sign(t0) === -1) || (Math.sign(t1) === -1)) timeinverse = true // inverse
      let r = (timeinverse === false) ? [0, 1] : [1, 0] // time inversion
      let timescale = () => scaleLinear().domain(d).range(r) // timescale: scale of life

      eotim.msStart = eotim.msStart || elapsed // -- start time (abs, ms)
      eotim.msElapsed = eotim.elapsed // -- abs time elapsed (abs, ms)
      eotim.msPassed = eotim.elapsed - eotim.msStart // -- relative time msPassed (abs, ms)

      eotim.msDelta = eotim.elapsed - _tim.elapsed // -- time msPassed (abs, ms) between ticks
      eotim.stopped = 1 // -- time is stopped

      let elapsedInPeriod = (period > epsilon) ? ((eotim.elapsed % (duration / period)) * period) : elapsed
      let unitTimeElapsedInPeriod = timescale()(elapsedInPeriod) // abs elapsed time in period (units)
      let elapsedstep = Math.round(elapsed / step) // elapsedstep
      if ((wait <= elapsed) && (elapsed <= limit) && (slots.indexOf(elapsedstep) !== null)) {
        slots.push(elapsedstep)
        eotim.unitElapsed = unitTimeElapsedInPeriod // TimeElapsedInPeriod (units)
      }

      let passedInPeriod = (period > epsilon) ? ((eotim.msPassed % (duration / period)) * period) : eotim.msPassed
      let unitTimePassedInPeriod = timescale()(passedInPeriod) // rel msPassed time in period (units)
      let passedstep = Math.round(eotim.msPassed / step) // passedstep

      if ((wait <= eotim.msPassed) && (eotim.msPassed <= limit) && (slots.indexOf(passedstep) !== null)) {
        slots.push(passedstep)
        eotim.unitPassed = unitTimePassedInPeriod // TimePassedInPeriod (units)
      }
      eotim.unitDelta = eotim.unitPassed - _tim.unitPassed // -- time units between ticks

      eotim.unitTime = (common !== undefined) ? eotim.unitElapsed : eotim.unitPassed //  time (units)

      eotim.unitTime = tp(eotim.unitTime)

      eotim.msTime = (common !== undefined) ? eotim.msElapsed : eotim.msPassed //  time (ms)

      if (eotim.unitTime !== null) { // do not start yet if no unitTime
        eotim.stopped = 0 // -- time unstopped
        eotim.unitStart = eotim.unitStart || eotim.unitTime // -- time started (units)
        eotim.tick = (eotim.tick === undefined) ? 0 : eotim.tick + 1 // -- time tick
      }

      return eotim
    }

    // eotim definition

    let getdefault = function () {
      let res = { 'td': 9600, 't0': 0, 't1': 1000, 't2': 1, 't3': 1 }

      return res
    }
    // .................. enty
    let enty = {}
    enty.timing = timing
    enty.getdefault = getdefault
    return enty
  }

  exports.muonEotim = muonEotim
}))
