/**********************
   *    @muonEonode
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonEonode = global.muonEonode || {})))
}(this, function (exports) {
  'use strict'

  let muonEonode = function muonEonode (__mapper = {}) {
    // eonode definition

    let getdefault = function () {
      let res = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {
          orgen: [0, 0, 0],
          velin: [0, 0, 0],
          velang: [0, 0, 0],
          prevous: [0, 0, 0],
          geodelta: [0, 0, 0],
        },
      }

      return res
    }

    // ....................... init
    let init = function (node = {}) {
      let eonode = getdefault()

      if (node.geometry) eonode.geometry = node.geometry

      if (node.properties) eonode.properties = node.properties
      return eonode
    }

    // ....................... enty
    let enty = function () {}
    enty.init = init // build eonode
    enty.getdefault = getdefault

    return enty
  }

  exports.muonEonode = muonEonode
}))
