/***************************
 *        @muonSim
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonSim = global.muonSim || {})))
}(this, function (exports) {
  'use strict'

  async function muonSim (__mapper = {}) {
    let [
      mprops,
      mstore,
      mgeonode,
      d3,
      d3Force3d
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').m('store'),
      __mapper('xs').m('geonode'),
      __mapper('xs').q('d3'),
      __mapper('xs').q('d3-force-3d')
    ])

    let _geonode = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0, 0, 0]
      },
      properties: {
        orgen: [0, 0, 0],
        velin: [0, 0, 0],
        prevous: [0, 0, 0],
        geodelta: [0, 0, 0]
      }
    }

    let d3_force = d3Force3d
    let sim = d3_force.forceSimulation() //
    let dim = 3

    // simulate
    // https://bl.ocks.org/frogcat/a06132f64b7164c1b1993c49dcd9178f
    // https://www.nist.gov/sites/default/files/documents/2017/05/09/d3rave_poster.pdf

    // ------------------------- simConstants
    function simConstants (sim, fieldProps = {}) {
      let cttes = {}
      cttes.alpha = (fieldProps.alpha !== undefined) ? fieldProps.alpha : sim.alpha()
      cttes.alphaMin = (fieldProps.alphaMin !== undefined) ? fieldProps.alphaMin : sim.alphaMin()
      cttes.alphaDecay = (fieldProps.alphaDecay !== undefined) ? fieldProps.alphaDecay : sim.alphaDecay()
      cttes.alphaTarget = (fieldProps.alphaTarget !== undefined) ? fieldProps.alphaTarget : sim.alphaTarget()
      cttes.velocityDecay = (fieldProps.velocityDecay !== undefined) ? fieldProps.velocityDecay : sim.velocityDecay()
      return cttes
    }

    /* **************************
 *        //md: initNodes
 *        //md:   @aniItems
 *        //md:   @nMim
 */
    function initNodes (aniItems, nDim) {
      let simNodes = []

      for (let i = 0, n = aniItems.length; i < n; ++i) {
        let aniItem = aniItems[i]
        let payload = aniItem.payload

        // the geonode ports info of the simnode
        let geonode
        if (aniItem && aniItem.geofold && aniItem.geofold.properties) geonode = aniItem.geofold.properties.geonode
        geonode = mgeonode.init(geonode)

        // the simnode location is in the geonode geometry
        let nodeGeometry = geonode.geometry
        let simNode = {}
        simNode.x = nodeGeometry.coordinates[0] // geonode location to simnode
        simNode.y = nodeGeometry.coordinates[1]
        simNode.z = nodeGeometry.coordinates[2]

        if (simNode.x === undefined || isNaN(simNode.x)) simNode.x = 0 // location defs
        if ((simNode.y === undefined || isNaN(simNode.y)) && nDim > 1) simNode.y = 0
        if ((simNode.z === undefined || isNaN(simNode.z)) && nDim > 2) simNode.z = 0

        // the simnode status is in the geonode properties
        let properties = geonode.properties
        if (properties.anchor) { // fix situs
          simNode.fx = simNode.x
          simNode.fy = simNode.y
          simNode.fz = simNode.z
        }

        // the simnode velocity is in the geonode properties velin
        simNode.vx = properties.velin[0] // geonode velocity to simnode
        simNode.vy = properties.velin[1]
        simNode.vz = properties.velin[2]

        if (isNaN(simNode.vx)) simNode.vx = 0 // velocity defs
        if (nDim > 1 && isNaN(simNode.vy)) simNode.vy = 0
        if (nDim > 2 && isNaN(simNode.vz)) simNode.vz = 0
        simNode.payload = payload // anitem payload to simnode

        if (payload.id !== undefined) {
          simNode.id = payload.id // simnode id from geofold.payload.id
        } else {
          simNode.id = payload.uid
        }

        if (payload.link) {
          simNode.source = payload.link.source
          simNode.target = payload.link.target
        }

        simNodes.push(simNode)
      }

      // md: simnodes: {x,y,z}, {vx,vy,vz}, payload, index
      return simNodes
    }

    /***************************
 *        @restoreNodes
 */
    function restoreNodes (simNodes, aniItems) {
      let updItems = []

      if (simNodes.length > 0) {
        for (let i = 0; i < simNodes.length; ++i) {
          let simNode = simNodes[i]

          let updItem = aniItems[i] // each anitem

          // make sure updItem has a geonode to get feedback from ani
          if (updItem.geofold === undefined) updItem.geofold = {}
          if (updItem.geofold.properties === undefined) updItem.geofold.properties = {}
          if (updItem.geofold.properties.geonode === undefined) updItem.geofold.properties.geonode = {}

          let geonode = updItem.geofold.properties.geonode
          geonode = mgeonode.init(geonode)
          geonode.properties.geodelta[0] = simNode.x - geonode.geometry.coordinates[0]
          geonode.properties.geodelta[1] = simNode.y - geonode.geometry.coordinates[1]
          geonode.properties.geodelta[2] = simNode.z - geonode.geometry.coordinates[2]

          geonode.properties.velin[0] = simNode.vx // linear velocities
          geonode.properties.velin[1] = simNode.vy
          geonode.properties.velin[2] = simNode.vz

          geonode.properties.prevous[0] = geonode.geometry.coordinates[0] // previous location
          geonode.properties.prevous[1] = geonode.geometry.coordinates[1]
          geonode.properties.prevous[2] = geonode.geometry.coordinates[2]

          geonode.geometry.coordinates[0] = simNode.x // after sim location
          geonode.geometry.coordinates[1] = simNode.y
          geonode.geometry.coordinates[2] = simNode.z

          updItem.geofold.properties.geonode = geonode

          updItems.push(updItem)
        }
      }

      // md: aftersim geofold.properties.geonode (s)
      // md:     coordinates
      // md:     properties.{geodelta, prevous, velin}

      return updItems
    }

    /***************************
 *        @simulate
 */
    let simulate = function (sim, aniItems = [], elapsed = 0, dim = 3) {
      let aniSims = []
      let numDims = 3

      let aniNodes = initNodes(aniItems, dim) // < aniNodes
      sim
        .stop()
        .numDimensions(numDims)
        .nodes(aniNodes)

      for (let i = 0; i < aniItems.length; i++) {
        let aniItem = aniItems[i] // each anima or anigram

        if (aniItem.payload.forces !== undefined) { // forces in aniItem
          let forces = mprops.fa(aniItem.payload.forces)

          for (let j = 0; j < forces.length; j++) { // for each force in aniItem
            let aniForce = forces[j] // aniForce in anima.payload.forces eg. force_gravity
            let cttes = simConstants(sim, aniForce.properties)

            sim
              .alpha(cttes.alpha)
              .alphaMin(cttes.alphaMin)
              .alphaDecay(cttes.alphaDecay)
              .alphaTarget(cttes.alphaTarget)
              .velocityDecay(cttes.velocityDecay)
              .on('tick', () => {
                if (aniForce.ticked !== undefined) aniForce.ticked

                aniSims = restoreNodes(aniNodes, aniItems) // > aniNodes
                mstore.apply({type: 'UPDATEANIMAS', caller: 'simulation', animas: aniSims})
              })

            if (aniForce.field !== undefined) { // field forces
              let aniCompForces = aniForce.field({ // mamy to share properties
                'elapsed': elapsed, // elapsed
                'nodes': aniNodes, // aniNodes
                'properties': aniForce.properties // snapped properties
              })

              for (let k = 0; k < aniCompForces.length; k++) {
                let forceName = aniCompForces[k].key
                let forceFunction = aniCompForces[k].force
                sim.force(forceName, forceFunction) // muon or builtin force
              }
            }
          }
        }
      }

      sim.restart()

      return aniSims
    }

    /***************************
 *        @enty
 */
    let enty = {}
    enty.sim = (_) => { if (_ === undefined) return sim; else { sim = _; return enty } }
    enty.dim = (_) => { if (_ === undefined) return dim; else { dim = _; return enty } }
    enty.simulate = simulate

    return enty
  }

  exports.muonSim = muonSim
}))
