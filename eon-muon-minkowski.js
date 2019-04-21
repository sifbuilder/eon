// https://github.com/mikolalysenko/convex-minkowski-sum
// (c) 2014 Mikola Lysenko. MIT License
/***********
 *    @eonMuonMinkowski
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonMuonMinkowski = global.eonMuonMinkowski || {})))
}(this, function (exports) {
  'use strict'

  function lexicographicOrder (a, b) {
    return a[0] - b[0] || a[1] - b[1]
  }

  // Returns the 2D cross product of AB and AC vectors, i.e., the z-component of
  // the 3D cross product in a quadrant I Cartesian coordinate system (+x is
  // right, +y is up). Returns a positive value if ABC is counter-clockwise,
  // negative if clockwise, and zero if the points are collinear.
  let cross = function (a, b, c) {
    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
  }

  // Computes the upper convex hull per the monotone chain algorithm.
  // Assumes points.length >= 3, is sorted by x, unique in y.
  // Returns an array of indices into points in left-to-right order.
  function computeUpperHullIndexes (points) {
    var n = points.length,
      indexes = [0, 1],
      size = 2

    for (let i = 2; i < n; ++i) {
      while (size > 1 && cross(points[indexes[size - 2]], points[indexes[size - 1]], points[i]) <= 0) --size
      indexes[size++] = i
    }

    return indexes.slice(0, size) // remove popped points
  }

  let polygonHull = function (points) {
    let n
    if ((n = points.length) < 3) return null

    let i,
      sortedPoints = new Array(n),
      flippedPoints = new Array(n)

    for (i = 0; i < n; ++i) sortedPoints[i] = [+points[i][0], +points[i][1], i]
    sortedPoints.sort(lexicographicOrder)
    for (i = 0; i < n; ++i) flippedPoints[i] = [sortedPoints[i][0], -sortedPoints[i][1]]

    var upperIndexes = computeUpperHullIndexes(sortedPoints),
      lowerIndexes = computeUpperHullIndexes(flippedPoints)

    // Construct the hull polygon, removing possible duplicate endpoints.
    var skipLeft = lowerIndexes[0] === upperIndexes[0],
      skipRight = lowerIndexes[lowerIndexes.length - 1] === upperIndexes[upperIndexes.length - 1],
      hull = []

    // Add upper hull in right-to-l order.
    // Then add lower hull in left-to-right order.
    for (i = upperIndexes.length - 1; i >= 0; --i) hull.push(points[sortedPoints[upperIndexes[i]][2]])
    for (i = +skipLeft; i < lowerIndexes.length - skipRight; ++i) hull.push(points[sortedPoints[lowerIndexes[i]][2]])

    return hull
  }

  // .................. eonMuonMinkowski
  async function eonitem (__eo = {}) {
    let [
      d3Polygon,
    ] = await Promise.all([
      __eo('xs').b('d3-polygon'),
    ])

    function embed (d, P, w, res) { // P is A or B
      for (let i = 0, n = P.length; i < n; ++i) { // for each in A or B
        var p = P[i], // point i in A or B
          q = new Array(d + 1) // array of lengh of coord + 1 (space dims + 1)
        for (var j = 0; j < d; ++j) { // each index in A
          q[j] = p[j]
        }
        q[d] = w * i // A (+1) or B (-1)
        res.push(q)
      }
    }

    function comparePair (a, b) {
      var d = a[0] - b[0]
      if (d) {
        return d
      }
      return a[1] - b[1]
    }

    function convexMinkowskiSumHull (A, B) {
      var n = A.length
      var m = B.length
      if (n === 0 || m === 0) {
        return []
      }
      var d = A[0].length
      var pts = []
      embed(d, A, -1, pts)
      embed(d, B, 1, pts)

      let hull = polygonHull(pts) // nD tbd

      return hull
    }

    function convexMinkowskiSumFaces (A, B) {
      var hull = convexMinkowskiSumHull(A, B)
      var result = []
      var n = A.length
      for (let i = 0, h = hull.length; i < h; ++i) {
        var c = hull[i]
        var fA = []
        var fB = []
        for (var j = 0, d = c.length; j < d; ++j) {
          var v = c[j]
          if (v < n) {
            fA.push(v)
          } else {
            fB.push(v - n)
          }
        }
        if (fA.length > 0 && fB.length > 0) {
          result.push([fA, fB])
        }
      }
      return result
    }

    function convexMinkowskiSumPairs (A, B) {
      var hull = convexMinkowskiSumHull(A, B)

      if (hull.length === 0) {
        return []
      }
      var result = []

      // tbd

      for (let i = 0, an = A.length; i < an; i++) { // each point in A
        for (let j = 0, bn = B.length; j < bn; j++) { // each point in B
          result.push([i, j])
        }
      }

      let res = [...new Set(result)] // uniq
      return res
    }

    function convexMinkowskiSum (A, B, s1 = 1, s2 = 1) {
      var pairs = convexMinkowskiSumPairs(A, B)
      if (pairs.length === 0) {
        return []
      }
      var np = pairs.length
      var points = new Array(np)
      var d = A[0].length
      for (let i = 0; i < np; ++i) {
        var p = pairs[i]
        var a = A[p[0]]
        var b = B[p[1]]
        var q = new Array(d)
        for (var j = 0; j < d; ++j) {
          q[j] = s1 * a[j] + s2 * b[j]
        }
        points[i] = q
      }

      // return polygonHull(points)
      return points
    }

    let enty = convexMinkowskiSum
    enty.faces = convexMinkowskiSumFaces
    enty.pairs = convexMinkowskiSumPairs
    return enty
  }

  exports.eonMuonMinkowski = eonitem
}))
