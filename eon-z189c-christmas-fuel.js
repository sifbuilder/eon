/* ******************************************
   *    @eonZ189cChristmasFuel
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ189cChristmasFuel = global.eonZ189cChristmasFuel || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlRayder,
    eonCtlWen,
    eonEohalFuel,
    eonEohalNatform,
    eonEohalPacer,
    eonEohalTextform,
    eonEohalMars,
    eonMuonGeoj,
    eonMuonNatform,
    eonMuonStace,
    eonProtonUniwen,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-rayder'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-fuel'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-eohal-pacer'),
    __eo('xs').b('eon-eohal-textform'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-geoj'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-stace'),
    __eo('xs').b('eon-proton-uniwen'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  let eonMuonStore = __eo('eonMuonStore')

  // .................. animas
  let z = function () {
    // .................. pics
    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // ....................... natTree
    let natTree = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'natTree'},

      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
      eonode: {
        type: 'Feature',
        geometry: {type: 'Point', coordinates: [0, 0, 0]},
        properties: {orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
      },
      eoform: {
        x: {
          'm1': 3, 'm2': 3, 'n1': 100, 'n2': 200, 'n3': 200, 'a': 1, 'b': 1,
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 6, 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
        },
        y: {
          'm1': 3, 'm2': 3, 'n1': 100, 'n2': 200, 'n3': 200, 'a': 1, 'b': 1,
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 6, 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
        },
      },
      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ 0, 0 ], //
          scale: [1, 1, 1],
          rotate: [ 0, 0, 30 ],
          lens: [0, 1, Infinity],
        },
      },
      eocrom: { 'csx': 0, 'cf': [[[100, 300]]], 'co': [[[0.29, 0.29]]], 'cs': [[[333, 333]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.7, 0.9]]]},

      eoload: {

      },

    }

    // ....................... natStar
    let natStar = {

      eohal: 'fuel', // 'mars',
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'natStar'},

      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {
          orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
        },
      },
      eoform: {
        x: {
          'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': 15, 'w4': 0, 'pa6': 0, 'pb7': -1,
        },
        y: {
          'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': 15, 'w4': 0, 'pa6': 0, 'pb7': -1,
        },
      },

      eocrom: { 'csx': 0, 'cf': [[[600, 990, 600, 990, 600, 990]]], 'co': [[[0.99, 0.99]]], 'cs': [[[100, 100]]], 'cw': [[[0.2, 0.2]]], 'cp': [[[0.7, 0.9]]]},

      eoload: {
        fuel: {
          f: 2, // which items are showed: 2: just those new
          ra2: 6, //
          candidates: 18, // try candidates
          sample: 8, // to get sample
        },
      },

    }

    natTree.avatars = {natStar}

    // .................. animas
    let animas = [
      natTree,
    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ189cChristmasFuel = anitem
}))
