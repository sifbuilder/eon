/* ******************************************
   *    @eonZ706aFibonat
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ706aFibonat = global.eonZ706aFibonat || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3,
    eonCtlWen,
    eonEohalMars,
    eonMuonFibonat,
    eonMuonGraticule,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-fibonat'),
    __eo('xs').b('eon-muon-graticule'),
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

    let radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos,
      sqrt2 = Math.sqrt(2)

    let fiboForm = {

      eohal: eonEohalMars,

      eofold: p => eonMuonFibonat.catesians(p.eoload),

      eotim: {'td': 23800, 't0': 0, 't1': 1, 't2': 1, 't3': 1},

      eoric: {gid: 'grat', cid: 'grat', fid: 'fiboForm'},
      eocrom: { 'csx': 0, 'cf': 666, 'cs': 666, 'cw': 0.9, 'co': 0.03, 'cp': 0.9 },

      eomot: {
        proform: {
          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          translate: [0, 0, 0],
          scale: 100,
          rotate: [ 0, 0, 0],
          lens: [ 0, 1, Infinity ],
        },
      },
      eoframe: [ [ [ -180, 180, 90, 5], [ -180, 180, 30, 5] ] ],

      eoload: {

        fibonat: {
          samples: [[[50, 50]]],
          offsetstep: [[[0, 20]]],
          dotsInSegment: 1,
          goldenangle: Math.PI * (3.0 - Math.sqrt(5.0)),
        },

      },

    }

    let animas = [

      fiboForm, // h.mars

    ]
    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ706aFibonat = anitem
}))