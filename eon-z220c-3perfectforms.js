/* ******************************************
   *    @eonZ220c3perfectforms
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ220c3perfectforms = global.eonZ220c3perfectforms || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonEohalMars,
      eonEohalSol,
      eonMuonNatform,
      eonRenderWebgl, // eslint-disable-line no-unused-vars
    ] = await Promise.all([
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-sol'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-render-webgl'),
    ])

    // .................. animas
    let z = function () {
    // .................. pics

      let sin = Math.sin, cos = Math.cos

      let eotim = {td: 16800, t0: 0, t1: 1, t2: 1, t3: 1}

      // ............................. natAni4

      let natAni4 = {
        eohal: eonEohalMars,
        eotim: eotim,
        eoric: {gid: 'g', cid: 'c', fid: 'f4'},

        eofold: ani => {
          let f = eonMuonNatform.natMultiLineString({
            eoform: ani.eoform,
            ghv: 0,
            gsa: 0,
            gco: 0,
          })

          return f
        },
        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [ 0, -100, 0], //
            scale: [1, 1, 1],
            rotate: [ 0, 0, 90 ],
            lens: [0, 1, Infinity],
          },
        },
        eoform: { // fisio 6
          x: {
            'm1': [[[4, 4]]], 'm2': [[[2, 2]]], 'n1': [[[2, 2]]], 'n2': [[[2, 2]]], 'n3': [[[2, 2]]], 'a': [[[4, 4]]], 'b': [[[-1, -1]]],
            // 'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
            'v0': 0, 'v1': 1,
            'ra2': 320,
            'w4': 0,
            'seg5': 36, // [[[12,64]]],
            'pa6': 0, 'pb7': -1,
            'dom3': [-180, 180], // r.form.circ [-1.57, 1.57]
            'fn0': (e, c, d) => c[0] * cos(e[0]), // 0
          },
          y: {
            'm1': [[[4, 4]]], 'm2': [[[2, 2]]], 'n1': [[[2, 2]]], 'n2': [[[2, 2]]], 'n3': [[[2, 2]]], 'a': [[[4, 4]]], 'b': [[[-1, -1]]],
            // 'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
            'v0': 0, 'v1': 1,
            'ra2': 320,
            'w4': 0,
            'seg5': 36, // [[[12,64]]],
            'pa6': 0, 'pb7': -1,
            'dom3': [-180, 180],
            'fn0': (e, c, d) => c[1] * sin(e[0]) * cos(e[3]), // 0,3
          },
          z: {
            'm1': [[[6, 6]]], 'm2': [[[2, 2]]], 'n1': [[[2, 2]]], 'n2': [[[2, 2]]], 'n3': [[[2, 2]]], 'a': [[[4, 4]]], 'b': [[[-1, -1]]],
            'v0': 0, 'v1': 1,
            'ra2': 320,
            'w4': 0,
            'seg5': 36,
            'pa6': 0, 'pb7': -1,
            'dom3': [0, 180 ],
            'fn0': (e, c, d) => c[0] * sin(e[0]) * sin(e[3]), // 0,3
          },
          w: {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ          'v0': 0, 'v1': 1,
            'ra2': 320,
            'w4': 0,
            'seg5': 3,
            'pa6': 0, 'pb7': -1,
            'dom3': [0, [[[0, 180]]] ],
            'fn0': (e, c, d) => c[1] * sin(e[0]) * sin(e[3]), // 0,3
          },
        },
        eocrom: {'csx': 0, 'cf': [[[333, 888, 333]]], 'co': [[[0.9, 0.9]]], 'cs': [[[666, 666]]], 'cw': [[[0.09, 0.09]]], 'cp': [[[0.07, 0.09]]]},
        eoload: {},
      }

      // ............................. natAni4

      let natAni3 = {
        eohal: eonEohalMars,
        eotim: eotim,
        eoric: {gid: 'g', cid: 'c', fid: 'f3'},

        eofold: ani => eonMuonNatform.natMultiPolygon({eoform: ani.eoform, ghv: 1}),
        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [ 0, -100, 0], //
            scale: [1, 1, 1],
            rotate: [ 0, [[[0, 360]]], 90 ],
            lens: [0, 1, Infinity],
          },
        },
        eoform: { // fisio 6
          x: {
            'm1': [[[6, 6]]], 'm2': [[[2, 2]]], 'n1': [[[2, 2]]], 'n2': [[[2, 2]]], 'n3': [[[2, 2]]], 'a': [[[4, 4]]], 'b': [[[-1, -1]]],
            'v0': 0, 'v1': 1,
            'ra2': 320,
            'w4': 0,
            'seg5': [[[90, 90, 90]]],
            'pa6': 0, 'pb7': -1,
            'dom3': [-180, 180], // r.form.circ [-1.57, 1.57]
            'fn0': (e, c, d) => c[0] * cos(e[0]), // 0
          },
          y: {
            'm1': [[[6, 6]]], 'm2': [[[2, 2]]], 'n1': [[[2, 2]]], 'n2': [[[2, 2]]], 'n3': [[[2, 2]]], 'a': [[[4, 4]]], 'b': [[[-1, -1]]],
            'v0': 0, 'v1': 1,
            'ra2': 320,
            'w4': 0,
            'seg5': [[[90, 90, 90]]],
            'pa6': 0, 'pb7': -1,
            'dom3': [-180, 180],
            'fn0': (e, c, d) => c[1] * sin(e[0]) * cos(e[3]), // 0,3
          },
          z: {
            'm1': [[[6, 6]]], 'm2': [[[2, 2]]], 'n1': [[[2, 2]]], 'n2': [[[2, 2]]], 'n3': [[[2, 2]]], 'a': [[[4, 4]]], 'b': [[[-1, -1]]],
            'v0': 0, 'v1': 1,
            'ra2': 320,
            'w4': 0,
            'seg5': [[[90, 90, 90]]],
            'pa6': 0, 'pb7': -1,
            'dom3': [-180, 180],
            'fn0': (e, c, d) => c[1] * sin(e[0]) * sin(e[3]), // 0,3
          },
          w: {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ          'v0': 0, 'v1': 1,
            'ra2': 320,
            'w4': 0,
            'seg5': 24,
            'pa6': 0, 'pb7': -1,
            'dom3': [-180, 180],
            'fn0': (e, c, d) => c[1] * sin(e[0]) * sin(e[3]), // 0,3
          },
        },
        eocrom: {'csx': 0, 'cf': [[[333, 888, 333]]], 'co': [[[0.9, 0.9]]], 'cs': [[[666, 666]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.9, 0.9]]]},
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

        eofold: anitem => {
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
      // ............................. scene
      let scene = {

        spotLight, // h.sol
        lightHemisphereAni, // h.sol
        natAni3, // h.mars
        natAni4, // h.natform

      }

      return scene
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ220c3perfectforms = anitem
}))
