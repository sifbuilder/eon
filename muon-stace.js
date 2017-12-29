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


    // ........................ getSiti   situs: a:{x,y,z}
    let getSiti = function (anima, siti=[]) {

      if (anima !== undefined) {          // empty list of siti

        let situs = getSitus(anima)

        if (situs !== undefined) { siti.push(situs) } // add situs

      }

      return siti

    }

    /* ***************************************
 *  getPositions
 *      get positions form anigram.stace
 *      called by getLocations if no situs
 *
 *    stace: {"x": [[[200,400]]], "y": 100, "z": 0,}
 *
 *    stace: [[[ () => [ [[[200,100,400]]] , 100, 0] ]]]
 *
 *    stace = [[[ () => {
 *      let geo = {
 *       "type": "LineString",
 *       "coordinates": [ [200, 100, 0],[100, 100, 0],[400, 100, 0], ]
 *      }
 *      return f.ta(f.unslide(geo.coordinates))
 *    } ]]]
 *
 *    stace = [[[ {
 *      "x": {
 *        "m1":4,"m2":4,"n1":2,"n2":2,"n3":2,"a":1,"b":1, // circle
 *        "ra2": 100,"v0": 0,"v1":1,"w4": 90,"seg5": 360,"pa6":0,"pb7":-1,"fas8": 0,
 *      },
 *      "y": {
 *        "m1":4,"m2":4,"n1":100,"n2":100,"n3":100,"a":1,"b":1, // square
 *        "ra2": 100,"v0":0,"v1":1,"w4": 90,"seg5": 360,"pa6":0,"pb7":-1,"fas8": -90,
 *      },
 *      "z": {
 *        "m1":5,"m2":5,"n1":2,"n2":7,"n3":7,"a":1,"b":1, // star
 *        "ra2": 260,"v0": 0,"v1":1,"w4": 0,"seg5": 12,"pa6":0,"pb7":-1,"fas8": 0,
 *      }
 *    } ]]]
 *
 */

    let getLocsInDim = function (stateDim, parentCoords = []) { // get loc in stateDim if object

      let locations = []
      if (typeof stateDim === "number") {

        locations.push(stateDim)

      } else if (typeof stateDim === "object" && stateDim.pos !== undefined)  {// stateDim pos

        if (parentCoords.length > 0) {

          if (typeof stateDim.pos === "number") {           // one position
            let pos = stateDim.pos % parentCoords.length    // pos spec
            if (pos < 0) pos = (pos + parentCoords.length) % parentCoords.length
            let idx = Math.floor(pos)

            let v = parentCoords[idx]
            locations = Array.of(v)

          } else if (Array.isArray(stateDim.pos)) {

            let dist = stateDim.dist || 0               // distance to position
            let fas = stateDim.fas || 0               // phase in positions
            let pos0 = Math.floor(stateDim.pos[0])      // first of positions array
            let pos1 = Math.floor(stateDim.pos[1])    // last of positions array
            let step = Math.round(stateDim.step) || 1    // step between positions

            if (pos0 <= pos1) {
              locations = d3.range(pos0,pos1, step)   // d3 create positional array
                .map(d => d + fas)                        // displace positions by phase
                .map(d => d % parentCoords.length)          // mod (-1)
                .map(d => Math.floor(d))              // integer position
                .map(d => parentCoords[d])            // location from parent coords
                .map(d => d + dist)                   // sum dist to dim location
            } else {
              locations = d3.range(pos1, pos0, step)    // d3 create positional array
                .map(d => d + fas)                  // displace positions by phase
                .map(d => d % parentCoords.length)          // mod
                .map(d => Math.floor(d))
                .map(d => parentCoords[d])
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
        let parentGeometryType = parent.feature.geometry.type
        if (parentGeometryType === "Polygon") {
          let parentGeometry = parent.feature.geometry
          parentCoords = parentGeometry.coordinates[0]    // Polygon outer ring


          for (let i=0; i< dims.length; i++) {

            let dimState = anigram.stace[dims[i]],    // dim i stace
              dimStream = f.unslide(parentCoords)[i]  // dim i parent coords

            braid[i] = getLocsInDim(dimState, dimStream)

          }

          locations = f.slide(braid, "max")

        } else {
          console.log("_e_")
        }

      }

      return locations
    }

    // ............................... getPositions
    let getPositions = function (anima, locations=[]) {
      let a = __mapper("xs").m("anitem").anigram(anima)

      if (a.stace !== undefined &&
              Array.isArray(a.stace)) {             // anima.stace.[x,y,z]

        let location = a.stace                  // single location from stace array
        locations.push(location)
        return locations

      }

      if (a.stace !== undefined &&
              typeof a.stace === "object") {        // anima.stace.{x,y,z}

        let locations = getLocs(a)              // get locations from stace positions

        return locations

      }

      if (a.stace === undefined &&
              a.parentuid !== undefined) {          // parent.{x,y,z}

        let locations = []

        let parent = a.parent || __mapper("xs").m("store").findAnigramFromUid(a.parentuid)

        if (parent !== undefined) {
          locations = getPositions(parent)
        }
        return locations

      }

      if (locations === undefined) locations = [[0,0,0]]
      return locations

    }
    /* ***************************************
 *      getLocations:
 *        stace situs     stace.{x,y,z}
 *          or  position  stace.(pos,pos,pos}
 *
 */
    let getLocation = function (anigram = {}) {

      let siti = getSiti(anigram)         // {x,y,z}
      let positions = getPositions(anigram) //

      let locations = []
      if (siti && siti.length >0 && positions && positions.length > 0) {
        locations = f.slide([siti, positions], "max")   // slide dim sites    ****
      }
      let location = [0,0,0]

      if (siti && siti.length > 0 && positions && positions.length >0) {
        location = f.fa(siti[0]).map((d, i)  => d + positions[0][i])  // force array
      } else if (siti && siti.length >0 ) {
        location = f.fa(siti[0])
      } else if (positions && positions.length >0 ) {
        location = positions[0]
      }
      return location                 // 3dim cartesian location

    }

    /* **************************************
 *        @getReformer
 */
    let getReformer = function (stace = {}) {
      if ( stace && stace.x && stace.x.ref && stace.y &&  stace.y.ref) {
        return function(json) {
          let outring = json.geometry.coordinates[0]
          let refs = f.unslide(outring)
          let r0 = refs[0][stace.x.ref]
          let r1 = refs[1][stace.y.ref]
          let refpos = { "translate": [ r0, r1 ] }
          let reform =  __mapper("xs").g("unidentity")(refpos)
          let reformer = d => d3.geoProject(d, reform)
          return  reformer(json)     // reform
        }
      }  else {
        return d => d               // identity
      }
    }
    /* **************************************
 *        @getReform
 */
    let getReform = function (stace = {}) {
      if ( stace && stace.x && stace.x.ref && stace.y &&  stace.y.ref) {
        return function(json) {
          let outring = json.geometry.coordinates[0]
          let refs = f.unslide(outring)
          let r0 = refs[0][stace.x.ref]
          let r1 = refs[1][stace.y.ref]
          let projection =  {
            "projection": "identity",
            "translate": [ r0, r1  ]
          }
          return  __mapper("xs").m("identity").getproj(projection)

        }
      }  else {
        let projection =  {
          "projection": "identity",
        }
        return  __mapper("xs").b("gist")(projection)
      }

    }

    // ............................. getSitus
    let getSitus = anima => {
      let ret = {}
      if ( typeof anima.x === "number" ) ret.x = anima.x
      if ( typeof anima.y === "number" ) ret.y = anima.y
      if ( typeof anima.z === "number" ) ret.z = anima.z

      if (Object.keys(ret).length === 0) ret = undefined
      else ret = Object.values(ret)

      return ret
    }

/* **************************************
 *        @getLocifier
 *
 */
    let getLocifier = function (anigram = {}) {

      let location = getLocation(anigram)

      let projection =  {
        "projection": "uniwen",
        "translate": [ location[0], location[1], location[2] ]
      }
      return  __mapper("xs").b("gist")(projection)

    }

/***********
  *         @api
  */

/* **************************************
 *        @getLociformer
 *        locifier(p): [x, y, z] => [x+p[0], y+p[1], z+p[2]]
 */
    let getLociformer = function (anigram = {}) {

      let lociform = getLocifier (anigram)
      return g =>  __mapper("xs").b("proj3ct")(g, lociform)

    }






    /***********
  *         @enty
  */
    function enty() { return enty }

    enty.getLociformer = getLociformer        //  d3 projection
    // enty.getLocifier = getLocifier        //  projection

    enty.getReformer = getReformer  //  getReformer
    enty.getReform = getReform  //  getReform

    return enty

  }

  exports.muonStace = muonStace

}))
