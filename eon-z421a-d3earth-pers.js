/* ******************************************
   *    @eonZ421aD3earthPers
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ421aD3earthPers = global.eonZ421aD3earthPers || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    d3Geo,
    d3Geoprojection,
    topojson,
    ctlVersor,
    ctlWen,
    datWorldTopo110m,
    eohalMars,
    eohalSol,
    muonGeoj,
    muonGeom,
    muonGraticule,
    muonNatform,
    protonNatform,
    protonOrthographic,
    renderPortview,
    renderWebgl,
  ] = await Promise.all([
    __eo('xs').b('d3-geo'),
    __eo('xs').b('d3-geo-projection'),
    __eo('xs').b('topojson'),
    __eo('xs').c('versor'),
    __eo('xs').c('wen'),
    __eo('xs').d('worldTopo110m'),
    __eo('xs').e('mars'),
    __eo('xs').e('sol'),
    __eo('xs').m('geoj'),
    __eo('xs').m('geom'),
    __eo('xs').m('graticule'),
    __eo('xs').m('natform'),
    __eo('xs').p('natform'),
    __eo('xs').p('orthographic'),
    __eo('xs').r('portview'),
    __eo('xs').r('webgl'),
  ])
  // .................. animas
  let z = function () {
    // .................. pics
    let eotim = {'td': 10800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

    // ..................

    let eoform = {

      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, 		// circle
        'v0': 0, 'v1': 1,
        'ra2': 60,
        'w4': 0, // [[[180,360,180]]], // [[[0,-360,0]]],
        'seg5': 360, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, 		// circle
        'v0': 0, 'v1': 1,
        'ra2': 60,
        'w4': 90, // [[[60, 60 + 1 * 360]]], // [[[0,-360,0]]],
        'seg5': 360, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
      },
      z: {
        // 'm1': [[[2, 2]]], 'm2': [[[2, 2]]], 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, 		// circle
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, 		// circle
        'v0': 0, 'v1': 1,
        'ra2': 60,
        'w4': 0, // [[[180,360,180]]], // [[[0,-360,0]]],
        'seg5': 360, 'pa6': 0, 'pb7': -1,
        'dom3': [-90, 90],
      },
      w: {
        // 'm1': [[[2, 2]]], 'm2': [[[2, 2]]], 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, 		// circle
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, 		// circle
        'v0': 0, 'v1': 1,
        'ra2': 60,
        'w4': 0, // [[[180,360,180]]], // [[[0,-360,0]]],
        'seg5': 360, 'pa6': 0, 'pb7': -1,
        'dom3': [-90, 90],
      },
    }

    let eoframe = {

      multiframe: [ [-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ],

    }
    // ............................. geoearth
    let geoearth = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {'gid': 'geoearth', 'cid': 'geoearth', 'fid': 'geoearth'},

      eofold: p => {
        let gjMultiLineString = Object.assign({},
          topojson.mesh(
            datWorldTopo110m.data(),
            datWorldTopo110m.data().objects.land
          )
        )
        let res = {
          type: 'Feature',
          geometry: gjMultiLineString,
          properties: {},
        }
        return res
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
    // ............................. geosphere
    let geosphere = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {gid: 'geosphere', cid: 'geosphere', fid: 'geosphere'},

      eofold: ani => {
        let res
        res = muonGraticule.gjfMultiPolygon(ani.eoload.eoframe)
        res.properties.pointRadius = 0.1 // 3 multiPointToScene
        res.properties.pointColor = 0x88ff88 // 3 multiPointToScene

        return res
      },

      eomot: {
        conform: {
          projection: 'natform',
          eoform: eoform,
        },
      },

      eocrom: { 'csx': 0, 'cf': [[[222, 222]]], 'cs': 666, 'cw': [[[0.3, 2.3]]], 'co': [[[0.05, 0.05]]], 'cp': [[[0.9, 0.9]]]},

      eoload: {
        eoframe: eoframe,
      },

    }
    // ............................. geograt
    let geograt = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {'gid': 'geograt', 'cid': 'geograt', 'fid': 'geograt'},

      eofold: ani => {
        let res
        res = muonGraticule.gjfMultiLineString(ani.eoload.eoframe)
        return res
      },

      eomot: {
        conform: {
          projection: 'natform',
          eoform: eoform,
        },
      },

      eocrom: { 'csx': 0, 'cf': [[[555, 555]]], 'cs': 666, 'cw': [[[0.3, 2.3]]], 'co': [[[0.05, 0.05]]], 'cp': [[[0.9, 0.9]]]},

      eoload: {
        eoframe: eoframe,
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
      eohal: eohalSol,

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
            aspect: renderPortview.width() / renderPortview.height(),
            near: 0.001,
            far: 600,

            position: [0, 0, 200 ],
            rotation: [0, 0, 0],

            distance2nodesFactor: 100,
            lookAt: [0, 0, 0],
          },
        }
        return json
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

          fov: 20, // field of view
          aspect: renderPortview.width() / renderPortview.height(),
          near: 0.001,
          far: 400,

          position: [0, 0, 100],
          rotation: [0, 0, 0],
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

            position: [0, 0, 0 ],
          },
        }

        return json
      },

    }

    let animas = [
      geoearth, //
      geosphere, //
      geograt, //
      cameraPersAni, // h.sol
      lightHemisphereAni, // h.sol
      spotLight, // h.sol
      cameraPersHelper, // h.sol
      gridHelper, // h.sol
    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ421aD3earthPers = anitem
}))