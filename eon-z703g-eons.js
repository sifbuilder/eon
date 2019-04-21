/* ******************************************
   *    @eonZ703gEons
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ703gEons = global.eonZ703gEons || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    eonEohalSol,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-eohal-sol'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) { }
  let z = function () {
    // .................. pics
    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // .................. ani
    let ani = {

      eohal: eonEohalSol,
      eotim: {'td': 9800, 't0': 0, 't1': 1, 't2': 1, 't3': 1},
      eoric: {gid: 'ani', cid: 'ani', fid: 'ani'},

      eofold: ani => {
        let t = ani.eoload.t

        let res = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0],
          },
        }

        return res
      },
      eocrom: { 'csx': 0, 'cf': 333, 'cs': 333, 'cw': 0.9, 'co': 0.1, 'cp': 0.9 },
      eoload: {
        t: [
          [ [[[0, 1]]], 2],
        ],
      },
    }

    // .................. scene
    let scene = {
      ani,
    }
    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ703gEons = anitem
}))