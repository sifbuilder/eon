/***************************
 *        @muonProps
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonProps = global.muonProps || {})))
}(this, function (exports) {
  'use strict'

  async function muonProps (__eo = () => {}) {
    let [
      d3Array,
      d3Scale,
    ] = await Promise.all([
      __eo('xs').b('d3-array'),
      __eo('xs').b('d3-scale'),
    ])

    let props = {}

    /***************************
    *        @arrays
    */
    props.a = d => {
      let ret = []
      if (d === undefined) { // ret = []
      } else if (d === null) { // ret = []
      } else if (Array.isArray(d)) {
        ret = [...d]
      } else {
        ret = [d]
      }
      return ret
    }

    props.cloneArray = a => Array.isArray(a) ? [ ...a ] : a

    props.parray = d => (Array.isArray(d)) ? d.slice() : [d]

    props.rarray = d => (Array.isArray(d)) ? [ ...d ].reverse() : [d] // reverse array

    props.isNumericArray = d => Array.isArray(d) && d.reduce((prev, curr) => prev && typeof curr === 'number', true)

    // pure array: no object/funcion elements
    props.isPureArray = d => Array.isArray(d) && d.reduce((prev, curr) => prev && typeof curr !== 'object' && typeof curr !== 'function', true)

    // functional array
    props.isFunctionalArray = d => Array.isArray(d) && d.reduce((prev, curr) => prev && typeof curr === 'function', true)

    // pure multiarray: array of pure arrays
    props.isPureMultiArray = d => Array.isArray(d) && d.reduce((prev, curr) => prev && props.isPureArray(curr), true)

    // quasipure array: arrays, string or number elements
    props.isQuasiPureArray = d => Array.isArray(d) && d.reduce((prev, curr) => prev &&
        Array.isArray(curr) ||
        typeof (curr) === 'string' ||
        typeof (curr) === 'number'
      , true)

    props.isDoubleSingleArray = d => (Array.isArray(d) && // [[_]]
        Array.isArray(d[0]) &&
        d.length === 1 &&
        d[0].length === 1
    )
    props.isDoubleArray = d => (Array.isArray(d) && // [[_]]
        Array.isArray(d[0]) &&
        d.length === 1
    )

    // tripleArray" animas animation, single polygon geojson MultiPolygon
    props.isTripleArray = d => (Array.isArray(d) && Array.isArray(d[0]) && Array.isArray(d[0][0]) &&
        d.length === 1 && d[0].length === 1 && d[0][0].length === 1) // [[[_]]]

    props.interadd = function (arr = []) {
      let locations = []
      let poses = arr.length // additive positions eg.2
      let mx = Math.max(...arr.map(d => d.length)) // num of dims eg. 3

      for (let i = 0; i < mx; i++) { // for each dimension
        let loc = 0
        for (let j = 0; j < poses; j++) {
          loc = loc + arr[j][i]
        }
        location[i] = loc
      }
      locations.push(location)

      return locations
    }

    props.cant = function (arr = [], r = 0.0) {
      let canted = d3Array.pairs(arr, function (a, b) {
        // a -aa---bb- b

        let dim = a.length
        let aa = new Array(dim), bb = new Array(dim)

        aa = a.map((d, i) => a[i] + r * (b[i] - a[i]))
        bb = b.map((d, i) => a[i] + (1 - r) * (b[i] - a[i]))

        return [aa, bb]
      })
        .reduce((p, q) => [...p, ...q], [])
      return canted
    }

    /* **************************
   *        @interlink
   *        [ [a1,a2,a3], [b1,b2] ]     [ [a1,b1], [a2,b2x], [a3,b2] ]
   *        [ {a1,a2,a3}, [b1,b2] ]     [ [a1v,b1], [a2v,b2x], [a3v,b2] ]
   *        [ {a1,a2,a3}, {b1,b2} ]     [ [a1v,b1], [a2v,b2x], [a3v,b2] ]
   */
    props.interlink = function (streams = [], compl = 'max') {
      let nbr = streams.length

      let inpattern = streams.reduce((p, q) => p && props.isNumericArray(q), true)

      let lengths = streams.map(d => d.length),
        mx = Math.max(...lengths),
        mn = Math.min(...lengths)

      let streamXYZ = []
      if (compl === 'min') {
        let pointsHowmany = mn // min length

        for (let i = 0; i < pointsHowmany; i++) {
          streamXYZ[i] = streams.map(d => d[i])
        }
        let scales = streams.map(d => d3Scale.scaleLinear().domain([0, pointsHowmany - 1]).range([0, d.length - 1 ]))
      } else {
        let pointsHowmany = mx // max length
        let scales = streams.map(d => d3Scale.scaleLinear().domain([0, pointsHowmany - 1]).range([0, d.length - 1 ]))
        for (let j = 0; j < pointsHowmany; j++) {
          let w = streams.map((s, k) => streams[k][Math.round(scales[k](j))])
          streamXYZ.push(w)
        }
      }
      return streamXYZ
    }

    props.interlace = props.interlink

    props.arywinopen = (x0, x1, dx) => {
      let epsilon = 1e-5
      let xx = []
      let mx = Math.max(Math.abs(x0), Math.abs(x1)) - epsilon
      let mt = Math.ceil(mx / dx)
      for (let i = -mt; i < mt; i++) { if (x0 < i * dx && i * dx < x1) { xx.push(i * dx) } }
      return xx
    }

    props.arywinclosed = (x0, x1, dx) => [x0, ...props.arywinopen(x0, x1, dx), x1]

    /***************************
   *        @matrixes
   */
    // .................. tidx
    props.tidx = function (horq, verq, hd = 1, vd = 1) { // tidx(6,4,1,1)
      return function (col, row) { // ridx([3,5]) => 17
        let ret = (row * hd) * (horq * vd) + col
        return ret
      }
    }

    // .................. ridx
    props.ridx = function (horq, verq, hd = 1, vd = 1) { // ridx(6,4,1,1)
      return function (idx) { // ridx(3) => [0,2], ridx(17) => [3,5]
        let ret = [Math.floor(((idx / hd) / vd) / horq), idx % horq]
        return ret
      }
    }
    /***************************
   *        @complex
   */
    props.zcoef = (rad, ang) => Complex({ re: rad * Math.cos(ang), im: rad * Math.sin(ang) })

    /***************************
   *        @functions
   */
    props.v = (d, ...p) => (typeof d === 'function') ? d(...p) : d
    props.f = d => (typeof (d) === 'function') ? d : () => d
    props.clone = d => {
      let clone = d
      if (typeof d === 'object') clone = props.cloneObj(d)
      else if (Array.isArray(d)) clone = props.cloneArray(d)
      return clone
    }

    /***************************
   *        @objects
   */

    props.isPureObject = d => typeof d === 'object' &&
        d.getOwnPropertyNames.reduce((prev, curr) => prev && typeof d.curr !== 'object' && typeof d.curr !== 'function', true)

    // https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
    props.o = obj => {
      if (obj == null || typeof obj !== 'object') return obj
      let copy = obj.constructor()
      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
      }
      return copy
    }

    // http://heyjavascript.com/4-creative-ways-to-cloneObj-objects/
    props.cloneObj = function (obj) {
      if (obj === null || typeof obj !== 'object') {
        return obj
      }

      let temp = obj.constructor() // give temp the original obj's constructor
      for (let key in obj) {
        temp[key] = props.cloneObj(obj[key])
      }

      return temp
    }

    // http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html
    props.isSame = function (a, b) {
      let ret = false
      if (a !== undefined && b !== undefined) {
        var aProps = Object.getOwnPropertyNames(a)
        var bProps = Object.getOwnPropertyNames(b)

        if (aProps.length != bProps.length) {
          return false
        }

        for (let i = 0; i < aProps.length; i++) {
          var propName = aProps[i]

          if (a[propName] !== b[propName]) {
            return false
          }
        }

        ret = true
      }

      return ret
    }
    /***************************
   *        @paths
   */

    props.closerange = (a, b) => [...d3Array.range(a, b), a]
    props.geoscale = extent => d3Scale.scaleLinear().domain(extent[0]).range(extent[1])

    props.addarray = (a1, a2) => a1.map((d, i) => d + a2[i])
    props.sum = (a, t) => a.reduce((p, c) => c[t] + p, 0)
    props.add = (a, t) => a.reduce((p, c) => c + p, 0)
    props.summa = (fns) => fns.reduce((fncurr, fnprev) => {
      return t => props.lib.functor(fncurr)(t) + props.lib.functor(fnprev)(t)
    }, t => 0)

    props.fa = d => { // force array
      let ret
      if (Array.isArray(d)) ret = d
      else if (d === null) ret = []
      else if (d === undefined) ret = []
      else if (typeof d === 'object') ret = Object.values(d)
      else ret = d
      return props.a(ret)
    }

    props.norma = function norma (pts = []) {
      let m = Math.max(...pts)
      let c = 1 / m
      let r = pts.map(p => p * c)
      return r
    }

    props.ta = d => (Array.isArray(d)) ? d.map(di => [[ di ]]) : [[ d ]] // to tripleArray

    props.posInStream = function (rpos, stream) { // pos from rel-pos in stream
      let pos
      let unidimLength = stream.length
      pos = Math.round(rpos * unidimLength / 100)
      pos = (pos >= 0) ? pos % unidimLength : (pos + unidimLength) % unidimLength
      return pos
    }

    props.geoscale = extent => d3Scale.scaleLinear().domain(extent[0]).range(extent[1])

    props.closerange = (a, b) => [...d3Array.range(a, b), a]

    props.isPureObject = d => (!Array.isArray(d) &&
                typeof d === 'object' &&
                Object.keys(d).reduce((p, c) => p && (typeof d[c] !== 'object'), true)
    )
    props.isObject = d => (typeof d === 'object' && Array.isArray(d) === false)
    props.isArray = d => Array.isArray(d)
    props.isString = d => typeof (d) === 'string'
    props.isNumber = d => typeof (d) === 'number'
    props.isFunction = d => typeof (d) === 'function'

    props.functor = d => (typeof (d) === 'function') ? d : d => d
    props.constant = v => (typeof v === 'function') ? v() : v
    props.value = v => (typeof v === 'function') ? v() : v
    props.noop = () => {}

    /***************************
   *        @numbers
   */
    props.grouplinear = d => n => Math.ceil(n / d)
    props.groupgeometric = d => n => Math.ceil(n ** (1 / d))

    /***************************
   *        @streams
   */
    props.streamRange = function (pts, pa = 0, pb = -1, step = 1, fas = 0) {
      // for (let k in params) params[k] = value(params[k])
      //  + clockwise, - counter-clockwise
      //  [-0,-1] :=   [359,0]        // [0,360] _e_
      //  [-300,120] := -[300, 0], -[0,120]

      let neg = x => x < 0 || (x === 0 && (1 / x < 0))
      let pos = x => x > 0 || (x === 0 && (1 / x > 0))

      let ptsLength = pts.length // group order    assume positive
      let intA = Math.round(pa)
      let intB = Math.round(pb)
      let posA = Math.abs(intA)
      let posB = Math.abs(intB)

      let posmodA = Math.floor(posA % ptsLength)
      let posmodB = Math.floor(posB % ptsLength)
      let modStep = Math.floor(step)

      let ret = []
      if (intA === intB) {
        let p = intA % ptsLength // pt in group
        ret.push(pts[p])
      } else if (intB < 0) { // neg B is nb. of cycles
        for (let i = 1; i <= posB; i++) ret = ret.concat(pts.slice(posA, ptsLength))
        ret = ret.concat(pts.slice(posA, Math.floor(ptsLength * (posB % 1)))) // fraction

        if (neg(intA)) ret = props.immutableReverse(ret)
      } else if (posA < posB) {
        if (posmodA < posmodB) {
          ret = ret.concat(pts.slice(posmodA, posmodB + 1)) // +1 position
            .filter((d, i) => (i % modStep === 0)) // step
        } else {
          ret = ret.concat(
            pts.slice(posmodA, ptsLength),
            pts.slice(0, posmodB))
        }

        if (neg(intA)) ret = props.immutableReverse(ret)
      } else if (posA > posB) { // _e_
        if (neg(intA)) {
          ret = ret.concat(pts.slice(posA, ptsLength))
          ret = ret.concat(pts.slice(0, posB))
          ret = props.immutableReverse(ret)
        } else {
          let rpts = props.immutableReverse(pts)
          ret = props.streamRange(rpts, pts.length - posA, pts.length - posB)
        }
      }
      return ret
    }

    /***************************
   *        @fibonacciSphere
   */
    props.cartesian = function (spherical) {
      let radians = Math.PI / 180
      let lambda = spherical[0] * radians,
        phi = spherical[1] * radians,
        cosphi = Math.cos(phi)
      return [
        Math.cos(lambda) * cosphi,
        Math.sin(lambda) * cosphi,
        Math.sin(phi),
      ]
    }

    props.spherical = function (cartesian) {
      let radians = Math.PI / 180
      let r = Math.sqrt(cartesian[0] * cartesian[0] + cartesian[1] * cartesian[1]),
        lat = Math.atan2(cartesian[2], r),
        lng = Math.atan2(cartesian[1], cartesian[0])
      return [lng / radians, lat / radians]
    }

    props.mapline = function (Positions, Verts) {
      return Verts
        .map(function (v) {
          return props.spherical(Positions[v])
        })
    }

    props.fibonacciSphere = function fibonacciSphere (samples = 1, randomize = true) {
      let rnd = 1.0
      if (randomize) {
        rnd = Math.random() * samples
      }

      const offset = 2.0 / samples
      const increment = Math.PI * (3.0 - Math.sqrt(5.0))

      let r = d3Array.range(samples)
        .map((i) => {
          const y = ((i * offset) - 1) + (offset / 2)
          const r = Math.sqrt(1 - Math.pow(y, 2))
          const phi = ((i + rnd) % samples) * increment
          const x = Math.cos(phi) * r
          const z = Math.sin(phi) * r
          return ([x, y, z])
        })
      return r
    }
    /***************************
   *        @strings
   */
    props.d = function (precision) {
      return function (value) {
        var multiplier = Math.pow(10, precision || 0)
        return Math.round(value * multiplier) / multiplier
      }
    }

    props.strToJson = d => JSON.stringify(test.replace(/\n|\r/g, ' ').split(' ').map(d => d.split(',').map(p => Number.parseFloat(p))))

    props.format2 = d => d.map(p => p ? +p.toFixed(2) : p)

    /***************************
   *        @obj
   *        entry from list and index
   */
    props.enxs = function (obj, objs, objidx = 0) {
      let ret
      if (obj !== undefined) { // if obj singular
        ret = obj // .map(d => Math.round(d))
      } else if (objs !== undefined) { // if plural
        if (typeof objidx === 'number') ret = objs[Math.round(objidx)] // get one
        else if (Array.isArray(objidx)) ret = objidx.map(d => objs[Math.round(d)]) // get some
      }
      return ret
    }

    props.objxx = function (obj, objs, objidx = 0, arr) {
      let _obj = arr[obj]
      let _objs = arr[objs]
      let _objidx = arr[objidx]
      return props.enxs(_obj, _objs, _objidx)
    }

    /***************************
   *        @positions
   */
    props.isPosition = obj => Object.getOwnPropertyNames(obj).reduce((p, q) =>
      p &&
        (q === 'x' || q === 'y' || q === 'z') &&
        typeof obj[q] === 'number'
      , true)

    props.debug = () => [].join.call(arguments, '\n')

    /******************
 *        @reticule
 */
    props.reticule = function (ret = []) {
      let retAng = ret[0]
      let retRad = ret[1]

      let ccs =
        d3Array.range(retRad[0], retRad[1], retRad[2]) // range rad
          .map(ro =>
            d3Array.range(retAng[0], retAng[1] + epsilon, retAng[2]) // range ang - +epsilon
              .map(t => [ro * Math.cos(t * Math.PI / 180), ro * Math.sin(t * Math.PI / 180)]))

      let rrs =
        d3Array.range(retAng[0], retAng[1], retAng[2])
          .map(fi =>
            d3Array.range(retRad[0], retRad[1], retRad[2])
              .map(t => [t * Math.cos(fi * Math.PI / 180), t * Math.sin(fi * Math.PI / 180)]))

      return { ccs, rrs }
    }
    /******************
 *        @scale
 */
    // https://d3js.org/d3-scale/ v2.2.2 Copyright 2019 Mike Bostock
    props.linear = function () {
      let initRange = function (domain, range) {
        switch (arguments.length) {
          case 0: break
          case 1: this.range(domain); break
          default: this.range(range).domain(domain); break
        }
        return this
      }
      let array = Array.prototype
      let slice = array.slice
      let identity = x => x
      let unit = [0, 1]
      let domain = unit,
        range = unit,
        unknown,
        index

      let scale = function scale (x) {
        return isNaN(x = +x) ? unknown : range[0] + (x - domain[0]) * (range[1] - range[0]) / (domain[1] - domain[0])
      }

      scale.domain = function (_) {
        if (!arguments.length) return domain.slice()
        domain = [], index = new Map()
        var i = -1, n = _.length, d, key
        while (++i < n) if (!index.has(key = (d = _[i]) + '')) index.set(key, domain.push(d))
        return scale
      }

      scale.range = function (_) {
        return arguments.length ? (range = slice.call(_), scale) : range.slice()
      }

      initRange.apply(scale, arguments)

      return scale
    }

    /***************************
   *        @enty
   */
    let enty = props

    return enty
  }

  exports.muonProps = muonProps
}))
