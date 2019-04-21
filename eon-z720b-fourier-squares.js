/* ******************************************
   *    @eonZ720bFourierSquares
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ720bFourierSquares = global.eonZ720bFourierSquares || {})))
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
    eonMuonCastel,
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
    __eo('xs').b('eon-muon-castel'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) { }
  let eonMuonStore = __eo('eonMuonStore')

  // .................. animas
  let z = function () {
    // .................. pics
    let eotim = {'td': 63800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // ...     data is svg MCZ...MCZ
    let svgdata = {
      width: '2.77778in', height: '3.45833in',
      viewBox: '0 0 300 300',
      path: {
        id: 'mbn',
        fill: 'none', stroke: 'black', 'strokeWidth': '1',
        d: `M 0.00,0.00
           C 100.00,0.00 200.00,0.00 300.00,0.00 Z`, // LineString
      }, // path
    }
    let data = eonMuonCastel.castels(svgdata, {start: 0, stop: 0.9, step: 1 / 3}) // MultiLineString

    let basicSquare = [
      [
        [0, 0], [0, 25], [0, 50], [0, 75],
        [0, 100], [25, 100], [50, 100], [75, 100],
        [100, 100], [100, 75], [100, 50], [100, 25],
        [100, 0], [75, 0], [50, 0], [25, 0], [0, 0],
      ],
    ] // MultiLineString
    data.geometry.coordinates = basicSquare

    let proformfn = (lat, lon) => ({
      projection: 'uniwen',
      translate: [ lat, lon ],
      scale: [1, 1],
      rotate: [ 0, 0, 0 ],
      lens: [0, 1, Infinity],
    })

    let C0 = -250
    let C1 = 60
    let C2 = 16
    let proton = i => proformfn(
      C0 + C1 * i + C2 * i * i,
      0
    )

    // ...  get geoData from uniwen projection with inverse y-scale
    // ...  the get the data features (transforms)
    // ...  span data along [0, 1] interval
    // ...  and create FeatureCollection with trasform features

    let getGeoData = i => eonMuonProj3ct(data, eonMuonProfier.uniweon(proton(i)))
    let geoData = getGeoData(1)

    let cl = eonMuonGeoj.getCoordsLength
    let cr = eonMuonGeoj.getCoordsInRange
    let csi = (i, t) => {
      let geodatai = getGeoData(i)
      console.assert(eonMuonGeoj.isValid(geodatai))
      let lengthi = Math.ceil(cl(data) * t)
      let res = cr(geodatai, lengthi)
      return res
    }

    let transforms = eonMuonFourier.transformedCoefs(geoData)
    transforms = eonMuonGeoj.ntime(transforms, [0, 1])

    // ... rayline LineString

    let rayline = i => ({

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: { gid: 'pol', cid: 'pol', fid: 'pol' + '_' + i},

      eofold: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: []},
        properties: {},
      },

      eocrom: {'csx': 0, 'cf': 555, 'cs': 444, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},
      eoload: {},

    })

    // ... traceline LineString trace

    let traceline = i => ({

      eohal: eonEohalPacer,
      eotim: eotim,
      eoric: {gid: 'ava', cid: 'ava', fid: 'traceline' + '_' + i},

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

      eocrom: {'csx': 0, 'cf': 555, 'cs': 999, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

      eoload: {
        pacer: { // addItemToPacer for trace

          initN: 0, eventN: 0, autoN: 1, autoP: 0, autoT: 0, outtimed: 0, maxN: 60,

          addItemToPacer: 1,
          geospan: 0,

          pacedAnisort: 'anigram',
          basePaceOnAniView: 'viewform',

          eohal: eonEohalMars,

          eofold: function (ani, props) {
            let preani = eonMuonStore.findAnigramFromUid(ani.eoric.uid)
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
    })

    // .................. aniDotted anima
    let aniDotted = (i, q) => ({
      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'ani', cid: 'ani', fid: 'aniDotted' + i},
      eofold: p => {
        let cs = csi(i, (1 + i) / q)
        cs.geometry.type = 'MultiPoint' // switch to MultiPoint
        return cs
      },
      eocrom: {'csx': 0, 'cf': 555, 'cs': 999, 'cw': 0.5, 'co': 0.9, 'cp': 0.999},
      eoload: {},
    })

    // ... fourierAni carries the transforms in the eofold
    // ...  h.fourier
    // ...  bears traceline and rayline avatars
    // ...  the rayline is a LineString between each two transforms
    // ...  the traceline is a paced LineString on the last transform

    let fourierAni = (i, q = 4) => ({

      eohal: 'fourier',
      eotim: eotim,
      eoric: { gid: 'fourier', cid: 'fourier', fid: 'fourier' + '_' + i},

      eofold: p => {
        let transforms = eonMuonGeoj.ntime(eonMuonFourier.transformedCoefs(csi(i, (1 + i) / q)), [0, 1])
        return {
          type: 'FeatureCollection',
          features: transforms,
        }
      },

      eocrom: {'csx': 0, 'cf': 555, 'cs': 3333, 'cw': 0.5, 'co': 0.012, 'cp': 0.99},

      eoload: {
        fourier: {

          pacedAnisort: 'anigram',

          transforms: eonMuonGeoj.ntime(eonMuonFourier.transformedCoefs(csi(i, (1 + i) / q)), [0, 1]),
          interval: [0.0, 0.99],
          tolerance: 0.1, // 0.1

          doteocrom: {'csx': 0, 'cf': 888, 'cs': 999, 'cw': 0.9, 'co': 0.01, 'cp': 0.7},

          // ... fourierAni.eoload.fourier avatars are defined by name: traceline, rayline

          avatars: {

            traceline: traceline(i, QFORMS),
            rayline: rayline(i, QFORMS),

          },
        },
      },
    })

    let QFORMS = 4
    let fourierAnis = []
    let aniDotteds = []
    for (let i = 0; i < QFORMS; i++) {
      fourierAnis.push(fourierAni(i, QFORMS))
      aniDotteds.push(aniDotted(i, QFORMS))
    }

    // .................. animas
    let animas = [

      ...fourierAnis, // h.fourier
      ...aniDotteds, // h.mars

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ720bFourierSquares = anitem
}))