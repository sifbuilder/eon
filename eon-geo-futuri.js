/*******************************************
 *      @geoFuturi
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.geoFuturi = global.geoFuturi || {})))
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

  async function geoFuturi (__mapper = {}) {
    let [
      mgeom,
      mpolyhedral,
      d3,
    ] = await Promise.all([
      __mapper('xs').m('geom'),
      __mapper('xs').m('polyhedral'),
      __mapper('xs').b('d3'),
    ])

    let d3selection = d3
    let d3geo = d3

    let atan = Math.atan, pi = Math.PI, degrees = 180 / pi, sqrt1_2 = Math.SQRT1_2

    let vertices = []
    let mode = 'cartesian'
    if (mode === 'spherical') {
      let ang = 90,
        phi1 = atan(sqrt1_2) * degrees // 35.264389682754654

      vertices = [
        [ (-1 * ang - 45), phi1], // 3
        [ (0 * ang - 45), phi1], // 0
        [ (1 * ang - 45), phi1], // 1
        [ (2 * ang - 45), phi1], // 2
        [ (-1 * ang - 45), -phi1], // 7
        [ (0 * ang - 45), -phi1], // 4
        [ (1 * ang - 45), -phi1], // 5
        [ (2 * ang - 45), -phi1], // 6
      ]
    } else {
      vertices = [
        [-1, -1, 1], // 0  // 0
        [ 1, -1, 1], // 1  // 1
        [ 1, 1, 1], // 2  // 2
        [-1, 1, 1], // 3  // 3
        [-1, -1, -1], // 5  // 4
        [ 1, -1, -1], // 4  // 5
        [ 1, 1, -1], // 7  // 6
        [-1, 1, -1], // 6  // 7
      ].map(mgeom.normalize)
        .map(mgeom.spherical)
        .map(mgeom.to_degrees)

      vertices = d3selection.merge([
        vertices,
      ])
    }

    let faces = [
      [1, 0, 3, 2, 1], // N
      [1, 2, 6, 5, 1],
      [2, 3, 7, 6, 2],
      [3, 0, 4, 7, 3],
      [0, 1, 5, 4, 0],
      [5, 6, 7, 4, 5], // S
    ].map(function (face) {
      return face.map(function (i) {
        return vertices[i]
      })
    })

    // .................. enty
    let enty = function (p = {}) {
      if (!p.faciaRotation) p.faciaRotation = Math.PI / 4
      if (!p.geoRotation) p.geoRotation = c => [-c[0], -c[1], 0]
      if (!p.tree) p.tree = [-1, 4, 5, 2, 0, 1]
      if (!p.rotate) p.rotate = [28, -4, 0] // California
      if (!p.faces) p.faces = faces
      if (!p.prtRaw) p.prtRaw = d3geo.geoGnomonicRaw

      return mpolyhedral(p)
    }

    return enty
  }

  exports.geoFuturi = geoFuturi
}))
