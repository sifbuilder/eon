/*******************************************
 * 			@geoUnimercator
 * 
 */	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.geoUnimercator = global.geoUnimercator || {})));
}(this, function (exports) { 'use strict';

// https://d3js.org/d3-geo/ Version 1.9.0. Copyright 2017 Mike Bostock.

var geoUnimercator = function geoUnimercator(__mapper = {}) {

	let width = __mapper("xs").r("renderer").width()
	let height = __mapper("xs").r("renderer").height()

	/*******************************************
	 * 			@mercatorRaw
	 */	
var atan = Math.atan;
var exp = Math.exp;
var log = Math.log;	 
var tan = Math.tan;
var pi = Math.PI;
var degrees = 180 / pi
let sqrt1_2 = Math.sqrt(0.5)
var phi1 = atan(sqrt1_2) * degrees;	
var halfPi = pi / 2;
var tau = pi * 2;
	 
function mercatorRaw(lambda, phi) {
  return [lambda, log(tan((halfPi + phi) / 2))];
}
mercatorRaw.invert = function(x, y) {
  return [x, 2 * atan(exp(y)) - halfPi];
};


	let m, mercator
	/*******************************************
	 * 			@enty mercator
	 */		
var enty = mercator = function() {				// mercator
  let m =  mercatorProjection(mercatorRaw)
	return m		

};

function mercatorProjection(project) {
  var m = d3.geoProjection(project),
      center = m.center,
      scale = m.scale,
      translate = m.translate,
      clipExtent = m.clipExtent,
      x0 = null, y0, x1, y1; // clip extent

  m.scale = function(_) {

console.log("scale ------------ ", _)	
		
    return arguments.length ? (scale(_), reclip()) : scale();
  };

  m.translate = function(_) {
    return arguments.length ? (translate(_), reclip()) : translate();
  };

  m.center = function(_) {
    return arguments.length ? (center(_), reclip()) : center();
  };

  m.clipExtent = function(_) {
    return arguments.length ? ((_ == null ? x0 = y0 = x1 = y1 = null : (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1])), reclip()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  function reclip() {
    var k = pi * scale(),
        t = m(d3.geoRotation(m.rotate()).invert([0, 0]));
    return clipExtent(x0 == null
        ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw
        ? [[Math.max(t[0] - k, x0), y0], [Math.min(t[0] + k, x1), y1]]
        : [[x0, Math.max(t[1] - k, y0)], [x1, Math.min(t[1] + k, y1)]]);
  }

  return reclip();
}

		return enty
		
}

exports.geoUnimercator = geoUnimercator

}));
