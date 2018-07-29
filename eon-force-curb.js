/***************************
 *        @forceCurb
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.forceCurb = global.forceCurb || {})))
}(this, function (exports) {
  'use strict'

  var forceCurb = function forceCurb (__mapper = {}) {
    let muonStore = __mapper('muonStore')

    let force = function (params) {
      let nodes = params.nodes
      let retention = params.retention // unit retention

      function force () {
        for (let i = 0; i < nodes.length; ++i) {
          let node = nodes[i]

          let unitPassed = node.payload.tim.unitPassed

          if (unitPassed === undefined) console.log(' unitPassed undefined')

          if (unitPassed > retention) {
            muonStore.apply({type: 'DELANIMA', caller: 'force', anima: node})
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

  exports.forceCurb = forceCurb
}))
