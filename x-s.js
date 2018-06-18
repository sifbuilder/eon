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
  
    let cap = s => (s == null) ? '' : s.charAt(0).toUpperCase() + s.slice(1) // capitalize string

    if (1 && 1) console.log('xD3Require', xD3Require)

    
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
    let getFromNet = async part => await xD3Require.require(part) // xD3Require is global


    // ............................. getFermion
    function getFermion(params, pres = '', ret = null) {
      let nome = null
      if (typeof (params) === 'object') nome = params.nome
      else if (typeof (params) === 'string') nome = params


      let itemName = pres + cap(nome) // item syn names

        if (__mapper(itemName) !== undefined) { // item in mapper

          ret =  getFromMapper(itemName)
          console.log(`getFermion got from mapper ${nome}`)

        } else if (enty[nome] !== undefined) {    // item in enty
          ret =  getFromEnty(enty[nome])
          console.log(`getFermion got from enty ${nome}`)

        } else {    //  eval

          let item
          try { item = eval(itemName)  } catch (e) {    /* eval */ }

          if (typeof item === 'object') { // register in mapper
            let enty = {
                [itemName]: item[itemName](__mapper)
            }
            __mapper(enty) // register

            ret =  getFromMapper(itemName) // item
            console.log(`getFermion got eval ${nome}`)
  

          } else {

            if (2 && 2) console.log(`getFermion could not find ${nome}`)

          }
        }
        
      if (!ret && 1 && 1) console.log(`getFermion could not get ${nome}`)
      return ret
    }


    // ............................. async getBoson
    async function getBoson(params, pres = 'boson') {

      let ret = await getFermion(params, pres)

      if (ret === null) {

        let nome
        if (typeof (params) === 'object') nome = params.nome
        else if (typeof (params) === 'string') nome = params

        ret = await getFromNet(nome)
        console.log(` !!!!!!!!!!!  got ${params} from net`)

      } else {

        console.log(`getBoson got fermion: ${params}`)

      }

      if (!ret) console.log(` ===> getBoson could not get ${params}`)
      return ret
    }

    // ............................. enty
    let enty = function() {}

    enty.boson = enty.b = (params, pres = 'boson') => getBoson(params, pres)
    enty.muon = enty.m = (params, pres = 'muon') => getFermion(params, pres)
    enty.data = enty.d = (params, pres = 'data') => getFermion(params, pres)
    enty.force = enty.f = (params, pres = 'force') => getFermion(params, pres)
    enty.geo = enty.g = (params, pres = 'geo') => getFermion(params, pres)
      // return getBoson(params, pres = ['geo', 'd3.geo'], ret = null)
    enty.halo = enty.h = (params, pres = 'halo') => getFermion(params, pres)
    enty.control = enty.c = (params, pres = 'control') => getFermion(params, pres)
    enty.render = enty.r = (params, pres = 'render') => getFermion(params, pres)

    return enty
  }

  exports.xs = xs
}))