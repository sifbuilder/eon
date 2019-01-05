/***********
 *    @muonFuel
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonFuel = global.muonFuel || {})))
}(this, function (exports) {
  'use strict'

  async function muonFuel (__eo = {}) {
    let [
      d3Polygon,
      eohalNatform,
      muonEoric,
      muonGeoj,
      muonGeom,
      muonQuad,
      renderPortview,
    ] = await Promise.all([
      __eo('xs').b('d3-polygon'),
      __eo('xs').e('natform'),
      __eo('xs').m('eoric'),
      __eo('xs').m('geoj'),
      __eo('xs').m('geom'),
      __eo('xs').m('quad'),
      __eo('xs').r('portview'),
    ])

    let muonStore = __eo('muonStore') // sync

    let state = {}
    state.items = [] // fuel particles

    let width = renderPortview.width(), height = renderPortview.height()

    // ............................. getCandyCooords
    let getCandyCooords = function (anitem, fuelprops = {}) {
      let eoload = anitem.eoload, // eoload
        eofold = anitem.eofold, // eofold
        eoric = anitem.eoric, // eoric
        pid = eoric.pid // pid

      console.assert(pid !== undefined, `pid in ${anitem.eoric} is undefined`)

      let fuel = eoload.fuel || fuelprops, // or pass fuel props as arg
        ra2 = fuel.ra2,
        candidates = fuel.candidates,
        sample = fuel.sample,
        fueltype = fuel.f

      let polygon
      let parentAnigram = muonStore.findAnigramFromUid(pid)

      if (parentAnigram) {
        let gj = parentAnigram.eofold
        console.assert(muonGeoj.isValid(gj), `parent eofold is not a valid geojson`)
        polygon = muonGeoj.getPolygon(gj) // outer ring
      } else {
        polygon = muonGeom.extentPolygon([[0, 0], [width, height]]) // viewport
      }

      let foundcandies = muonQuad.geosearch(ra2, polygon, candidates, sample) // candies

      let remainCandies = []
      if (fueltype === 3) { // 3 - old and new all time _e_
        remainCandies = state.items
        remainCandies = [...remainCandies, ...foundcandies]
      } else if (fueltype === 2) { // 2 - just new     _e_
        remainCandies = foundcandies
      } else { //  1 - old and new in polygon
        remainCandies = state.items.filter(c => d3Polygon.polygonContains(polygon, c))
        remainCandies = [...remainCandies, ...foundcandies]
      }
      return remainCandies
    }

    let enty = {}
    enty.getCandyCooords = getCandyCooords
    return enty
  }

  exports.muonFuel = muonFuel
}))
