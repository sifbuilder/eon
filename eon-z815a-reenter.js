/* ******************************************
   *    @eonZ815aReenter
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ815aReenter = global.eonZ815aReenter || {})))
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
  let ctl
  try {
    ctl = eonCtlWen().control(eonRenderSvg.svg())
  } catch (e) {
    ctl = () => [0, 0, 0]
  }

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
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt
    let cosh = Math.cosh,
      sinh = Math.sinh

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

    // pillow to clepsidre
    // x: [cost, 1, [1,0,0], cosht] => [cost, 1, [0,0,1], cosh]
    // z: [1, 1, sinht, 1] => [1, 1, sinh, 1]
    let conformRed = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [1, 1, 1, 1, 1, 1, 1, 1 ],
        e: [
          [infact0, 0, -infact2, 0, infact4, 0, -infact6, 0, infact8], // cost
          1,
          1,
          [infact0, 0, -infact2, 0, infact4, 0, -infact6, 0, infact8], // cost
        ],
        // 'fn0': (e,c) => c[0] * cos(e[0]) * c[3] * cos(e[3]) // circ
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [1, 1, 1, 1, 1, 1, 1, 1 ],
        e: [
          [0, infact1, 0, -infact3, 0, infact5, 0, -infact7, 0, infact9], // sint
          1,
          1,
          [infact0, 0, -infact2, 0, infact4, 0, -infact6, 0, infact8], // cost
        ],
        // 'fn0': (e,c) => c[0] * sin(e[0]) * c[3] * cos(e[3]) // circ

      },

      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [ [[[-90, -90]]], [[[90, 90]]] ],
        c: [],
        e: [ 1, 1,

          [ //            1         cost          cost        -1
            [[[ 1, 1 * infact0, 1 * infact0, -1 ]]], //
            [[[ 0, 0 * infact1, 0 * infact1, 0 ]]], //
            [[[ 0, -1 * infact2, -1 * infact2, 0 ]]], //
            [[[ 0, 0 * infact3, 0 * infact3, 0 ]]], //
            [[[ 0, 1 * infact4, 1 * infact4, 0 ]]], //
            [[[ 0, 0 * infact5, 0 * infact5, 0 ]]], //
            [[[ 0, -1 * infact6, -1 * infact6, 0 ]]], //
            [[[ 0, 0 * infact7, 0 * infact7, 0 ]]], //
            [[[ 0, 1 * infact8, 1 * infact8, 0 ]]], //
            [[[ 0, 0 * infact9, 0 * infact9, 0 ]]], //
          ], // 1 : cos : sin

          [ //       sint              expt      sint           sint                     expt              cost               cosht              sint              sinht
            [[[ 0 * infact0, 1 * infact0, 0 * infact0, 0 * infact0 ]]], // 1 * infact0,   //  1 * infact0,   //  1 * infact0,   //  0 * infact0,  //  0 * infact0,
            [[[ 1 * infact1, 1 * infact1, 1 * infact1, 1 * infact1 ]]], // 1 * infact1,   //  0 * infact1,   //  0 * infact1,   //  1 * infact1,  //  1 * infact1,
            [[[ 0 * infact2, 1 * infact2, 0 * infact2, 0 * infact2 ]]], // 1 * infact2,   // -1 * infact2,   //  1 * infact2,   //  0 * infact2,  //  0 * infact2,
            [[[ -1 * infact3, 1 * infact3, -1 * infact3, -1 * infact3 ]]], // 1 * infact3,   //  0 * infact3,   //  0 * infact3,   // -1 * infact3,  //  1 * infact3,
            [[[ 0 * infact4, 1 * infact4, 0 * infact4, 0 * infact4 ]]], // 1 * infact4,   //  1 * infact4,   //  1 * infact4,   //  0 * infact4,  //  0 * infact4,
            [[[ 1 * infact5, 1 * infact5, 1 * infact5, 1 * infact5 ]]], // 1 * infact5,   //  0 * infact5,   //  0 * infact5,   //  1 * infact5,  //  1 * infact5,
            [[[ 0 * infact6, 1 * infact6, 0 * infact6, 0 * infact6 ]]], // 1 * infact6,   // -1 * infact6,   //  1 * infact6,   //  0 * infact6,  //  0 * infact6,
            [[[ -1 * infact7, 1 * infact7, -1 * infact7, -1 * infact7 ]]], // 1 * infact7,   //  0 * infact7,   //  0 * infact7,   // -1 * infact7,  //  1 * infact7,
            [[[ 0 * infact8, 1 * infact8, 0 * infact8, 0 * infact8 ]]], // 1 * infact8,   //  1 * infact8,   //  1 * infact8,   //  0 * infact8,  //  0 * infact8,
            [[[ 1 * infact9, 1 * infact9, 1 * infact9, 1 * infact9 ]]], // 1 * infact9,   //  0 * infact9,   //  0 * infact9,   //  1 * infact9,  //  1 * infact9,
          ], // expt
        ],
        // 'fn0': (e,c) => c[3] * sin(e[3]) // circ
      },

      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [], // [1, 1, [0,1], 1],
        e: [ 1, 1, 1, cost ], // 1 * sin(v)
        // 'fn0': (e,c) => c[3] * cos(e[3])
      },

    }
    let conformGold = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [1, 1, 1, 1, 1, 1, 1, 1 ],
        e: [
          [infact0, 0, -infact2, 0, infact4, 0, -infact6, 0, infact8], // cost
          1,
          1,
          [infact0, 0, -infact2, 0, infact4, 0, -infact6, 0, infact8], // cost
        ],
        // 'fn0': (e,c) => c[0] * cos(e[0]) * c[3] * cos(e[3]) // circ
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [1, 1, 1, 1, 1, 1, 1, 1 ],
        e: [
          [0, infact1, 0, -infact3, 0, infact5, 0, -infact7, 0, infact9], // sint
          1,
          1,
          [infact0, 0, -infact2, 0, infact4, 0, -infact6, 0, infact8], // cost
        ],
        // 'fn0': (e,c) => c[0] * sin(e[0]) * c[3] * cos(e[3]) // circ

      },

      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [ [[[-90, -90]]], [[[90, 90]]] ],
        c: [],
        e: [ 1, 1,

          [ //            1        cost           -1
            [[[ 1, 1 * infact0, -1 ]]], //
            [[[ 0, 0 * infact1, 0 ]]], //
            [[[ 0, -1 * infact2, 0 ]]], //
            [[[ 0, 0 * infact3, 0 ]]], //
            [[[ 0, 1 * infact4, 0 ]]], //
            [[[ 0, 0 * infact5, 0 ]]], //
            [[[ 0, -1 * infact6, 0 ]]], //
            [[[ 0, 0 * infact7, 0 ]]], //
            [[[ 0, 1 * infact8, 0 ]]], //
            [[[ 0, 0 * infact9, 0 ]]], //
          ], // 1 : cos : sin

          [ //       sint           expt          sint                     expt              cost               cosht              sint              sinht
            [[[ 0 * infact0, 1 * infact0, 0 * infact0 ]]], // 1 * infact0,   //  1 * infact0,   //  1 * infact0,   //  0 * infact0,  //  0 * infact0,
            [[[ 1 * infact1, 1 * infact1, 1 * infact1 ]]], // 1 * infact1,   //  0 * infact1,   //  0 * infact1,   //  1 * infact1,  //  1 * infact1,
            [[[ 0 * infact2, 1 * infact2, 0 * infact2 ]]], // 1 * infact2,   // -1 * infact2,   //  1 * infact2,   //  0 * infact2,  //  0 * infact2,
            [[[ -1 * infact3, 1 * infact3, -1 * infact3 ]]], // 1 * infact3,   //  0 * infact3,   //  0 * infact3,   // -1 * infact3,  //  1 * infact3,
            [[[ 0 * infact4, 1 * infact4, 0 * infact4 ]]], // 1 * infact4,   //  1 * infact4,   //  1 * infact4,   //  0 * infact4,  //  0 * infact4,
            [[[ 1 * infact5, 1 * infact5, 1 * infact5 ]]], // 1 * infact5,   //  0 * infact5,   //  0 * infact5,   //  1 * infact5,  //  1 * infact5,
            [[[ 0 * infact6, 1 * infact6, 0 * infact6 ]]], // 1 * infact6,   // -1 * infact6,   //  1 * infact6,   //  0 * infact6,  //  0 * infact6,
            [[[ -1 * infact7, 1 * infact7, -1 * infact7 ]]], // 1 * infact7,   //  0 * infact7,   //  0 * infact7,   // -1 * infact7,  //  1 * infact7,
            [[[ 0 * infact8, 1 * infact8, 0 * infact8 ]]], // 1 * infact8,   //  1 * infact8,   //  1 * infact8,   //  0 * infact8,  //  0 * infact8,
            [[[ 1 * infact9, 1 * infact9, 1 * infact9 ]]], // 1 * infact9,   //  0 * infact9,   //  0 * infact9,   //  1 * infact9,  //  1 * infact9,
          ], // expt
        ],
        // 'fn0': (e,c) => c[3] * sin(e[3]) // circ
      },

      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [-90, 90],
        c: [], // [1, 1, [0,1], 1],
        e: [ 1, 1, 1, cost ], // 1 * sin(v)
        // 'fn0': (e,c) => c[3] * cos(e[3])
      },
    }
    let conformBlue = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 9, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [],
        e: [ cost, 1, 1, cost ],
        // 'fn0': (e,c) => c[0] * cos(e[0]) * c[3] * cos(e[3])
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 9, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        // c: [],
        // e: [ sint, 1, 1, cost ],
        'fn0': (e, c) => c[0] * sin(e[0]) * c[3] * cos(e[3]),

      },

      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 9, 'pa6': 0, 'pb7': -1,
        'dom3': [-90, 90],
        c: [],
        e: [
          1,
          1,
          1,
          sint,
        ], // 1 * sin(v)
        // 'fn0': (e,c) => c[3] * sin(e[3])
      },

      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 9, 'pa6': 0, 'pb7': -1,
        'dom3': [-90, 90],
        c: [], // [1, 1, [0,1], 1],
        e: [
          1,
          1,
          1,
          cost,
        ], // 1 * sin(v)
        // 'fn0': (e,c) => c[3] * cos(e[3])
      },

    }
    let eocromRed = { 'csx': 1, 'cf': [[[ 333, 333, 333]]], 'co': [[[0.069, 0.06, 0.069]]],
      'cs': [[[333, 333, 333]]], 'cw': [[[1.3, 1.3, 1.3]]], 'cp': [[[0.99, 0.99]]]}

    let eocromBlue = { 'csx': 1, 'cf': [[[ 666, 666, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
      'cs': [[[666, 666, 666]]], 'cw': [[[1.3, 1.3, 1.3]]], 'cp': [[[0.99, 0.99]]]}

    let eocromGold = { 'csx': 1, 'cf': [[[ 999, 999, 999]]], 'co': [[[0.069, 0.06, 0.069]]],
      'cs': [[[999, 999, 999]]], 'cw': [[[1.3, 1.3, 1.3]]], 'cp': [[[0.99, 0.99]]]}

    // ............................. natAniRed
    let natAniRed = {
      eohal: eonEohalMars,
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'qred'},
      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ [[[1, 1]]], [[[1, 1]]] ],
          prerotate: [[[ ctl.rotation ]]],
          translate: [ [105, -20, 0] ],
          rotate: [
            16,
            [[[0, 75, 75, 75]]],
            [[[0, 0, 0, 0]]],
          ],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: eocromRed,
      eoform: conformRed,
      eoload: {},
    }
    // ............................. natAniGold
    let natAniGold = {
      eohal: eonEohalMars,
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'qgold'},
      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
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
      eohal: eonEohalMars,
      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'qblue'},
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ [[[1, 1]]], [[[1, 1]]] ],
          prerotate: [[[ ctl.rotation ]]],
          translate: [ [0, 0, 0] ],
          rotate: [
            0,
            0,
            0 ],
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

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ815aReenter = anitem
}))