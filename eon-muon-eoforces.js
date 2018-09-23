/***********
   *    @muonEoforces
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonEoforces = global.muonEoforces || {})))
}(this, function (exports) {
  'use strict'

  async function muonEoforces (__mapper = {}) {
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

    // ...................... force
    function force (params) {
      let f = __mapper('xs').ceonize(params.type, 'force')

      // let force = await __mapper('xs').f(params.type)
      let fforce = __mapper(f)

      let sys = {
        nodes: params.nodes,
        filter: params.filter,
        force: (fforce) ? fforce.force(params) : params.force,
      }
      let force = isolate(sys)
      return force
    }

    // ...................... enty
    let enty = () => {}
    enty.force_ = force
    return enty
  }

  exports.muonEoforces = muonEoforces
}))
