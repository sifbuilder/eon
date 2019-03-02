(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.xEonify = global.xEonify || {})))
}(this, function (exports) {
  'use strict'

  let require = d3.require
  let requireFrom = d3.requireFrom

  // ............................. xs
  let xs = function (__eo = {}) {
    const xD3Require = __eo('xD3Require')

    const capitalize = s => (s == null) ? '' : s.charAt(0).toUpperCase() + s.slice(1) // wen => Wen

    const ceonize = function (nome, pres = '') {
      let camelized
      if (pres === '') {
        camelized = camelize(nome.replace(/^eon-/, ''))
      } else {
        camelized = camelize(pres + '-' + nome) // [uni-wen,muon] => muonUniWen
      }
      return camelized
    }
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

    const getCell = (e, n, m) => { // eon, name, mapper returns enty
      if (e[n] !== undefined && typeof e[n] === 'function') {
        // n is eon with e[n] async constructor eg. async function muonNatform
        // n is ani with e[n] async constructor eg. async function anitem
        // e[n](m) is promise
        return e[n](m)
      } else if (typeof e === 'object') {
        // n is d3Scale (e[n] is undefined)

        return e
      } else {
        //

        return e
      }
    }
    const mapCell = (e, n, m) => m({[n]: e})[n]
    const a = d => Array.isArray(d) ? d : Array.of(d)

    // ............................. getCeonSync
    const getCeonSync = part => __eo(part[0])

    // ............................. getCeon
    async function getCeon (part) {
      let ceon = part[0]
      let r = __eo(ceon)
      return r ? Promise.resolve(r) : Promise.reject(r)
    }

    // ............................. getFeon
    async function getFeon (part) { // d3Froce3d, ./d3-force-3d.js
      let eon = await xD3Require.require(...a(part[1]))
      let cell = await getCell(eon, part[0], __eo) // eon to cell
      let feon = await mapCell(cell, part[0], __eo) // map cell
      return feon
    }

    // ............................. getXeon
    async function getXeon (part) { // d3Froce3d, d3-force-3d
      return xD3Require.require(...a(part[1])) // get eon
        .then(eon => getCell(eon, part[0], __eo)) // eon to cell
        .then(cell => mapCell(cell, part[0], __eo)) // map cell
    }

    // ............................. getEon
    async function getEon (inpart) { // nome is partName: eg 'muonGraticule'
      let part = (typeof inpart === 'string') ? [inpart, ''] : inpart // else array

      if (typeof part[0] === 'function') {
        let [eonfn, pres] = part
        let x = await eonfn(__eo)
        let res = await x[pres]()
        return res
      } else {
        let [name, pres] = part

        let ceon = ceonize(name, pres) // muonVersor
        let feon = feonize(name, pres) // ./eon-muon-versor.js
        let xeon = xeonize(name, pres) // eon-muon-versor

        var eonfroms = [
          () => getCeon([ceon, '']),
          () => getFeon([ceon, feon]),
          () => getXeon([ceon, xeon]),
        ]

        return eonfroms.reduce(
          (p, q) => p.catch(failed => Promise.resolve(getCeonSync([ceon, '']) || q())),
          Promise.reject('init reduce'))
          .catch(failed => { console.log('Failed: ', ceon, failed) })
      }
    }

    // ............................. enty
    let enty = function () {}

    enty.ceonize = ceonize
    enty.ani = enty.a = (nome, pres = 'ani') => getEon([nome, pres])
    enty.boson = enty.b = (nome, pres = '') => getEon([nome, pres])
    enty.ctl = enty.c = (nome, pres = 'ctl') => getEon([nome, pres])
    enty.dat = enty.d = (nome, pres = 'dat') => getEon([nome, pres])
    enty.eohal = enty.e = (nome, pres = 'eohal') => getEon([nome, pres])
    enty.force = enty.f = (nome, pres = 'force') => getEon([nome, pres])
    enty.geo = enty.g = (nome, pres = 'geo') => getEon([nome, pres])
    enty.lib = enty.l = (nome, pres = 'lib') => getEon([nome, pres])
    enty.muon = enty.m = (nome, pres = 'muon') => getEon([nome, pres])
    enty.prt = enty.p = (nome, pres = 'prt') => getEon([nome, pres])
    enty.render = enty.r = (nome, pres = 'render') => getEon([nome, pres])
    enty.zindex = enty.z = (nome, pres = 'z') => getEon([nome, pres])

    return enty
  }

  // ............................. xEo
  let xEo = function () {
    let state = {}

    let enty = function (_) {
      if (arguments.length < 1) return state
      else if (typeof _ === 'object') return (state = Object.assign({}, state, _))
      else if (typeof _ === 'string' && state[_] !== undefined) return state[_]
      else if (typeof _ === 'string' && state[_] === undefined) return null
    }

    return enty
  }

  // ............................. eon
  let eon = async function ({anitem, time}) {
    let __eo = xEonify.xEo() // init mapper

    __eo({'xD3Require': {
      require: xEonify.require,
      requireFrom: xEonify.requireFrom,
    },
    }) // map require

    __eo({'xs': xEonify.xs(__eo)}) // map xs

    await __eo('xs').m('store') // map store
    await __eo('xs').m('animation') // map animation

    console.assert(typeof anitem === 'function' ||
      typeof anitem === 'string') // anitem is function or string

    let muonStore = __eo('xs').m('store')

    __eo('xs').a(anitem) // proxy ani.anitem
      .then(animas => __eo('muonStore').apply({type: 'UPDANIMA', animas: animas}))
      .then(() => __eo('muonAnimation').animate(time)) // animate
  }

  exports.eon = eon

  exports.xEo = xEo

  exports.xs = xs

  exports.require = d3.require
  exports.requireFrom = d3.requireFrom

  Object.defineProperty(exports, '__esModule', { value: true })
}))
