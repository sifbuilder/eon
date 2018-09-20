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

  // # eon-ani-852d-3dgrat
  // ** **
  // # license
  // MIT

  // .................. anitem
  async function anitem (__mapper) {
    let [
      eohalTurnform,
      eohalScene,
      muonNatform,
    ] = await Promise.all([
      __mapper('xs').e('turnform'),
      __mapper('xs').e('scene'),
      __mapper('xs').m('natform'),
    ])

    let ani = function () {
      // .................. pics
      let eotim = {'td': 12800, 't0': 0, 't1': 1000, 't2': 1, 't3': 1, nostop: 1, tp: t => Math.sin((Math.PI / 2) * t)}

      // .................. gratiform
      let natform = {

        eohal: 'turnform',
        eofold: p => muonNatform.natFeature(p.eoform),

        eotim: eotim,
        eoric: {gid: 'nat', cid: 'nat', fid: 'natform'},
        eochrom: { 'csx': 0, 'cf': [[[444, 777]]], 'co': [[[0.09, 0.09]]], 'cs': [[[555, 777]]], 'cw': [[[0.7, 0.7]]], 'cp': [[[0.9, 0.9]]]},

        eodrift: {
          proform: { projection: 'uniwen', translate: [0, 0, 0], scale: 1, rotate: [0, 0, 0], lens: [0, 1, Infinity] },
        },
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

      // .................. sceneAni
      let sceneAni = {

        eohal: 'scene',
        eofold: null,
        eotim: eotim,
        eoric: {gid: 'scene', cid: 'scene', fid: 'scene'},
        eoload: {
          context: {svg: 1, versor: 0, wen: 1, webgl: 0, bck: 1},
        },

      }

      // .................. animaset
      let animas = [

        natform, // h.turnform p.natform
        sceneAni, // h.scene

      ]

      return animas
    }

    let enty = function () {}
    enty = ani()
    return enty
  }

  exports.ani852d3dgrat = anitem
}))
