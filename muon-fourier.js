/***************************
 *        @muonFourier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonFourier = global.muonFourier || {})))
}(this, function (exports) {
  'use strict'

// https://raw.githubusercontent.com/andymac-2/fourier-polygon/master/fourier-polygon.js
// https://github.com/andymac-2/fourier-polygon
// (C) 2018 Andrew Pritchard (MIT License)
// https://www.youtube.com/watch?v=2hfoX51f6sg

var muonFourier = function () {

  let mmath = __mapper('xs').m('math')
    
    
let diagram,

  polyline, // complex numbers from path. define in fourierDiagram

  period = 1,
  transform = [],
  centres = [],
  circles = [],
  svgPolyLine = null,
  endCircle = null,
  traced = null,

  tracedPath = "",
  endTime = null


  let updateTransform = function () {

  
  
    // var abs = Math.abs;
    // var atan = Math.atan;
    // var atan2 = Math.atan2;

    // var cos = Math.cos;
    // var exp = Math.exp;
    // var floor = Math.floor;
    // var log = Math.log;
    // var max = Math.max;
    // var min = Math.min;
    // var pow = Math.pow;
    // var round = Math.round;
    // var sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
    // var sin = Math.sin;
    // var tan = Math.tan;

    // var epsilon = 1e-6;
    // var epsilon2 = 1e-12;
    // var pi = Math.PI;
    // var halfPi = pi / 2;
    // var quarterPi = pi / 4;
    // var sqrt1_2 = Math.SQRT1_2;
    // var sqrt2 = Math.sqrt(2);
    // var sqrtPi = Math.sqrt(pi);
    // var tau = pi * 2;
    // var degrees = 180 / pi;
    // var radians = pi / 180;
  
    // let alpha =1, k2=1, gamma=0
    // function elliptic (f) {
      // return alpha + (1 - alpha) * pow(1 - pow(f, k2), 1 / k2);
    // }
    // function sinci(x) {
      // return x ? x / Math.sin(x) : 1;
    // }    
    // function z(fn, a=0,b=1,e=1e-4) {
      // return mmath.integrate(fn, a, b,e);
    // }    
    // let sum = z(sinci,0,1)
    // if (0 && 1) console.log("sum", sum)
    
  
  
  
    if (0 && 1) console.log("updateTransform")
      var N = polyline.length;
      var _transform = [];
      for (var k = 0; k < N; k++) { // N coefficients
          var current = Complex (0, 0)
          for (var n = 0; n < N; n++) { // each is sum of integrals
              var coef = Complex (0, (-2) * Math.PI * k * n / N)
              let h = coef.exp().mul(polyline[n]) // v[n].e^-i2[pi]kn/N
              current = current.add(h)
          }
          _transform.push(current)
      }

      transform = _transform
  }



  var fourierDiagram = function (path) {

      polyline = [];
      for (var i = 0; i < path.length; i++) {
          var point = path[i]
          polyline.push (Complex(point[0], point[1]))
      }

  }


    /***************************
     *        @enty
     */
    let enty = () => {}

    enty.fourierDiagram = function (_div, _path, _period) {
      fourierDiagram(_div, _path, _period)
      return enty
    }
    enty.updateTransform = function () {
      updateTransform()
      return enty
    }

    enty.transform = () => transform


    return enty
  }

  exports.muonFourier = muonFourier
}))
