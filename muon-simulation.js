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

      for (let i = 0, n = aniItems.length, aniNode; i < n; ++i) {
        aniNode = aniItems[i]
        if ( aniNode.x === undefined || isNaN(aniNode.x))               aniNode.x = 0
        if ((aniNode.y === undefined || isNaN(aniNode.y)) && nDim > 1 ) aniNode.y = 0
        if ((aniNode.z === undefined || isNaN(aniNode.z)) && nDim > 2 ) aniNode.z = 0

        if (isNaN(aniNode.vx))               aniNode.vx = 0
        if (nDim > 1 && isNaN(aniNode.vy))   aniNode.vy = 0
        if (nDim > 2 && isNaN(aniNode.vz))   aniNode.vz = 0

      }

      return aniItems
    }

    /***************************
 *        @simulate
 */
    let simulate = function simulate (sim, anitems = [], elapsed = 0, dim = 3) {
			if (1 && 1) console.log("m.animation simulate")	
      let aniNodes = initNodes(anitems, dim)
			
      sim
        .stop()
        .numDimensions(3)
        .nodes(aniNodes)

      for (let i=0; i<aniNodes.length; i++) {
        let anima = aniNodes[i]

        if (anima.payload.forces !== undefined ) {      // force forces in anitems
          let forces = f.fa(anima.payload.forces)

          for (let j=0; j<forces.length; j++) {
            let field  = __mapper("xs").b("snap")(forces[j] , anima.payload.tim.unitTime) /* snap field*/

            let fieldProps = field      // field properties
            let cttes = simConstants(sim, fieldProps)
            sim
              .alpha(cttes.alpha)
              .alphaMin(cttes.alphaMin)
              .alphaDecay(cttes.alphaDecay)
              .alphaTarget(cttes.alphaTarget)
              .velocityDecay(cttes.velocityDecay)
              .on("tick", ()=> {

                if (field.ticked !== undefined) field.ticked


                __mapper("xs").m("store").apply({"type":"UPDANIMA","caller":"simulation  ","animas":aniNodes})


              })

            if (field.field !== undefined) {      // field forces

              let itemsNew = field.field({
                "elapsed":elapsed,
                "nodes":aniNodes,
                "pic":fieldProps                          // properties snapped
              })

              for (let k=0; k < itemsNew.length; k++) {
                sim.force(itemsNew[k].key, itemsNew[k].force) // muon forces
              }

            }
          }
        }
      }

      sim.restart()

			// for (let i=0; i<aniNodes.length; i++) {

				// let aniNode = aniNodes[i]

				// let payload = (aniNode.payload !== undefined) ? aniNode.payload : {}

					// payload._x = payload.x 
					// payload._y = payload.y 
					// payload._z = payload.z						// save previous position
						
					// payload.x = aniNode.x 
					// payload.y = aniNode.y 
					// payload.z = aniNode.z							// save current position
						
					// payload.vx = aniNode.vx 
					// payload.vy = aniNode.vy 
					// payload.vz = aniNode.vz						// save current velocity
						
					// payload.dx = payload.x - payload._x	// save delta position
					// payload.dy = payload.y - payload._y	
					// payload.dz = payload.z - payload._z

				// aniNode.payload = payload
		// if (0 && 1) console.log("m.simulation aniNode", i, aniNode, payload)



			// }


      return aniNodes
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
