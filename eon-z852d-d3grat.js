/* ******************************************
   *    @eonZ852dD3grat
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ852dD3grat = global.eonZ852dD3grat || {})))
}(this, function (exports) {
  'use strict'

  // ... ** **

  // .................. anitem
  async function anitem (__eo) {
    let [
      eonEohalMars,
      eonMuonNatform,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-render-svg'),
    ])

    try { eonRenderSvg.scenecolor('black') } catch (e) {}

    let z = function () {
      // .................. pics
      let eotim = {'td': 10000, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

      // .................. gratiform
      let natform = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: {gid: 'nat', cid: 'nat', fid: 'natform'},

        eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoload.eoform}),

        eonode: {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: {orgen: [0, 0, 0], velin: [0, 0, 0], velang: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
        },

        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [0, 0, 0],
            scale: 1,
            rotate: [0, 0, -90],
            lens: [0, 1, Infinity] },
        },

        eoload: {
          eocrom: { 'csx': 0, 'cf': [[[444, 777]]], 'co': [[[0.9, 0.9]]], 'cs': [[[555, 777]]], 'cw': [[[0.7, 0.7]]], 'cp': [[[0.9, 0.9]]]},

          eoform: {

            'm1': [[[-8, -4, -2, -7.66]]],
            'm2': [[[-3.5, -3.3, -3, -3.73 ]]],
            'n1': [[[16.24, 16.24, 16.24, 16.24]]],
            'n2': [[[6, 6, 6, 5.98]]],
            'n3': [[[13, 15, 17, 17]]],
            'a': [[[9, 9, 9, 8.98]]],
            'b': [[[0.2, 0.2, 0.2, 0.19]]],
            'ra2': 180,
            'v0': 0,
            'v1': 1,
            'seg5': [[[360, 360]]],
            'w4': 0,
            'pa6': 0, 'pb7': 360,

          },

        },

      }

      // .................. scene
      let scene = {

        natform, // h.mars p.natform

      }

      return scene
    }

    let enty = () => {}
    enty.z = z
    return enty
  }

  exports.eonZ852dD3grat = anitem
}))
