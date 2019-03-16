/***************************
 *        @muonPolyhedral
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonPolyhedral = global.muonPolyhedral || {})))
}(this, function (exports) {
  'use strict'

  async function muonPolyhedral (__eo = {}) {
    let [
      d3Geo,
      d3Geoprojection,
    ] = await Promise.all([
      __eo('xs').b('d3-geo'),
      __eo('xs').b('d3-geo-projection'),
    ])

    let pi = Math.PI, degrees = 180 / pi

    let polyhedral = function (proform = {}) {
      let {faciaRotation, geoRotation, prtRaw, faces, tree} = proform

      let faceProjection = function (face) {
        let proton = d3Geo.geoProjection(prtRaw)
        let c = d3Geo.geoCentroid({type: 'MultiPoint', coordinates: face})
        let rotate = geoRotation(c)
        let translate = [0, 0, 0]
        let scale = 1 // convention
        return proton.scale(scale).translate(translate).rotate(rotate)
      }

      faces = faces.map(function (face) {
        let polygon = face.slice()
        face = face.slice(0, -1)
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

      let m = d3Geoprojection.geoPolyhedral(
        faces[0],
        facefn,
        faciaRotation, // rotation of the root face in the projected (pixel) space
        true // clipPolygon http://blockbuilder.org/Fil/cb7930254c9e7062114678d62d9be5ac
      )

      return m
    }

    // ....................... enty
    let enty = polyhedral
    return enty
  }

  exports.muonPolyhedral = muonPolyhedral
}))
