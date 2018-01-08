/* -------------------------- */		
/*       forcecurb   		*/
/* -------------------------- */	

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.forcecurb = global.forcecurb || {})));
}(this, function (exports) { 'use strict';

/**
	*	ref: 
	*/

/* -------------------------- 	*/		
/*        static  							*/		
/* -------------------------- 	*/	

let constant = function constant(x) {
  return function() {
    return x
  }
}

/* -------------------------- 	*/		
/*        forcecurb  				*/		
/* -------------------------- 	*/	
var forcecurb = function forcecurb(__mapper = {}) {

		let props = __mapper("props")()
	

/* -------------------------- 	*/		
/*        muonApi		  				*/		
/* -------------------------- 	*/					

	var muonApi = function muonApi() {}



// -------------------------------------//
//       force													//
// -------------------------------------//		
muonApi.force = function(params) {
  let nodes = params.nodes
  let retention = params.retention	// unit retention


  function force() {

		for (let i = 0; i < nodes.length; ++i) {
			
				let node = nodes[i]

				let unitPassed = node.payload.tim.unitPassed

				if (unitPassed === undefined) console.log(" unitPassed undefined")
					
				
				if (unitPassed > retention) {
						// console.log(" remove on retention", node )			
					__mapper("muonStore").apply({"type":"DELANIMA","caller":"force retention","anima":node})
				}

		}
  }

  function initialize() {
    if (!nodes) return
  }

  force.initialize = function(_) {
    nodes = _
    initialize()
  }

	
  return force
}

// -------------------------------------//
//       muonApi												//
// -------------------------------------//			
	
	return muonApi

}

exports.forcecurb = forcecurb

}));