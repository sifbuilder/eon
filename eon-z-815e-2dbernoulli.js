/* ******************************************
   *    @ani815e2dbernoulli
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.ani815e2dbernoulli = global.ani815e2dbernoulli || {})))
}(this, function (exports) {
  'use strict'

  // ... ** **
  // .................. anitem
  async function anitem (__eo) {
  // .................. eons
    let [
      ctlWen,
      eohalMars,
      eohalSol,
      muonNatform,
      muonGamma,
      muonGraticule,
      renderPortview,
      renderSvg,
      // renderWebgl,
    ] = await Promise.all([
      __eo('xs').c('wen'),
      __eo('xs').e('mars'),
      __eo('xs').e('sol'),
      __eo('xs').m('natform'),
      __eo('xs').m('gamma'),
      __eo('xs').m('graticule'),
      __eo('xs').r('portview'),
      __eo('xs').r('svg'),
      // __eo('xs').r('webgl'),
    ])
    try { renderSvg.scenecolor('black') } catch (e) {}
    let ctl
    try { ctl = ctlWen().control(renderSvg.svg()) } catch (e) { ctl = () => [0, 0, 0] }

    // ............................. pics

    let bernx = (e, c, d) => {
      let x = c[1] * e[0] / (2 * Math.PI) // range * [2 * Math.PI] / (2 * Math.PI)
      return x
    }

    // http://mathworld.wolfram.com/BesselFunctionZeros.html
    // k	J_0(x)	J_1(x)	J_2(x)	J_3(x)	J_4(x)	J_5(x)
    let jnm = [
      [	2.4048, 3.8317, 5.1356, 6.3802, 7.5883, 8.7715 ],
      [	5.5201, 7.0156, 8.4172, 9.7610, 11.0647, 12.3386 ],
      [	8.6537, 10.1735, 11.6198, 13.0152, 14.3725, 15.7002 ],
      [	11.7915, 13.3237, 14.7960, 16.2235, 17.6160, 18.9801 ],
      [	14.9309, 16.4706, 17.9598, 19.4094, 20.8269, 22.217 ],
    ]
    // .................. animas
    let z = function () {
    // .................. pics
      let sin = Math.sin, cos = Math.cos, pi = Math.PI

      let summands = 23
      let level = [[[12, 0.0, 12]]]
      let range = 17
      let conformAni = {
        x: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 64, 'pa6': 0, 'pb7': -1,
          'dom3': [0, 45], //  [-90, 90], // [-90, 90]
          c: [ 1, range, 1, 1], // . , range, ., .
          fn0: (e, c, d) => {
            // return cos(e[0]) * cos(e[2])
            return cos(e[0])
          }, //  bernx(e, d.c, d) * sin(e[0]) * cos(e[3]),
        },
        y: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 64, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ level, range, summands, 1], // order, range, summs, .
          fn0: (e, c, d) => {
            // return sin(e[1]) * cos(e[2])
            return sin(e[1])
          }, // muonGamma.bessel(e, d.c, d) * cos(e[0]),
        },
        z: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 64, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ level, range, summands, [[[0, 1]]] ], // order, range, summs, .
          fn0: (e, c, d) => {
            // return  muonGamma.bessel(e, d.c, d)
            return (cos(d.c[2] * pi) + sin(d.c[2] * pi)) * muonGamma.bessel(e, d.c, d) * (cos(e[2]) + sin(e[2]))
          }, // bernx(e, d.c, d) * sin(e[0]) * sin(e[3]),
        },
        w: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 64, 'pa6': 0, 'pb7': -1,
          'dom3': [0, 180], // [-180, 180],
          c: [ level, range, summands, 1], // order, range, summs, .
          fn0: (e, c, d) => {
            return e[3] // cos(e[2]),
          },
        },
      }

      let eotim = {'td': 9600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}
      // ............................. natAniRed
      let natAniRed = {
        eohal: eohalMars,
        eotim: eotim,
        eoric: {gid: 'q', cid: 'q', fid: 'qred'},
        eofold: ani => {
          let natipros = {
            eoform: ani.eoload.eoform,
            ghv: 0, // horizontal geodesics
            gsa: 0, // asymetric distribution of geodesics around the origin
            gco: 0, // open line
          }

          let res = muonNatform.natMultiLineString(natipros) // Feature.LineString
          // let res = muonNatform.natMultiPolygon(natipros) // Feature.LineString

          return res
        },
        eomot: {
          ereform: {
            projection: 'uniwen',
            scale: [ 1, 1, 1],
            translate: [ 0, 0, 0 ],
            rotate: [-12, 0, -6],
            lens: [0, 1, Infinity ],
          },
          proform: {
            projection: 'uniwen',
            scale: [ 100, 100, 100],
            translate: [ 0, 0, 0 ],
            rotate: [[[ctl.rotation]]],
            lens: [0, 1, Infinity ],
          },

        },
        eoload: {
          eocrom: { 'csx': 0, 'cf': 333, 'co': 0.269, 'cs': 777, 'cw': 1.3, 'cp': 0.99 },
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
    enty.z = z

    return enty
  }
  exports.ani815e2dbernoulli = anitem
}))
