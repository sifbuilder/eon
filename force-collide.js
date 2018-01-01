/* -------------------------- */		
/*       forceCollide  			*/
/* -------------------------- */	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.forceCollide = global.forceCollide || {})));
}(this, function (exports) { 'use strict';


var forceCollide = function forceCollide(__mapper = {}) {

	let props = __mapper("props")()

// -------------------------- */
//       force								*/
// -------------------------- */		
let force = function(params) {
		let nodes = params.nodes || []
		let dim = params.dim || 3

		let strength = params.strength || 1
		let radii = params.radii || 1
		let iterations = params.iterations || 1

		let d3src = (params.src !== undefined) ? params.src : d3	// d3_force

		let d3force = d3src.forceCollide(nodes, dim)
			.strength(strength)
			.radius(radii)
			
		return d3force
		
}

/* -------------------------- */		
/*        muonApi		  			*/		
/* -------------------------- */					
	var muonApi = function muonApi() {}
	muonApi.force = force

	return muonApi

}

exports.forceCollide = forceCollide

}));
