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

    // ............................. pics

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
        console.log('e', e)
      }

      d = d1 * d2 * d3 * d4

      return d
    }

    let bernx = (e, c, d) => {
      let x = c[1] * e[0] / (2 * Math.PI) // range * [2 * Math.PI] / (2 * Math.PI)
      return x
    }
    let berny = (e, c, d) => { // summands

      let summs = c[2]
      let w = Array.from(new Array(summs), (d, i) => 1)
      let v = c[0] // level
      let x = c[1] * e[0] / (2 * Math.PI) // range e[0]
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

    // .................. animas
    let ani = function () {
    // .................. pics
      let radians = Math.PI / 180, degrees = 180 / Math.PI,
        sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
        sinh = Math.sinh, cosh = Math.cosh, tanh = Math.tanh


      let summands = 23
      let level = [[[0.3, 12]]]
      let range = 17
      let conformAni = {
        x: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 1 * 60, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 32, 'pa6': 0, 'pb7': -1,
          'dom3': [0,90], //  [-90, 90], // [-90, 90]
          c: [ 1, range, 1, 1], // . , range, ., .
          fn0: (e, c, d) => bernx(e, d.c, d) * sin(e[0]) * cos(e[3]),
        },
        y: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 1 * 200, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 32, 'pa6': 0, 'pb7': -1,
          'dom3':  [-180, 180],
          c: [ level, range, summands, 1], // order, range, summs, .
          fn0: (e, c, d) => berny(e, d.c, d) * cos(e[0]),
        },
        z: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 1 * 60, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 32, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ level, range, summands, 1], // order, range, summs, .
          fn0: (e, c, d) => bernx(e, d.c, d) * sin(e[0]) * sin(e[3]),
        },
        w: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 32, 'pa6': 0, 'pb7': -1,
          'dom3': [0,180], //[-180, 180],
          c: [ level, range, summands, 1], // order, range, summs, .
          fn0: (e, c, d) => cos(e[2]),
        },
      }

      // ............................. natAniRed
      let natAniRed = {
        eohal: eohalMars,
        eotim: {'td': 9600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1},
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
            scale: [ 1, 1, 1],
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
    enty.fact = fact
    enty.berny = berny
    return enty
  }
  exports.ani815d2dbernoulli = anitem
}))
