/* ******************************************
   *    @eonZ710jBoosters
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ710jBoosters = global.eonZ710jBoosters || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonMuonNatform,
    eonMuonProps,
    eonCtlWen,
    eonEohalMars,
    eonEohalNatform,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-natform'),
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

    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt

    let fact = n => n - 1 > 0 ? n * fact(n - 1) : n
    let fact1 = 1,
      fact2 = 2,
      fact3 = 6,
      fact4 = 24,
      fact5 = 120,
      fact6 = 720,
      fact7 = 5040,
      fact8 = 40320,
      fact9 = 362880
    let infact1 = 1 / fact1,
      infact2 = 1 / fact2,
      infact3 = 1 / fact3,
      infact4 = 1 / fact4,
      infact5 = 1 / fact5,
      infact6 = 1 / fact6,
      infact7 = 1 / fact7,
      infact8 = 1 / fact8,
      infact9 = 1 / fact9

    let sinp = [1, 0, -infact2, 0, +infact4, 0, -infact6, 0, infact8]
    let cosp = [0, +1, 0, -infact3, 0, +infact5, 0, -infact7, 0, infact9]

    let conform = {
      'x': {
      // "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"a":1,"b":1,  // drop
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // craft

        'm1': [[[-4, -2, -7.66, -8 ]]],
        'm2': [[[-3.3, -3, -3.73, -3.5 ]]],
        'n1': [[[16.24, 16.24, 16.24, 16.24 ]]],
        'n2': [[[6, 6, 5.98, 6 ]]],
        'n3': [[[15, 17, 17, 13 ]]],
        'a': [[[9, 9, 8.98, 9 ]]],
        'b': [[[0.2, 0.2, 0.19, 0.2 ]]],

        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 94.001, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180], // r.form.circ [-1.57, 1.57]
        'fn0': (e, c, d) => c[0] * cos(e[0]),

      },
      'y': {

      // "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"a":1,"b":1,   // drop
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // craft

        'm1': [[[-4, -2, -7.66, -8 ]]],
        'm2': [[[-3.3, -3, -3.73, -3.5 ]]],
        'n1': [[[16.24, 16.24, 16.24, 16.24 ]]],
        'n2': [[[6, 6, 5.98, 6 ]]],
        'n3': [[[15, 17, 17, 13 ]]],
        'a': [[[9, 9, 8.98, 9 ]]],
        'b': [[[0.2, 0.2, 0.19, 0.2 ]]],

        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 94.001, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],

        'fn0': (e, c, d) => c[1] * sin(e[0]) * cos(e[3]),

      },

      'z': {
        // "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"a":1,"b":1,  // drop
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // craft

        'm1': [[[-4, -2, -7.66, -8 ]]],
        'm2': [[[-3.3, -3, -3.73, -3.5 ]]],
        'n1': [[[16.24, 16.24, 16.24, 16.24 ]]],
        'n2': [[[6, 6, 5.98, 6 ]]],
        'n3': [[[15, 17, 17, 13 ]]],
        'a': [[[9, 9, 8.98, 9 ]]],
        'b': [[[0.2, 0.2, 0.19, 0.2 ]]],

        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[24, 36]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'dom3': [-90, 90],

        'fn0': (e, c, d) => c[1] * sin(e[0]) * sin(e[3]),

      },

      'r': {
        'm1': 1, 'm2': 1, 'n1': 0.5, 'n2': 0.5, 'n3': 0.5, 'a': 1, 'b': 1, // drop
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ

        'm1': [[[-4, -2, -7.66, -8 ]]],
        'm2': [[[-3.3, -3, -3.73, -3.5 ]]],
        'n1': [[[16.24, 16.24, 16.24, 16.24 ]]],
        'n2': [[[6, 6, 5.98, 6 ]]],
        'n3': [[[15, 17, 17, 13 ]]],
        'a': [[[9, 9, 8.98, 9 ]]],
        'b': [[[0.2, 0.2, 0.19, 0.2 ]]],

        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[24, 36]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'dom3': [-90, 90],

        'fn0': (e, c, d) => e[3],

      },

    }

    let proform = {

      projection: 'uniwen',
      scale: [2, 2],
      // scale: [1, 1],
      // scale: [0.5, 0.5],

      // projection:  d3.geoOrthographic(),
      // scale: 100,

      prerotate: [[[ ctl.rotation ]]],
      translate: [ [0, 100, 0] ],
      // rotate: [ [[[90 + 0, 90 + 0, 90 + 1 * 360, 90 + 1 * 360]]], 0, 0 ],
      rotate: [ 0, 90, -90 ],
      lens: [0, 1, Infinity],
    }

    // .................. natAni
    let natAni = {

      eohal: eonEohalMars,

      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
      eotim,

      eoric: {gid: 'nat', cid: 'nat', fid: 'nat'},
      eomot: {
        proform: proform,
      },
      eocrom: { 'csx': 0, 'cf': [[[111, 111, 111]]], 'co': [[[0.09, 0.09]]], 'cs': [[[888, 888]]], 'cw': [[[1.9, 1.9]]], 'cp': [[[0.7, 0.9]]]},

      eoform: conform,
      eoload: {},

    }

    // .................. animas
    let animas = [

      natAni, // h.mars g.uniwen

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ710jBoosters = anitem
}))
