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
      if (1 && 1) console.log('m.eoforces force', params)
      let props = params.properties.payload || [] 
    
      let f = __mapper('xs').ceonize(params.type, 'force')

      let fforce , ffforce
      
      if (params.force !== undefined) { // force is passed from z.eon
        ffforce = params.force
        ffforce = fforce(...props)
        
      } else {
        if (__mapper(f)) {  // force is registered in mapper
            fforce  = __mapper(f)
            ffforce = fforce(...props)
            
        } else if (d3Force3d[f] !== undefined) { // force is taken from physics
          fforce =  {
            key: params.key,
            force: d3Force3d[f],
          }
          ffforce = fforce.force(...props)
        }
      }
      
   
      console.assert(ffforce !== null, `force ${f} not found`)

      let sys = {
        nodes: params.nodes,
        filter: params.filter,
        force: ffforce,
      }
      let force = isolate(sys)
      
      console.assert(params.key || params.type !== null)
      let field = 	{
        key: params.key || params.type,
        force: force,
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
