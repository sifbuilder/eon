/* ******************************************
 *    @eonZ000bDebug
 *
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonZ000bDebug = global.eonZ000bDebug || {}))
})(this, function (exports) {
  'use strict'

  // ... ** **
  // .................. anitem
  async function anitem (__eo) {
    let [eonEohalSol, eonRenderSvg] = await Promise.all([
      __eo('xs').b('eon-eohal-sol'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }

    let z = function () {
      let anima = {
        eohal: 'sol',
        eotim: { td: 1000, t0: 0, t1: 1, t2: 1, t3: 1 },
        eoric: { gid: 'g', cid: 'c', fid: 'f' },
        eofold: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [[[[-200, 200]]], [[[-100, 100]]]],
          },
        },
        eoload: {
          eocrom: { csx: 0, cf: 777, cs: 777, cw: 0.99, co: 0.4, cp: 0.99 },
        },
      }
      return Array.of(anima)
    }
    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ000bDebug = anitem
})
