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
    let getFromNet = async part => await xD3Require.require(part) // global xD3Require


    // ............................. getFermion
    function getFermion(params, pres = '', ret = null) {

      let nome = (typeof (params) === 'object') ? params.nome :  params
      let itemName = (pres === '') ? nome : pres + cap(nome) // item syn names

        if (__mapper(itemName) !== undefined) { // item in mapper

          ret =  getFromMapper(itemName)

          if (ret[itemName] !== undefined) {  // if cell

            let enty = ret[itemName](__mapper)  // get enty
            __mapper({ [itemName]: enty  })   // intermap enty

            ret = getFromMapper(itemName) // get from mapper

          }

        } else  {

            if (2 && 2) console.log(`getFermion ${itemName} not in mapper ${itemName}`, ret)

        }

      return ret
    }

    // ............................. async getBoson
    async function getBoson(params, pres = 'boson') {

      let ret = await getFermion(params, pres)

      if (ret === null) {

        let nome = (typeof (params) === 'object') ? params.nome :  params
        let itemName = (pres === '') ? nome : pres + cap(nome) // item syn names

        ret = await getFromNet(itemName)
        console.log(` !!!!!!!!!!!  got ${params} from net`)

      }

      if (!ret) console.log(` ===>  could not get boson: ${params}`)
      return ret
    }

    // ............................. enty
    let enty = function() {}

    enty.eonize = eonize
    enty.boson = enty.b = (params, pres = '') => getBoson(params, pres)
    enty.quark = enty.q = (params, pres = '') => getBoson(params, pres)
    enty.muon = enty.m = (params, pres = 'muon') => getBoson(params, pres)
    enty.data = enty.d = (params, pres = 'data') => getFermion(params, pres)
    enty.force = enty.f = (params, pres = 'force') => getFermion(params, pres)
    enty.geo = enty.g = (params, pres = 'geo') => getFermion(params, pres)
    enty.proj = enty.p = (params, pres = 'd3.geo') => getFermion(params, pres)
    enty.halo = enty.h = (params, pres = 'halo') => getBoson(params, pres)
    enty.control = enty.c = (params, pres = 'control') => getFermion(params, pres)
    enty.render = enty.r = (params, pres = 'render') => getFermion(params, pres)

    return enty
  }

  exports.xs = xs
}))