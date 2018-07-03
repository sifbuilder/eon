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

    let capitalize = s => (s == null) ? '' : s.charAt(0).toUpperCase() + s.slice(1)
    let eonize = (nome, pres = '') => (pres === '') ? nome : pres + capitalize(nome)
    let fermize = (nome, pres = '') => (pres === '')
      ? './' + nome + '.js'
      : (pres === 'control' || pres === 'geo' || pres === 'halo' || pres === 'muon' || pres === 'render')
        ? './' + 'eon' + '-' + pres + '-' + nome + '.js'
        : './' + pres + '-' + nome + '.js'

    let xeonize = (nome, pres = '') => (pres === '')
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

    // ............................. mapOnePart
    function mapOnePart (part) { // [ partName, [partEnts] ]

      return __mapper('xD3Require').require(...a(part[1])) // get eon
        .then(eon => getCell(eon, part[0], __mapper)) // eon to cell
        .then(cell => mapCell(cell, part[0], __mapper)) // map cell
        .catch(e => console.log(' ************ ', part, e))
    }

    // ............................. getFermion
    async function getBoson (part) { // nome is partName: eg 'muonGraticule'

      let [name, pres] = part

      let eon = eonize(name, pres)  // muonVersor
      let fon = fermize(name, pres) // ./eon-muon-versor.js
      let xeon = xeonize(name, pres) // eon-muon-versor


      let r = __mapper(eon)
      if (r) return r

      return enty.mapOnePart([eon, fon]) // [d3, ./d3.js] [muonVersor, ./eon-muon-versor.js]
      // try {
          // const eoncell = await enty.mapOnePart([eon, fon]) // [d3, ./d3.js] [muonVersor, ./eon-muon-versor.js]
          // if (eoncell) return eoncell
      // } catch (err) {


    // if (1 && 1) console.log(' ************ xeon', xeon)
          // return await enty.mapOnePart([eon, xeon]) // [d3, ./d3.js] [muonVersor, ./eon-muon-versor.js]
      // }



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

    enty.eonize = eonize
    enty.fermize = fermize
    enty.xeonize = xeonize

    return enty
  }

  exports.xs = xs
}))
