/* ******************************************
   *    @eonZ815bWave
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ815bWave = global.eonZ815bWave || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    ctlWen,
    eohalMars,
    muonNatform,
    muonProps,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').m('natform'),
    __eo('xs').m('props'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
  // .................. pics
  let ctl
  try {
    ctl = ctlWen().control(renderSvg.svg())
  } catch (e) {
    ctl = () => [0, 0, 0]
  }
  // .................. animas
  let z = function () {
    let radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt
    let cosh = Math.cosh,
      sinh = Math.sinh
    let epsilon = 1e-5

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

    let cost = [infact0, 0, -infact2, 0, infact4, 0, -infact6, 0, infact8], // cost
      sint = [0, infact1, 0, -infact3, 0, infact5, 0, -infact7, 0, infact9], // sint
      cosht = [infact0, 0, +infact2, 0, infact4, 0, +infact6, 0, infact8], // cosht
      sinht = [0, infact1, 0, +infact3, 0, infact5, 0, +infact7, 0, infact9], // sinht
      expt = [infact0, infact1, infact2, infact3, infact4, infact5, infact6, infact7, infact8, infact9] // expt

    // ............................. pics
    let eotim = {'td': 9600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tf: t => 1 - 4 * (t - 0.5) * (t - 0.5)}

    let conformRed = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [ [[[0, 90]]], [[[1 * 360, 1 * 360 + 90]]] ],

        'fn0': (e, c) => e[0],
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [0, 360],

        'fn0': (e, c) => sin(e[0]),

      },

    }
    let conformGold = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],

        'fn0': (e, c) => c[0] * cos(e[0]), // circ
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],

        'fn0': (e, c) => c[0] * sin(e[0]), // circ

      },

    }
    let conformBlue = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 9, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [],
        e: [ cost, 1, 1, cost ],
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 9, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [],
        e: [ sint, 1, 1, cost ],

      },

    }
    let eocromRed = { 'csx': 1, 'cf': [[[ 333, 333, 333]]], 'co': [[[0.69, 0.69, 0.69]]],
      'cs': [[[333, 333, 333]]], 'cw': [[[1.3, 1.3, 1.3]]], 'cp': [[[0.99, 0.99]]]}

    let eocromBlue = { 'csx': 1, 'cf': [[[ 666, 666, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
      'cs': [[[666, 666, 666]]], 'cw': [[[1.3, 1.3, 1.3]]], 'cp': [[[0.99, 0.99]]]}

    let eocromGold = { 'csx': 1, 'cf': [[[ 999, 999, 999]]], 'co': [[[0.069, 0.06, 0.069]]],
      'cs': [[[999, 999, 999]]], 'cw': [[[1.3, 1.3, 1.3]]], 'cp': [[[0.99, 0.99]]]}

    // ............................. natAniRed
    let natAniRed = {
      eohal: eohalMars,
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'qred'},
      eofold: ani => {
        let natipros = {
          eoform: ani.eoform,
          ghv: 1, // horizontal geodesics
          gsa: 0, // asymetric distribution of geodesics around the origin
          gco: 0, // open line
        }

        let res = muonNatform.natMultiLineString(natipros) // Feature.LineString

        return res
      },
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 1, 1, 1 ],
          prerotate: [[[ ctl.rotation ]]],
          translate: [ -250, 0, 0 ],
          rotate: [0, 0, 0],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: eocromRed,
      eoform: conformRed,
      eoload: {},
    }
    // ............................. natAniGold
    let natAniGold = {
      eohal: eohalMars,
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'qgold'},
      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ [[[1, 1]]], [[[1, 1]]] ],
          prerotate: [[[ ctl.rotation ]]],
          translate: [ [-105, -20, 0] ],
          rotate: [
            16,
            [[[0, 75, 75, 75]]],
            [[[0, 0, 0, 0]]],
          ],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: eocromBlue,
      eoform: conformGold,
      eoload: {},
    }
    // ............................. natAniBlue
    let natAniBlue = {
      eohal: eohalMars,
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'qblue'},

      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 1, 1 ],
          prerotate: [[[ ctl.rotation ]]],
          translate: [ [0, 0, 0] ],
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: eocromBlue,
      eoform: conformBlue,
      eoload: {},
    }

    // ............................. animas
    let animas = [

      natAniRed, // h.natform
      natAniGold, // h.natform
      natAniBlue, // h.natform

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ815bWave = anitem
}))