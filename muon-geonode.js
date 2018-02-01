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
    let setGeonode = function (node) {


			let geonode = {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0,0,0] },
            properties: {orgen: [0,0,0], velin: [0,0,0], velang: [0,0,0], prevous: [0,0,0], geodelta: [0,0,0]}
        }
				
				if (node !== undefined && node !== null) {
				
					if (node.geometry !== undefined) geonode.geometry = node.geometry	
					
					if (node.properties !== undefined) {
						if (node.properties.orgen !== undefined
									&& node.properties.orgen !== null) geonode.properties.orgen = node.properties.orgen
									
						if (node.properties.velin !== undefined
									&& node.properties.velin !== null) geonode.properties.velin = node.properties.velin
									
						if (node.properties.velang !== undefined
									&& node.properties.velang !== null) geonode.properties.velang = node.properties.velang
									
						if (node.properties.prevous !== undefined
									&& node.properties.prevous !== null) geonode.properties.prevous = node.properties.prevous
									
						if (node.properties.geodelta !== undefined
								&& node.properties.geodelta !== null) geonode.properties.geodelta = node.properties.geodelta
					}
				}
				
      return geonode
    }
 
    /**********************
   *    @enty
   */
    let enty = function () {}
    enty.set = setGeonode // build geonode


    return enty
  }

  exports.muonGeonode = muonGeonode
}))
