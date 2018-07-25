/*******************************************
*      @xVersion
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.xVersion = global.xVersion || {})))
}(this, function (exports) {
  'use strict'

  let xVersion = function () {
    let version = '0.0.1-rc1'

    // ............................. enty
    let enty = {}
    enty.version = () => version
    return enty
  }

  exports.xVersion = xVersion
}))
