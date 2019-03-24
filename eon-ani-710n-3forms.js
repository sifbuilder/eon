
/* ******************************************
   *    @ani000a
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.ani710n3forms = global.ani710n3forms || {})))
}(this, function (exports) {
  'use strict'

  // ... ** **
  // .................. anitem
  async function anitem (__eo) {
  // .................. eons
    let [
      muonNatform,

      ctlWen,
      eohalMars,
      eohalSol,

      renderPortview,
      renderWebgl,
    ] = await Promise.all([
      __eo('xs').m('natform'),

      __eo('xs').c('wen'),
      __eo('xs').e('mars'),
      __eo('xs').e('sol'),

      __eo('xs').r('portview'),
      __eo('xs').r('webgl'),
    ])
    try { renderSvg.scenecolor('black') } catch (e) { }
    let ctl
    try { ctl = ctlWen().control(renderSvg.svg()) } catch (e) { ctl = () => [0, 0, 0] }
    // .................. animas
    let ani = function () {
    // .................. pics

      let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      let  sin = Math.sin, cos = Math.cos


      let conform = {
        'x': {

          'm1': [[[-4, -2, -7.66, -8 ]]],
          'm2': [[[-3.3, -3, -3.73, -3.5 ]]],
          'n1': [[[16.24, 16.24, 16.24, 16.24 ]]],
          'n2': [[[6, 6, 5.98, 6 ]]],
          'n3': [[[15, 17, 17, 13 ]]],
          'a': [[[9, 9, 8.98, 9 ]]],
          'b': [[[0.2, 0.2, 0.19, 0.2 ]]],

          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 94.001, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180], // r.form.circ [-1.57, 1.57]
          'fn0': (e, c, d) => c[0] * cos(e[0]), // 0

        },
        'y': {

          'm1': [[[-4, -2, -7.66, -8 ]]],
          'm2': [[[-3.3, -3, -3.73, -3.5 ]]],
          'n1': [[[16.24, 16.24, 16.24, 16.24 ]]],
          'n2': [[[6, 6, 5.98, 6 ]]],
          'n3': [[[15, 17, 17, 13 ]]],
          'a': [[[9, 9, 8.98, 9 ]]],
          'b': [[[0.2, 0.2, 0.19, 0.2 ]]],

          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 94.001, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],

          'fn0': (e, c, d) => c[1] * sin(e[0]) * cos(e[3]), // 0,3

        },

        'z': {

          'm1': [[[-4, -2, -7.66, -8 ]]],
          'm2': [[[-3.3, -3, -3.73, -3.5 ]]],
          'n1': [[[16.24, 16.24, 16.24, 16.24 ]]],
          'n2': [[[6, 6, 5.98, 6 ]]],
          'n3': [[[15, 17, 17, 13 ]]],
          'a': [[[9, 9, 8.98, 9 ]]],
          'b': [[[0.2, 0.2, 0.19, 0.2 ]]],

          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 24, 'pa6': 0, 'pb7': -1,

          'dom3': [-90, 90],

          'fn0': (e, c, d) => c[1] * sin(e[0]) * sin(e[3]), // 0,3

        },

        'w': {

          'm1': [[[-4, -2, -7.66, -8 ]]],
          'm2': [[[-3.3, -3, -3.73, -3.5 ]]],
          'n1': [[[16.24, 16.24, 16.24, 16.24 ]]],
          'n2': [[[6, 6, 5.98, 6 ]]],
          'n3': [[[15, 17, 17, 13 ]]],
          'a': [[[9, 9, 8.98, 9 ]]],
          'b': [[[0.2, 0.2, 0.19, 0.2 ]]],

          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 24, 'pa6': 0, 'pb7': -1,
          'dom3': [-90, 90],

          'fn0': (e, c, d) => e[3],

        },

      }

      // .................. natAni
      let natAni = {

        eohal: eohalMars,
        eotim,
        eoric: {gid: 'nat', cid: 'nat', fid: 'nat'},

        eofold: ani => muonNatform.natMultiPolygon({eoform: ani.eoload.eoform}),

        eomot: {
          proform: {

            projection: 'uniwen',
            scale: [ 1, 1, 1],
            translate: [ 0, 100, 0 ],
            rotate: [ 0, 0, -90 ], // [ 0, 0, 0 ], // [ 0, [[[0,360]]], -90 ],
            prerotate: [[[ ctl.rotation ]]],
            lens: [0, 1, Infinity ],

          },
        },

        eoload: {
          eocrom: { 'csx': 0, 'cf': [[[666, 666, 666]]], 'co': [[[0.9, 0.9]]], 'cs': [[[888, 888]]], 'cw': [[[1.9, 1.9]]], 'cp': [[[0.7, 0.9]]]},
          eoform: conform,
        },

      }
      // .................. cameraPersAni anima
      let cameraPersAni = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'cameraPersAni'},
        eohal: eohalSol,

        eofold: ani => {
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
              far: 1600,

              position: [0, 0, 200 ],
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
        eohal: eohalSol,

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
        eohal: eohalSol,

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
        eohal: eohalSol,

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
        natAni, // h.mars g.uniwen
        lightHemisphereAni, // h.sol
        spotLight, // h.sol
        ambientLight, // h.sol
      ]

      return animas
    }

    let enty = () => {}
    enty.ani = ani
    return enty
  }
  exports.ani710n3forms = anitem
}))
