/***********
   *    @muonEventDispatcher
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonEventDispatcher = global.muonEventDispatcher || {})))
}(this, function (exports) {
  'use strict'



  // md: # md:{filename}
  // md: ** **
  // md: usage:
  // md: 
  // md:  ```
  // md:     let mmatrix4 = __mapper('xs').m('matrix4')
  // md:     let t = new mmatrix4()
  // md:     let s = t.set()
  // md:     let t2 = t.clone()
  // md:  ```

  // md:
  // md:
  // md: # license
  // md: MIT


  var muonEventDispatcher = function (__mapper = {}) {

  

    let enty = THREE.EventDispatcher
      

    enty.prototype = THREE.EventDispatcher.prototype


    return enty
  }

  exports.muonEventDispatcher = muonEventDispatcher
}))
