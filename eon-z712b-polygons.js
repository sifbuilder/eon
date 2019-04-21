/* ******************************************
   *    @eonZ712bPolygons
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ712bPolygons = global.eonZ712bPolygons || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonMuonNatform,
    eonMuonProps,
    eonCtlWen,
    eonEohalMars,
    eonEohalNatform,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-natform'),
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

    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // .................. natAni
    let natAni = {

      eohal: eonEohalMars,

      eofold: p => ({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [60 + 0, 60 + 0], // 60,60
              [60 - 120, 60 + 0], // -60,60
              [60 - 120, 60 - 120], // -60,-60
              [60 + 0, 60 - 120], // 60,-60
              [60 + 0, 60 + 0 ], // 60, 60
            ],
            [
              [60 - 80, 60 + 30], //  90, 90
              [60 - 180, 60 + 30], // -30, 90
              [60 - 180, 60 - 90], // -30,-30
              [60 - 80, 60 - 90], //  90,-30
              [60 - 80, 60 + 30], //  90, 90
            ],
            [
              [60 + 30, 60 + 30], //  90, 90
              [60 + 30, 60 - 90], //  90,-30
              [60 - 90, 60 - 90], // -30,-30
              [60 - 90, 60 + 30], // -30, 90
              [60 + 30, 60 + 30], //  90, 90

            ],

          ],
        },
        id: 0,
        properties: {},
      }),

      eotim: eotim,
      eoric: {'gid': 'geoani', 'cid': 'geoani', 'fid': 'geoani'},
      eocrom: { 'csx': 0, 'cf': [[[666, 666]]], 'cs': 666, 'cw': [[[0.7, 0.7]]], 'co': [[[0.77, 0.77]]], 'cp': [[[0.5, 0.5]]]},
      eomot: {
        proform: {
          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          scale: 1.2,
          translate: [ [[[0, 0]]], 0 ],
          rotate: [ 0, 0, [[[0, 360]]] ],
        },
      },
      eoload: {
      },
    }

    // .................. animas
    let animas = [

      natAni, // h.mars g.uniwen

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ712bPolygons = anitem
}))
