/* ******************************************
   *    @eonZ705cWaveform
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ705cWaveform = global.eonZ705cWaveform || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3,
    ctlWen,
    eohalMars,
    muonFibonat,
    muonGraticule,
    protonNatform,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').m('fibonat'),
    __eo('xs').m('graticule'),
    __eo('xs').p('natform'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) { }
  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = ctlWen().control(renderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    const radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos,
      sqrt2 = Math.sqrt(2)

    const eotim = {'td': 12800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    const waveProform = {
      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [0, 0, 0],
      scale: 1,
      rotate: [ 0, 0, [[[0, 20 * 360]]] ], // dyn
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

    const waveFrame = [ [ [ -180, 180, 90, 5], [ -180, 180, 30, 5] ] ]

    const sphereFrame = [ [ [ -180, 180, 45, 5], [ -180, 180, 45, 5] ] ]

    let waveForm = {
      x: {
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square

        'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[0] * cos(e[0]) * c[2] * cos(e[2]),

      },
      y: {
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square

        'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[1] * sin(e[0]) * c[2] * cos(e[2]),
      },
      z: {
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square

        'ra2': 180 / sqrt2, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[3] * sin(e[3]),

      },
      w: {
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square

        'ra2': 180 / sqrt2, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[2] * cos(e[2]),

      },

    }

    let sphereForm = {
      x: {
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square

        'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[0] * cos(e[0]) * c[2] * cos(e[2]),

      },
      y: {
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square

        'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[1] * sin(e[0]) * c[2] * cos(e[2]),
      },
      z: {
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square

        'ra2': 180 / sqrt2, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[3] * sin(e[3]),

      },
      w: {
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

      eohal: eohalMars,
      eotim,
      eoric: {'gid': 'grat', 'cid': 'grat', 'fid': 'waveAni'},

      eofold: p => muonFibonat.interlinked(p.eoload),

      eocrom: { 'csx': 0, 'cf': 666, 'cs': [[[555, 777]]], 'cw': [[[1.3, 1.9]]], 'co': [[[0.1, 0.09]]], 'cp': 0.9 },

      eomot: {
        conform: { projection: 'natform', eoform: waveForm },

        proform: waveProform,
      },
      eoframe: waveFrame,
      eoload: {

        fibonat: {
          samples: [[[50, 50]]],
          offsetstep: [[[0, 20]]], // ani
          xprecision: 1,
          yprecision: [[[0.1, 0.1]]],
          goldenangle: Math.PI * (3.0 - Math.sqrt(5.0)),
        },

      },

    }
    // .................. sphereForm anima
    let sphereAni = {

      eohal: eohalMars,
      eotim,
      eoric: {'gid': 'grat', 'cid': 'grat', 'fid': 'sphereAni'},

      eofold: p => muonGraticule.gjfMultiLineString(p.eoframe), // hMultiLine

      eocrom: { 'csx': 0, 'cf': 666, 'cs': [[[555, 777]]], 'cw': [[[1.3, 1.9]]], 'co': [[[0.01, 0.09]]], 'cp': 0.9 },

      eomot: {
        conform: { projection: 'natform', eoform: sphereForm },
        proform: sphereProform,
      },
      eoframe: sphereFrame,
      eoload: {},

    }

    // .................. animas
    let animas = [

      sphereAni, // h.mars
      waveAni, // h.mars

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ705cWaveform = anitem
}))