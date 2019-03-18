/* ******************************************
   *    @ani852d3dgrat
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.ani852d3dgrat = global.ani852d3dgrat || {})))
}(this, function (exports) {
  'use strict'

  // ... ** **

  // .................. anitem
  async function anitem (__eo) {
    let [
      eohalMars,
      muonNatform,
      renderSvg,
    ] = await Promise.all([
      __eo('xs').e('mars'),
      __eo('xs').m('natform'),
      __eo('xs').r('svg'),
    ])

    try { renderSvg.scenecolor('black') } catch (e) {}

    let ani = function () {
      // .................. pics
      let eotim = {'td': 12800, 't0': 0, 't1': 1000, 't2': 1, 't3': 1, nostop: 1, tp: t => Math.sin((Math.PI / 2) * t)}

      // .................. gratiform
      let natform = {

        eohal: eohalMars,
        eotim: eotim,
        eoric: {gid: 'nat', cid: 'nat', fid: 'natform'},

        eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),

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

        eocrom: { 'csx': 0, 'cf': [[[444, 777]]], 'co': [[[0.9, 0.9]]], 'cs': [[[555, 777]]], 'cw': [[[0.7, 0.7]]], 'cp': [[[0.9, 0.9]]]},

        eoload: {},

      }

      // .................. scene
      let scene = {

        natform, // h.mars p.natform

      }

      return scene
    }

    let enty = () => {}
    enty.ani = ani
    return enty
  }

  exports.ani852d3dgrat = anitem
}))
