/***********
 *    @muonStace
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.muonStace = global.muonStace || {})))
}(this, function (exports) { "use strict"

  let muonStace = function (__mapper = {}) {

    let f = __mapper("props")()

  /* ******************************************
    getLocifier (anigram)
    getLocifion (anigram)
      getLocation (anigram)
        getSiti (anigram)
        getPositions (anigram)
          getLocs (anigram)
            getLocsInDim (dimStace, dimStream)  -- location of dimStream by dimStace
          getParentLocations (anigram)          -- inherit natural parent location
  */
    // ........................ getSiti         situs: Arary.of(ani.x, .y, .z)
    let getSiti = function (anima) {

      let situs = {}

      if ( typeof anima.x === "number" ) situs.x = anima.x
      if ( typeof anima.y === "number" ) situs.y = anima.y
      if ( typeof anima.z === "number" ) situs.z = anima.z

      if (Object.keys(situs).length === 0) situs = undefined
      else situs = Object.values(situs)

      return Array.of(situs)

    }

 /* **********
 *               @posInStream
 *               rpos: relative percent position in unistream
 */
    let posInStream = function(rpos, stream) {

      let pos
      let unidimLength = stream.length
      pos = Math.round(rpos * unidimLength  / 100)
      pos = (pos >= 0) ? pos % unidimLength : (pos + unidimLength) % unidimLength
      return pos

    }

    let getLocsInDim = function (staceDim, parentCoordsDim = []) {

      if (1 && 1) console.log("getLocsInDim", staceDim)
      let locations = []
      if (typeof staceDim === "number") {

        locations.push(staceDim)

      } else if (typeof staceDim === "object" && staceDim.pos !== undefined)  {// staceDim pos

        if (parentCoordsDim.length > 0) {

          if (typeof staceDim.pos === "number") {           // one position

            let pos = posInStream(staceDim.pos, parentCoordsDim)

            let idx = Math.floor(pos)

            let v = parentCoordsDim[idx]
            locations = Array.of(v)

          } else if (Array.isArray(staceDim.pos)) {

            let dist = staceDim.dist || 0 // distance to position
            let fas = staceDim.fas || 0   // phase in positions
            let c0 = staceDim.pos[0]      // * staceDim.length / 100    // _e_
            let c1 = staceDim.pos[1]      // * staceDim.length / 100    // _e_

            let pos0 = Math.floor(c0)     // first of positions array
            let pos1 = Math.floor(c1)     // last of positions array

            let step = Math.round(staceDim.step) || 1    // step between positions

            if (pos0 <= pos1) {
              locations = d3.range(pos0, pos1, step)   // d3 create positional array
                .map(d => d + fas)                        // displace positions by phase
                .map(d => d % parentCoordsDim.length)          // mod (-1)
                .map(d => Math.floor(d))              // integer position
                .map(d => parentCoordsDim[d])            // location from parent coords
                .map(d => d + dist)                   // sum dist to dim location
            } else {
              locations = d3.range(pos1, pos0, step)    // d3 create positional array
                .map(d => d + fas)                  // displace positions by phase
                .map(d => d % parentCoordsDim.length)          // mod
                .map(d => Math.floor(d))
                .map(d => parentCoordsDim[d])
                .map(d => d + dist)
            }

          }
        }
      }


      return locations
    }

    // ............................... getLocs  get locations from parent stace positions
    let getLocs = function(anigram) {

      let locations = []
      let parentCoords = []   // get parent coords from anigram

      let braid = [],
        dims = __mapper("xs").m("anitem").dims()

      let parent = __mapper("xs").m("store").findAnigramFromUid(anigram.parentuid) || anigram.parent
      if (parent !== undefined && parent.feature && parent.feature.geometry) {

        let parentGeometry = parent.feature.geometry
        parentCoords = __mapper("xs").m("geoj").getCoords(parentGeometry)

        if (parentCoords !== undefined) {

          for (let i=0; i< dims.length; i++) {

            let dimStace = anigram.stace[dims[i]],    // dim i stace
              dimStream = f.unslide(parentCoords)[i]  // dim i parent coords

            braid[i] = getLocsInDim(dimStace, dimStream)

          }

          locations = f.slide(braid, "max")

          if (0 && 1) console.log("locations", ...locations)

        } else {
          if (0 && 1) console.log("_e_ parent coordinates undefined ")
        }

      }

      return locations
    }

 /* ***************************************
 *        @getPositions
 *
 */
    let dimval = (dim, d) => {
      let ret
      if (typeof d === "number")          ret = d
        else if (Array.isArray(d))  {
            if ( typeof d[dim] === "number" ) ret = d[dim]
            else if (Array.isArray(d[dim])) ret = d[dim][dim]
            else if (typeof d[dim] === "object") ret = Object.values(d[dim])[dim]
        }
        else if (typeof d === "object")   ret = Object.values(d)[dim]
      return ret
    }
 
    let getPositions = function (anigram, locations=[]) {


      let stace = anigram.stace

      if (1 && 1) console.log ("  m.stace.getPositions stace", stace )

      if (stace !== undefined && Array.isArray(stace)) {  // anigram.stace.[x,y,z]

        let val = stace                  // single location from stace array
        let location = []
        
        location[0] = dimval(0 ,val)
        location[1] = dimval(1, val)
        location[2] = dimval(2, val)
  
        locations.push(location)

      }

      else if (stace !== undefined && typeof stace === "object") { // anigram.stace.{x,y,z}

        let location = []
        let entries = Object.entries(stace)


        for (let i=0; i<entries.length; i++) {
          let entry=entries[i]
          let key = entry[0]
          let val = entry[1]
          if      (key === "x") location[0] = dimval(0 ,val)
          else if (key === "y") location[1] = dimval(1, val)
          else if (key === "z") location[2] = dimval(2, val)

        }


        locations.push(location)


        if (location.length === 0)  {   // object without dims keys

          if (stace !== undefined && typeof stace === "object") { // try anigram.stace.{}

            locations = getLocs (anigram)    // get locations from stace positions

          }

        }

      }

      if (locations.length === 0) {           // if still nothing, try to inherit from parent

        locations = getParentLocations (anigram)

      }


      if (locations.length === 0) locations = [[0,0,0]]
      return locations

    }

 /* ***************************************
 *        @getParentLocation
 */
    let getParentLocations = function (anigram = {}, locations=[]) {

      let stace = anigram.stace,
        parentuid = anigram.parentuid,
        parent = anigram.parent

      parent = parent || __mapper("xs").m("store").findAnigramFromUid(parentuid)

      if (parent !== undefined) locations = getPositions(parent)

      return locations

    }

 /* ***************************************
 *        @getLocation
 *        stace situs     stace.{x,y,z}
 *          or  position  stace.(pos,pos,pos}
 *        situs adds to position
 *
 */
    let getLocation = function (anigram = {}) {

      let siti = getSiti(anigram)           // .x,.y,.z}
      let positions = getPositions(anigram) // .pos.x,.pos.y,.pos.z

      let location = [0,0,0]            // default location _e_

      if (siti && siti.length > 0 && positions && positions.length > 0) {

        location = f.fa(siti[0]).map((d, i) => d + positions[0][i])  // force array

      } else if (siti && siti.length > 0 ) {

        location = f.fa(siti[0])

      } else if (positions && positions.length >0 ) {

        location = positions[0]

      }
      return location                 // 3dim cartesian location

    }



    /* **********
  *         @api
  *          get the uniwen projection with translate to ref location
  */

    let getReffion = function (anigram = {}) {

      let stace = anigram.stace

      let geometry = anigram.feature.geometry
      let coords = __mapper("xs").m("geoj").getCoords(geometry)

      let refs = f.unslide(coords)      // unidim coords
      let r0 = refs[0][stace.x.ref]     // stace.x.ref
      let r1 = refs[1][stace.y.ref]     // stace.y.ref
      let r2 = refs[2][stace.z.ref]     // stace.z.ref

      let projection =  {
        "projection": "uniwen",
        "translate": [ r0, r1 , r2 ]
      }

      return  __mapper("xs").m("profier").getProjion(projection)

    }

 /* **************************************
 *        @getLocifion
 *        get the uniwen projection with translate to anigram location
 *        getLocation
 */
    let getLocifion = function (anigram ) {
      if (0 && 1) console.log("getLocifion", anigram)
      let location = getLocation(anigram)

      let projection =  {
        "projection": "uniwen",
        "translate": [ location[0], location[1], location[2] ]
      }
      return  __mapper("xs").m("profier").getProjion(projection)

    }

    /* **************************************
 *        @getLocifier
 *        locifier(p): [x, y, z] => [x+p[0], y+p[1], z+p[2]]
 */
    let getLocifier = function (anigram = {}) {

      let locifion = getLocifion (anigram)

      return g =>  __mapper("xs").b("proj3ct")(g, locifion)

    }

    /* **************************************
 *        @getReffier
 */
    let getReffier = function (anigram = {}) {
      let stace = anigram.stace
      if ( stace && stace.x && stace.x.ref &&       // stace.x.ref
                    stace.y &&  stace.y.ref) {      // stace.y.ref

        let reffion = getReffion (anigram)

        return g =>  __mapper("xs").b("proj3ct")(g, reffion)

      }  else {

        return d => d               // identity

      }
    }


    /***********
  *         @enty
  */
    function enty() { return enty }

    enty.getLocifion = getLocifion   //  d3 projection
    enty.getLocifier = getLocifier   //  d3 projecter

    enty.getReffion = getReffion      //  projection
    enty.getReffier = getReffier      //  projecter

    enty.posInStream = posInStream      //  posInStream

    return enty

  }

  exports.muonStace = muonStace

}))
