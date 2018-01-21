/*******************************************
*      @muonMapper
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonMapper = global.muonMapper || {})))
}(this, function (exports) {
  'use strict'

  let muonMapper = function muonMapper () {
    let state = {}

    let enty = function (_) {
      if (arguments.length < 1) return state

      if (typeof _ === 'object') return state = Object.assign({}, state, _)

      if ((typeof _ === 'string') && (state[_] !== undefined)) return state[_]
    }
    return enty
  }

  exports.muonMapper = muonMapper
}))
