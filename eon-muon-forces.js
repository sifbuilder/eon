/***********
   *    @muonForces
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonForces = global.muonForces || {})))
}(this, function (exports) {
  'use strict'

  // ...................... isolate
  let isolate = function (sys) { // filter, force, nodes, sys, type
    let nodes = sys.nodes
    let force = sys.force
    let filter = sys.filter

    if (force !== null) {
      let simNodes = nodes.filter(filter) // filter nodes
      let dim = sys.dim || 3 // sys for dim

      var initialize = force.initialize
      force.initialize = () => initialize.call(force, simNodes, dim)

      return force
    }
  }

  async function muonForces (__mapper = {}) {
    // ...................... force
    let force = function (params) {
      return __mapper('xs').f(params.type)
        .then(fforce => ({
          nodes: params.nodes,
          filter: params.filter,
          force: (fforce) ? fforce.force(params) : params.force,
        }))
        .then(sys => isolate(sys))
        .then(force => force)
    }

    // ...................... enty
    let enty = () => {}
    enty.force = force
    return enty
  }

  exports.muonForces = muonForces
}))
