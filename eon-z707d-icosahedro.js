/* ******************************************
   *    @eonZ707dIcosahedro
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ707dIcosahedro = global.eonZ707dIcosahedro || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3,
    d3Geo,
    ctlWen,
    eohalMars,
    muonGeom,
    muonProps,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').b('d3-geo'),
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').m('geom'),
    __eo('xs').m('props'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) { }
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = ctlWen().control(renderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let epsilon = 1e-6, epsilon2 = epsilon * epsilon, asin = Math.asin
    let atan = Math.atan, abs = Math.abs
    let pi = Math.PI, degrees = 180 / pi, asin1_3 = Math.asin(1 / 3)
    let theta = atan(0.5) * degrees

    const eotim = {'td': 23800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

    // .................. facesAni anima
    let facesAni = {

      eohal: eohalMars,

      eofold: anitem => {
        let eoload = anitem.eoload,

          eoric = anitem.eoric,

          faces = eoload.faces(eoload.breakage) // eoload.faces

        let json = {type: 'FeatureCollection', features: []}

        for (let i = 0, l = faces.length; i < l; i++) {
          let face = faces[i] // face cornersx position

          let geometry = {type: 'Polygon', coordinates: []}
          geometry.coordinates = Array.of(face) // eg [-1, 1, 1]

          let _ric = {}
          _ric.gid = eoric.gid
          _ric.cid = eoric.cid
          _ric.fid = eoric.cid + i

          let feature = {type: 'Feature', geometry: {}, properties: {}}

          feature.geometry = geometry

          feature.properties.eoric = _ric
          feature.properties.sort = 'form'
          feature.properties.eocrom = face.eocrom

          json.features.push(feature)
        }

        return json
      },

      eotim: eotim,
      eoric: {gid: 'facesAni', cid: 'facesAni', fid: 'facesAni'},
      eocrom: {'csx': 0, 'cf': [[[222, 333, 222, 333, 222, 333, 222]]], 'cs': 777, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

      eomot: {
        proform: {

          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          translate: [ 0, 0, 0 ],
          scale: 100,
          rotate: [0, [[[0, 3 * 360]]], 0],
          lens: [0, 1, [[[2000, 20]]] ],

        },
      },
      eoload: {

        breakage: {
          s: 36,
          y: [[[2, 1, 1, 2]]],
          z: [[[0, 1, 1, 0]]],
        },

        faces: function (breakage = {s: 36, y: 2, z: 0}) { // icosahedronFaces
          let faces = []

          let s = breakage.s
          let y = breakage.y
          let z = breakage.z

          let s0 = s,

            y1 = Math.atan2(1, y) * 180 / Math.PI, // 26.56
            y2 = Math.atan2(-1, y) * 180 / Math.PI, // -26.56

            z1 = Math.atan2(1, z) * 180 / Math.PI // 90
          z2 = Math.atan2(-1, z) * 180 / Math.PI // -90

          for (let x = 0; x < 360; x += 2 * s0) {
            faces.push(

              [ [x + 0 * s0, z2], // -90
                [x + 0 * s0, y2],
                [x + 2 * s0, y2],
                [x + 0 * s0, z2], // -90
              ],
              [
                [x + 1 * s0, y1],
                [x + 2 * s0, y2],
                [x + 0 * s0, y2],
                [x + 1 * s0, y1],
              ],
              [
                [x + 1 * s0, y1],
                [x + 0 * s0, y2],
                [x - 1 * s0, y1],
                [x + 1 * s0, y1],
              ],
              [
                [x + 1 * s0, y1],
                [x - 1 * s0, y1],
                [x - 1 * s0, z1], // 90
                [x + 1 * s0, y1],
              ]

            )
          }
          return faces.map(face => face.map(muonProps.cartesian))
        },
      },
    }

    // .................. animas
    let animas = [

      facesAni, // h.mars

    ]
    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ707dIcosahedro = anitem
}))