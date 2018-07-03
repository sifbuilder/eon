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
    let camelize = str => str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index == 0 ? letter.toLowerCase() : letter.toUpperCase())
      .replace(/\s+/g, '') // remove white space
      .replace(/\-+/g, '') // remove hyphen

    let getFromMapper = part => __mapper(part)
    let getFromEnty = part => part()
    let getAsFunction = part => part
    let getFromNet = part => xD3Require.require(part) // global xD3Require
    // let getFromNet = (name, pres) => Promise.resolve(part)
    let getCell = (e, n, m) => e[n] !== undefined ? m({n: m(n)[n] })[n] : e // eon, name, map

    // ............................. getFermion
    function getFermion (name, pres) { // nome is partName: eg 'muonGraticule'
      let eon = eonize(name, pres)
      let fermion = __mapper(eon)
        ? __mapper(eonize(name, pres))
        : __mapper.mapOnePart([eonize(name, pres), fermize(name, pres)])
      return fermion
    }

    // ............................. async getBoson
    let getBoson = (name, pres) => getFermion(name, pres) || getFromNet(name, pres)

    // ............................. enty
    let enty = function () {}

    enty.eonize = eonize
    enty.boson = enty.b = (nome, pres = '') => getBoson(nome, pres)
    enty.quark = enty.q = (nome, pres = '') => getBoson(nome, pres)
    enty.muon = enty.m = (nome, pres = 'muon') => getBoson(nome, pres)
    enty.data = enty.d = (nome, pres = 'data') => getBoson(nome, pres)
    enty.force = enty.f = (nome, pres = 'force') => getBoson(nome, pres)
    enty.geo = enty.g = (nome, pres = 'geo') => getBoson(nome, pres)
    enty.proj = enty.p = (nome, pres = 'd3.geo') => getBoson(nome, pres)
    enty.halo = enty.h = (nome, pres = 'halo') => getBoson(nome, pres)
    enty.control = enty.c = (nome, pres = 'control') => getBoson(nome, pres)
    enty.render = enty.r = (nome, pres = 'render') => getBoson(nome, pres)
    enty.getFermion = getFermion
    enty.getBoson = getBoson

    return enty
  }

  exports.xs = xs
}))
