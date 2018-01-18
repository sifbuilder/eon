/***************************
 *        @muonSimulation
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.muonSimulation = global.muonSimulation || {})))
}(this, function (exports) { "use strict"

// simulation @forces
// stace.sim
  // .stop()
  // .numDimensions(3) // graph.numDimensions
  // .aniNodes(stace.animas.filter(d => (d.ric.gid === "anima3d")))
  // .force('link', d3_force.forceLink().id(d => d._id).links(stace.animas.filter(d => (d.ric.gid === "vortlink"))).strength(0.01))
  // .force('charge', d3_force.forceManyBody().strength(-10.9))
  // .force('center', d3_force.forceCenter(0))
  // .restart()
  // .on("tick", ()=> {
  // console.log("------------ tick")
  // __mapper("muonStore").apply({"type":"UPDANIMA","caller":"simulation  ","animas":stace.sim.aniNodes()})
  // })

// ------------------------- muonSimulation
  let muonSimulation = function (__mapper = {}) {

    let f = __mapper("props")()
		let msnap = __mapper("xs").b("snap")
		let mstore = __mapper("xs").m("store")

		let _geonode = {
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: [0,0,0],
				},
				properties: {
					orgen: [0,0,0],
					velin: [0,0,0],
					prevous: [0,0,0],
					geodelta: [0,0,0],
				}
		}

    let sim = d3_force.forceSimulation()    //
    let dim = 3

    // simulate
    // https://bl.ocks.org/frogcat/a06132f64b7164c1b1993c49dcd9178f
    // https://www.nist.gov/sites/default/files/documents/2017/05/09/d3rave_poster.pdf


    // ------------------------- simConstants
    function simConstants(sim, fieldProps = {}) {

      let cttes = {}
				cttes.alpha = (fieldProps.alpha !== undefined) ? fieldProps.alpha : sim.alpha()
				cttes.alphaMin = (fieldProps.alphaMin !== undefined) ? fieldProps.alphaMin : sim.alphaMin()
				cttes.alphaDecay = (fieldProps.alphaDecay !== undefined) ? fieldProps.alphaDecay : sim.alphaDecay()
				cttes.alphaTarget = (fieldProps.alphaTarget !== undefined) ? fieldProps.alphaTarget : sim.alphaTarget()
				cttes.velocityDecay = (fieldProps.velocityDecay !== undefined) ? fieldProps.velocityDecay : sim.velocityDecay()
      return cttes

    }

    // ------------------------- initNodes
    function initNodes(aniItems, nDim) {
			let simNodes = []
			
if (0 && 1) console.log("aniItems" , aniItems)			
			
      for (let i = 0, n = aniItems.length; i < n; ++i) {

        let aniItem = aniItems[i]
				let payload = aniItem.payload
				let geonode = payload.geonode || _geonode
				
				let simNode = {}

				simNode.x = 	geonode.geometry.coordinates[0]
				simNode.y = 	geonode.geometry.coordinates[1]
				simNode.z = 	geonode.geometry.coordinates[2]
				
				simNode.vx = 	geonode.properties.velin[0]
				simNode.vy = 	geonode.properties.velin[1]
				simNode.vz = 	geonode.properties.velin[2]
				
				simNode.payload = payload
				simNode.id = payload.uid


        if ( simNode.x === undefined || isNaN(simNode.x))               simNode.x = 0
        if ((simNode.y === undefined || isNaN(simNode.y)) && nDim > 1) 	simNode.y = 0
        if ((simNode.z === undefined || isNaN(simNode.z)) && nDim > 2) 	simNode.z = 0

        if (isNaN(simNode.vx))               														simNode.vx = 0
        if (nDim > 1 && isNaN(simNode.vy))   														simNode.vy = 0
        if (nDim > 2 && isNaN(simNode.vz))   														simNode.vz = 0

				if ( simNode.x === undefined || isNaN(simNode.x))               simNode.x = 0
        if ((simNode.y === undefined || isNaN(simNode.y)) && nDim > 1) 	simNode.y = 0
        if ((simNode.z === undefined || isNaN(simNode.z)) && nDim > 2) 	simNode.z = 0

        if (isNaN(simNode.vx))               														simNode.vx = 0
        if (nDim > 1 && isNaN(payload.vy))   														simNode.vy = 0
        if (nDim > 2 && isNaN(payload.vz))   														simNode.vz = 0

				simNodes.push(simNode)

      }

      return simNodes
    }

    // ------------------------- restoreNodes
    function restoreNodes(simNodes, aniItems) {

				let updAniItems = []
		
				if (simNodes.length > 0) {
						for (let i = 0; i < simNodes.length; ++i) {
							let simNode = simNodes[i]

							let updAniItem = Object.assign({}, aniItems[i])
							
							let updAniPayload = simNode.payload
									updAniPayload.geonode = updAniPayload.geonode || _geonode 
							
							let updAniGeometry = updAniPayload.geonode.geometry,
								updaAniCoordinates = updAniGeometry.coordinates,
								
								updaAniProperties = updAniPayload.geonode.properties,
								updaAniOrigin = 	updaAniProperties.orgen,
								updaAniVelocity = updaAniProperties.velin,
								updaAniVelangular = updaAniProperties.velang,
								updaAniPrevious = updaAniProperties.prevous,
								updaAniGeodelta = updaAniProperties.geodelta
							
							updaAniGeodelta[0] = simNode.x - updaAniCoordinates[0]
							updaAniGeodelta[1] = simNode.y - updaAniCoordinates[1]
							updaAniGeodelta[2] = simNode.z - updaAniCoordinates[2]
							
							updaAniCoordinates[0] = simNode.x
							updaAniCoordinates[1] = simNode.y
							updaAniCoordinates[2] = simNode.z
						
							updaAniVelocity[0] = simNode.vx
							updaAniVelocity[1] = simNode.vy
							updaAniVelocity[2] = simNode.vz
							

						if (0 && 1) console.log("m.simulation updAniItem", i, updAniItem)
						
						updAniItems.push(updAniItem)	
						
					}
					if (simNodes.length > 2) if (0 && 1) console.log("m.simulation updAniItems --- ", updAniItems[2].payload)
					
				}
			
			return updAniItems
		}

    /***************************
 *        @simulate
 */
    let simulate = function (sim, aniItems = [], elapsed = 0, dim = 3) {

			let aniSims = []
			let numDims = 3
			
			if (0 && 1) console.log("m.animation simulate", aniItems.length)
      let aniNodes = initNodes(aniItems, dim)		// < aniNodes

      sim
        .stop()
        .numDimensions(numDims)
        .nodes(aniNodes)

      for (let i=0; i<aniItems.length; i++) {
        
        let aniItem = aniItems[i]						// each anima or anigram

        if (aniItem.payload.forces !== undefined ) {     // forces in aniItem
          let forces = f.fa(aniItem.payload.forces)

          for (let j=0; j<forces.length; j++) {			// for each force in aniItem
						
            let aniForce  = forces[j]		// aniForce in anima.payload.forces eg. force_gravity
            let cttes = simConstants(sim, aniForce.properties)
						
            sim
              .alpha(cttes.alpha)
              .alphaMin(cttes.alphaMin)
              .alphaDecay(cttes.alphaDecay)
              .alphaTarget(cttes.alphaTarget)
              .velocityDecay(cttes.velocityDecay)
              .on("tick", () => {

                if (aniForce.ticked !== undefined) aniForce.ticked
								
								aniSims = restoreNodes(aniNodes, aniItems)	// > aniNodes								
								mstore.apply({type:"UPDATEANIMAS",caller:"simulation",animas:aniSims})

              })

            if (aniForce.field !== undefined) {   // field forces

              let aniCompForces = aniForce.field({			// mamy to share properties
                "elapsed": elapsed,											// elapsed
                "nodes": aniNodes,											// aniNodes
                "properties": aniForce.properties      	// snapped properties
              })
							
              for (let k=0; k < aniCompForces.length; k++) {
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
    enty.sim = (_) => {if ( _ === undefined ) return sim; else { sim = _ ; return enty }}
    enty.dim = (_) => {if ( _ === undefined ) return dim; else { dim = _ ; return enty }}
    enty.simulate = simulate

    return enty

  }

  exports.muonSimulation = muonSimulation

}))
