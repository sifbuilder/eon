/* ******************************************
   *    @eonZ812pCylisphere
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ812pCylisphere = global.eonZ812pCylisphere || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonCtlWen,
      eonEohalMars,
      eonMuonNatform,
      eonMuonProps,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    // .................. animas
    let z = function () {
    // .................. pics
      let ctl
      try {
        ctl = eonCtlWen().control(eonRenderSvg.svg())
      } catch (e) {
        ctl = () => [0, 0, 0]
      }

      let radians = Math.PI / 180, degrees = 180 / Math.PI,
        sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
        sinh = Math.sinh, cosh = Math.cosh, tanh = Math.tanh

      let fact = n => n - 1 > 0 ? n * fact(n - 1) : n
      let fact0 = 1,
        fact1 = 1,
        fact2 = 2,
        fact3 = 6,
        fact4 = 24,
        fact5 = 120,
        fact6 = 720,
        fact7 = 5040,
        fact8 = 40320,
        fact9 = 362880
      let infact0 = 1 / fact0,
        infact1 = 1 / fact1,
        infact2 = 1 / fact2,
        infact3 = 1 / fact3,
        infact4 = 1 / fact4,
        infact5 = 1 / fact5,
        infact6 = 1 / fact6,
        infact7 = 1 / fact7,
        infact8 = 1 / fact8,
        infact9 = 1 / fact9

      let cost = [infact0, 0, -infact2, 0, infact4, 0, -infact6, 0, infact8]
      let sint = [0, infact1, 0, -infact3, 0, infact5, 0, -infact7, 0, infact9]
      let cosht = [infact0, 0, +infact2, 0, infact4, 0, +infact6, 0, infact8]
      let sinht = [0, infact1, 0, +infact3, 0, infact5, 0, +infact7, 0, infact9]
      let exp = [infact0, infact1, infact2, infact3, infact4, infact5, infact6, infact7, infact8, infact9]

      // ............................. pics
      let eotim = {'td': 12600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tf: t => Math.pow(Math.sin(Math.PI * t / 2), 3)}

      let conformLight = {
        x: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[36, 36]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ 1, 1, 1, 1],
          fn0: (e, c, d) => c[0] * cos(e[0]) * c[2] * cos(e[3]),
        },
        y: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[36, 36]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ 1, 1, 1, 1],
          fn0: (e, c, d) => c[1] * sin(e[0]) * c[2] * cos(e[3]),

        },
        z: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[36, 36]]], 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
          c: [ 1, 1, 1, 1],
          'fn0': (e, c, d) => d.c[3] * c[3] * sin(e[0]) * sin(e[3]),
        },

        w: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'dom3': [ -720, 720 ],
          'fn0': (e, c) => c[3] * cos(e[2]),
        },

      }

      // ............................. lightAni
      let lightAni = {

        eohal: eonEohalMars,
        eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
        eotim,
        eoric: {gid: 'q', cid: 'q', fid: 'q1'},
        eomot: {
          proform: {
            projection: 'uniwen',
            scale: [ 1, 1 ],
            prerotate: [[[ ctl.rotation ]]],
            translate: [ [0, 0, 0] ],
            rotate: [
              [[[0, 0, 0, 75, 90, 100, 180, 225, 270, 268, 360, 360]]], //, 225, 0  , 0, 0]]],    //  ]]], //
              [[[0, 0, 90, 136, 136, 136, 180, 180, 180, 180, 180, 180]]], //, 180, 90 , 0, 0]]],    //  ]]], //
              [[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]], //,   0, 0  , 0, 0]]],    //  ]]], //
            ],
            // rotate: [ 0,0,0 ],

            lens: [0, 1, Infinity ],
          },
        },
        eocrom: { 'csx': 1, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
          'cs': [[[333, 333, 333]]], 'cw': [[[0.99, 0.9, 0.99]]], 'cp': [[[0.99, 0.99]]]},
        eoform: conformLight,
        eoload: {
        },
      }

      // ............................. animas
      let animas = [

        lightAni, // h.mars

      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ812pCylisphere = anitem
}))
