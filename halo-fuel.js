/***********
 *    @haloFuel
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloFuel = global.haloFuel || {})))
}(this, function (exports) { "use strict"

  let haloFuel = function haloFuel(__mapper = {}) {

    let f = __mapper("props")(),
      manitem = __mapper("xs").m("anitem"),
      mstore = __mapper("xs").m("store"),
      mquad = __mapper("xs").m("quad"),
      hnat = __mapper("xs").h("nat"),
      mgeom = __mapper("xs").m("geom")

    let r = __mapper("xs").r("renderer"),
      width = r.width(),
      height = r.height()

    let state = {}
    state.items = []    // fuel particles

    let gramm = function (anima, newAnigrams = []) {

      let anigram = manitem(anima).anigram(),													// anigram
        payload = 		anigram.payload,            										// payload
        boform = 			payload.boform,             									// boform
        ric =   			payload.ric,               										// ric
        tim =   			payload.tim,               										// tim
        proform =			payload.proform,            									// proform
        conform = 		payload.conform,            									// conform
        uid = 				payload.uid,          												// uid
        parentuid = 	payload.parentuid,          									// parentuid
        geonode = 		payload.geonode ||  manitem.coreGeonode(),		// geonode
        json

      let fuel = payload.fuel,
        ra2 = fuel.ra2,
        candidates = fuel.candidates,
        sample = fuel.sample

      let polygon
      let parentAnigram = mstore.findAnigramFromUid(parentuid)

      if (parentAnigram) {
        polygon = parentAnigram.payload.geofold.geometry.coordinates[0] 					// outer ring
      } else {
        polygon = mgeom.extentPolygon([[0,0],[width,height]]) // viewport
      }

      let foundcandies =  mquad.candysearch(ra2, polygon, candidates, sample) // candies

      let remainCandies = []
      if (fuel.f === 3) {           		// 3 - old and new all time _e_
        remainCandies = state.items
        remainCandies =  [...remaincandies, ...foundcandies]
      } else if (fuel.f === 2)  { 			// 2 - just new			_e_
        remainCandies =  foundcandies
      } else  {                         //  1 - old and new in polygon
        remainCandies = state.items.filter(c => d3.polygonContains(polygon, c))
        remainCandies =  [...remainCandies, ...foundcandies]
      }

      for (let i=0; i<remainCandies.length; i++) {				// for each candy ...
        let _ric = {}
        _ric.gid = ric.gid
        _ric.cid = ric.cid
        _ric.fid = (_ric.fid === undefined) ? _ric.cid + "_" +  i : _ric.fid

        let proform = {
          "projection": "uniwen",
          "translate": remainCandies[i],
        }

        let newAnigram = anigram									// get a new anigram
        let payload = newAnigram.payload
        payload.ric = _ric														// identify
        payload.proform = proform

        let avaAnigrams = hnat.gramm(newAnigram)
        newAnigrams = [...newAnigrams, ...avaAnigrams]

      }

      return newAnigrams

    }

    /***************************
 *        @enty
 */
    let haloFuel = {}
    haloFuel.ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = 1, [anima]) : []
    haloFuel.gramm = anima => gramm(anima)

    let enty = haloFuel

    return enty

  }

  exports.haloFuel = haloFuel

}))
