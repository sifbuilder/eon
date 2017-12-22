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
  // .nodes(stace.animas.filter(d => (d.ric.gid === "anima3d")))
  // .force('link', d3_force.forceLink().id(d => d._id).links(stace.animas.filter(d => (d.ric.gid === "vortlink"))).strength(0.01))
  // .force('charge', d3_force.forceManyBody().strength(-10.9))
  // .force('center', d3_force.forceCenter(0))
  // .restart()
  // .on("tick", ()=> {
  // console.log("------------ tick")
  // __mapper("muonStore").apply({"type":"UPDANIMA","caller":"simulation  ","animas":stace.sim.nodes()})
  // })

// ------------------------- muonSimulation
  let muonSimulation = function muonSimulation(__mapper = {}) {

    let props = __mapper("props")()
    let f = props.lib
    let sim = d3_force.forceSimulation()    //
    let dim = 3

    // simulate
    // https://bl.ocks.org/frogcat/a06132f64b7164c1b1993c49dcd9178f
    // https://www.nist.gov/sites/default/files/documents/2017/05/09/d3rave_poster.pdf

    // ------------------------- initNodes
    function initNodes(nodes, nDim) {
    // console.log("p.simulation nodes", nodes)
      for (let i = 0, n = nodes.length, node; i < n; ++i) {
        node = nodes[i]
        if ( node.x === undefined || isNaN(node.x))               node.x = 0
        if ((node.y === undefined || isNaN(node.y)) && nDim > 1 ) node.y = 0
        if ((node.z === undefined || isNaN(node.z)) && nDim > 2 ) node.z = 0

        if (isNaN(node.vx))               node.vx = 0
        if (nDim > 1 && isNaN(node.vy))   node.vy = 0
        if (nDim > 2 && isNaN(node.vz))   node.vz = 0

      }
      return nodes
    }

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
    /***************************
 *        @simulate
 */
    let simulate = function simulate (sim, animas = [], elapsed = 0, dim = 3) {

      let nodes = initNodes(animas, dim)
      sim
        .stop()
        .numDimensions(3)
        .nodes(nodes)

      for (let i=0; i<nodes.length; i++) {
        let anima = nodes[i]

        if (anima.forces !== undefined ) {      // force forces in animas
          let forces = f.fa(anima.forces)

          for (let j=0; j<forces.length; j++) {
            let field  = __mapper("xs").b("snap")(forces[j] , anima.tim.unitTime) /* snap field*/

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


                __mapper("xs").m("store").apply({"type":"UPDANIMA","caller":"simulation  ","animas":nodes})


              })

            if (field.field !== undefined) {      // field forces

              let itemsNew = field.field({
                "elapsed":elapsed,
                "nodes":nodes,
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
      return nodes
    }

    /***************************
 *        @enty
 */
    let enty = function enty() {}
    enty.sim = (_) => {if ( _ === undefined ) return sim; else { sim = _ ; return enty }}
    enty.dim = (_) => {if ( _ === undefined ) return dim; else { dim = _ ; return enty }}
    enty.simulate = simulate

    return enty

  }

  exports.muonSimulation = muonSimulation

}))
