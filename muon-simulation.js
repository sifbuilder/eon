/***************************
 *        @muonSimulation
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonSimulation = global.muonSimulation || {})))
}(this, function (exports) {
  'use strict'

  let muonSimulation = function (__mapper = {}) {
    let f = __mapper('props')(),
      msnap = __mapper('xs').m('snap'),
      mstore = __mapper('xs').m('store'),
      mgeonode = __mapper('xs').m('geonode')

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

    let d3_force = d3
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

    // ------------------------- initNodes
    function initNodes (aniItems, nDim) {
      let simNodes = []

      for (let i = 0, n = aniItems.length; i < n; ++i) {
        let aniItem = aniItems[i]
        let payload = aniItem.payload
        let geonode = mgeonode.set(payload.geonode)

        let simNode = {}

        simNode.x = 	geonode.geometry.coordinates[0]	// geonode location to simnode
        simNode.y = 	geonode.geometry.coordinates[1]
        simNode.z = 	geonode.geometry.coordinates[2]

        simNode.vx = 	geonode.properties.velin[0]	// geonode velocity to simnode
        simNode.vy = 	geonode.properties.velin[1]
        simNode.vz = 	geonode.properties.velin[2]

        simNode.payload = payload										// anitem payload to simnode
        simNode.id = payload.uid										// anitem uid to simnode id

        if (simNode.x === undefined || isNaN(simNode.x)) simNode.x = 0	// location defs
        if ((simNode.y === undefined || isNaN(simNode.y)) && nDim > 1) 	simNode.y = 0
        if ((simNode.z === undefined || isNaN(simNode.z)) && nDim > 2) 	simNode.z = 0

        if (isNaN(simNode.vx)) simNode.vx = 0										// velocity defs
        if (nDim > 1 && isNaN(simNode.vy)) simNode.vy = 0
        if (nDim > 2 && isNaN(simNode.vz)) simNode.vz = 0

        simNodes.push(simNode)
      }

      return simNodes
    }

    // ------------------------- restoreNodes
    function restoreNodes (simNodes, aniItems) {
      let updItems = []

      if (simNodes.length > 0) {
        for (let i = 0; i < simNodes.length; ++i) {
          let simNode = simNodes[i]

          let updItem = aniItems[i]		// each anitem

          let geonode = mgeonode.set(updItem.payload.geonode)	// geonode to upd

          geonode.properties.geodelta[0] = simNode.x - geonode.geometry.coordinates[0]
          geonode.properties.geodelta[1] = simNode.y - geonode.geometry.coordinates[1]
          geonode.properties.geodelta[2] = simNode.z - geonode.geometry.coordinates[2]

          geonode.properties.velin[0] = simNode.vx		// linear velocities
          geonode.properties.velin[1] = simNode.vy
          geonode.properties.velin[2] = simNode.vz

          geonode.properties.prevous[0] = geonode.geometry.coordinates[0]	// previous location
          geonode.properties.prevous[1] = geonode.geometry.coordinates[1]
          geonode.properties.prevous[2] = geonode.geometry.coordinates[2]

          geonode.geometry.coordinates[0] = simNode.x			// after sim location
          geonode.geometry.coordinates[1] = simNode.y
          geonode.geometry.coordinates[2] = simNode.z

          updItem.payload.geonode = geonode

          updItems.push(updItem)
        }
      }
      return updItems
    }

    /***************************
 *        @simulate
 */
    let simulate = function (sim, aniItems = [], elapsed = 0, dim = 3) {
      let aniSims = []
      let numDims = 3

      let aniNodes = initNodes(aniItems, dim)		// < aniNodes

      sim
        .stop()
        .numDimensions(numDims)
        .nodes(aniNodes)

      for (let i = 0; i < aniItems.length; i++) {
        let aniItem = aniItems[i]						// each anima or anigram

        if (aniItem.payload.forces !== undefined) { // forces in aniItem
          let forces = f.fa(aniItem.payload.forces)

          for (let j = 0; j < forces.length; j++) {			// for each force in aniItem
            let aniForce = forces[j]		// aniForce in anima.payload.forces eg. force_gravity
            let cttes = simConstants(sim, aniForce.properties)

            sim
              .alpha(cttes.alpha)
              .alphaMin(cttes.alphaMin)
              .alphaDecay(cttes.alphaDecay)
              .alphaTarget(cttes.alphaTarget)
              .velocityDecay(cttes.velocityDecay)
              .on('tick', () => {
                if (aniForce.ticked !== undefined) aniForce.ticked

                aniSims = restoreNodes(aniNodes, aniItems)	// > aniNodes
                mstore.apply({type: 'UPDATEANIMAS', caller: 'simulation', animas: aniSims})
              })

            if (aniForce.field !== undefined) { // field forces
              let aniCompForces = aniForce.field({			// mamy to share properties
                'elapsed': elapsed,											// elapsed
                'nodes': aniNodes,											// aniNodes
                'properties': aniForce.properties // snapped properties
              })

              for (let k = 0; k < aniCompForces.length; k++) {
                let forceName = aniCompForces[k].key
                let forceFunction = aniCompForces[k].force
                sim.force(forceName, forceFunction) 		// muon or builtin force
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
    let enty = function () {}
    enty.sim = (_) => { if (_ === undefined) return sim; else { sim = _; return enty } }
    enty.dim = (_) => { if (_ === undefined) return dim; else { dim = _; return enty } }
    enty.simulate = simulate

    return enty
  }

  exports.muonSimulation = muonSimulation
}))
