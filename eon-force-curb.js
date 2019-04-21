/***************************
 *        @eonForceCurb
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonForceCurb = global.eonForceCurb || {})))
}(this, function (exports) {
  'use strict'

  var eonForceCurb = function eonForceCurb (__eo = {}) {
    let eonMuonStore = __eo('eonMuonStore')

    let force = function (params) {
      let nodes = params.nodes
      let retention = params.retention // unit retention

      function force () {
        for (let i = 0; i < nodes.length; ++i) {
          let node = nodes[i]

          let unPassed = node.eotim.unPassed

          if (unPassed === undefined) console.log(' unPassed undefined')

          if (unPassed > retention) {
            eonMuonStore.apply({type: 'DELANIMA', caller: 'force', anima: node})
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

  exports.eonForceCurb = eonitem
}))
