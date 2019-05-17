/* ******************************************
   *    @eonZ856aMinkowski
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ856aMinkowski = global.eonZ856aMinkowski || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      d3Polygon,
      eonCtlWen,
      eonEohalMars,
      eonEohalNatform,
      eonMuonMinkowski,
      eonMuonNatform,
      eonMuonProps,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('d3-polygon'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-natform'),
      __eo('xs').b('eon-muon-minkowski'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-render-svg'),
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

      let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      // .................. natAni
      let natAni = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: {'gid': 'geoani', 'cid': 'geoani', 'fid': 'geoani'},

        eofold: ani => {
          let A = ani.eoload.A
          let B = ani.eoload.B
          let sum = eonMuonMinkowski(A, B)
          let sumring = [...sum, sum[0]]

          let res = {
            type: 'Feature',
            geometry: {
              type: 'MultiLineString',
              coordinates: [A, B, sumring],
            },
            properties: {},
          }

          return res
        },

        eocrom: { 'csx': 0, 'cf': [[[666, 666]]], 'cs': 666, 'cw': [[[0.99, 0.99]]], 'co': [[[0.27, 0.27]]], 'cp': [[[0.99, 0.99]]]},

        eomot: {
          proform: {
            projection: 'uniwen',
            prerotate: [[[ ctl.rotation ]]],
            scale: 50,
            translate: [ 0, 0 ],
            rotate: [ 0, 0, 0 ],
          },
        },
        eoload: {

          A: [ [0, 0], [1, 0], [1, 1], [0, 1], [0, 0]],

          B: [ [0, 0], [-1, 1], [1.5, 0], [0, 0]],

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
  exports.eonZ856aMinkowski = anitem
}))
