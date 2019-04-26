/* ******************************************
   *    @eonZ813qRadiFrame
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ813qRadiFrame = global.eonZ813qRadiFrame || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
    // .................. eons
    let [
      eonCtlWen,
      eonEohalMars,
      eonEohalSol,
      eonMuonGamma,
      eonMuonGraticule,
      eonMuonNatform,
      eonProtonNatform,
      eonRenderPortview,
      eonRenderSvg,
      // eonRenderWebgl,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-sol'),
      __eo('xs').b('eon-muon-gamma'),
      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-proton-natform'),
      __eo('xs').b('eon-render-portview'),
      __eo('xs').b('eon-render-svg'),
      // __eo('xs').b('eon-render-webgl'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    // .................. animas
    let z = function () {
      // .................. pics
      let eotim = {'td': 20000, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tf: t => t}

      let radians = Math.PI / 180, degrees = 180 / Math.PI,
        sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
        pow = Math.pow

        // let fact = n => n - 1 > 0 ? n * fact(n - 1) : n
      let fact = x => eonMuonGamma.fact(x)
      let infact = x => 1 / fact(x)

      let cost = [infact(0), 0, -infact(2), 0, infact(4), 0, -infact(6), 0, infact(8)]
      let sint = [0, infact(1), 0, -infact(3), 0, infact(5), 0, -infact(7), 0, infact(9)]
      let exp = [infact(0), infact(1), infact(2), infact(3), infact(4), infact(5), infact(6), infact(7), infact(8), infact(9)]

      let radion = (_c, _e, _t, c, e) => {
        //  c: [1, 1, 1, 1]
        //  e: [-1.5707963267948966, -1.5707963267948966, 0, 0]
        //  dax.e: [Array(9), 1, 1, Array(9)]



        // turn each dimension into array
        let cf = eonMuonNatform.daxify(_c) // _c
        let ef = eonMuonNatform.daxify(_e) // _e


        // value described as series of powers
        // eg. cost: [infact(0), 0, -infact(2), 0, infact(4)]
        // in  [ cost, 1, 1, cost ]
        let ft = p => v => {
          let res = 0
          let n = 1 // p.length
          let t = _t

          let pondered = n * t
          for (let i = 0; i < n; i++) {
            if (i < pondered) {
              res = res + infact(pondered) * (pow(Math.abs(v), pondered) || 0)
            }
          }
          return res
        }
        let res = ft(cf[0])(c[0]) * ft(ef[0])(e[0]) *
                    ft(cf[1])(c[1]) * ft(ef[1])(e[1]) *
                    ft(cf[2])(c[2]) * ft(ef[2])(e[2]) *
                    ft(cf[3])(c[3]) * ft(ef[3])(e[3])

        return res
      }

      let conform2 = {
        x: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 24, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          t: [[[0, Math.PI]]],
          c: [ 1, 1, 1, 1],
          e: [ cost, 1, 1, cost ],

          fn0: (e, c, dax) => {
            let _e = dax.e
            let _c = dax.c
            let _t = dax.t

            let res
            res = radion(_c, _e, _t, c, e)
            return res
          },

        },
        y: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 24, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          t: [[[0, Math.PI]]],
          c: [ 1, 1, 1, 1],
          e: [ 1, sint, 1, cost ],
          fn0: (e, c, dax) => {
            let _e = dax.e
            let _c = dax.c
            let _t = dax.t

            let res
            res = radion(_c, _e, _t, c, e)
            return res
          },

        },
        z: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 24, 'pa6': 0, 'pb7': -1,
          'dom3': [-90, 90],
          c: [],
          e: [ 1, 1, 1, sint ],
          fn0: (e, c, dax) => {
            let res = e[2] // sin(e[2])
            return res
          },
        },
        w: {
          m1: 4, m2: 4, n1: 2, n2: 2, n3: 2, a: 1, b: 1, // circ
          ra2: 1, v0: 0, v1: 1, w4: 0, seg5: 24, pa6: 0, pb7: -1,
          dom3: [-90, 90],
          fn0: (e, c, d) => {
            return cos(e[2])
          },
        },
      }

      let eocrom = { 'csx': 0, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
        'cs': [[[666, 333, 666]]], 'cw': [[[0.7, 0.7, 0.7]]], 'cp': [[[0.9, 0.9]]]}

      // ............................. natAni2
      let natAni2 = {

        eohal: eonEohalMars,
        eoric: {gid: 'q', cid: 'q', fid: 'q2'},
        eotim: eotim,

        eofold: ani => {
          let natipros = {
            eoform: ani.eoload.eoform,
            ghv: 0, // horizontal geodesics
            gsa: 0, // asymetric distribution of geodesics around the origin
            gco: 0, // open line
          }
          return eonMuonNatform.natMultiLineString(natipros) // Feature.LineString
          // return eonMuonNatform.natMultiPolygon(natipros) // Feature.LineString
        },

        eomot: {
          ereform: {
            projection: 'uniwen', scale: [1, 0.1, 0.5], translate: [0, -175, 0], rotate: [0, 90, 0],
          },
          proform: {
            projection: 'uniwen', scale: [1, 1, 1], translate: [0, 0, 0], rotate: [[[ctl.rotation]]],
          },
        },

        eoload: {
          eocrom: eocrom,
          eoform: conform2,
        },

      }

      // ............................. animas
      let animas = [

        natAni2, // h.natform

      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ813qRadiFrame = anitem
}))
