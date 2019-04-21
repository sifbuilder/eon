/***********
 *    @eonEohalFuel
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonEohalFuel = global.eonEohalFuel || {})))
}(this, function (exports) {
  'use strict'

  async function eonitem (__eo = {}) {
    let [
      d3Polygon,
      eonEohalNatform,
      eonMuonEoric,
      eonMuonFuel,
      eonMuonGeoj,
      eonMuonGeom,
      eonMuonQuad,
      eonRenderPortview,
    ] = await Promise.all([
      __eo('xs').b('d3-polygon'),
      __eo('xs').b('eon-eohal-natform'),
      __eo('xs').b('eon-muon-eoric'),
      __eo('xs').b('eon-muon-fuel'),
      __eo('xs').b('eon-muon-geoj'),
      __eo('xs').b('eon-muon-geom'),
      __eo('xs').b('eon-muon-quad'),
      __eo('xs').b('eon-render-portview'),
    ])

    let state = {}
    state.items = [] // fuel particles

    // ............................. gramify
    let gramify = function (anitem, newAnigrams = []) {
      let eoric = anitem.eoric // eoric

      let remainCandies = eonMuonFuel.getCandyCooords(anitem)

      for (let i = 0; i < remainCandies.length; i++) { // for each candy ...
        let gid = eoric.gid, // from ava eoric
          cid = eoric.cid,
          fid = eonMuonEoric.idify(eoric.fid, i),
          uid = eonMuonEoric.idify(gid, cid, fid),
          pid = eoric.uid
        let _ric = {gid, cid, fid, uid, pid} // is DELLED ?

        let eomot = {
          proform: {
            projection: 'uniwen',
            translate: remainCandies[i], //
            scale: [1, 1, 1],
            rotate: [ 0, 0, 0 ],
            lens: [0, 1, Infinity],
          },
        }

        let newAnigram = {} // new anigram per fuel nat
        newAnigram.eohal = 'natform'
        newAnigram.eofold = anitem.eofold
        newAnigram.eonode = anitem.eonode
        newAnigram.eoform = anitem.eoform
        newAnigram.eocrom = anitem.eocrom
        newAnigram.eoload = anitem.eoload
        newAnigram.eoric = _ric // identify each fuel nat

        newAnigram.eomot = eomot // proform of each fuel nat

        let avaAnigrams = eonEohalNatform.gramify(newAnigram) // async
        newAnigrams = [...newAnigrams, ...avaAnigrams]
      }

      return newAnigrams
    }

    // .................... enty
    let eonEohalFuel = {}
    eonEohalFuel.anify = anima => [anima]
    eonEohalFuel.gramify = anima => gramify(anima)

    let enty = eonEohalFuel
    return enty
  }

  exports.eonEohalFuel = eonitem
}))
