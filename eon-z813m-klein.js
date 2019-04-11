/* ******************************************
   *    @eonZ813mKlein
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ813mKlein = global.eonZ813mKlein || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    ctlWen,
    eohalScene,
    eohalMars,
    muonNatform,
    muonProps,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').c('wen'),
    __eo('xs').e('scene'),
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

    let conformLight = {
      'x': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[12, 12]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ 0, 180 ],
        // 'dom3': [ [[[0,0,-180]]], [[[0,180,180]]] ],
        // 'dom3': [ [[[0,-90]]], [[[0,90]]] ],
        'dom3': [ [[[-180, -180]]], [[[180, 180]]] ],
        'dom3': [ -180, 180 ],
        c: [ 1, 1, -2 / 15, [[[5, 5]]]],
        'fn0': (e, c, d) =>
          (-2 / 15) * cos(e[2]) * (
            3 * cos(e[0]) -
            30 * sin(e[2]) +
            90 * Math.pow(cos(e[2]), 4) * sin(e[2]) -
            60 * Math.pow(cos(e[2]), 6) * sin(e[2]) +
            5 * cos(e[2]) * cos(e[0]) * sin(e[2])
          )
        ,
      },
      'y': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[12, 12]]], 'pa6': 0, 'pb7': -1,
        // 'dom3': [ [[[0,0,-180]]], [[[0,180,180]]] ],
        'dom3': [ -180, 360 ],
        c: [ 1, 1, [[[10, 10]]], [[[5, 5]]]],
        'fn0': (e, c, d) =>
          (-1 / 15) * sin(e[2]) * (
            3 * cos(e[0]) -
            3 * Math.pow(cos(e[2]), 2) * cos(e[0]) -
            48 * Math.pow(cos(e[2]), 4) * cos(e[0]) +
            48 * Math.pow(cos(e[2]), 6) * cos(e[0]) -
            60 * sin(e[2]) +
            5 * Math.pow(cos(e[2]), 3) * cos(e[0]) * sin(e[2]) -
            5 * Math.pow(cos(e[2]), 3) * cos(e[0]) * sin(e[2]) -
            80 * Math.pow(cos(e[2]), 5) * cos(e[0]) * sin(e[2]) +
            80 * Math.pow(cos(e[2]), 7) * cos(e[0]) * sin(e[2])
          )
        ,
      },
      'z': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[15, 15, 15, 60, 120]]], 'pa6': 0, 'pb7': -1,
        // 'dom3': [ [[[0,0,-180]]], [[[0,180,180]]] ],
        'dom3': [ [[[0, 0, 0]]], [[[0, 90, 180, 180, 180]]] ],
        // 'dom3': [ 0, 180 ],
        c: [ 1, 1, 1, [[[5, 5]]] ],
        'fn0': (e, c, d) =>
          (2 / 15) * (
            3 +
              5 * cos(e[2]) * sin(e[2]) * cos(e[0])
          ),
      },
      'r': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        // 'dom3': [ [[[0,0,-180]]], [[[0,180,180]]] ],
        'dom3': [ -180, 180 ],
        'fn0': (e, c, d) => d.c[3] * sin(e[2] * (1 + epsilon * sin(e[0]))),
      },

    }

    // ............................. lightAni
    let lightAni = {

      eohal: eohalMars,
      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q1'},
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 0.5, 0.5 ],
          prerotate: [[[ ctl.rotation ]]],
          translate: [ [0, -100, 0] ],
          rotate: [ -[[[0, 5, 0]]], [[[10, 30, 10]]], 0 ],
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: { 'csx': 0, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
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
  exports.eonZ813mKlein = anitem
}))