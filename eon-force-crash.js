/***************************
 *        @forceCrash
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.forceCrash = global.forceCrash || {})))
}(this, function (exports) {
  'use strict'

  var forceCrash = function (__mapper = {}) {
    let constant = x => () => x

    let force = function (params) {
      var nodes = params.nodes
      let x0 = (params.x0 !== undefined) ? params.x0 : 0
      let y0 = (params.y0 !== undefined) ? params.y0 : 0
      let r = (params.r !== undefined) ? params.r : 1

      function force () {
        for (let i = 0; i < nodes.length; ++i) {
          let node = nodes[i]

          let x = node.x
          let y = node.y

          let d2 = (x0 - x) * (x0 - x) + (y0 - y) * (y0 - y)
          let dd = Math.sqrt(d2)

          if (dd < r) {
            __mapper('muonStore').apply({type: 'DELANIMA', caller: 'force limit', anima: node})
          }
        }
      }

      let initialize = () => nodes !== undefined ? null : null

      force.initialize = _ => _ !== undefined ? (nodes = _, initialize()) : nodes

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

    // .................. enty
    var enty = function enty () {}
    enty.force = force
    return enty
  }

  exports.forceCrash = forceCrash
}))
