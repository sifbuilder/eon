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
      muonProps,
      muonStore,
      mgeonode,
      d3,
      d3Force3d,
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').m('store'),
      __mapper('xs').m('eonode'),
      __mapper('xs').b('d3'),
      __mapper('xs').b('d3-force-3d'),
    ])

    let _geonode = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0, 0, 0],
      },
      properties: {
        orgen: [0, 0, 0],
        velin: [0, 0, 0],
        prevous: [0, 0, 0],
        geodelta: [0, 0, 0],
      },
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
        let eoload = aniItem.eoload

        if (aniItem.eonode) { // if simmable  ...
          // the eonode ports info of the simnode
          let eonode = mgeonode.init(aniItem.eonode)

          // the simnode location is in the eonode geometry
          let nodeGeometry = eonode.geometry

          let simNode = muonProps.clone(aniItem)
          simNode.x = nodeGeometry.coordinates[0] // eonode location to simnode
          simNode.y = nodeGeometry.coordinates[1]
          simNode.z = nodeGeometry.coordinates[2]

          if (simNode.x === undefined || isNaN(simNode.x)) simNode.x = 0 // location defs
          if ((simNode.y === undefined || isNaN(simNode.y)) && nDim > 1) simNode.y = 0
          if ((simNode.z === undefined || isNaN(simNode.z)) && nDim > 2) simNode.z = 0

          // the simnode status is in the eonode properties
          let properties = eonode.properties
          if (properties.anchor) { // fix situs
            simNode.fx = simNode.x
            simNode.fy = simNode.y
            simNode.fz = simNode.z
          }

          // the simnode velocity is in the eonode properties velin
          simNode.vx = properties.velin[0] // eonode velocity to simnode
          simNode.vy = properties.velin[1]
          simNode.vz = properties.velin[2]

          if (isNaN(simNode.vx)) simNode.vx = 0 // velocity defs
          if (nDim > 1 && isNaN(simNode.vy)) simNode.vy = 0
          if (nDim > 2 && isNaN(simNode.vz)) simNode.vz = 0
          simNode.eoload = eoload // anitem eoload to simnode

          if (eoload && eoload.id !== undefined) { // link nodes
            simNode.id = eoload.id // simnode id from eofold.eoload.id
          } else {
            simNode.id = simNode.uid
          }

          if (eoload && eoload.link) {  // links
            simNode.source = eoload.link.source
            simNode.target = eoload.link.target
          }

          simNodes.push(simNode)
        }
      }

      // md: simnodes: {x,y,z}, {vx,vy,vz}, eoload, index
      return simNodes
    }

    // ............................. restoreNodes
    function restoreNodes (simNodes, aniItems) {
      let updItems = []

      if (simNodes.length > 0) {
        for (let i = 0; i < simNodes.length; ++i) {
          let simNode = simNodes[i]

          let updItem = aniItems[i] // each anitem

          if (updItem.eonode) {
            let eonode = mgeonode.init(updItem.eonode)
            eonode.properties.geodelta[0] = simNode.x - eonode.geometry.coordinates[0]
            eonode.properties.geodelta[1] = simNode.y - eonode.geometry.coordinates[1]
            eonode.properties.geodelta[2] = simNode.z - eonode.geometry.coordinates[2]

            eonode.properties.velin[0] = simNode.vx // linear velocities
            eonode.properties.velin[1] = simNode.vy
            eonode.properties.velin[2] = simNode.vz

            eonode.properties.prevous[0] = eonode.geometry.coordinates[0] // previous location
            eonode.properties.prevous[1] = eonode.geometry.coordinates[1]
            eonode.properties.prevous[2] = eonode.geometry.coordinates[2]

            eonode.geometry.coordinates[0] = simNode.x // after sim location
            eonode.geometry.coordinates[1] = simNode.y
            eonode.geometry.coordinates[2] = simNode.z

            updItem.eonode = eonode
          }

          updItems.push(updItem)
        }
      }

      // md: aftersim eonode (s)
      // md:     coordinates
      // md:     properties.{geodelta, prevous, velin}

      return updItems
    }

    // ............................. simulate
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

        if (aniItem.geoforces !== undefined) { // forces in aniItem
          let forces = muonProps.fa(aniItem.geoforces)

          for (let j = 0; j < forces.length; j++) { // for each force in aniItem
            let aniForce = forces[j] // aniForce in anima.geoforces eg. force_gravity
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
                muonStore.apply({type: 'UPDATEANIMAS', caller: 'simulation', animas: aniSims})
              })

            if (aniForce.field !== undefined) { // field forces
              let aniCompForces = aniForce.field({ // mamy to share properties
                elapsed: elapsed, // elapsed
                nodes: aniNodes, // aniNodes
                properties: aniForce.properties, // snapped properties
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

    // ............................. enty
    let enty = {}
    enty.sim = (_) => { if (_ === undefined) return sim; else { sim = _; return enty } }
    enty.dim = (_) => { if (_ === undefined) return dim; else { dim = _; return enty } }
    enty.simulate = simulate

    return enty
  }

  exports.muonSim = muonSim
}))
