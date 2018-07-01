/***********
 *    @muonStace
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonStace = global.muonStace || {})))
}(this, function (exports) {
  'use strict'

  // md: # md:{filename}
  // md: **manage location of aniItems**
  // md:
  // md: ## methods
  // md: getPosInDim  getPosesInDim m.liner _e_
  // md:
  // md: ### getSiti
  // md:
  // md: ### getSitus , or ani geonode
  // md:             ani position in the coords system
  // md:             in geofold.properties.geonode.geometry
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
  // md: **get stace locations in @payload.ric**
  // md: ##### parameters
  // md:  **stace** ,  may be passed as param or as payload attribute
  // md:     * `{x:0, y:0, z:0}`, position object
  // md:     * `[300,200,0]`,  pure array
  // md:     * `[a1,a2,a3], [b1,b2]]`,  pure multi array, add by dax
  // md:     * `[[[ {nat} ]]]`, nat form
  // md:     * `[{gen,ere,pro}]`,  parent node position, nodeGeoformed, nodeEreformed or nodeProformed
  // md:     * `[{pos:0}, a2]`,  if pos, parent form position
  // md:
  // md:   if stace.<dax>.pos and no transformation property
  // md:       get spot from `parentani.geofold.geometry.coordinates`
  // md:  **payload**, to get parent coords if spot is relative to parent geometry
  // md:

  let muonStace = function (__mapper = {}) {
    let f = __mapper('xs').m('props'),
      mstore = __mapper('xs').m('store'),
      mlacer = __mapper('xs').m('lacer'),
      manitem = __mapper('xs').m('anitem'),
      mgeoj = __mapper('xs').m('geoj')

    // ..................... isValidStace
    let getTranspots = function (s, ani) {
      let stace = s
      let payload = ani.payload
      let locations = []
      let valid = 0

      if (stace && typeof stace === 'object') {
        if (stace.x !== undefined) {	// if .x then position object
          stace = [ stace.x, stace.y || 0, stace.z || 0 ]
        }
      }

      if (Array.isArray(stace)) { // stace :: [x,y,z]
        stace = stace.map(d => typeof d === 'function' ? d() : d)	// eval

        if (f.isPureArray(stace)) { // [x,y,z] numbers
          valid = 1
          locations = Array.of(stace)
        } else if (f.isPureMultiArray(stace)) { // sum by dim [[a1,a2,a3],[b1,b2]]
          valid = 1
          locations = f.interadd(stace)
        } else {
          let parentuid = payload.parentuid
          if (2 && 2 && !parentuid) console.log(` * error: mstace.getTranspots:parentuid ${parentuid} in payload `, payload)
          let parentani = mstore.findAnigramFromUid(parentuid)
          if (2 && 2 && !parentani) console.log(`** error: mstace.getTranspots:parentani of ${parentuid}: ${parentani}`)

          let formGeoformed = parentani.geofold.properties.formGeoformed
          let formEreformed = parentani.geofold.properties.formEreformed
          let formProformed = parentani.geofold.properties.formProformed
          let nodeGeoformed = parentani.geofold.properties.nodeGeoformed || {geometry: {}}
          let nodeEreformed = parentani.geofold.properties.nodeEreformed || {geometry: {}}
          let nodeProformed = parentani.geofold.properties.nodeProformed || {geometry: {}}

          let locationsPerDax = []
          for (let i = 0; i < stace.length; i++) {
            let staceDax = stace[i]
            let v1 = staceDax

            if (!v1.hasOwnProperty('pos')) {	// in node
              let coords = []
              if (v1.hasOwnProperty('geo')) { // GEO
                coords = nodeGeoformed.geometry.coordinates
              } else if (v1.hasOwnProperty('ere')) { // ERE
                coords = nodeEreformed.geometry.coordinates
              } else if (v1.hasOwnProperty('pro')) { // PRO
                coords = nodeProformed.geometry.coordinates
              } else { // if pos look into geometry
                coords = nodeGeoformed.geometry.coordinates
              }
              locationsPerDax[i] = Array.of(coords[i])

            } else { // search on form
              let idx = Math.floor(v1.pos)
              let coords = []
              if (v1.hasOwnProperty('geo')) {
                coords = mgeoj.getCoords(formGeoformed.geometry)               
              } else if (v1.hasOwnProperty('ere')) {
                coords = mgeoj.getCoords(formEreformed.geometry)
              } else if (v1.hasOwnProperty('pro')) {
                coords = mgeoj.getCoords(formProformed.geometry)
              } else { // if pos look into geometry
                coords = mgeoj.getCoords(parentani.geofold.geometry)
              }
              idx = (idx + coords.length) % coords.length
              locationsPerDax[i] = Array.of(coords[idx][i])
              
            }
          }
          if (locationsPerDax.length > 0) {
            locations = mlacer.slide(locationsPerDax) // [300, 200]
          }
        }
      } 

      return locations
    }

    // ........................ getTranspot
    let getTranspot = (stace, ani) => getTranspots(stace, ani)[0]

    // ........................ getSiti         situs: Arary.of(ani.x, .y, .z)
    let getSiti = function (anima, siti = []) {
      if (anima && anima.geofold && anima.geofold.properties.geonode) {
        siti = Array.of(anima.geofold.properties.geonode.geometry.coordinates)
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
            poses = d3.range(pos0, pos1, step) // d3 create positional array
          } else {
            poses = d3.range(pos1, pos0, step) // d3 create positional array
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

    // ........................ getLoci
    let getLoci = function (stace, ani) {
      let locations = [] // default locations _e_

      let situs = getSitus(ani) // anima    .x,.y,.z - root and sim

      let spots = getTranspots(stace, ani) // ani  stace x || x.pos || x.ref

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
    let getLocus = (stace, ani) => getLoci(stace, ani)[0]

    // ........................ getLocifion
    let getLocifion = function (stace, ani) {
      let locus = getLocus(stace, ani)

      let projection = {
        'projection': 'uniwen',
        'translate': [ locus[0], locus[1], locus[2] ]
      }

      return __mapper('xs').m('profier').formion(projection)
    }

    // ........................ getLocifier
    let getLocifier = function (stace, ani = {}) {
      let locifion = getLocifion(stace, ani)

      return g => __mapper('xs').m('proj3ct')(g, locifion)
    }

    // ........................ enty
    function enty () { return enty }

    enty.getPosInDim = getPosInDim //  getPosInDim

    enty.getSiti = getSiti //
    enty.getSitus = getSitus //

    enty.getLoci = getLoci //  locations
    enty.getLocus = getLocus //  location

    enty.getLocifion = getLocifion //  projection
    enty.getLocifier = getLocifier //  projector

    enty.getTranspot = getTranspot //  getTranspot
    enty.getTranspots = getTranspots //  getTranspots

    return enty
  }

  exports.muonStace = muonStace
}))
