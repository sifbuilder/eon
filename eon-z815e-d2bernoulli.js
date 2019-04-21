/* ******************************************
 *    @eonZ815eD2bernoulli
 *
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonZ815eD2bernoulli = global.eonZ815eD2bernoulli || {}))
})(this, function (exports) {
  'use strict'

  // ... ** **
  // .................. anitem
  async function anitem (__eo) {
    // .................. eons
    let [
      eonCtlWen,
      eonEohalMars,
      eonEohalSol,
      eonMuonNatform,
      eonMuonGamma,
      eonMuonGraticule,
      eonRenderPortview,
      eonRenderSvg,
      // eonRenderWebgl,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-sol'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-gamma'),
      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('eon-render-portview'),
      __eo('xs').b('eon-render-svg'),
      // __eo('xs').b('eon-render-webgl'),
    ])
    try {
      eonRenderSvg.scenecolor('black')
    } catch (e) {}
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }
    // ............................. pics
    let bernx = (e, c, d) => {
      let x = (c[1] * e[0]) / (2 * Math.PI) // range * [2 * Math.PI] / (2 * Math.PI)
      return x
    }
    let f = (num, h = 2) => parseFloat(parseFloat(num).toFixed(h))
    let fs = (arr, h = 2) => arr.map(d => f(d, h))

    // http://mathworld.wolfram.com/BesselFunctionZeros.html
    // k	J_0(x)	J_1(x)	J_2(x)	J_3(x)	J_4(x)	J_5(x)
    let jnm = [
      [2.4048, 3.8317, 5.1356, 6.3802, 7.5883, 8.7715],
      [5.5201, 7.0156, 8.4172, 9.761, 11.0647, 12.3386],
      [8.6537, 10.1735, 11.6198, 13.0152, 14.3725, 15.7002],
      [11.7915, 13.3237, 14.796, 16.2235, 17.616, 18.9801],
      [14.9309, 16.4706, 17.9598, 19.4094, 20.8269, 22.217],
    ]
    // .................. animas
    let z = function () {
      // .................. pics
      let sin = Math.sin, cos = Math.cos, pi = Math.PI
      let summands = 23

      let conformAni = {
        x: {
          m1: 4, m2: 4, n1: 2, n2: 2, n3: 2, a: 1, b: 1, // circ
          ra2: 1, v0: 0, v1: 1, w4: 0, seg5: 48, pa6: 0, pb7: -1,
          dom3: [0, 360], // [0, 45], //

          fn0: (e, c, d) => cos(e[0]) * cos(e[2]/4),  // [0, 360] => [0, 90]
        },
        y: {
          m1: 4, m2: 4, n1: 2, n2: 2, n3: 2, a: 1, b: 1, // circ
          ra2: 1, v0: 0, v1: 1, w4: 0, seg5: 48, pa6: 0, pb7: -1,
          dom3: [0, 360],

          fn0: (e, c, d) => sin(e[1]) * cos(e[2]/4),
        },
        z: {
          m1: 4, m2: 4, n1: 2, n2: 2, n3: 2, a: 1, b: 1, // circ
          ra2: 1, v0: 0, v1: 1, w4: 0, seg5: 24, pa6: 0, pb7: -1,
          dom3: [0, 360],
          c: [0, 17, summands, [[[-1, 1]]]], // order, range, summs, .
          fn0: (e, c, d) => {
            // seg5: 4 => e:
            // [0, 0, 0, 0]
            // [1.57, 1.57, 0,    0]
            // [3.14, 3.14, 0,    0]
            // [4.71, 4.71, 0,    0]
            // [6.28, 6.28, 0,    0]
            // [0,    0,    1.57, 1.57]
            // [1.57, 1.57, 1.57, 1.57]
            // [3.14, 3.14, 1.57, 1.57]
            // [4.71, 4.71, 1.57, 1.57]
            // [6.28, 6.28, 1.57, 1.57]
            let [m, range, summs, t] = d.c

            let a = 2 * Math.PI
            let r = e[2]

            let z = e[0]

            let amn = order => pos => jnm[order][pos] // BesselX(m,pos)

            let pos = 0 // zero position
            let hmn = amn(m)(pos) / a // order position / radius

            // let R = c1 * Jm(λr)
            // let Z = Am * cos(mθ) + Bm * sin(mθ)
            // let T = a * cos(cλt) + b * sin(cλt)

            // let R = r => B(summs)(m)(e[2] / a)
            // let Z = z => 1
            // let T = t => (cos(a00 * r * t) + sin(a00 * r * t))

            let B = summs => m => x => eonMuonGamma.bessel({x, summs, level: m}) || 0

            let R = _ => B(summs)(m)(hmn * _)
            let Z = _ => cos(m * _)
            let T = _ => cos(hmn * _) + sin(hmn * _)

            let res = R(r) * Z(z) * T(t)

            return res
          },
        },
        w: {
          m1: 4, m2: 4, n1: 2, n2: 2, n3: 2, a: 1, b: 1, // circ
          ra2: 1, v0: 0, v1: 1, w4: 0, seg5: 24, pa6: 0, pb7: -1,
          dom3: [0, 90],

          fn0: (e, c, d) => {
            return e[3] // cos(e[2]),
          },
        },
      }
      let eotim = { td: 10000, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 }

      // ............................. natAniRed
      let natAniRed = {
        eohal: eonEohalMars,
        eotim: eotim,
        eoric: { gid: 'q', cid: 'q', fid: 'qred' },

        eofold: ani => {
          let natipros = {
            eoform: ani.eoload.eoform,
            ghv: 0, // horizontal geodesics
            gsa: 0, // asymetric distribution of geodesics around the origin
            gco: 0, // open line
          }
          return eonMuonNatform.natMultiLineString(natipros) // Feature.LineString
        },
        eomot: {
          ereform: {
            projection: 'uniwen', scale: [1, 1, 1], translate: [0, 0, 0], rotate: [90, 0, 0],
          },
          proform: {
            projection: 'uniwen', scale: [100, 100, 100], translate: [0, 0, 0], rotate: [[[ctl.rotation]]],
          },
        },
        eoload: {
          eocrom: { csx: 0, cf: 333, co: 0.269, cs: 777, cw: 1.3, cp: 0.99 },
          eoform: conformAni,
        },
      }

      // ............................. scene
      let scene = {natAniRed}
      return scene
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ815eD2bernoulli = anitem
})
