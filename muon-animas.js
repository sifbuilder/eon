/***************************
 *        @muonAnimas
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.muonAnimas = global.muonAnimas || {})));
}(this, function (exports) { 'use strict';

var muonAnimas = function () {

	var state = {}

	state.eye = { "m1":[[[4,3.93]]],"m2":[[[4,3.93]]],"n1":2,"n2":2,"n3":[[[2,1]]],"a":[[[2,3]]],"b":1,	}
	state.hexagon = { "m1":6,"m2":6,"n1":1000,"n2":400,"n3":400,"a":1,"b":1, }
	state.star = { "m1":5,"m2":5,"n1":2,"n2":7,"n3":7,"a":1,"b":1, }
	state.pentagon = { "m1":5,"m2":5,"n1":1000,"n2":600,"n3":600,"a":1,"b":1, }
	state.star = { "m1":5,"m2":5,"n1":2,"n2":7,"n3":7,"a":1,"b":1, }
	state.circle = { "m1":4,"m2":4,"n1":2,"n2":2,"n3":2,"a":1,"b":1, }
	state.hexagon = { "m1":[[[4,4,5,5,4]]],"m2":[[[4,4,5,5,4]]],"n1":2,"n2":[[[2,2,7,7,2]]],"n3":[[[2,2,7,7,2]]],"a":1,"b":1, }
	state.cirsquare = { "m1":4,"m2":4,"n1":[[[2,2,100,100,2]]],"n2":[[[2,2,100,100,2]]],"n3":[[[2,2,100,100,2]]],"a":1,"b":1, }
	state.square = { "m1":4,"m2":4,"n1":[[[100,100]]],"n2":[[[100,100]]],"n3":[[[100,100]]],"a":1,"b":1, }
	state.dynsquare = { "m1":[[[4,5]]],"m2":[[[4,5]]],"n1":[[[100,100,100,100]]],"n2":[[[200,200,100,100]]],"n3":[[[200,200,100,100]]],"a":[[[1,1,1,1]]],"b":[[[1,1,1,1]]],}
	state.simfly = { "m1":10.07,"m2":13.45,"n1":0.75,"n2":0.32,"n3":10,"a":1,"b":1,	}
	state.tri = { "m1":[[[3,3]]],"m2":[[[3,3]]],"n1":1,"n2":1,"n3":1,"a":1,"b":1,	}

	state.satellite = {

				"x": {
							"m1":4,"m2":4,"n1":2,"n2":2,"n3":2,"a":1,"b":1, 		// circle
							"ra2": 260,
							"v0": 0,"v1":1,
							"w4":  0,
							"seg5": 360,"pa6":0,"pb7":-1,
							"fas8": 0,
					},
					"y": {
							"m1":4,"m2":4,"n1":2,"n2":2,"n3":2,"a":1,"b":1, 		// circle
							"ra2": 260,
							"v0": 0, "v1":1,
							"w4": 0,
							"seg5": 360,"pa6":0,"pb7":-1,
							"fas8": -90,
					},
					"z": {
							"m1":8,"m2":1,"n1":2,"n2":2,"n3":2,"a":1,"b":1, 		// pseudo circle
							"ra2": 260,
							"v0": 0, "v1":1,
							"w4": 0,
							"seg5": 360,"pa6":0,"pb7":-1,
							"fas8": 0,
					},

			}

	state.fly = {

			"x": {
					"m1":10.07,"m2":13.45,"n1":0.75,"n2":0.32,"n3":10,"a":1,"b":1,	// fly
					"ra2": 162,
					"v0": 0,"v1":1,
					"w4":  [[[0,0,0,-9 * 90,-9 * 90 ,0 ,0]]],
					"seg5": 360,"pa6":0,"pb7":-1,
					"fas8": 0,
				},
				"y": {
					"m1":10.07,"m2":13.45,"n1":0.75,"n2":0.32,"n3":10,"a":1,"b":1,	// fly
					"ra2": 162,
					"v0":0,"v1":1,
					"w4": [[[0,0,0,-9 * 90,-9 * 90, 0 ,0]]],
					"seg5": 360,"pa6":0,"pb7":-1,
					"fas8": -90,
				},
				"z": {
					"m1":[[[3,3]]],"m2":[[[3,3]]],"n1":1,"n2":1,"n3":1,"a":1,"b":1, // tri
					"ra2": [[[30,30,162/  Math.sqrt(2), 162/  Math.sqrt(2), 162/  Math.sqrt(2) , 162/  Math.sqrt(2), 262/  Math.sqrt(2) ]]],
					"v0": 0,"v1":1,
					"w4":  0,
					"seg5": 360,"pa6":0,"pb7":-1,
					"fas8": 0,
				}

			}


	var enty = function enty(_) {

		if (arguments.length > 0 && typeof _ === 'string' && state[_] !== undefined) return state[_]
		else return null

	}
	return enty

}

exports.muonAnimas = muonAnimas

}));
