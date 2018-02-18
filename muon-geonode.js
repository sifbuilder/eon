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
    let props = __mapper('props')()

    /***************************
 *        @getAnigramRic
 */
    let setGeonode = function (node={}) {
      let _geonode = {
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

      let geonode = Object.assign({}, _geonode, node)

      return geonode
    }

    /**********************
   *    @enty
   */
    let enty = function () {}
    enty.setGeonode = setGeonode // build geonode

    return enty
  }

  exports.muonGeonode = muonGeonode
}))
