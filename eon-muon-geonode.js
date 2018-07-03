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
    let props = __mapper('xs').m('props')

    // ....................... init
    let init = function (node = {}) {
      let geonode = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0]
        },
        properties: {
          orgen: [0, 0, 0],
          velin: [0, 0, 0],
          velang: [0, 0, 0],
          prevous: [0, 0, 0],
          geodelta: [0, 0, 0]
        }
      }

      let _geonode = Object.assign({}, geonode, node)
      return _geonode
    }

    // ....................... enty
    let enty = function () {}
    enty.init = init // build geonode

    return enty
  }

  exports.muonGeonode = muonGeonode
}))
