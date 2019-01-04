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
    let [
      d3scale,
    ] = await Promise.all([
      __mapper('xs').b('d3-scale'),
    ])

    let epsilon = 1e-5
    let scaleLinear = d3scale.scaleLinear

    function timing (pTim = {}, newElapsed) {

      let eotim = Object.assign({}, pTim)
      let _tim = Object.assign({}, pTim)  // 


      
      const {
        td = 10000, // time duration
        t0 = 0,   // time init/wait
        t1 = 1000, //  
        t2 = 1, 
        t3 = 1, 
        tf = t => t, 
        tu = 1000, // time units
        tw = 1,  // time window
        inverse = false,  // time inverse, time direction
        common = false,  // shared time
        wasElapsed = 0,  // abs msPassed time (ms). if undefined, wasElapsed is undefined
        slots = [], // slots
        
      } = eotim
      
      const {
        duration = td, 
        tinit = t0,
        tend = t1,
        step = t2, 
        period = t3, 
        tfn = tf, 
        timeunits = tu,
        timeinverse = inverse,
        window = tw,
      } = eotim

      
      let {
        msElapsed = wasElapsed,  // abs msPassed time - life (ms)
        msStart = wasElapsed,   // abs start time (ms)
        msPassed,  // rel time msPassed - life (ms) 
        msDelta = 0, // time (ms) between ticks
        msTick = 0, // time msPassed (ticks)
        unitTime,  // ref time msPassed (common or relative) (units) 
        unitElapsed,  // common time elapsed (units) 
        unitPassed,  // rel time msPassed - life (units) 
        unitDelta = 0, // time (units) between ticks
        unitStart, // ref time start (common or relative) (units)
        stopped = 1, // -- time is stopped
      } = eotim

      
      
      if (newElapsed === undefined) {
        newElapsed = wasElapsed
      }

      if (newElapsed < 0) {
        msStart = undefined // reset msStart (start in mili-seconds)
      }      
      
      if ((Math.sign(t0) === -1) || (Math.sign(t1) === -1)) timeinverse = true // inverse

      console.assert(step > 0)
      console.assert(period > 0)
      console.assert(wasElapsed !== undefined)
      console.assert(newElapsed !== undefined)
      

      // get the time scale
      let timefactor = duration / timeunits // time factor
      let wait = Math.abs(timefactor * t0) // t0 wait
      let limit = Math.abs(timefactor * t1) // t1 limit
      let d = (window === false) ? [wait, limit] : [0, duration] // time window
      let r = (timeinverse === false) ? [0, 1] : [1, 0] // time inversion
      let timescale = () => scaleLinear().domain(d).range(r) // timescale: scale of life
      
      // time vars in ms units
      msElapsed = newElapsed // -- abs time wasElapsed (abs, ms)
      msPassed = newElapsed - msStart // -- relative time msPassed (abs, ms)
      msDelta = newElapsed - wasElapsed // -- time msPassed (abs, ms) between ticks
      let msPassedInPeriod = (period > epsilon) ? ((msPassed % (duration / period)) * period) : msPassed
      let msPassedstep = Math.round(msPassed / step) // msPassedstep
      let msElapsedInPeriod = (period > epsilon) ? ((msElapsed % (duration / period)) * period) : msElapsed
      let msElapsedstep = Math.round(msElapsed / step) // msElapsedstep
      let msTime = (common !== undefined) ? msElapsed : msPassed //  time (ms)

      if ((wait <= msPassed) && (msPassed <= limit) && (slots.indexOf(msPassedstep) !== null)) {
        slots.push(msElapsedstep) // pused elapsed _e_ tbc
        msPassed = msPassedInPeriod // TimePassedInPeriod (units)
        msElapsed = msElapsedInPeriod // TimePassedInPeriod (units)
      }
      
      eotim.msElapsed = msElapsed // UPDATE
      eotim.msPassed = msPassed // UPDATE
      eotim.msDelta = msDelta // UPDATE
      eotim.msTime = msTime
      eotim.slots = slots
      
      // time vars in slot units      
      let newUnitPassed = timescale()(msPassed)
      unitDelta = newUnitPassed - unitPassed // -- time units between ticks
      unitPassed = newUnitPassed
      unitElapsed = timescale()(msElapsed)
      let isElapsedInPeriod = (period > epsilon) ? ((msElapsed % (duration / period)) * period) : msElapsed
      let unitElapsedInPeriod = timescale()(isElapsedInPeriod) // abs msElapsed time in period (units)
      if ((wait <= msElapsed) && (msElapsed <= limit) && (slots.indexOf(msElapsedstep) !== null)) {
        unitElapsed = unitElapsedInPeriod // TimeElapsedInPeriod (units)
      }
      unitTime = (common !== undefined) ? unitElapsed : unitPassed //  time (units)
      
      
      if (unitTime !== null) { // do not start yet if no unitTime
        stopped = 0 // -- time unstopped
        unitStart = (unitStart !== undefined) ? unitStart : unitTime // -- time started (units)
        msTick = (msTick === undefined) ? 0 : eotim.msTick + 1 // -- time msTick
      }
      eotim.unitPassed = unitPassed  // UPDATE
      eotim.unitTime = tfn(unitTime) // UPDATE
      eotim.stopped = stopped // UPDATE
      eotim.unitStart = unitStart // UPDATE
      eotim.msTick = msTick // UPDATE

      
      return eotim
    }


    // ............................. getdefault
    let getdefault = function () {
      let res = { td: 10000, t0: 0, t1: 1000, t2: 1, t3: 1, tf: t => t }

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
