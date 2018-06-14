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

    let cap = s => (s == null) ? '' : s.charAt(0).toUpperCase() + s.slice(1) // capitalize string

    // https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
    function camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, '')  // if white space
      .replace(/\-+/g, '')  // if hyphen
    }


    let getFromMapper = particle => __mapper(particle)
    let getFromEnty = particle => particle()
    let getAsFunction = particle => particle
    
    let getFromNet = async particle => {
      let ret =  await d3.require(particle)
      if (1 && 1) console.log('ret', ret)

      return ret
    }


    // ............................. getFermion
    function getFermion(params, pres = ['control', 'force', 'muon', 'render', 'shade'], ret = null) {
      let nome = null
      if (typeof (params) === 'object') nome = params.nome
      else if (typeof (params) === 'string') nome = params

      let itemNames = pres.reduce((p, q) => [...p, q + cap(nome) ], []) // item syn names


      for (let i = 0; i < itemNames.length; i++) {
        let itemName = itemNames[i]
        if (__mapper(itemName) !== undefined) { // item in mapper

          ret =  getFromMapper(itemName)
          // if (1 && 1) console.log('getFromMapper', itemName, ret)

          break

        } else if (enty[nome] !== undefined) {    // item in enty
          ret =  getFromEnty(enty[nome])

          break

        } else {    //  eval

          let item
          try { item = eval(itemName)  } catch (e) { /* pass */ }
          if (typeof item === 'object') { // register in mapper
            let enty = {
                [itemName]: item[itemName](__mapper)
            }
            __mapper(enty) // regiester

            ret =  getFromMapper(itemName) // item

            break


          } else {



          }
        }
      }
      return ret
    }


    // ............................. async getBoson
    async function getBoson(params, pres = ['control', 'force', 'muon', 'render', 'shade'], ret = null) {

    
      // if (1 && 1) console.log('params', params)
    
      ret = await getFermion(params, pres = ['boson', 'control', 'force', 'muon', 'render', 'shade'], ret = null)
      
      
      if (ret === null) {

        let nome = null
        if (typeof (params) === 'object') nome = params.nome
        else if (typeof (params) === 'string') nome = params      
      
        ret = await getFromNet(nome)
        console.log(`got from net ${nome} `, ret )

      } else {
        
        console.log(`got async ${params} `, ret )
        
      }

      return ret
    }

    // ............................. enty
    let enty = function() {}


    enty.boson = enty.b = function (params, pres = ['boson'], ret = null) {
      return getBoson(params, pres = ['boson'], ret = null)
    }
    
    
    
    enty.muon = enty.m = function (params, pres = ['muon'], ret = null) {
      return getFermion(params, pres = ['muon'], ret = null)
    }    
    
    enty.data = enty.d = function (params, pres = ['data'], ret = null) {
      return getFermion(params, pres = ['data'], ret = null)
    }
    enty.force = enty.f = function (params, pres = ['force'], ret = null) {
      return getFermion(params, pres = ['force'], ret = null)
    }
    enty.geo = enty.g = function (params, pres = ['proj'], ret = null) {
      return getFermion(params, pres = ['geojson', 'geo', 'proj', 'd3.geo'], ret = null)
    }
    enty.halo = enty.h = function (params, pres = ['halo'], ret = null) {
      return getFermion(params, pres = ['halo'], ret = null)
    }

    
    
    
    enty.control = enty.c = function (params, pres = ['control'], ret = null) {
      return getFermion(params, pres = ['control'], ret = null)
    }
    enty.render = enty.r = function (params, pres = ['render'], ret = null) {
      return getFermion(params, pres = ['render'], ret = null)
    }


    return enty
  }

  exports.xs = xs
}))
