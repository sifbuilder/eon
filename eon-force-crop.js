/***************************
 *        @forceCrop
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.forceCrop = global.forceCrop || {})))
}(this, function (exports) {
  'use strict'

  let forceCrop = function (__eo = {}) {
    let constant = x => () => x

    // .................. force
    let force = function (params) {
      let nodes = params.nodes
      let west = (params.west !== undefined) ? params.west : -Infinity
      let east = (params.east !== undefined) ? params.east : Infinity
      let north = (params.north !== undefined) ? params.north : -Infinity
      let south = (params.south !== undefined) ? params.south : Infinity

      function force () {
        for (let i = 0; i < nodes.length; ++i) {
          let node = nodes[i]
          let r = node.r || 1

          let xw = node.x - r + (node.vx || 0) // west
          let xe = node.x + r + (node.vx || 0) // est
          let yn = node.y - r + (node.vy || 0) // north
          let ys = node.y + r + (node.vy || 0) // south

          if (xw < west || xe > east || yn < north || ys > south) {
            __eo('muonStore').apply({'type': 'DELANIMA', 'caller': 'force crop', 'anima': node})
          }
        }
      }

      let initialize = () => nodes !== undefined ? null : null

      force.initialize = _ => _ !== undefined ? (nodes = _, initialize()) : nodes

      force.north = function (_) {
        return arguments.length ? (north = typeof _ === 'function' ? _ : constant(+_), initialize(), force) : north
      }

      force.south = function (_) {
        return arguments.length ? (south = typeof _ === 'function' ? _ : constant(+_), initialize(), force) : south
      }

      force.east = function (_) {
        return arguments.length ? (east = typeof _ === 'function' ? _ : constant(+_), initialize(), force) : east
      }

      force.west = function (_) {
        return arguments.length ? (west = typeof _ === 'function' ? _ : constant(+_), initialize(), force) : west
      }

      return force
    }

    // .................. enty
    var enty = function enty () {}
    enty.force = force
    return enty
  }

  exports.forceCrop = forceCrop
}))
