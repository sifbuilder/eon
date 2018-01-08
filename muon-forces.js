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
let isolate = function isolate(params) {
		let nodes = params.nodes
		
		let force = params.force
		let filter = params.filter

		if (force !== null) { 

			let simNodes  =  nodes.filter(filter)
			let dim = params.params.dim || 3							// params for dim

			var initialize = force.initialize
			force.initialize = function() { initialize.call(force, simNodes, dim) }
			
			
			return force
		}
	}		

	/***********
	 *		@muonForces
	 */	
var muonForces = function muonForces(__mapper = {}) {

		let props = __mapper("props")()
		let f = props.lib
		let local = {}

	/***********
	 *		@force
	 */		
let force = function (params) {
	let p = {
		"nodes": params.nodes,
		"filter": params.filter,
		"force": params.force || undefined
	}
	
	let force = null
	let d3force = null
	if (params.type !== undefined) {
		p.type = params.type
		if (__mapper("xs").f(p.type)) {
			
				d3force = __mapper("xs").f(p.type).force(params)

		}  	
		
		p.force = d3force
		p.params = params
		
	}
	
	force = isolate(p)
  return force
	
}

	/***********
	 *		@enty
	 */	
	var enty = function enty() {}
	enty.force = force
	return enty
	
	
}

exports.muonForces = muonForces

}));
