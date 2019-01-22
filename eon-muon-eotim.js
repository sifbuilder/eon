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
  // ... tf: t => 1 - 4 * (t - 0.5) * (t - 0.5) // return 

  async function muonEotim (__eo = {}) {
    let [
      d3scale,
    ] = await Promise.all([
      __eo('xs').b('d3-scale'),
    ])

    let epsilon = 1e-5
    let scaleLinear = d3scale.scaleLinear
    
    let core = {
        td: 10000, // msDuration
        tu: 1000, // unUnits
        t0: 0, // unInit
        t1: 1000, // unEnd
        t2: 1, // unStep
        t3: 1, // unPeriod
        tf: t => t, // time function
        tw: 1, // time timeWindow
        nostop: 0, // time to stop at end
        inverse: 0, // time direction
        common: 0, // shared time
      }    
    
    // ............................. timing
    function timing (pTim = {}, elapsedInMs) {
      let eotim = Object.assign({}, core, pTim)

      const {
        td = 10000, // msDuration
        tu = 1000, // unUnits
        t0 = 0, // unInit
        t1 = 1000, // unEnd
        t2 = 1, // unStep
        t3 = 1, // unPeriod
        tf = t => t, // time function
        tw = 1, // time timeWindow
        nostop = 0, // time to stop at end
        inverse = 0, // time direction
        common = 0, // shared time
      } = eotim

      let
        msDuration = td,  // 16200
        unInit = t0,  // 0
        unEnd = t1,  // 1000
        unStep = t2,  // 1
        unPeriod = t3, // 1
        timeFunction = tf, // t => t
        unUnits = tu, // 1000
        timeInverse = inverse,
        timeWindow = tw,
        timeCommon = common, 
        msSlot = [], // msSlot
        msQuanta = msDuration / unUnits, // ms in time unit
        msWait = Math.abs(msQuanta * unInit),
        msLimit = Math.abs(msQuanta * unEnd), // if elapsedInMs > msStart + msLimit => delete anima
        timeNostop = nostop


      let {
        stopped = 1, // -- time is stopped
        msElapsed = 0,
        msTick = 0,
        msStart
      } = eotim

      msStart = msStart !== undefined ? msStart : elapsedInMs // abs start time (ms)
      let msPassed = elapsedInMs - msStart // -- relative time msPassed (abs, ms)
      let msDelta = elapsedInMs - msElapsed // -- time msPassed (abs, ms) between ticks
      let msDomain = (timeWindow === 0) ? [msWait, msLimit] : [0, msDuration]
      let unRange = (timeInverse === 0) ? [0, 1] : [1, 0]
      let timeScale = () => scaleLinear() // timeScale ms => un
        .domain(msDomain)  // [msWait, msLimit]
        .range(unRange)   // [unBegin, unEnd]
      msElapsed = elapsedInMs // UPDATE msElapsed

          let msPassedInPeriod = (unPeriod > epsilon) ? ((msPassed % (msDuration / unPeriod)) * unPeriod) : msPassed
          let msPassedstep = Math.round(msPassed / unStep) // msPassedstep
          let msElapsedInPeriod = (unPeriod > epsilon) ? ((msElapsed % (msDuration / unPeriod)) * unPeriod) : msElapsed
          let msElapsedstep = Math.round(msElapsed / unStep) // msElapsedstep
      
      let msTime = (timeCommon !== undefined) ? msElapsed : msPassed //  time (ms)


      if ((msWait <= msPassed) 
          && (msPassed <= msLimit) 
          && (msSlot.indexOf(msPassedstep) !== null)) {
        msSlot.push(msElapsedstep) // pused elapsedInMs _e_ tbc
        msPassed = msPassedInPeriod // TimePassedInPeriod (uns)
        msElapsed = msElapsedInPeriod // TimePassedInPeriod (uns)
      }

      msTick =+ 1 // -- time msTick
      

      let unStart = timeScale()(msStart)
      let unPassed = timeScale()(msPassed)
      let unDelta = timeScale()(msDelta)
          let isElapsedInPeriod = (unPeriod > epsilon) ? ((msElapsed % (msDuration / unPeriod)) * unPeriod) : msElapsed
          let unElapsedInPeriod = timeScale()(isElapsedInPeriod) // abs msElapsed time in unPeriod (uns)

      let unElapsed = timeScale()(msElapsed)
        if ((msWait <= msElapsed) 
          && (msElapsed <= msLimit) 
          && (msSlot.indexOf(msElapsedstep) !== null)) {
            unElapsed = unElapsedInPeriod // TimeElapsedInPeriod (uns)
        }
      let unTime = (timeCommon !== undefined) ? unElapsed : unPassed //  time (uns)
        if (unTime !== null) { // do not start yet if no unTime
          stopped = 0 // -- time unstopped
          unStart = (unStart !== undefined) ? unStart : unTime // -- time started (uns)
        }
      
if (1 && 1) console.log('msElapsed', msElapsed)
      
      eotim.msElapsed = msElapsed // UPDATE
      eotim.msPassed = msPassed // UPDATE
      eotim.msDelta = msDelta // UPDATE
      eotim.msTime = msTime // UPDATE
      eotim.msSlot = msSlot // UPDATE
      eotim.msLimit = msLimit // UPDATE
      eotim.msWait = msWait // UPDATE
      eotim.msStart = msStart // UPDATE
      eotim.msTick = msTick // UPDATE      
      
      eotim.unElapsed = unElapsed // UPDATE // common time elapsedInMs (uns)
      eotim.unPassed = unPassed // UPDATE // rel time msPassed - life (uns)
      eotim.unTime = timeFunction(unTime) // UPDATE // ref time msPassed (common or relative) (uns)
      eotim.stopped = stopped // UPDATE
      eotim.unStart = unStart // UPDATE // ref time start (common or relative) (uns)
      eotim.unDelta = unDelta // UPDATE // time (uns) between ticks
     
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
