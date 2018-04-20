/***********
 *    @muongeoj
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muongeoj = global.muongeoj || {})))
}(this, function (exports) {
  'use strict'

  let muongeoj = function muongeoj (__mapper = {}) {
    let f = __mapper('props')()

    //md: ## mgeoj
    //md:   gj streams
    //md:   refs:
    //md:   https://bl.ocks.org/maartenzam/ec11de22bc8e5608a98f207f1c09bdb6
    //md:   https://github.com/mapbox/geojson-normalize/blob/master/index.js

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

     //md: ### mgeoj.complexify convert geometry coordinates to complex numbers
     //md:  @gj
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


    //md: ### meoj.trim flatten gj
    //md:  ref: https://bl.ocks.org/maartenzam/ec11de22bc8e5608a98f207f1c09bdb6
    let trim = function (json) {
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

          for (let j = 0; j < feature.geometry.coordinates.length; j++) {
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

    //md: ### meoj.snip return function to get dots within form range [pa6,pb7]
    //md:   @form
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

    //md: ## mgeoj.largestPoly  return the lagest polity on gj
    //md:  @gj: MultiPolygon
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

  //md: ## mgeoj.ntime  convert geometry to feature and add interval to properties
  //md:   json
  //md:   interval
  let ntime = function(json, interval = [0,1]) {

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
  //md:     transform to array of gj.Features
  //md:     @json  {gj.FeatureCollection, gj.Feature, gj.GeometryCollection}
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

   //md: ## mgeoj.featurecollect
  //md:     transform to FeatureCollection
  //md:     @json  {gj.FeatureCollection, gj.Feature, gj.GeometryCollection}
  //md:     called by halo to carry ric, sort as properties
    let featurecollect = json => ({type: 'FeatureCollection', features: featurize(json)})


   //md: ## mgeoj.deprop  reomove properties from gj object
    let deprop = function (json) {

      let gj = Object.assign({}, json)

      if (gj && gj.properties) {
        delete gj.properties
        return gj
      } else {
        return gj
      }
    }

   //md: ## mgeoj.zorder
   //md: @json FeatureCollection
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

   //md: ## mgeoj.centroid   get ring's centroid
   //md:    @ring
   //md:    called by zorder
    let centroid = function (outring) {
      let z = 0
      let dotsinring = outring.length
      for (let k = 0; k < dotsinring; k++) {
        let ck = outring[k][2] || 0 // z camera view
        z += ck
      }
      return z / dotsinring
    }


   //md: ## mgeoj.getCoords
   //md:    get array of coordinates from gj (eg. parent anigram)
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


   //md: ## mgeoj.getCoordsLength
   //md:    get number of coordinates in gj
    let getCoordsLength = gj => getCoords(gj).length

    

   //md: ## mgeoj.getCoordsInRange
   //md:    get first nb coordinates
    let getCoordsInRange = function(json, nb) {
      
      let ngj = {}
      
      if (json.type === 'Polygon') {
        ngj = {
          type: 'Feature', geometry: { type: 'Polygon', coordinates: [] },
          properties: {},
        }
        let n = 0
        for (let i=0; i<json.geometry.coordinates.length; i++) {  // rings
          let ring = json.geometry.coordinates[i]
          let ringLength = ring.length

          if (n + ringLength < nb) {    // if ring in scope
              ngj.geometry.coordinates.push(ring)
              n += ringLength
             
              
          } else {
              let tmpring = ring.slice(0, nb-n)
              ngj.geometry.coordinates.push(tmpring)
              n += (nb-n)
             
              break
          }

        }       
        
      } else if ((json.type === 'MultiPoint')) {
        
        ngj = { type: 'MultiPoint', coordinates: [],  }
        ngj.coordinates = json.coordinates.slice(0, nb)
             
        
      } else if ((json.type === 'LineString')) {
        
        ngj = { type: 'LineString', coordinates: [],  }
        ngj.coordinates = json.coordinates.slice(0, nb)
             
        
      } else if ((json.type === 'Feature')) {
        
        ngj = { type:'Feature', geometry: {}}
        ngj.geometry = getCoordsInRange(json.geometry, nb)
        
      }

      return ngj
      
      
    }

    
    

   //md: ## mgeoj.isValid   check if gj is valid geojson type
   //md:    @json
   //md:    @type
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
                      // || q3 === undefined // _e_ undefined
                      ,
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
    enty.getCoords = getCoords
    enty.getCoordsLength = getCoordsLength
    enty.getCoordsInRange = getCoordsInRange
    enty.isValid = isValid

    return enty
  }

  exports.muongeoj = muongeoj
}))
