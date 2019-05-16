/* ******************************************
   *    @eonZ220bPerfectforms
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ220bPerfectforms = global.eonZ220bPerfectforms || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonEohalNatform,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-eohal-natform'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    // .................. animas
    let z = function () {
    // .................. pics
      let eotim = {td: 16800, t0: 0, t1: 1, t2: 1, t3: 1}

      // ............................. natAni

      let natAni2 = {
        eohal: eonEohalNatform,
        eotim: eotim,
        eoric: {gid: 'g', cid: 'c', fid: 'f2'},
        eoform: {
          'm1': [[[-900, -939]]], 'm2': [[[-900, -939]]], 'n1': 2, 'n2': 2, 'n3': 1, 'a': [[[1.1, 0.9, 1.1]]], 'b': [[[0.9, 1.1, 0.9]]],
          'v0': 0, 'v1': 1,
          'ra2': 120,
          'w4': 0,
          'seg5': [[[360, 3600]]],
          'pa6': 0, 'pb7': -1,
          'tx': 0, 'ty': 0,
          'csx': 0, 'cf': [[[333, 888, 333]]], 'co': [[[0.9, 0.9]]], 'cs': [[[111, 666]]], 'cw': [[[0.3, 0.9]]], 'cp': [[[0.7, 0.9]]],
        },
        eoload: {},
      }

      // ............................. animas
      let animas = [
        natAni2, // h.natform
      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ220bPerfectforms = anitem
}))
