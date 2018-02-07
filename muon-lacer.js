/***********
 *    @muonLacer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonLacer = global.muonLacer || {})))
}(this, function (exports) {
  'use strict'

  let muonLacer = function muonLacer (__mapper = {}) {
    let f = __mapper('props')()

    let r = __mapper('xs').r('renderer'),
      width = r.width(),
      height = r.height()

    let radians = Math.PI / 180,
      degrees = 180 / Math.PI

    /***********
   *    @interlace
   */
    let interlace = function (streams, t) {
      let ww = []
      let ses = [] // scale per position
      let res = [] // scale per position

      let nStreams = streams.length // number of streams
      let nDots = streams.reduce((p, q) => Math.max(q.length, p), 0) // max dots

      for (let i = 0; i < nStreams; i++) { // scales
        let sid = [0, nDots - 1]
        let sir = [0, streams[i].length - 1]
        let si = d3.scaleLinear() // argument scale
          .domain(sid) // from result position
          .range(sir) // to strem i position

        ses[i] = si // ses scale for i stream

        let rid = d3.range(streams[i].length).map((d, i) => i)
        let rir = streams[i]
        let ri = d3.scaleLinear() // argument scale
          .domain(rid) // from result position
          .range(rir) // to strem i position

        res[i] = ri // ses scale for i stream
      }

      for (let j = 0; j < nDots; j++) { // each position j
        let rr = []
        let ss = []

        for (let k = 0; k < streams.length; k++) { 	// each stream
          let vk = ses[k](j) // postion on stram
          let sk = res[k](vk) // time stream

          rr.push(vk) // [0, 0, 0], [0.5, 0.25, 1], [1, 0.5, 2]  positions per stream
          ss.push(sk) // [2, 33, 5], [2.5, 33.25, 6], [3, 33.5, 7]  values  j
        }

        let d = ss.map((item, idx) => idx / (ss.length - 1))
        let r = ss

        let ws = d3.scaleLinear()
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
      let nbr = streams.length

      let inpattern = streams.reduce((p, q) => p && f.isNumericArray(q), true)
      if (0 && 1) if (!inpattern) console.log(' streams not in pattern', streams)

      let lengths = streams.map(d => d.length),
        mx = Math.max(...lengths),
        mn = Math.min(...lengths)

      let streamXYZ = []
      if (compl === 'min') {
        let pointsHowmany = mn // min length

        for (let i = 0; i < pointsHowmany; i++) {
          streamXYZ[i] = streams.map(d => d[i])
        }
        let scales = streams.map(d => d3.scaleLinear().domain([0, pointsHowmany - 1]).range([0, d.length - 1 ]))
      } else {
        let pointsHowmany = mx // max length
        let scales = streams.map(d => d3.scaleLinear().domain([0, pointsHowmany - 1]).range([0, d.length - 1 ]))
        for (let j = 0; j < pointsHowmany; j++) {
          let w = streams.map((s, k) => streams[k][Math.round(scales[k](j))])
          streamXYZ.push(w)
        }
      }
      return streamXYZ
    }

    /* **************************
   *        @unslide
   */
    let unslide = function (stream = []) {
      let lengths = stream.map(d => d.length)		// lengths of array elems
      let mx = Math.max(...lengths)							// 3 if array of 3d coords
      let unslide = d3.range(mx).map(mx => [])

      for (let i = 0; i < stream.length; i++) {
        for (let j = 0; j < mx; j++) {
          unslide[j][i] = stream[i][j]
        }
      }
      return unslide
    }

    /* **************************
   *        @interadd
   */
    let interadd = function (streams) {
      let ww = []
      let ses = []				// scale per position
      let res = []				// scale per position

      let nStreams = streams.length						// number of streams
      let nDots = streams.reduce((p, q) => Math.max(q.length, p), 0) // max dots

      for (let i = 0; i < nStreams; i++) {			// scales
        let sid = [0, nDots - 1]
        let sir = [0, streams[i].length - 1]
        let si = d3.scaleLinear()		// argument scale
          .domain(sid)		// from result position
          .range(sir)		// to strem i position

        ses[i] = si					// ses scale for i stream

        let rid = d3.range(streams[i].length).map((d, i) => i)
        let rir = streams[i]
        let ri = d3.scaleLinear()					// argument scale
          .domain(rid)					// from result position
          .range(rir)		// to strem i position

        res[i] = ri					// ses scale for i stream
      }

      for (let j = 0; j < nDots; j++) {				// each position j
        let rr = []
        let ss = []

        for (let k = 0; k < streams.length; k++) {			// each stream
          let vk = ses[k](j)								// postion on stream
          let sk = res[k](vk)								// time stream

          rr.push(vk)		// [0, 0, 0], [0.5, 0.25, 1], [1, 0.5, 2]	positions per stream
          ss.push(sk)		// [2, 33, 5], [2.5, 33.25, 6], [3, 33.5, 7]	values	j
        }

        ww[j] = ss.reduce((p, q) => q + p, 0)
      }

      return ww
    }
    /**********************
   *    @enty
   */
    let enty = function () {}

    enty.interlace = interlace
    enty.slide = slide
    enty.unslide = unslide
    enty.interadd = interadd

    return enty
  }

  exports.muonLacer = muonLacer
}))
