/* ******************************************
   *    @eonZ100bAnima
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ100bAnima = global.eonZ100bAnima || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonEohalNatform,
      eonMuonAnimas,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-eohal-natform'),
      __eo('xs').b('eon-muon-animas'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    // .................. animas
    let z = function () {
    // .................. pics
      let eotim = {td: 16800, t0: 0, t1: 1, t2: 1, t3: 1}

      let eocrom = { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.9, 0.9]]], 'cs': [[[111, 666]]], 'cw': [[[0.3, 0.9]]], 'cp': [[[0.7, 0.9]]]}

      // ............................. natAni
      let natAni = {
        eohal: eonEohalNatform,
        eotim,
        eoric: {gid: 'nat', cid: 'nat', fid: 'nat'},

        eofold: ani => {},

        eocrom: eocrom,
        eoform: Object.assign(
          eonMuonAnimas.animas.drop2,
          {
            'w4': 0, 'ra2': 90,
            'tx': 10, 'ty': [[[50, 150]]],
          }
        ),
        eomot: {
          proform: {

            projection: 'uniwen',
            translate: [0, 0, 0],
            scale: 1,
            rotate: [ 0, 0, 90 ],
            lens: [0, 1, Infinity],

          },
        },
        eoload: {},
      }

      // ............................. animas
      let animas = [
        natAni, // h.natform
      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ100bAnima = anitem
}))
