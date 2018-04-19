/***********
 *    @muongeoj
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muongeoj = global.muongeoj || {})))
}(this, function (exports) {
  'use strict'

  // ref: https://bl.ocks.org/maartenzam/ec11de22bc8e5608a98f207f1c09bdb6

  let muongeoj = function muongeoj (__mapper = {}) {
    let f = __mapper('props')()

    // https://github.com/mapbox/geojson-normalize/blob/master/index.js
    let types = {
      Point: 'geometry',
      MultiPoint: 'geometry',
      LineString: 'geometry',
      MultiLineString: 'geometry',
      Polygon: 'geometry',
      MultiPolygon: 'geometry',
      GeometryCollection: 'geometry',
      Feature: 'feature',
      FeatureCollection: 'featurecollection'
    }

    
    
    
    // complexify
var complexifyObjectType = {
  Feature: function(object) {
    return complexifyGeometry(object.geometry);
  },
  FeatureCollection: function(object) {
    var features = object.features, i = -1, n = features.length;
    
    let ret = object
    ret.features = features.map(feature => complexifyGeometry(feature.geometry))
    return ret

  }
};

var complexifyGeometryType = {
  Sphere: function() {
    // return true;
  },
  Point: function(object) {
    return complexifyPoint(object.coordinates)
  },
  MultiPoint: function(object) {
    var coordinates = object.coordinates.map(coords => complexifyPoint(coords))
    let ret = object
    ret.coordinates = coordinates
    return ret
  },
  LineString: function(object) {
    let ret = object      
    ret.coordinates = complexifyLine(object.coordinates);
    return ret
  },
  MultiLineString: function(object) {
    var coordinates = object.coordinates
    
    let ret = object
    ret.coordinates = coordinates.map(line => complexifyLine(line))
    return ret
  },
  Polygon: function(object) {
    var coordinates = object.coordinates
    
    let ret = object
    ret.coordinates = coordinates.map(line => complexifyLine(line))
    return ret
  },
  MultiPolygon: function(object) {
    var polygons = object.coordinates.map(
      polygon => polygon.map(
        ring => complexifyLine(ring)))

      let ret = object
      ret.coordinates = polygons
      return ret    
  },
  GeometryCollection: function(object) {
    var geometries = object.geometries.map(
      geometry => complexifyGeometry(geometry))
    return geometries
  }
}

function complexifyGeometry(geometry) {
  return geometry && complexifyGeometryType.hasOwnProperty(geometry.type)
      ? complexifyGeometryType[geometry.type](geometry)
      : false;
}
   
function complexify(object) {
  return (object && complexifyObjectType.hasOwnProperty(object.type)
      ? complexifyObjectType[object.type]
      : complexifyGeometry)(object)
}
   
function complexifyPoint(coordinates) {
  return Complex(coordinates[0], coordinates[1])
}    
     
function complexifyLine(coordinates) {
    let ret = coordinates.map(coords => complexifyPoint(coords))
    return ret
}    
    
    
    
    
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
        if (d2 > m2) {
          for (let k = 1, m = Math.ceil(Math.sqrt(d2 / m2)); k < m; ++k) {
            coordinates[++j] = [x0 + dx * k / m, y0 + dy * k / m]
          }
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
    let trim = function trim (json) {
      let ret = {}

      if (json.type === 'FeatureCollection') {
        ret.type = 'FeatureCollection'
        ret.features = []

        for (let i = 0; i < json.features.length; i++) {
          let newFeature = {}
          let feature = json.features[i]

          newFeature.type = 'Feature'
          newFeature.properties = feature.properties
          newFeature.geometry = {}
          newFeature.geometry.coordinates = []

          for (let j = 0; j < feature.geometry.coordinates.length; j++) { // geometries in feature array
            let coords = largestPoly(feature.geometry.coordinates[j])
            newFeature.geometry.type = 'Polygon'
            newFeature.geometry.coordinates[j] = coords[0]
          }

          ret.features[i] = Object.assign({}, newFeature)
        }
      } else if (json.type === 'MultiLineString') {
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
    let snip = function (form) {
      let dims = __mapper('xs').m('anitem').dims()
      let braids = []
      return function (json) {
        let c = json.coordinates
        for (let i = 0; i < c.length; i++) {
          let braid = f.unslide(c[i])

          for (let j = 0; j < braid.length; j++) {
            let pa6 = (form[dims[j]] || {}).pa6
            let pb7 = (form[dims[j]] || {}).pb7

            braids[j] = f.streamRange(braid[j], pa6, pb7)
          }
          let coordinates = f.slide(braids) // join dim threads
          json.coordinates = Array.of(coordinates)
        }

        return json
      }
    }

    /**********************
  *     @largestPoly
  */
    // polys: d.geometry object (GeoJSON)
    let largestPoly = function largestPoly (json) {
      let size = -Number.MAX_VALUE,
        poly = null

      for (let c = 0; c < json.length; c++) {
        let tsize = (json.type === 'MultiPolygon') ? d3.polygonArea(json[c][0]) : d3.polygonArea(json[c])

        if (tsize > size) {
          size = tsize
          poly = c
        }
      }

      return [json.type === 'MultiPolygon' ? json[poly][0] : json[poly]]
    }

    let lineStringFromStream = function (coords, reverse = false, props = {}) {
      let geo = {}
      geo.type = 'LineString'
      geo.coordinates = coords
      geo.properties = props

      return geo
    }

    let polygonFromStream = function (coords, reverse = false, props = {}) {
      if (reverse === true) coords = coords.slice().reverse()

      let geo = {}
      geo.type = 'Polygon'
      geo.coordinates = [coords]
      geo.properties = props

      return geo
    }

    let multLineStringFromStreamArray = function (coords, reverse = false, props = {}) {
      if (reverse === true) coords = coords.slice().reverse()

      let geo = {}
      geo.type = 'MultiLineString'
      geo.coordinates = coords
      geo.properties = props

      return geo
    }



  //md: ## mgeoj.ntime
  //md:   json
  //md:   interval
  let ntime = function(json, interval) {

        let tfeatures = []
        if (json.type == 'Feature') {
          let geometry = json.geometry
          if (geometry !== null) coords = [...coords, ...getCoords(geometry)]
        } else if (json.type == 'FeatureCollection') {
          for (let feature_num = 0; feature_num < json.features.length; feature_num++) {
            let feature = json.features[feature_num]
            getCoords(feature, coords)
          }
        } else if (json.type == 'GeometryCollection') {
          for (let geom_num = 0; geom_num < json.coords.length; geom_num++) {
            let geometry = json.coords[geom_num]
            coords.push(geometry)
          }
        } else if (json.type === 'Point') {
          let geometry = json
          coords = [...coords, geometry.coordinates]  // if Point, return array

        } else if (json.type === 'LineString') {

          let tfeature = {
            type: 'Feature',
            geometry: {type: 'LineString',coordinates: json.coordinates},
            properties: {interval: interval}
          }
          tfeatures.push(tfeature)


        } else if (json.type === 'MultiPoint') {
          let geometry = json
          coords.push(geometry)


        } else if (json.type === 'Polygon') {

          let rings = json.coordinates
          for (let i=0; i<rings.length; i++) {
            let line = rings[i]

            let tfeature = {
              type: 'Feature',
              geometry: {type: 'LineString',coordinates: line},
              properties: {interval: interval}
            }
            tfeatures.push(tfeature)
          }

        } else if (json.type === 'MultiLineString') {

          let lines = json.coordinates
          for (let i=0; i<lines.length; i++) {
            let line = lines[i]

            let tfeature = {
              type: 'Feature',
              geometry: {type: 'LineString',coordinates: line},
              properties: {interval: interval}
            }
            tfeatures.push(tfeature)
          }


        } else if (json.type === 'MultiPolygon') {
          
          let polygons = json.coordinates
          for (let i=0; i<polygons.length; i++) {
            let polygon = polygons[i]

            let tfeature = {
              type: 'Feature',
              // geometry: {type: 'Polygon',coordinates: polygon},
              geometry: {type: 'LineString',coordinates: polygon[0]},
              properties: {interval: interval}
            }
            tfeatures.push(tfeature)
          }
          
        } else if (json.type === 'Sphere') {
            let geometry = json
            coords.push(geometry)
        } else {
          throw new Error('json type not identified.')
        }

        return tfeatures
  }


    
  //md: ## mgeoj.featurize
  //md:   json
  //md:     transform gj.FeatureCollection, gj.Feature, gj.GeometryCollection
  //md:     to array of gj.Features
    let featurize = function (json) {

      let features = []
      if (json && json.type) {
        let type = json.type

        if (type === 'Feature') {
          features = Array.of(json)
        } else if (type === 'FeatureCollection') {
          features = json.features
        } else if (type === 'GeometryCollection') {
          features = json.map(d => ({
            type: 'Feature',
            geometry: {
              type: d.type,
              coordinates: d.coordinates},
            properties: {}}))
        } else {
          features = Array.of({
            type: 'Feature',
            geometry: {
              type: json.type,
              coordinates: json.coordinates},
            properties: {geonode: {}}})
        }
      } else {
        console.log('m.geoj.featurize not supported geojson ',json)
      }

      return features
    }

    let featurecollect = function (json) {
      // a halo generate anigrams, each anigram with its own gjson
      // gjson is of a geojson type supporting properties
      // anigram gjson will be featurecollect and each feature then rendered
      // gjson.properties carries:
      //	ric
      //	sort
      let features = []
      featurize = featurize(json)

      return {type: 'FeatureCollection', features}
    }
   /**********************
   *   		 @deprop
   */
    let deprop = function (json) {
      
      let gj = Object.assign({}, json)
      
      if (gj && gj.properties) {
        delete gj.properties
        return gj
      } else {
        return gj
      }
    }

    /* *********************
   *    @zorder FeatureCollection
   */
    let zorder = function (json) {
      let features = json.features
      let zordered = features
        .map(d => {
          d.properties = d.properties || {}

          if (d.properties.zorder === undefined) { // if zorder undefined
            if (d.geometry && d.geometry.coordinates && d.geometry.coordinates[0]) {
              let outring = d.geometry.coordinates[0] // for out ring
              let zorder = centroid(outring)
              d.properties.zorder = zorder // try centroid.z
            } else {
              d.properties.zorder = -Infinity // feature unformed
            }
          }
          return d
        })
        .sort((a, b) => a.properties.zorder - b.properties.zorder) // z order
        .map((d, i) => { d.properties.nid = i; return d }) // sequential ordinal

      json.features = zordered

      return json
    }

    /**********************
   *    @centroid
   */
    let centroid = function (outring) {
      let z = 0
      let dotsinring = outring.length
      for (let k = 0; k < dotsinring; k++) {
        let ck = outring[k][2] || 0 // z camera view
        z += ck
      }
      return z / dotsinring
    }
    /**********************
   *    @getCoords
   */
    let getCoords = function (json, coords = []) {
      if (json === undefined) {
      } else {
        if (json.type == 'Feature') {
          let geometry = json.geometry
          if (geometry !== null) coords = [...coords, ...getCoords(geometry)]
        } else if (json.type == 'FeatureCollection') {
          for (let feature_num = 0; feature_num < json.features.length; feature_num++) {
            let feature = json.features[feature_num]
            getCoords(feature, coords)
          }
        } else if (json.type == 'GeometryCollection') {
          for (let geom_num = 0; geom_num < json.coords.length; geom_num++) {
            let geometry = json.coords[geom_num]
            coords.push(geometry)
          }
        } else if (json.type === 'Point') {
          let geometry = json
          // coords.push(geometry.coordinates)
          coords = [...coords, geometry.coordinates]  // if Point, return array
        } else if (json.type === 'LineString') {
          let line = json.coordinates
          let _coords = line
          coords = [...coords, ..._coords]
        } else if (json.type === 'MultiPoint') {
          let geometry = json
          coords.push(geometry)
        } else if (json.type === 'Polygon') {
          let rings = json.coordinates
          let _coords = rings.reduce((p, q) => [...p, ...q], [])
          coords = [...coords, ..._coords]
        } else if (json.type === 'MultiLineString') {
          let lines = json.coordinates
          let _coords = lines.reduce((p, q) => [...p, ...q], [])
          coords = [...coords, ..._coords]
        } else if (json.type === 'MultiPolygon') {
          let geometry = json
          coords.push(geometry)
        } else if (json.type === 'Sphere') {
          let geometry = json
          coords.push(geometry)
        } else {
          throw new Error('json type not identified.')
        }
      }

      return coords
    }
    /**********************
   *    @isValid
   */
    let isValid = function (json, type) {

      let valid = true
      if (json === undefined) {
        valid = false
      } else {
        if (json.type == 'Feature') {
          if (json.geometry) {
            valid = isValid(json.geometry)
          }
        } else if (json.type == 'FeatureCollection') {
          for (let i = 0; i < json.features.length; i++) {
            valid = valid && isValid(json.features[i])
          }
        } else if (json.type == 'GeometryCollection') {
            if (json.geometries !== undefined) {
              for (let j = 0; j < json.geometries.length; j++) {
                valid = valid && isValid(json.geometries[j])
              }              
            }
        } else if (json.type === 'Point') {
            let point = json.coordinates
            valid = valid && 
              Array.isArray(point) && 
                point.reduce((p, q) => p && typeof q === 'number', true)
            
        } else if (json.type === 'LineString') {
            let line = json.coordinates
            valid = valid &&
              Array.isArray(line) &&
              line.reduce((p,q) => p && 
                 Array.isArray(q) && q.reduce( (p2,q2) => p2 && typeof q2 === 'number', true), 
                  true)

        } else if (json.type === 'MultiPoint') {
            let points = json.coordinates
            points = valid &&
              points.reduce((p,q) => p && 
                  q.reduce( (p2,q2) => p2 && typeof q2 === 'number', true), 
                  true)    
        
        } else if (json.type === 'Polygon') {
          
            let rings = json.coordinates
              valid = valid &&
                rings.reduce((p,q) => p && 
                  q.reduce((p2,q2) => p2 &&     // ring
                    Array.isArray(q2) && q2.reduce((p3,q3) => p3 &&  // point
                      typeof q3 === 'number' // coord
                      || q3 === undefined,   // _e_ undefined
                    true), 
                  true),
                true)
          
        } else if (json.type === 'MultiLineString') {
            let lines = json.coordinates
              valid = valid &&
                lines.reduce((p,q) => p && 
                  Array.isArray(q) && q.reduce((p2,q2) => p2 &&     // line
                    Array.isArray(q2) && q2.reduce((p3,q3) => p3 &&  // point
                      typeof q3 === 'number',   // coord
                    true), 
                  true),
                true)
          
        } else if (json.type === 'MultiPolygon') {
            let polygons = json.coordinates
              valid = valid &&
                polygons.reduce((p,q) => p && 
                  Array.isArray(q) && q.reduce((p2,q2) => p2 &&       // polygon
                    Array.isArray(q2) && q2.reduce((p3,q3) => p3 &&    // ring
                      Array.isArray(q3) && q3.reduce((p4,q4) => p4 &&  // point
                        typeof q4 === 'number',   // coord
                    true), 
                  true),
                true),
              true)
                
        } else if (json.type == 'Sphere') {
            valid = true
        } else {
          valid = false
          throw new Error('json type not identified.', json)
        }
      }


      return valid
    }    
    /**********************
   *    @enty
   */
    let enty = function () {}

    enty.resample = resample
    enty.trim = trim
    enty.complexify = complexify
    enty.deprop = deprop
    enty.snip = snip
    enty.largestPoly = largestPoly
    enty.lineStringFromStream = lineStringFromStream
    enty.polygonFromStream = polygonFromStream
    enty.multLineStringFromStreamArray = multLineStringFromStreamArray
    enty.featurecollect = featurecollect
    enty.featurize = featurize
    enty.ntime = ntime
    enty.zorder = zorder
    enty.centroid = centroid
    enty.getCoords = getCoords // get coordinates, eg from parent
    enty.isValid = isValid // si valid geojson

    return enty
  }

  exports.muongeoj = muongeoj
}))
