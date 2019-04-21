/* ******************************************
   *    @eonZ771aD3nat
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ771aD3nat = global.eonZ771aD3nat || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonMuonNatform,
    eonCtlWen,
    eonEohalMars,
    eonEohalNatform,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    // .................. pics
    let eotim = {'td': 3800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}
    let eocrom = { csx: 0, cf: 777, cs: 222, cw: 1.7, co: 0.7, cp: 0.5}
    let eofold = {type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0]}, properties: {pointRadius: 6}}

    let translate = {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 60, 'v0': 0, 'v1': 1, 'w4': 90, 'seg5': 360 / 10, 'pa6': 0, 'pb7': -1 }

    let f3 = {
      'm1': 6, 'm2': 6, 'n1': 2, 'n2': 7, 'n3': 7, 'a': 1, 'b': 1, // star
      'ra2': 60, 'v0': 0, 'v1': 1, 'seg5': 360 / 10, 'w4': 0, 'pa6': 0, 'pb7': 360,
    }

    // ............................. p3 anima
    let p3 = {
      eohal: eonEohalMars,
      eotim,
      eocrom,
      eofold: p => eonMuonNatform.natMultiLineString({eoform: f3}),
      eoric: {gid: 'p', cid: 'p', fid: 'p3'},

      eomot: {
        proform: {
          projection: 'uniwen',
          prerotate: eonCtlWen.rotation(),
          scale: 1,
          rotate: [ 0, 0, 0 ],
          translate: [0, 0, 0],
        },
      },

      eoload: {
      },
    }

    // ............................. animas
    let animas = [

      p3, // h.mars g.uniwen

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ771aD3nat = anitem
}))