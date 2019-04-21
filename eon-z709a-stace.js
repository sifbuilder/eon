/* ******************************************
   *    @eonZ709aStace
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ709aStace = global.eonZ709aStace || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonMuonNatform,
    eonEohalMars,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) { }
  // .................. animas
  let z = function () {
    // .................. pics
    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let formNat = {

      'x': {
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
        'ra2': 100, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,

      },

      'y': {
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
        'ra2': 100, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,

      },

    }

    let stace = {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 4, 'b': 2, // circle
      'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,

    }

    let proform = {
      projection: 'uniwen',
      translate: [ [0, 0, 0], [[[ stace ]]] ],
      scale: 1,
      rotate: [ 0, 0, [[[0, 0]]] ],
      lens: [0, 1, 12],
    }

    // .................. natAni anima
    let natAni = {

      eohal: eonEohalMars,

      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),

      eotim: eotim,
      eoric: {'gid': 'nat', 'cid': 'nat', 'fid': 'nat'},
      eomot: {
        proform: proform,
      },
      eonode: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0, 0] },
        properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
      },

      eocrom: { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.9, 0.9]]], 'cs': [[[555, 666]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.7, 0.9]]]},

      eoform: formNat,
      eoload: {

      },

    }

    // .................. animas
    let animas = [
      natAni, // h.mars

    ]

    return animas
  }
  // .................. enty
  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ709aStace = anitem
}))
