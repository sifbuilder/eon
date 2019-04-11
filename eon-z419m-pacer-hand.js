/* ******************************************
   *    @eonZ419mPacerHand
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ419mPacerHand = global.eonZ419mPacerHand || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    // ctlRayder,
    ctlWen,
    eohalNatform,
    eohalPacer,
    eohalTextform,
    eohalMars,
    muonAnitem,
    muonGeoj,
    muonNatform,
    muonProfier,
    muonProj3ct,
    muonProps,
    muonStace,
    muonCastel,
    protonUniwen,
    renderPortview,
    renderSvg,
  ] = await Promise.all([
    // __eo('xs').c('rayder'),
    __eo('xs').c('wen'),
    __eo('xs').e('natform'),
    __eo('xs').e('pacer'),
    __eo('xs').e('textform'),
    __eo('xs').e('mars'),
    __eo('xs').m('anitem'),
    __eo('xs').m('geoj'),
    __eo('xs').m('natform'),
    __eo('xs').m('profier'),
    __eo('xs').m('proj3ct'),
    __eo('xs').m('props'),
    __eo('xs').m('stace'),
    __eo('xs').m('castel'),
    __eo('xs').p('uniwen'),
    __eo('xs').r('portview'),
    __eo('xs').r('svg'),
  ])
  let muonStore = __eo('muonStore')
  try { renderSvg.scenecolor('black') } catch (e) {}
  let ctl
  try {
    ctl = ctlWen().control(renderSvg.svg())
  } catch (e) {
    ctl = () => [0, 0, 0]
  }

  // .................. animas
  let z = function () {
    // .................. pics
    let eotim = {td: 16800, t0: 0, t1: 1, t2: 1, t3: 1}

    let svgdata = {
      width: '232.275mm', height: '145.238mm',
      viewBox: '0 0 878 549',
      path: {
        id: 'hand',
        fill: 'none', stroke: 'black', 'strokeWidth': '1',
        d: `M 228.83,244.78
           C 228.87,242.70 247.74,227.45 253.63,223.54
             266.48,250.09 290.73,229.41 290.73,229.41
             291.97,229.88 308.90,200.83 316.48,192.91
             316.48,192.91 383.86,169.91 385.61,162.79
             379.73,158.41 361.73,148.54 354.78,150.83
             345.73,163.41 322.61,176.54 313.98,178.91
             313.98,178.91 308.11,196.16 308.11,196.83
             308.41,203.28 293.81,222.49 293.73,222.41
             294.71,224.10 284.11,235.04 269.57,234.08
             262.98,234.29 256.61,230.66 254.11,216.83
             255.86,201.66 269.61,157.91 276.11,146.16
             276.11,145.50 314.78,104.83 316.11,103.50
             322.86,94.91 347.11,61.91 356.11,53.50
             365.86,48.91 380.11,51.91 391.44,53.50
             391.44,53.50 409.44,45.50 409.44,45.50
             439.86,52.41 492.36,75.16 516.11,71.50
             533.11,69.66 572.86,76.41 565.44,86.16
             565.44,86.16 391.61,162.66 391.61,162.66
             391.61,162.66 672.78,47.50 672.78,47.50
             687.11,44.41 704.61,78.66 695.86,95.66
             678.61,111.16 449.72,184.38 452.69,186.33
             525.30,160.12 576.20,144.72 609.36,137.66
             609.36,137.66 744.78,306.16 744.78,306.16
             755.11,316.66 793.61,345.16 809.44,366.16
             802.86,410.16 764.36,504.91 721.44,528.83
             722.14,528.29 682.36,494.91 672.78,489.50
             664.48,483.79 626.82,467.88 626.11,468.16
             618.23,464.91 612.23,466.41 604.11,465.50
             604.11,465.50 454.86,416.79 454.86,416.79
             454.86,416.79 410.78,385.50 410.78,385.50
             394.48,377.54 348.48,357.04 329.44,339.50
             324.61,328.66 323.48,315.41 314.11,298.83
             302.36,285.79 291.36,276.66 286.78,258.16
             284.86,253.54 285.73,243.54 292.11,237.91
             295.38,233.98 309.02,231.07 318.98,235.16
             318.98,235.16 356.78,250.16 356.78,250.16
             365.86,256.66 382.11,269.66 389.44,282.83
             407.11,290.91 434.11,293.66 460.11,282.91
             470.44,263.25 468.61,232.66 471.61,207.91
             468.11,207.66 449.61,194.91 447.63,191.03
             419.86,196.41 363.36,216.66 325.63,231.69
             314.27,230.03 307.47,228.34 297.47,230.25
             293.93,232.62 288.73,238.09 284.11,244.83
             269.02,252.60 259.44,252.62 240.50,249.44
             238.07,248.92 229.21,244.81 228.83,244.78 Z`,
      },
    }

    let extent = svgdata.viewBox.split(' ').map(d => parseInt(d))
    let x0 = extent[0], y0 = extent[1], x1 = extent[2], y1 = extent[3]
    let width = renderPortview.width(), height = renderPortview.height()
    let r0 = width / (x1 - x0)
    let r1 = height / (y1 - y0)
    let rx = Math.sign(r0) * Math.min(Math.abs(r0), Math.abs(r1))
    let ry = Math.sign(r1) * Math.min(Math.abs(r0), Math.abs(r1))
    let dx = rx * (x1 - x0) / 2
    let dy = ry * (y1 - y0) / 2
    let gjdata = muonCastel.castels(svgdata, {start: 0, stop: 0.9, step: 0.41})

    let invgjdata = muonProps.clone(gjdata) // Multiline - first line
    invgjdata.geometry.coordinates[0] = [...gjdata.geometry.coordinates[0]].reverse()

    let nb = muonGeoj.getCoordsLength(gjdata)

    let proton = {
      projection: 'uniwen',
      translate: [ -200, 100, 0],
      scale: [0.3, -0.3],
      rotate: [ 0, 0, 0 ],
      lens: [0, 1, Infinity],

    }
    let prtion = muonProfier.formion(proton)
    let geoData = muonProj3ct(gjdata, prtion)
    let invgeoData = muonProj3ct(invgjdata, prtion)

    // ............................. avaline
    let avaline = {

      eohal: eohalPacer,
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

      eocrom: {'csx': 0, 'cf': 444, 'cs': [[[222, 888]]], 'cw': 1.25, 'co': 0.12, 'cp': 0.99},

      eoload: {
        pacer: { // addItemToPacer for trace

          initN: 0, eventN: 0, autoN: 1, autoP: 0, autoT: 0,
          outtimed: 0, maxN: 60,

          addItemToPacer: 1,
          geospan: 0,

          pacedAnisort: 'anigram',
          basePaceOnAniView: 'viewform',

          eohal: eohalMars,

          eofold: function (ani, props) {
            let coords
            if (props.key === 'init') { // INIT
              coords = ani.eonode.geometry.coordinates // eonode
            } else if (props.key === 'auto') { // AUTO
              let point = muonAnitem.snapani([[[ invgeoData.geometry.coordinates ]]], ani.eotim.unTime)

              point = muonGeoj.geotrim(point)

              let preani = muonStore.findAnigramFromUid(ani.eoric.uid)
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

            console.assert(coords !== undefined && coords !== null, `eofold coords undefined`)
            let geometry = {
              type: 'LineString',
              coordinates: coords,
            }
            console.assert(muonGeoj.isValid(geometry))

            return {
              type: 'Feature',
              geometry: geometry,
              properties: {},
            }
          },

          eonode: function (ani, props) {
            let stace = [0, 0, 0]
            if (props.key === 'init') { // INIT
              stace = muonStace.getLocus([null, null, null], ani)
            } else if (props.key === 'auto') { // AUTO
              stace = muonStace.getLocus([null, null, null], ani)
            } else if (props.key === 'event') { // EVENT
              if (ctlRayder.grabbed() !== undefined) {
                let grabbed = ctlRayder.grabbed()
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

      eohal: eohalMars,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'aniLine'},

      eofold: ani => {
        let anigram = ani, // anigram
          eohal = ani.eohal, // eohal
          eofold = ani.eofold, // eofold
          eoload = ani.eoload // eoload

        let unElapsed = ani.eotim.unElapsed // unit time elapsed
        let t = ani.eoload.tf(unElapsed) || unElapsed // time function

        let nbt = nb - Math.ceil(nb * t)

        let geoData = ani.eoload.geoData

        // let geotmp = muonProps.clone(ani.eoload.geoData)
        // geotmp.geometry.coordinates = ani.eoload.geoData.geometry.coordinates.slice().reverse()

        let csi = t => muonGeoj.getCoordsInRange(geoData, nbt)

        let coords = csi(t).geometry.coordinates

        let ngj = {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: [] },
          properties: {
            eocrom: { 'csx': 0, 'cf': 666, 'cs': 888, 'cw': 1.25, 'co': 0.1, 'cp': 0.9},
          },
        }

        // ... a single line generates a LineString from muonProj3ct(geoData)
        if (ani.eoload.geoData.geometry.type === 'LineString') ngj.geometry.coordinates = coords
        else if (ani.eoload.geoData.geometry.type === 'MultiLineString') ngj.geometry.coordinates = coords
        else if (ani.eoload.geoData.geometry.type === 'Polygon') ngj.geometry.coordinates = coords

        let rings = ngj.geometry.coordinates // rings in Polygon
        let newFeatureCollection = {type: 'FeatureCollection', features: []}

        for (let i = 0; i < rings.length; i++) {
          let ring = rings[i]
          let feature = {
            type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [ring]},
            properties: {},
          }
          if (i < rings.length - 1) { // first
            feature.properties.eocrom = { 'csx': 0, 'cf': 555, 'cs': 111, 'cw': 1.25, 'co': 0.1, 'cp': 1}
          } else {
            feature.properties.eocrom = { 'csx': 0, 'cf': 555, 'cs': 111, 'cw': 1.25, 'co': 0.1, 'cp': 1}
          }

          newFeatureCollection.features.push(feature)
        }

        newFeatureCollection.features = Array.of(ngj)

        let gj = newFeatureCollection

        if (eoload.proform) {
          let proformion = muonProfier.proformion(anigram)
          newFeatureCollection = muonProj3ct(gj, proformion)
        }

        return newFeatureCollection
      },

      eonode: {
        type: 'Feature',
        geometry: {type: 'Point', coordinates: [0, 0]},
        properties: {orgen: [0, 0], velin: [0, 0], velang: [0, 0], prevous: [0, 0], geodelta: [0, 0]},
      },

      eomot: {
        eoform: {
          projection: 'uniwen',
          translate: [131, -27],
          scale: 1,
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity],

        },
        proform: {
          projection: 'uniwen',
          translate: [[[ geoData.geometry.coordinates.slice().reverse() ]]], //
          scale: 1,
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity],

        },
      },

      eocrom: { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.29, 0.29]]], 'cs': [[[555, 666]]], 'cw': 0.3, 'cp': [[[0.7, 0.9]]],
      },

      eoload: { // eoload in polyForm
        tf: t => t,
        geoData: geoData,

      },
      avatars: {

        avaline, // h.pacer red

      },
    }

    // .................. animas
    let animas = [
      aniLine,

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ419mPacerHand = anitem
}))