/* -------------------------- */
/*       forcecrash   			*
//* -------------------------- */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.forcecrash = global.forcecrash || {})))
}(this, function (exports) {
  'use strict'

  /* -------------------------- 	*/
  /*        static  							*/
  /* -------------------------- 	*/

  let constant = function constant (x) {
    return function () {
      return x
    }
  }

  /* -------------------------- 	*/
  /*        forcecrash  				*/
  /* -------------------------- 	*/
  var forcecrash = function forcecrash (__mapper = {}) {
    let props = __mapper('props')()

    /* -------------------------- 	*/
    /*        muonApi		  				*/
    /* -------------------------- 	*/

    var muonApi = function muonApi () {}

    // -------------------------------------//
    //       force													//
    // -------------------------------------//
    muonApi.force = function (params) {
      var nodes = params.nodes
      let x0 = (params.x0 !== undefined) ? params.x0 : 0
      let y0 = (params.y0 !== undefined) ? params.y0 : 0
      let r = (params.r !== undefined) ? params.r : 1

      function force () {
        for (let i = 0; i < nodes.length; ++i) {
          let node = nodes[i]

          let x = node.x
          let y = node.y

          let d2 = props.lib.distance2p([x0, y0], [x, y])
          let dd = Math.sqrt(d2)

          if (dd < r) {
            __mapper('muonStore').apply({'type': 'DELANIMA', 'caller': 'force limit', 'anima': node})
          }
        }
      }

      function initialize () {
        if (!nodes) return
      }

      force.initialize = function (_) {
        nodes = _
        initialize()
      }

      force.x0 = function (_) {
        return arguments.length ? (x0 = typeof _ === 'function' ? _ : constant(+_), initialize(), force) : x0
      }

      force.y0 = function (_) {
        return arguments.length ? (y0 = typeof _ === 'function' ? _ : constant(+_), initialize(), force) : y0
      }

      force.r = function (_) {
        return arguments.length ? (r = typeof _ === 'function' ? _ : constant(+_), initialize(), force) : r
      }

      return force
    }

    // -------------------------------------//
    //       muonApi												//
    // -------------------------------------//

    return muonApi
  }

  exports.forcecrash = forcecrash
}))
