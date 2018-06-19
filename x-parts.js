/*******************************************
*      @xParts
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.xParts = global.xParts || {})))
}(this, function (exports) {
  'use strict'


  
  let xParts = function (__mapper = {}) {
      
    let parts = []
    
    let state = {
      parts: parts
    }
  
    let enty = _ => _ !== undefined ? (state.parts = _, state.parts) : state.parts
    return enty
    
  }
  
  exports.xParts = xParts
}))
