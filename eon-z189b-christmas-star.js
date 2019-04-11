/* ******************************************
   *    @eonZ189bChristmasStar
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ189bChristmasStar = global.eonZ189bChristmasStar || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    ctlRayder,
    ctlWen,
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
    let ctl
    try {
      ctl = ctlWen().control(renderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // ....................... natLeaform
    let natStar = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat'},

      eocrom: { 'csx': 0, 'cf': [[[999, 999, 999]]], 'co': [[[0.99, 0.99]]], 'cs': [[[999, 999]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.7, 0.9]]]},

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

      eomot: {
        proform: {
          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          translate: [ [ 100, -80 ], [[[ {
            x: {
              'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 6, 'b': 10,
              'ra2': 60, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 200, 'pb7': 360,
              'dom3': [ -80, 180 ],
            },
            y: {
              'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 6, 'b': 10,
              'ra2': 60, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 200, 'pb7': 360,
              'dom3': [ -80, 180 ],
            },
          } ]]] ], //
          scale: 1,
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity],
        },
      },
      eoform: {
        x: {
          'm1': 6, 'm2': 6, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 128, 'w4': 0, 'pa6': 0, 'pb7': -1,
        },
        y: {
          'm1': 6, 'm2': 6, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 128, 'w4': 0, 'pa6': 0, 'pb7': -1,
        },
      },

      eoload: {},

    }

    // .................. scene
    let scene = {
      natStar,
    }

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ189bChristmasStar = anitem
}))