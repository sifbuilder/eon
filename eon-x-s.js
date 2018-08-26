/*******************************************
 *    @xs
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.xs = global.xs || {})))
}(this, function (exports) {
  'use strict'

 
// # eon-x-s 
// ** ** 
  // eon, name, map muonGraticule['muonGraticule'](__mapper) 
  // `getCell = (e, n, m) => e[n] !== undefined ? e[n](m) : e` 
 
  // eon, name, map __mapper({ muonGraticule: muonGraticule })('muonGraticule') 
  // `mapCell = (e, n, m) => m({[n]: e})[n]` 
 
  // getEon 
    // [d3, ''] => d3, ./d3.js, d3 
    // [uniwen, geo] => prjUniwen, ./muon-geo-uniwen.js, muon-geo-uniwen 
    // [eon-geo-uniwen, ''] => prjUniwen, ./muon-geo-uniwen.js, muon-geo-uniwen 
   
// # license 
// MIT 
  
  
  
  let xs = function (__mapper = {}) {
    const xD3Require = __mapper('xD3Require')

    const capitalize = s => (s == null) ? '' : s.charAt(0).toUpperCase() + s.slice(1) // wen => Wen
    const ceonize = (nome, pres = '') => (pres === '')
      ? camelize(nome.replace(/^eon-/, ''))
      : camelize(pres + '-' + nome) // [uni-wen,muon] => muonUniWen
    const feonize = (nome, pres = '') => './' + xeonize(nome, pres) + '.js' // wen => ./muon-wen.js
    let xeonize = (nome, pres = '') => (pres === '') // wen => eon-muon-wen
      ? nome
      : (pres !== '')
        ? 'eon' + '-' + pres + '-' + nome
        : pres + '-' + nome
    const camelize = str => str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index === 0 ? letter.toLowerCase() : letter.toUpperCase())
      .replace(/\s+/g, '') // remove white space
      .replace(/-+/g, '') // remove hyphen
    const getCell = (e, n, m) => { // eon, name, mapper
      if (e[n] !== undefined && typeof e[n] === 'function') {
        return e[n](m)
      } else if (typeof e === 'object') {
        return e
      } else {
        return e
      }

      // return e[n] !== undefined ? e[n](m) : e
    }
    const mapCell = (e, n, m) => m({[n]: e})[n]
    const a = d => Array.isArray(d) ? d : Array.of(d)

    // ............................. getCeonSync
    const getCeonSync = part => __mapper(part[0])

    // ............................. getCeon
    async function getCeon (part) {
      let ceon = part[0]
      let r = __mapper(ceon)
      return r ? Promise.resolve(r) : Promise.reject(r)
    }

    // ............................. getFeon
    async function getFeon (part) { // d3Froce3d, ./d3-force-3d.js
    // if (1 && 1) console.log('part', part[0])
      return xD3Require.require(...a(part[1])) // get eon
        .then(eon => getCell(eon, part[0], __mapper)) // eon to cell
        .then(cell => mapCell(cell, part[0], __mapper)) // map cell
    }

    // ............................. getNeon
    async function getNeon (part) { // d3Froce3d, d3-force-3d
    // if (1 && 1) console.log('part', part[0])

      return xD3Require.require(...a(part[1])) // get eon
        .then(eon => getCell(eon, part[0], __mapper)) // eon to cell
        .then(cell => mapCell(cell, part[0], __mapper)) // map cell
    }

    // ............................. getEon
    async function getEon (inpart) { // nome is partName: eg 'muonGraticule'
      let part = (typeof inpart === 'string') ? [inpart, ''] : inpart
      let [name, pres] = part

      let ceon = ceonize(name, pres) // muonVersor
      let feon = feonize(name, pres) // ./eon-muon-versor.js
      let neon = xeonize(name, pres) // eon-muon-versor

      var eonfroms = [
        () => getCeon([ceon, '']),
        () => getFeon([ceon, feon]),
        () => getNeon([ceon, neon]),
      ]

      return eonfroms.reduce(
        (p, q) => p.catch(failed => Promise.resolve(getCeonSync([ceon, '']) || q())),
        Promise.reject('init reduce'))
        .catch(failed => { console.log('Failed: ', ceon, failed) })
    }

    // ............................. enty
    let enty = function () {}

    enty.ceonize = ceonize
    enty.boson = enty.b = (nome, pres = '') => getEon([nome, pres])
    enty.ctl = enty.c = (nome, pres = 'ctl') => getEon([nome, pres])
    enty.dat = enty.d = (nome, pres = 'dat') => getEon([nome, pres])
    enty.force = enty.f = (nome, pres = 'force') => getEon([nome, pres])
    enty.geo = enty.g = (nome, pres = 'geo') => getEon([nome, pres])
    enty.halo = enty.h = (nome, pres = 'halo') => getEon([nome, pres])
    enty.lib = enty.l = (nome, pres = 'lib') => getEon([nome, pres])
    enty.muon = enty.m = (nome, pres = 'muon') => getEon([nome, pres])
    enty.prj = enty.p = (nome, pres = 'prj') => getEon([nome, pres])
    enty.render = enty.r = (nome, pres = 'render') => getEon([nome, pres])
    enty.zindex = enty.z = (nome, pres = 'z') => getEon([nome, pres])

    return enty
  }

  exports.xs = xs
}))
