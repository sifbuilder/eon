/***********
 *    @muonPromise
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonPromise = global.muonPromise || {})))
}(this, function (exports) {
  'use strict'

  let muonPromise = function(__mapper = {}) {

    let add = (a,b) => a + b

    // ............................. enty
    let enty = () => enty
    enty.add = add

    return enty
  }

  exports.muonPromise = muonPromise
}))
