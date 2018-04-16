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

var muonFourier = function (__mapper) {
  
  //md: m.fourier : fourier transform  
  
  let mgeoj = __mapper('xs').m('geoj')


  
  
    let transformedCoefs = function (gj) {
  
      let gjc = mgeoj.complexify(gj)
      let vectors = gjc.coordinates
      
      
      var N = vectors.length;
      var _transform = [];
      for (var k = 0; k < N; k++) { // N coefficients
          var current = Complex (0, 0)
          for (var n = 0; n < N; n++) { // each is sum of integrals
              var coef = Complex (0, (-2) * Math.PI * k * n / N)
              let h = coef.exp().mul(vectors[n]) // v[n].e^-i2[pi]kn/N
              current = current.add(h)
          }
          _transform.push(current)
      }

      
      return _transform
    }   
  
  
  
    /***************************
     *        @enty
     */
    let enty = () => {}


    enty.transformedCoefs = transformedCoefs 


    return enty
  }

  exports.muonFourier = muonFourier
}))
