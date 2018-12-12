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
      muonGeoj,
      muonGeom,
      muonQuad,
      renderPortview,
    ] = await Promise.all([
      __mapper('xs').b('d3-polygon'),
      __mapper('xs').e('natform'),
      __mapper('xs').m('eoric'),
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

      let fuel = eoload.fuel,
        ra2 = fuel.ra2,
        candidates = fuel.candidates,
        sample = fuel.sample

      let polygon
      let parentAnigram = muonStore.findAnigramFromUid(pid)

      if (parentAnigram) {
        let gj = parentAnigram.eofold
        console.assert(muonGeoj.isValid(gj))
        polygon = muonGeoj.getPolygon(gj) // outer ring
      } else {
        polygon = muonGeom.extentPolygon([[0, 0], [width, height]]) // viewport
      }

      let foundcandies = muonQuad.candysearch(ra2, polygon, candidates, sample) // candies
if (1 && 1) console.log('foundcandies', foundcandies.length)

      let remainCandies = []
      if (fuel.f === 3) { // 3 - old and new all time _e_
        remainCandies = state.items
        remainCandies = [...remainCandies, ...foundcandies]
      } else if (fuel.f === 2) { // 2 - just new     _e_
        remainCandies = foundcandies
      } else { //  1 - old and new in polygon
        remainCandies = state.items.filter(c => d3Polygon.polygonContains(polygon, c))
        remainCandies = [...remainCandies, ...foundcandies]
      }


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
