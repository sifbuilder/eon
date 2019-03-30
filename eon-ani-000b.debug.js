/* ******************************************
   *    @ani000b-debug
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.ani000bDebug = global.ani000bDebug || {})))
}(this, function (exports) {
  'use strict'

  // ... ** **
  // .................. anitem
  async function anitem (__eo) {
    let ani = function () {
      let anima = {
        eohal: 'sol',
        eotim: {'td': 1000, 't0': 0, 't1': 1, 't2': 1, 't3': 1},
        eoric: {gid: 'g', cid: 'c', fid: 'f'},
        eofold: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, [[[ 0, 110 ]]] ],
          },
        },
        eoload: {
          eocrom: {'csx': 0, 'cf': 777, 'cs': 777, 'cw': 0.99, 'co': 0.4, 'cp': 0.99},
        },
      }
      return Array.of(anima)
    }
    let enty = () => {}
    enty.ani = ani
    return enty
  }
  exports.ani000bDebug = anitem
}))

