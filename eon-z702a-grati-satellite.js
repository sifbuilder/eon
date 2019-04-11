/* ******************************************
   *    @eonZ702aGratiSatellite
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ702aGratiSatellite = global.eonZ702aGratiSatellite || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    muonGraticule,
    ctlWen,
    protonNatform,
    eohalMars,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').m('graticule'),
    __eo('xs').c('wen'),
    __eo('xs').p('natform'),
    __eo('xs').e('mars'),
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

    let eotim = {'td': 22800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let form = {
      'x': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
        'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
      },
      'y': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
        'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
      },
      'z': {
        'm1': 8, 'm2': 1, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // antenna
        'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, [[[160, 180, 180]]] ],
      },
    }

    let g1 = {
      eohal: eohalMars,
      eofold: p => muonGraticule.gjfMultiLineString(p.eoframe),
      eotim: eotim,
      eoric: { gid: 'grat', cid: 'grat', fid: 'g1'},
      eocrom: { 'csx': 0, 'cf': 666, 'cs': 666, 'cw': 0.9, 'co': 0.3, 'cp': 0.9 },
      eomot: {
        conform: {
          projection: 'natform',
          eoform: form,
        },
        proform: {
          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          translate: [ -150, 0],
          scale: 1,
          rotate: [[[[0,30,-30,0]]], -60, [[[0,360]]] ],
          lens: [ 0, 1, Infinity ],
        },
      },
      eoframe: {
        // geoframe: [ [ [-180, 180, 15, 15], [-90, [[[0, 90]]], 22.5, 22.5] ],
        //   [ [-180, 180, 15, 15], [-90, [[[0, 90]]], 22.5, 22.5] ] ],
        geoframe: [ [ [-180, 180, 15, 15], [-90, 1, 22.5, 22.5] ],
          [ [-180, 180, 15, 15], [-90, 1, 22.5, 22.5] ] ],
      },
      eoload: {
      },
    }

    let g2 = {
      eohal: eohalMars,
      eofold: p => muonGraticule.gjfMultiLineString(p.eoframe),
      eotim: eotim,
      eoric: { gid: 'grat', cid: 'grat', fid: 'g2'},
      eocrom: { 'csx': 0, 'cf': 666, 'cs': 666, 'cw': 0.9, 'co': 0.3, 'cp': 0.9 },
      eomot: {
        conform: { projection: 'natform', eoform: form },
        proform: {
          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          translate: [ 0, 0],
          scale: 100,
          rotate: [0, 0, 0],
          lens: [ 0, 1, Infinity ],
        },
      },
      eoframe: {
        geoframe: [ [ [-180, 180, 180, 30], [-0, 180, 360, 30] ],
          [ [-180, 180, 180, 30], [-0, 180, 360, 30] ] ],
      },
      eoload: {
      },
    }

    let g3 = {
      eohal: eohalMars,
      eofold: p => muonGraticule.gjfMultiLineString(p.eoframe),
      eotim: eotim,
      eoric: { gid: 'grat', cid: 'grat', fid: 'g3'},
      eocrom: { 'csx': 0, 'cf': 666, 'cs': 666, 'cw': 0.9, 'co': 0.3, 'cp': 0.9 },
      eomot: {
        conform: { projection: 'natform', eoform: form },
        proform: {
          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          translate: [ 150, [[[0,50,-50,0]]] ],
          scale: 100,
          rotate: [0, 0, [[[0,360]]] ],
          lens: [ 0, 1, Infinity ],
        },
      },
      eoframe: {
        geoframe: [ [ [-180, 180, 15, 15], [-0, 180, 22.5, 22.5] ],
          [ [-180, 180, 15, 15], [-0, 180, 22.5, 22.5] ] ],
      },
      eoload: {
      },
    }

    // .................. animas
    let animas = [

      g1, // h.mars
      // g2, // h.mars
      g3, // h.mars

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ702aGratiSatellite = anitem
}))