/* ******************************************
   *    @eonZ021a
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ021a = global.eonZ021a || {})))
  }(this, function (exports) {
    'use strict'
  
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
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  let ctl
  try {
    ctl = eonCtlWen().control(eonRenderSvg.svg())
  } catch (e) {
    ctl = () => [0, 0, 0]
  }

  let z = function () {
    // .................. pics
    let eotim = {'td': 9800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tp: t => Math.sin((Math.PI / 2) * t)}

    // .................. textAni
    let textAni = {

      eohal: eonEohalTextform,
      eotim: eotim,
      eoric: {'gid': 'text', 'cid': 'text', 'fid': 'text'},

      eofold: ani => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0] },
      }),

      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ -175, 0 ],
          rotate: [ 0, 0, 0 ],
          prerotate: [[[ ctl.rotation ]]],
        },
      },
      eocrom: { 'csx': 0, 'cf': [[[888, 777]]], 'cs': 111, 'cw': [[[0.1, 0.7]]], 'co': [[[0.6, 0.99]]], 'cp': [[[0.5, 0.5]]]},

      eoload: {
        textform: {
          string: 'eon-z-021a',
          style: {
            rotate: [[[ 0, -1 ]]],
            'font-size': [[[60, 60]]],
            'font-family': 'BankFuturistic',
            'text-anchor': 'center',

          },
        },

      },
    }

    // .................. animas
    let scene = {

      textAni, // h.textform

    }

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ021a = anitem
}))
