/*******************************************
 *    @xs
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.xs = global.xs || {})))
}(this, function (exports) {
  'use strict'

  let xs = function (__mapper = {}) {

    let xD3Require = __mapper('xD3Require')

    let cap = s => (s == null) ? '' : s.charAt(0).toUpperCase() + s.slice(1) // capitalize
    
    let eonize = (nome, pres='') => (pres === '') ? nome : pres + cap(nome)
    
    // https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
    function camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, '')  // if white space
      .replace(/\-+/g, '')  // if hyphen
    }

    let getFromMapper = part => __mapper(part)
    let getFromEnty = part => part()
    let getAsFunction = part => part
    // let getFromNet = part => xD3Require.require(part) // global xD3Require
    let getFromNet = part => Promise.resolve(part)


    // ............................. getFermion
    function getFermion(nome, pres = '', ret = null) {

      let itemName = eonize(nome, pres)

      if (__mapper(itemName) !== undefined) { // item in mapper

        ret =  getFromMapper(itemName)

        if (ret[itemName] !== undefined) {  // if cell

          ret = ret[itemName](__mapper)  // get enty
          
          __mapper({ [itemName]: ret  })   // intermap enty

        }

      } 

      return ret
    }

    // ............................. async getBoson
    function getBoson(nome, pres = 'boson', ret = null) {

      ret = getFermion(nome, pres)

      if (ret) {
        
        return ret
        
      } else {

        return getFromNet(eonize(nome, pres))
        .then(part => {return part})

      } 

    }

    // ............................. enty
    let enty = function() {}

    enty.eonize = eonize
    enty.boson = enty.b = (nome, pres = '') => getBoson(nome, pres)
    enty.quark = enty.q = (nome, pres = '') => getBoson(nome, pres)
    enty.muon = enty.m = (nome, pres = 'muon') => getBoson(nome, pres)
    enty.data = enty.d = (nome, pres = 'data') => getFermion(nome, pres)
    enty.force = enty.f = (nome, pres = 'force') => getFermion(nome, pres)
    enty.geo = enty.g = (nome, pres = 'geo') => getFermion(nome, pres)
    enty.proj = enty.p = (nome, pres = 'd3.geo') => getFermion(nome, pres)
    enty.halo = enty.h = (nome, pres = 'halo') => getBoson(nome, pres)
    enty.control = enty.c = (nome, pres = 'control') => getFermion(nome, pres)
    enty.render = enty.r = (nome, pres = 'render') => getFermion(nome, pres)
    enty.getFermion = getFermion
    enty.getBoson = getBoson

    return enty
  }

  exports.xs = xs
}))