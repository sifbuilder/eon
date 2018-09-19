/***********
 *    @muonStace
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonStace = global.muonStace || {})))
}(this, function (exports) {
  'use strict'

// md: # eon-muon-stace 
// md: **manage location of aniItems** 
// md: 
// md: ## methods 
// md: getPosInDim  getPosesInDim m.liner _e_ 
// md: 
// md: ### getSiti 
// md: 
// md: ### getSitus , or ani geonode 
// md:             ani position in the coords system 
// md:             in geonode.geometry 
// md:             sim forces act on the ani geonodes 
// md: 
// md: ### getLoci 
// md: 
// md: ### getLocus , locus and transpots 
// md: 
// md: ### getLocifion 
// md: get the uniwen projection with translate to anigram location 
// md: getLocus 
// md: 
// md: ### getLocifier 
// md: locifier(p): [x, y, z] => [x+p[0], y+p[1], z+p[2]] 
// md: 
// md: ### getTranspot 
// md: 
// md: ### getTranspots 
// md: `getTranspots(stace, payload)` 
// md: **get stace locations in @ric** 
// md: ##### parameters 
// md:  **stace** ,  may be passed as param or as payload attribute 
// md:     * `{x:0, y:0, z:0}`, position object 
// md:     * `[300,200,0]`,  pure array 
// md:     * `[a1,a2,a3], [b1,b2]]`,  pure multi array, add by dax 
// md:     * `[[[ {nat} ]]]`, nat form 
// md:     * `[{gen,ere,pro}]`,  parent node position, nodeGeoformed, nodeEreformed or nodeProformed 
// md:     * `[{pos:0}, a2]`,  if pos, parent form position 
// md: 
// md: if stace.<dax>.pos and no transformation property 
// md:       get spot from `parentani.geofold.geometry.coordinates` 
// md: **payload**, to get parent coords if spot is relative to parent geometry 
 
  
  async function muonStace (__mapper = {}) {
    let [
      mprops,
      mlacer,
      muonGeoj,
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').m('lacer'),
      __mapper('xs').m('geoj'),
    ])

    // ...................... range
    // https://github.com/d3/d3-array/blob/master/src/range.js
    const range = function (start, stop, step) {
      start = +start
      stop = +stop
      step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step

      var i = -1,
        n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
        range = new Array(n)

      while (++i < n) {
        range[i] = start + i * step
      }

      return range
    }

    // ..................... isValidStace
    let getTranspots = function (stace, anitem) {
      let muonStore = __mapper('muonStore') // sync

      let payload = anitem.payload
      console.assert(payload !== undefined, anitem, ' payload undefined')
      let locations = []

      // if object, convert stace to array

      if (stace && typeof stace === 'object') {
        if (stace.x !== undefined) { // if .x then position object
          stace = [ stace.x, stace.y || 0, stace.z || 0 ]
        }
      }

      // if function, funtorize stace

      if (Array.isArray(stace)) { // stace :: [x,y,z]
        stace = stace.map(d => typeof d === 'function' ? d() : d) // eval
      }

      if (stace === undefined || stace === null) {
        stace = [null, null, null]
      }

      // if stace is simple array, spot is stace

      if (mprops.isPureArray(stace)) { // [x,y,z] numbers
        locations = Array.of(stace)

      // if stace is a multiarray, get stace interadding per dax
      } else if (mprops.isPureMultiArray(stace)) { // dax sum [[a1,a2,a3],[b1,b2]]
        locations = mprops.interadd(stace)

      // else, eg. if stace undefined, get stace from parent
      } else {
        let parentuid = anitem.parentuid
        console.assert(parentuid !== undefined, ` * error: muonStace.getTranspots:parentuid ${parentuid} in payload ${payload}`)
        let parentani = muonStore.findAnigramFromUid(parentuid)
        console.assert(parentani !== undefined, ` * error: muonStace.getTranspots:parentani of ${parentuid}: ${parentani}`)

        let geofold = parentani.geofold
        let geonode = parentani.geonode
        let locationsPerDax = []

        // identify positions per stace dax

        for (let i = 0; i < stace.length; i++) { // if stace undefined assumed dim 3
          let v1 = stace[i] || {}

          // a stace dax may refer to multiple positions

          let coords = []

          // if pos, idx refers to the position in the parent geofold coordinates

          if (v1.hasOwnProperty('pos')) {
            let idx = Math.floor(v1.pos)

            // mod refers to the transformation

            if (v1.hasOwnProperty('mod')) { // geoform, conform, ereform, proform`
              // geofold transfomed are in the geofold.properties

              coords = muonGeoj.getCoords(geofold.properties[v1.mod].geometry)
            } else {
              // if no mod, positions are the goefold geometry, after transforms

              coords = muonGeoj.getCoords(geofold.geometry)
            }

            // move idx to the coords domain

            idx = (idx + coords.length) % coords.length

            // if pos, the locations per dax are the i projection of the idx coords

            locationsPerDax[i] = Array.of(coords[idx][i])

          // if not pos, idx refers to the position in the parent geonode coordinates
          } else {
            // locations refer to the geonode or the stace locations

            if (v1.hasOwnProperty('mod')) { // geoform, conform, ereform, proform`
              // get the mod on the geonode properties
              console.assert(geonode.properties[v1.mod].geometry !== undefined)
              coords = geonode.properties[v1.mod].geometry.coordinates
            } else {
              if (geonode) {
                // get the geonode coordinates

                console.assert(geonode.geometry !== undefined, `${geonode} geometry undefined`)
                coords = geonode.geometry.coordinates
              } else {
                // assume stace is location

                coords = stace
              }
            }

            locationsPerDax[i] = Array.of(coords[i])
          }
        }

        if (locationsPerDax.length > 0) {
          locations = mlacer.slide(locationsPerDax) // [300, 200]
        }
      }

      return locations
    }

    // ........................ getTranspot
    let getTranspot = (stace, anitem) => getTranspots(stace, anitem)[0]

    // ........................ getSiti         situs: Arary.of(anitem.x, .y, .z)
    let getSiti = function (anima, siti = []) {
      if (anima && anima.geonode) {
        siti = Array.of(anima.geonode.geometry.coordinates)
      }

      return siti
    }

    // ........................ getSitus
    let getSitus = anima => getSiti(anima)[0]

    // ........................ getPosInDim
    let getPosInDim = function (staceDim) {
      let poses = getPosesInDim(staceDim)
      return poses[0]
    }

    // ........................ getPosesInDim
    let getPosesInDim = function (staceDim) {
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
          let step = 1

          let pos0 = Math.floor(c0) // first of positions array
          let pos1 = Math.floor(c1) // last of positions array

          if (pos0 <= pos1) {
            poses = range(pos0, pos1, step) // d3 create positional array
          } else {
            poses = range(pos1, pos0, step) // d3 create positional array
          }
        }
      }
      return poses
    }

    // ........................ getLocsInDim
    let getLocsInDim = function (staceDim, parentCoordsDim = []) {
      let locations

      if (typeof staceDim === 'number') {
        locations = []
        locations.push(staceDim)
      } else if (typeof staceDim === 'object' && staceDim.pos !== undefined) { // staceDim pos
        if (parentCoordsDim.length > 0) {
          locations = []
          if (typeof staceDim.pos === 'number') { // number
            let pos = mprops.posInStream(staceDim.pos, parentCoordsDim)

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
              locations = range(pos0, pos1, step) // d3 create positional array
                .map(d => d + fas) // displace positions by phase
                .map(d => d % parentCoordsDim.length) // mod (-1)
                .map(d => Math.floor(d)) // integer position
                .map(d => parentCoordsDim[d]) // location from parent coords
                .map(d => d + dist) // sum dist to dim location
            } else {
              locations = range(pos1, pos0, step) // d3 create positional array
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

    // ........................ getLoci
    let getLoci = function (stace, anitem) {
      let locations = [] // default locations _e_

      let situs = getSitus(anitem) // anima    .x,.y,.z - root and sim

      let spots = getTranspots(stace, anitem) // anitem  stace x || x.pos || x.ref

      if (situs && spots && spots.length > 0) { // if situs and spots
        locations = spots.map(spot => spot.map((d, i) => d + situs[i])) // transpose spots by situs
      } else if (situs) { // if situs
        locations = Array.of(situs) // siti
      } else if (spots && spots.length > 0) { // if spots
        locations = spots // locations
      }

      return locations
    }

    // ........................ getLocus
    let getLocus = (stace, anitem) => getLoci(stace, anitem)[0]

    // ........................ enty
    function enty () { return enty }

    enty.getLocsInDim = getLocsInDim //  getLocsInDim
    enty.getPosInDim = getPosInDim //  getPosInDim

    enty.getSiti = getSiti //
    enty.getSitus = getSitus //

    enty.getLoci = getLoci //  locations
    enty.getLocus = getLocus //  location

    enty.getTranspot = getTranspot //  getTranspot
    enty.getTranspots = getTranspots //  getTranspots

    return enty
  }

  exports.muonStace = muonStace
}))
