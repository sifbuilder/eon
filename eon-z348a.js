/* ******************************************
   *    @eonZ348a
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ348a = global.eonZ348a || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlRayder,
    eonCtlWen,
    eonEohalNatform,
    eonEohalMars,
    eonEohalPacer,
    eonEohalTextform,
    eonMuonEoric,
    eonMuonNatform,
    eonMuonProps,
    eonMuonStace,
    eonProtonUniwen,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-rayder'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-pacer'),
    __eo('xs').b('eon-eohal-textform'),
    __eo('xs').b('eon-muon-eoric'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-muon-stace'),
    __eo('xs').b('eon-proton-uniwen'),
    __eo('xs').b('eon-render-svg'),
  ])

  let eonMuonStore = __eo('eonMuonStore')
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    // .................. pics
    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // ....................... pacerNat
    let pacerNat = {

      eohal: eonEohalPacer,
      eotim: eotim,
      eoric: { gid: 'pacer', cid: 'pacer', fid: 'pacer' },

      eofold: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0, 0] },
        properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
      },

      eonode: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0, 0] },
        properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
      },

      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ [[[0, 250]]], 0, 0], // mot
          scale: 1,
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity],
          addNodeToTranslate: 1, // eonode
        },
      },

      eocrom: { 'csx': 0, 'cf': 777, 'co': 1, 'cs': 666 + 200 * (0.5 - Math.random()), 'cw': 1.5, 'cp': 1},

      eoform: {
        x: {
          'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': [[[6, 60]]], 'v0': 0, 'v1': 1, 'seg5': 36, 'w4': 0, 'pa6': 0, 'pb7': 360,
        },
        y: {
          'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': [[[6, 60]]], 'v0': 0, 'v1': 1, 'seg5': 36, 'w4': 0, 'pa6': 0, 'pb7': 360,
        },
      },

      eoload: {

        pacer: {

          initN: 3, eventN: 0, autoN: 0, autoP: 0.1, outtimed: 0, maxN: 60, geospan: 0,
          pacedAnisort: 'anima',
          basePaceOnAniView: '',
          addItemToPacer: 0,

          eohal: eonEohalMars,

          eoric: function (ani, props) {
            let eoric = eonMuonProps.clone(ani.eoric)

            if (props.key === 'init') { // INIT
              let q = eonMuonStore.animasInClassHowMany(eoric)
              let nextq = q + props.counter
              eoric.fid = eonMuonEoric.idify(eoric.fid, props.key, nextq)
            } else if (props.key === 'auto') { // AUTO
              let q = eonMuonStore.animasInClassHowMany(eoric)
              let nextq = q + props.counter
              eoric.fid = eonMuonEoric.idify(eoric.fid, props.key, nextq)
            } else if (props.key === 'event') { // EVENT
              let q = eonMuonStore.animasInClassHowMany(eoric)
              let nextq = q + props.counter
              eoric.fid = eonMuonEoric.idify(eoric.fid, props.key, nextq)
            }

            eoric.uid = eonMuonEoric.getuid(eoric)
            return eoric
          },

          eofold: function (ani, props) {
            let neweofold = ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform})
            return neweofold
          },

          eonode: function (ani, props) {
            let stace = [0, 0, 0]
            if (props.key === 'init') { // INIT
              let autocount = props.counter
              let C1 = 50
              let C2 = 2 // correlate with initN
              stace = [0, Math.pow(-1, autocount) * C1 * Math.max(1, autocount % C2), 0]

              if (1 && 1) console.log('stace', stace)
            } else if (props.key === 'auto') { // AUTO
              stace = [ 0 + 20 * Math.random(), 0 + 20 * Math.random(), 0]
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
              geometry: { type: 'Point', coordinates: coordinates },
              properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
            }
            return res
          },

        },
      },
    }

    // .................. textAni
    let textAni = {
      eohal: eonEohalTextform,
      eotim: eotim,
      eoric: {'gid': 'text', 'cid': 'text', 'fid': 'text'},
      eofold: ani => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0] },
      }),
      eocrom: { 'csx': 0, 'cf': [[[888, 777]]], 'cs': 111, 'cw': [[[0.1, 0.7]]], 'co': [[[0.6, 0.99]]], 'cp': [[[0.5, 0.5]]]},
      eomot: {
        proform: {
          projection: 'uniwen', translate: [ 175, -150 ] },
      },
      eoload: {
        textform: {
          string: 'eon-z-348a',
          style: {
            'font-size': 12,
          },
        },
      },
    }

    // .................. animas
    let animas = [
      pacerNat, // h.pacer
      textAni, //

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ348a = anitem
}))
