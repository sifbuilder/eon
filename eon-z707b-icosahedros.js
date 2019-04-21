/* ******************************************
   *    @eonZ707bIcosahedros
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ707bIcosahedros = global.eonZ707bIcosahedros || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3,
    eonCtlWen,
    eonEohalMars,
    eonMuonGeom,
    eonMuonProps,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-geom'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) { }
  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let epsilon = 1e-6, epsilon2 = epsilon * epsilon, asin = Math.asin
    let atan = Math.atan, abs = Math.abs
    let pi = Math.PI, degrees = 180 / pi, asin1_3 = Math.asin(1 / 3)
    let theta = atan(0.5) * degrees

    const eotim = {'td': 23800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

    let facesGeofold = anitem => {
      let eoload = anitem.eoload,
        eoric = anitem.eoric,
        faces = eonMuonProps.v(eoload.faces) // eoload.faces

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
    }

    // .................. facesAni
    let facesAni = {

      eohal: eonEohalMars,

      eofold: facesGeofold,
      eotim: eotim,
      eoric: {gid: 'facesAni', cid: 'facesAni', fid: 'facesAni'},
      eocrom: {'csx': 0, 'cf': [[[222, 333, 222, 333, 222, 333, 222]]], 'cs': 777, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

      eomot: {
        proform: {

          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          translate: [ 100, 0 ],
          scale: 100,
          rotate: [0, [[[0, 3 * 360]]], 0],
          lens: [0, 1, [[[2, 2]]] ],

        },
      },

      eoload: {
        faces: function () { // icosahedronFaces
          let faces = [],
            s = 36,
            y = Math.atan2(1, 2) * 180 / Math.PI
          for (let x = 0; x < 360; x += 2 * s) {
            faces.push(
              [[x + 0 * s, -90],
                [x + 0 * s, -y],
                [x + 2 * s, -y],
                [x + 0 * s, -90]],
              [[x + 1 * s, y],
                [x + 2 * s, -y],
                [x + 0 * s, -y],
                [x + 1 * s, y]],
              [[x + 1 * s, y],
                [x + 0 * s, -y],
                [x - 1 * s, y],
                [x + 1 * s, y]],
              [[x + 1 * s, y],
                [x - 1 * s, y],
                [x - 1 * s, 90],
                [x + 1 * s, y]]
            )
          }
          return faces.map(face => face.map(eonMuonProps.cartesian))
        },
      },
    }

    // .................. dotsAni
    let dotsAni = {

      eohal: eonEohalMars,

      eofold: anitem => {
        let eoload = anitem.eoload,
          eoric = anitem.eoric,
          points = eoload.points,
          faces = eoload.faces

        let json = {type: 'FeatureCollection', features: []}

        for (let i = 0, l = faces.length; i < l; i++) {
          let face = faces[i] // face cornersx position

          let geometry = {type: 'Polygon', coordinates: []}
          geometry.coordinates = Array.of(face.cornersx.map(k => points[k])) // eg [-1, 1, 1]

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
      eoric: {gid: 'dotsAni', cid: 'dotsAni', fid: 'dotsAni'},
      eocrom: {'csx': 0, 'cf': [[[111, 222, 111, 222, 111, 222, 111]]], 'cs': 777, 'cw': 0.2, 'co': 0.9, 'cp': 0.9},

      eomot: {
        proform: {

          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          translate: [ -100, 0],
          scale: 100,
          rotate: [0, [[[0, 3 * 360]]], 0],
          lens: [0, 1, Infinity],

        },
      },

      eoload: {
        points: [
          [0, 90],
          [0, -90],
        ]
          .concat(d3.range(10).map(function (i) {
            let theta = Math.atan(0.5) * 180 / Math.PI
            let phi = ((i * 36) + 180) % 360 - 180
            return [phi, i & 1 ? theta : -theta]
          }))
          .map(eonMuonGeom.cartesian),

        faces: [

          {cornersx: [ 0, 3, 11, 0]},
          {cornersx: [ 0, 5, 3, 0]},
          {cornersx: [ 0, 7, 5, 0]},
          {cornersx: [ 0, 9, 7, 0]},
          {cornersx: [ 0, 11, 9, 0]}, // North
          {cornersx: [ 2, 11, 3, 2]},
          {cornersx: [ 3, 4, 2, 3]},
          {cornersx: [ 4, 3, 5, 4]},
          {cornersx: [ 5, 6, 4, 5]},
          {cornersx: [ 6, 5, 7, 6]},
          {cornersx: [ 7, 8, 6, 7]},
          {cornersx: [ 8, 7, 9, 8]},
          {cornersx: [ 9, 10, 8, 9]},
          {cornersx: [10, 9, 11, 10]},
          {cornersx: [11, 2, 10, 11]}, // Equator
          {cornersx: [ 1, 2, 4, 1]},
          {cornersx: [ 1, 4, 6, 1]},
          {cornersx: [ 1, 6, 8, 1]},
          {cornersx: [ 1, 8, 10, 1]},
          {cornersx: [ 1, 10, 2, 1]}, // South

        ],

      },
    }

    // .................. animas
    let animas = [

      facesAni, // h.mars
      dotsAni, // h.mars

    ]
    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ707bIcosahedros = anitem
}))