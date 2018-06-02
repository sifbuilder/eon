/* -------------------------- */
/*       forceLink  					*/
/* -------------------------- */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.forceLink = global.forceLink || {})))
}(this, function (exports) {
  'use strict'

  var forceLink = function forceLink (__mapper = {}) {
    let props = __mapper('xs').m('props')

    // -------------------------------------//
    //       force													//
    // -------------------------------------//
    let force = function (params) {
      let nodes = params.nodes || []
      let links = params.links || []
      let id = params.id || (d => d.index)
      let distance = params.distance || 30
      let strength = params.strength || (() => 0.1)
      let iterations = params.iterations || 1

      let d3src = (params.src !== undefined) ? params.src : d3 // d3_force

      let d3force = d3src.forceLink(nodes)
        .id(id)
        .distance(distance)
        .links(links)
        .strength(strength)
        .iterations(iterations)

      return d3force
    }

    /* -------------------------- 	*/
    /*        muonApi		  				*/
    /* -------------------------- 	*/
    var muonApi = function muonApi () {}
    muonApi.force = force

    return muonApi
  }

  exports.forceLink = forceLink
}))
