/* ******************************************
   *    @eonZ601aRocketforms
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ601aRocketforms = global.eonZ601aRocketforms || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonMuonNatform,
      eonEohalMars,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    // .................. animas
    let z = function () {
    // .................. pics
      let eotim = {'td': 9800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      // .................. natform
      let natform = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: {gid: 'nat', cid: 'nat', fid: 'natform'},

        eofold: p => {
          let r = eonMuonNatform.natMultiLineString({eoform: p.eoload.eoform})
          return r
        },

        eomot: {
          proform: { projection: 'uniwen', translate: [0, 0, 0], scale: 1, rotate: [0, 0, 0], lens: [0, 1, Infinity] },
        },

        eocrom: { 'csx': 0, 'cf': [[[444, 777]]], 'co': [[[0.09, 0.09]]], 'cs': [[[555, 777]]], 'cw': [[[0.7, 0.7]]], 'cp': [[[0.9, 0.9]]]},

        eoload: {
          eoform: {

            'm1': [[[-8, -4, -2, -7.66]]],
            'm2': [[[-3.5, -3.3, -3, -3.73 ]]],
            'n1': [[[16.24, 16.24, 16.24, 16.24]]],
            'n2': [[[6, 6, 6, 5.98]]],
            'n3': [[[13, 15, 17, 17]]],
            'a': [[[9, 9, 9, 8.98]]],
            'b': [[[0.2, 0.2, 0.2, 0.19]]],
            'ra2': 240,
            'v0': 0,
            'v1': 1,
            'seg5': [[[360, 360]]],
            'w4': 0,
            'pa6': 0,
            'pb7': 360,

          },

        },

      }

      // .................. scene
      let scene = {

        natform, // h.mars g.uniwen

      }

      return scene
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ601aRocketforms = anitem
}))
