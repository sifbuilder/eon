/***********
 *    @haloFuel
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.haloFuel = global.haloFuel || {})));
}(this, function (exports) { 'use strict';

let haloFuel = function haloFuel(__mapper = {}) {

    let f = __mapper("props")()
    let state = {}
        state.items = []    // fuel particles

    let r = __mapper("xs").r("renderer"),
      width = r.width(),
      height = r.height()

    let mquad = __mapper("xs").m("quad")
		let hnat = __mapper("xs").h("nat")

    let gramn = function (anima, newAnigrams = []) {

      let ani = __mapper("xs").m("anitem")(anima),
        anigram = ani.anigram(),             // anigram
        stace =   ani.stace(),               // stace
        ereform = ani.ereform(),             // ereform
        proform = ani.proform(),             // proform
        conform = ani.conform(),             // conform
        geoform = ani.geoform(),            // geoform
        payload = ani.payload(),
					tim = anigram.tim,                 // tim
					ric = anigram.ric,                 // ric
					uid = anigram.uid,                 // uid
					parentuid = anigram.parentuid,
        fuel = payload.fuel,
					ra2 = fuel.ra2,
					candidates = fuel.candidates,
					sample = fuel.sample
					
      let polygon

      let preAnigram = __mapper("xs").m("store").findAnigramFromUid(uid)  // pre anigram
      let parentAnigram = __mapper("xs").m("store").findAnigramFromUid(parentuid)

      if (parentAnigram) {
          polygon = parentAnigram.feature.geometry.coordinates[0] 					// outer ring
      } else {
          polygon = __mapper("xs").m("geom").extentPolygon([[0,0],[width,height]]) // viewport
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
            _ric.gid = ric.gid + "_fuel"
            _ric.cid = ric.cid + "_fuel"
            _ric.fid = (_ric.fid === undefined) ? _ric.cid + "_" +  i : _ric.fid


          let newAnigram = ani.anigram()									// get a new anigram
          newAnigram.ric = _ric														// identify
          newAnigram.stace = remainCandies[i]							// place: stace is candy situs

          newAnigrams = [...newAnigrams, ...hnat.gramn(newAnigram)]

      }

      return newAnigrams

    }

    /***************************
 *        @enty
 */
    let haloFuel = {}
        haloFuel.ween = anima => (anima.inited !== true) ? (anima.inited = true, [anima]) : []
        haloFuel.gramn = anima => gramn(anima)

    let enty = haloFuel

    return enty

}

exports.haloFuel = haloFuel

}));
