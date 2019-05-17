/* ******************************************
   *    @eonZ710rD3dropnat
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ710rD3dropnat = global.eonZ710rD3dropnat || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      d3,
      eonCtlWen,
      eonEohalNatform,
      eonEohalMars,
      eonEohalSol,
      eonMuonNatform,
      eonMuonProps,

      eonRenderWebgl,
    ] = await Promise.all([
      __eo('xs').b('d3'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-natform'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-sol'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-props'),

      __eo('xs').b('eon-render-webgl'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    // .................. animas
    let z = function () {
    // .................. pics
      let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      let radians = Math.PI / 180, degrees = 180 / Math.PI,
        sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt

      let conform = {
        'x': {
          'm1': 1, 'm2': 1, 'n1': 0.5, 'n2': 0.5, 'n3': 0.5, 'a': 1, 'b': 1, // drop
          'ra2': 260, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 32, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180], // r.form.circ [-1.57, 1.57]
          'fn0': (e, c, d) => c[0] * cos(e[0]),
        },
        'y': {
          'm1': 1, 'm2': 1, 'n1': 0.5, 'n2': 0.5, 'n3': 0.5, 'a': 1, 'b': 1, // drop
          'ra2': 260, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 32, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, d) => c[1] * sin(e[0]) * cos(e[3]),
        },
        'z': {
          'm1': 1, 'm2': 1, 'n1': 0.5, 'n2': 0.5, 'n3': 0.5, 'a': 1, 'b': 1, // drop
          'ra2': 260, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 32, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, d) => c[1] * sin(e[0]) * sin(e[3]),
        },
        'w': {
          'm1': 1, 'm2': 1, 'n1': 0.5, 'n2': 0.5, 'n3': 0.5, 'a': 1, 'b': 1, // drop
          'ra2': 260, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 32, 'pa6': 0, 'pb7': -1,
          'dom3': [-90, 90],
          'fn0': (e, c, d) => e[3],
        },
      }

      let proform = {

        projection: 'uniwen',
        scale: [1, 1],

        translate: [ [0, 0, 0] ],
        rotate: [ 0, 0, 0 ],
        rotate: [ [[[90 + 0, 90 + 1 * 360]]], 90, 12 ],
        lens: [0, 1, Infinity],
      }

      // .................. natAni
      let natAni = {

        eotim: eotim,
        eohal: eonEohalMars,
        eoric: {gid: 'nat', cid: 'nat', fid: 'nat'},

        eofold: ani => eonMuonNatform.natMultiPolygon({eoform: ani.eoload.eoform}),

        eomot: {
          proform: proform,
        },

        eocrom: { 'csx': 0, 'cf': [[[777, 777, 777]]], 'co': [[[0.9, 0.9]]], 'cs': [[[888, 888]]], 'cw': [[[1.9, 1.9]]], 'cp': [[[0.7, 0.9]]]},

        eoload: {
          eoform: conform,
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

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [0, 0, 0],
            },
            properties: anitem.eoload.light,
          }
          return json
        },
        eoload: {
          light: {
            sort: 'light',
            type: 'SpotLight',
            name: 'spotLight',
            color: [[[222, 777, 222]]], // 0xe4eef9,
            intensity: 0.99,
            position: [-400, 400, 400],
            normalize: 1,
            castShadow: 1,
          },
        },

      }
      // .................. animas
      let animas = [

        natAni, // h.mars g.uniwen

      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ710rD3dropnat = anitem
}))
