/* ******************************************
   *    @eonZ189fChristmasTreestarsPacer
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ189fChristmasTreestarsPacer = global.eonZ189fChristmasTreestarsPacer || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    // eonCtlRayder,
    eonCtlWen,
    eonEohalFuel,
    eonEohalNatform,
    eonEohalPacer,
    eonEohalTextform,
    eonEohalMars,
    eonMuonEoric,
    eonMuonFuel,
    eonMuonGeoj,
    eonMuonGraticule,
    eonMuonNatform,
    eonMuonProps,
    eonMuonStace,
    eonProtonUniwen,
    eonRenderSvg,
  ] = await Promise.all([
    // __eo('xs').b('eon-ctl-rayder'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-fuel'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-eohal-pacer'),
    __eo('xs').b('eon-eohal-textform'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-eoric'),
    __eo('xs').b('eon-muon-fuel'),
    __eo('xs').b('eon-muon-geoj'),
    __eo('xs').b('eon-muon-graticule'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-props'),
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
          'm1': 3, 'm2': 3, 'n1': 100, 'n2': 200, 'n3': 200, 'a': 1, 'b': 1,
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 3, 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
        },
        y: {
          'm1': 3, 'm2': 3, 'n1': 100, 'n2': 200, 'n3': 200, 'a': 1, 'b': 1,
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 3, 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
        },
      },
      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ 0, 0 ], //
          scale: [1, 1.5, 1],
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

      eohal: eonEohalPacer,
      eotim: eotim,
      eoric: { gid: 'pacer', cid: 'pacer', fid: 'pacer' },

      eofold: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {orgen: [0, 0, 0], velin: [0, 0, 0], velang: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
      },

      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {orgen: [0, 0, 0], velin: [0, 0, 0], velang: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
      },

      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ 0, 0, 0], // mot
          scale: 1,
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity],
          addNodeToTranslate: 1, // eonode
        },
      },

      eocrom: { 'csx': 0, 'cf': 777, 'co': 0.1, 'cs': 666 + 200 * (0.5 - Math.random()), 'cw': 1.5, 'cp': 1},

      eoform: {
        x: {
          'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': 15, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
        },
        y: {
          'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': 15, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
        },
      },

      eoload: {

        pacer: {

          initN: 0, eventN: 0, autoN: 9, autoP: 0.01, outtimed: 0, maxN: 60, geospan: 0,
          pacedAnisort: 'anigram', // anigram if avatar
          basePaceOnAniView: 'viewform',
          addItemToPacer: 0,

          eohal: eonEohalNatform, // takes form from eoform
          eoric: function (ani, props) {
            let eoric = eonMuonProps.clone(ani.eoric)
            eoric.gid = 'paced'
            eoric.cid = 'paced'
            eoric.fid = eonMuonEoric.idify(eoric.fid, props.counter)
            eoric.uid = eonMuonEoric.getuid(eoric)
            return eoric
          },

          eofold: function (ani, props) {
            let neweofold = eonMuonNatform.natMultiLineString({eoform: ani.eoform})

            return neweofold
          },

          eonode: function (ani, props) {
            let coords
            if (props.key === 'init') { // INIT
              let autocount = props.counter

              let rows = 4
              let cols = 6
              let hstep = 1
              let vstep = 1

              let ridx = eonMuonGraticule.ridx(rows, cols, hstep, vstep)
              let matrixCoord = ridx(autocount)

              let dRadX = 20
              let dRadY = 20
              let dLenX = 2 * dRadX
              let dLenY = 2 * dRadY
              let dCenter = [-140, -40]

              let delta = [
                dLenX + dRadX * Math.random(),
                dLenY + dRadY * Math.random(),
              ]

              coords = [
                dCenter[0] + delta[0] * matrixCoord[0],
                dCenter[1] + delta[1] * matrixCoord[1],
                0]
            } else if (props.key === 'auto') { // AUTO
              let autocount = props.counter

              let fuel = {
                ra2: 6,
                candidates: 6,
                sample: 1,
                fueltype: 2,
              }

              let candycoords = eonMuonFuel.getCandyCooords(ani, fuel)

              if (candycoords !== undefined && candycoords.length > 0) {
                coords = [ ...candycoords[0], 0 ]
              }
            } else if (props.key === 'event') { // EVENT
              if (eonCtlRayder.grabbed() !== undefined) {
                let grabbed = eonCtlRayder.grabbed()
                let x = grabbed[0]
                let y = grabbed[1]
                let z = 0
                coords = {x, y, z }
              }
            }

            let res

            if (coords !== undefined) {
              let coordinates = coords
              res = {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: coordinates,
                },
                properties: {orgen: [0, 0, 0], velin: [0, 0, 0], velang: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
              }
            }
            return res
          },

        },
      },

    }

    natTree.avatars = {
      natStar,
    }

    // .................. animas
    let animas = [
      natTree,
      // natStar,
    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ189fChristmasTreestarsPacer = anitem
}))
