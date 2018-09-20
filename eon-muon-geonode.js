/**********************
   *    @muonGeonode
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonGeonode = global.muonGeonode || {})))
}(this, function (exports) {
  'use strict'

  let muonGeonode = function muonGeonode (__mapper = {}) {
    // geonode definition

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
      let geonode = getdefault()

      if (node.geometry) geonode.geometry = node.geometry

      if (node.properties) geonode.properties = node.properties
      return geonode
    }

    // ....................... enty
    let enty = function () {}
    enty.init = init // build geonode
    enty.getdefault = getdefault

    return enty
  }

  exports.muonGeonode = muonGeonode
}))
