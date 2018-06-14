/**********************
 *			@animaBooster
 */	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.animaBooster = global.animaBooster || {})));
}(this, function (exports) { 'use strict';

var animaBooster = function (__mapper = {}) {

		let data = {
    'x': {
      'm1': -8,'m2': -3.5,'n1': 16.24,'n2': 6,'n3': 13,'a': 9,'b': 0.2,  // craft

      'ra2': 1,'v0': 0,'v1': 1,'w4': 0,'seg5': 360,'pa6': 0,'pb7': -1,
      'dom3': [-180, 180],
    },
    'y': {
      'm1': -8,'m2': -3.5,'n1': 16.24,'n2': 6,'n3': 13,'a': 9,'b': 0.2,  // craft
      
      'ra2': 1,'v0': 0,'v1': 1,'w4': 0,'seg5': 360,'pa6': 0,'pb7': -1,
      'dom3': [-180, 180],
    },
    'z': {
      'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1 , // square
      
      'ra2': 1,'v0': 0,'v1': 1,'w4': 0,'seg5': 360,'pa6': 0,'pb7': -1,
      'dom3': [-180, 180 ],
    }
  } // data
    
    // ........................... enty
		var enty = function enty() {}
		enty.data = () => data
		
		return enty

}

exports.animaBooster = animaBooster

}))
