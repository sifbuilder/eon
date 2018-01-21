/***************************
 *        @muonProj3ct
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonProj3ct = global.muonProj3ct || {})))
}(this, function (exports) {
  'use strict'

  // https://d3js.org/d3-geo-projection/ V
  // Copyright 2017 Mike Bostock.

  var muonProj3ct = function (__mapper = {}) {
    let f = __mapper('props')()
    let noop = function () {}
    let d3Geo = d3

    var clockwise = function (ring) {
      if ((n = ring.length) < 4) return false
      var i = 0,
        n,
        area = ring[n - 1][1] * ring[0][0] - ring[n - 1][0] * ring[0][1]
      while (++i < n) area += ring[i - 1][1] * ring[i][0] - ring[i - 1][0] * ring[i][1]
      return area <= 0
    }

    var contains = function (ring, point) {
      var x = point[0],
        y = point[1],
        contains = false
      for (var i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
        var pi = ring[i], xi = pi[0], yi = pi[1],
          pj = ring[j], xj = pj[0], yj = pj[1]
        if (((yi > y) ^ (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) contains = !contains
      }
      return contains
    }

    var project = function (object, projection) {		// index
      var stream = projection.stream, project
      if (!stream) throw new Error('invalid projection')
      switch (object && object.type) {
        case 'Feature': project = projectFeature; break
        case 'FeatureCollection': project = projectFeatureCollection; break
        default: project = projectGeometry; break
      }
      return project(object, stream)
    }

    function projectFeatureCollection (o, stream) {
      return {
        type: 'FeatureCollection',
        features: o.features.map(function (f) {
          return projectFeature(f, stream)
        })
      }
    }

    function projectFeature (o, stream) {
			if (0 && 1) console.log("m.proj3ct.projectFeature enter")
			let geometry = projectGeometry(o.geometry, stream)
			if (0 && 1) console.log("m.proj3ct.projectFeature exit")
			let ret = {
        type: 'Feature',
        id: o.id,
        properties: o.properties,
        geometry: geometry
      }
      return ret
    }

    function projectGeometryCollection (o, stream) {
      return {
        type: 'GeometryCollection',
        geometries: o.geometries.map(function (o) {
          return projectGeometry(o, stream)
        })
      }
    }

    function projectGeometry (o, stream) {
			if (0 && 1) console.log("m.proj3ct.projectGeometry enter", o.type)			
      if (!o) return null
      if (o.type === 'GeometryCollection') return projectGeometryCollection(o, stream)
      var sink
      switch (o.type) {
        case 'Point': sink = sinkPoint; break
        case 'MultiPoint': sink = sinkPoint; break
        case 'LineString': sink = sinkLine; break
        case 'MultiLineString': sink = sinkLine; break
        case 'Polygon': sink = sinkPolygon; break
        case 'MultiPolygon': sink = sinkPolygon; break
        case 'Sphere': sink = sinkPolygon; break
        default: return null
      }
			
			
			
			if (0 && 1) console.log("m.proj3ct.projectGeometry second", o)					
			let streamSink = 	stream(sink)
			if (0 && 1) console.log(" <<< m.proj3ct.projectGeometry sec b", streamSink)					
				
      d3Geo.geoStream(o, streamSink)
      // return sink.resul	t()
			if (0 && 1) console.log(">>> m.proj3ct.projectGeometry between")	

				
      let ret = sink.result()
			if (0 && 1) console.log("m.proj3ct.projectGeometry exit")			
      return ret
    }

    var points = []
    var lines = []

    var sinkPoint = {
      point: function (x, y, z) {
        points.push([x, y, z])		// ____ z ____
      },
      result: function () {
        var result = !points.length ? null
          : points.length < 2 ? {type: 'Point', coordinates: points[0]}
            : {type: 'MultiPoint', coordinates: points}
        points = []
        return result
      }
    }

    var sinkLine = {
      lineStart: noop,
      point: function (x, y, z) {
        points.push([x, y, z])		// ____ z ____
      },
      lineEnd: function () {
        if (points.length) lines.push(points), points = []
      },
      result: function () {
			if (0 && 1) console.log("m.proj3ct.sinkLine enter")			
				
        var result = !lines.length ? null
          : lines.length < 2 ? {type: 'LineString', coordinates: lines[0]}
            : {type: 'MultiLineString', coordinates: lines}
        lines = []
			if (0 && 1) console.log("m.proj3ct.sinkLine exit")			
				
        return result
      }
    }

    var sinkPolygon = {
      polygonStart: noop,
      lineStart: noop,
      point: function (x, y, z) {
        points.push([x, y, z])		// z
      },
      lineEnd: function () {
        var n = points.length
        if (n) {
          do points.push(points[0].slice()); while (++n < 4)
          lines.push(points), points = []
        }
      },
      polygonEnd: noop,
      result: function () {
        if (!lines.length) return null
        var polygons = [],
          holes = []

        // https://github.com/d3/d3/issues/1558
        lines.forEach(function (ring) {
          if (clockwise(ring)) polygons.push([ring])
          else holes.push(ring)
        })

        holes.forEach(function (hole) {
          var point = hole[0]
          polygons.some(function (polygon) {
            if (contains(polygon[0], point)) {
              polygon.push(hole)
              return true
            }
          }) || polygons.push([hole])
        })

        lines = []

        return !polygons.length ? null
          : polygons.length > 1 ? {type: 'MultiPolygon', coordinates: polygons}
            : {type: 'Polygon', coordinates: polygons[0]}
      }
    }

    /***************************
 *        @enty
 */
    let enty = (object, projection) => project(object, projection)

    return enty
  }

  exports.muonProj3ct = muonProj3ct
}))
