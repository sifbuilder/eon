/* ******************************************
   *    @eonZ263aRoses
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ263aRoses = global.eonZ263aRoses || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    d3,
    eonCtlWen,
    eonEohalNatform,
    eonEohalMars,
    eonEohalTextform,
    eonMuonAnimas,
    eonMuonGraticule,
    eonMuonNatform,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-textform'),
    __eo('xs').b('eon-muon-animas'),
    __eo('xs').b('eon-muon-graticule'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  let eoform = {
    'x': {
      'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,			// square
      'ra2': [[[40, 40]]],
      'v0': 0, 'v1': 1,
      'w4': [[[0, -3 * 360]]], // 180, //
      'seg5': 360,
    },
    'y': {
      'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,			// square
      'ra2': [[[40, 40]]],
      'v0': 0, 'v1': 1, 	// [[[1,1,2,2]]], // 1, 	// [[[1,1,2,2]]],
      'w4': [[[0, -3 * 360]]], // 0, // 180, //
      'seg5': 360, 'pa6': 0, 'pb7': -1,
    },

  }

  let ctl
  try {
    ctl = eonCtlWen().control(eonRenderSvg.svg())
  } catch (e) {
    ctl = () => [0, 0, 0]
  }

  let z = function () {
    // .................. pics
    let eotim = {'td': 9800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tp: t => Math.sin((Math.PI / 2) * t)}

    // .................. textAni
    let textAni = {

      eohal: eonEohalTextform,
      eotim: eotim,
      eoric: {'gid': 'text', 'cid': 'text', 'fid': 'text'},
      eofold: ani => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0] },
      }),
      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ 180, -180 ],
        },
      },
      eocrom: { 'csx': 0, 'cf': [[[888, 777]]], 'cs': 111, 'cw': [[[0.1, 0.7]]], 'co': [[[0.6, 0.99]]], 'cp': [[[0.5, 0.5]]]},
      eoload: {
        textform: {
          string: 'eon-z-263a roses',
          style: { 'font-size': [[[12, 12]]] },
        },
      },
    }
    // .................. aniForm
    let aniForm = {

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

    // .................. animas
    let animas = [

      aniForm, //
      textAni, // h.text

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ263aRoses = anitem
}))
