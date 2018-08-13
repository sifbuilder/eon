/* ******************************************
   *    @z852d3dgratSvgScene
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.z852d3dgratSvgScene = global.z852d3dgratSvgScene || {})))
}(this, function (exports) {
  'use strict'

  // .................. z852d3dgratSvgScene
  async function z852d3dgratSvgScene (__mapper) {
    let [
      cwen,
      mgraticule,
    ] = await Promise.all([
      __mapper('xs').c('wen'),
      __mapper('xs').m('graticule'),
    ])

    let animas = function () {
      // .................. pics
      let tim = {'td': 12800, 't0': 0, 't1': 1000, 't2': 1, 't3': 1, nostop: 1, tp: t => Math.sin((Math.PI / 2) * t)}

      let form2d = {

        'x': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 8, 'pa6': 0, 'pb7': -1,
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 8, 'pa6': 0, 'pb7': -1,
        },
      }

      let conform2d = { projection: 'natform', form: form2d }

      let form3d = {

        'x': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 8, 'pa6': 0, 'pb7': -1,
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 8, 'pa6': 0, 'pb7': -1,
        },
        'z': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4, 'pa6': 0, 'pb7': -1,
        },
      }

      // .................. gratiform
      let g1 = {

        halo: 'ent',

        geofold: p => mgraticule.vhMultiLine(p.payload.graticule),

        payload: {
          tim: tim,
          ric: {gid: 'gratiform', cid: 'gratiform', fid: 'g1'},

          boform: { 'csx': 0, 'cf': [[[666, 555, 666]]], 'cs': [[[333, 666, 333]]], 'cw': 0.9, 'co': [[[0.09, 0.03, 0.09]]], 'cp': [[[0.9, 1.9, 0.9]]]},

          conform: conform2d,
          proform: {

            prerotate: [[[ cwen.rotation ]]],
            projection: 'uniwen',
            translate: [ -150, 0],
            rotate: [ [[[0, 360]]], [[[0, 360]]] ],
            scale: 1,

          },
          graticule: {
            frame: [ [ [-180, 180, 90, 90], [-90, 90, 15, 15] ] ], // X,Y
          },
        },
      }

      // .................. gratiform
      let g2 = {

        halo: 'ent',
        geofold: p => mgraticule.vhMultiLine(p.payload.graticule),

        payload: {
          tim: tim,
          ric: {gid: 'gratiform', cid: 'gratiform', fid: 'g2'},

          boform: { 'csx': 0, 'cf': [[[666, 555, 666]]], 'cs': [[[333, 666, 333]]], 'cw': 0.9, 'co': [[[0.09, 0.03, 0.09]]], 'cp': [[[0.9, 1.9, 0.9]]]},

          conform: { projection: 'natform', form: form3d },
          proform: {

            prerotate: [[[ cwen.rotation ]]],
            projection: 'uniwen',
            translate: [ 0, 0, 0],
            rotate: [ 0, [[[0, 360]]], 0 ],
            scale: 1,

          },
          graticule: {
            frame: [ [ [-180, 180, 90, 90], [-90, 90, 45, 45] ] ], // X,Y
          },
        },
      }

      // .................. gratiform
      let g3 = {

        halo: 'ent',

        geofold: p => mgraticule.vhMultiLine(p.payload.graticule),

        payload: {
          tim: tim,
          ric: {gid: 'gratiform', cid: 'gratiform', fid: 'g3'},

          boform: { 'csx': 0, 'cf': [[[666, 555, 666]]], 'cs': [[[333, 666, 333]]], 'cw': 0.9, 'co': [[[0.09, 0.03, 0.09]]], 'cp': [[[0.9, 1.9, 0.9]]]},

          conform: conform2d,
          proform: {

            prerotate: [[[ cwen.rotation ]]],
            projection: 'uniwen',
            translate: [ 150, 0],
            rotate: [ 0, [[[0, 360]]], 0 ],
            scale: 1,

          },
          graticule: {
            frame: [ [ [-180, 180, 30, 30], [-90, 90, 45, 45] ] ], // X,Y
          },
        },
      }
      // .................. sceneAni
      let sceneAni = {

        halo: 'scene',
        geofold: null,
        payload: {
          tim: tim,
          ric: {gid: 'scene', cid: 'scene', fid: 'scene'},
          context: {svg: 1, versor: 0, wen: 1, webgl: 0, bck: 1},
        },

      }

      // .................. animaset
      animas = [
        g1, // h.ent p.natform
        g2, // h.ent p.natform
        g3, // h.ent p.natform
        sceneAni, // h.scene

      ]

      return animas
    }

    let enty = () => {}
    enty.animas = animas
    return enty
  }

  exports.z852d3dgratSvgScene = z852d3dgratSvgScene
}))

// # eon-z-852d-3dgratSvgScene
// ** **

// # license
// MIT
