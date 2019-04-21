/***********
 *    @eonMuonLacer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonMuonLacer = global.eonMuonLacer || {})))
}(this, function (exports) {
  'use strict'

  // ... # eon-muon-lacer
  // ... **cells interlinked within cells interlinked**
  // ... # license
  // ... MIT

  async function eonitem (__mapper = {}) {
    // ...................... range
    // https://github.com/d3/d3-array/blob/master/src/range.js  Copyright 2019 Mike Bostock
    // The stop value is exclusive; it is not included in the result
    function range (start, stop, step) {
      let m
      start = +start
      stop = +stop
      step = (m = arguments.length) < 2 ? (stop = start, start = 0, 1) : m < 3 ? 1 : +step

      let i = -1,
        n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
        range = new Array(n)

      while (++i < n) {
        range[i] = start + i * step
      }

      return range
    }
    // ......... eoformer

    function eoformer (s1extent = [-1, 1], endpoints = [-1, 1]) {
      let s1range = [0, endpoints.length - 1] // [0, seg5] eg. [0,6]
      let s2extent = range(0, endpoints.length) // [0,...,seg5]
      let s2range = endpoints // normed for

      let scale1 = linscal().domain(s1extent).range(s1range)
      let scale2 = linscal().domain(s2extent).range(s2range)

      return p => scale2(scale1(p)) //  [0,1) =s1=> [0,seg5) =rador=> [0,1]
    }

    // ......... eoliner
    function eoliner (s1extent = [-1, 1], endpoints = [-1, 1]) {
      let [d, r] = unslide(slide([s1extent, endpoints]))

      return p => linscal().domain(d).range(r)(p) //  [0,1) =s1=> [0,seg5) =rador=> [0,1]
    }
    // ...................... linscal
    // https://d3js.org/d3-scale/ v2.2.2 Copyright 2019 Mike Bostock
    // let _linear = d3scale.scaleLinear
    function linscal () {
      function constant (x) {
        return function () {
          return x
        }
      }

      var unit = [0, 1]

      function identity (x) {
        return x
      }

      function normalize (a, b) {
        return (b -= (a = +a))
          ? function (x) { return (x - a) / b }
          : constant(isNaN(b) ? NaN : 0.5)
      }

      let interpolate = (a, b) => t => a + t * (b - a)

      // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
      // interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
      function bimap (domain, range, interpolate) {
        var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1]
        if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0)
        else d0 = normalize(d0, d1), r0 = interpolate(r0, r1)
        return function (x) { return r0(d0(x)) }
      }

      function polymap (domain, range, interpolate) {
        var j = Math.min(domain.length, range.length) - 1,
          d = new Array(j),
          r = new Array(j),
          i = -1

        // Reverse descending domains.
        if (domain[j] < domain[0]) {
          domain = domain.slice().reverse()
          range = range.slice().reverse()
        }

        while (++i < j) {
          d[i] = normalize(domain[i], domain[i + 1])
          r[i] = interpolate(range[i], range[i + 1])
        }

        return function (x) {
          let compare = function (a, b) {
            return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN
          }
          let bisecRight = function (a, x, lo, hi) {
            if (lo == null) lo = 0
            if (hi == null) hi = a.length
            while (lo < hi) {
              var mid = lo + hi >>> 1
              if (compare(a[mid], x) > 0) hi = mid
              else lo = mid + 1
            }
            return lo
          }

          // d3.bisect(array, x[, lo[, hi]])
          // var i = d3Array.bisect(domain, x, 1, j) - 1;
          var i = bisecRight(domain, x, 1, j) - 1
          return r[i](d[i](x))
        }
      }

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
      let domain = unit,
        range = unit

      let output,
        unknown

      let piecewise = (domain, range, interpolate) => Math.min(domain.length, range.length) > 2 ? polymap(domain, range, interpolate) : bimap(domain, range, interpolate)
      let clamp = identity
      let transform = identity

      let scale = function scale (x) {
        // let unknown
        // return isNaN(x = +x) ? unknown : range[0] + (x - domain[0]) * (range[1] - range[0]) / (domain[1] - domain[0])

        return isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)))
      }

      scale.domain = function (_) {
        if (!arguments.length) return domain.slice()
        domain = []
        let index = new Map()
        let i = -1, n = _.length, d, key
        while (++i < n) if (!index.has(key = (d = _[i]) + '')) index.set(key, domain.push(d))
        return scale
      }

      scale.range = function (_) {
        return arguments.length ? (range = slice.call(_), scale) : range.slice()
      }

      initRange.apply(scale, arguments)

      return scale
    }

    // ...................... interlace
    let interlace = function (streams, t) {
      let ww = []
      let ses = [] // scale per position
      let res = [] // scale per position

      let nStreams = streams.length // number of streams
      let nDots = streams.reduce((p, q) => Math.max(q.length, p), 0) // max dots

      for (let i = 0; i < nStreams; i++) { // scales
        let sid = [0, nDots - 1]
        let sir = [0, streams[i].length - 1]
        let si = linscal() // argument scale
          .domain(sid) // from result position
          .range(sir) // to strem i position

        ses[i] = si // ses scale for i stream

        let rid = range(streams[i].length).map((d, i) => i)
        let rir = streams[i]
        let ri = linscal() // argument scale
          .domain(rid) // from result position
          .range(rir) // to strem i position

        res[i] = ri // ses scale for i stream
      }

      for (let j = 0; j < nDots; j++) { // each position j
        let rr = []
        let ss = []

        for (let k = 0; k < streams.length; k++) { // each stream
          let vk = ses[k](j) // postion on stram
          let sk = res[k](vk) // time stream

          rr.push(vk) // [0, 0, 0], [0.5, 0.25, 1], [1, 0.5, 2]  positions per stream
          ss.push(sk) // [2, 33, 5], [2.5, 33.25, 6], [3, 33.5, 7]  values  j
        }

        let d = ss.map((item, idx) => idx / (ss.length - 1))
        let r = ss

        let ws = linscal()
          .domain(d)
          .range(r)

        ww[j] = ws(t)
      }

      return ww
    }

    /* **************************
     *        @slide
     *
     *        [ [a1,a2,a3], [b1,b2] ]     [ [a1,b1], [a2,b2x], [a3,b2] ]
     *        [ {a1,a2,a3}, [b1,b2] ]     [ [a1v,b1], [a2v,b2x], [a3v,b2] ]
     *        [ {a1,a2,a3}, {b1,b2} ]     [ [a1v,b1], [a2v,b2x], [a3v,b2] ]
     */
    let slide = function (streams = [], compl = 'max') {
      let lengths = streams.map(d => d.length),
        mx = Math.max(...lengths),
        mn = Math.min(...lengths)

      let streamXYZ = []
      if (compl === 'min') {
        let pointsHowmany = mn // min length

        for (let i = 0; i < pointsHowmany; i++) {
          streamXYZ[i] = streams.map(d => d[i])
        }
      } else {
        let pointsHowmany = mx // max length eg. 3

        let scales_1 = []
        for (let i = 0; i < streams.length; i++) { // each stream
          let stream = streams[i]

          let domain = [0, pointsHowmany - 1 ]
          let range = [0, stream.length - 1]

          scales_1[i] = linscal()
            .domain(domain)
            .range(range)
        }

        let scales_2 = []
        for (let i = 0; i < streams.length; i++) { // each stream
          let stream = streams[i]

          let domain = [...Array(stream.length)].map((d, i) => i)
          let range = stream

          scales_2[i] = linscal()
            .domain(domain)
            .range(range)
        }

        for (let j = 0; j < pointsHowmany; j++) { // each point
          let dot = []
          for (let k = 0; k < streams.length; k++) {
            dot[k] = scales_2[k](scales_1[k](j))
          }
          streamXYZ.push(dot)
        }
      }
      return streamXYZ
    }

    // ....................... unslide
    let unslide = function (stream = []) {
      let lengths = stream.map(d => d.length) // lengths of array elems
      let mx = Math.max(...lengths) // 3 if array of 3d coords
      let unslide = range(mx).map(mx => [])

      for (let i = 0; i < stream.length; i++) {
        for (let j = 0; j < mx; j++) {
          unslide[j][i] = stream[i][j]
        }
      }
      return unslide
    }

    // ....................... interadd
    let interadd = function (streams) {
      let ww = []
      let ses = [] // scale per position
      let res = [] // scale per position

      let nStreams = streams.length // number of streams
      let nDots = streams.reduce((p, q) => Math.max(q.length, p), 0) // max dots

      for (let i = 0; i < nStreams; i++) { // scales
        let sid = [0, nDots - 1]
        let sir = [0, streams[i].length - 1]
        let si = linscal() // argument scale
          .domain(sid) // from result position
          .range(sir) // to strem i position

        ses[i] = si // ses scale for i stream

        let rid = range(streams[i].length).map((d, i) => i)
        let rir = streams[i]
        let ri = linscal() // argument scale
          .domain(rid) // from result position
          .range(rir) // to strem i position

        res[i] = ri // ses scale for i stream
      }

      for (let j = 0; j < nDots; j++) { // each position j
        let rr = []
        let ss = []

        for (let k = 0; k < streams.length; k++) { // each stream
          let vk = ses[k](j) // postion on stream
          let sk = res[k](vk) // time stream

          rr.push(vk) // [0, 0, 0], [0.5, 0.25, 1], [1, 0.5, 2] positions per stream
          ss.push(sk) // [2, 33, 5], [2.5, 33.25, 6], [3, 33.5, 7]  values  j
        }

        ww[j] = ss.reduce((p, q) => q + p, 0)
      }

      return ww
    }

    // ....................... enty
    let enty = function () {}
    enty.range = range
    enty.linscal = linscal // copied from d3scale.scaleLinear
    enty.eoliner = eoliner
    enty.eoformer = eoformer
    enty.interlace = interlace
    enty.slide = slide
    enty.unslide = unslide
    enty.interadd = interadd

    return enty
  }

  exports.eonMuonLacer = eonitem
}))
