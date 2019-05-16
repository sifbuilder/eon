/* ******************************************
   *    @eonZ515cGeoearthWen
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ515cGeoearthWen = global.eonZ515cGeoearthWen || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
    // .................. eons
    let [
      topojson,

      eonCtlWen,

      eonDatWorldTopo110m,
      eonEohalMars,

      eonMuonNatform,

      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('topojson'),

      __eo('xs').b('eon-ctl-wen'),

      __eo('xs').b('eon-dat-world-topo110m'),
      __eo('xs').b('eon-eohal-mars'),

      __eo('xs').b('eon-muon-natform'),

      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    // .................. animas
    let z = function () {
      // .................. pics
      let ctl
      try {
        ctl = eonCtlWen().control(eonRenderSvg.svg())
      } catch (e) {
        ctl = () => [0, 0, 0]
      }

      let eotim = { 'td': 18800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1 }

      // .................. pics
      let pi = Math.PI, sin = Math.sin, cos = Math.cos, epsilon = 1e-5

      let conformTangerine = {
        x: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 160, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [1, 1, 1, 1],
          fn0: (e, c, d) => cos(e[0]) * cos(e[2]),
        },
        y: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 160, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [1, 1, 1, 1],
          fn0: (e, c, d) => sin(e[0]) * cos(e[2]),
        },
        z: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 160, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
          'dom3': [-90, 90],
          // c: [ [[[18, 18, 6, 6]]], [[[6, 6, 60, 60]]], 1, 1],
          c: [[[[18, 18, 18, 18]]], [[[12, 12, 12, 12]]], 1, 1],
          fn0: (e, c, d) => sin(e[2] + (pi / d.c[0]) * cos(d.c[1] * e[0])),
        },
        w: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'dom3': [-90, 90],
          fn0: (e, c, d) => d.c[3] * sin(e[2] * (1 + epsilon * sin(e[0]))),
        },

      }

      let proform = {
        projection: 'uniwen',
        scale: [1, 1],
        prerotate: [[[ctl.rotation]]],
        translate: [[0, 0, 0]],
        rotate: [0, 0, 0],
        lens: [0, 1, Infinity],
      }

      // ............................. tangerineAni
      let tangerineAni = {

        eohal: eonEohalMars,
        eotim,
        eoric: { gid: 'q', cid: 'q', fid: 'q2' },

        eofold: ani => eonMuonNatform.natMultiLineString({ eoform: ani.eoform }),

        eomot: {
          proform: proform,
        },

        eocrom: {
          'csx': 0, 'cf': [[[666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
          'cs': [[[333, 333, 333]]], 'cw': [[[0.99, 0.9, 0.99]]], 'cp': [[[0.99, 0.99]]],
        },

        eoform: conformTangerine,
        eoload: {},
      }
      // ............................. earthAni
      let earthAni = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: { gid: 'earthAni', cid: 'earthAni', fid: 'earthAni' },

        eofold: ani => {
          let geometry = Object.assign({},
            topojson.mesh(
              eonDatWorldTopo110m.data(),
              eonDatWorldTopo110m.data().objects.land
            )
          )
          let gj = {
            type: 'Feature',
            geometry: geometry,
            properties: {},
          }
          return gj
        },

        eocrom: { 'csx': 0, 'cf': 444, 'cs': 444, 'cw': 0.69, 'co': 0.09, 'cp': 0.9 },

        eomot: {
          conform: {
            projection: 'natform',
            eoform: conformTangerine,
          },
          proform: proform,
        },

        eoload: {},

      }

      let animas = [
        tangerineAni, //
        earthAni, //
      ]

      return animas
    }

    let enty = () => { }
    enty.z = z
    return enty
  }
  exports.eonZ515cGeoearthWen = anitem
}))
