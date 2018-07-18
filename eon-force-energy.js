/***************************
 *        @forceEnergy
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.forceEnergy = global.forceEnergy || {})))
}(this, function (exports) {
  'use strict'

  var forceEnergy = function forceEnergy (__mapper = {}) {
    // .................. force
    let force = function (params) {
      let nodes = params.nodes
      let retention = params.retention // unit retention

      function force () {
        for (let i = 0; i < nodes.length; ++i) {
          let node = nodes[i]

          let unitPassed = node.payload.tim.unitPassed
          if (unitPassed === undefined) console.log(' unitPassed undefined')
          if (unitPassed > retention) {
            __mapper('muonStore').apply({type: 'DELANIMA', caller: 'force retention', anima: node})
          }
        }
      }

      let initialize = () => nodes !== undefined ? null : null

      force.initialize = _ => _ !== undefined ? (nodes = _, initialize()) : nodes

      return force
    }

    // .................. enty
    var enty = function enty () {}
    enty.force = force
    return enty
  }

  exports.forceEnergy = forceEnergy
}))
