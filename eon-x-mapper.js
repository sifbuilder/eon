/*******************************************
*      @xMapper
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.xMapper = global.xMapper || {})))
}(this, function (exports) {
  'use strict'

  let xMapper = function () {
    let state = {}

    // ............................. enty
    let enty = function (_) {
      if (arguments.length < 1) return state
      else if (typeof _ === 'object') return (state = Object.assign({}, state, _))
      else if (typeof _ === 'string' && state[_] !== undefined) return state[_]
      else if (typeof _ === 'string' && state[_] === undefined) return null
    }

    return enty
  }

  exports.xMapper = xMapper
}))
