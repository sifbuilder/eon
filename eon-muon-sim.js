/***************************
 *        @eonMuonSim
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonMuonSim = global.eonMuonSim || {})))
}(this, function (exports) {
  'use strict'

  async function eonitem (__eo = {}) {
    let [
      d3Force3d,
      eonMuonEonode,
      eonMuonSnap,
      eonMuonStore,
    ] = await Promise.all([
      __eo('xs').b('d3-force-3d'),
      __eo('xs').b('eon-muon-eonode'),
      __eo('xs').b('eon-muon-snap'),
      __eo('xs').b('eon-muon-store'),
    ])

    let d3_force = d3Force3d
    let sim = d3_force.forceSimulation() //
    let dim = 3

    // props.o
    // props.fa
    // props.v

    const o = obj => {
      if (obj == null || typeof obj !== 'object') return obj
      let copy = obj.constructor()
      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
      }
      return copy
    }
    const a = d => {
      let ret = []
      if (d === undefined) { // ret = []
      } else if (d === null) { // ret = []
      } else if (Array.isArray(d)) {
        ret = [...d]
      } else {
        ret = [d]
      }
      return ret
    }
    const fa = d => { // force array
      let ret
      if (Array.isArray(d)) ret = d
      else if (d === null) ret = []
      else if (d === undefined) ret = []
      else if (typeof d === 'object') ret = Object.values(d)
      else ret = d
      return a(ret)
    }

    const v = (d, ...p) => (typeof d === 'function') ? d(...p) : d

    // simulate
    // https://bl.ocks.org/frogcat/a06132f64b7164c1b1993c49dcd9178f
    // https://www.nist.gov/sites/default/files/documents/2017/05/09/d3rave_poster.pdf

    // ............................. simConstants
    function simConstants (sim, fieldProps = {}) {
      let cttes = {}
      cttes.alpha = (fieldProps.alpha !== undefined) ? fieldProps.alpha : sim.alpha()
      cttes.alphaMin = (fieldProps.alphaMin !== undefined) ? fieldProps.alphaMin : sim.alphaMin()
      cttes.alphaDecay = (fieldProps.alphaDecay !== undefined) ? fieldProps.alphaDecay : sim.alphaDecay()
      cttes.alphaTarget = (fieldProps.alphaTarget !== undefined) ? fieldProps.alphaTarget : sim.alphaTarget()
      cttes.velocityDecay = (fieldProps.velocityDecay !== undefined) ? fieldProps.velocityDecay : sim.velocityDecay()
      return cttes
    }

    // ... initNodes
    // ... select the simnodes visible to the force field (from the anitems)
    // ... the force acts on the geonode ...
    // ...    filter out anitems without eonode
    // ... synchronize between the aintem.eonode and the simnode
    // ... simnodes: {x,y,z}, {vx,vy,vz}, eoload, index
    // ...   @anitems: anitems
    // ...   @nDim:   dimensions of the field

    function initNodes (anitems, nDim = 3) {
      let simnodes = []

      for (let i = 0, n = anitems.length; i < n; ++i) {
        let aniItem = anitems[i]
        let eoload = aniItem.eoload

        if (aniItem.eonode !== undefined) { // if simmable  ...
          // the eonode ports info of the simnode
          let eonode = eonMuonEonode.init(aniItem.eonode)

          // the simnode location is in the eonode geometry
          let nodeGeometry = eonode.geometry

          let simNode = o(aniItem)
          simNode.x = nodeGeometry.coordinates[0] // eonode location to simnode
          simNode.y = nodeGeometry.coordinates[1]
          simNode.z = nodeGeometry.coordinates[2]

          simNode.radius = 1 // _e_

          if (simNode.x === undefined || isNaN(simNode.x)) simNode.x = 0 // location defs
          if ((simNode.y === undefined || isNaN(simNode.y)) && nDim > 1) simNode.y = 0
          if ((simNode.z === undefined || isNaN(simNode.z)) && nDim > 2) simNode.z = 0

          // the simnode status is in the eonode properties _e_

          let properties = eonode.properties
          if (properties.anchor) { // fix situs
            simNode.fx = simNode.x
            simNode.fy = simNode.y
            simNode.fz = simNode.z
          }

          // simnode velocity from eonode.properties.velin

          simNode.vx = properties.velin[0] // eonode velocity to simnode
          simNode.vy = properties.velin[1]
          simNode.vz = properties.velin[2]

          if (isNaN(simNode.vx)) simNode.vx = 0 // velocity defs
          if (nDim > 1 && isNaN(simNode.vy)) simNode.vy = 0
          if (nDim > 2 && isNaN(simNode.vz)) simNode.vz = 0
          simNode.eoload = eoload // anitem eoload to simnode

          // set sim id from anitem.eoric.uid _e_

          simNode.id = simNode.eoric.uid

          // sim links

          if (eoload && eoload.link) { // links
            simNode.source = eoload.link.source
            simNode.target = eoload.link.target
          }

          simnodes.push(simNode)
        }
      }

      return simnodes
    }

    // ... restoreNodes
    // ...   @simnodes: simnodes following the field effect
    // ...   @anitems: rebuild anitems with the corresponding simnodes
    // ...   call in simulate, then update animas in store
    // ...    aftersim eonode (s)
    // ...     coordinates
    // ...     properties.{geodelta, prevous, velin}

    function restoreNodes (simnodes, anitems) {
      let updItems = []
      if (simnodes.length > 0) {
        for (let i = 0; i < simnodes.length; ++i) {
          let simNode = simnodes[i]

          let updItem
          for (let j = 0; j < anitems.length; j++) {
            let anitem = anitems[j]
            if (simNode.eoric.uid === anitem.eoric.uid) {
              updItem = anitems[j]

              break
            }
          }

          if (updItem !== undefined) {
            console.assert(updItem.eonode !== undefined)

            let eonode = eonMuonEonode.init(updItem.eonode)
            eonode.properties.geodelta[0] = simNode.x - eonode.geometry.coordinates[0]
            eonode.properties.geodelta[1] = simNode.y - eonode.geometry.coordinates[1]
            eonode.properties.geodelta[2] = simNode.z - eonode.geometry.coordinates[2]

            eonode.properties.hyperdelta[0] += eonode.properties.geodelta[0]
            eonode.properties.hyperdelta[1] += eonode.properties.geodelta[1]
            eonode.properties.hyperdelta[2] += eonode.properties.geodelta[2]

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

            updItems.push(updItem)
          }
        }
      }

      return updItems
    }

    // ............................. simulate
    let simulate = function (sim, anitems = [], elapsed = 0, dim = 3) {
      let aniSims = []
      let numDims = 3

      let aniNodes = initNodes(anitems, dim) // .map(d => eonMuonAnitem.snapani(d, elapsed))

      sim
        .stop()
        .numDimensions(numDims)
        .nodes(aniNodes)

      for (let i = 0; i < anitems.length; i++) {
        let aniItem = anitems[i] // each anima or anigram

        if (aniItem.eoforces !== undefined) { // forces in aniItem
          let forces = fa(aniItem.eoforces)

          for (let j = 0; j < forces.length; j++) { // for each force in aniItem
            let aniForce = forces[j] // aniForce in anima.eoforces eg. force_gravity

            let tu = aniItem.eotim.unTime
            aniForce = v(eonMuonSnap.snap(aniForce, tu), aniItem)

            let cttes = simConstants(sim, aniForce.properties)

            sim
              .alpha(cttes.alpha)
              .alphaMin(cttes.alphaMin)
              .alphaDecay(cttes.alphaDecay)
              .alphaTarget(cttes.alphaTarget)
              .velocityDecay(cttes.velocityDecay)
              .on('tick', () => {
                if (aniForce.ticked !== undefined) aniForce.ticked()

                aniSims = restoreNodes(aniNodes, anitems) // > aniNodes

                eonMuonStore.apply({type: 'UPDANIMA', caller: 'sim', animas: aniSims})
              })

            // ... field method in force
            // ... field gets nodes and force.properties

            let aniCompForce = aniForce.field({

              elapsed: elapsed, // elapsed
              nodes: aniNodes.map(d => d), // aniNodes
              properties: aniForce.properties, // snapped properties

            })

            let { key, force } = aniCompForce
            sim.force(key, force) // muon or builtin force
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

  exports.eonMuonSim = eonitem
}))
