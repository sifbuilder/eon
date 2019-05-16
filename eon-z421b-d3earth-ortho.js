/* ******************************************
   *    @eonZ421bD3earthOrtho
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ421bD3earthOrtho = global.eonZ421bD3earthOrtho || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [

      topojson,

      eonDatWorldTopo110m,
      eonEohalMars,
      eonEohalSol,

      eonMuonGraticule,

      eonRenderPortview,
      eonRenderWebgl, // eslint-disable-line no-unused-vars
    ] = await Promise.all([

      __eo('xs').b('topojson'),

      __eo('xs').b('eon-dat-world-topo110m'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-sol'),

      __eo('xs').b('eon-muon-graticule'),

      __eo('xs').b('eon-render-portview'),
      __eo('xs').b('eon-render-webgl'),
    ])
    // .................. animas
    let z = function () {
    // .................. pics
      let eotim = {'td': 10800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

      let eoform = {

        x: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'v0': 0, 'v1': 1,
          'ra2': 60,
          'w4': 0, // [[[180,360,180]]], // [[[0,-360,0]]],
          'seg5': 360, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
        },
        y: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'v0': 0, 'v1': 1,
          'ra2': 60,
          'w4': 90, // [[[60, 60 + 1 * 360]]], // [[[0,-360,0]]],
          'seg5': 360, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
        },
        z: {
        // 'm1': [[[2, 2]]], 'm2': [[[2, 2]]], 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'v0': 0, 'v1': 1,
          'ra2': 60,
          'w4': 0, // [[[180,360,180]]], // [[[0,-360,0]]],
          'seg5': 360, 'pa6': 0, 'pb7': -1,
          'dom3': [-90, 90],
        },
        w: {
        // 'm1': [[[2, 2]]], 'm2': [[[2, 2]]], 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'v0': 0, 'v1': 1,
          'ra2': 60,
          'w4': 0, // [[[180,360,180]]], // [[[0,-360,0]]],
          'seg5': 360, 'pa6': 0, 'pb7': -1,
          'dom3': [-90, 90],
        },
      }

      let eoframe = {

        geoframe: [ [ [-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ] ],

      }
      // ............................. geoearth
      let geoearth = {

        eohal: eonEohalMars,
        eotim,
        eoric: {'gid': 'geoearth', 'cid': 'geoearth', 'fid': 'geoearth'},

        eofold: p => {
          let geometry = Object.assign({},
            topojson.mesh(
              eonDatWorldTopo110m.data(),
              eonDatWorldTopo110m.data().objects.land
            )
          )
          return { type: 'Feature', geometry: geometry, properties: {} }
        },
        eomot: {
          conform: {
            projection: 'natform',
            eoform: eoform,
          },
        },
        eocrom: { 'csx': 0, 'cf': 555, 'cs': 333, 'cw': 0.2, 'co': 0.21, 'cp': 0.9},
        eoload: {},

      }
      // ............................. geofaces
      let geofaces = {

        eohal: eonEohalMars,

        eofold: p => {
          let gvertsFeature = eonMuonGraticule.gjfMultiPoint(p.eoframe)
          let gfaces = eonMuonGraticule.gfaces(p.eoframe)

          let res = gvertsFeature

          res.properties.eoMultiPolygon = !0
          res.properties.faces = gfaces // 3 eoMultipolygonsToScene
          res.properties.pointRadius = 0.1 // 3 multiPointToScene
          res.properties.pointColor = 0x88ff88 // 3 multiPointToScene

          return res
        },
        eotim,

        eomot: {
          conform: {
            projection: 'natform',
            eoform: eoform,
          },
        },

        eoric: {gid: 'geofaces', cid: 'geofaces', fid: 'geofaces'},
        eocrom: { 'csx': 0, 'cf': [[[222, 222]]], 'cs': 666, 'cw': [[[0.3, 2.3]]], 'co': [[[0.05, 0.05]]], 'cp': [[[0.9, 0.9]]]},

        eoframe: eoframe,
        eoload: {},

      }
      // ............................. geograt
      let geograt = {

        eohal: eonEohalMars,

        eofold: p => {
          let vhmls = eonMuonGraticule.gjfMultiLineString(p.eoframe)

          return vhmls
        },
        eotim,

        eomot: {
          conform: {
            projection: 'natform',
            eoform: eoform,
          },
        },

        eoric: {'gid': 'geograt', 'cid': 'geograt', 'fid': 'geograt'},
        eocrom: { 'csx': 0, 'cf': [[[555, 555]]], 'cs': 666, 'cw': [[[0.3, 2.3]]], 'co': [[[0.05, 0.05]]], 'cp': [[[0.9, 0.9]]]},

        eoframe: eoframe,
        eoload: {},

      }

      // .................. cameraOrthoAni anima
      let lightHemisphereAni = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'lightHemisphereAni'},
        eohal: eonEohalSol,

        eofold: anitem => {
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

      // .................. cameraOrthoAni anima
      let cameraOrthoAni = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'cameraOrthoAni'},
        eohal: eonEohalSol,

        eofold: anitem => {
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
              rotation: [0, 0, 0],
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

      // .................. gridHelper anima
      let gridHelper = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'gridHelper'},
        eohal: eonEohalSol,

        eofold: anitem => {
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

              position: [0, 0, 0 ],
            },
          }

          return json
        },

      }

      let animas = [
        geoearth, //
        geofaces, //
        geograt, //
        cameraOrthoAni, // h.sol

        lightHemisphereAni, // h.sol
        spotLight, // h.sol
        cameraOrthoHelper, // h.sol
        gridHelper, // h.sol
      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ421bD3earthOrtho = anitem
}))
