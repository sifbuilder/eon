/* ******************************************
   *    @eonZ792bD3torusTwist
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ792bD3torusTwist = global.eonZ792bD3torusTwist || {})))
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
    let pi = Math.PI, halfpi = Math.PI / 2,
      radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
      sinh = Math.sinh, cosh = Math.cosh, tanh = Math.tanh

    let fact = n => n - 1 > 0 ? n * fact(n - 1) : n
    let fact0 = 1,
      fact1 = 1,
      fact2 = 2,
      fact3 = 6,
      fact4 = 24,
      fact5 = 120,
      fact6 = 720,
      fact7 = 5040,
      fact8 = 40320,
      fact9 = 362880
    let infact0 = 1 / fact0,
      infact1 = 1 / fact1,
      infact2 = 1 / fact2,
      infact3 = 1 / fact3,
      infact4 = 1 / fact4,
      infact5 = 1 / fact5,
      infact6 = 1 / fact6,
      infact7 = 1 / fact7,
      infact8 = 1 / fact8,
      infact9 = 1 / fact9

    let cost = [infact0, 0, -infact2, 0, infact4, 0, -infact6, 0, infact8]
    let sint = [0, infact1, 0, -infact3, 0, infact5, 0, -infact7, 0, infact9]
    let cosht = [infact0, 0, +infact2, 0, infact4, 0, +infact6, 0, infact8]
    let sinht = [0, infact1, 0, +infact3, 0, infact5, 0, +infact7, 0, infact9]
    let exp = [infact0, infact1, infact2, infact3, infact4, infact5, infact6, infact7, infact8, infact9]

    // ............................. pics
    // z.dom3: [-180, [[[160,180,180]]] ]
    // eoload.geoframe: [-0, 180, 22.5, 22.5]
    // https://en.wikipedia.org/wiki/Surface_of_revolution
    let eotim = {'td': 23800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let formCirc = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 64]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        // e: [ cost, 1, 1, cosht ],
        c: [ 1, 1, [[[10, 10]]], [[[5, 5]]]],
        fn0: (e, c, d) => c[0] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * cos(e[2]),
        // c: [ 5, 1, 1, 1],
        // e: [ cost , 1, 1,  cost  ]
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 64]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        // e: [ sint, 1, 1, [infact0, 0, [[[+infact2,-infact2,+infact2,]]], 0, infact4, 0, [[[+infact6,-infact6,+infact6]]], 0, infact8] ],
        // e: [ sint, 1, 1, [infact0, 0, +infact2, 0, infact4, 0, +infact6, 0, infact8] ],
        c: [ 1, 1, [[[10, 10]]], [[[5, 5]]]],
        // e: [ 1 , [0, [[[9,0]]], [[[-10, 1]]] ], 1 , 1 ]
        // e: [ 1 ,  [0, 0, 1, 0 ], 1, 1,  ]
        // 'fn0': (e,c,d) => c[1] * (10 + 5 * cos(e[0])) * c[2] * sin(e[3]),
        fn0: (e, c, d) => c[1] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * sin(e[2]),

      },

      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 64]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        // c: [1, 1, 1, [0,1]],
        // e: [ 1, 1, sint, 1 ], // 1 * sin(v)
        c: [ 1, 1, [[[0, 0, 6, 6]]], [[[5, 5, 5, 5]]] ],
        fn0: (e, c, d) => {
          let r = Math.floor(d.c[2])
          // let r = d.c[2]
          return d.c[3] * c[3] * sin(e[0]) * Math.pow(Math.abs(cos(e[3])), r)
        },
      },

      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'dom3': [ -360, 360 ],
        // c: [ 0, 0 ],
        // e: [0, [1, 1, 0, 0, 0, 0, 0, 0, 0, 0] ], // 1 * id(q)
        fn0: (e, c) => c[3] * cos(e[2]),
      },
    }

    // -------------------------------  formAni
    let formAni = {

      eoric: {'gid': 'grat', 'cid': 'grat', 'fid': 'formAni'},
      eotim: eotim,
      eohal: eonEohalMars,

      eofold: p => {
        let vertices = eonMuonGraticule.gjfMultiPoint(p.eoload.eoframe).geometry.coordinates
        let quads = eonMuonGraticule.qfaces(p.eoload.eoframe)
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

      eocrom: { 'csx': 0, 'cf': 333, 'cs': 333, 'cw': 0.9, 'co': 0.1, 'cp': 0.9 },

      eomot: {

        conform: {
          projection: 'natform',
          eoform: formCirc,
        },

        proform: {
          projection: 'uniwen',
          translate: [0, 0, 0],
          scale: 0.05,
          rotate: [ [[[0, 360]]], [[[0, 2 * 360]]], [[[0, 1.5 * 360]]]],
          lens: [ 0, 1, Infinity ],
        },
      },


      eoload: {
        eoframe: {

          geoframe: [ [ [ -180, 180, 9, 9], [ -180, 180, 9, 9] ] ],

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
          properties: anitem.eoload.camera,
        }

        return json
      },
      eoload: {
        camera: {
          sort: 'camera',
          type: 'OrthographicCamera',
          name: 'Orthographic',
          left: -eonRenderPortview.width() / 2,
          right: eonRenderPortview.width() / 2,
          top: eonRenderPortview.height() / 2,
          bottom: -eonRenderPortview.height() / 2,
          near: -900,
          far: 900,

          position: [0, 0, 100 ],
          rotation: [0, 0, 0],
          distance2nodesFactor: 300,
          lookAt: [0, 0, 0],
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

            position: [0, 0, 2600 ],
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
      eoric: {gid: 'camera', cid: 'camera', fid: 'AmbientLight'},
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
       formAni, // h.mars
      // cameraPersAni, // h.sol
      cameraOrthoAni, // h.sol
      gridHelper, // h.sol
      ambientLight, // h.sol
      spotLight, // h.sol

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ792bD3torusTwist = anitem
}))