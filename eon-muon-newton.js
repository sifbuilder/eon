/*******************************************
 * 			@eonMuonNewton
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonMuonNewton = global.eonMuonNewton || {})))
}(this, function (exports) {
  'use strict'

  // eonMuonNewton muon
  async function eonitem (__eo = {}) {
    var abs = Math.abs, epsilon = 1e-6, halfPi = Math.PI / 2, sqrt = Math.sqrt
    var asin = Math.asin, atan2 = Math.atan2, cos = Math.cos, sin = Math.sin

    function spherical (cartesian) {
      return [atan2(cartesian[1], cartesian[0]), asin(cartesian[2])]
    }

    function cartesian (spherical) {
      var lambda = spherical[0], phi = spherical[1], cosPhi = cos(phi)
      return [cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi)]
    }

    function cartesianScale (vector, k) {
      return [vector[0] * k, vector[1] * k, vector[2] * k]
    }

    function initial_general (project) {
      var n = 50,
        step = (halfPi - epsilon) / n,
        i,
        j,
        grid = []
      for (i = 0; i <= 4 * n; i++) {
        grid[i] = []
        for (j = 0; j <= 2 * n; j++) {
          var p = [(i - 2 * n) * step, (j - n) * step]
          grid[i][j] = project(p[0], p[1])
        }
      }

      return function (x, y) {
      // find a start point c "close enough" to x,y
        let i, j,
          c,
          m, min = +Infinity
        // d3.scan
        for (i = 0; i <= 4 * n; i++) {
          for (j = 0; j <= 2 * n; j++) {
            m = abs(x - grid[i][j][0]) + abs(y - grid[i][j][1])
            if (m < min) {
              c = [i, j]
              min = m
            }
          }
        }
        c = [ step * (c[0] - 2 * n), step * (c[1] - n) ]
        return c
      }
    }

    function geoInverse (project, precision, initial) {
      let _initial = initial_general(project)
      let ___initial = function (x, y) {
        if (y > 0.3) return ___initial(x + 0.16, y - 0.035)
        if (x > 0) return ___initial(x + 0.16, y + 0.015)
        return ___initial(x - 0.1, y)
      }
      function invert (x, y) {
        // find a start point c
        var point = [x, y],
          c = _initial(x, y)

        c[0] *= 0.999

        c = cartesian(c)
        // solve for x,y
        try {
          var solution = Newton.Solve(
            g => {
              var norm = g[0] * g[0] + g[1] * g[1] + g[2] * g[2]
              cartesianScale(g, 1 / sqrt(norm))
              var s = spherical(g),
                p = project(s[0], s[1])
              return [p[0], p[1], 1 / norm]
            },
            [point[0], point[1], 1],
            { start: c, acc: precision, dx: 1e-5, max: 100 }
          )
        } catch (e) {
    	console.log(e)
        }
        if (solution) return spherical(solution)
      }

      return invert
    }

    /*
 * Newton's method for finding roots
 *
 * code adapted from D.V. Fedorov,
 * “Introduction to Numerical Methods with examples in Javascript”
 * http://owww.phys.au.dk/~fedorov/nucltheo/Numeric/11/book.pdf
 * (licensed under the GPL)
 * by Philippe Riviere <philippe.riviere@illisible.net> March 2014
 * modified for compatibility with Chrome/Safari
 * added a max iterations parameter
 *
 * Usage: Newton.Solve(Math.exp, 2)); => ~ log(2)
 *        Newton.Solve(d3.geo.chamberlin(), [200,240])
 */
    var Newton = {version: '1.0.0'} // semver

    Newton.Norm = function (v) {
      return Math.sqrt(v.reduce(function (s, e) {
        return s + e * e
      }, 0))
    }

    Newton.Dot = function (a, b) {
      var s = 0
      for (let i in a) s += a[i] * b[i]
      return s
    }

    // QR - decomposition A=QR of matrix A
    Newton.QRDec = function (A) {
      var m = A.length, R = [], i, j, k
      for (j in A) {
        R[j] = []
        for (i in A) R[j][i] = 0
      }

      var Q = []
      for (i in A) {
        Q[i] = []
        for (j in A[0]) Q[i][j] = A[i][j]
      }

      // Q is a copy of A
      for (i = 0; i < m; i++) {
        var e = Q[i],
          r = Math.sqrt(Newton.Dot(e, e))
        if (r == 0) throw 'Newton.QRDec: singular matrix'
        R[i][i] = r
        for (k in e) e[k] /= r
        // normalization
        for (j = i + 1; j < m; j++) {
          var q = Q[j],
            s = Newton.Dot(e, q)
          for (k in q) q[k] -= s * e[k]
          // orthogonalization
          R[j][i] = s
        }
      }
      return [Q, R]
    }

    // QR - backsubstitution
    // input: matrices Q,R, array b; output: array x such that QRx=b
    Newton.QRBack = function (Q, R, b) {
      var m = Q.length,
        c = new Array(m),
        x = new Array(m),
        i, k, s
      for (i in Q) {
        // c = QˆT b
        c[i] = 0
        for (k in b) c[i] += Q[i][k] * b[k]
      }
      for (i = m - 1; i >= 0; i--) {
        // back substitution
        for (s = 0, k = i + 1; k < m; k++) s += R[k][i] * x[k]
        x[i] = (c[i] - s) / R[i][i]
      }
      return x
    }

    // calculates inverse of matrix A
    Newton.Inverse = function (A) {
      var t = Newton.QRDec(A),
        Q = t[0],
        R = t[1]
      var m = [], i, k, n
      for (i in A) {
        n = []
        for (k in A) {
          n[k] = (k == i ? 1 : 0)
        }
        m[i] = Newton.QRBack(Q, R, n)
      }
      return m
    }

    Newton.Zero = function (fs, x, opts = {} /* acc, dx, max */) {
    // Newton's root-finding method
      let i, j, k

      if (opts.acc == undefined) opts.acc = 1e-6
      if (opts.dx == undefined) opts.dx = 1e-3
      if (opts.max == undefined) opts.max = 40 // max iterations
      var J = []
      for (i in x) {
        J[i] = []
        for (j in x) J[i][j] = 0
      }

      var minusfx = []
      var v = fs(x)
      if (v == null) throw 'unable to compute fs at ' + JSON.stringify(x)
      for (i in x) minusfx[i] = -v[i]
      do {
        if (opts.max-- < 0) return x /* bad approximation better that nothing ?? */
        for (i in x) {
          for (k in x) {
          // calculate Jacobian
            x[k] += opts.dx
            v = fs(x)
            if (v == null) throw 'unable to compute fs at ' + JSON.stringify(x)
            J[k][i] = (v[i] + minusfx[i]) / opts.dx
            x[k] -= opts.dx
          }
        }
        var t = Newton.QRDec(J),
          Q = t[0],
          R = t[1],
          Dx = Newton.QRBack(Q, R, minusfx),
          no = Newton.Norm(Dx)
        // Newton's step
        var s = 2
        do {
          // simple backtracking line search
          s = s / 2
          var z = []
          for (i in x) {
            z[i] = x[i] + s * Dx[i]// * Math.min(no, 1e-2);
          }
          var minusfz = []
          v = fs(z)
          if (v == null) throw 'unable to compute fs at ' + JSON.stringify(z)
          for (i in x) {
            minusfz[i] = -v[i]
          }
        }
        while (Newton.Norm(minusfz) > (1 - s / 2) * Newton.Norm(minusfx) && s > 1.0 / 128)
        minusfx = minusfz
        x = z
        // step done
      }
      while (Newton.Norm(minusfx) > opts.acc)

      return x
    }

    Newton.Solve = function (fs, res, opts = {}) {
      if (typeof res !== 'object') {
        res = [ typeof res === 'number'
          ? +res
          : 0,
        ]
      }
      var _fs = fs
      fs = function (x) {
        var r = _fs(x)
        if (typeof r === 'number') r = [ r ]
        for (let i in r) r[i] -= res[i]
        return r
      }

      var start = []
      if (opts.start) {
        start = opts.start
      } else {
        for (let i in res) start[i] = 0
      }

      var n = Newton.Zero(fs, start, opts)
      if (n && n.length == 1) n = n[0]
      return n
    }

    /*******************************************
	 * 			@enty
	 */
    var enty = function enty () {}
    enty.geoInverse = geoInverse
    return enty
  }

  exports.eonMuonNewton = eonitem
}))
