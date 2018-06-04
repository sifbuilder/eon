
/***********
 *    @muonVoro
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonVoro = global.muonVoro || {})))
}(this, function (exports) {
  'use strict'

  // (c) 2016 Philippe Riviere
  //
  // https://github.com/Fil/
  // https://bl.ocks.org/Fil/955da86d6a935b26d3599ca5e344fb38
  //
  // This software is distributed under the terms of the MIT License
  // ref: https://visionscarto.net/the-state-of-d3-voronoi


  let x = function (d) {
    if (typeof d === 'object' && 'type' in d) {
      return d3.geoCentroid(d)[0]
    }
    if (0 in d) return d[0]
  }
  let y = function (d) {
    if (typeof d === 'object' && 'type' in d) {
      return d3.geoCentroid(d)[1]
    }
    if (0 in d) return d[1]
  }

  var muonVoro = function muonVoro (__mapper = {}) {
    let f = __mapper('xs').m('props')

    let voronoi = d3.voronoi
    let FindDelaunayTriangulation = __mapper('pluginDelaunay').FindDelaunayTriangulation

    var enty = function () {}			// enty

    enty.data = function (data) {
      enty._hull = enty._polygons = enty._links = enty._triangles = null

      if (typeof data === 'object' && data.type == 'FeatureCollection') {
        data = data.features
      }
      let sites = data.map(function (site, i) {
        site.index = i
        return site
      })
      let pos = data.map(function (site) {
        return [x(site), y(site)]
      })
      enty.pos = pos
      enty.sites = sites
      enty.DelaunayTriang = FindDelaunayTriangulation(pos.map(f.cartesian))

      return enty
    }

    enty.links = function (s) {
      if (s) enty(s)
      if (enty._links) return enty._links

      var _index = map()

      var features = DelaunayTriang.edges.map(function (i, n) {
        _index.set(extent(i.verts), n)

        var properties = {
          source: enty.sites[i.verts[0]],
          target: enty.sites[i.verts[1]],
          urquhart: true, // will be changed to false later
          length: geoDistance(pos[i.verts[0]], pos[i.verts[1]])
        }

        // add left and right sites (?)

        // make geojson
        return {
          type: 'LineString',
          coordinates: [ spherical(DelaunayTriang.positions[i.verts[0]]), spherical(DelaunayTriang.positions[i.verts[1]]) ],
          properties: properties
        }
      })

      // Urquhart Graph? tag longer link from each triangle
      DelaunayTriang.triangles.forEach(function (t) {
        var l = 0,
          length = 0,
          remove, v
        for (var j = 0; j < 3; j++) {
          v = extent([t.verts[j], t.verts[(j + 1) % 3]])
          var n = _index.get(v)
          length = features[n].properties.length
          if (length > l) {
            l = length
            remove = n
          }
        }
        features[remove].properties.urquhart = false
      })

      return enty._links = {
        type: 'FeatureCollection',
        features: features
      }
    }

    enty.triangles = function (s) {
      if (s) enty.data(s)
      if (enty._triangles) return enty._triangles

      var features = enty.DelaunayTriang.triangles
        .map(function (t) {
          t.spherical = t.verts.map(function (v) {
            return enty.DelaunayTriang.positions[v]
          })
            .map(f.spherical)

          // correct winding order
          if (t.ccdsq < 0) {
            t.spherical = t.spherical.reverse()
            t.ccdsq *= -1
          }

          return t
        })

        // make geojson
        .map(function (t) {
          return {
            type: 'Polygon',
            coordinates: [t.spherical.concat([ t.spherical[0] ]) ],
            properties: {
              sites: t.verts.map(function (i) {
                return enty.sites[i]
              }),
              area: t.vol, // steradians
              circumcenter: f.spherical(t.ccdir)
              // ccdsq is *not* the geodesic distance
              /* circumradius: (2-t.ccdsq) * 53 */
            }
          }
        })

      return enty._triangles = {
        type: 'FeatureCollection',
        features: features
      }
    }

    enty.polygons = function (s) {
      if (s) enty(s)
      if (enty._polygons) return enty._polygons

      var features = DelaunayTriang.indices.map(function (i, n) {
        var geojson = {}
        var vor_poly = DelaunayTriang.vor_polygons[DelaunayTriang.indices[i]]

        if (vor_poly == undefined) {
          geojson.type = 'Sphere'
        } else {
          var line = mapline(DelaunayTriang.vor_positions,
            vor_poly.boundary.concat([ vor_poly.boundary[0] ])
          )

          // correct winding order
          var b = {
            type: 'Polygon',
            coordinates: [[ pos[i], line[0], line[1], pos[i] ]]
          }
          if (geoArea(b) > 2 * Math.PI + 1e-10) {
            line = d3.line.reverse()
          }

          geojson.type = 'Polygon'
          geojson.coordinates = [ line ]
        }

        geojson.properties = {
          site: enty.sites[i],
          sitecoordinates: pos[i],
          neighbours: vor_poly.edges.map(function (e) {
            return e.verts.filter(function (j) {
              return j !== i
            })[0]
          })
        }
        return geojson
      })

      return enty._polygons = {
        type: 'FeatureCollection',
        features: features
      }
    }

    enty.hull = function (s) {
      if (s) enty(s)
      if (enty._hull) return enty._hull

      if (!DelaunayTriang.hull.length) {
        return null // What is a null geojson?
      }

      // seems that DelaunayTriang.hull is always clockwise
      var hull = DelaunayTriang.hull.reverse()

      // make geojson
      return enty._hull = {
        type: 'Polygon',
        coordinates: [ hull.concat([ hull[0] ]).map(function (i) {
          return pos[i]
        }) ],
        properties: {
          sites: hull.map(function (i) {
            return enty.sites[i]
          })
        }
      }
    }

    enty.x = function (f) {
      if (!f) return x
      x = f
      return enty
    }
    enty.y = function (f) {
      if (!f) return y
      y = f
      return enty
    }
    enty.extent = function (f) {
      if (!f) return null
      return enty
    }
    enty.size = function (f) {
      if (!f) return null
      return enty
    }

    return enty
  }

  exports.muonVoro = muonVoro
}))
