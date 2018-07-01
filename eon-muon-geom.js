/***********
 *    @muonGeom
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonGeom = global.muonGeom || {})))
}(this, function (exports) {
  'use strict'

  async function muonGeom (__mapper = {}) {
    
    let pi = Math.PI,
      degrees = 180 / pi,
      radians = pi / 180

    let polar = function (cartesian) {
      let lambda = Math.atan2(cartesian[0], cartesian[1])
      let radio = Math.sqrt(cartesian[0] * cartesian[0] + cartesian[1] * cartesian[1])
      return [ radio, lambda ]
    }

    let cartesian = function (spherical) {
      let lambda = spherical[0] * radians,
        phi = spherical[1] * radians,
        cosphi = Math.cos(phi)
      return [
        Math.cos(lambda) * cosphi,
        Math.sin(lambda) * cosphi,
        Math.sin(phi)
      ]
    }

    let spherical = function (cartesian) {
      let r = Math.sqrt(cartesian[0] * cartesian[0] + cartesian[1] * cartesian[1]),
        lat = Math.atan2(cartesian[2], r),
        lng = Math.atan2(cartesian[1], cartesian[0])
      let d = Math.sqrt(cartesian[0] * cartesian[0] + cartesian[1] * cartesian[1] + cartesian[2] * cartesian[2])
      return [lng / radians, lat / radians, d]
    }

    let mapline = function (positions, verts) {
      return verts
        .map(function (v) {
          return enty.spherical(positions[v])
        })
    }

    let normalizeangle = function (angd) {
      while (angd >= 180) { angd -= 360 }
      while (angd < -180) { angd += 360 }
      return angd
    }

    // https://bl.ocks.org/mbostock/ece50c027bdf8cc20003a17d93e4f60e
    // Copyright Mike Bostock
    // Released under the GNU General Public License, version 3.
    // Clips the specified subject polygon to the specified clip polygon;
    // requires the clip polygon to be counterclockwise and convex.
    // https://en.wikipedia.org/wiki/Sutherland–Hodgman_algorithm
    let polygonClip = function (clip, subject) {
      let input,
        closed = polygonClosed(subject),
        i = -1,
        n = clip.length - polygonClosed(clip),
        j,
        m,
        a = clip[n - 1],
        b,
        c,
        d

      while (++i < n) {
        input = subject.slice()
        subject.length = 0
        b = clip[i]
        c = input[(m = input.length - closed) - 1]
        j = -1
        while (++j < m) {
          d = input[j]
          if (polygonInside(d, a, b)) {
            if (!polygonInside(c, a, b)) {
              subject.push(polygonIntersect(c, d, a, b))
            }
            subject.push(d)
          } else if (polygonInside(c, a, b)) {
            subject.push(polygonIntersect(c, d, a, b))
          }
          c = d
        }
        if (closed) subject.push(subject[0])
        a = b
      }

      return subject
    }

    function polygonInside (p, a, b) {
      return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0])
    }

    // Intersect two infinite lines cd and ab.
    function polygonIntersect (c, d, a, b) {
      let x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3,
        y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3,
        ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21)
      return [x1 + ua * x21, y1 + ua * y21]
    }

    // Returns true if the polygon is closed.
    function polygonClosed (coordinates) {
      let a = coordinates[0],
        b = coordinates[coordinates.length - 1]
      return !(a[0] - b[0] || a[1] - b[1])
    }

    // http://bl.ocks.org/johnburnmurdoch/60a427a44ea68e152da1771b28af9bdc
    let pointInCircle = function (p, c, r) {
      return Math.pow(Math.pow(p.x - c.x, 2) + Math.pow(p.y - c.y, 2), 0.5) < r
    }

    let pointInPolygon = function (px, py, vs) {
      return d3.polygonContains(vs, [px, py])
    }

    let polygonInPolygon = function (ps, vs) {
      let inside = false
      for (let i = 0, n = ps.length; i < n; i++) {
        let px = ps[i][0]
        let py = ps[i][1]

        inside = enty.pointInPolygon(px, py, vs)
      }
      return inside
    }

    let polygonInMultiPolygon = function (ps, mvs = []) {
      let inside = false
      for (let i = 0, n = mvs.length; i < n; i++) {
        inside = enty.polygonInPolygon(ps, mvs[i])
        if (inside === true) break
      }

      return inside
    }

    /**************************
  *   @enty
  */
    let enty = function () {}

    enty.polygonArea = polygon => d3.polygonArea(polygon)
    enty.polygonRadius = polygon => Math.sqrt(Math.abs(d3.polygonArea(polygon))) / Math.PI
    enty.polygonHull = points => d3.polygonHull(points)
    enty.polygonContains = (polygon, p) => d3.polygonContains(polygon, p)
    enty.polygonCentroid = polygon => d3.polygonCentroid(polygon)
    enty.polygonLength = polygon => d3.polygonLength(polygon)
    enty.minExtent = points => [Math.min(...points.map(d => d[0])), Math.min(...points.map(d => d[1]))]
    enty.maxExtent = points => [Math.max(...points.map(d => d[0])), Math.max(...points.map(d => d[1]))]
    enty.polygonExtent = points => [enty.minExtent(points), enty.maxExtent(points)]
    enty.extentCentroid = extent => [(extent[0][0] + extent[1][0]) / 2, (extent[0][1] + extent[1][1]) / 2]
    enty.extentEdges = extent => [extent[1][0] - extent[0][0], extent[1][1] - extent[0][1]]

    enty.extentPolygon = e => [
      [e[0][0], e[0][1]],
      [e[0][0], e[1][1]],
      [e[1][0], e[1][1]],
      [e[1][0], e[0][1]],
      [e[0][0], e[0][1]]
    ]

    enty.pointsInPolygon = (points, pol) => points.filter(p => enty.pointInPolygon(p[0], p[1], pol))

    enty.cartesian = cartesian
    enty.spherical = spherical
    enty.mapline = mapline
    enty.normalizeangle = normalizeangle
    enty.polar = polar
    enty.polygonClip = polygonClip
    enty.pointInCircle = pointInCircle
    enty.pointInPolygon = pointInPolygon
    enty.polygonInPolygon = polygonInPolygon
    enty.polygonInMultiPolygon = polygonInMultiPolygon

    enty.dot = (x1, y1, x2, y2) => x1 * x2 + y1 * y2
    enty.distance = (x1, y1, x2, y2) => {
      let dx = x1 - x2
      let dy = y1 - y2
      return Math.sqrt(dx * dx + dy * dy)
    }
    
    
    enty.distance3d = (v1=0, v2=0) => {
      let dx = v2[0] - v1[0],
        dy = v2[1] - v1[1],
        dz = (v2[2] || 0) - (v1[2] || 0)
      return dx * dx + dy * dy + dz * dz
    }    
    
    enty.normalize$2 = (x, y) => {
      let l = enty.distance(0, 0, x, y)
      if (l > 0.00001) {
        return [x / l, y / l]
      } else {
        return [0, 0]
      }
    }
    enty.norm = (x, y) => enty.distance(0, 0, x, y)

    enty.spherical = function (cartesian) {
      return [
        Math.atan2(cartesian[1], cartesian[0]),
        Math.asin(Math.max(-1, Math.min(1, cartesian[2])))
      ]
    }

    enty.to_degrees = v => v.map(d => d * degrees)

    enty.normalize = function (a) {
      let d = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2])
      return a.map(e => e / d)
    }

    enty.cartesian = function (spherical) {
      let radians = Math.PI / 180
      let lambda = spherical[0] * radians,
        phi = spherical[1] * radians,
        cosphi = Math.cos(phi)
      return [
        Math.cos(lambda) * cosphi,
        Math.sin(lambda) * cosphi,
        Math.sin(phi)
      ]
    }

    enty.add = function (v0, v1) {
      let added = []
      let dims = Math.max(v0.length, v1.length)
      for (let i = 0; i < dims; i++) {
        added[i] = (v0[i] || 0) + (v1[i] || 0)
      }
      return added
    }

    enty.zerovector = function (v) {
      let zerovector = []
      let dims = v.length
      for (let i = 0; i < dims; i++) {
        zerovector[i] = 0
      }
      return zerovector
    }

    enty.degrees = () => 180 / Math.PI
    enty.radians = () => Math.PI / 180

    enty.to_radians = v => Array.isArray(v) ? v.map(d => d * Math.PI / 180)
      : typeof (v) === 'number' ? v * Math.PI / 180
        : null
    enty.to_degrees = v => Array.isArray(v) ? v.map(d => d * 180 / Math.PI)
      : typeof (v) === 'number' ? v * 180 / Math.PI : null

    enty.coefsF0 = () => [
      1.44224957030741,
      0.240374928384568,
      0.0686785509670194,
      0.0178055502507087,
      0.00228276285265497,
      -1.48379585422573e-3,
      -1.64287728109203e-3,
      -1.02583417082273e-3,
      -4.83607537673571e-4,
      -1.67030822094781e-4,
      -2.45024395166263e-5,
      2.14092375450951e-5,
      2.55897270486771e-5,
      1.73086854400834e-5,
      8.72756299984649e-6,
      3.18304486798473e-6,
      4.79323894565283e-7 -
        4.58968389565456e-7,
      -5.62970586787826e-7,
      -3.92135372833465e-7
    ]

    enty.coefsG0 = () => [
      1.15470053837925,
      0.192450089729875,
      0.0481125224324687,
      0.010309826235529,
      3.34114739114366e-4,
      -1.50351632601465e-3,
      -1.23044177962310e-3,
      -6.75190201960282e-4,
      -2.84084537293856e-4,
      -8.21205120500051e-5,
      -1.59257630018706e-6,
      1.91691805888369e-5,
      1.73095888028726e-5,
      1.03865580818367e-5,
      4.70614523937179e-6,
      1.4413500104181e-6,
      1.92757960170179e-8,
      -3.82869799649063e-7,
      -3.57526015225576e-7,
      -2.2175964844211e-7
    ]

    return enty
  }

  exports.muonGeom = muonGeom
}))
