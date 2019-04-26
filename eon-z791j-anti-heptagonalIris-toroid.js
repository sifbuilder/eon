/* ******************************************
   *    @eonZ791jAntiHeptagonalIrisToroid
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ791jAntiHeptagonalIrisToroid = global.eonZ791jAntiHeptagonalIrisToroid || {})))
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

          rotate: [ [[[0, 90, 36, 90, 0]]], [[[90, 2 * 360, 2 * 360 + 90]]], [[[30, 9, 24, 9, 30]]] ],
          lens: [0, 1, Infinity ],

        },
      },
      eoload: {
        /*
            Dave McCooey
            dmccooey@mac.com

            Anti-Heptagonal Iris Toroid
            http://dmccooey.com/polyhedra/AntiHeptagonalIrisToroid.html

          */
        pars: {

          C0: 0.222520933956314404288902564497,
          C1: 0.671181371874405914756434334940,
          C2: 0.836949481122492579754074026159,
          C3: 0.900968867902419126236102319507,
          C4: 1.12348980185873353052500488400,
          C5: 1.20942704154975214093810613957,

        },
        vertices: pars =>

          [[0.5, 0.0, pars.C4],
            [0.5, 0.0, -pars.C4],
            [-0.5, 0.0, pars.C4],
            [-0.5, 0.0, -pars.C4],
            [0.0, pars.C2, pars.C3],
            [0.0, pars.C2, -pars.C3],
            [0.0, -pars.C2, pars.C3],
            [0.0, -pars.C2, -pars.C3],
            [pars.C3, pars.C1, 0.5],
            [pars.C3, pars.C1, -0.5],
            [-pars.C3, -pars.C1, 0.5],
            [-pars.C3, -pars.C1, -0.5],
            [pars.C0, pars.C5, 0.0],
            [-pars.C0, -pars.C5, 0.0]],

        faces: pars =>

          [[0, 4, 2],
            [0, 2, 6],
            [0, 6, 12],
            [0, 12, 5],
            [1, 3, 5],
            [1, 5, 9],
            [1, 9, 11],
            [1, 11, 10],
            [6, 2, 10],
            [6, 10, 13],
            [6, 13, 4],
            [6, 4, 12],
            [7, 11, 3],
            [7, 3, 1],
            [7, 1, 10],
            [7, 10, 2],
            [8, 12, 4],
            [8, 4, 0],
            [8, 0, 5],
            [8, 5, 3],
            [9, 5, 12],
            [9, 12, 8],
            [9, 8, 3],
            [9, 3, 11],
            [13, 10, 11],
            [13, 11, 7],
            [13, 7, 2],
            [13, 2, 4]],

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
          intensity: 0.6,
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
  exports.eonZ791jAntiHeptagonalIrisToroid = anitem
}))