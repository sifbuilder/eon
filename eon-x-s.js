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

    let capitalize = s => (s == null) ? '' : s.charAt(0).toUpperCase() + s.slice(1) // wen => Wen
    
    
    
    let eonize = (nome, pres = '') => (pres === '') ? camelize(nome.replace(/^eon-/,'')) : pres + capitalize(nome) // [wen,muon] => muonWen

    let fermize = (nome, pres = '') => './' + xeonize(nome, pres) + '.js' // wen => ./muon-wen.js
        
    let xeonize = (nome, pres = '') => (pres === '')  // wen => eon-muon-wen
      ? nome
      : (pres === 'control' || pres === 'geo' || pres === 'halo' || pres === 'muon' || pres === 'render')
        ? 'eon' + '-' + pres + '-' + nome
        : pres + '-' + nome

    let camelize = str => str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index == 0 ? letter.toLowerCase() : letter.toUpperCase())
      .replace(/\s+/g, '') // remove white space
      .replace(/\-+/g, '') // remove hyphen

    let getFromMapper = part => __mapper(part)
    let getFromEnty = part => part()
    let getAsFunction = part => part
    let getFromNet = part => {

      return xD3Require.require(part)
    }

    const getCell = (e, n, m) => e[n] !== undefined ? e[n](m) : e
    const mapCell = (e, n, m) => m({[n]: e})[n]
    const a = d => Array.isArray(d) ? d : Array.of(d)

    
    // let getEon = part => Promise.resolve(__mapper(eonize(part[0], part[1])))
    let getEon = part => __mapper(eonize(part[0], part[1]))
    let getFon = part => mapOnePart(__mapper(fermize(part[0], part[1])))
    let getXeon = part => mapOnePart(__mapper(xeonize(part[0], part[1])))
    

    // ............................. mapOnePart
    function mapOnePart (part) { // [ partName, [partEnts] ]

      let [name, pres] = part
// if (1 && 1) console.log('__ONE__ name, pres:', name, pres)


      return __mapper('xD3Require').require(...a(part[1])) // get eon
        .then(eon => getCell(eon, part[0], __mapper)) // eon to cell
        .then(cell => mapCell(cell, part[0], __mapper)) // map cell
        .catch(e => console.log(' **** mapOnePart ', part, e))
    }


    // ............................. mapTwoPart
    function mapTwoPart (part) { // [ partName, [partEnts] ]

      let [name, pres] = part
// if (1 && 1) console.log('__TWO__ name, pres:', name, pres)


      return __mapper('xD3Require').require(...a(part[1])) // get eon
        .then(eon => getCell(eon, part[0], __mapper)) // eon to cell
        .then(cell => mapCell(cell, part[0], __mapper)) // map cell
        .catch(e => console.log(' **** mapTwoPart ', part, e))
    }

    
    // ............................. getFermion
    async function getBoson (inpart) { // nome is partName: eg 'muonGraticule'

      // [d3, ''] => d3, ./d3.js, d3
      // [uniwen, geo] => geoUniwen, ./muon-geo-uniwen.js, muon-geo-uniwen
      // [eon-geo-uniwen, ''] => geoUniwen, ./muon-geo-uniwen.js, muon-geo-uniwen
    
      let part = []
      if (Array.isArray(inpart)) {
        part = inpart
      } else if (typeof inpart === 'string') {
        part = [inpart, '']
      }
      
      let [name, pres] = part

      let eon = eonize(name, pres)  // muonVersor
      let feon = fermize(name, pres) // ./eon-muon-versor.js
      let xeon = xeonize(name, pres) // eon-muon-versor

      
       // if (1 && 1) console.log('getBoson part:', part)
       // if (1 && 1) console.log('getBoson eon, feon, xeon:', eon, feon, xeon)
         
      let eoncell = await getEon(part) // __mapper(eon)
      if (eoncell) return eoncell

      let foncell = await enty.mapOnePart([eon, feon])
      if (foncell) return foncell
      
      let xeoncell = await enty.mapTwoPart([eon, xeon])
      if (xeoncell) return xeoncell
      
    }

    // ............................. enty
    let enty = function () {}

    enty.eonize = eonize
    enty.boson = enty.b = (nome, pres = '') => getBoson([nome, pres])
    enty.quark = enty.q = (nome, pres = '') => getBoson([nome, pres])
    enty.muon = enty.m = (nome, pres = 'muon') => getBoson([nome, pres])
    enty.data = enty.d = (nome, pres = 'data') => getBoson([nome, pres])
    enty.force = enty.f = (nome, pres = 'force') => getBoson([nome, pres])
    enty.geo = enty.g = (nome, pres = 'geo') => getBoson([nome, pres])
    enty.proj = enty.p = (nome, pres = 'd3.geo') => getBoson([nome, pres])
    enty.halo = enty.h = (nome, pres = 'halo') => getBoson([nome, pres])
    enty.control = enty.c = (nome, pres = 'control') => getBoson([nome, pres])
    enty.render = enty.r = (nome, pres = 'render') => getBoson([nome, pres])
    enty.getBoson = getBoson
    enty.mapOnePart = mapOnePart
    enty.mapTwoPart = mapTwoPart


    enty.eonize = eonize
    enty.fermize = fermize
    enty.xeonize = xeonize

    return enty
  }

  exports.xs = xs
}))
