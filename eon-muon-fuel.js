/***********
 *    @eonMuonFuel
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonMuonFuel = global.eonMuonFuel || {})))
}(this, function (exports) {
  'use strict'

  async function eonitem (__eo = {}) {
    let [
      d3Polygon,
      eonEohalNatform,
      eonMuonEoric,
      eonMuonGeoj,
      eonMuonGeom,
      eonMuonQuad,
      eonRenderPortview,
    ] = await Promise.all([
      __eo('xs').b('d3-polygon'),
      __eo('xs').b('eon-eohal-natform'),
      __eo('xs').b('eon-muon-eoric'),
      __eo('xs').b('eon-muon-geoj'),
      __eo('xs').b('eon-muon-geom'),
      __eo('xs').b('eon-muon-quad'),
      __eo('xs').b('eon-render-portview'),
    ])

    let eonMuonStore = __eo('eonMuonStore') // sync

    let state = {}
    state.items = [] // fuel particles

    let width = eonRenderPortview.width(), height = eonRenderPortview.height()

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
      let parentAnigram = eonMuonStore.findAnigramFromUid(pid)

      if (parentAnigram) {
        let gj = parentAnigram.eofold
        console.assert(eonMuonGeoj.isValid(gj), `parent eofold is not a valid geojson`)
        polygon = eonMuonGeoj.getPolygon(gj) // outer ring
      } else {
        polygon = eonMuonGeom.extentPolygon([[0, 0], [width, height]]) // viewport
      }

      let foundcandies = eonMuonQuad.geosearch(ra2, polygon, candidates, sample) // candies

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

  exports.eonMuonFuel = eonitem
}))
