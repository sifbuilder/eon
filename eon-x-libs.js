/*******************************************
*      @xLibs
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.xLibs = global.xLibs || {})))
}(this, function (exports) {
  'use strict'

  let parts = [
    'd3',
    'd3-force-3d',
    'topojson'
  ]

  let xLibs = function (__mapper = {}) {
    let state = {
      parts: [...parts]
    }

    let enty = {}
    enty.parts = _ => _ !== undefined ? (state.parts = _, state.parts) : state.parts
    return enty
  }

  exports.xLibs = xLibs
}))
