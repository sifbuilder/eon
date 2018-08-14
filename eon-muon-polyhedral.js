/***************************
 *        @muonPolyhedral
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonPolyhedral = global.muonPolyhedral || {})))
}(this, function (exports) {
  'use strict'

  async function muonPolyhedral (__mapper = {}) {
    let [
      d3geo,
      d3geoprojection,
    ] = await Promise.all([
      __mapper('xs').b('d3-geo'),
      __mapper('xs').b('d3-geo-projection'),
    ])

    let pi = Math.PI, degrees = 180 / pi

    let polyhedral = function (proform = {}) {
      let {faciaRotation, geoRotation, prjRaw, faces, tree} = proform

      let faceProjection = function (face) {
        let prj = d3geo.geoProjection(prjRaw)
        let c = d3geo.geoCentroid({type: 'MultiPoint', coordinates: face})
        let rotate = geoRotation(c)
        let translate = [0, 0, 0]
        let scale = 1 // convention
        return prj.scale(scale).translate(translate).rotate(rotate)
      }

      faces = faces.map(function (face) {
        let polygon = face.slice()
        face = face.slice(0, -1)
        return {
          face: face,
          contains: function (lambda, phi) {
            return d3geo.geoContains({ type: 'Polygon', coordinates: [ polygon ] },
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

      let m = d3geoprojection.geoPolyhedral(
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
