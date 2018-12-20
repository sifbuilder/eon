/***********
 *    @eohalFuel
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalFuel = global.eohalFuel || {})))
}(this, function (exports) {
  'use strict'

  async function eohalFuel (__mapper = {}) {
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
      __mapper('xs').b('d3-polygon'),
      __mapper('xs').e('natform'),
      __mapper('xs').m('eoric'),
      __mapper('xs').m('fuel'),
      __mapper('xs').m('geoj'),
      __mapper('xs').m('geom'),
      __mapper('xs').m('quad'),
      __mapper('xs').r('portview'),
    ])

    let muonStore = __mapper('muonStore') // sync

    let state = {}
    state.items = [] // fuel particles

    let width = renderPortview.width(), height = renderPortview.height()


    // ............................. gramm
    let gramm = function (anitem, newAnigrams = []) {

      let eoload = anitem.eoload, // eoload
        eofold = anitem.eofold, // eofold
        eoric = anitem.eoric, // eoric
        pid = eoric.pid // pid

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
