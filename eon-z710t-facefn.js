/* ******************************************
   *    @eonZ710tFacefn
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ710tFacefn = global.eonZ710tFacefn || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonMuonNatform,
      eonMuonProps,
      eonCtlWen,
      eonEohalNatform,
      eonEohalMars,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-natform'),
      __eo('xs').b('eon-eohal-mars'),
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

      let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      let radians = Math.PI / 180, degrees = 180 / Math.PI,
        sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
        pi = Math.PI, pih = Math.PI / 2

      let conform = {
        'x': {
          // "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"a":1,"b":1,  // drop
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 64, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180], // r.form.circ [-1.57, 1.57]
          'fn0': (e, c, d) => cos(q) * cos(v),
          'fn0': (e, c, d) => cos(q),
          'fn0': (e, c, d) => sqrt(sin(q)) * cos(v),
          'fn0': (e, c, d) => (sin(e[0])),

        },
        'y': {
          // "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"a":1,"b":1,   // drop
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 64, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          // 'fn0': (q,s, u=0,v=0, a,b, c=1,d=1) => a * sin(q) * c * cos(v),
          // 'fn0': (q,s, u=0,v=0, a,b, c=1,d=1) => pow(q,3) * sin(q),
          'fn0': (e, c, d) => -(sin(e[0] + pih) - 1) * cos(e[0]) * cos(e[3]),

        },

        _z: {
        // "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"a":1,"b":1,  // drop
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, d) => -(sin(e[0]) - 1) * cos(e[0]) * sin(e[3]),
        },

        _r: {
          'm1': 1, 'm2': 1, 'n1': 0.5, 'n2': 0.5, 'n3': 0.5, 'a': 1, 'b': 1, // drop
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          // 'fn0': (q,s, u=0,v=0, a,b, c=1,d=1) => c * cos(u),
          // 'fn0': (q,s, u=0,v=0, a,b, c=1,d=1) => d,
          // 'fn0': (q,s, u=0,v=0, a,b, c=1,d=1) => { return v },
          'fn0': (e, c, d) => (sin(e[0]) - 1),
        },

      }

      let proform = {

        projection: 'uniwen',
        // scale: [1, 1],
        scale: [0.5, 0.5],

        // projection:  d3.geoOrthographic(),
        // scale: 100,

        prerotate: [[[ ctl.rotation ]]],
        translate: [ [0, 0, 0] ],
        // rotate: [ [[[90 + 0, 90 + 0, 90 + 1 * 360, 90 + 1 * 360]]], 0, 0 ],
        rotate: [ 0, 0, 0 ],
        lens: [0, 1, Infinity],
      }

      // .................. natAni
      let natAni = {

        eohal: eonEohalNatform,

        eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
        eotim,

        eoric: {gid: 'nat', cid: 'nat', fid: 'nat'},

        eomot: {
          proform: proform,
        },

        eocrom: { 'csx': 0, 'cf': [[[111, 111, 111]]], 'co': [[[0.09, 0.09]]], 'cs': [[[888, 888]]], 'cw': [[[1.9, 1.9]]], 'cp': [[[0.7, 0.9]]]},

        eoform: conform,
        eoload: {

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
  exports.eonZ710tFacefn = anitem
}))
