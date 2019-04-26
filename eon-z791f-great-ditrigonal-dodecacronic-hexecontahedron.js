/* ******************************************
   *    @eonZ791fGreatDitrigonalDodecacronicHexecontahedron
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ791fGreatDitrigonalDodecacronicHexecontahedron = global.eonZ791fGreatDitrigonalDodecacronicHexecontahedron || {})))
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
    eonMuonGeovoro,
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
    __eo('xs').b('eon-muon-geovoro'),
    __eo('xs').b('eon-render-portview'),
    __eo('xs').b('eon-render-webgl'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  let z = function () {
  // .................. pics

    let epsilon = 1e-6, epsilon2 = epsilon * epsilon, asin = Math.asin
    let atan = Math.atan, abs = Math.abs
    let sqrt = Math.sqrt
    let pi = Math.PI, degrees = 180 / pi, asin1_3 = Math.asin(1 / 3)
    let theta = atan(0.5) * degrees

    const eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

    // .................. facesAni anima
    let facesAni = {

      eotim: eotim,
      eoric: {gid: 'facesAni', cid: 'facesAni', fid: 'facesAni'},
      eohal: eonEohalMars,

      eofold: anitem => {
        let eoload = anitem.eoload
        let json = {
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

      eocrom: {'csx': 0, 'cf': 999, 'cs': 777, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

      eomot: {
        proform: {

          projection: 'uniwen',
          translate: [
            0,
            0,
            0,
          ],

          scale: [
            100,
            100,
            100,
          ],

          rotate: [ [[[90, 22, 90]]], [[[0, 2 * 360]]], [[[9, 12, 9]]] ],
          lens: [0, 1, Infinity ],

        },
      },
      eoload: {
        /*
            Dave McCooey
            dmccooey@mac.com

            Great Ditrigonal Dodecacronic Hexecontahedron

          */
        pars: {
          // C0 = 3 * (11 * sqrt(5) - 15) / 76
          // C1 = 3 * (3 - sqrt(5)) / 4
          // C2 = 3 * (10 - sqrt(5)) / 38
          // C3 = 3 * (7 * sqrt(5) - 5) / 44
          // C4 = 3 * (sqrt(5) - 1) / 4
          // C5 = 3 * (5 + 9 * sqrt(5)) / 76
          // C6 = 3 * (15 + sqrt(5)) / 44
          C0: 3 * (11 * sqrt(5) - 15) / 76,
          C1: 3 * (3 - sqrt(5)) / 4,
          C2: 3 * (10 - sqrt(5)) / 38,
          C3: 3 * (7 * sqrt(5) - 5) / 44,
          C4: [[[ 3 * (sqrt(5) - 1) / 44, 3 * (sqrt(5) - 1) / 4, 3 * (sqrt(5) - 1) / 44 ]]],
          C5: 3 * (5 + 9 * sqrt(5)) / 76,
          C6: 3 * (15 + sqrt(5)) / 44,
        },

        vertices: pars =>
          [[0.0, pars.C4, -pars.C1],
            [0.0, pars.C4, pars.C1],
            [0.0, -pars.C4, -pars.C1],
            [0.0, -pars.C4, pars.C1],
            [pars.C4, -pars.C1, 0.0],
            [-pars.C4, -pars.C1, 0.0],
            [pars.C4, pars.C1, 0.0],
            [-pars.C4, pars.C1, 0.0],
            [-pars.C1, 0.0, pars.C4],
            [-pars.C1, 0.0, -pars.C4],
            [pars.C1, 0.0, pars.C4],
            [pars.C1, 0.0, -pars.C4],
            [pars.C5, 0.0, pars.C0],
            [pars.C5, 0.0, -pars.C0],
            [-pars.C5, 0.0, pars.C0],
            [-pars.C5, 0.0, -pars.C0],
            [0.0, pars.C0, pars.C5],
            [0.0, pars.C0, -pars.C5],
            [0.0, -pars.C0, pars.C5],
            [0.0, -pars.C0, -pars.C5],
            [pars.C0, pars.C5, 0.0],
            [-pars.C0, pars.C5, 0.0],
            [pars.C0, -pars.C5, 0.0],
            [-pars.C0, -pars.C5, 0.0],
            [0.0, -pars.C6, pars.C3],
            [0.0, -pars.C6, -pars.C3],
            [0.0, pars.C6, pars.C3],
            [0.0, pars.C6, -pars.C3],
            [-pars.C6, pars.C3, 0.0],
            [pars.C6, pars.C3, 0.0],
            [-pars.C6, -pars.C3, 0.0],
            [pars.C6, -pars.C3, 0.0],
            [pars.C3, 0.0, -pars.C6],
            [pars.C3, 0.0, pars.C6],
            [-pars.C3, 0.0, -pars.C6],
            [-pars.C3, 0.0, pars.C6],
            [-pars.C2, -pars.C2, -pars.C2],
            [-pars.C2, -pars.C2, pars.C2],
            [pars.C2, -pars.C2, -pars.C2],
            [pars.C2, -pars.C2, pars.C2],
            [-pars.C2, pars.C2, -pars.C2],
            [-pars.C2, pars.C2, pars.C2],
            [pars.C2, pars.C2, -pars.C2],
            [pars.C2, pars.C2, pars.C2]],

        faces: pars =>

          [[24, 2, 38, 4],
            [24, 4, 12, 10],
            [24, 10, 16, 8],
            [24, 8, 14, 5],
            [24, 5, 36, 2],
            [25, 4, 39, 3],
            [25, 3, 37, 5],
            [25, 5, 15, 9],
            [25, 9, 17, 11],
            [25, 11, 13, 4],
            [26, 0, 40, 7],
            [26, 7, 14, 8],
            [26, 8, 18, 10],
            [26, 10, 12, 6],
            [26, 6, 42, 0],
            [27, 1, 43, 6],
            [27, 6, 13, 11],
            [27, 11, 19, 9],
            [27, 9, 15, 7],
            [27, 7, 41, 1],
            [28, 0, 17, 9],
            [28, 9, 36, 5],
            [28, 5, 37, 8],
            [28, 8, 16, 1],
            [28, 1, 20, 0],
            [29, 0, 21, 1],
            [29, 1, 16, 10],
            [29, 10, 39, 4],
            [29, 4, 38, 11],
            [29, 11, 17, 0],
            [30, 2, 22, 3],
            [30, 3, 18, 8],
            [30, 8, 41, 7],
            [30, 7, 40, 9],
            [30, 9, 19, 2],
            [31, 2, 19, 11],
            [31, 11, 42, 6],
            [31, 6, 43, 10],
            [31, 10, 18, 3],
            [31, 3, 23, 2],
            [32, 0, 20, 6],
            [32, 6, 12, 4],
            [32, 4, 22, 2],
            [32, 2, 36, 9],
            [32, 9, 40, 0],
            [33, 1, 41, 8],
            [33, 8, 37, 3],
            [33, 3, 22, 4],
            [33, 4, 13, 6],
            [33, 6, 20, 1],
            [34, 0, 42, 11],
            [34, 11, 38, 2],
            [34, 2, 23, 5],
            [34, 5, 14, 7],
            [34, 7, 21, 0],
            [35, 1, 21, 7],
            [35, 7, 15, 5],
            [35, 5, 23, 3],
            [35, 3, 39, 10],
            [35, 10, 43, 1]],

        lights: pars =>
          [
          // {
            // type: 'AmbientLight',
            // name: 'AmbientLight',
            // color: 0xeeeeee,
            // intensity: 0.9,
            // position: [110, 110, 110],
          // },
          // {
            // type: 'DirectionalLight',
            // name: 'DirectionalLight',
            // color: 0xe4eef9,
            // intensity: 0.7,
            // position: [0, 0, 120],
            // normalize: 1,
            // castShadow: 1,
          // },
          // {
            // type: 'PointLight',
            // color: 0xe4eef9,
            // intensity: 0.7,
            // position: [0, 0, 120],
            // normalize: 1,
            // castShadow: 1,
          // },
          // {
            // type: 'SpotLight',
            // color: 0xe4eef9,
            // intensity: 0.7,
            // position: [0, 0, 120],
            // normalize: 1,
            // castShadow: 1,
          // },

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
          skyColor: [[[222, 999]]],
          groundColor: 111,
          intensity: 0.01,
          position: [0, 0, 200],
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
          intensity: 0.9,
          position: [-200, 200, 200],
          normalize: 1,
          castShadow: 1,
        },
      },

    }
    // .................. cameraOrthoAni anima
    let cameraOrthoAni = {

      eotim: eotim,
      eoric: {gid: 'camera', cid: 'camera', fid: 'cameraOrthoAni'},
      eohal: eonEohalSol,

      eofold: anitem => {
        let eoload = anitem.eoload
        let json = { // Feature
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: {
            sort: 'camera',
            type: 'OrthographicCamera',
            name: 'Orthographic',
            left: -eonRenderPortview.width() / 2,
            right: eonRenderPortview.width() / 2,
            top: eonRenderPortview.height() / 2,
            bottom: -eonRenderPortview.height() / 2,
            near: -200,
            far: 200,

            position: [0, 0, 20],
            rotation: [0, 60, 0],
            distance2nodesFactor: 300,
            lookAt: [0, 0, 0],
          },
        }

        return json
      },

    }

    // .................. cameraOrthoAni anima
    let cameraOrthoHelper = {

      eotim: eotim,
      eoric: {gid: 'camera', cid: 'camera', fid: 'cameraOrthoHelper'},
      eohal: eonEohalSol,

      eofold: anitem => {
        let eoload = anitem.eoload
        let json = { // Feature
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: {
            sort: 'cameraHelper',
            type: 'OrthographicCamera',
            name: 'Orthographic',
            left: -eonRenderPortview.width() / 2,
            right: eonRenderPortview.width() / 2,
            top: eonRenderPortview.height() / 2,
            bottom: -eonRenderPortview.height() / 2,
            near: -200,
            far: 200,

            position: [-200, 0, 200],
            rotation: [0, 0, 0],
            distance2nodesFactor: 300,
            lookAt: [0, 0, 0],
          },
        }

        return json
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
          properties: anitem.eoload.camera,
        }

        return json
      },
      eoload: {
        camera: {
          sort: 'camera',
          type: 'PerspectiveCamera',
          name: 'Perspective',
          fov: 100, // field of view
          aspect: eonRenderPortview.width() / eonRenderPortview.height(),
          near: 0.001,
          far: 300,

          position: [0, 0, 200 ],
          rotation: [0, 60, 0],
          distance2nodesFactor: 100,
          lookAt: [0, 0, 0],
        },
      },
    }
    // .................. cameraPersHelper anima
    let cameraPersHelper = {

      eotim: eotim,
      eoric: {gid: 'camera', cid: 'camera', fid: 'cameraPersHelper'},
      eohal: eonEohalSol,

      eofold: anitem => {
        let eoload = anitem.eoload
        let json = { // Feature
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: anitem.eoload.camera,
        }

        return json
      },
      eoload: {
        camera: {
          sort: 'cameraHelper',
          type: 'PerspectiveCamera',
          name: 'cameraPersHelper',

          fov: 90, // field of view
          aspect: eonRenderPortview.width() / eonRenderPortview.height(),
          near: -100,
          far: 100,

          position: [200, 200, 200],
          rotation: [0, 0, 0],
          // distance2nodesFactor: 300,
          lookAt: [0, 0, 0],
        },
      },
    }
    // .................. gridHelper anima
    let gridHelper = {

      eotim: eotim,
      eoric: {gid: 'camera', cid: 'camera', fid: 'gridHelper'},
      eohal: eonEohalSol,

      eofold: anitem => {
        let eoload = anitem.eoload
        let json = { // Feature
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: {
            sort: 'gridHelper',
            type: 'GridHelper',
            name: 'gridHelper',
            isToUpdate: 0,

            size: 200, // field of view
            divisions: 5,

            position: [0, -100, 0 ],
          },
        }

        return json
      },

    }
    // .................. animas
    let animas = [

      facesAni, // h.mars
      cameraPersAni, // h.sol
      // cameraPersHelper, // h.sol
      // cameraOrthoAni, // h.sol
      // cameraOrthoHelper, // h.sol
      // gridHelper, // h.sol
      lightHemisphereAni, // h.sol
      spotLight, // h.sol

    ]
    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ791fGreatDitrigonalDodecacronicHexecontahedron = anitem
}))