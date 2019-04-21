/* ******************************************
   *    @eonZ705eWaveform
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ705eWaveform = global.eonZ705eWaveform || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3,
    eonCtlWen,
    eonEohalMars,
    eonMuonFibonat,
    eonMuonGraticule,
    eonProtonNatform,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-fibonat'),
    __eo('xs').b('eon-muon-graticule'),
    __eo('xs').b('eon-proton-natform'),
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

    const radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos,
      sqrt2 = Math.sqrt(2)

    const eotim = {'td': 12000, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    const waveProform = {
      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [0, 0, 0],
      scale: 1,
      rotate: [ 0, 0, [[[0, 60 * 360]]] ], // dyn
      lens: [ 0, 1, Infinity ],
    }

    const sphereProform = {
      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [0, 0, 0],
      scale: 1,
      rotate: [ 0, 0, 0],
      lens: [ 0, 1, Infinity ],
    }

    let waveForm = {
      'x': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[0] * cos(e[0]) * c[2] * cos(e[2]),
      },
      'y': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[1] * sin(e[0]) * c[2] * cos(e[2]),
      },
      'z': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[3] * sin(e[3]),

      },
    }

    let sphereForm = {
      'x': {
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square

        'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[0] * cos(e[0]) * c[2] * cos(e[2]),

      },
      'y': {
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square

        'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[1] * sin(e[0]) * c[2] * cos(e[2]),
      },
      'z': {
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square

        'ra2': 180 / sqrt2, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[3] * sin(e[3]),

      },
      'r': {
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square

        'ra2': 180 / sqrt2, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[2] * cos(e[2]),

      },

    }

    // .................. waveForm anima
    let waveAni = {

      eohal: eonEohalMars,

      eofold: p => eonMuonFibonat.interlinked(p.eoload),

      eotim,
      eoric: {'gid': 'grat', 'cid': 'grat', 'fid': 'waveAni'},
      eocrom: { 'csx': 0, 'cf': 666, 'cs': [[[555, 777]]], 'cw': [[[1.3, 1.9]]], 'co': [[[0.1, 0.3]]], 'cp': 0.9 },

      eomot: {
        conform: {
          projection: 'natform',
          eoform: waveForm,
        },

        proform: waveProform,
      },
      eoframe: [ [ [ -180, 180, 90, 5], [ -180, 180, 30, 5] ] ],
      eoload: {

        fibonat: {
          samples: [[[120, 120]]],
          offsetstep: [[[3, 3]]], // ani
          xprecision: 3,
          yprecision: [[[0.1, 0.1]]],
          goldenangle: Math.PI * (3.0 - Math.sqrt(5.0)),
        },

      },

    }
    // .................. sphereForm anima
    let sphereAni = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'grat', cid: 'grat', fid: 'sphereAni'},

      eofold: ani => eonMuonGraticule.gjfMultiLineString({multiframe: ani.eoframe}), // hMultiLine

      eocrom: { 'csx': 0, 'cf': 666, 'cs': [[[555, 777]]], 'cw': [[[1.3, 1.9]]], 'co': [[[0.01, 0.9]]], 'cp': 0.9 },

      eomot: {
        conform: {
          projection: 'natform',
          eoform: sphereForm,
        },
        proform: sphereProform,
      },
      eoframe: [
        [ -180, 180, 45, 45], [ -90, 90, 45, 45],
      ],
      eoload: {},

    }

    // .................. animas
    let animas = [

      sphereAni, // h.mars
      // waveAni, // h.mars

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ705eWaveform = anitem
}))