/*******************************************
 *      @geoMyriad
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.geoMyriad = global.geoMyriad || {})))
}(this, function (exports) {
  'use strict'

  // Philippe Rivière’s Block 14ddff5e46b6fe9341dae91c3c83304b
  // Updated August 6, 2017
  // Furuti cubic projection #Carlos Furuti's cubic globe #1 - http://www.progonos.com/furuti/MapProj/Normal/ProjPoly/projPoly2.html
  // Based on "Earth in a Cube" by Enrico Spinielli and on my research for d3-geo-projection/pull/86 and d3-geo/issues/46.
  // Re-incorporating Jason Davies’ clipPolygon() code into d3v4.
  // Code base at Fil/d3-geo:clip-polygon.
  // See also https://bl.ocks.org/Fil/694ba0d0bc1fc4c24eb257dc210eb01a
  // forked from Fil's block: Furuti 3 - projection.clipPolygon()
  // LICENSE# Released under the The MIT License.

  let geoMyriad = function geoMyriad (__mapper = {}) {
    let mkruskal = __mapper('xs').m('kruskal')

    let renderport = __mapper('renderRenderport'),
      width = renderport.width(),
      height = renderport.height(),
      scaleProj = Math.min(width / 2, height) / Math.PI

    let epsilon = 1e-6, epsilon2 = epsilon * epsilon
    let asin = Math.asin, atan = Math.atan
    let pi = Math.PI, degrees = 180 / pi, radians = pi / 180
    let asin1_3 = Math.asin(1 / 3)
    let sqrt1_2 = Math.SQRT1_2
    let abs = Math.abs
    let eps = 1e-6

    function spherical (cartesian) {
      return [
        Math.atan2(cartesian[1], cartesian[0]),
        Math.asin(Math.max(-1, Math.min(1, cartesian[2]))),
      ]
    }

    function to_degrees (v) {
      return v.map(d => d * degrees)
    }

    function normalize (a) {
      let d = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2])
      return a.map(e => e / d)
    }

    let d3Geo = d3
    /*******************************************
 *      @state
 */
    let state = {}
    state.futuryCef1 = Math.PI / 4
    state.tree = [-1, 4, 5, 2, 0, 1] // [-1, 0, 0, 0, 0, 4] //
    state.rotate = [28, -4, 0]

    let enxs = function (obj, objs, objidx = 0) {
      if (obj !== undefined) { // if projection singular
        return obj.map(d => Math.round(d))
      } else if (objs !== undefined) { // if plural select one
        let idx = (objidx !== undefined) ? Math.round(objidx) : 0
        return objs[idx].map(d => Math.round(d))
      } else if (state[obj] !== undefined) {
        return state[obj].map(d => Math.round(d))
      } else {
        return undefined
      }
    }
    /*******************************************
 *      @prtRaw
 */
    let prtRaw = d3.geoGnomonicRaw

    /*******************************************
 *      @polyhedron
 */

    // --------------------------
    let g = (1 + Math.sqrt(5)) / 2
    let vertices = [
      [0, 1, g],
      [g, 0, 1],
      [1, g, 0],
    ]
    vertices = d3.merge([
      vertices,
      vertices.map(d => d.map(e => e * (e == 1 ? -1 : 1))),
      vertices.map(d => d.map(e => e * (e > 1 ? -1 : 1))),
      vertices.map(d => d.map(e => e * (e > 0 ? -1 : 1))),
    ])
      .map(normalize)
      .map(spherical)
      .map(to_degrees)

    let cornerpoints = {
      type: 'FeatureCollection',
      features: vertices.map(function (f, i) {
        return {
          type: 'Point',
          index: i,
          coordinates: f,
        }
      }),
    }

    let voro = d3.geoVoronoi()(cornerpoints)
    let polyhedron = voro.polygons().features.map(d => d.geometry.coordinates[0])
    let links = voro.links().features.map(d => d.properties)// .filter(d => d.urquhart)

    links.forEach(l => { // prefer certain links
      let u = d3.extent([l.source.index, l.target.index]).join('-')
      l.length = 1 - 0.5 * (['0-1', '1-4', '1-8', '2-4', '2-5', '3-7', '3-8', '6-10', '8-9'].indexOf(u) > -1)
    })

    let k = {
      type: 'FeatureCollection',
      features: mkruskal(links).map(l => ({
        type: 'LineString',
        coordinates: [l.source.coordinates, l.target.coordinates],
        properties: l,
      })),
    }

    let tree0 = [-1]
    let search = polyhedron.length - 1
    do {
      k.features.forEach(l => {
        let s = l.properties.source.index,
          t = l.properties.target.index
        if (tree0[s] !== undefined && tree0[t] === undefined) {
          tree0[t] = s
          search--
        } else if (tree0[t] !== undefined && tree0[s] === undefined) {
          tree0[s] = t
          search--
        }
      })
    } while (search > 0)

    // tree0 = [-1, 0, 4, 8, 1, 2, 2, 3, 1, 8, 6, 3]

    /*******************************************
 *      @enty
 */
    let enty = function (proform = {}) {
      let futuryCef1 = (proform.futuryCef1 !== undefined) ? proform.futuryCef1 : state.futuryCef1
      let facerotation = (72 * 1.5) * radians
      let {trees, treeidx, tree} = proform //
      tree = enxs(tree, trees, treeidx) || tree0

      let faceProjection = function (face) {
        let geo = d3Geo.geoProjection(prtRaw)
        let c = d3Geo.geoCentroid({type: 'MultiPoint', coordinates: face})
        let rotate = [-c[0], -c[1], 0]
        let translate = [0, 0]
        let scale = 1 // convention
        return geo.scale(scale).translate(translate).rotate(rotate)
      }

      let faces = polyhedron.map(function (face) {
        let polygon = face.slice()
        face = face.slice(0, -1) // ?
        return {
          face: face,
          contains: function (lambda, phi) {
            return d3Geo.geoContains({ type: 'Polygon', coordinates: [ polygon ] },
              [lambda * degrees, phi * degrees])
          },
          project: faceProjection(face),
        }
      })

      tree.forEach(function (d, i) { // tree
        let node = faces[d]
        node && (node.children || (node.children = [])).push(faces[i])
      })

      let facefn = function (lambda, phi) {
        for (let i = 0; i < faces.length; i++) {
          if (faces[i].contains(lambda, phi)) return faces[i]
        }
      }

      let m = d3Geo.geoPolyhedral(
        faces[0],
        facefn,
        facerotation, // rotation of the root face in the projected (pixel) space
        true // clipPolygon http://blockbuilder.org/Fil/cb7930254c9e7062114678d62d9be5ac
      )

      m.faces = faces
      return m
    }

    return enty
  }

  exports.geoMyriad = geoMyriad
}))
