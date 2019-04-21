/* ******************************************
   *    @eonZ707eIcosahedro
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ707eIcosahedro = global.eonZ707eIcosahedro || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3,
    d3Geo,
    eonCtlWen,
    eonEohalMars,
    eonMuonGeom,
    eonMuonProps,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').b('d3-geo'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-geom'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) { }
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
          geometry.coordinates = Array.of(
            [ ...face.map(k => points[k]), points[0] ]
          ) // eg [-1, 1, 1]
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
      eoric: {gid: 'ani', cid: 'ani', fid: 'ani1'},
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

          [ 0, 3, 11],
          [ 0, 5, 3],
          [ 0, 7, 5],
          [ 0, 9, 7],
          [ 0, 11, 9], // North
          [ 2, 11, 3],
          [ 3, 4, 2],
          [ 4, 3, 5],
          [ 5, 6, 4],
          [ 6, 5, 7],
          [ 7, 8, 6],
          [ 8, 7, 9],
          [ 9, 10, 8],
          [10, 9, 11],
          [11, 2, 10], // Equator
          [ 1, 2, 4],
          [ 1, 4, 6],
          [ 1, 6, 8],
          [ 1, 8, 10],
          [ 1, 10, 2], // South

        ],

      },
    }

    // .................. vertsAni
    let vertsAni = {

      eohal: eonEohalMars,

      eofold: p => {
        let eoload = p.eoload,
          eoric = p.eoric,
          points = eoload.points({C0: (1 + Math.sqrt(5)) / 4}),
          faces = eoload.faces()

        let json = {type: 'FeatureCollection', features: []}

        for (let i = 0, l = faces.length; i < l; i++) {
          let face = faces[i] // face cornersx position

          let geometry = {type: 'Polygon', coordinates: []}
          geometry.coordinates =
                Array.of(
                  [ ...face.map(k => points[k]), points[0] ]
                ) // eg [-1, 1, 1]

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
      eoric: {gid: 'ani', cid: 'ani', fid: 'ani2'},
      eocrom: {'csx': 0, 'cf': [[[111, 222, 111, 222, 111, 222, 111]]], 'cs': 777, 'cw': 0.2, 'co': 0.9, 'cp': 0.9},

      eomot: {
        proform: {

          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          translate: [ +100, 0],
          scale: 100,
          rotate: [0, [[[0, 3 * 360]]], 0],
          lens: [0, 1, Infinity],

        },
      },

      eoload: {
        points: p => {
          return [

            [ 0.5, 0.0, p.C0],
            [ 0.5, 0.0, -p.C0],
            [-0.5, 0.0, p.C0],
            [-0.5, 0.0, -p.C0],
            [ p.C0, 0.5, 0.0],
            [ p.C0, -0.5, 0.0],
            [ -p.C0, 0.5, 0.0],
            [ -p.C0, -0.5, 0.0],
            [ 0.0, p.C0, 0.5],
            [ 0.0, p.C0, -0.5],
            [ 0.0, -p.C0, 0.5],
            [ 0.0, -p.C0, -0.5],

          ]
        },

        faces: () => {
          return [

            [ 0, 2, 10 ],
            [ 0, 10, 5 ],
            [ 0, 5, 4 ],
            [ 0, 4, 8 ],
            [ 0, 8, 2 ],
            [ 3, 1, 11 ],
            [ 3, 11, 7 ],
            [ 3, 7, 6 ],
            [ 3, 6, 9 ],
            [ 3, 9, 1 ],
            [ 2, 6, 7 ],
            [ 2, 7, 10 ],
            [ 10, 7, 11 ],
            [ 10, 11, 5 ],
            [ 5, 11, 1 ],
            [ 5, 1, 4 ],
            [ 4, 1, 9 ],
            [ 4, 9, 8 ],
            [ 8, 9, 6 ],
            [ 8, 6, 2 ],

          ]
        },
      },
    }

    // .................. animas
    let animas = [

      dotsAni, // h.mars
      vertsAni, // h.mars

    ]
    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ707eIcosahedro = anitem
}))