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

    let [
      d3Force3d,
    ] = await Promise.all([
      __mapper('xs').b('d3-force-3d'),
    ])

    let d3_force = d3Force3d

    // ...................... isolate
    let isolate = function (sys) { // filter, force, nodes, sys, type
      let nodes = sys.nodes || []
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
        
      let nodes = params.nodes
      let fforce = params.force
      let properties = params.properties || {}
      let payload = params.properties.payload || {}
      
      let args = payload.args || []
      let opts = payload.opts || {}
      
      let key = properties.key
      let type = properties.type
      let filter = properties.filter

      let fName = __mapper('xs').ceonize(type, 'force')

      
      if (fforce !== undefined) { // force is passed from z.eon
          //

      } else if (__mapper(fName)) {  // force is registered in mapper
          fforce  = __mapper(fName)

      } else if (d3Force3d[fName] !== undefined) { // force is taken from physics
          fforce = d3Force3d[fName]

      }
      fforce = fforce(...args)
      for (var kee in opts) {
        if (fforce[kee] !== undefined) {
          fforce = fforce[kee](opts[kee])
        }
      }
      console.assert(fforce !== null, `force ${fName} not found`)

      let sys = {
        nodes: nodes,
        filter: filter,
        force: fforce,
      }
      
      let ffforce = isolate(sys)
      console.assert(key || type !== null)
      let field = 	{
        key: key || type,
        force: ffforce,
      }
      
      return field // return force

    }

    // ...................... enty
    let enty = () => {}
    enty.force = force
    enty.isolate = isolate
    return enty
  }

  exports.muonEoforces = muonEoforces
}))
