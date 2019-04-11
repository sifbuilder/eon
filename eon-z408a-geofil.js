/* ******************************************
   *    @eonZ408aGeofil
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ408aGeofil = global.eonZ408aGeofil || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    d3,
    ctlWen,
    eohalNatform,
    eohalMars,
    muonAnimas,
    muonGraticule,
    muonNatform,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').c('wen'),
    __eo('xs').e('natform'),
    __eo('xs').e('mars'),
    __eo('xs').m('animas'),
    __eo('xs').m('graticule'),
    __eo('xs').m('natform'),
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

    let eotim = {td: 6800, t0: 0, t1: 1, t2: 1, t3: 1}

    let eoform = {
      'x': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 100, 'v0': 0, 'v1': 1, 'seg5': 18, 'w4': 0, 'pa6': 0, 'pb7': -1,
      },
      'y': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 100, 'v0': 0, 'v1': 1, 'seg5': 18, 'w4': 0, 'pa6': 0, 'pb7': -1,
      },
      'z': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 100, 'v0': 0, 'v1': 1, 'seg5': 18, 'w4': 0, 'pa6': 0, 'pb7': -1,
      },

    }

    let geoGraticule0 = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {gid: 'g', cid: 'g', fid: 'g0' },
      eocrom: {'csx': 0, 'cf': 555, 'cs': 888, 'cw': 0.7, 'co': 0.5, 'cp': 0.9},

      eofold: p => muonGraticule.gjfMultiLineString(p.eoframe),
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: 1,
          translate: [ 0, 0 ],
          prerotate: [[[ ctl.rotation ]]],
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity ],
        },
      },
      eoframe: {
        geoframe: [ [ [ -180, 180, 20, 1], [ -90, 90, 20, 1] ] ],
      },
      eoform: null,
      eoload: {},
    }

    let geoGraticule1 = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {gid: 'g', cid: 'g', fid: 'g1' },
      eocrom: {'csx': 0, 'cf': 555, 'cs': 888, 'cw': 0.7, 'co': 0.5, 'cp': 0.9},
      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),
      eomot: {
        proform: {
          projection: 'uniwen', // d3.geoOrthographic(),
          scale: 1,
          translate: [ -150, 0 ],
          prerotate: [[[ ctl.rotation ]]],
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity ],
        },
      },
      eoframe: null,
      eoform: eoform,
      eoload: {},
    }

    let geoGraticule2 = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {gid: 'g', cid: 'g', fid: 'g2' },
      eocrom: {'csx': 0, 'cf': 555, 'cs': 888, 'cw': 0.7, 'co': 0.5, 'cp': 0.9},

      eofold: p => muonGraticule.gjfMultiLineString(p.eoframe),
      eomot: {
        proform: {
          projection: d3.geoOrthographic(),
          scale: 100,
          translate: [ 150, 0 ],
          prerotate: [[[ ctl.rotation ]]],
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity ],
        },
      },
      eoframe: {
        geoframe: [ [ [ -180, 180, 20, 1], [ -90, 90, 20, 1] ] ],
      },
      eoform: null,
      eoload: {},
    }

    // ............................. animas
    let animas = [
      geoGraticule0, //
      geoGraticule1, //
      geoGraticule2, //

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ408aGeofil = anitem
}))
