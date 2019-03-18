/***********
 *    @muonLacer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonLacer = global.muonLacer || {})))
}(this, function (exports) {
  'use strict'

  // ... **cells interlinked within cells interlinked**
  // ... # license
  // ... MIT

  async function muonLacer (__eo = {}) {
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

    // ...................... linear
    // https://d3js.org/d3-scale/ v2.2.2 Copyright 2019 Mike Bostock
    function linear () {
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
      let unit = [0, 1]
      let domain = unit,
        range = unit

      let scale = function scale (x) {
        let unknown
        return isNaN(x = +x) ? unknown : range[0] + (x - domain[0]) * (range[1] - range[0]) / (domain[1] - domain[0])
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
        let si = linear() // argument scale
          .domain(sid) // from result position
          .range(sir) // to strem i position

        ses[i] = si // ses scale for i stream

        let rid = range(streams[i].length).map((d, i) => i)
        let rir = streams[i]
        let ri = linear() // argument scale
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

        let ws = linear()
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
        let pointsHowmany = mx // max length
        let scales = streams.map(d => linear().domain([0, pointsHowmany - 1]).range([0, d.length - 1 ]))
        for (let j = 0; j < pointsHowmany; j++) {
          let w = streams.map((s, k) => streams[k][Math.round(scales[k](j))])
          streamXYZ.push(w)
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
        let si = linear() // argument scale
          .domain(sid) // from result position
          .range(sir) // to strem i position

        ses[i] = si // ses scale for i stream

        let rid = range(streams[i].length).map((d, i) => i)
        let rir = streams[i]
        let ri = linear() // argument scale
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
    enty.linear = linear
    enty.interlace = interlace
    enty.slide = slide
    enty.unslide = unslide
    enty.interadd = interadd

    return enty
  }

  exports.muonLacer = muonLacer
}))
