/*******************************************
*      @xMapper
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.xMapper = global.xMapper || {})))
}(this, function (exports) {
  'use strict'

  let xMapper = function xMapper () {
    let state = {}

    
    async function report (part) {
      let name = part[0] // name
      let parts = Array.isArray(part[1]) ? part[1] : Array.of(part[1]) // to array

      let promises = xD3Require.require(...parts) // destructure value
      let [resolved] = await Promise.all([promises])
      return [ name, resolved ]
    }

    async function reports (parts) {
      let promises = parts.map(p => enty.report(p))
      await Promise.all(promises)
        .catch(function (err) {
          console.log('A promise failed to resolve', err)
          return promises
        })
        .then(function (resolveds) {
          resolveds.map(r => enty({[r[0]]: r[1] }))
        })
    }

    let enty = function (_) {
      if (arguments.length < 1) return state

      if (typeof _ === 'object') return state = Object.assign({}, state, _)

      if ((typeof _ === 'string') && (state[_] !== undefined)) return state[_]
    }

    enty.report = report
    enty.reports = reports
    return enty
  }

  exports.xMapper = xMapper
}))
