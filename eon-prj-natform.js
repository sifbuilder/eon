/*******************************************
 *    @prjNatform
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.prjNatform = global.prjNatform || {})))
}(this, function (exports) {
  'use strict'

// # eon-prj-natform 
// **returns nat projection** 
 
// ### functions 
// pointStream 
// `pointStream projectionDefinition` 
// projectionDefinition: {type:nat, form:form} 
// get the nat for mvertices 
// natPoint returns the nat projection per polar coordinates 
 
// ### methods 
// natprofion 
 // compleate form for natform 
 
// # license 
// MIT  
  
  async function prjNatform (__mapper = {}) {
    let [
      mnat,
    ] = await Promise.all([
      __mapper('xs').m('nat'),
    ])

    let enty = prjdef => mnat.natprojection(prjdef)
    return enty
  }

  exports.prjNatform = prjNatform
}))
