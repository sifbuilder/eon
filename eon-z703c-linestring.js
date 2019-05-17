/* ******************************************
   *    @eonZ703cLinestring
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ703cLinestring = global.eonZ703cLinestring || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonCtlWen,
      eonEohalMars,
      eonProtonUniwen,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-proton-uniwen'),
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

      let aniForm = {

        eohal: eonEohalMars,
        eotim: { td: 12800, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 },
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani' },

        eofold: ani => ({
          'type': 'Feature',
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              [60 + 0, 60 + 0],
              [60 - 120, 60 + 0],
              [60 - 120, 60 - 120],
              [60 + 0, 60 - 120],
              [60 + 0, 60 + 0 ],
            ],
          },
          'properties': {},
        }),

        eocrom: { 'csx': 0, 'cf': [[[444, 666]]], 'cs': 666, 'cw': [[[0.9, 0.9]]], 'co': [[[0.1, 0.2]]], 'cp': [[[0.9, 0.9]]]},
        eomot: {
          proform: {

            projection: 'uniwen',
            scale: 1.0,
            translate: {'x': 0, 'y': 0 },
            prerotate: [[[ ctl.rotation ]]],
            rotate: [ 0, 0, 0 ],

          },
        },
        eoload: {
        },
      }

      // .................. animas
      let animas = [
        aniForm, // h.mars

      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ703cLinestring = anitem
}))
