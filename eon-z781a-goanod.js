/* ******************************************
   *    @eonZ781aGoanod
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ781aGoanod = global.eonZ781aGoanod || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3Force3d,
    eonCtlRayder,
    eonEohalCore,
    eonEohalNatform,
    eonEohalMars,

    eonMuonEoric,
    eonMuonEoforces,
    eonMuonNatform,
    eonMuonProps,
    eonRenderPortview,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3-force-3d'),
    __eo('xs').b('eon-ctl-rayder'),
    __eo('xs').b('eon-eohal-core'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-eohal-mars'),

    __eo('xs').b('eon-muon-eoric'),
    __eo('xs').b('eon-muon-eoforces'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-render-portview'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  let eonMuonStore = __eo('eonMuonStore')

  // .................. animas
  let z = function () {
    // .................... pics
    let eotim = {'td': 12800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // .................... natAni2
    let natAni2 = {

      eohal: eonEohalMars,
      eoric: {gid: 'ani', cid: 'ani', fid: 'ani2'},
      eotim: eotim,

      eofold: function (p) {
        return eonMuonNatform.natMultiLineString({eoform: p.eoform})
      },

      eonode: {
        type: 'Feature',
        geometry: null,
      },

      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ 0, -100, 0],
          scale: 1,
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, 12],
          addNodeToTranslate: 1, // eonode
        },
      },

      eocrom: { 'csx': 0, 'cf': 888, 'co': 0.5, 'cs': 666, 'cw': 0.9, 'cp': 0.8 },

      eoform: {
        'x': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
          'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 12, 'w4': 90, 'pa6': 0, 'pb7': 360,
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
          'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 12, 'w4': 90, 'pa6': 0, 'pb7': 360,
        },
        'z': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
          'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 12, 'w4': 90, 'pa6': 0, 'pb7': 360,
        },
      },
      eoload: {},
    }

    // .................. scene
    let scene = {

      natAni2, // h.mars

    }

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ781aGoanod = anitem
}))