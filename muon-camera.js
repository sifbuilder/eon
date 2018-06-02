/***********
   *    @muonCamera
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonCamera = global.muonCamera || {})))
}(this, function (exports) {
  'use strict'

  // md: # md:{filename}
  // md: ** **
  // md: ### refs
  // md:
  // md:
  // md:
  // md: # license
  // md: MIT  

  var muonCamera = function (__mapper = {}) {
    
    let f = __mapper('xs').m('props')    
    
    let props = {}
    props.type = 'Camera'
    props.projection = null
    
    let r = __mapper('xs').r('renderport'),
      width = r.width(),
      height = r.height()

   // ............................. enty
    let enty = () => enty

  

    return enty
  }

  exports.muonCamera = muonCamera
}))
