/**********************
   *    @muonEotest
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonEotest = global.muonEotest || {})))
}(this, function (exports) {
  'use strict'

  async function muonEotest (__eo = {}) {
    let anivance = async function (data = {}, context = {}) {
      let times = data.times
      let dt = data.dt
      let t = data.t
      let ntimes = data.ntimes
      let anifn = data.anifn
      let callback = data.callback

      let stats = []
      let stat = {}
      let newt = t
      let res = {stats, stat, newt}

      async function anitimer (callback) {
        await callback()
        setTimeout(() => {
            res.newt = t + times * dt
            res.stat = anifn(t) // animier
            res.stats[times] = stat
          console.log(`time: ${res.newt} with ${res.stat.animas.length} animas and ${res.stat.anigrams.length} anigrams `)
          anitimer(callback)
          ++times
        }, dt)
      }

      await anitimer(callback)
      for (let i = 0; i < ntimes; i++) {
        jest.advanceTimersByTime(dt)
        await Promise.resolve() // allow any pending jobs in the PromiseJobs queue to run
      }

      return res
    }
    // ............................. enty
    let enty = () => {}
    enty.anivance = anivance
    return enty
  }

  exports.muonEotest = muonEotest
}))
