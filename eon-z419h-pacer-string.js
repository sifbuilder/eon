/* ******************************************
   *    @eonZ419hPacerString
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ419hPacerString = global.eonZ419hPacerString || {})))
}(this, function (exports) {
  'use strict'

  // .................. anitem
  async function anitem (__eo) {
    // .................. eons
    let [
      eonCtlWen,
      eonMuonNatform,
      eonMuonStace,
      eonMuonGeoj,
      // eonCtlRayder,
      eonEohalMars,
      eonEohalNatform,
      eonEohalPacer,
      eonEohalTextform,
      eonProtonUniwen,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-stace'),
      __eo('xs').b('eon-muon-geoj'),
      // __eo('xs').b('eon-ctl-rayder'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-natform'),
      __eo('xs').b('eon-eohal-pacer'),
      __eo('xs').b('eon-eohal-textform'),
      __eo('xs').b('eon-proton-uniwen'),
      __eo('xs').b('eon-render-svg'),
    ])

    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    let eonMuonStore = __eo('eonMuonStore')
    // eonCtlRayder.control()
    // eonCtlRayder.showpos(true)

    // .................. animas
    let z = function () {
      // .................. pics
      let eotim = {'td': 1000, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      // .................. geoLined
      let geoLined = {

        eohal: eonEohalPacer,
        eotim: eotim,
        eoric: {gid: 'gline', cid: 'cline', fid: 'fline'},

        eofold: {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: [ [0, 0], [10, 10] ] },
          properties: {},
        },
        eonode: {
          type: 'Feature',
          geometry: {type: 'Point', coordinates: [0, 0, 0] },
          properties: {
            orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
          },
        },

        // ... the eofold changes form with eofom

        eoform: [ 0, 0, 0], // [ [[[0, 120]]], 0, 0]
        eocrom: {'csx': 0, 'cf': 777, 'cs': 777, 'cw': 0.99, 'co': 0.4, 'cp': 0.99},

        eoload: {
          pacer: {

            // initN: 0, eventN: 1, autoN: 0, autoP: 0, autoT: 0,
            initN: 0, eventN: 0, autoN: 1, autoP: 0.1, autoT: 0.1,
            outtimed: 0, maxN: 60,
            geospan: 0,

            pacedAnisort: 'anigram',
            basePaceOnAniView: '', // 'viewform'
            addItemToPacer: 1, // addItemToPacer for trace

            eohal: eonEohalMars,

            eofold: function (ani, props) {
              let coords

              if (props.key === 'init') { // INIT
                let point = ani.eonode.geometry.coordinates
                coords = Array.of(point) // eonode
              } else if (props.key === 'auto') { // AUTO
                let point = ani.eoform

                point = eonMuonGeoj.geotrim(point) // ... geotrim to fix [num, num, NaN]
                point = [600 * (0.5 - Math.random()), 400 * (0.5 - Math.random()) ]
                console.log('point:', point)
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
                } else {
                  coords = Array.of(point)
                }
              } else if (props.key === 'event') { // EVENT
                let preani = eonMuonStore.findAnigramFromUid(ani.eoric.uid)

                let grabbed = eonCtlRayder.getGrabbed()
                if (grabbed !== undefined) {
                  let x = grabbed[0]
                  let y = grabbed[1]
                  let z = 0
                  let point = [ x, y, z ]

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
                  } else {
                    coords = Array.of(point)
                  }
                }
              }

              let geometry = {
                type: 'LineString',
                coordinates: coords,
              }
              console.assert(eonMuonGeoj.isValid(geometry), `geo ${geometry} not valid gj`)

              return {
                type: 'Feature',
                geometry: geometry,
                properties: {},
              }
            },
            eonode: function (ani, props) {
              let coords = [0, 0, 0]
              if (props.key === 'init') { // INIT
                // coords is ani's transformed eonode

                coords = [0, 0, 0]
              } else if (props.key === 'auto') { // AUTO
                coords = [0, 0, 0]
              } else if (props.key === 'event') { // EVENT
                let grabbed = eonCtlRayder.getGrabbed()
                if (grabbed !== undefined) {
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
      // .................. textAni
      let textAni = {
        eohal: eonEohalTextform,
        eotim: eotim,
        eoric: {'gid': 'text', 'cid': 'text', 'fid': 'text'},
        eofold: ani => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0] },
        }),
        eocrom: { 'csx': 0, 'cf': 888, 'cs': 111, 'cw': 0.5, 'co': 0.9, 'cp': 0.5},
        eomot: {
          proform: { projection: 'uniwen', translate: [ 100, -190 ] },
        },
        eoload: {
          textform: {
            string: 'paced adding dots',
            style: { 'font-size': 16 },
          },
        },
      }
      // .................. scene
      let scene = {
        geoLined,
        textAni,
      }
      return scene
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ419hPacerString = anitem
}))
