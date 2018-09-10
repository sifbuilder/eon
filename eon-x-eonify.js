// d3-require Version 1.0.4 Copyright 2018 Observable, Inc.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.xEonify = global.xEonify || {})))
}(this, function (exports) {
  'use strict'

  const metas = new Map()
  const modules = new Map()
  const queue = []
  const map = queue.map
  const some = queue.some
  const hasOwnProperty = queue.hasOwnProperty
  const origin = 'https://unpkg.com/'
  const parseRe = /^((?:@[^/@]+\/)?[^/@]+)(?:@([^/]+))?(?:\/(.*))?$/

  function string (value) {
    return typeof value === 'string' ? value : ''
  }

  function parseIdentifier (identifier) {
    const match = parseRe.exec(identifier)
    return match && {
      name: match[1],
      version: match[2],
      path: match[3],
    }
  }

  function resolveMeta (target) {
    const url = `${origin}${target.name}${target.version ? `@${target.version}` : ''}/package.json`
    let meta = metas.get(url)
    if (!meta) {
      metas.set(url, meta = fetch(url).then(response => {
        if (!response.ok) throw new Error('unable to load package.json')
        if (response.redirected && !metas.has(response.url)) metas.set(response.url, meta)
        return response.json()
      }))
    }
    return meta
  }

  async function resolve (name, base) {
    if (name.startsWith(origin)) name = name.substring(origin.length)
    if (/^(\w+:)|\/\//i.test(name)) return name
    if (/^[.]{0,2}\//i.test(name)) return new URL(name, base == null ? location : base).href
    if (!name.length || /^[\s._]/.test(name) || /\s$/.test(name)) throw new Error('illegal name')
    const target = parseIdentifier(name)
    if (!target) return `${origin}${name}`
    if (!target.version && base != null && base.startsWith(origin)) {
      const meta = await resolveMeta(parseIdentifier(base.substring(origin.length)))
      target.version = meta.dependencies && meta.dependencies[target.name] || meta.peerDependencies && meta.peerDependencies[target.name]
    }
    const meta = await resolveMeta(target)
    return `${origin}${meta.name}@${meta.version}/${target.path || string(meta.unpkg) || string(meta.browser) || string(meta.main) || 'index.js'}`
  }

  const require = requireFrom(resolve)

  function requireFrom (resolver) {
    const requireBase = requireRelative(null)

    function requireAbsolute (url) {
      let module = modules.get(url)

      if (!module) {
        modules.set(url, module = new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.onload = () => {
            try { resolve(queue.pop()(requireRelative(url))) } catch (error) { reject(new Error('invalid module')) }
            script.remove()
          }
          script.onerror = () => {
            reject(new Error('unable to load module'))
            script.remove()
          }
          script.async = true
          script.src = url
          window.define = define
          document.head.appendChild(script)
        }))
      }

      return module
    }

    function requireRelative (base) {
      return name => Promise.resolve(resolver(name, base)).then(requireAbsolute)
    }

    function require (name) {
      return arguments.length > 1
        ? Promise.all(map.call(arguments, requireBase)).then(merge)
        : requireBase(name)
    }

    require.resolve = resolver

    return require
  }

  function merge (modules) {
    const o = {}
    for (const m of modules) {
      for (const k in m) {
        if (hasOwnProperty.call(m, k)) {
          if (m[k] == null) Object.defineProperty(o, k, {get: getter(m, k)})
          else o[k] = m[k]
        }
      }
    }
    return o
  }

  function getter (object, name) {
    return () => object[name]
  }

  function isexports (name) {
    return (name + '') === 'exports'
  }

  function define (name, dependencies, factory) {
    const n = arguments.length
    if (n < 2) factory = name, dependencies = []
    else if (n < 3) factory = dependencies, dependencies = typeof name === 'string' ? [] : name
    queue.push(some.call(dependencies, isexports) ? require => {
      const exports = {}
      return Promise.all(map.call(dependencies, name => {
        return isexports(name += '') ? exports : require(name)
      })).then(dependencies => {
        factory.apply(null, dependencies)
        return exports
      })
    } : require => {
      return Promise.all(map.call(dependencies, require)).then(dependencies => {
        return typeof factory === 'function' ? factory.apply(null, dependencies) : factory
      })
    })
  }

  define.amd = {}

  let xs = function (__mapper = {}) {
    const xD3Require = __mapper('xD3Require')

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
        // n is eon with e[n] async constructor eg. async function muonNat
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
    const getCeonSync = part => __mapper(part[0])

    // ............................. getCeon
    async function getCeon (part) {
      let ceon = part[0]
      let r = __mapper(ceon)
      return r ? Promise.resolve(r) : Promise.reject(r)
    }

    // ............................. getFeon
    async function getFeon (part) { // d3Froce3d, ./d3-force-3d.js
      return xD3Require.require(...a(part[1])) // get eon
        .then(eon => {
          return getCell(eon, part[0], __mapper) // eon to cell
        })
        .then(cell => mapCell(cell, part[0], __mapper)) // map cell
    }

    // ............................. getXeon
    async function getXeon (part) { // d3Froce3d, d3-force-3d
      return xD3Require.require(...a(part[1])) // get eon
        .then(eon => getCell(eon, part[0], __mapper)) // eon to cell
        .then(cell => mapCell(cell, part[0], __mapper)) // map cell
    }

    // ............................. getEon
    async function getEon (inpart) { // nome is partName: eg 'muonGraticule'
      let part = (typeof inpart === 'string') ? [inpart, ''] : inpart // else array

      if (typeof part[0] === 'function') {
        let [eonfn, pres] = part
        let x = await eonfn(__mapper)
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
    enty.force = enty.f = (nome, pres = 'force') => getEon([nome, pres])
    enty.geo = enty.g = (nome, pres = 'geo') => getEon([nome, pres])
    enty.halo = enty.h = (nome, pres = 'halo') => getEon([nome, pres])
    enty.lib = enty.l = (nome, pres = 'lib') => getEon([nome, pres])
    enty.muon = enty.m = (nome, pres = 'muon') => getEon([nome, pres])
    enty.prt = enty.p = (nome, pres = 'prt') => getEon([nome, pres])
    enty.render = enty.r = (nome, pres = 'render') => getEon([nome, pres])
    enty.zindex = enty.z = (nome, pres = 'z') => getEon([nome, pres])

    return enty
  }

  let xMapper = function () {
    let state = {}

    // ............................. enty
    let enty = function (_) {
      if (arguments.length < 1) return state
      else if (typeof _ === 'object') return (state = Object.assign({}, state, _))
      else if (typeof _ === 'string' && state[_] !== undefined) return state[_]
      else if (typeof _ === 'string' && state[_] === undefined) return null
    }

    return enty
  }

  let eon = async function ({anitem, time}) {
    let __mapper = xEonify.xMapper() // init mapper

    __mapper({'xD3Require': {
      require: xEonify.require,
      requireFrom: xEonify.requireFrom,
    },
    }) // map require

    __mapper({'xs': xEonify.xs(__mapper)}) // map xs

    let muonStore = await __mapper('xs').m('store') // map store
    let muonAnimation = await __mapper('xs').m('animation') // map animation

    console.assert(typeof anitem === 'function' ||
      typeof anitem === 'string') // anitem is function or string

    __mapper('xs').a(anitem) // proxy ani.anitem
      .then(animas => __mapper('muonStore').apply({type: 'UPDANIMA', animas: animas})) // store animas
      .then(() => __mapper('muonAnimation').animate(time)) // animate
  }

  exports.eon = eon

  exports.xMapper = xMapper

  exports.xs = xs

  exports.require = require
  exports.requireFrom = requireFrom

  Object.defineProperty(exports, '__esModule', { value: true })
}))
