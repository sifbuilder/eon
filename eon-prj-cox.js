/*******************************************
 *      @prjCox
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.prjCox = global.prjCox || {})))
}(this, function (exports) {
  'use strict'

  // Philippe Rivière’s Block 1aafd8fa22b62243290674384c364dd0
  // Cox Projection
  // https://bl.ocks.org/fil/1aafd8fa22b62243290674384c364dd0
  // Updated June 14, 2017
  // LICENSE# Released under the The MIT License.

  // https://bl.ocks.org/Fil/52615c5735550a8fd325b0316d896d67
  // https://visionscarto.net/cox-conformal-projection
  // http://www.cs.dartmouth.edu/~doug/wallpaper.pdf

  async function prjCox (__mapper = {}) {
    let [
      Complex,
      muonNewton,
      d3Geo,
      d3GeoProjection,
      d3Array,
      muonGeom,
    ] = await Promise.all([
      __mapper('xs').l('complex'),
      __mapper('xs').m('newton'),
      __mapper('xs').b('d3-geo'),
      __mapper('xs').b('d3-geo-projection'),
      __mapper('xs').b('d3-array'),
      __mapper('xs').m('geom'),
    ])

    let cache = {},
      cacheProject

    // .................. sphere
    // the Sphere should go *exactly* to the vertices of the triangles
    // because they are singular points
    function sphere () {
      let degrees = 180 / Math.PI,
        c = 2 * Math.asin(1 / Math.sqrt(5)) * degrees // 53.130102354156
      return {
        type: 'Polygon',
        coordinates: [
          [ [ 0, -90 ], [ -180, c ], [ 0, 90 ], [ 180, c ], [ 0, -90 ] ], // N/S
        ],
      }
    }

    // .................. prjRaw
    // prjlat  || 1    // [1,-1] north/south
    // prjlagr || 0.5  // lagrange coef
    // prjrad  || 2    // radius
    let prj = function (prjlat = 1, prjlagr = 0.5, prjrad = 1) {
      let prjRaw = function (lambda, phi) {
        // Approximate \int _0 ^sm(z)  dt / (1 - t^3)^(2/3)
        // sm maps a triangle to a disc, sm^-1 does the opposite
        function sm_1 (s) {
          let w0 = [-1 / 2, Math.sqrt(3) / 2], // [Math.sin(-30 * radians), Math.cos(-30 * radians)],
            w = Complex(w0),
            k = Complex(0),
            z = Complex(s)

          let rot = w.clone().pow(d3Array.scan([0, 1, 2].map( // rotate to have s ~= 1
            i => -(z.clone().mul(w.clone().pow(i))).re
          )))

          let n = z.abs()
          let m = [0, 0.3]

          if (n > m[0]) { // n > m[0]::0
            let y = rot.clone().mul(z).mul(-1).add(1)

            // let n = 3
            // w1 = gamma(1/n) * gamma(1 - 2/n) / n / gamma(1 - 1/n)
            // https://bl.ocks.org/Fil/852557838117687bbd985e4b38ff77d4
            let w1 = 1.7666387502854533

            // McIlroy formula 5 p6 and table for F3 page 16
            let F0 = muonGeom.coefsF0() // F0 coeficients
            let F = Complex(0)
            for (let i = F0.length; i--;) F = Complex(F0[i]).add(F.mul(y))

            k = Complex(w1).add(y.pow(1 - 2 / 3).mul(-1).mul(F)).mul(rot.pow(2)) // mutate y
          }

          if (n < m[1]) { // n < m[1]::0.3
            // when we are close to [0,0] we switch to another approximation:
            // https://www.wolframalpha.com/input/?i=(-2%2F3+choose+k)++*+(-1)%5Ek++%2F+(k%2B1)+with+k%3D0,1,2,3,4
            // the difference is _very_ tiny but necessary
            // if we want projection(0,0) === [0,0]
            let H0 = [ 1, 1 / 3, 5 / 27, 10 / 81, 22 / 243 ]
            let z3 = z.clone().pow(3)
            let h = Complex(0)
            for (let i = H0.length; i--;) {
              h = Complex(H0[i]).add(h.mul(z3))
            }
            h = h.mul(z)
            k.mul(n / m[1]).add(h.mul(1 - n / m[1]))
          }
          return k.toVector()
        }

        let s = d3GeoProjection.geoLagrangeRaw(prjlagr)(lambda, phi) // lagrange
        let s1 = [prjlat * s[1], prjlat * s[0]] // N/S
        let s2 = [s1[0] / prjrad, s1[1] / prjrad] // radio
        let t = sm_1(s2) // interpolation
        let ret = [prjlat * t[1], prjlat * t[0]] // N/S
        return ret
      }

      prjRaw.invert = muonNewton.geoInverse(prjRaw)

      return prjRaw
    }

    // .................. enty
    let p = function (opts) {
      let m

      let {prjlat, prjlagr, prjrad} = opts

      if ({prjlat, prjlagr, prjrad} ===
        cache.prjlat, cache.prjlagr, cache.prjrad &&
          cacheProject !== undefined) {
        m = cacheProject
      } else {
        cache.prjlat = prjlat
        cache.prjlagr = prjlagr
        cache.prjrad = prjrad

        m = d3Geo.geoProjection(prj(prjlat, prjlagr, prjrad))

        cacheProject = m
      }

      return m
    }

    let enty = function (prjdef = {}) {
      return p(prjdef)
    }
    return enty
  }

  exports.prjCox = prjCox
}))
