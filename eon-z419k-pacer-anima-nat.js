/* ******************************************
   *    @eonZ419kPacerAnimaNat
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ419kPacerAnimaNat = global.eonZ419kPacerAnimaNat || {})))
}(this, function (exports) {
  'use strict'

  // .................. anitem
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
      eonMuonGraticule,
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
      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-muon-stace'),
      __eo('xs').b('eon-proton-uniwen'),
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

      // ....................... pacerNat
      let pacerNat = {

        eohal: eonEohalPacer,
        eoric: { gid: 'natpace', cid: 'natpace', fid: 'natpace' },

        eoload: {

          pacer: {

            pacedby: {
              initN: 24, eventN: 0, autoN: 0, autoP: 0.01,
              outtimed: 0, maxN: 60, geospan: 0,
              pacedAnisort: 'anima',
              basePaceOnAniView: '', // undefined, base on resulting geofold
              addItemToPacer: 0, // geometries will not be accumulated

            },

            anima: {
              eotim: eotim,
              eohal: eonEohalMars,

              eoric: function (ani, props) {
                let autocount = props.counter
                let eoric = eonMuonProps.clone(ani.eoric)
                eoric.fid = eonMuonEoric.idify(eoric.fic, autocount)
                eoric.uid = eonMuonEoric.getuid(eoric)
                return eoric
              },

              eofold: function (ani, props) {
                return a => eonMuonNatform.natMultiLineString({eoform: a.eoload.eoform})
              },

              eonode: function (ani, props) {
                let stace = [0, 0, 0]
                if (props.key === 'init') { // INIT
                  let autocount = props.counter

                  let ridx = eonMuonGraticule.ridx(4, 6, 1, 1)

                  let k = [40, 40]
                  let d = [-140, -40]

                  stace = [d[0] + k[0] * ridx(autocount)[0],
                    d[1] + k[1] * ridx(autocount)[1],
                    0]
                } else if (props.key === 'auto') { // AUTO
                  stace = [0, 0, 0]
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

              eomot: {
                proform: {
                  projection: 'uniwen',
                  translate: [ 0, 0, 0], // mot
                  scale: 1,
                  rotate: [ [[[0, 60]]], [[[0, 60]]], [[[0, 60]]] ],
                  prerotate: [[[ ctl.rotation ]]],
                  lens: [0, 1, Infinity],
                  addNodeToTranslate: 1, // eonode
                },
              },

              eoload: {
                eocrom: { 'csx': 0, 'cf': 777, 'co': 0.1, 'cs': 666 + 200 * (0.5 - Math.random()), 'cw': 1.5, 'cp': 1},
                eoform: {
                  'x': {
                    'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
                    'ra2': 24, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 20, 'pa6': 0, 'pb7': -1,
                  },
                  'y': {
                    'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
                    'ra2': 24, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 20, 'pa6': 0, 'pb7': -1,
                  },
                  'z': {
                    'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
                    'ra2': 24, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 10, 'pa6': 0, 'pb7': -1,
                  },
                },

              },
            },
          },
        },
      }

      // .................. scene
      let scene = {
        pacerNat, // h.pacer
      }

      return scene
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ419kPacerAnimaNat = anitem
}))
