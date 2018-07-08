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
    const xD3Require = __mapper('xD3Require')

    const capitalize = s => (s == null) ? '' : s.charAt(0).toUpperCase() + s.slice(1) // wen => Wen
    const eonize = (nome, pres = '') => (pres === '') ? camelize(nome.replace(/^eon-/, '')) : pres + capitalize(nome) // [wen,muon] => muonWen
    const fermize = (nome, pres = '') => './' + xeonize(nome, pres) + '.js' // wen => ./muon-wen.js
    let xeonize = (nome, pres = '') => (pres === '') // wen => eon-muon-wen
      ? nome
      : (pres === 'control' || pres === 'geo' || pres === 'halo' || pres === 'muon' || pres === 'render')
        ? 'eon' + '-' + pres + '-' + nome
        : pres + '-' + nome
    const camelize = str => str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index === 0 ? letter.toLowerCase() : letter.toUpperCase())
      .replace(/\s+/g, '') // remove white space
      .replace(/\-+/g, '') // remove hyphen
    const getCell = (e, n, m) => e[n] !== undefined ? e[n](m) : e
    const mapCell = (e, n, m) => m({[n]: e})[n]
    const a = d => Array.isArray(d) ? d : Array.of(d)
    const getEon2 = part => {
      return __mapper(eonize(part[0], part[1]))
    }

    // ............................. mapEon
    async function mapEon (part) { // d3Froce3d, ./d3-force-3d.js | d3-force-3d
if (1 && 1) console.log('mapEon', part)
    
      return xD3Require.require(...a(part[1])) // get eon
        .then(eon => getCell(eon, part[0], __mapper)) // eon to cell
        .then(cell => mapCell(cell, part[0], __mapper)) // map cell
        .catch(e => console.log('could not map from ', part[1]))
    }

    // ............................. getEon
    async function getEon (inpart) { // nome is partName: eg 'muonGraticule'
      let part = (typeof inpart === 'string') ? [inpart, ''] : inpart
      let [name, pres] = part

      let eon = eonize(name, pres) // muonVersor
      let feon = fermize(name, pres) // ./eon-muon-versor.js
      let xeon = xeonize(name, pres) // eon-muon-versor

      let eoncell = await getEon2(part) // __mapper(eon)
      if (eoncell) {
        return eoncell
      }

      let foncell = await mapEon([eon, feon])
      if (foncell) {
        return foncell
      }

      let xeoncell = await mapEon([eon, xeon])
      if (xeoncell) {
        return xeoncell
      }
    }

    // ............................. enty
    let enty = function () {}

    enty.eonize = eonize
    enty.boson = enty.b = (nome, pres = '') => getEon([nome, pres])
    enty.quark = enty.q = (nome, pres = '') => getEon([nome, pres])
    enty.muon = enty.m = (nome, pres = 'muon') => getEon([nome, pres])
    enty.data = enty.d = (nome, pres = 'data') => getEon([nome, pres])
    enty.force = enty.f = (nome, pres = 'force') => getEon([nome, pres])
    enty.geo = enty.g = (nome, pres = 'geo') => getEon([nome, pres])
    enty.proj = enty.p = (nome, pres = 'd3.geo') => getEon([nome, pres])
    enty.halo = enty.h = (nome, pres = 'halo') => getEon([nome, pres])
    enty.control = enty.c = (nome, pres = 'control') => getEon([nome, pres])
    enty.render = enty.r = (nome, pres = 'render') => getEon([nome, pres])
    enty.getEon = getEon

    return enty
  }

  exports.xs = xs
}))
