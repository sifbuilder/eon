	/***********
	 *		@muonForces
	 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.muonForces = global.muonForces || {})));
}(this, function (exports) { 'use strict';


	/***********
	 *		@isolate
	 */	
let isolate = function (params) {	// filter, force, nodes, params, type
		let nodes = params.nodes
		let force = params.force
		let filter = params.filter

		if (force !== null) { 

			let simNodes  =  nodes.filter(filter)			// filter nodes
			let dim = params.params.dim || 3					// params for dim

			var initialize = force.initialize
			force.initialize = () => initialize.call(force, simNodes, dim)
			
			return force
		}
	}		

	/***********
	 *		@muonForces
	 */	
var muonForces = function (__mapper = {}) {

		let f = __mapper("props")()

		
	/***********
	 *		@force
	 */		
	let force = function (params) {
		
		let aniforce, d3force

		let p = {
			"nodes": params.nodes,
			"filter": params.filter,
			"force": params.force || undefined
		}
		
		if (params.type !== undefined) {
			p.type = params.type
			p.force = (__mapper("xs").f(p.type)) ? __mapper("xs").f(p.type).force(params) : null // muon d3force
			p.params = params
		}
		
		aniforce = isolate(p)			// force, params:{nodes, filter, force}
		return aniforce
		
	}

	/***********
	 *		@enty
	 */	
	var enty = () => {}
		enty.force = force
	return enty
	
}

exports.muonForces = muonForces

}));
