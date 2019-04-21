/* ******************************************
   *    @eonZ710bNat1dax
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ710bNat1dax = global.eonZ710bNat1dax || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonMuonProps,
      eonCtlWen,
      eonEohalNatform,
      eonEohalMars,
      eonRenderSvg,
    ] = await Promise.all([
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

      let form = {'m1': 4, 'm2': 4, 'n1': 4, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1}

      let proform = {
        projection: 'uniwen',
        prerotate: [[[ ctl.rotation ]]],
        translate: [ 0, 0, 0 ],
        scale: 1,
        rotate: [ 0, [[[0, 360]]], 0 ],
        lens: [0, 1, Infinity],
      }

      // .................. natAni
      let natAni = {

        eohal: eonEohalNatform,
        eotim,
        eoric: {gid: 'nat', cid: 'nat', fid: 'circ'},

        eofold: null,
        eomot: {
          proform: proform,
        },
        eocrom: { 'csx': 0, 'cf': [[[444, 888]]], 'co': 1, 'cs': 666, 'cw': 1, 'cp': 1},
        eoform: form,
        eoload: {},
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
  exports.eonZ710bNat1dax = anitem
}))
