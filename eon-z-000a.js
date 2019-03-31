/* ******************************************
   *    @z000a
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.z000a = global.z000a || {})))
}(this, function (exports) {
  'use strict'

  // ... ** **
  // .................. anitem
  async function anitem (__eo) {
    // .................. animas
    let [
      ctlWen,
      eohalTextform,
      renderSvg,
    ] = await Promise.all([
      __eo('xs').c('wen'),
      __eo('xs').e('textform'),
      __eo('xs').r('svg'),
    ])
    try { renderSvg.scenecolor('black') } catch (e) { }
    let ctl
    try {
      ctl = ctlWen().control(renderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let z = function () {
      // .................. pics
      let eotim = { 'td': 1000, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1 }

      let textAni = {

        eohal: eohalTextform,
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
      let scene = {

        textAni, // h.textform

      }

      return scene
    }

    let enty = () => { }
    enty.z = z
    return enty
  }
  exports.z000a = anitem
}))
