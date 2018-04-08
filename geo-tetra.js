/*******************************************
 *      @geotetra
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.geotetra = global.geotetra || {})))
}(this, function (exports) {
  'use strict'

  // Philippe Rivière’s Block 1aafd8fa22b62243290674384c364dd0
  // Cox Projection
  // https://bl.ocks.org/fil/1aafd8fa22b62243290674384c364dd0
  // Updated June 14, 2017
  // LICENSE# Released under the The MIT License.

  // https://bl.ocks.org/fil/79d2073c50e02b1b4f74e3f330183581
  // https://bl.ocks.org/fil/d5313cd939947169df5c37e896e5aa38
  // https://bl.ocks.org/fil/e5b449606ca1e3e120cda8d08a7f3351

  let geotetra = function geotetra (__mapper = {}) {
		
		let mpolyhedral = __mapper('xs').m('polyhedral')
		
    let renderport = __mapper('renderRenderport'),
      width = renderport.width(),
      height = renderport.height(),
      scaleProj = Math.min(width / 2, height) / Math.PI

    let epsilon = 1e-6, epsilon2 = epsilon * epsilon, asin = Math.asin
    let pi = Math.PI, degrees = 180 / pi, asin1_3 = Math.asin(1 / 3)
    let radians = Math.PI / 180

    let d3Geo = d3

    /*******************************************
 *      @prjRaw
 */
    //  prjlat  [1,-1] north/south
    //  prjlagr lagrange coef
    //  prjrad  radius
    let prj = function (prjlat = 1, prjlagr = 0.5, prjrad = 1) {
      let prjRaw = function (lambda, phi) { // leeRaw  // return d3.geoGnomonicRaw(...arguments);
        function sm_1 (s) {
          let w = Complex([Math.sin(-30 * radians), Math.cos(-30 * radians)]), // [-1/2, Math.sqrt(3)/2]
            k = Complex(0),
            h = Complex(0),
            z = Complex(s).mul(Math.sqrt(2))

          let rot = w.clone().pow(d3.scan([0, 1, 2].map( // rotate to have s ~= 1
            i => -(z.clone().mul(w.clone().pow(i))).re
          )))

          let m = [0.3, 0.5]
          let n = z.abs()
          if (n > m[0]) {
            // if |z| > m[1], use the approx based on y = (1-z)
            // McIlroy formula 6 p6 and table for G page 16
            let y = rot.clone().mul(z).mul(-1).add(1)

            // w1 = gamma(1/3) * gamma(1/2) / 3 / gamma(5/6);
            // https://bl.ocks.org/Fil/1aeff1cfda7188e9fbf037d8e466c95c
            let w1 = 1.4021821053254548

            let G0 = __mapper('xs').m('geom').coefsG0() // G0 coeficients

            let G = Complex(0)
            for (let i = G0.length; i--;) {
              G = Complex(G0[i]).add(G.mul(y))
            }

            k = Complex(w1).add(y.sqrt().mul(-1).mul(G)).mul(rot).mul(rot)
          } // n > m[0]

          if (n < m[1]) {
            // if |z| < m[0]
            // https://www.wolframalpha.com/input/?i=series+of+((1-z%5E3))+%5E+(-1%2F2)+at+z%3D0 (and ask for "more terms")
            // 1 + z^3/2 + (3 z^6)/8 + (5 z^9)/16 + (35 z^12)/128 + (63 z^15)/256 + (231 z^18)/1024 + O(z^21)
            // https://www.wolframalpha.com/input/?i=integral+of+1+%2B+z%5E3%2F2+%2B+(3+z%5E6)%2F8+%2B+(5+z%5E9)%2F16+%2B+(35+z%5E12)%2F128+%2B+(63+z%5E15)%2F256+%2B+(231+z%5E18)%2F1024
            // (231 z^19)/19456 + (63 z^16)/4096 + (35 z^13)/1664 + z^10/32 + (3 z^7)/56 + z^4/8 + z + constant
            let H0 = [1, 1 / 8, 3 / 56, 1 / 32, 35 / 1664, 63 / 4096, 231 / 19456 ]
            let z3 = z.clone().pow(3)
            for (let i = H0.length; i--;) {
              h = Complex(H0[i]).add(h.mul(z3))
            }
            h = h.mul(z)
          } // n < m[1]

          let t
          if (n < m[0]) { t = h } else if (n > m[1]) { t = k } else {
            let inter = (n - m[0]) / (m[1] - m[0]) // interpolate between m[0] and m[1]
            t = k.mul(inter).add(h.mul(1 - inter))
          }
          return t.toVector()
        }

        let s = d3.geoStereographicRaw(lambda, phi) // lagrange
        let t = sm_1(s)
        let ret = t
        return ret
      }

      prjRaw.invert = __mapper('xs').m('math').geoInverse(prjRaw)

      return prjRaw
    }

    /*******************************************
   *      @faces
   */
    let vertices = [
      [0, 90],
      [-180, -asin1_3 * degrees],
      [-60, -asin1_3 * degrees],
      [60, -asin1_3 * degrees]
    ]

    let faces = [
      [1, 2, 3, 1],
      [0, 2, 1, 0],
      [0, 3, 2, 0],
      [0, 1, 3, 0]
    ].map(function (face) {
      return face.map(function (i) {
        return vertices[i]
      })
    })

    /**********************
  *       @enty
  */
    let enty = function (p = {}) {
      let {prjlat, prjlagr, prjrad} = p

      if (!p.faciaRotation) p.faciaRotation = Math.PI / 6
      if (!p.geoRotation) p.geoRotation = c => (Math.abs(c[1]) == 90) ? [ 0, -c[1], -30 ] : [ -c[0], -c[1], 30 ]
      if (!p.tree) p.tree = [-1, 0, 0, 0]
      if (!p.rotate) p.rotate = [28, -4, 0]

      if (!p.faces) p.faces = faces

      if (!p.prjRaw) p.prjRaw = prj(prjlat, prjlagr, prjrad)

      return mpolyhedral(p)
    }

    return enty
  }

  exports.geotetra = geotetra
}))
