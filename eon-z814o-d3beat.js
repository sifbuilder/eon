/* ******************************************
   *    @eonZ814oD3beat
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ814oD3beat = global.eonZ814oD3beat || {})))
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
    let eotim = {'td': 9800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

    let
      pi = Math.PI, quar = Math.PI / 2,
      sin = Math.sin, cos = Math.cos

    let conform = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 280, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 64, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [ [[[1, 1, 1, 1]]], [[[0, 0.6, 0, 0.1, 0.6, 0, 0.1, 0.6, 0]]], 1, 1 ],
        fn0: (e, c, d) => cos(e[0] + pi) * (1 - d.c[0] * cos(e[0] + quar)) * (1 - d.c[1] * sin(e[0])) * cos(e[2]),
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 280, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 64, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [ [[[1, 1, 1, 1]]], [[[1, 1, 1, 1]]], 1, 1 ],
        fn0: (e, c, d) => sin(e[0] + pi) * (1 - d.c[0] * cos(e[0] + quar)),
      },

      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 280, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[48, 2, 2, 2]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [ [[[1, 1, 1, 1]]], [[[1, 1, 1, 1]]], 1, 1 ],
        fn0: (e, c, d) => cos(e[0] + pi) * (1 - d.c[0] * cos(e[0] + quar)) * (1 - d.c[1] * sin(e[0])), // * sin(e[2]),
      },

      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 280, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 24, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [ [[[1, 1]]], [[[1, 1]]], [[[0, 90]]], 1 ],
        fn0: (e, c, d) => e[3],

      },

    }

    // .................. natAniB
    let natAniB = {

      eohal: eonEohalMars,
      eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'natB'},

      eofold: ani => eonMuonNatform.natMultiPolygon({eoform: ani.eoload.conform, ghv: 1}),
      eomot: {
        proform: {

          projection: 'uniwen',
          scale: [ 1, 1, 1],
          translate: [ 0, 0, 0 ],
          rotate: [ 0, 98, 0 ],
          lens: [0, 1, Infinity ],

        },
      },
      eocrom: { 'csx': 0, 'cf': [[[666, 666, 666]]], 'co': [[[0.9, 0.9]]], 'cs': [[[888, 888]]], 'cw': [[[1.9, 1.9]]], 'cp': [[[0.7, 0.9]]]},

      eoload: {
        conform: conform,
        tim: [[[0, 0, 1]]],
      },
    }
    // .................. cameraPersAni anima
    let cameraPersAni = {

      eotim: eotim,
      eoric: {gid: 'camera', cid: 'camera', fid: 'cameraPersAni'},
      eohal: eonEohalSol,

      eofold: ani => {
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

            distance2nodesFactor: 100,
            lookAt: [0, 0, 0],
          },
        }
        return json
      },
      eoload: {},

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
      natAniB, // h.mars g.uniwen
      spotLight, // h.sol
      ambientLight, // h.sol
    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ814oD3beat = anitem
}))
