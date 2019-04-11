/* ******************************************
   *    @eonZ812qSpiral
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ812qSpiral = global.eonZ812qSpiral || {})))
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

    let pi = Math.PI,
      radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
      sinh = Math.sinh, cosh = Math.cosh, tanh = Math.tanh,
      exp = Math.exp,
      epsilon = 1e-5

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
    let eotim = {'td': 18600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tf: t => t}

    let conformSphere = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 160, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
        'dom3': [ 0, [[[0, 3 * 360]]] ],
        c: [ [[[1, 3]]], 1, 1, 1],
        fn0: (e, c, d) => {
          let C0 = 1
          let C1 = 1
          let C = 1 / (2 * Math.PI)
          let cycs = 3
          let ro = e[0] / 3
          let res = ro * cos(e[0]) * cos(e[3])
          return res
        },
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 160, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
        'dom3': [ 0, [[[0, 3 * 360]]] ],
        c: [ [[[1, 3]]], 1, 1, 1],
        fn0: (e, c, d) => {
          let C0 = 1
          let C1 = 1
          let C = 1 / (2 * Math.PI)
          let cycs = 3
          let ro = e[1] / 3
          let res = ro * sin(e[1]) * cos(e[3])
          return res
        },
      },
      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 160, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 6, 'pa6': 0, 'pb7': -1,
        'dom3': [-90, 90],
        c: [ 1, 1, 1, 1],
        fn0: (e, c, d) => sin(e[2]),
      },
      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'dom3': [0, 1 * 360],
        // fn0: (e, c, d) => d.c[3] * sin(e[2] * (1 + epsilon * sin(e[0]))),
        fn0: (e, c, d) => e[3],
      },

    }

    // ............................. sphereAni
    let sphereAni = {

      eohal: eohalMars,
      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q0'},
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 0.1, 0.1 ],
          prerotate: [[[ ctl.rotation ]]],
          translate: [ [0, 0, 0] ],
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: { 'csx': 0, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
        'cs': [[[666, 666, 666]]], 'cw': [[[0.99, 0.99, 0.99]]], 'cp': [[[0.99, 0.99]]]},
      eoform: conformSphere,
      eoload: {
      },
    }

    // ............................. animas
    let animas = [

      sphereAni, // h.mars

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ812qSpiral = anitem
}))