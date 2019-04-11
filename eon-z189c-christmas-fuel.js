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
    ctlRayder,
    ctlWen,
    eohalFuel,
    eohalNatform,
    eohalPacer,
    eohalTextform,
    eohalMars,
    muonGeoj,
    muonNatform,
    muonStace,
    protonUniwen,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').c('rayder'),
    __eo('xs').c('wen'),
    __eo('xs').e('fuel'),
    __eo('xs').e('natform'),
    __eo('xs').e('pacer'),
    __eo('xs').e('textform'),
    __eo('xs').e('mars'),
    __eo('xs').m('geoj'),
    __eo('xs').m('natform'),
    __eo('xs').m('stace'),
    __eo('xs').p('uniwen'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
  let muonStore = __eo('muonStore')

  // .................. animas
  let z = function () {
    // .................. pics
    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // ....................... natTree
    let natTree = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'natTree'},

      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),
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

      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),
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
