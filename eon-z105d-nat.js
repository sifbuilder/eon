/* ******************************************
   *    @eonZ105dNat
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ105dNat = global.eonZ105dNat || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlWen,
    eonEohalNatform,
    eonEohalMars,
    eonMuonNatform,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let eotim = {td: 16800, t0: 0, t1: 1, t2: 1, t3: 1}
    let eocrom = { 'csx': 0, 'cf': 888, 'co': 0.19, 'cs': 777, 'cw': 0.99, 'cp': 0.99 }

    // ............................. natAni
    let natAni1 = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat1'},

      eofold: ani => {
        let natipros = {
          eoform: ani.eoform,
          ghv: 1, // horizontal geodesics
          gsa: 0, // symetric distribution of geodesics around the origin
          gco: 0, // closed line
        }
        let nat = eonMuonNatform.natMultiLineString(natipros)
        return nat
      },
      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {
          orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
        },
      },
      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ 0, 0, 0], // mot
          scale: 1,
          rotate: [ 0, 0, -90 ], // rot -90 anticlock-wise
          prerotate: [[[ ctl.rotation ]]],
          lens: [0, 1, Infinity],
          addNodeToTranslate: 1, // eonode
        },
      },
      eoform: {
        x: {
          'm1': 3, 'm2': 3, 'n1': 100, 'n2': 200, 'n3': 200, 'a': 1, 'b': 1, // triangle
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': 100,
          'dom3': [ -180, 180 ],
        },
        y: {
          'm1': 3, 'm2': 3, 'n1': 100, 'n2': 200, 'n3': 200, 'a': 1, 'b': 1, // triangle
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': 100,
          'dom3': [ -180, 180 ],
        },

      },

      eocrom: eocrom,
      eoload: {},
    }

    // ............................. scene
    let scene = {

      natAni1, // h.mars

    }

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ105dNat = anitem
}))