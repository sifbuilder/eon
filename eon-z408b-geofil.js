/* ******************************************
   *    @eonZ408bGeofil
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ408bGeofil = global.eonZ408bGeofil || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    d3,
    eonCtlWen,
    eonEohalNatform,
    eonEohalMars,
    eonMuonAnimas,
    eonMuonGraticule,
    eonMuonNatform,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-animas'),
    __eo('xs').b('eon-muon-graticule'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}

  // .................. animas
  let z = function () {
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    // .................. pics
    let eotim = {td: 16800, t0: 0, t1: 1, t2: 1, t3: 1}

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

    let geoVoro = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'g', cid: 'g', fid: 'g1' },
      eocrom: {'csx': 0, 'cf': 555, 'cs': 888, 'cw': 0.7, 'co': 0.5, 'cp': 0.9},
      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
      eomot: {
        proform: {
          projection: 'uniwen', // d3.geoOrthographic(),
          scale: 1,
          translate: [ -100, 0 ],
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

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'g', cid: 'g', fid: 'g2' },
      eocrom: {'csx': 0, 'cf': 555, 'cs': 888, 'cw': 0.7, 'co': 0.5, 'cp': 0.9},

      eofold: p => eonMuonGraticule.gjfMultiLineString(p.eoframe),
      eomot: {
        proform: {
          projection: d3.geoOrthographic(),
          scale: 100,
          translate: [ 100, 0 ],
          prerotate: [[[ ctl.rotation ]]],
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity ],
        },
      },
      eoframe: {
        geoframe: [ [ [ -180, 180, 20, 20], [ -90, 90, 20, 20] ] ],
      },
      eoform: null,
      eoload: {},
    }

    // ............................. animas
    let animas = [
      geoVoro, //
      geoGraticule2, //

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ408bGeofil = anitem
}))

