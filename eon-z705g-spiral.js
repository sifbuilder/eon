/* ******************************************
   *    @eonZ705gSpiral
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ705gSpiral = global.eonZ705gSpiral || {})))
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

    const eotim = {'td': 32000, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

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

    const waveProform = {
      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [0, 0, 0],
      scale: 1,
      rotate: [ 0, [[[-30, -80, -30]]], [[[0, 160 * 360]]] ], // dyn
      lens: [ 0, 1, Infinity ],
    }

    const waveFrame = [ [ [ -180, 180, 90, 5], [ -180, 180, 30, 5] ] ]

    // .................. waveForm anima
    let waveAni = {

      eohal: eonEohalMars,

      eofold: p => eonMuonFibonat.interlinked(p.eoload),

      eotim,
      eoric: {'gid': 'grat', 'cid': 'grat', 'fid': 'waveAni'},
      eocrom: { 'csx': 0, 'cf': 666, 'cs': [[[555, 777]]], 'cw': [[[1.3, 1.9]]], 'co': [[[0.1, 0.1]]], 'cp': 0.9 },

      eomot: {
        conform: {
          projection: 'natform',
          eoform: waveForm,
        },
        proform: waveProform,
      },
      eoframe: waveFrame,
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

    // .................. animas
    let animas = [

      waveAni, // h.mars

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ705gSpiral = anitem
}))