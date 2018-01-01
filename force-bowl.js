/* -------------------------- */		
/*       forcebowl   			*
//* -------------------------- */	

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.forcebowl = global.forcebowl || {})));
}(this, function (exports) { 'use strict';

/**
	*	ref: 
	* Circular Vortex Emergence
	* Philippe Rivière’s Block 18ef9696f217cd242f6fb8ec776dc3e3
	* Updated December 29, 2016
	* https://bl.ocks.org/fil/18ef9696f217cd242f6fb8ec776dc3e3
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
/*        forcebowl  				*/		
/* -------------------------- 	*/	
var forcebowl = function forcebowl(__mapper = {}) {

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
		let x0 = (params.x0 !== undefined) ? params.x0 : 0
		let y0 = (params.y0 !== undefined) ? params.y0 : 0
		let r = (params.r !== undefined) ? params.r : 1
		let act = (params.act !== undefined) ? params.act : "reverse"
		
  function force() {

		for (let i = 0; i < nodes.length; ++i) {
				let node = nodes[i]
				
						let dx = node.x - x0,
                dy = node.y - y0,
                d2 = dx * dx + dy * dy;
								
						let dd2x = (node.x + node.vx) - x0
						let dd2y = (node.y + node.vy) - y0
						let dd2 = dd2x * dd2x + dd2y * dd2y
						
						if (d2 < r * r && dd2 >= r * r) {
							
							if (act === "reverse") {
                let angle = Math.atan2(dy, dx)
                let angle1 = Math.atan2(node.vy, node.vx)
                let angle2 = Math.PI - angle1 + 2 * angle
                let norm = Math.sqrt(node.vx*node.vx + node.vy*node.vy)
								
                node.vx = norm * Math.cos(angle2)
                node.vy = norm * Math.sin(angle2)
							}	else if (act === "erase") {
								__mapper("muonStore").apply({"type":"DELANIMA","caller":"force limit","anima":node})
							}
								
            } else if (d2 > r * r && dd2 <= r * r) {
                var angle = Math.atan2(dy, dx),
                    angle1 = Math.atan2(node.vy, node.vx),
                    angle2 = Math.PI - angle1 + 2 * angle,
                    norm = Math.sqrt(node.vx*node.vx + node.vy*node.vy);
                node.vx = norm * Math.cos(angle2);
                node.vy = norm * Math.sin(angle2);
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

 force.x0 = function(_) {
		return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), initialize(), force) : x0;
 }

 force.y0 = function(_) {
		return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), initialize(), force) : y0;
 }

 force.r = function(_) {
		return arguments.length ? (r = typeof _ === "function" ? _ : constant(+_), initialize(), force) : r;
 }
	
  return force
}

// -------------------------------------//
//       muonApi												//
// -------------------------------------//			
	
	return muonApi

}

exports.forcebowl = forcebowl

}));