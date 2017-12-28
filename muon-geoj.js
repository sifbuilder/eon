/***********
 *    @muongeoj
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.muongeoj = global.muongeoj || {})))
}(this, function (exports) { "use strict"

// ref: https://bl.ocks.org/maartenzam/ec11de22bc8e5608a98f207f1c09bdb6


  let muongeoj = function muongeoj(__mapper = {}) {

    let f = __mapper("props")()


    /**********************
   *    @resample
    *   Mike Bostock’s Block bfe064713436955c1ace
    *   Updated August 4, 2017
    *   Takes a sparse line string that assumes Cartesian interpolation in spherical
    *   coordinates and inserts interstitial points for greater accuracy when
    *   rendering with D3, which assumes spherical interpolation.
   */
    let resample = function (coordinates) {
      let i = 0,
        j = -1,
        n = coordinates.length,
        source = coordinates.slice(),
        p0, x0, y0,
        p1 = coordinates[0], x1 = p1[0], y1 = p1[1],
        dx, dy, d2,
        m2 = 10 // squared minimum angular distance
      while (++i < n) {
        p0 = p1, x0 = x1, y0 = y1
        p1 = source[i], x1 = p1[0], y1 = p1[1]
        dx = x1 - x0, dy = y1 - y0, d2 = dx * dx + dy * dy
        coordinates[++j] = p0
        if (d2 > m2) for (let k = 1, m = Math.ceil(Math.sqrt(d2 / m2)); k < m; ++k) {
          coordinates[++j] = [x0 + dx * k / m, y0 + dy * k / m]
        }
      }
      coordinates[++j] = p1
      coordinates.length = j + 1
    }


    /**********************
   *    @trim
   */
    // Maarten
    // Released under the The MIT License.
    // ref: https://bl.ocks.org/maartenzam/ec11de22bc8e5608a98f207f1c09bdb6
    let trim = function trim(json)    {
      let ret = {}

      if (json.type === "FeatureCollection") {
        ret.type = "FeatureCollection"
        ret.features = []

        for (let i=0; i<json.features.length; i++) {
          let newFeature = {}
          let feature = json.features[i]

          newFeature.type = "Feature"
          newFeature.properties = feature.properties
          newFeature.geometry = {}
          newFeature.geometry.coordinates = []

          for (let j=0; j< feature.geometry.coordinates.length ; j++) { // geometries in feature array

            let coords = largestPoly(feature.geometry.coordinates[j])
            newFeature.geometry.type = "MultiPolygon"
            newFeature.geometry.coordinates[j] = coords

          }

          ret.features[i] = Object.assign({}, newFeature)

        }

      } else if (json.type === "MultiLineString") {

        ret = json

      } else {

        ret = json

      }

      return ret

    }
    /**********************
  *     @snip
  *       return dots segment
  */
    let snip = function(form) {

      let dims = __mapper("xs").m("stace").dims()
      let braids = []
      return function(json) {
        let c = json.coordinates
        for (let i=0; i < c.length; i++) {
          let braid = f.unslide(c[i])

          for (let j=0; j<braid.length; j++) {

            let pa6 = (form[dims[j]] || {}).pa6
            let pb7 = (form[dims[j]] || {}).pb7

            braids[j] = f.streamRange(braid[j], pa6, pb7)

          }
          let coordinates = f.slide(braids)       // join dim threads
          json.coordinates = Array.of(coordinates)
        }

        return json

      }
    }

    /**********************
  *     @largestPoly
  */
    //polys: d.geometry object (GeoJSON)
    let largestPoly = function largestPoly(json) {
      let size = -Number.MAX_VALUE,
        poly = null

      for (let c = 0; c < json.length; c++) {
        let tsize = (json.type === "MultiPolygon") ? d3.polygonArea(json[c][0]) : d3.polygonArea(json[c])

        if (tsize > size) {
          size = tsize
          poly = c
        }
      }

      return [json.type === "MultiPolygon" ? json[poly][0] : json[poly]]
    }

    let lineStringFromStream = function (coords, reverse = false, props={}) {

      let geo = {}
      geo.type = "LineString"
      geo.coordinates = coords
      geo.properties = props

      return geo
    }

    let polygonFromStream = function (coords, reverse = false, props={}) {
      if (reverse === true) coords = coords.slice().reverse()

      let geo = {}
      geo.type = "Polygon"
      geo.coordinates = [coords]
      geo.properties = props

      return geo
    }

    let multLineStringFromStreamArray = function (coords, reverse = false, props={}) {
      if (reverse === true) coords = coords.slice().reverse()

      let geo = {}
      geo.type = "MultiLineString"
      geo.coordinates = coords
      geo.properties = props

      return geo
    }


    /**********************
   *    @featurize
   */
    let featurize = function (anigrams, features = []) {

      for (let i=0; i<anigrams.length; i++) {
        let anigram = anigrams[i]
        let boform = anigram.boform

        let feature = anigram.feature
            feature.id = anigram.uid

        let properties = feature.properties || {}
            properties.ric = anigram.ric
            properties.sort = anigram.sort
            properties.delled = anigram.delled
            properties.pointRadius = properties.pointRadius

            properties.hquan = undefined        // geom items
            properties.hmod = undefined         //

        let attr = properties.attr || {}        // alima position
        if (anigram.x) attr.x = anigram.x
        if (anigram.y) attr.y = anigram.y
        if (anigram.z) attr.z = anigram.z
        properties.attr = attr

        let style = properties.style || {}
            style["fill"] = f.kolor(boform.cf,boform.csx)
            style["stroke"] = f.kolor(boform.cs,boform.csx)
            style["fill-opacity"] = boform.co
            style["stroke-width"] = boform.cw
            style["stroke-opacity"] = boform.cp
        properties.style = style

        features.push(feature)
      }
      return features
    }
   /* *********************
   *    @geojize - call from halo after gjform cycle
   *      build anigram from geojson geometry
   */
    let geojize = function (json, anigram) {

      let newAnigrams= []

      if (json.type === "Feature") {

        let ani = __mapper("xs").m("anitem")(anigram)
        let newAnigram = ani.anigram()
        newAnigram.feature = json
        newAnigram.sort = "feature"
        newAnigrams.push(newAnigram)

      } else  if (json.type === "FeatureCollection") {

        let features = json.features

        for (let i=0; i<features.length; i++) {
          let ani = __mapper("xs").m("anitem")(anigram)
          let newAnigram = ani.anigram()
          
          let feature = features[i]
          let properties = feature.properties || {}

          let ric = Object.assign({},newAnigram.ric,properties.ric)

          // if (!ric.fid) ric.fid = i
          // else if (i > 0) ric.fid = ric.fid + "_" + i
           // ric.fid = (i,d,a) => (i === 0) ? a.ric.fid : a.ric.fid + "_" + i
           
          if (!ric.fid) ric.fid = i   // the fide privilege
          else if (typeof ric.fid === "function") ric.fid = ric.fid(i, ric, ani)
          else ric.fid = ric.fid

        
          newAnigram.ric = ric
          let uid =  __mapper("xs").m("ric").buildUIDFromRic(ric)
          newAnigram.uid = uid

          let boform = Object.assign({},newAnigram.boform,properties.boform)
          newAnigram.boform = boform

          newAnigram.sort = properties.sort || "feature"

          newAnigram.feature = feature
          newAnigrams.push(newAnigram)
        }
      } else  if (json.type === "GeometryCollection") {

        let geometries = json.geometries

        for (let i=0; i<geometries.length; i++) {
          let geometry = geometries[i]

          let ani = __mapper("xs").m("anitem")(anigram)

          let feature = {
            "type": "Feature",
            "geometry": geometry,
            "properties": {
              "boform": ani.boform(),
            }
          }

          let newAnigram = __mapper("xs").b("clone")(anigram)

          let ric = Object.assign({}, newAnigram.ric)

          if (!ric.fid) ric.fid = i   // the fide privilege
          // ric.fid = (i,d,a) => (i === 0) ? a.ric.fid : a.ric.fid + "_" + i
          else if (typeof ric.fid === "function") ric.fid = ric.fid(i, ric, ani)
          else ric.fid = ric.fid
          
          let uid =  __mapper("xs").m("ric").buildUIDFromRic(ric)
          newAnigram.uid = uid

          let boform = Object.assign({},newAnigram.boform)
          newAnigram.boform = boform

          newAnigram.sort = "feature"

          newAnigram.feature = feature
          newAnigram.sort = "feature"
          newAnigrams.push(newAnigram)
        }

      } else {          // geometry

        let ani = __mapper("xs").m("anitem")(anigram)
        let newAnigram = ani.anigram()
 
        let feature = {
          "type": "Feature",
          "geometry": {
            "type": json.type,
            "coordinates": json.coordinates
          },
          "properties": {
            "boform": ani.boform(),   // one boform
          }
        }

        newAnigram.feature = feature
        newAnigram.sort = "feature"
        newAnigrams.push(newAnigram)

      }
      return  newAnigrams

    }

 /**********************
   *    @zorder
   */
    let zorder = function (features) {

      let zordered = features
        .map( d => {

          d.properties  = d.properties || {}
          if (d.properties.zorder === undefined) {    // if zorder undefined
            if (d.geometry && d.geometry.coordinates && d.geometry.coordinates[0] ) {
              let outring = d.geometry.coordinates[0]   // for out ring
              let zorder = centroid(outring)
              d.properties.zorder = zorder              // try centroid.z
            } else {
              d.properties.zorder = -Infinity         // feature unformed
            }
          }
          return d
        })
        .sort( (a, b) => a.properties.zorder - b.properties.zorder )
        .map( (d,i) => {d.id = i; d.uid = i; return d} )
      return zordered
      
    }

 /**********************
   *    @centroid
   */
    let centroid = function (outring) {

          let z = 0
          let dotsinring = outring.length
          for (let k=0; k<dotsinring; k++) {
            let ck = outring[k][2]    // z camera view
            z += ck
          }
          return z / dotsinring


    }

    /**********************
   *    @enty
   */
    let enty = function enty() {}

    enty.resample = resample
    enty.trim = trim
    enty.snip = snip
    enty.largestPoly = largestPoly
    enty.lineStringFromStream = lineStringFromStream
    enty.polygonFromStream = polygonFromStream
    enty.multLineStringFromStreamArray = multLineStringFromStreamArray
    enty.geojize = geojize
    enty.featurize = featurize
    enty.zorder = zorder
    enty.centroid = centroid

    return enty

  }

  exports.muongeoj = muongeoj

}));
