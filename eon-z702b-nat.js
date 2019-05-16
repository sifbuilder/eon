/* ******************************************
   *    @eonZ702bNat
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ702bNat = global.eonZ702bNat || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [

      eonCtlWen,
      eonEohalMars,

      eonMuonNatform,
      eonRenderSvg,
    ] = await Promise.all([

      __eo('xs').b('eon-ctl-wen'),
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

      let eotim = {'td': 9800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      let conform = {
        'x': {

          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          // 'm1': -8,'m2': -3.5,'n1': 16.24,'n2': 6,'n3': 13,'a': 9,'b': 0.2, // booster
          'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
        },
        'y': {

          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          // 'm1': -8,'m2': -3.5,'n1': 16.24,'n2': 6,'n3': 13,'a': 9,'b': 0.2, // booster
          'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
        },
        'z': {
          // 'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,  // circle
          // 'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,  // square
          'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster

          'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
          // 'dom3': [-180, 180 ],'fn0': [ 0, 1, 2, 1 ],'pr8': d => Math.cos(d)
          // 'dom3': [-180, 180 ],'fn0': [ 10, 0, 10, 10 ],'pr8': d => Math.cos(d)
          // 'dom3': [-180, 180 ],'fn0': [ 0, 0, 0, 10 ],'pr8': d => Math.cos(d)
          // 'dom3': [-90, 90],'fn0': [ 1, 1, 0, 1 ],'pr8': [cos,cos,cos,cos]
          'dom3': [ -90, 90 ],
        },
      }

      // .................. natform
      let natform = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: {'gid': 'nat', 'cid': 'nat', 'fid': 'natform'},

        eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),

        eomot: {
          proform: {
            projection: 'uniwen',
            prerotate: [[[ ctl.rotation ]]],
            translate: [-20, 20],
            scale: 1,
            rotate: [0, 0, 0],
            lens: [ 0, 1, Infinity ],
          },
        },

        eocrom: { 'csx': 0, 'cf': [[[444, 777]]], 'co': [[[0.09, 0.09]]], 'cs': [[[555, 777]]], 'cw': [[[0.7, 0.7]]], 'cp': [[[0.9, 0.9]]]},
        eoform: conform,
        eoload: {},

      }

      // .................. animas
      let animas = [

        natform, // h.mars

      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ702bNat = anitem
}))
