/* ******************************************
   *    @eonZ511aNatText
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ511aNatText = global.eonZ511aNatText || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlWen,
    eonEohalTextform,
    eonEohalMars,
    eonMuonNatform,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-textform'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  let ctl
  try {
    ctl = eonCtlWen().control(eonRenderSvg.svg())
  } catch (e) {
    ctl = () => [0, 0, 0]
  }
  // .................. animas
  let z = function () {
    // .................. pics

    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}
    let formCirc = {

      'x': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
        'ra2': 100, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,

      },

      'y': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
        'ra2': 100, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,

      },

    }

    let formNat = {

      'x': {
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
        'ra2': 100, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': 360,

      },

      'y': {
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
        'ra2': 100, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': 360,

      },

    }

    let stace = {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 100, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,

    }

    let proform = {
      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [ [0, 0, 0], [[[ stace ]]] ],
      scale: 1,
      rotate: [ 0, 0 ],
      lens: [0, 1, Infinity],

    }

    // .................. text
    let textAni = {

      eohal: eonEohalTextform,
      eotim: eotim,
      eoric: {'gid': 'text', 'cid': 'text', 'fid': 'text'},

      eofold: ani => {
        let res = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0],
          },
        }
        return res
      },

      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ -100, 0 ],
        },
      },

      eocrom: { 'csx': 0, 'cf': [[[888, 777]]], 'cs': 111, 'cw': [[[0.1, 0.7]]], 'co': [[[0.6, 0.99]]], 'cp': [[[0.5, 0.5]]]},

      eoload: {
        textform: {
          string: 'laws are valid only if rulers believe in them',
          style: {
            rotate: [[[ 0, 1 ]]],
            'font-size': [[[10, 60]]],
            'font-family': 'BankFuturistic',
            'text-anchor': 'center',
          },
        },

      },
    }

    // .................. natAni
    let natAni = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat'},

      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoload.eoform}),

      eonode: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0, 0] },
        properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
      },

      eomot: {
        proform: proform,
      },

      eocrom: { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.9, 0.9]]], 'cs': [[[555, 666]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.7, 0.9]]]},

      eoload: {
        eoform: formNat,
      },

    }

    // .................. circAni
    let circAni = {

      eohal: eonEohalMars,
      eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'circ'},

      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoload.eoform}),

      eonode: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0, 0] },
        properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
      },

      eomot: {
        proform,
      },

      eocrom: { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.19, 0.19]]], 'cs': [[[111, 666]]], 'cw': [[[0.3, 0.9]]], 'cp': [[[0.7, 0.9]]]},

      eoload: {
        eoform: formCirc,
        eoinited: 0,
        eogelded: 1,

      },
    }

    // .................. scene
    let scene = {

      natAni, // h.mars
      circAni, // h.mars
      textAni, // h.text

    }

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ511aNatText = anitem
}))
