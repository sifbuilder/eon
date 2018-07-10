/***************************
 *        @muonFibonat
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonFibonat = global.muonFibonat || {})))
}(this, function (exports) {
  'use strict'

  async function muonFibonat(__mapper = {}) {
    let [
      mprops,
      mlacer,
      mgeom,
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').m('lacer'),
      __mapper('xs').m('geom'),
    ])


    let radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos

    let cache = {} // payload, string
    cache.string = []

    // .................. stream
    let stream = function (payload = {}) {
      let randomize = payload.randomize || false
      let samples = payload.samples || 50
      let dotsInSegment = payload.dotsInSegment || 12
      let offsetstep = payload.offsetstep || 2
      let goldenangle = Math.PI * (3.0 - Math.sqrt(5.0))

      let string = []

      if (randomize == cache.randomize &&
        samples == cache.samples &&
        dotsInSegment == cache.dotsInSegment
      ) {
        string = cache.string
      } else {
        let rnd = (randomize) ? Math.random() * samples : 1.0

        const offset = offsetstep / samples

        let nodes = d3.range(samples)
          .map(i => {
            const y = ((i * offset) - 1) + (offset / 2),
              r = Math.sqrt(1 - Math.pow(y, 2)),
              phi = ((i + rnd) % samples) * goldenangle,
              x = Math.cos(phi) * r,
              z = Math.sin(phi) * r
            return ([x, y, z]) // eg. [-0.63, -0.5, 0.58]
          })
          .map(mgeom.spherical) // eg. [-0.7853, 0.6154]
          .map(mgeom.to_degrees) // eg. [-141.93, 35.80]

        let string = []

        for (let i = 0; i < nodes.length - 1; i++) { // before last node
          let dot0 = nodes[i]
          let dot1 = nodes[i + 1]

          string.push(dot0) // push beginning of segment

          if (dotsInSegment > 1) { // for the interior
            let dom = [0, dotsInSegment + 2 ] // domain adds frontier

            let rngX = [ dot0[0], dot1[0] ] // range bewteen segment extremes
            let rngY = [ dot0[1], dot1[1] ]

            let scaleX = d3.scaleLinear().domain(dom).range(rngX)
            let scaleY = d3.scaleLinear().domain(dom).range(rngY)

            let indots = d3.range(1, dotsInSegment + 1, 1).map(d => [scaleX(d), scaleY(d)])

            string = [...string, ...indots]
          }
        }

        string.push(nodes[nodes.length - 1]) // add last node

        cache.randomize = randomize
        cache.samples = samples
        cache.dotsInSegment = dotsInSegment
        cache.string = string
      }

      return string
    }

    // .................. catesians
    let catesians = function (payload = {}) {
      const samples = payload.fibonat.samples,
        offsetstep = payload.fibonat.offsetstep,
        xprecision = payload.fibonat.xprecision,
        yprecision = payload.fibonat.yprecision,
        goldenangle = payload.fibonat.goldenangle

      let rnd = 1.0

      const offset = offsetstep / samples

      let dots = d3.range(samples)
        .map(i => {
          const z = ((i * offset) - 1) + (offset / 2)

          const radius = Math.sqrt(1 - Math.pow(z, 2))
          const phi = ((i + rnd) % samples) * goldenangle
          const x = Math.cos(phi) * radius
          const y = Math.sin(phi) * radius
          return ([x, y, z]) // no conform, scale: 100
        })
      let gj = {
        type: 'Feature',
        geometry: {type: 'LineString', coordinates: dots},
        properties: {}
      }

      return gj
    }

    // .................. interlinked
    let interlinked = function (payload = {}) {
      const samples = payload.fibonat.samples,
        offsetstep = payload.fibonat.offsetstep,
        xprecision = payload.fibonat.xprecision,
        yprecision = payload.fibonat.yprecision,
        goldenangle = payload.fibonat.goldenangle

      const offset = offsetstep / samples

      let dots = []
      for (let i = 0; i < samples; i++) {
        const z = ((i * offset) - 1) + (offset / 2) // , (i*s/n)-1 + s/2n ... 2

        if (z <= 1) {
          const radius = Math.sqrt(1 - Math.pow(z, 2))

          const phi = ((i + 1) % samples) * goldenangle
          const lambda = Math.atan2(z, radius)
          dots.push([phi * degrees, lambda * degrees, 1]) // proform, scale: 1
        }
      }

      let lines = []
      for (let i = 0; i < dots.length - 2; i++) { // -2
        lines.push(

          mprops.interlink(
            [
              mprops.arywinclosed(dots[i][0], dots[i + 1][0], xprecision),
              mprops.arywinclosed(dots[i][1], dots[i + 1][1], yprecision)
            ]
          )
        )
      }

      let gj = {
        type: 'Feature',
        geometry: {type: 'MultiLineString', coordinates: lines},
        properties: {}
      }

      return gj
    }

    // .................. enty
    let enty = function () {}
    enty.stream = stream
    enty.catesians = catesians
    enty.interlinked = interlinked
    enty.reset = () => { cache = {}; return enty }

    return enty
  }

  exports.muonFibonat = muonFibonat
}))
