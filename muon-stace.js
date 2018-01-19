/***********
 *    @muonStace
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonStace = global.muonStace || {})))
}(this, function (exports) {
  'use strict'

  let muonStace = function (__mapper = {}) {
    let f = __mapper('props')(),
      mstore = __mapper('xs').m('store'),
      mlacer = __mapper('xs').m('lacer'),
      manitem = __mapper('xs').m('anitem')

    /* ******************************************
    getLocifier (anigram)
    getLocifion (anigram)                     -- translate projection
      getLocus (anigram)                      -- locus or first location
        getSiti (anigram)                     -- root x,y,z
        getLocations (anigram)                -- stace root, pos ref
          getLocsInDim (dimStace, dimStream)  -- location of dimStream by dimStace
          getLocsFromParent (anigram)
  */
    // ........................ getSiti         situs: Arary.of(ani.x, .y, .z)
    let getSiti = function (anima, siti = []) {
      let situs = {}

      if (typeof anima === 'object') {
        if (typeof anima.x === 'number') situs.x = anima.x
        if (typeof anima.y === 'number') situs.y = anima.y
        if (typeof anima.z === 'number') situs.z = anima.z
      }

      if (Object.keys(situs).length === 0) situs = undefined
      else {
        situs = Object.values(situs)
        siti.push(situs)
      }

      return siti
    }

  /* **********
 *             @getPosInDim
 */
   let getPosInDim = function (staceDim) {
		 let poses = getPosesInDim(staceDim)
		 return poses[0]
		 
	 }
	 
  /* **********
 *             @getPosInDim
 */
   let getPosesInDim = function (staceDim) {
      if (0 && 1) console.log('m.stace.getLocsInDim staceDim', staceDim)

      let poses = null

      if (typeof staceDim === 'number') {
				//
      } else if (typeof staceDim === 'object' && staceDim.pos !== undefined) { // staceDim pos

				if (typeof staceDim.pos === 'number') { // number
            poses = Array.of(staceDim.pos)

        } else if (Array.isArray(staceDim.pos)) {
            let dist = staceDim.dist || 0 // distance to position
            let fas = staceDim.fas || 0 // phase in positions
            let c0 = staceDim.pos[0] // * staceDim.length / 100    // _e_
            let c1 = staceDim.pos[1] // * staceDim.length / 100    // _e_

            let pos0 = Math.floor(c0) // first of positions array
            let pos1 = Math.floor(c1) // last of positions array

            if (pos0 <= pos1) {
              poses = d3.range(pos0, pos1, step) // d3 create positional array
            } else {
              poses = d3.range(pos1, pos0, step) // d3 create positional array
            }
				}
			}
			return poses

	}


    /* **********
 *             @getLocsInDim
 *             array of locations in stace dim
 */
    let getLocsInDim = function (staceDim, parentCoordsDim = []) {
      if (0 && 1) console.log('m.stace.getLocsInDim staceDim', staceDim)

      let locations

      if (typeof staceDim === 'number') {
        locations = []
        locations.push(staceDim)
      } else if (typeof staceDim === 'object' && staceDim.pos !== undefined) { // staceDim pos
        if (parentCoordsDim.length > 0) {
          locations = []
          if (typeof staceDim.pos === 'number') { // number
            let pos = f.posInStream(staceDim.pos, parentCoordsDim)

            let idx = Math.floor(pos)

            let v = parentCoordsDim[idx]
            locations = Array.of(v)
          } else if (Array.isArray(staceDim.pos)) {
            let dist = staceDim.dist || 0 // distance to position
            let fas = staceDim.fas || 0 // phase in positions
            let c0 = staceDim.pos[0] // * staceDim.length / 100    // _e_
            let c1 = staceDim.pos[1] // * staceDim.length / 100    // _e_

            let pos0 = Math.floor(c0) // first of positions array
            let pos1 = Math.floor(c1) // last of positions array

            let step = Math.round(staceDim.step) || 1 // step between positions

            if (pos0 <= pos1) {
              locations = d3.range(pos0, pos1, step) // d3 create positional array
                .map(d => d + fas) // displace positions by phase
                .map(d => d % parentCoordsDim.length) // mod (-1)
                .map(d => Math.floor(d)) // integer position
                .map(d => parentCoordsDim[d]) // location from parent coords
                .map(d => d + dist) // sum dist to dim location
            } else {
              locations = d3.range(pos1, pos0, step) // d3 create positional array
                .map(d => d + fas) // displace positions by phase
                .map(d => d % parentCoordsDim.length) // mod
                .map(d => Math.floor(d))
                .map(d => parentCoordsDim[d])
                .map(d => d + dist)
            }
          }
        }
      }

      return locations
    }

    /* ***************************************
 *        @getLocations
 *         get val of d in dim dim
 *          called by m.profier.proform to get translate
 */

    let getLocations = function (stace, anigram, locations = []) {
      if (0 && 1) console.log('m.stace.getLocations:stace', stace)

      if (anigram !== undefined) stace = stace || anigram.payload.stace

      if (stace !== undefined && stace !== null) {
        if (Array.isArray(stace)) { // stace :: [x,y,z]
          let location = []
          let val = stace // single location from stace array

          if (f.isArray(val) && f.isPureArray(val)) { // [x,y,z]
            location = val.map((d, i) => val[i])	// one location
            locations.push(location)
          } if (f.isArray(val) && f.isQuasiPureArray(val)) { // sum by dim [[a1,a2,a3],[b1,b2]]*
            let poses = val.length // additive positions eg.2
            let mx = Math.max(...val.map(d => d.length)) // num of dims eg. 3

            for (let i = 0; i < mx; i++) { // for each dimension
              let loc = 0
              for (let j = 0; j < poses; j++) {
                loc = loc + val[j][i]
              }
              location[i] = loc
            }
            locations.push(location)
          } else {
            console.log(' location format not supported')
          }
        } else if (typeof stace === 'object') { // {}
          let entries = Object.entries(stace)

          let locationsPerDim = []

          for (let i = 0; i < entries.length; i++) {
            let entry = entries[i]
            let k1 = entry[0]
            let v1 = entry[1]

            if (typeof v1 === 'number') location[i] = v1

            else if (typeof v1 === 'object') {
              if (v1.hasOwnProperty('pos')) {
                let parentCoords = manitem.parentCoords(anigram) // parentCoords
                let parentLocationsDimd = mlacer.unslide(parentCoords) // unslide
                let parentLocationsDim = parentLocationsDimd[i]

                locationsPerDim[i] = getLocsInDim(v1, parentLocationsDim)
              }
            }
          }
          locations = mlacer.slide(locationsPerDim)
          if (0 && 1) console.log('m.stace.getLocsInDim locations', locations)
        }

        if (locations.length === 0) locations = []
      }	else {	// stace not defined take situs from parent
        let parentSitus = __mapper('xs').m('anitem').parentSitus(anigram)
        locations = Array.of(parentSitus)
      }
      return locations
    }

    /* **************************************
 *        @getLocus
 */
    let getLocus = function (stace, anigram) {
      if (0 && 1) console.log('m.stace.getLocus stace', stace)

      let locus = null // default locus _e_

      let siti = getSiti(anigram) // anima    .x,.y,.z - root and sim
      let locations = getLocations(stace, anigram) // anigram  stace x || x.pos || x.ref

      if (siti && siti.length > 0 && locations && locations.length > 0) { // siti, locations
        let situs = siti[0]
        let location = locations[0]

        locus = f.fa(situs).map((d, i) => d + location[i]) // add situs, location
      } else if (siti && siti.length > 0) { // if siti
        locus = siti[0] // first situs
      } else if (locations && locations.length > 0) { // if locations
        locus = locations[0] // first location
      }

      return locus
    }

    /* **************************************
 *        @getLocifion
 *        get the uniwen projection with translate to anigram location
 *        getLocus
 */
    let getLocifion = function (stace, anigram) {
      let locus = getLocus(stace, anigram)

      let projection = {
        'projection': 'uniwen',
        'translate': [ locus[0], locus[1], locus[2] ]
      }

      return __mapper('xs').m('profier').projion(projection)
    }

    /* **************************************
 *        @getLocifier
 *        locifier(p): [x, y, z] => [x+p[0], y+p[1], z+p[2]]
 */
    let getLocifier = function (stace, anigram = {}) {
      let locifion = getLocifion(stace, anigram)

      return g => __mapper('xs').b('proj3ct')(g, locifion)
    }

    /***********
  *         @enty
  */
    function enty () { return enty }
		
    enty.getPosInDim = getPosInDim //  getPosInDim
		
    enty.getLocus = getLocus //  location
    enty.getLocifion = getLocifion //  projection
    enty.getLocifier = getLocifier //  projector

    enty.getLocations = getLocations //  getLocations

    return enty
  }

  exports.muonStace = muonStace
}))
