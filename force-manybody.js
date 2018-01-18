/* -------------------------- */
/*       forcemanybody  			*/
/* -------------------------- */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.forcemanybody = global.forcemanybody || {})))
}(this, function (exports) {
  'use strict'

  var forcemanybody = function forcemanybody (__mapper = {}) {
    let props = __mapper('props')()

    /* -------------------------- */
    /*        force				  			*/
    /* -------------------------- */
    let force = function (params) {
      let strength = params.strength || (() => 0.1)
      let theta = params.theta || (() => 0.9)
      let distanceMin = params.distanceMin || 1
      let distanceMax = params.distanceMax || Infinity

      let d3src = (params.src !== undefined) ? params.src : d3 // d3_force

      let d3force = d3src.forceManyBody()
        .strength(strength)
        .theta(theta)

      return d3force
    }

    /* -------------------------- */
    /*        muonApi		  			*/
    /* -------------------------- */
    var muonApi = function muonApi () {}
    muonApi.force = force

    return muonApi
  }

  exports.forcemanybody = forcemanybody
}))
