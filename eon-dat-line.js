/**********************
 *      @datLine
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.datLine = global.datLine || {})))
}(this, function (exports) {
  'use strict'

  var datLine = function (__eo = {}) {
    let data = {

      width: '2.77778in', height: '3.45833in',
      viewBox: '0 0 300 300',
      path: {
        id: 'mbn',
        fill: 'none', stroke: 'black', 'strokeWidth': '1',
        d: `M -150.00,0.00
           C -50.00,0.00 50.00,0.00 150.00,0.00 Z`,
      }, // path
    } // data

    // ............................. enty
    var enty = function enty () {}
    enty.data = () => data

    return enty
  }

  exports.datLine = datLine
}))
