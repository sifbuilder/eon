/* -------------------------- */		
/*       forceMagnetic  			*/
/* -------------------------- */	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.forceMagnetic = global.forceMagnetic || {})));
}(this, function (exports) { 'use strict';

// https://bl.ocks.org/vasturiano/2da88fb89cc75d18b20d8a7776fd6860

var forceMagnetic = function forceMagnetic(__mapper = {}) {

	let props = __mapper("props")()

/* -------------------------- */
/*        force				  			*/
/* -------------------------- */	
let force = function(params) {

		let strength = params.strength || (() => 0.1)


		let d3src = (params.src !== undefined) ? params.src : d3 // d3_force

console.log("d3src params",params)		
// console.log("d3src",d3.forceMagnetic)		
// console.log("d3src d3src", d3.forceMagnetic)		
		
		let d3force = d3.forceMagnetic()
			.strength(strength)
	
		return d3force
		
}

/* -------------------------- */
/*        muonApi		  			*/
/* -------------------------- */
	var muonApi = function muonApi() {}
	muonApi.force = force

	return muonApi

}

exports.forceMagnetic = forceMagnetic

}));
