/*******************************************
*      @xLibs
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.xLibs = global.xLibs || {})))
}(this, function (exports) {
  'use strict'



  let xLibs = function (__mapper = {}) {


let libs = [

[ 'd3', [
          'd3',
          'd3-octree',
          'd3-inertia',
          'd3-geo',
          'd3-geo-voronoi',
          'd3-geo-projection',
          './d3-geo-projection-clip-polyhedral.js',
          'd3-geo-polygon',
          'd3-force-surface',
          'd3-force-pod',
          'd3-force-magnetic',
          '3d-force-graph',
          'd3-force-bounce',
          'd3-force-3d'
          ]],

 ['topojson',  'topojson' ],
 
 ['three',  'three',
          'three-trackballcontrols' ],


]

    let state = {
      libs: [...libs]
    }

    let enty = _ => _ !== undefined ? (state.libs = _, state.libs) : state.libs
    return enty

  }

  exports.xLibs = xLibs
}))
