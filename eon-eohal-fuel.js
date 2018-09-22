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
      renderPortview,
      manitem,
      mquad,
      muonGeom,
      muonGeoj,
      eohalNatform,
      d3Polygon,
    ] = await Promise.all([
      __mapper('xs').r('portview'),
      __mapper('xs').m('anitem'),
      __mapper('xs').m('quad'),
      __mapper('xs').m('geom'),
      __mapper('xs').m('geoj'),
      __mapper('xs').e('natform'),
      __mapper('xs').b('d3-polygon'),
    ])

    let state = {}
    state.items = [] // fuel particles

    let width = renderPortview.width(), height = renderPortview.height()

    // ............................. gramm
    let gramm = function (anitem, newAnigrams = []) {
      let muonStore = __mapper('muonStore') // sync

      let eoload = anitem.eoload, // eoload
        eofold = eofold, // eofold
        eoric = eoric, // eoric
        parentuid = parentuid // parentuid

      let fuel = eoload.fuel,
        ra2 = fuel.ra2,
        candidates = fuel.candidates,
        sample = fuel.sample

      let polygon
      let parentAnigram = muonStore.findAnigramFromUid(parentuid)

      if (parentAnigram) {
        let geometry = parentAnigram.eofold.geometry
        if (!muonGeoj.isValid(geometry)) { console.error('h.turnform:gj not valid', geometry) }
        polygon = muonGeoj.getCoords(geometry) // outer ring
      } else {
        polygon = muonGeom.extentPolygon([[0, 0], [width, height]]) // viewport
      }

      let foundcandies = mquad.candysearch(ra2, polygon, candidates, sample) // candies

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
        let idx = i
        let gid = eoric.gid // from ava eoric
        let cid = eoric.cid
        let fid = (eoric.fid === undefined) ? eoric.cid + '_' + idx : eoric.fid
        let _ric = {gid, cid, fid}

        let _proform = { // proform each candy
          'projection': 'uniwen',
          'translate': remainCandies[i], // translate each candy to candy location
        }
        let newAnigram = {} // new anigram per fuel nat
        newAnigram.eohal = 'natform'
        newAnigram.eofold = eofold
        newAnigram.eoload = eoload
        newAnigram.eoric = _ric // identify each fuel nat
        newAnigram.eoload.proform = _proform // proform of each fuel nat

        let avaAnigrams = eohalNatform.gramm(newAnigram) // async
        newAnigrams = [...newAnigrams, ...avaAnigrams]
      }

      return newAnigrams
    }

    // .................... enty
    let eohalFuel = {}
    eohalFuel.ween = anima => [anima] : []
    eohalFuel.gramm = anima => gramm(anima)

    let enty = eohalFuel
    return enty
  }

  exports.eohalFuel = eohalFuel
}))
