/* ******************************************
   *    @eonZ814kD3heart
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ814kD3heart = global.eonZ814kD3heart || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonMuonNatform,
      eonMuonProps,
      eonCtlWen,
      eonEohalMars,
      eonEohalSol,
      eonEohalNatform,
      eonRenderPortview,
      eonRenderWebgl,
    ] = await Promise.all([
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-sol'),
      __eo('xs').b('eon-eohal-natform'),
      __eo('xs').b('eon-render-portview'),
      __eo('xs').b('eon-render-webgl'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    // .................. animas
    let z = function () {
    // .................. pics
      let eotim = {'td': 24800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

      let pi = Math.PI, pih = Math.PI / 2,
        radians = Math.PI / 180, degrees = 180 / Math.PI,
        sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
        sinh = Math.sinh, cosh = Math.cosh, tanh = Math.tanh,
        exp = Math.exp,
        epsilon = 1e-5

      let fact = n => n - 1 > 0 ? n * fact(n - 1) : n
      let fact1 = 1,
        fact2 = 2,
        fact3 = 6,
        fact4 = 24,
        fact5 = 280,
        fact6 = 720,
        fact7 = 5040,
        fact8 = 40320,
        fact9 = 362880
      let infact1 = 1 / fact1,
        infact2 = 1 / fact2,
        infact3 = 1 / fact3,
        infact4 = 1 / fact4,
        infact5 = 1 / fact5,
        infact6 = 1 / fact6,
        infact7 = 1 / fact7,
        infact8 = 1 / fact8,
        infact9 = 1 / fact9

      let sinp = [1, 0, -infact2, 0, +infact4, 0, -infact6, 0, infact8]
      let cosp = [0, +1, 0, -infact3, 0, +infact5, 0, -infact7, 0, infact9]

      let conform = {
        'x': {
          // "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"a":1,"b":1,  // drop
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          // 'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // craft
          'ra2': 280, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[24, 48]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ [[[0, 0, 1, 1, 1, 1]]], [[[0, 0, 0, 1, 1, 1]]], 1, 1 ],
          'fn0': (e, c, d) => cos(e[0]) * cos(e[2]),
          'fn0': (e, c, d) => cos(e[0]) * cos(e[2]) * (1 - d.c[1] * sin(e[0])),
          'fn0': (e, c, d) => cos(e[0]) * cos(e[2]) * (1 - d.c[1] * sin(e[0])),
          'fn0': (e, c, d) => cos(e[0]) * cos(e[2]) * (1 - d.c[0] * sin(e[0])) * (1 - d.c[1] * sin(e[0] + pi)),

        },
        'y': {

          // "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"a":1,"b":1,   // drop
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          // 'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // craft
          'ra2': 280, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[24, 48]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ 1, [[[0, 0, 0, 0, 1, 1]]], 1, 1 ],
          fn0: (e, c, d) => sin(e[0]) * cos(e[2]) * (1 - d.c[1] * sin(e[1])),

        },

        'z': {
        // "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"a":1,"b":1,  // drop
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          // 'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          // 'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // craft
          'ra2': 280, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[24, 48]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-90, 90],
          c: [ 1, 1, [[[1, 1, 1, 1, 1, 2]]], [[[1, 1, 1, 1, 1, 0.25]]] ],
          'fn0': (e, c, d) => sin(d.c[2] * e[2]) * d.c[3],

        },

        'w': {
        // "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"a":1,"b":1,  // drop
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          // 'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6,'n3': 13,'a': 9,'b': 0.2,
          'ra2': 280, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 24, 'pa6': 0, 'pb7': -1,
          'dom3': [-90, 90],
          c: [ [[[1, 1]]], [[[1, 1]]], [[[0, 90]]], 1 ],
          'fn0': (e, c, d) => e[3],

        },

      }

      // .................. natAniA
      let natAniA = {

        eohal: eonEohalMars,
        eotim,
        eoric: {gid: 'nat', cid: 'nat', fid: 'natA'},

        eofold: ani => eonMuonNatform.natMultiPolygon({eoform: ani.eoform, ghv: 1}),
        eomot: {
          proform: {

            projection: 'uniwen',
            scale: [ 1, 1, 1],
            translate: [ -360, 100, 0 ],
            rotate: [ 0, 0, -0 ], // [ 0, 0, 0 ], // [ 0, [[[0,360]]], -90 ],
            lens: [0, 1, Infinity ],

          },
        },
        eocrom: { 'csx': 0, 'cf': [[[666, 666, 666]]], 'co': [[[0.9, 0.9]]], 'cs': [[[888, 888]]], 'cw': [[[1.9, 1.9]]], 'cp': [[[0.7, 0.9]]]},

        eoform: conform,
        eoload: {},

      }
      // .................. natAniB
      let natAniB = {

        eohal: eonEohalMars,
        eotim,
        eoric: {gid: 'nat', cid: 'nat', fid: 'natB'},

        eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform, ghv: 0}),
        eomot: {
          proform: {

            projection: 'uniwen',
            scale: [ 1, 1, 1],
            translate: [ 360, 100, 0 ],
            rotate: [ 0, 0, 0 ],
            lens: [0, 1, Infinity ],

          },
        },
        eocrom: { 'csx': 0, 'cf': [[[666, 666, 666]]], 'co': [[[0.9, 0.9]]], 'cs': [[[888, 888]]], 'cw': [[[1.9, 1.9]]], 'cp': [[[0.7, 0.9]]]},

        eoform: conform,
        eoload: {},

      }
      // .................. cameraPersAni anima
      let cameraPersAni = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'cameraPersAni'},
        eohal: eonEohalSol,

        eofold: ani => {
          let eoload = ani.eoload
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
              far: 2600,

              position: [0, 0, 1200 ],
              rotation: [0, 0, 0 ],

              vellin: [0, 0, 0 ],
              velang: [0, 0, 0 ],

              distance2nodesFactor: 100,
              lookAt: [0, 0, 0],
            },
          }
          return json
        },
        eoload: {},

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
            skyColor: [[[999, 999]]],
            groundColor: [[[999, 999]]],
            intensity: 0.4,
            position: [0, 0, 0],
          },
        },

      }

      // .................. spotLight anima
      let spotLight = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'spotLight'},
        eohal: eonEohalSol,

        eofold: anitem => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: anitem.eoload.light,
        }),

        eoload: {
          light: {
            sort: 'light',
            type: 'SpotLight',
            name: 'spotLight',
            color: [[[222, 777]]], // 0xe4eef9,
            intensity: 0.99,
            position: [-400, 400, 400],
            normalize: 1,
            castShadow: 1,
          },
        },
      }

      // .................. AmbientLight anima
      let ambientLight = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'ambientLight'},
        eohal: eonEohalSol,

        eofold: anitem => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: anitem.eoload.light,
        }),

        eoload: {
          light: {
            sort: 'light',
            type: 'AmbientLight',
            name: 'AmbientLight',
            color: 0xeeeeee,
            intensity: 0.5,
            position: [110, 110, 110],
          },
        },
      }

      // .................. animas
      let animas = [
        cameraPersAni, // h.sol
        natAniA, // h.mars g.uniwen
        natAniB, // h.mars g.uniwen
        // lightHemisphereAni, // h.sol
        spotLight, // h.sol
        ambientLight, // h.sol
      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ814kD3heart = anitem
}))
