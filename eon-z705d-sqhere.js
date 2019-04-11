/* ******************************************
   *    @eonZ705dSqhere
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ705dSqhere = global.eonZ705dSqhere || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    ctlWen,
    eohalMars,
    muonFibonat,
    muonGraticule,
    protonNatform,
    renderSvg,
  ] = await Promise.all([
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

    let eotim = {'td': 12800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let formNat = {
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

    let geoframe = [ [ [ -180, 180, 90, 5], [ -180, 180, 30, 5] ] ]
    let proform = {
      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [0, 0, 0],
      scale: 0.5,
      rotate: [ 0, 0, 0],
      lens: [ 0, 1, Infinity ],
    }

    let formSphere = {
      'x': {
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square

        'ra2': [[[180, 180 * sqrt2, 180 * 2]]], 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[0] * cos(e[0]) * c[2] * cos(e[2]),

      },
      'y': {
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square

        'ra2': [[[180, 180 * sqrt2, 180 * 2]]], 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[1] * sin(e[0]) * c[0] * cos(e[2]),
      },
      'z': {
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square

        'ra2': [[[180 / sqrt2, 180 * sqrt2 / sqrt2, 180 * 2 / sqrt2]]], 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[3] * sin(e[3]),

      },
      'r': {
        'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square

        'ra2': 180 / sqrt2, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[2] * cos(e[3]),

      },

    }

    const gratiSphere = [ [ [ -180, 180, 45, 5], [ -180, 180, 45, 5] ] ]

    // .................. gratiAni anima
    let gratiAni = {

      eohal: eohalMars,

      eofold: p => muonGraticule.gjfMultiLineString(p.eoframe), // hMultiLine

      eotim,
      eoric: {'gid': 'grat', 'cid': 'grat', 'fid': 'gratiAni'},
      eocrom: { 'csx': 0, 'cf': 666, 'cs': [[[555, 777]]], 'cw': [[[1.3, 1.9]]], 'co': [[[0.01, 0.01]]], 'cp': 0.9 },

      eomot: {
        conform: {
          projection: 'natform',
          eoform: formNat,
        },

        proform: proform,
      },
      eoframe: geoframe,
      eoload: {

      },

    }
    // .................. sphereAni anima
    let sphereAni = {

      eohal: eohalMars,

      eofold: p => muonGraticule.gjfMultiLineString(p.eoframe), // hMultiLine

      eotim,
      eoric: {'gid': 'grat', 'cid': 'grat', 'fid': 'sphereAni'},
      eocrom: { 'csx': 0, 'cf': 666, 'cs': [[[555, 777]]], 'cw': [[[1.3, 1.9]]], 'co': [[[0.01, 0.9]]], 'cp': 0.9 },

      eomot: {
        conform: {
          projection: 'natform',
          eoform: formSphere,
        },

        proform: proform,
      },
      eoframe: gratiSphere,
      eoload: {

      },

    }

    // .................. animas
    let animas = [

      sphereAni, // h.mars
      gratiAni, // h.mars

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ705dSqhere = anitem
}))