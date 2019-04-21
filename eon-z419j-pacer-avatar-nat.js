/* ******************************************
   *    @eonZ419jPacerAvatarNat
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ419jPacerAvatarNat = global.eonZ419jPacerAvatarNat || {})))
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

    // ....................... aniNat
    let aniNat = {

      eohal: eonEohalMars,

      // ... eonode reflects the geometry of the form
      // ... updated by transforms
      // ... relative to eonode
      // ... as eonode, properties keep transformed views
      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),

      eotim: eotim,
      eoric: {'gid': 'nat', 'cid': 'nat', 'fid': 'nat'},
      eocrom: { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.29, 0.29]]], 'cs': [[[555, 666]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.7, 0.9]]]},
      eomot: {
        proform: {
          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          // translate: [ [ 70, 80 ], [[[ {
          // 'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 4, 'b': 2, // circle
          // 'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
          // } ]]] ],
          translate: [ [[[0, 100]]], 0, 0],
          scale: 1,
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity],
        },
      },
      // ... eonode is reference to eofold
      // ... updated by sim forces
      // ... as eofold, properties keep transformed views
      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        // ... orgen, velin, prevous needed in force fields
        properties: {
          orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
        },
      },
      eoform: {
        'x': {
          'm1': 3, 'm2': 3, 'n1': 1, 'n2': 1.2, 'n3': 1.2, 'a': 1, 'b': 1, // reaulau
          'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 12, 'w4': 0, 'pa6': 0, 'pb7': 360,
        },
        'y': {
          'm1': 3, 'm2': 3, 'n1': 1, 'n2': 1.2, 'n3': 1.2, 'a': 1, 'b': 1, // reaulau
          'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 12, 'w4': 0, 'pa6': 0, 'pb7': 360,
        },
      },

      eoload: {},

    }

    // ....................... traceNat
    let traceNat = {

      eohal: eonEohalPacer,

      eotim: eotim,

      eoric: {
        gid: 'nat', cid: 'nat', fid: 'tracenat' },

      eofold: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
      },

      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
      },

      eocrom: { 'csx': 0, 'cf': 777, 'co': 1, 'cs': 666 + 200 * (0.5 - Math.random()), 'cw': 1.5, 'cp': 1},

      eoform: {
        'x': {
          'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': [[[24, 24]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
        },
        'y': {
          'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': [[[24, 24]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
        },
      },

      eoload: {
        pacer: {
          eohal: eonEohalMars,
          pacedAnisort: 'anigram',
          basePaceOnAniView: 'viewform',
          initN: 1, eventN: 0, autoN: 0, autoP: 0, outtimed: 0, maxN: 60,
          geospan: 0,
          addItemToPacer: 0,

          eofold: function (ani, props) {
            let locus = eonMuonStace.getLocus([null, null, null], ani)

            let point = {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: eonMuonStace.getLocus([null, null, null], ani),
              },
            }
            let form = eonMuonNatform.natMultiLineString({eoform: ani.eoform})
            let eofold = eonMuonGeoj.extrapol(form, point)

            return eofold
          },

          // ... traceNat eonode is set to motted aniNat eonode
          // ... traceLine eonode coords get traceNat eonode

          eonode: function (ani, props) {
            let coords = [0, 0, 0]
            if (props.key === 'init') { // INIT
              coords = eonMuonStace.getLocus([null, null, null], ani)
            } else if (props.key === 'auto') { // AUTO
              coords = [0, 0, 0]
            } else if (props.key === 'event') { // EVENT
              if (eonCtlRayder.grabbed() !== undefined) {
                let grabbed = eonCtlRayder.grabbed()
                let x = grabbed[0]
                let y = grabbed[1]
                let z = 0
                coords = {x, y, z }
              }
            }

            let coordinates = coords

            let res = {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: coordinates,
              },
              properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
            }
            return res
          },

        },
      },
    }

    // ............................. traceLine
    let traceLine = {

      eohal: eonEohalPacer,
      eotim,
      eoric: {gid: 'traces', cid: 'traces', fid: 'traceLine'},

      eofold: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: null,
        },
        properties: {},
      },

      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {},
      },

      eocrom: {'csx': 0, 'cf': 444, 'cs': 666, 'cw': 0.99, 'co': 0.4, 'cp': 0.99},

      eoload: {
        pacer: {
          initN: 0, eventN: 0, autoN: 1, autoP: 0, autoT: 0, outtimed: 0, maxN: 60,

          addItemToPacer: 1, // addItemToPacer for trace

          pacedAnisort: 'anigram',
          basePaceOnAniView: 'viewform',
          geospan: 0,

          eohal: eonEohalMars,

          eofold: function (ani, props) {
            let coords
            if (props.key === 'init') { // INIT
              coords = ani.eonode.geometry.coordinates // eonode
            } else if (props.key === 'auto') { // AUTO
              let point = eonMuonStace.getLocus([null, null, null], ani)

              point = eonMuonGeoj.geotrim(point) // ... geotrim to fix [num, num, NaN]

              let preani = eonMuonStore.findAnigramFromUid(ani.eoric.uid)
              if (preani) {
                if (preani.eofold.type === 'FeatureCollection') {
                  let feature = preani.eofold.features[0]
                  coords = (feature.geometry.coordinates)
                    ? [...feature.geometry.coordinates, point ]
                    : Array.of(point)
                } else if (preani.eofold.type === 'Feature') {
                  let feature = preani.eofold
                  coords = (feature.geometry.coordinates)
                    ? [...feature.geometry.coordinates, point ]
                    : Array.of(point)
                }
              }
            } else if (props.key === 'event') { // EVENT
              coords = ani.eonode.geometry.coordinates
            }

            console.assert(coords !== undefined && coords !== null)
            let geometry = {
              type: 'LineString',
              coordinates: coords,
            }
            console.assert(eonMuonGeoj.isValid(geometry))

            return {
              type: 'Feature',
              geometry: geometry,
              properties: {},
            }
          },

          eonode: function (ani, props) {
            let stace = [0, 0, 0]
            if (props.key === 'init') { // INIT
              // stace is ani's transformed eonode
              stace = eonMuonStace.getLocus([null, null, null], ani)
            } else if (props.key === 'auto') { // AUTO
              stace = eonMuonStace.getLocus([null, null, null], ani)
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
              properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
            }
            return res
          },

        },
      },
    }

    // ....................... traceNat
    traceNat.avatars = {

      traceLine, // h.pacer

    }
    // ....................... aniNat
    aniNat.avatars = {

      // ... aniNat is a h.mars anima
      // ... it is proform-projected
      // ... viewform is then the result of proform
      // ... carries traceNat as avatar

      // ... traceNat is a h.pacer avatar
      // ... as avatar, arrives as anigram to the mars cycle
      // ... does not specify position or motion
      // ... its location relies on aniNat eonode

      traceNat, // h.pacer

    }

    // .................. animas
    let animas = [
      aniNat, // h.pacer

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ419jPacerAvatarNat = anitem
}))
