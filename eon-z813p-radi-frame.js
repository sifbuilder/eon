/* ******************************************
   *    @eonZ813pRadiFrame
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ813pRadiFrame = global.eonZ813pRadiFrame || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonCtlWen,
      eonEohalMars,
      eonEohalSol,
      eonMuonGraticule,
      eonMuonNatform,
      eonProtonNatform,
      eonRenderPortview,
      // eonRenderSvg,
      eonRenderWebgl,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-sol'),
      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-proton-natform'),
      __eo('xs').b('eon-render-portview'),
      // __eo('xs').b('eon-render-svg'),
      __eo('xs').b('eon-render-webgl'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    // .................. animas
    let z = function () {
    // .................. pics

      let radians = Math.PI / 180, degrees = 180 / Math.PI,
        sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt

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
      let exp = [infact0, infact1, infact2, infact3, infact4, infact5, infact6, infact7, infact8, infact9]

      // ............................. pics
      let eotim = {'td': 12600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tf: t => t}

      let conform1 = {
        'x': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [],
          e: [ cost, 1, 1, cost ],
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [],
          e: [ 1, sint, 1, cost ],
        },
        'z': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
          'dom3': [-90, 90],
          c: [],
          e: [ 1, 1, 1, sint ],
        },
        'w': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
          'dom3': [-90, 90],
          c: [],
          e: [ 1, 1, 1, cost ],
        },

      }

      let conform2 = {
        'x': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ [[[1, 1, 2, 3, 12, 6, 1, 1]]], 1, 1, 1],
          // e: [ cost, 1, 1, cost ],
          fn0: (e, c, d) => {
            return cos(e[0]) * cos(e[2] / d.c[0])
          },
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ [[[1, 1, 2, 3, 12, 6, 1, 1]]], 1, 1, 1],
          // e: [ 1, sint, 1, cost ],
          fn0: (e, c, d) => {
            return sin(e[1]) * cos(e[2] / d.c[0])
          },

        },
        'z': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
          'dom3': [-90, 90],
          c: [],
          e: [ 1, 1, 1, sint ],
        },
        w: {
          m1: 4, m2: 4, n1: 2, n2: 2, n3: 2, a: 1, b: 1, // circ
          ra2: 1, v0: 0, v1: 1, w4: 0, seg5: 24, pa6: 0, pb7: -1,
          dom3: [0, 90],
          fn0: (e, c, d) => {
            return cos(e[2])
          },
        },
      }

      let eocrom = { 'csx': 0, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
        'cs': [[[666, 333, 666]]], 'cw': [[[0.7, 0.7, 0.7]]], 'cp': [[[0.9, 0.9]]]}

      // ............................. natAni1
      let natAni1 = {

        eohal: eonEohalMars,
        eotim,
        eoric: {gid: 'q', cid: 'q', fid: 'q1'},

        eofold: ani => {
          let natipros = {
            eoform: ani.eoload.eoform,
            ghv: 0, // horizontal geodesics
            gsa: 0, // asymetric distribution of geodesics around the origin
            gco: 0, // open line
          }
          // return eonMuonNatform.natMultiLineString(natipros) // Feature.LineString
          return eonMuonNatform.natMultiPolygon(natipros) // Feature.LineString
        },

        eomot: {
          ereform: {
            projection: 'uniwen', scale: [1, 1, 1], translate: [-120, 0, 0], rotate: [ [[[-30,-30,-60,-60, -30]]], 0, [[[0,180, 360]]] ],
          },
          proform: {
            projection: 'uniwen', scale: [1, 1, 1], translate: [0, 0, 0], rotate: [[[ctl.rotation]]],
          },
        },

        eoload: {
          eocrom: eocrom,
          eoform: conform1,
        },

      }
      // ............................. natAni2
      let natAni2 = {

        eohal: eonEohalMars,
        eoric: {gid: 'q', cid: 'q', fid: 'q2'},
        eotim: eotim,

        eofold: ani => {
          let natipros = {
            eoform: ani.eoload.eoform,
            ghv: 0, // horizontal geodesics
            gsa: 0, // asymetric distribution of geodesics around the origin
            gco: 0, // open line
          }
          // return eonMuonNatform.natMultiLineString(natipros) // Feature.LineString
          return eonMuonNatform.natMultiPolygon(natipros) // Feature.LineString
        },

        eomot: {
          ereform: {
            projection: 'uniwen', scale: [1, 1, 1], translate: [120, 0, 0], rotate: [[[[-30,-30,-60,-60, -30]]], 0, [[[0,180, 360]]]],
          },
          proform: {
            projection: 'uniwen', scale: [1, 1, 1], translate: [0, 0, 0], rotate: [[[ctl.rotation]]],
          },
        },

        eoload: {
          eocrom: eocrom,
          eoform: conform2,
        },

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

              position: [0, 0, 600 ],
              rotation: [0, 0, 0 ],

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
            intensity: 0.69,
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
            intensity: 0.2,
            position: [110, 110, 110],
          },
        },
      }

      // ............................. animas
      let animas = [

        natAni1, // h.natform
        natAni2, // h.natform

        cameraPersAni, // h.sol

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
  exports.eonZ813pRadiFrame = anitem
}))
