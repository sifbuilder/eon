/* ******************************************
   *    @eonZ791cD3catalan
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ791cD3catalan = global.eonZ791cD3catalan || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
    let [
      d3,
      d3Geo,
      THREE,
      eonCtlWen,
      eonEohalMars,
      eonEohalSol,
      eonMuonGeom,
      eonMuonProps,
      eonRenderPortview,
      eonRenderWebgl,
    ] = await Promise.all([
      __eo('xs').b('d3'),
      __eo('xs').b('d3-geo'),
      __eo('xs').b('three'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-sol'),
      __eo('xs').b('eon-muon-geom'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-render-portview'),
      __eo('xs').b('eon-render-webgl'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    let z = function () {
      // .................. pics

      let epsilon = 1e-6, epsilon2 = epsilon * epsilon, asin = Math.asin
      let atan = Math.atan, abs = Math.abs
      let pi = Math.PI, degrees = 180 / pi, asin1_3 = Math.asin(1 / 3)
      let sqrt = Math.sqrt
      let theta = atan(0.5) * degrees

      const eotim = {'td': 23800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

      // .................. facesAni anima
      let facesAni = {

        eohal: eonEohalMars,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: {
              type: 'MultiPoint',
              coordinates: eoload.vertices(eoload.pars),
            },
            properties: {
              sort: 'form',
              eoMultiPolygon: 1,
              faces: eoload.faces(eoload.pars).reduce((p, q) => [...p, ...eonMuonGeom.convextriang(q)], []),
              lights: eoload.lights(eoload.pars),
            },
          }

          return json
        },

        eotim: eotim,
        eoric: {gid: 'facesAni', cid: 'facesAni', fid: 'facesAni'},
        eocrom: {'csx': 0, 'cf': [[[222, 333, 222, 333, 222, 333, 222]]], 'cs': 777, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

        eomot: {
          proform: {

            projection: 'uniwen',
            translate: [ 0, 0, 0 ],
            scale: [30, 30, 30],
            rotate: [[[[0, 6, 0]]], [[[0, 360]]], [[[0, 6, 0]]]],
            lens: [0, 1, Infinity ],

          },
        },
        eoload: {
        /*
            Dave McCooey
            dmccooey@mac.com

            Tetrakis Hexahedron

            (24) SHORT EDGE = 9 * sqrt(2) / 8
            (12) LONG EDGE = 3 * sqrt(2) / 2
            (6) INNER VERTEX RADIUS = 9 * sqrt(2) / 8
            (8) OUTER VERTEX RADIUS = 3 * sqrt(6) / 4
            EDGE-SCRIBED RADIUS = 3 / 2
            INRADIUS = 9 * sqrt(10) / 20
            VOLUME = 81 * sqrt(2) / 8
            DIHEDRAL ANGLE = acos(-4/5) = 143.130102354155978703144387441 degrees

            EULER CHARACTERISTIC:          2
            ROTATION SYMMETRIES:          24
            MIRROR ROTATION SYMMETRIES:   24
            ROTATION AXES:                13 (3[4] + 4[3] + 6[2])
            MIRROR PLANES:                 9
            INVERTIBLE:                  YES
            SYMMETRY CLASSIFICATION:  Full Octahedral (Oh)
            TOPOLOGICALLY SELF-DUAL:      NO

            C0 = 3 * sqrt(2) / 4
            C1 = 9 * sqrt(2) / 8
          */
          pars: {
            C0: [[[3 * sqrt(2) / 4, 4 * sqrt(2) / 4, 3 * sqrt(2) / 4]]], // 1.06066017177982128660126654316,
            C1: [[[9 * sqrt(2) / 8, 9 * sqrt(2) / 8, 9 * sqrt(2) / 8]]], // 1.59099025766973192990189981474
          },

          vertices: pars =>

            [[0.0, 0.0, pars.C1],
              [0.0, 0.0, -pars.C1],
              [pars.C1, 0.0, 0.0],
              [-pars.C1, 0.0, 0.0],
              [0.0, pars.C1, 0.0],
              [0.0, -pars.C1, 0.0],
              [pars.C0, pars.C0, pars.C0],
              [pars.C0, pars.C0, -pars.C0],
              [pars.C0, -pars.C0, pars.C0],
              [pars.C0, -pars.C0, -pars.C0],
              [-pars.C0, pars.C0, pars.C0],
              [-pars.C0, pars.C0, -pars.C0],
              [-pars.C0, -pars.C0, pars.C0],
              [-pars.C0, -pars.C0, -pars.C0]],

          faces: pars =>

            [[0, 6, 10],
              [0, 10, 12],
              [0, 12, 8],
              [0, 8, 6],
              [1, 7, 9],
              [1, 9, 13],
              [1, 13, 11],
              [1, 11, 7],
              [2, 6, 8],
              [2, 8, 9],
              [2, 9, 7],
              [2, 7, 6],
              [3, 10, 11],
              [3, 11, 13],
              [3, 13, 12],
              [3, 12, 10],
              [4, 6, 7],
              [4, 7, 11],
              [4, 11, 10],
              [4, 10, 6],
              [5, 8, 12],
              [5, 12, 13],
              [5, 13, 9],
              [5, 9, 8]],

          lights: pars =>
            [
              {
                light: THREE.AmbientLight,
                color: 0xffffff,
                intensity: 0.9,
                position: [200, 200, 200],
              },
              {
                light: THREE.DirectionalLight,
                color: 0xe4eef9,
                intensity: 0.7,
                position: [200, 200, 200],
                normalize: 1,
              },
            ],
        },
      }
      // .................. cameraOrthoAni anima
      let lightHemisphereAni = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'lightHemisphereAni'},
        eohal: eonEohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: anitem.eoload.light,
          }

          return json
        },
        eoload: {
          light: {
            sort: 'light',
            type: 'HemisphereLight',
            name: 'HemisphereLight',
            skyColor: [[[111, 999]]],
            groundColor: [[[999, 111]]],
            intensity: 0.2,
            position: [0, 0, 0],
          },
        },

      }

      // .................. spotLight anima
      let spotLight = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'spotLight'},
        eohal: eonEohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: anitem.eoload.light,
          }
          return json
        },
        eoload: {
          light: {
            sort: 'light',
            type: 'SpotLight',
            name: 'spotLight',
            color: [[[222, 777]]], // 0xe4eef9,
            intensity: 0.99,
            position: [-100, 100, 100],
            normalize: 1,
            castShadow: 1,
          },
        },

      }

      // .................. cameraPersAni anima
      let cameraPersAni = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'cameraPersAni'},
        eohal: eonEohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: {
              sort: 'camera',
              type: 'PerspectiveCamera',
              name: 'Perspective',
              fov: 60, // field of view s the field of view. angle in degrees.
              aspect: eonRenderPortview.width() / eonRenderPortview.height(),
              near: 0.001,
              far: 600,

              position: [0, 0, 200 ],
              rotation: [0, 0, 0 ],

              vellin: [0.2, 0.2, 0 ],
              velang: [1, 1.6, 1 ],

              distance2nodesFactor: 100,
              lookAt: [0, 0, 0],
            },
          }
          return json
        },
      }
      // .................. animas
      let animas = [

        facesAni, // h.mars
        cameraPersAni, // h.sol
        lightHemisphereAni, // h.sol
        spotLight, // h.sol

      ]
      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ791cD3catalan = anitem
}))
