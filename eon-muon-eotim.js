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
      t1: 1, // unEnd
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
        td,
        t0,
        t1,
        t2,
        t3,
        tf,
        inverse,
        common,
      } = eotim

      let
        msDuration = td, // 16200
        msElapsed,
        unInit = t0, // 0
        unEnd = t1, // 1
        unStep = t2, // 1
        unPeriod = t3, // 1
        timeFunction = tf, // t => t
        timeInverse = inverse,

        timeCommon = common,
        unSlot = [] // unSlot

      let {
        unElapsed = 0,
        unStart,
      } = eotim


      let timeScales = []

      
      let msDomain0 = [0, msDuration]
      let unRange0 = [t0, t1]
      let timeScale0 = scaleLinear() // timeScale ms => un
        .domain(msDomain0) // [msWait, msLimit]
        .range(unRange0) // [unBegin, unEnd]
      timeScales.push(timeScale0)

      
      // let msDomain1 = [t0, t1]
      // let unRange1 = [0, 1]
      // let timeScale1 = scaleLinear()
        // .domain(msDomain1)
        // .range(unRange1)
      // timeScales.push(timeScale1)


      // let msDomain2 = [0, 1]
      // let unRange2 = [1, 0]
      // let timeScale2 = scaleLinear()
        // .domain(msDomain2)
        // .range(unRange2)
      // if (timeInverse) timeScales.push(timeScale2)




      // [0, msDuration]  =(timeScale)=>     [0,1]

      //   [0, 1]         =(timeScale)=>     [0,1]
      //   [0, 1]         =(timeScale)=>     [1,0]   domain inverse
      //                                             domain translate
      //                                             domain scale
      // [0, 1]           =(snap)=>          [v0,v1]
      

      let timeScale =  timeScales.reduce((prevFn, nextFn) =>
              (...args) => nextFn(prevFn(...args)), d => d)

              
      // if (elapsedInMs !== undefined) {
        msElapsed = elapsedInMs

        let unElapsedNew = timeScale(elapsedInMs)
        unStart = unStart !== undefined ? unStart : unElapsedNew
        let unPassed = unElapsedNew - unStart
        let unDelta = unElapsedNew - unElapsed
        unElapsed = unElapsedNew

        let unPassedInPeriod = (unPeriod > epsilon) ? ((unPassed % (1 / unPeriod)) * unPeriod) : unPassed // _e_
        let unElapsedstep = Math.round(unPassed / unStep) // _e_
        let unElapsedInPeriod = (unPeriod > epsilon) ? ((unElapsed % (1 / unPeriod)) * unPeriod) : unElapsed // _e_

        if ((unInit <= unElapsed) &&
            (unElapsed <= unEnd) &&
            (unSlot.indexOf(unElapsedstep) !== null)) {
          unSlot.push(unElapsedstep)
          unPassed = unPassedInPeriod // TimePassedInPeriod (uns)
          unElapsed = unElapsedInPeriod // TimeElapsedInPeriod (uns)
        }
        let unTime = unPassed //  time (uns)
        if (unTime !== null) { // do not start yet if no unTime
          unStart = (unStart !== undefined) ? unStart : unTime // -- time started (uns)
        }



        eotim.msElapsed = msElapsed
        eotim.unEnd = unEnd
        eotim.unElapsed = unElapsed // UPDATE // common time elapsedInMs (uns)
        eotim.unPassed = unPassed // UPDATE // rel time msPassed - life (uns)
        eotim.unTime = timeFunction(unTime) // UPDATE // ref time msPassed (common or relative) (uns)
        eotim.unStart = unStart // UPDATE // ref time start (common or relative) (uns)
        eotim.unDelta = unDelta // UPDATE // time (uns) between ticks        
      // }        


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
