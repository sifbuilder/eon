/* -------------------------- */
/*       forceenergy   				*/
/* -------------------------- */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.forceenergy = global.forceenergy || {})))
}(this, function (exports) {
  'use strict'

  /* -------------------------- */
  /*        forceenergy  				*/
  /* -------------------------- */
  var forceenergy = function forceenergy (__mapper = {}) {
    let props = __mapper('xs').m('props')

    // --------------------------- */
    //       force								 */
    // --------------------------- */
    let force = function (params) {
      let nodes = params.nodes
      let retention = params.retention	// unit retention

      function force () {
        for (let i = 0; i < nodes.length; ++i) {
          let node = nodes[i]

          let unitPassed = node.payload.tim.unitPassed
          if (unitPassed === undefined) console.log(' unitPassed undefined')
          if (unitPassed > retention) {
            __mapper('muonStore').apply({'type': 'DELANIMA', 'caller': 'force retention', 'anima': node})
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

      return force
    }

    /* -------------------------- */
    /*        muonApi		  			*/
    /* -------------------------- */

    var muonApi = function muonApi () {}
    muonApi.force = force

    return muonApi
  }

  exports.forceenergy = forceenergy
}))
