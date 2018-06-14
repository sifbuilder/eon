/***********
 *    @bosonPromise
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.bosonPromise = global.bosonPromise || {})))
}(this, function (exports) {
  'use strict'

  let bosonPromise = function(__mapper = {}) {
    let f = __mapper('xs').m('props'),
      mnat = __mapper('xs').m('nat'),
      mgeoj = __mapper('xs').m('geoj')

    let add = (a,b) => a + b

    // ............................. enty
    let enty = () => enty
    enty.add = add

    return enty
  }

  exports.bosonPromise = bosonPromise
}))
