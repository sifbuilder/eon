/******************************************
  *       @muonAnimas
  *
  **/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonAnimas = global.muonAnimas || {})))
}(this, function (exports) {
  'use strict'

  async function muonAnimas (__mapper) {
    let [
      mprops,
      mstore,
      msim,
      mtim,
      rsvg,
      ctimer,
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').m('store'),
      __mapper('xs').m('sim'),
      __mapper('xs').m('tim'),
      __mapper('xs').r('svg'),
      __mapper('xs').c('timer'),
    ]
    )
    

    let animas = {}

    animas.circle = {
      "m1":4,"m2":4,"n1":2,"n2":2,"n3":2,"a":1,"b":1,
      "w4":0,
      "ra2":160,
    }

    animas.asterisk = {
      "m1": 12,"m2":12,"n1":0.3,"n2":0,"n3":10,"a":1,"b":1, 
      "ra2":160, 
      "w4": 0, 
      "seg5":360, 
      "pa6":0, "pb7":-1, 
      "v0":0,"v1":1,
      "cf":940,"cs":540,"cw":0.5 ,"co":1,
      "tx":360, "ty":185, 
    }


    // ............................. enty
    let enty = {}
    enty.animas = animas
    enty.anima = _ => animas[_] !== undefined ? animas[_] : animas.circle
    return enty
  }

  exports.muonAnimas = muonAnimas
}))
