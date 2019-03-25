/* ******************************************
   *    @ani815d2dbernoulli
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.ani815d2dbernoulli = global.ani815d2dbernoulli || {})))
}(this, function (exports) {
  'use strict'

  // ... ** **
  // .................. anitem
  async function anitem (__eo) {
  // .................. eons
    let [
      ctlWen,
      eohalMars,
      muonNatform,
      renderSvg,
    ] = await Promise.all([
      __eo('xs').c('wen'),
      __eo('xs').e('mars'),
      __eo('xs').m('natform'),
      __eo('xs').r('svg'),
    ])
    try { renderSvg.scenecolor('black') } catch (e) {}
    let ctl
    try { ctl = ctlWen().control(renderSvg.svg()) } catch (e) { ctl = () => [0, 0, 0] }

    // .................. animas
    let ani = function () {
    // .................. pics
      let radians = Math.PI / 180, degrees = 180 / Math.PI,
        sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
        sinh = Math.sinh, cosh = Math.cosh, tanh = Math.tanh

      // let fact = n => (n === 0) ? 1 : n * fact( n - 1 )
      // https://stackoverflow.com/questions/3959211/what-is-the-fastest-factorial-function-in-javascript
      function fact (op) {
      // Lanczos Approximation of the Gamma Function
      // As described in Numerical Recipes in C (2nd ed. Cambridge University Press, 1992)
        let z = op + 1
        let p = [1.000000000190015, 76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 1.208650973866179E-3, -5.395239384953E-6]

        let d, d1, d2, d3, d4

        d1 = Math.sqrt(2 * Math.PI) / z
        d2 = p[0]

        for (let i = 1; i <= 6; ++i) { d2 += p[i] / (z + i) }

        try {
          d3 = Math.pow((z + 5.5), (z + 0.5))
          d4 = Math.exp(-(z + 5.5))
        } catch (e) {
          if (1 && 1) console.log('e', e)
        }

        d = d1 * d2 * d3 * d4

        return d
      }

      // ............................. pics

      let summands = 23
      let level = 0 // [[[0.3, 6, 0.1]]]
      let range = 17

      let eotim = {'td': 9600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

      let conformAni = {
        x: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
          'dom3': [0, 360],
          c: [ 1, range, 1, 1], // . , range, ., .
          'fn0': (e, c, d) => {
            let x = d.c[1] * e[0] / (2 * Math.PI) // range * [2 * Math.PI] / (2 * Math.PI)
            return  x // cos(e[0]) // * cos(e[2]) // x * sin(e[3])
          },
        },
        y: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
          'dom3': [0, 360],
          c: [ level, range, summands, 1], // order, range, summs, .
          fn0: (e, c, d) => {
            let summs = d.c[2]
            let w = Array.from(new Array(summs), (d, i) => 1)
            let v = d.c[0]
            let x = d.c[1] * e[0] / (2 * Math.PI) // e[0]: [0, 2 * Math.PI] * 14
            let res = 0
            let y = w.reduce((p, q, k) => {
              let f, f1, f2, f3, f4
              try {
                f1 = Math.pow(-1, k)
                f2 = Math.pow(x / 2, v + 2 * k)
                f3 = 1 / fact(k)
                f4 = 1 / fact(v + k)
              } catch (e) {
                if (1 && 1) console.log('e', e)
              }

              f = f1 * f2 * f3 * f4

              p = p + f
              return p
            }, 0)

            return y // * sin(e[0]) // * cos(e[2]) // y 
          },

        },
        z: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 24, 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
          c: [ 1, 1, 1, 1 ],
          fn0: (e, c, d) => sin(e[3]) // cos(e[2]),
        },

        // w: {
        //   'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        //   'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 24, 'pa6': 0, 'pb7': -1,          
        //   'dom3': [ -180, 180 ],
        //   fn0: (e, c, d) => cos(e[2]),
        // },
      }

      // ............................. natAniRed
      let natAniRed = {
        eohal: eohalMars,
        eotim,
        eoric: {gid: 'q', cid: 'q', fid: 'qred'},
        eofold: ani => {
          let natipros = {
            eoform: ani.eoload.eoform,
            ghv: 0, // horizontal geodesics
            gsa: 0, // asymetric distribution of geodesics around the origin
            gco: 0, // open line
          }

          let res = muonNatform.natMultiLineString(natipros) // Feature.LineString

          return res
        },
        eomot: {
          ereform: {
            projection: 'uniwen',
            scale: [ 10, 100, 100],
            translate: [ 0, 0, 0 ],
            rotate: [0, 0, 0],
            lens: [0, 1, Infinity ],
          },
          proform: {
            projection: 'uniwen',
            scale: [ 1, 1, 1],
            translate: [ 0, 0, 0 ],
            rotate: [[[ctl.rotation]]],
            lens: [0, 1, Infinity ],
          },

        },
        eoload: {
          eocrom: { 'csx': 1, 'cf': 333, 'co': 0.069, 'cs': 333, 'cw': 1.3, 'cp': 0.99 },
          eoform: conformAni,
        },
      }

      // ............................. scene
      let scene = [

        natAniRed,

      ]

      return scene
    }

    let enty = () => {}
    enty.ani = ani
    return enty
  }
  exports.ani815d2dbernoulli = anitem
}))
