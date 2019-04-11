/* ******************************************
   *    @eonZ812aTorus
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ812aTorus = global.eonZ812aTorus || {})))
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
  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = ctlWen().control(renderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
      sinh = Math.sinh, cosh = Math.cosh, tanh = Math.tanh,
      exp = Math.exp

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
    let expt = [infact0, infact1, infact2, infact3, infact4, infact5, infact6, infact7, infact8, infact9]

    // ............................. pics
    let eotim = {'td': 8600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tf: t => t}

    let conformTorus1 = {
      'x': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[60, 60]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        // e: [ cost, 1, 1, cosht ],
        c: [ 1, 1, [[[10, 10]]], [[[5, 5]]]],
        'fn0': (e, c, d) => c[0] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * cos(e[2]), // e[1] + e[2]
        // c: [ 5, 1, 1, 1],
        // e: [ cost , 1, 1,  cost  ]
      },

      'y': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[60, 60]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        // e: [ sint, 1, 1, [infact0, 0, [[[+infact2,-infact2,+infact2,]]], 0, infact4, 0, [[[+infact6,-infact6,+infact6]]], 0, infact8] ],
        // e: [ sint, 1, 1, [infact0, 0, +infact2, 0, infact4, 0, +infact6, 0, infact8] ],
        c: [ [[[0, 0.3 * Math.PI]]], 1, [[[10, 10]]], [[[5, 5]]]],
        // e: [ 1 , [0, [[[9,0]]], [[[-10, 1]]] ], 1 , 1 ]
        // e: [ 1 ,  [0, 0, 1, 0 ], 1, 1,  ]
        // 'fn0': (e,c,d) => c[1] * (10 + 5 * cos(e[0])) * c[2] * sin(e[3]),
        'fn0': (e, c, d) => c[1] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * sin(e[2]), // e[1] + e[2]

      },

      'z': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[60, 60]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        // c: [1, 1, 1, [0,1]],
        // e: [ 1, 1, sint, 1 ], // 1 * sin(v)
        c: [ 1, 1, [[[0, 0.3 * Math.PI]]], [[[5, 5]]] ],
        'fn0': (e, c, d) => {
          // if (1 && 1) console.log('d.c[2]', d.c[2], d.c[3])
          // let r = Math.floor(d.c[2])
          let r = d.c[2]

          return d.c[3] * c[3] * sin(e[0])
        },
      },

      'w': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[60, 60]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ -[[[0, 180]]], [[[0, 180]]] ],
        // c: [ 0, 0 ],
        // e: [0, [1, 1, 0, 0, 0, 0, 0, 0, 0, 0] ], // 1 * id(q)
        'fn0': (e, c) => c[3] * cos(e[2]),
      },

    }

    let conformTorus2 = {
      'x': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[12, 60]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        // e: [ cost, 1, 1, cosht ],
        c: [ 1, 1, [[[10, 10]]], [[[5, 5]]]],
        'fn0': (e, c, d) => c[0] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * cos(e[1] + e[2]),
        // c: [ 5, 1, 1, 1],
        // e: [ cost , 1, 1,  cost  ]
      },

      'y': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[12, 60]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        // e: [ sint, 1, 1, [infact0, 0, [[[+infact2,-infact2,+infact2,]]], 0, infact4, 0, [[[+infact6,-infact6,+infact6]]], 0, infact8] ],
        // e: [ sint, 1, 1, [infact0, 0, +infact2, 0, infact4, 0, +infact6, 0, infact8] ],
        c: [ [[[0, 0.3 * Math.PI]]], 1, [[[10, 10]]], [[[5, 5]]]],
        // e: [ 1 , [0, [[[9,0]]], [[[-10, 1]]] ], 1 , 1 ]
        // e: [ 1 ,  [0, 0, 1, 0 ], 1, 1,  ]
        // 'fn0': (e,c,d) => c[1] * (10 + 5 * cos(e[0])) * c[2] * sin(e[3]),
        'fn0': (e, c, d) => c[1] * (d.c[2] + d.c[3] * cos(e[1])) * c[2] * sin(e[1] + e[2]),

      },

      'z': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[12, 60]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ 0, [[[0, 0, 180]]] ],
        // c: [1, 1, 1, [0,1]],
        // e: [ 1, 1, sint, 1 ], // 1 * sin(v)
        c: [ 1, 1, [[[0, 0.3 * Math.PI]]], [[[5, 5]]] ],
        'fn0': (e, c, d) => {
          // if (1 && 1) console.log('d.c[2]', d.c[2], d.c[3])
          // let r = Math.floor(d.c[2])
          let r = d.c[2]

          return d.c[3] * c[3] * sin(e[0])
        },
      },

      'r': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[12, 60]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        // c: [ 0, 0 ],
        // e: [0, [1, 1, 0, 0, 0, 0, 0, 0, 0, 0] ], // 1 * id(q)
        'fn0': (e, c) => c[3] * cos(e[2]),
      },

    }

    // ............................. torusAni1
    let torusAni1 = {

      eohal: eohalMars,
      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q1'},
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 1, 1, 1 ],
          prerotate: [[[ ctl.rotation ]]],
          translate: [ [0, 0, 0] ],
          rotate: [ -[[[0, 5, 0]]], [[[10, 30, 10]]], 0 ],
          rotate: [ 0, 0, 0 ],
          lens: [ 0, 1, Infinity ],
        },
      },
      eocrom: { 'csx': 0, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
        'cs': [[[222, 222, 222]]], 'cw': [[[0.99, 0.9, 0.99]]], 'cp': [[[0.99, 0.99]]]},
      eoform: conformTorus1,
      eoload: {},
    }

    // ............................. torusAni2
    let torusAni2 = {

      eohal: eohalMars,
      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q2'},
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 1, 1, 1 ],
          prerotate: [[[ ctl.rotation ]]],
          translate: [ [0, 0, 0] ],
          rotate: [ -[[[0, 5, 0]]], [[[10, 30, 10]]], 0 ],
          rotate: [ 0, 0, 0 ],
          lens: [ 0, 1, Infinity ],
        },
      },
      eocrom: { 'csx': 0, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
        'cs': [[[999, 999, 999]]], 'cw': [[[0.99, 0.9, 0.99]]], 'cp': [[[0.99, 0.99]]]},
      eoform: conformTorus2,
      eoload: {
      },
    }

    // ............................. animas
    let animas = [

      torusAni1, // h.mars
      // torusAni2, // h.mars

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ812aTorus = anitem
}))