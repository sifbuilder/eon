/* ******************************************
   *    @eonZ419bPacerStringAvatarGramify
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ419bPacerStringAvatarGramify = global.eonZ419bPacerStringAvatarGramify || {})))
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
    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}
    let eocrom = { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.029, 0.29]]], 'cs': [[[555, 666]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.7, 0.9]]] }
    // ............................. avaline
    let avaline = {

      eohal: eonEohalPacer,
      eotim: eotim,
      eoric: {gid: 'ava', cid: 'ava', fid: 'avaline'},

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
        pacer: { // addItemToPacer for trace

          initN: 0, eventN: 0, autoN: 1, autoP: 0, autoT: 0, 
          outtimed: 0, maxN: 60,


          geoaad: 1,

          addItemToPacer: 1,
          geospan: 0,

          pacedAnisort: 'anigram',
          basePaceOnAniView: 'viewform',

          eohal: eonEohalMars,

          eofold: function (ani, props) {
            let coords
            if (props.key === 'init') { // INIT
              coords = ani.eonode.geometry.coordinates // eonode
            } else if (props.key === 'auto') { // AUTO
              let point = eonMuonStace.getLocus([null, null, null], ani)
              console.log('point:', point)

              point = eonMuonGeoj.geotrim(point) // ... geotrim to fix [num, num, NaN]
              console.log('eoric:', ani.eoric.uid)
              let preani = eonMuonStore.findAnigramFromUid(ani.eoric.uid)
              if (preani) {
                if (preani.eofold.type === 'FeatureCollection') {
                  let feature = preani.eofold.features[0]
                  coords = (feature.geometry.coordinates) // point
                    ? [feature.geometry.coordinates, point ]
                    : Array.of(point)
                } else if (preani.eofold.type === 'Feature') {
                  let feature = preani.eofold
                  coords = (feature.geometry.coordinates)
                    ? [...feature.geometry.coordinates, point ]
                    : Array.of(point)
                }
              } else {
                coords = Array.of(point)
              }
            } else if (props.key === 'event') { // EVENT
              coords = ani.eonode.geometry.coordinates
            }

            console.assert(coords !== undefined && coords !== null, `coords undefined`)

            let geometry = {
              type: 'LineString',
              coordinates: coords,
            }
            console.assert(eonMuonGeoj.isValid(geometry), `gj invalid`)

            let res = {
              type: 'Feature',
              geometry: geometry,
              properties: {},
            }
            return res
          },

          eonode: function (ani, props) {
            let stace = [0, 0, 0]
            if (props.key === 'init') { // INIT
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

    // ............................. aniLine
    let aniLine = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'aniLine'},

      eofold: a => ({
        type: 'Feature',
        geometry: {
          // type: 'Point', //  'LineString', // type: 'Point', //
          // coordinates: [0, 0], //  [ [0, 0], [50, 50] ], // coordinates: [0,0] //
          type: 'LineString', // type: 'Point', //
          coordinates: [ [0, 0], [50, 50] ], // coordinates: [0,0] //          
        },
        properties: { pointRadius: 9 },
      }),

      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0],
        },
        properties: {orgen: [0, 0], velin: [0, 0], velang: [0, 0], prevous: [0, 0], geodelta: [0, 0]},
      },

      eomot: {
        proform: {
          projection: 'uniwen',
          // translate: [ [[[0, 200]]], 0 ],
          translate: [ [ 0, 0 ], [[[ {
            'm1': 3, 'm2': 3, 'n1': 100, 'n2': 200, 'n3': 200, 'a': 1, 'b': 1,
            'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 6, 'pa6': 0, 'pb7': -1,
          } ]]] ],
          scale: 1,
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity],
          applyProtonToNode: 1,
        },
      },
      eocrom: eocrom,
      eoload: {},
      avatars: {

        // avaline, // h.pacer

      },
    }


    // .................. scene
    let scene = {
      aniLine, // h.pacer

    }

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ419bPacerStringAvatarGramify = anitem
}))
