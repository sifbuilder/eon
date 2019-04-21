/* ******************************************
   *    @eonZ720aFourierRhyno
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ720aFourierRhyno = global.eonZ720aFourierRhyno || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonDatRhyno,
      eonEohalMars,
      eonEohalPacer,
      eonEohalFourier,
      eonMuonFourier,
      eonMuonGeoj,
      eonMuonProj3ct,
      eonMuonProfier,
      eonMuonStace,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-dat-rhyno'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-pacer'),
      __eo('xs').b('eon-eohal-fourier'),
      __eo('xs').b('eon-muon-fourier'),
      __eo('xs').b('eon-muon-geoj'),
      __eo('xs').b('eon-muon-proj3ct'),
      __eo('xs').b('eon-muon-profier'),
      __eo('xs').b('eon-muon-stace'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    let eonMuonStore = __eo('eonMuonStore')

    // .................. animas
    let z = function () {
    // .................. pics
      let eotim = {'td': 63800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      // ...  ## rhyno data from m.animas('shapes').rhyno
      let svgdata = JSON.parse(eonDatRhyno.data())

      // ...  define data as LineString
      let data = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: svgdata,
        },
      }

      let proform = {
        projection: 'uniwen',
        translate: [ -100, 100 ],
        scale: [1, -1],
        rotate: [ 0, 0 ],
        lens: [0, 1, Infinity],
      }

      // ...  get geoData from uniwen projection with inverse y-scale
      // ...  the get the data features (transforms)
      // ...  span data along [0, 1] interval
      // ...  and create FeatureCollection with trasform features

      let geoData = eonMuonProj3ct(data, eonMuonProfier.formion(proform, z))
      let transforms = eonMuonFourier.transformedCoefs(geoData)
      transforms = eonMuonGeoj.ntime(transforms, [0, 1])

      // ... rayline LineString

      let rayline = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: { gid: 'pol', cid: 'pol', fid: 'pol'},

        eofold: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: []},
          properties: {},
        },

        eocrom: { 'csx': 0, 'cf': 555, 'cs': 777, 'cw': 0.99, 'co': 1, 'cp': 1},
        eoload: {},

      }

      // ... traceline LineString trace

      let traceline = {

        eohal: eonEohalPacer,
        eotim: eotim,
        eoric: {gid: 'ava', cid: 'ava', fid: 'traceline'},

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

            initN: 0, eventN: 0, autoN: 1, autoP: 0, autoT: 0, outtimed: 0, maxN: 60,

            addItemToPacer: 1,
            geospan: 0,

            pacedAnisort: 'anigram',
            basePaceOnAniView: 'viewform',

            eohal: eonEohalMars,

            eofold: function (ani, props) {
              let coords
              if (props.key === 'init') { // INIT
                coords = ani.eonode.geometry.coordinates
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
                stace = eonMuonStace.getLocus([null, null, null], ani)
              } else if (props.key === 'auto') { // AUTO
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

      // ... fourierAni carries the transforms in the eofold
      // ...  h.fourier
      // ...  bears traceline and rayline avatars
      // ...  the rayline is a LineString between each two transforms
      // ...  the traceline is a paced LineString on the last transform

      let fourierAni = {

        eohal: 'fourier',
        eotim: eotim,
        eoric: { gid: 'fourier', cid: 'fourier', fid: 'fourier'},

        eofold: p => ({
          type: 'FeatureCollection',
          features: transforms,
        }),

        eocrom: {'csx': 0, 'cf': 555, 'cs': 999, 'cw': 0.095, 'co': 0.092, 'cp': 0.99},

        eoload: {
          fourier: {

            pacedAnisort: 'anigram',

            transforms: transforms,
            interval: [0.0, 0.99],
            tolerance: 0.1, // 0.1

            doteocrom: {'csx': 0, 'cf': 888, 'cs': 999, 'cw': 0.9, 'co': 0.01, 'cp': 0.7},

            // ... fourierAni.eoload.fourier avatars are defined by name: traceline, rayline

            avatars: {

              traceline: traceline,
              rayline: rayline,

            },
          },
        },
      }

      // .................. animas
      let animas = [

        fourierAni, // h.fourier

      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ720aFourierRhyno = anitem
}))
