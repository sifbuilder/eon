/* ******************************************
   *    @eonZ812nTorus
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ812nTorus = global.eonZ812nTorus || {})))
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

    // ............................. pics
    let eotim = {'td': 12600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tf: t => 1 - 4 * (t - 0.5) * (t - 0.5)}

    let conformTorus1 = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 64]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [ 1, 1, [[[10, 10]]], [[[5, 5]]]],
        'fn0': (e, c, d) => c[0] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * cos(e[2]),
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 64]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [ 1, 1, [[[10, 10]]], [[[5, 5]]]],
        'fn0': (e, c, d) => c[1] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * sin(e[2]),

      },

      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 64]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ 1, 1, 1, [[[5, 5]]] ],
        'fn0': (e, c, d) => d.c[3] * c[3] * sin(e[0]),
      },

      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 64]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        'fn0': (e, c) => c[3] * cos(e[2]),
      },

    }

    let conformTorus2 = { // yellow
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 64, 64, 12, 12, 30, 30, 30, 30]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ [[[0, 0, 0.5, 1, 1, 1, 1, 1, 1]]], 1, [[[10, 10]]], [[[5, 5]]]], // BEND
        'fn0': (e, c, d) => c[0] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * cos(e[2] + d.c[0] * e[1]), // bend
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 64, 64, 12, 12, 30, 30, 30, 30]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ [[[0, 0, 0.5, 1, 1, 1, 1, 1, 1]]], 1, [[[10, 10]]], [[[5, 5]]]], // BEND
        'fn0': (e, c, d) => c[1] * (d.c[2] + d.c[3] * cos(e[1])) * c[2] * sin(e[2] + d.c[0] * e[1]), // bend
      },
      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 64, 64, 12, 12, 30, 30, 30, 30]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ 0, [[[0, 0, 0, 0, 0, 0, 0, 180, 180]]] ], // EXPAND
        c: [ 1, 1, [[[0, 0.3 * Math.PI]]], [[[5, 5]]] ],
        'fn0': (e, c, d) => d.c[3] * c[3] * sin(e[0]),
      },
      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 64, 64, 12, 12, 30, 30, 30, 30]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        'fn0': (e, c) => c[3] * cos(e[2]),
      },

    }
    let conformTorus3 = { // red
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 64]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-180, [[[180, 180]]] ],
        c: [ [[[0, 0, 0.5, 1, 1, 1, 1, 1, 1]]], 1, [[[10, 10]]], [[[5, 5]]]], // BEND
        'fn0': (e, c, d) => c[0] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * cos(e[2] + d.c[0] * e[1]),
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 64]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-180, [[[180, 180]]] ],
        c: [ [[[0, 0, 0.5, 1, 1, 1, 1, 1, 1]]], 1, [[[10, 10]]], [[[5, 5]]]], // BEND
        'fn0': (e, c, d) => c[1] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * sin(e[2] + d.c[0] * e[1]),

      },
      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 64]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, [[[180, 180, 180, 180, 0, 0, 0, 0, 0]]] ], // CUT
        c: [ 1, 1, 1, [[[5, 5]]] ],
        'fn0': (e, c, d) => d.c[3] * c[3] * sin(e[0]),
      },
      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 64]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
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
        'cs': [[[222, 222, 222]]], 'cw': [[[0.99, 0.0009, 0.00099]]], 'cp': [[[0.0099, 0.0099]]]},
      eoform: conformTorus1,
      eoload: {
      },
    }

    // ............................. torusAni2 yellow
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
          // rotate: [ -[[[0,5,0]]], [[[10,30,10]]], 0 ],
          rotate: [ 0, 0, 0 ],
          lens: [ 0, 1, Infinity ],
        },
      },
      eocrom: { 'csx': 0, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
        'cs': [[[999, 999, 999]]], 'cw': [[[3.9, 3.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9]]], 'cp': [[[0.99, 0.99]]]},
      eoform: conformTorus2,
      eoload: {
      },
    }

    // ............................. torusAni2 red
    let torusAni3 = {

      eohal: eohalMars,
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q3'},
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
      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),
      eoform: conformTorus3,
      eoload: {
      },
    }

    // ............................. animas
    let animas = [

      torusAni1, // h.mars
      torusAni2, // h.mars
      torusAni3, // h.mars

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ812nTorus = anitem
}))