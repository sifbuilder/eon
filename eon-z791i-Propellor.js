/* ******************************************
   *    @eonZ791iPropellor
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ791iPropellor = global.eonZ791iPropellor || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3,
    d3Geo,
    THREE,
    ctlWen,
    eohalMars,
    eohalSol,
    muonGeom,
    muonProps,
    muonGeovoro,
    renderPortview,
    renderWebgl,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').b('d3-geo'),
    __eo('xs').b('three'),
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').e('sol'),
    __eo('xs').m('geom'),
    __eo('xs').m('props'),
    __eo('xs').m('geovoro'),
    __eo('xs').r('portview'),
    __eo('xs').r('webgl'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
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
      eohal: eohalMars,

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
            faces: eoload.faces(eoload.pars).reduce((p, q) => [...p, ...muonGeom.convextriang(q)], []),
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

          rotate: [ [[[90, 36, 90]]], [[[0, 2 * 360]]], [[[9, 24, 9]]] ],
          lens: [0, 1, Infinity ],

        },
      },
      eoload: {
        /*
            Dave McCooey
            dmccooey@mac.com

            Propello Tetrahedron (canonical)

          */
        pars: {
          C0: (Math.cbrt(4 * (11 + 3 * Math.sqrt(69))) - Math.cbrt(4 * (3 * Math.sqrt(69) - 11)) - 1) / 3,
          C1: (Math.cbrt(4 * (25 + 3 * Math.sqrt(69))) + Math.cbrt(4 * (25 - 3 * Math.sqrt(69))) - 5) / 3,
          C2: (Math.cbrt(4 * (371 + 33 * Math.sqrt(69))) + Math.cbrt(4 * (371 - 33 * Math.sqrt(69))) - 1) / 33,
          // C0: 0.139680581996106531822799916239,
          // C1: 0.509755332493385520099017792717,
          // C2: 0.606267870861478462919986663126
        },
        vertices: pars =>
          [[pars.C1, pars.C0, 1.0],
            [pars.C1, -pars.C0, -1.0],
            [-pars.C1, -pars.C0, 1.0],
            [-pars.C1, pars.C0, -1.0],
            [1.0, pars.C1, pars.C0],
            [1.0, -pars.C1, -pars.C0],
            [-1.0, -pars.C1, pars.C0],
            [-1.0, pars.C1, -pars.C0],
            [pars.C0, 1.0, pars.C1],
            [pars.C0, -1.0, -pars.C1],
            [-pars.C0, -1.0, pars.C1],
            [-pars.C0, 1.0, -pars.C1],
            [pars.C2, -pars.C2, pars.C2],
            [pars.C2, pars.C2, -pars.C2],
            [-pars.C2, pars.C2, pars.C2],
            [-pars.C2, -pars.C2, -pars.C2]],

        faces: pars =>

          [[12, 0, 2, 10],
            [12, 10, 9, 5],
            [12, 5, 4, 0],
            [13, 1, 3, 11],
            [13, 11, 8, 4],
            [13, 4, 5, 1],
            [14, 2, 0, 8],
            [14, 8, 11, 7],
            [14, 7, 6, 2],
            [15, 3, 1, 9],
            [15, 9, 10, 6],
            [15, 6, 7, 3],
            [0, 4, 8],
            [1, 5, 9],
            [2, 6, 10],
            [3, 7, 11]],

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
      eohal: eohalSol,

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
          intensity: 0.2,
          position: [0, 0, 200],
        },
      },

    }

    // .................. spotLight anima
    let spotLight = {

      eotim: eotim,
      eoric: {gid: 'camera', cid: 'camera', fid: 'spotLight'},
      eohal: eohalSol,

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
      eohal: eohalSol,

      eofold: anitem => {
        let eoload = anitem.eoload
        let json = { // Feature
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: {
            sort: 'camera',
            type: 'OrthographicCamera',
            name: 'Orthographic',
            left: -renderPortview.width() / 2,
            right: renderPortview.width() / 2,
            top: renderPortview.height() / 2,
            bottom: -renderPortview.height() / 2,
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
      eohal: eohalSol,

      eofold: anitem => {
        let eoload = anitem.eoload
        let json = { // Feature
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: {
            sort: 'cameraHelper',
            type: 'OrthographicCamera',
            name: 'Orthographic',
            left: -renderPortview.width() / 2,
            right: renderPortview.width() / 2,
            top: renderPortview.height() / 2,
            bottom: -renderPortview.height() / 2,
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
      eohal: eohalSol,

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
          aspect: renderPortview.width() / renderPortview.height(),
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
      eohal: eohalSol,

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
          aspect: renderPortview.width() / renderPortview.height(),
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
      eohal: eohalSol,

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
  exports.eonZ791iPropellor = anitem
}))