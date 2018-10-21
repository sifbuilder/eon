/**********************
 *    @muonQuad
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonQuad = global.muonQuad || {})))
}(this, function (exports) {
  'use strict'

  // http://bl.ocks.org/mbostock/cd52a201d7694eb9d890 Voronoi Topology
  // http://bl.ocks.org/mbostock/8027835 Closest Point on Path II
  // http://bl.ocks.org/mbostock/d1d81455dc21e10f742f Voronoi Circles
  // http://bl.ocks.org/mbostock/6a53ca8427a0bc2d4cf1 Circle in Sector
  // http://bl.ocks.org/mbostock/6224050 Mitchell�s Best-Candidate
  // http://bl.ocks.org/mbostock/4218871 Circle-Polygon Intersection

  // function muonQuad(x0,y0,x1,y1) { // ( x0= 0, y0= 0, x1= 100, y1= 100) {
  async function muonQuad (__mapper) {
    let [
      d3,
    ] = await Promise.all([
      __mapper('xs').b('d3'),
    ])

    let d3Quadtree = d3
    let d3Random = d3
    let d3Polygon = d3

    let width = renderPortview.width(), height = renderPortview.height()

    let x0 = 0, y0 = 0, x1 = width, y1 = height
    let extent = [[x0 - 1, y0 - 1], [x1 + 1, y1 + 1]]
    let candidates = 10
    let rds

    // ........................ quadtree
    var quad = d3Quadtree.quadtree() // quad
      .extent(extent)
      .x(function (d) { return d[0] })
      .y(function (d) { return d[1] })

    // var polygon = shape.points()
    // console.log('polygon', polygon)
    // console.log('polygonArea: ', d3.polygonArea(polygon))
    // console.log('polygonRadius: ', Math.sqrt(Math.abs(d3.polygonArea(polygon))) / Math.PI)
    // console.log('polygonCentroid: ', d3.polygonCentroid(polygon))
    // console.log('polygonContains 200 200', d3.polygonContains(polygon, [175, 385]))
    // console.log('area: ', d3.polygonCentroid(polygon))
    // console.log('polygonLength 400 100', d3.polygonLength(polygon))

    // ........................ diagonal
    // quad.diagonal = function(d, v) {     // error: d is undefined
    let diagonal = function (d, v) { // error: d is undefined
      // v < 0: linear link
      // 0 < v < 1: curved link
      // > 1: curvy link

      var s = d.source
      var t = d.target
      let r

      if ((s.x === undefined) ||
              (s.y === undefined) ||
              (t.x === undefined) ||
              (t.y === undefined)) return null

      if (v < 0) {
        r = 'M' + s.x + ',' + s.y + ' ' + 'L' + t.x + ',' + t.y
      } else {
        var rd = 1 + d3Random.randomNormal(0, v)() // v
        r = 'M' + s.x + ',' + s.y +
                'C' + (s.x + rd * ((t.x - s.x))) + ',' + s.y +
                ' ' + (s.x + rd * ((t.x - s.x))) + ',' + t.y +
                ' ' + t.x + ',' + t.y
      }
      return r
    }

    // ........................ diagonalv
    let diagonalv = (d, v) => diagonal(d, v) // on d.s.x,d.s.y,d.t.x,d.t.y

    // ........................ findmanyothers
    // quad.findmanyothers = function(x, y, r=Infinity, thesemany = 1, polygon = null) {
    let findmanyothers = function (x, y, r = Infinity, thesemany = 1, polygon = null) {
      var ret = []
      let quadCopy = quad.copy()
      let limit = Math.min(thesemany, quadCopy.data().length)
      let found = 0
      while (found < limit) {
        let p = quadCopy.find(x, y, r)
        if (p == null) {
          break
        } else {
          let px = p.x
          let py = p.y
          let dist = (px - x) * (px - x) + (py - y) * (py - y)
          if (dist > 1.e-6) {
            let isin = true
            if (polygon) isin = d3Polygon.polygonContains(polygon, [px, py])
            // http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon
            if (isin) {
              ret.push(p)
              ++found
            }
          }
          quadCopy.remove(p)
        }
      }
      return ret
    }
    // ........................ findmany
    // quad.findmany = function(x, y, r=Infinity, thesemany = 1) {
    let findmany = function (x, y, r = Infinity, thesemany = 1) {
      var ret = []
      let quadCopy = quad.copy()
      let limit = Math.min(thesemany, quadCopy.data().length)
      for (let i = 0; i < limit; i++) {
        let p = quadCopy.find(x, y, r)
        quadCopy.remove(p)
        ret.push(p)
      }
      return ret
    }
    // ........................ candysearch
    // seach best free non-overlaping spot in polygon with population
    // ra2: non overlap area
    // quad.candysearch = function(ra2=10, polygon = null, candidates = 10, sample = 10) {
    let candysearch = function (ra2 = 10, polygon = null, candidates = 10, sample = 10) {
      let mols = []
      for (let i = 0; i < sample; i++) {
        let extent = quad.extent()
        let x0 = extent[0][0], y0 = extent[0][1], x1 = extent[1][0], y1 = extent[1][1]
        let range = Math.max(x1 - x0, y1 - y0)
        let angle = Math.random() * Math.PI * 2
        let radius = Math.random() * range
        let x = Math.cos(angle) * radius
        let y = Math.sin(angle) * radius
        let c0 = [(x0 + x1) / 2, (y0 + y1) / 2] // center of extent
        let c = [c0[0] + x, c0[1] + y] // random point in circle with range around extent center

        let z2 = 0 // current best Distance
        let k = null // current better kandidate

        let dx, dy = 0
        let p = null

        for (let j = 0; j < candidates; ++j) {
          let isin = (polygon !== null) ? d3Polygon.polygonContains(polygon, c) : true
          if (isin) {
            p = c
            k = quad.find(p[0], p[1], ra2) // find within ra2
            if (k) { // there is someting within ra2
              dx = p[0] - k[0]
              dy = p[1] - k[1]
              let d2 = dx * dx + dy * dy // distance from candidate to closest
              if (d2 > z2) {
                p = [k[0], k[1]]
                z2 = d2 // k offers z2
              }
            } else {
              quad.add(p) // add selected point
              mols.push(p) // return selected point
              break
            }
          }
        }
      }
      return mols
    }

    // ....................... enty
    let enty = () => {}
    enty.findmany = findmany
    enty.diagonalv = diagonalv
    enty.candysearch = candysearch
    enty.candidates = _ => (arguments.length) ? (candidates = _, quad) : candidates
    enty.rds = _ => (arguments.length) ? (rds = _, quad) : rds // radius

    enty.findmanyothers = findmanyothers

    enty.quad = (_) => {
      if (_ !== undefined) {
        quad = _
        return enty
      } else {
        return quad
      }
    }

    return enty
  }

  exports.muonQuad = muonQuad
}))
