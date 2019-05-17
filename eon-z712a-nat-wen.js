/* ******************************************
   *    @eonZ712aNatWen
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ712aNatWen = global.eonZ712aNatWen || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonMuonNatform,
      eonMuonProps,
      eonCtlWen,
      eonEohalMars,
      eonEohalNatform,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-natform'),
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

      let form = {

        'x': {
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'ra2': 100, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,

        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'ra2': 100, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,

        },

      }

      let proform = {

        projection: 'uniwen',
        prerotate: [[[ ctl.rotation ]]],
        scale: 1.2,
        translate: [ [[[0, 0]]], 0 ],
        rotate: [ 0, 0, [[[0, 360]]] ],

      }

      // .................. natAni
      let natAni = {

        eohal: eonEohalMars,

        eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
        eotim: eotim,
        eoric: {'gid': 'geoani', 'cid': 'geoani', 'fid': 'geoani'},
        eocrom: { 'csx': 0, 'cf': [[[666, 666]]], 'cs': 666, 'cw': [[[0.7, 0.7]]], 'co': [[[0.7, 0.7]]], 'cp': [[[0.5, 0.5]]]},
        eomot: {
          proform: proform,
        },
        eoform: form,
        eoload: {
        // aniform: 'anigram',
          aniform: 'anima',
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
  exports.eonZ712aNatWen = anitem
}))
