/* ******************************************
   *    @eonZ000a
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ000a = global.eonZ000a || {})))
}(this, function (exports) {
  'use strict'

  // ... ** **
  // .................. anitem
  async function anitem (__eo) {
    // .................. animas
    let [
      eonCtlWen,
      eonEohalTextform,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-textform'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let z = function () {
      // .................. pics
      let eotim = { 'td': 1000, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1 }

      let textAni = {

        eohal: eonEohalTextform,
        eotim: eotim,
        eoric: { gid: 'text', cid: 'text', fid: 'text' },

        eofold: ani => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0] },
        }),

        eonode: ani => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0] },
        }),

        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [-175, 0],
            rotate: [0, 0, 0],
            prerotate: [[[ctl.rotation]]],
          },
        },

        eoload: {
          eocrom: { 'csx': 0, 'cf': 777, 'cs': 111, 'cw': 0.5, 'co': 0.9, 'cp': 0.5 },
          textform: {
            string: 'eon-z-000a',
            style: {
              rotate: [[[0, -1]]],
              'font-size': [[[60, 60]]],
              'font-family': 'BankFuturistic',
              'text-anchor': 'center',
            },
          },
        },

      }

      // .................. scene
      let animas = [

        textAni, // h.textform

      ]

      return animas
    }

    let enty = () => { }
    enty.z = z
    return enty
  }
  exports.eonZ000a = anitem
}))
