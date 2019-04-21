/* ******************************************
   *    @eonZ419oPacerAvatarNat
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ419oPacerAvatarNat = global.eonZ419oPacerAvatarNat || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlRayder,
    eonCtlWen,
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
  let eonMuonStore = __eo('eonMuonStore')
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // ....................... natAni
    let natAni = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat'},

      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),

      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        // ... orgen, velin, prevous refed in force fields
        properties: {
          orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
        },
      },

      eocrom: { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.29, 0.29]]], 'cs': [[[555, 666]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.7, 0.9]]]},

      eomot: {
        proform: {
          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          translate: [ 0, 0, 0], //
          scale: [ 1, 1 ],
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity],
        },
      },

      eoform: {
        x: {
          'm1': [[[3, 3]]], 'm2': [[[3, 3]]], 'n1': 1, 'n2': 1.2, 'n3': 1.2, 'a': 1, 'b': 1, // reaulau
          'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 24, 'w4': 0, 'pa6': 0, 'pb7': 360,
        },
        y: {
          'm1': 3, 'm2': 3, 'n1': 1, 'n2': 1.2, 'n3': 1.2, 'a': 1, 'b': 1, // reaulau
          'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 24, 'w4': 0, 'pa6': 0, 'pb7': 360,
        },
      },

      eoload: {},

    }

    // ....................... pacerAvatar
    let pacerAvatar = {

      eohal: eonEohalPacer,
      eotim: eotim,
      eoric: { gid: 'nat', cid: 'nat', fid: 'pacerNat' },

      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),

      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
      },

      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [0, 0, 0],
          scale: 1,
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity],
          addNodeToTranslate: 1, // add eonode to projection
        },
      },

      eocrom: { 'csx': 0, 'cf': 777, 'co': 1, 'cs': 666 + 200 * (0.5 - Math.random()), 'cw': 1.5, 'cp': 1},

      eoform: {
        'x': {
          'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
        },
        'y': {
          'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
        },
      },

      eoload: {
        pacer: {

          initN: 0, eventN: 0, autoN: 1, autoP: 0.0001, outtimed: 0, maxN: 60, geospan: 0,

          addItemToPacer: 0,
          pacedAnisort: 'anigram',
          basePaceOnAniView: 'viewform',

          eohal: eonEohalMars,
          eonode: function (ani, props) {
            let stace = [0, 0, 0]
            if (props.key === 'init') { // INIT
              stace = eonMuonStace.getLocus([null, null, null], ani)
            } else if (props.key === 'auto') { // AUTO
              stace = eonMuonStace.getLocus([{pos: 10}, {pos: 10}, {pos: 0}], ani)
            } else if (props.key === 'event') { // EVENT
              if (eonCtlRayder.grabbed() !== undefined) {
                let grabbed = eonCtlRayder.grabbed()
                let x = grabbed[0]
                let y = grabbed[1]
                let z = 0
                stace = {x, y, z }
              }
            }

            let coordinates = stace
            let res = {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: coordinates,
              },
              properties: {orgen: [0, 0, 0], velin: [0, 0, 0], velang: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
            }
            return res
          },

        },
      },
    }

    // ....................... natAni avatars
    natAni.avatars = {

      pacerAvatar, // h.pacer

    }
    // ....................... animapi

    // .................. animas
    let animas = [
      natAni, // h.pacer
    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ419oPacerAvatarNat = anitem
}))
