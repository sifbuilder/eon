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
			let aniNodes = []

      for (let i = 0, n = aniItems.length; i < n; ++i) {

        let aniItem = aniItems[i]
				let payload = aniItem.payload
				let aniNode = {}

				aniNode.x = payload.x
				aniNode.y = payload.y
				aniNode.z = payload.z
				aniNode.vx = payload.vx
				aniNode.vy = payload.vy
				aniNode.vz = payload.vz
				aniNode.payload = payload
				aniNode.id = payload.uid


        if ( aniNode.x === undefined || isNaN(aniNode.x))               aniNode.x = 0
        if ((aniNode.y === undefined || isNaN(aniNode.y)) && nDim > 1 ) aniNode.y = 0
        if ((aniNode.z === undefined || isNaN(aniNode.z)) && nDim > 2 ) aniNode.z = 0

        if (isNaN(payload.vx))               														aniNode.vx = 0
        if (nDim > 1 && isNaN(payload.vy))   														aniNode.vy = 0
        if (nDim > 2 && isNaN(payload.vz))   														aniNode.vz = 0

				if ( aniNode.x === undefined || isNaN(aniNode.x))               aniNode.x = 0
        if ((aniNode.y === undefined || isNaN(aniNode.y)) && nDim > 1 ) aniNode.y = 0
        if ((aniNode.z === undefined || isNaN(aniNode.z)) && nDim > 2 ) aniNode.z = 0

        if (isNaN(aniNode.vx))               														aniNode.vx = 0
        if (nDim > 1 && isNaN(payload.vy))   														aniNode.vy = 0
        if (nDim > 2 && isNaN(payload.vz))   														aniNode.vz = 0



				aniNodes.push(aniNode)

      }

      return aniNodes
    }

    // ------------------------- restoreNodes
    function restoreNodes(aniNodes, aniItems) {

				let aniSims = []
		
				if (aniNodes.length > 0) {
						for (let i = 0; i < aniNodes.length; ++i) {
							
							let aniNode = aniNodes[i]
		 
							let aniSim = Object.assign({}, aniItems[i])
								aniSim.payload = aniNode.payload			// 

							aniSim.payload.dx = aniNode.x - aniSim.payload._x
							aniSim.payload.dy = aniNode.y - aniSim.payload._y
							aniSim.payload.dz = aniNode.z - aniSim.payload._z	// delta

							aniSim.payload._x = aniSim.payload.x
							aniSim.payload._y = aniSim.payload.y
							aniSim.payload._z = aniSim.payload.z		// previous position

							aniSim.payload.x = aniNode.x
							aniSim.payload.y = aniNode.y
							aniSim.payload.z = aniNode.z							// current position

							aniSim.payload.vx = aniNode.vx
							aniSim.payload.vy = aniNode.vy
							aniSim.payload.vz = aniNode.vz						// current velocity

		if (0 && 1) console.log("m.simulation aniSim", i, aniSim.payload)

							aniSims[i] = aniSim
						
					}
if (aniNodes.length > 2) if (0 && 1) console.log("m.simulation aniSims --- ", aniSims[2].payload)
					
				}
			
			return aniSims
		}

    /***************************
 *        @simulate
 */
    let simulate = function (sim, aniItems = [], elapsed = 0, dim = 3) {

			let aniSims = []
			
			if (0 && 1) console.log("m.animation simulate", aniItems.length)
      let aniNodes = initNodes(aniItems, dim)		// < aniNodes

      sim
        .stop()
        .numDimensions(3)
        .nodes(aniNodes)

      for (let i=0; i<aniItems.length; i++) {
        
        let aniItem = aniItems[i]												// each anima or anigram

        if (aniItem.payload.forces !== undefined ) {     // forces in aniItem
          let forces = f.fa(aniItem.payload.forces)

          for (let j=0; j<forces.length; j++) {			// for each force in aniItem
						
            // let field  = msnap(forces[j] , aniItem.payload.tim.unitTime) /* snap field*/
            let aniForce  = forces[j]				// aniForce in anima.payload.forces eg. force_gravity
						
            // let fieldProps = field      // field properties
						
            let cttes = simConstants(sim, aniForce)
            sim
              .alpha(cttes.alpha)
              .alphaMin(cttes.alphaMin)
              .alphaDecay(cttes.alphaDecay)
              .alphaTarget(cttes.alphaTarget)
              .velocityDecay(cttes.velocityDecay)
              .on("tick", ()=> {

                if (aniForce.ticked !== undefined) aniForce.ticked
								
								aniSims = restoreNodes(aniNodes, aniItems)	// > aniNodes								
								mstore.apply({type:"UPDATEANIGRAMS",caller:"simulation",anigrams:aniSims})

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
