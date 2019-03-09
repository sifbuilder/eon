(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.xEonify = global.xEonify || {})))
}(this, function (exports) {
  'use strict'

  //
  // eonify.eon(anitem)   load/map store, animation
  // anitem(eonify.xEo)   run ani with mapper
  //  eonify.xs(eons)      load/map eons
  //    anitem
  //

  let _d3 = d3 || {}
  let require = _d3.require // global d3
  let requireFrom = _d3.requireFrom // global d3

  const capitalize = s => (s == null) ? '' : s.charAt(0).toUpperCase() + s.slice(1)
  const a = d => Array.isArray(d) ? d : Array.of(d)


  const filenize = function (nome, path = '.', ext = 'js') {
    resturn `${path}/${nome}.${ext}`
  }  
  
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
    console.assert(e !== undefined, `eon is undefined with name ${n}`)
    if (e[n] !== undefined && typeof e[n] === 'function') {
      // n is eon with e[n] async constructor eg. async function muonNatform
      // n is ani with e[n] async constructor eg. async function anitem
      // e[n](m) is promise
      return e[n](m)
    } else if (typeof e === 'object') {
      // n is d3Scale (e[n] is undefined)
      return e
    } else {
      return e
    }
  }
  const mapCell = (e, n, m) => m({[n]: e})[n]

  // ............................. xs
  //
  //  is retrieved by the mapper in the anitem
  //  to get eons, muons, bosons from the store or retrieves them from cms
  //

  const getCeonSync = (part, __eo) => __eo(part[0])

  // ............................. getCeon
  async function getCeon (part, __eo) {
    
    let ceon = part[0]
    let r = __eo(ceon)
    return r ? Promise.resolve(r) : Promise.reject(r)
  }

  // ............................. getFeon
  async function getFeon (part, __eo) { // d3Froce3d, ./d3-force-3d.js

    let eon = await require(...a(part[1]))

    console.assert(eon !== undefined, `eon undefined for part ${part[0]}`)
    
    let cell = await getCell(eon, part[0], __eo) // eon to cell
    let feon = await mapCell(cell, part[0], __eo) // map cell
    return feon
  }

  // ............................. getXeon
  async function getXeon (part, __eo) { // d3Froce3d, d3-force-3d
  
    let eon = await require(...a(part[1]))
    let cell = await getCell(eon, part[0], __eo) // eon to cell
    let xeon = await mapCell(cell, part[0], __eo) // map cell
    return xeon
  }

  // ............................. getEon
  async function getEon (inpart, __eo) { // nome is partName: eg 'muonGraticule'
    let part = (typeof inpart === 'string') ? [inpart, ''] : inpart // else array

    let res

    if (typeof part[0] === 'function') {
      // [async ƒ anitem(__eo), "ani"]

      let [eonfn, pres] = part
      let x = await eonfn(__eo)

      res = await x[pres]()
    } else {
      let [name, pres] = part // [name, prefix] eg.: [versor, muon]

      let ceon = ceonize(name, pres) // eg.: 'muonVersor' get from store
      let feon = feonize(name, pres) // eg.: './eon-muon-versor.js' get from file
      let xeon = xeonize(name, pres) // eg.: 'eon-muon-versor' get from cdn

      // array of promises
      var eonsrcs = [
        () => getCeon([ceon, ''], __eo),
        () => getFeon([ceon, feon], __eo),
        () => getXeon([ceon, xeon], __eo),
      ]

      res = eonsrcs.reduce(

        // Promise.prototype.catch() The catch() method returns a Promise and deals with rejected cases only
        // if reject, get the eon sync from mapper or call next promise in array
        (promis, func, i) => promis.catch(failed => {
          // i: 0 eon from store
          // i: 1 eon from file
          // i: 2 eon from cdn
          return Promise.resolve(getCeonSync([ceon, ''], __eo) || func())
        }),

        Promise.reject('init reduce'))

        .catch(failed => { console.log('Failed: ', ceon, failed) })
    }

    return res
  }

  // ............................. xs
  let xs = function (__eo = {}) {
    const patterns = [

      ['ani', 'a', 'ani'],
      ['boson', 'b', ''],
      ['ctl', 'c', 'ctl'],
      ['dat', 'd', 'dat'],
      ['eohal', 'e', 'eohal'],
      ['force', 'f', 'force'],
      ['geo', 'g', 'geo'],
      ['lib', 'l', 'lib'],
      ['muon', 'm', 'muon'],
      ['prt', 'p', 'prt'],
      ['render', 'r', 'render'],
      ['zindex', 'z', 'z'],

    ]

    let eons = function () {}
    for (let i = 0; i < patterns.length; i++) {
      let pattern = patterns[i]
      let name = pattern[0]
      let code = pattern[1]
      let pres = pattern[2]
      eons[name] = eons[code] = (n, p = pres) => getEon([n, p], __eo)
    }

    return eons
  }

  // ............................. xEo
  //
  //    manage eons state
  //
  let xEo = function () {
    let state = {}

    let stater = function (_) {
      if (arguments.length < 1) return state
      else if (typeof _ === 'object') return (state = Object.assign({}, state, _))
      else if (typeof _ === 'string' && state[_] !== undefined) return state[_]
      else if (typeof _ === 'string' && state[_] === undefined) return null
    }

    return stater
  }

  // ............................. eon
  //
  // called in z-file with anitem and a time
  // anitem is async function that takes the mapper xEo{} as argument
  // xEo gets xs from the state to retrive eons
  //
  let initEo = async function () {
    let __eo = xEo() // init mapper

    __eo({'xs': xs(__eo)}) // map xs

    __eo({'xD3Require': {
        require: require,
        requireFrom: requireFrom,
        },
        }) // map require    
    
    await __eo('xs').m('store') // map store
    await __eo('xs').m('animation') // map animation

    console.assert(typeof anitem === 'function' ||
      typeof anitem === 'string') // anitem is function or string

    return __eo
  }

  let eon = async function ({anitem, time}) {
    
    let __eo = await initEo() // init mapper
    let animas = await __eo('xs').a(anitem) // proxy ani.anitem
    __eo('muonStore').apply({type: 'UPDANIMA', animas: animas})
    __eo('muonAnimation').animate(time) // animate
 
    
  }

  exports.capitalize = capitalize
  exports.filenize = filenize
  exports.ceonize = ceonize
  exports.feonize = feonize
  exports.camelize = camelize
  exports.getCell = getCell
  exports.mapCell = mapCell
  exports.mapCell = mapCell
  exports.eon = eon
  exports.xEo = xEo
  exports.xs = xs
  exports.require = require
  exports.requireFrom = requireFrom

  Object.defineProperty(exports, '__esModule', { value: true })
}))
