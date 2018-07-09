/***********
 *    @muonGeoj
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonGeoj = global.muonGeoj || {})))
}(this, function (exports) {
  'use strict'

  async function muonGeoj (__mapper = {}) {
    let mprops = await __mapper('xs').m('props')

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

    // ...................... complexifyObjectType
    var complexifyObjectType = {
      Feature: function (object) {
        return complexifyGeometry(object.geometry)
      },
      FeatureCollection: function (object) {
        var features = object.features, i = -1, n = features.length
        let ret = object
        ret.features = features.map(feature => complexifyGeometry(feature.geometry))
        return ret
      }
    }

    var complexifyGeometryType = {
      Sphere: function () {
        // return true;
      },
      Point: function (object) {
        return complexifyPoint(object.coordinates)
      },
      MultiPoint: function (object) {
        var coordinates = object.coordinates.map(coords => complexifyPoint(coords))
        let ret = object
        ret.coordinates = coordinates
        return ret
      },
      LineString: function (object) {
        let ret = object
        ret.coordinates = complexifyLine(object.coordinates)
        return ret
      },
      MultiLineString: function (object) {
        var coordinates = object.coordinates

        let ret = object
        ret.coordinates = coordinates.map(line => complexifyLine(line))
        return ret
      },
      Polygon: function (object) {
        var coordinates = object.coordinates

        let ret = object
        ret.coordinates = coordinates.map(line => complexifyLine(line))
        return ret
      },
      MultiPolygon: function (object) {
        var polygons = object.coordinates.map(
          polygon => polygon.map(
            ring => complexifyLine(ring)))

        let ret = object
        ret.coordinates = polygons
        return ret
      },
      GeometryCollection: function (object) {
        var geometries = object.geometries.map(
          geometry => complexifyGeometry(geometry))
        return geometries
      }
    }

    function complexifyGeometry (geometry) {
      return geometry && complexifyGeometryType.hasOwnProperty(geometry.type)
        ? complexifyGeometryType[geometry.type](geometry)
        : false
    }

    function complexify (object) {
      return (object && complexifyObjectType.hasOwnProperty(object.type)
        ? complexifyObjectType[object.type]
        : complexifyGeometry)(object)
    }

    function complexifyPoint (coordinates) {
      return Complex(coordinates[0], coordinates[1])
    }

    function complexifyLine (coordinates) {
      let ret = coordinates.map(coords => complexifyPoint(coords))
      return ret
    }

    // ...................... trim
    let trim = function (gj) {
      let ret = {}

      if (gj.type === 'FeatureCollection') {
        ret.type = 'FeatureCollection'
        ret.features = []

        for (let i = 0; i < gj.features.length; i++) {
          let newFeature = {}
          let feature = gj.features[i]

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
      } else if (gj.type === 'MultiLineString') {
        ret = gj
      } else {
        ret = gj
      }

      return ret
    }

    // ...................... snip
    let snip = function (form) {
      let dims = __mapper('xs').m('anitem').dims()
      let braids = []
      return function (gj) {
        let c = gj.coordinates
        for (let i = 0; i < c.length; i++) {
          let braid = mprops.unslide(c[i])

          for (let j = 0; j < braid.length; j++) {
            let pa6 = (form[dims[j]] || {}).pa6
            let pb7 = (form[dims[j]] || {}).pb7

            braids[j] = mprops.streamRange(braid[j], pa6, pb7)
          }
          let coordinates = mprops.slide(braids) // join dim threads
          gj.coordinates = Array.of(coordinates)
        }

        return gj
      }
    }

    // ...................... largestPoly
    let largestPoly = function largestPoly (gj) {
      let size = -Number.MAX_VALUE,
        poly = null

      for (let c = 0; c < gj.length; c++) {
        let tsize = (gj.type === 'MultiPolygon') ? d3.polygonArea(gj[c][0]) : d3.polygonArea(gj[c])

        if (tsize > size) {
          size = tsize
          poly = c
        }
      }

      return [gj.type === 'MultiPolygon' ? gj[poly][0] : gj[poly]]
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

    // ...................... ntime
    let ntime = function (gj, interval = [0, 1]) {
      let tfeatures = []
      if (gj.type == 'Feature') {
        let geometry = gj.geometry
        if (geometry !== null) coords = [...coords, ...getCoords(geometry)]
      } else if (gj.type == 'FeatureCollection') {
        for (let feature_num = 0; feature_num < gj.features.length; feature_num++) {
          let feature = gj.features[feature_num]
          getCoords(feature, coords)
        }
      } else if (gj.type == 'GeometryCollection') {
        for (let geom_num = 0; geom_num < gj.coords.length; geom_num++) {
          let geometry = gj.coords[geom_num]
          coords.push(geometry)
        }
      } else if (gj.type === 'Point') {
        let geometry = gj
        coords = [...coords, geometry.coordinates] // if Point, return array
      } else if (gj.type === 'LineString') {
        let tfeature = {
          type: 'Feature',
          geometry: {type: 'LineString', coordinates: gj.coordinates},
          properties: {interval: interval}
        }
        tfeatures.push(tfeature)
      } else if (gj.type === 'MultiPoint') {
        let geometry = gj
        coords.push(geometry)
      } else if (gj.type === 'Polygon') {
        let rings = gj.coordinates
        for (let i = 0; i < rings.length; i++) {
          let line = rings[i]

          let tfeature = {
            type: 'Feature',
            geometry: {type: 'LineString', coordinates: line},
            properties: {interval: interval}
          }
          tfeatures.push(tfeature)
        }
      } else if (gj.type === 'MultiLineString') {
        let lines = gj.coordinates
        for (let i = 0; i < lines.length; i++) {
          let line = lines[i]

          let tfeature = {
            type: 'Feature',
            geometry: {type: 'LineString', coordinates: line},
            properties: {interval: interval}
          }
          tfeatures.push(tfeature)
        }
      } else if (gj.type === 'MultiPolygon') {
        let polygons = gj.coordinates
        for (let i = 0; i < polygons.length; i++) {
          let polygon = polygons[i]

          let tfeature = {
            type: 'Feature',
            // geometry: {type: 'Polygon',coordinates: polygon},
            geometry: {type: 'LineString', coordinates: polygon[0]},
            properties: {interval: interval}
          }
          tfeatures.push(tfeature)
        }
      } else if (gj.type === 'Sphere') {
        let geometry = gj
        coords.push(geometry)
      } else {
        throw new Error('gj type not identified.')
      }

      return tfeatures
    }

    // ...................... featurize
    let featurize = function (gj_, features=[]) {

      return Promise.resolve(gj_)
        .then(gj => {
          let type = gj.type
          if (type === 'Feature') {
            features = Array.of(gj)
          } else if (type === 'FeatureCollection') {
            features = gj.features
          } else if (type === 'GeometryCollection') {
            features = gj.map(d => ({
              type: 'Feature',
              geometry: {
                type: d.type,
                coordinates: d.coordinates},
              properties: {}}))
          } else {
            features = Array.of({
              type: 'Feature',
              geometry: {
                type: gj.type,
                coordinates: gj.coordinates},
              properties: {geonode: {}}})
          }
          return features
        })
        
        
      // let features = []
      // if (gj && gj.type) {
        // let type = gj.type

        // if (type === 'Feature') {
          // features = Array.of(gj)
        // } else if (type === 'FeatureCollection') {
          // features = gj.features
        // } else if (type === 'GeometryCollection') {
          // features = gj.map(d => ({
            // type: 'Feature',
            // geometry: {
              // type: d.type,
              // coordinates: d.coordinates},
            // properties: {}}))
        // } else {
          // features = Array.of({
            // type: 'Feature',
            // geometry: {
              // type: gj.type,
              // coordinates: gj.coordinates},
            // properties: {geonode: {}}})
        // }
      // } else {
        // console.log('m.geoj.featurize not supported geojson ', gj)
      // }

      // return features
    }

    // ...................... featurecollect
    // let featurecollect = gj => ({type: 'FeatureCollection', features: featurize(gj)})
    async function featurecollect(gj) {
      
      let features = await featurize(gj)
      return ({type: 'FeatureCollection', features: features})    
    }

    // ...................... deprop
    let deprop = function (gj) {
      let gj2 = Object.assign({}, gj)

      if (gj2 && gj2.properties) {
        delete gj2.properties
        return gj2
      } else {
        return gj2
      }
    }

    // ...................... zorder
    let zorder = function (gj) {
      if (2 && 2 && !isValid(gj)) { console.log('** m.geoj.zorder:gj not valid', gj) }

      let features = []
      if (gj.type === 'FeatureCollection') features = gj.features
      else {
        if (2 && 2) console.log('** gj is not FeatureCollection')
        return gj
      }

      let zordered = features
        .map(d => {
          d.properties = d.properties || {}
          if (d.properties.zorder === undefined) { // if zorder undefined
            if (d.geometry && d.geometry.coordinates && d.geometry.coordinates.length > 0) {
              if (d.geometry.type === 'Polygon') {
                let outring = d.geometry.coordinates[0] // for out ring
                let zorder = centroid(outring)
                if (zorder) d.properties.zorder = zorder // try centroid.z
                else d.properties.zorder = -Infinity // feature unformed
              } else if (d.geometry.type === 'LineString') {
                let outring = d.geometry.coordinates // string
                let zorder = centroid(outring)
                if (zorder) d.properties.zorder = zorder // try centroid.z
                else d.properties.zorder = -Infinity // feature unformed
              }
            } else {
              d.properties.zorder = -Infinity // feature unformed
            }
          }
          return d
        })
        .sort((a, b) => a.properties.zorder - b.properties.zorder) // z order
        .map((d, i) => { d.properties.nid = i; return d }) // sequential ordinal

      gj.features = zordered

      return gj
    }

    // ...................... centroid
    let centroid = function (outring) {
      let z = 0
      let dotsinring = outring.length

      for (let k = 0; k < dotsinring; k++) {
        let ck = outring[k][2] || 0 // z camera view
        z += ck
      }
      return z / dotsinring
    }

    // ...................... getCoords
    let getCoords = function (gj, coords = []) {
      if (gj === undefined) {
      } else {
        if (gj.type == 'Feature') {
          let geometry = gj.geometry
          if (geometry !== null) coords = [...coords, ...getCoords(geometry)]
        } else if (gj.type == 'FeatureCollection') {
          for (let feature_num = 0; feature_num < gj.features.length; feature_num++) {
            let feature = gj.features[feature_num]
            getCoords(feature, coords)
          }
        } else if (gj.type == 'GeometryCollection') {
          for (let geom_num = 0; geom_num < gj.coords.length; geom_num++) {
            let geometry = gj.coords[geom_num]
            coords.push(geometry)
          }
        } else if (gj.type === 'Point') {
          let geometry = gj
          coords = [...coords, geometry.coordinates] // if Point, return array
        } else if (gj.type === 'LineString') {
          let line = gj.coordinates
          let _coords = line
          coords = [...coords, ..._coords]
        } else if (gj.type === 'MultiPoint') {
          let geometry = gj
          coords.push(geometry)
        } else if (gj.type === 'Polygon') {
          let rings = gj.coordinates
          let _coords = rings.reduce((p, q) => [...p, ...q], [])
          coords = [...coords, ..._coords]
        } else if (gj.type === 'MultiLineString') {
          let lines = gj.coordinates
          let _coords = lines.reduce((p, q) => [...p, ...q], [])
          coords = [...coords, ..._coords]
        } else if (gj.type === 'MultiPolygon') {
          let geometry = gj
          coords.push(geometry)
        } else if (gj.type === 'Sphere') {
          let geometry = gj
          coords.push(geometry)
        } else {
          throw new Error('gj type not identified.')
        }
      }

      return coords
    }

    // ...................... getCoordsLength
    let getCoordsLength = gj => getCoords(gj).length

    // ...................... getCoordsInRange
    let getCoordsInRange = function (gj, nb) {
      let ngj = {}

      if (gj.type === 'Polygon') {
        ngj = {type: gj.type, coordinates: [] }
        let n = 0
        for (let i = 0; i < gj.coordinates.length; i++) { // rings
          let ring = gj.coordinates[i]
          let ringLength = ring.length

          if (n + ringLength < nb) { // if ring in scope
            ngj.coordinates.push(ring)
            n += ringLength
          } else {
            let tmpring = ring.slice(0, nb - n)
            ngj.coordinates.push(tmpring)
            n += (nb - n)

            break
          }
        }
      } else if ((gj.type === 'MultiLineString')) {
        ngj = { type: gj.type, coordinates: [] }
        let n = 0
        for (let i = 0; i < gj.coordinates.length; i++) { // rings
          let line = gj.coordinates[i]
          let ringLength = line.length

          if (n + ringLength < nb) { // if line in scope
            ngj.coordinates.push(line)
            n += ringLength
          } else {
            let tmpring = line.slice(0, nb - n)
            ngj.coordinates.push(tmpring)
            n += (nb - n)

            break
          }
        }
      } else if ((gj.type === 'MultiPoint')) {
        ngj = { type: 'MultiPoint', coordinates: [] }
        ngj.coordinates = gj.coordinates.slice(0, nb)
      } else if ((gj.type === 'LineString')) {
        ngj = { type: gj.type, coordinates: [] }
        ngj.coordinates = gj.coordinates.slice(0, nb)
      } else if ((gj.type === 'Feature')) {
        ngj = { type: gj.type, geometry: {}}
        ngj.geometry = getCoordsInRange(gj.geometry, nb)
      }

      return ngj
    }

    // ............................. isValid
    let isValid = function (gj, type) {
      let valid = true
      if (gj === undefined) {
        valid = false
      } else {
        if (gj.type == 'Feature') {
          if (gj.geometry) {
            valid = isValid(gj.geometry)
          }
        } else if (gj.type == 'FeatureCollection') {
          for (let i = 0; i < gj.features.length; i++) {
            valid = valid && isValid(gj.features[i])
          }
        } else if (gj.type == 'GeometryCollection') {
          if (gj.geometries !== undefined) {
            for (let j = 0; j < gj.geometries.length; j++) {
              valid = valid && isValid(gj.geometries[j])
            }
          }
        } else if (gj.type === 'Point') {
          let point = gj.coordinates
          valid = valid &&
              Array.isArray(point) &&
                point.reduce((p, q) => p && typeof (q === 'number' || q === undefined), true)
        } else if (gj.type === 'LineString') {
          let line = gj.coordinates
          valid = valid &&
              Array.isArray(line) &&
              line.reduce((p, q) => p &&
                 q.reduce((p2, q2) => p2 && typeof (q2 === 'number' || q2 === undefined), true),
              true)
        } else if (gj.type === 'MultiPoint') {
          let points = gj.coordinates
          points = valid &&
              points.reduce((p, q) => p &&
                  q.reduce((p2, q2) => p2 && typeof (q2 === 'number' || q2 === undefined), true),
              true)
        } else if (gj.type === 'Polygon') {
          let rings = gj.coordinates
          valid = valid &&
                rings.reduce((p, q) => p &&
                  q.reduce((p2, q2) => p2 && // ring
                    Array.isArray(q2) && q2.reduce((p3, q3) => p3 && // point
                      typeof (q3 === 'number' || q3 === undefined) // coord
                    ,
                  true),
                  true),
                true)
        } else if (gj.type === 'MultiLineString') {
          let lines = gj.coordinates
          valid = valid &&
                lines.reduce((p, q) => p &&
                  Array.isArray(q) && q.reduce((p2, q2) => p2 && // line
                    Array.isArray(q2) && q2.reduce((p3, q3) => p3 && // point
                      typeof (q3 === 'number' || q3 === undefined), // coord
                true),
                true),
                true)
        } else if (gj.type === 'MultiPolygon') {
          let polygons = gj.coordinates
          valid = valid &&
                polygons.reduce((p, q) => p &&
                  Array.isArray(q) && q.reduce((p2, q2) => p2 && // polygon
                    Array.isArray(q2) && q2.reduce((p3, q3) => p3 && // ring
                      Array.isArray(q3) && q3.reduce((p4, q4) => p4 && // point
                        typeof (q4 === 'number' || q4 === undefined), // coord
                true),
                true),
                true),
                true)
        } else if (gj.type == 'Sphere') {
          valid = true
        } else {
          valid = false
          throw new Error('gj type not identified.', gj)
        }
      }

      return valid
    }

    // ............................. tclip
    let tclip = function (gj, t = 1, interval = [0, 1]) {
      let ret = gj

      let t0 = interval[0],
        t1 = interval[1],
        period = t1 - t0,
        tInPeriod = (t - t0) / period

      if (t < interval[0] || t > interval[1]) {
        ret = [] // return empty set
      } else if (tInPeriod === 1) { // return geojson
      } else if (gj.type && gj.type === 'Point') {
        ret = gj // in period
      } else if (gj.type && gj.type === 'MultiPoint') {
      } else if (gj.type && gj.type === 'LineString') {
      } else if (gj.type && gj.type === 'MultiLineString') {
      } else if (gj.type && gj.type === 'Polygon') {
        let ngj = { type: 'Polygon', coordinates: [] } // return polygon

        let rings = gj.coordinates // coords is rings array
        let tnb = rings.reduce((p, q) => p += q.length, 0)
        let nb = Math.floor(tnb * tInPeriod)

        let outrings = []
        let n = 0
        for (let i = 0; i < rings.length; i++) {
          let ring = rings[i]
          let ringLength = ring.length

          if (n + ringLength < nb) { // if ring in scope
            ngj.coordinates.push(ring)
            n += ringLength
          } else { // complement with part of next ring
            let tmpring = ring.slice(0, nb - n)
            ngj.coordinates.push(tmpring)
            n += (nb - n)
            break
          }
        }

        ret = ngj
      } else if (gj.type && gj.type === 'MultiPolygon') {
      } else if (gj.type && gj.type === 'GeometryCollection') {
      } else if (gj.type && gj.type === 'Feature') {

      } else if (gj.type && gj.type === 'FeatureCollection') {
      }

      return ret
    }

    // ............................. enty
    let enty = function () {}

    enty.trim = trim
    enty.tclip = tclip
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

  exports.muonGeoj = muonGeoj
}))
