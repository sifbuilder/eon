/* ******************************************
   *    @eonZ792aD3octa
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ792aD3octa = global.eonZ792aD3octa || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3,
    d3Geo,
    THREE,
    d3Force3d,
    eonCtlWen,
    eonEohalMars,
    eonEohalSol,
    eonMuonGraticule,
    eonMuonGeom,
    eonProtonNatform,
    eonRenderPortview,
    eonRenderWebgl,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').b('d3-geo'),
    __eo('xs').b('three'),
    __eo('xs').b('d3-force-3d'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-sol'),
    __eo('xs').b('eon-muon-graticule'),
    __eo('xs').b('eon-muon-geom'),
    __eo('xs').b('eon-proton-natform'),
    __eo('xs').b('eon-render-portview'),
    __eo('xs').b('eon-render-webgl'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let sin = Math.sin, cos = Math.cos

    // .................. pics
    // z.dom3: [-180, [[[160,180,180]]] ]
    // eoload.geoframe: [-0, 180, 22.5, 22.5]
    // https://en.wikipedia.org/wiki/Surface_of_revolution
    let eotim = {'td': 23800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let formCirc = {
      'x': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, dax) =>
          c[0] * cos(e[0]) * c[2] * cos(e[2]),

      },
      'y': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, dax) =>
          c[1] * sin(e[0]) * c[2] * cos(e[2]),
      },
      'z': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, dax) =>
          c[3] * sin(e[3]),

      },
    }

    // -------------------------------  circform1
    let circform1 = {

      eohal: eonEohalMars,

      eofold: p => {
        // indexer:       eonMuonGraticule.tidx(4, 3)  : 2,1 (col,row) => 6
        // reverindexer : eonMuonGraticule.ridx(4, 3)  : 6 => [2, 1] (col,row)

        // vertices ordinals
        // 8 _ 9 _ 10 _ 11    // [[-180, 90],[-90, 90],[0, 90],[90, 90],
        // 4 _ 5 _  6 _  7    // [[-180,  0],[-90,  0],[0,  0],[90,  0],
        // 0 _ 1 _  2 _  3    // [[-180,-90],[-90,-90],[0,-90],[90,-90],

        // let vertices = [
        // [-180,-90],
        // [-90,-90],
        // [0,-90],
        // [90,-90],

        // [-180,0],
        // [-90,0],
        // [0,0],
        // [90,0],

        // [-180,90],
        // [-90,90],
        // [0,90],
        // [90,90]
      // ]

      // let quads = [
        // [0,1,5,4],
        // [4,5,9,8],
        // [1,2,6,5],
        // [5,6,10,9],
        // [2,3,7,6],
        // [6,7,11,10],
        // [3,0,4,7],
        // [7,4,8,11]
      // ]

        let vertices = eonMuonGraticule.gjfMultiPoint(p.eoframe).geometry.coordinates
        let quads = eonMuonGraticule.qfaces(p.eoframe)
        let faces = quads.reduce((p, q) => [...p, ...eonMuonGeom.convextriang(q)], [])

        let featureMultiPoint = {

          type: 'Feature',
          geometry: {
            type: 'MultiPoint',
            coordinates: vertices,
          },
          properties: {
            sort: 'form',
            eoMultiPolygon: 1,
            faces: faces,
          },
        }

        return featureMultiPoint
      },

      eotim: eotim,
      eoric: {'gid': 'grat', 'cid': 'grat', 'fid': 'circform1'},
      eocrom: { 'csx': 0, 'cf': 333, 'cs': 333, 'cw': 0.9, 'co': 0.1, 'cp': 0.9 },

      eomot: {

        conform: {
          projection: 'natform',
          eoform: formCirc,
        },

        proform: {
          projection: 'uniwen',
          // prerotate: [[[ ctl.rotation ]]],
          translate: [0, 0, 0],
          scale: 0.90, // 'rotate': [ [[[0,90]]], [[[0,90]]], [[[0,90]]]],
          rotate: [ 0, 0, 0 ],
          lens: [ 0, 1, Infinity ],
        },
      },

      eoframe: {

        geoframe: [ [ [ -180, 180, 90, 90], [ -90, 90, 90, 90] ] ],

      },
      eoload: {
      },
    }

    // -------------------------------  vertsani148
    let vertsani148 = {

      eohal: eonEohalMars,

      eofold: ani => {
        let vertices = eonMuonGraticule.gjfMultiPoint(ani.eoload.eoframe).geometry.coordinates

        let featureMultiPoint = {

          type: 'Feature',
          geometry: {
            type: 'MultiPoint',
            coordinates: vertices,
          },
          properties: {
            sort: 'form',
          },
        }

        return featureMultiPoint
      },

      eotim: eotim,
      eoric: {'gid': 'grat', 'cid': 'grat', 'fid': 'vertsform'},
      eocrom: { 'csx': 0, 'cf': 333, 'cs': 333, 'cw': 0.9, 'co': 0.1, 'cp': 0.9 },

      eomot: {

        // conform: {
        // projection: 'natform',
        // eoform: formCirc,
        // },

        proform: {
          projection: 'uniwen',
          // prerotate: [[[ ctl.rotation ]]],
          translate: [0, 0, 0],
          scale: 0.90, // 'rotate': [ [[[0,90]]], [[[0,90]]], [[[0,90]]]],
          rotate: [ 0, 0, 0 ],
          lens: [ 0, 1, Infinity ],
        },
      },

      eoload: {
        eoframe: {

          geoframe: [ [ [ -180, 180, 90, 90], [ -90, 90, 90, 90] ] ],

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
            fov: 100, // field of view
            aspect: eonRenderPortview.width() / eonRenderPortview.height(),
            near: -400,
            far: 400,

            position: [0, 0, 600 ],
            rotation: [0, 0, 0],
            distance2nodesFactor: 100,
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

            position: [0, -300, 0 ],
          },
        }

        return json
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
          position: [-400, 400, 400],
          normalize: 1,
          castShadow: 1,
        },
      },
    }

    // .................. cameraOrthoAni anima
    let ambientLight = {

      eotim: eotim,
      eoric: {gid: 'light', cid: 'light', fid: 'AmbientLight'},
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
          type: 'AmbientLight',
          name: 'AmbientLight',
          color: 0xeeeeee,
          intensity: 0.9,
          position: [400, 400, 400],
        },
      },

    }

    // .................. animas
    let animas = [
      cameraPersAni, // h.sol
      circform1, // h.mars
      gridHelper, // h.sol
      ambientLight, // h.sol
      spotLight, // h.sol
      vertsani148, //
    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ792aD3octa = anitem
}))