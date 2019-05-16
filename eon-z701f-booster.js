/* ******************************************
   *    @eonZ701fBooster
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ701fBooster = global.eonZ701fBooster || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [

      eonCtlWen,
      eonMuonNatform,
      eonEohalMars,
      eonRenderSvg,
    ] = await Promise.all([

      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    // .................. animas
    let z = function () {
    // .................. pics
      let ctl
      try {
        ctl = eonCtlWen().control(eonRenderSvg.svg())
      } catch (e) {
        ctl = () => [0, 0, 0]
      }

      let sin = Math.sin, cos = Math.cos

      // ............................. pics
      let eotim = {'td': 12600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tf: t => 1 - 4 * (t - 0.5) * (t - 0.5)}

      let conformLine = {
        'x': {
          'm1': -7.66, 'm2': -3.73, 'n1': 16.24, 'n2': 5.98, 'n3': 17, 'a': 8.98, 'b': 0.19,
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 6, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c) => c[0] * cos(e[0]),
        },
        'y': {
          'm1': -7.66, 'm2': -3.73, 'n1': 16.24, 'n2': 5.98, 'n3': 17, 'a': 8.98, 'b': 0.19,
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 6, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c) => c[1] * sin(e[0]) * cos(e[3]),
        },
        'z': {
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 2, 'b': 1,
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 6, 'pa6': 0, 'pb7': -1,
          'dom3': [-90, 90],
          'fn0': (e, c) => c[1] * sin(e[0]) * sin(e[3]),
        },
        'w': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 6, 'pa6': 0, 'pb7': -1,
        },
      }

      let conformTorus = {
        'x': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[15, 15, 30]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c) => c[0] * (10 + 5 * cos(e[0])) * c[2] * cos(e[3]),
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[15, 15, 30]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ 1, 1, [[[10, 10]]], [[[5, 5]]]],
          'fn0': (e, c, d) => c[1] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * sin(e[3]),
        },
        'z': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[15, 15, 30]]], 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
          c: [ 1, 1, 1, [[[5, 5]]] ],
          'fn0': (e, c, d) => d.c[3] * c[3] * sin(e[0]),
        },
        'w': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[15, 15, 30]]], 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
          'fn0': (e, c) => c[3] * cos(e[2]),
        },
      }

      let conformSphere = {
        'x': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[15, 15, 15]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c) => c[0] * cos(e[0]) * c[2] * cos(e[3]),
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[15, 15, 15]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, dax) => c[1] * sin(e[0]) * c[2] * cos(e[3]),
        },
        'z': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[15, 15, 15]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-90, 90],
          'fn0': (e, c) => c[2] * sin(e[3]),
        },
        'w': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[15, 15, 15]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-90, 90],
          'fn0': (e, c) => c[3] * cos(e[2]),
        },
      }

      let conformHyper = {
        'x': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[15, 30, 30]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c) => c[0] * cos(e[0]) * c[2] * Math.cosh(e[3]),
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[15, 30, 30]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ [[[18, 0, -18]]], 0, 0 ],
          'fn0': (e, c, dax) => c[1] * sin(e[0]) * c[2] * Math.cosh(e[3]),

        },

        'z': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[15, 30, 30]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-90, 90],
          'fn0': (e, c) => c[3] * Math.sinh(e[2]),
        },

        'w': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[15, 30, 30]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-90, 90],
        },

      }

      let eocromSphere = { 'csx': 0, 'cf': [[[ 777, 777, 777]]], 'co': [[[0.02, 0.001, 0.001, 0.001]]],
        'cs': [[[888, 888, 888]]], 'cw': [[[1.99, 0.99, 0.99, 0.99]]], 'cp': [[[0.99, 0.2, 0.2, 0.9]]]}

      let eocromHyper = { 'csx': 0, 'cf': [[[ 777, 777, 777]]], 'co': [[[0.001, 0.02, 0.001, 0.001]]],
        'cs': [[[222, 666, 666]]], 'cw': [[[0.99, 1.99, 0.99, 0.99]]], 'cp': [[[0.01, 0.99, 0.2, 0.9]]]}

      let eocromTorus = { 'csx': 0, 'cf': [[[ 777, 777, 777]]], 'co': [[[0.001, 0.001, 0.02, 0.001]]],
        'cs': [[[222, 444, 444]]], 'cw': [[[0.99, 0.99, 1.99, 0.99]]], 'cp': [[[0.01, 0.01, 0.99, 0.9]]]}

      // ............................. hyperAni
      let hyperAni = {
        eohal: eonEohalMars,
        eotim,
        eoric: {gid: 'q', cid: 'q', fid: 'q1'},
        eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
        eomot: {
          proform: {
            projection: 'uniwen',
            scale: [ [[[0.5, 0.5]]], [[[0.5, 0.5]]] ],
            prerotate: [[[ ctl.rotation ]]],
            translate: [ 0, 0, 0 ],
            rotate: [ -75, 0, 0 ],
            lens: [0, 1, Infinity ],
          },
        },
        eocrom: eocromHyper,
        eoform: conformHyper,
        eoload: {},
      }

      // ............................. sphereAni
      let sphereAni = {
        eohal: eonEohalMars,
        eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
        eotim,
        eoric: {gid: 'q', cid: 'q', fid: 'q2'},
        eomot: {
          proform: {
            projection: 'uniwen',
            scale: [ [[[0.5, 0.5]]], [[[0.5, 0.5]]] ],
            prerotate: [[[ ctl.rotation ]]],
            translate: [ 0, 0, 0 ],
            rotate: [ -75, 0, 0 ],
            lens: [0, 1, Infinity ],
          },
        },
        eocrom: eocromSphere,
        eoform: conformSphere,
        eoload: {
        },
      }

      // ............................. sphereAni
      let lineAni = {
        eohal: eonEohalMars,
        eotim,
        eoric: {gid: 'q', cid: 'q', fid: 'q4'},
        eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
        eomot: {
          proform: {
            projection: 'uniwen',
            scale: [ 1, 1, 1 ],
            prerotate: [[[ ctl.rotation ]]],
            translate: [ 0, 0, 0 ],
            rotate: [ -75, 90, 0 ],
            lens: [0, 1, Infinity ],
          },
        },
        eocrom: eocromSphere,
        eoform: conformLine,
        eoload: {},
      }

      // ............................. torusAni
      let torusAni = {
        eohal: eonEohalMars,
        eotim,
        eoric: {gid: 'q', cid: 'q', fid: 'q3'},

        eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
        eomot: {
          proform: {
            projection: 'uniwen',
            scale: [ [[[0.1, 0.1]]], [[[0.1, 0.1]]] ],
            prerotate: [[[ ctl.rotation ]]],
            translate: [ 0, 0, 0 ],
            rotate: [ -75, 0, 0 ],
            lens: [0, 1, Infinity ],
          },
        },
        eocrom: eocromTorus,
        eoform: conformTorus,
        eoload: {},
      }

      // ............................. animas
      let animas = [

        sphereAni, // h.natform
        hyperAni, // h.natform
        torusAni, // h.natform
        lineAni, // h.natform

      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ701fBooster = anitem
}))
