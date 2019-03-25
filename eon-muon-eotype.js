/***********
 *    @muonEotype
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonEotype = global.muonEotype || {})))
}(this, function (exports) {
  'use strict'

  async function muonEotype (__eo = {}) {


    const isArray = d => Array.isArray(d)

    // pure array: no object/funcion elements
    const isPureArray = d => Array.isArray(d) && d.reduce((prev, curr) => prev && typeof curr !== 'object' && typeof curr !== 'function', true)

    // quasipure array: arrays, string or number elements
    const isQuasiPureArray = d => Array.isArray(d) && d.reduce((prev, curr) => prev &&
        (Array.isArray(curr) ||
        typeof (curr) === 'string' ||
        typeof (curr) === 'number')
      , true)

    const isDoubleSingleArray = d => (Array.isArray(d) && // [[_]]
        Array.isArray(d[0]) &&
        d.length === 1 &&
        d[0].length === 1
    )

    // tripleArray" animas animation, single polygon geojson MultiPolygon
    const isTripleArray = d => (Array.isArray(d) && Array.isArray(d[0]) && Array.isArray(d[0][0]) &&
        d.length === 1 && d[0].length === 1 && d[0][0].length === 1) // [[[_]]]

    const isObject = d => (typeof d === 'object' && Array.isArray(d) === false)


    // .................. enty
    let enty = () => {}
    enty.isArray = isArray
    enty.isPureArray = isPureArray
    enty.isQuasiPureArray = isQuasiPureArray
    enty.isDoubleSingleArray = isDoubleSingleArray
    enty.isTripleArray = isTripleArray
    enty.isObject = isObject
    return enty
  }

  exports.muonEotype = muonEotype
}))
