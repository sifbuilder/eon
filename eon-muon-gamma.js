/* ******************************************
   *    @muonGamma
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonGamma = global.muonGamma || {})))
}(this, function (exports) {
  'use strict'

  // ... ** **
  // .................. anitem
  async function anitem (__eo) {

    // ............................. pics
    const fact = op => gamma(op + 1)

    // let fact = n => (n === 0) ? 1 : n * fact( n - 1 )
    // https://stackoverflow.com/questions/3959211/what-is-the-fastest-factorial-function-in-javascript
    function gamma (op) {
      // Lanczos Approximation of the Gamma Function
      // As described in Numerical Recipes in C (2nd ed. Cambridge University Press, 1992)
      let z = op
      let p = [1.000000000190015, 76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 1.208650973866179E-3, -5.395239384953E-6]

      let d, d1, d2, d3, d4

      d1 = Math.sqrt(2 * Math.PI) / z
      d2 = p[0]

      for (let i = 1; i <= 6; ++i) { d2 += p[i] / (z + i) }

      try {
        d3 = Math.pow((z + 5.5), (z + 0.5))
        d4 = Math.exp(-(z + 5.5))
      } catch (e) {
        console.log('e', e)
      }

      d = d1 * d2 * d3 * d4
      return d
    }

    let bessel = (data) => {
      let {x, summs, level} = data

      let w = Array.from(new Array(summs), (d, i) => 1)
      let v = level

      let y = w.reduce((p, q, k) => {
        let f, f1, f2, f3, f4
        try {
          f1 = Math.pow(-1, k)
          f2 = Math.pow(x / 2, v + 2 * k)
          f3 = 1 / fact(k)
          f4 = 1 / fact(v + k)
        } catch (err) {
          console.log('err', err)
        }
        f = f1 * f2 * f3 * f4
        p = p + f
        return p
      }, 0)

      return y
    }

    let enty = () => {}
    enty.gamma = gamma
    enty.fact = fact
    enty.bessel = bessel
    return enty
  }
  exports.muonGamma = anitem
}))
