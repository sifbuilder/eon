/***********
 *    @eohalFuel
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalFuel = global.eohalFuel || {})))
}(this, function (exports) {
  'use strict'

  async function eohalFuel (__eo = {}) {
    let [
      d3Polygon,
      eohalNatform,
      muonEoric,
      muonFuel,
      muonGeoj,
      muonGeom,
      muonQuad,
      renderPortview,
    ] = await Promise.all([
      __eo('xs').b('d3-polygon'),
      __eo('xs').e('natform'),
      __eo('xs').m('eoric'),
      __eo('xs').m('fuel'),
      __eo('xs').m('geoj'),
      __eo('xs').m('geom'),
      __eo('xs').m('quad'),
      __eo('xs').r('portview'),
    ])

    let state = {}
    state.items = [] // fuel particles

    // ............................. gramm
    let gramm = function (anitem, newAnigrams = []) {
      let eoric = anitem.eoric // eoric

      let remainCandies = muonFuel.getCandyCooords(anitem)

      for (let i = 0; i < remainCandies.length; i++) { // for each candy ...
        let gid = eoric.gid, // from ava eoric
          cid = eoric.cid,
          fid = muonEoric.idify(eoric.fid, i),
          uid = muonEoric.idify(gid, cid, fid),
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

        let avaAnigrams = eohalNatform.gramm(newAnigram) // async
        newAnigrams = [...newAnigrams, ...avaAnigrams]
      }

      return newAnigrams
    }

    // .................... enty
    let eohalFuel = {}
    eohalFuel.ween = anima => [anima]
    eohalFuel.gramm = anima => gramm(anima)

    let enty = eohalFuel
    return enty
  }

  exports.eohalFuel = eohalFuel
}))
