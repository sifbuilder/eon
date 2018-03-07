/***************************
 *        @muonPolyhedral
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonPolyhedral = global.muonPolyhedral || {})))
}(this, function (exports) {
  'use strict'

  var muonPolyhedral = function muonPolyhedral (__mapper = {}) {
    let f = __mapper({'props': muonProps.muonProps()}).props()	// props

    let renderport = __mapper('renderRenderport'),
      width = renderport.width(),
      height = renderport.height()

    let d3Geo = d3
    let pi = Math.PI, degrees = 180 / pi, radians = pi / 180

    /***************************
 *        @enty
 */
    var enty = function (proform = {}) {
      let {faciaRotation, geoRotation, prjRaw, faces, tree} = proform

      let faceProjection = function (face) {
        let prj = d3Geo.geoProjection(prjRaw)
        let c = d3Geo.geoCentroid({type: 'MultiPoint', coordinates: face})
        let rotate = geoRotation(c)
        let translate = [0, 0, 0]
        let scale = 1			// convention
        return prj.scale(scale).translate(translate).rotate(rotate)
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
          project: faceProjection(face)
        }
      })

      tree.forEach(function (d, i) {					// tree
        let node = faces[d]
        node && (node.children || (node.children = [])).push(faces[i])
      })

      let facefn = 	function (lambda, phi) {
        for (let i = 0; i < faces.length; i++) {
          if (faces[i].contains(lambda, phi)) return faces[i]
        }
      }

      let m = d3Geo.geoPolyhedral(
        faces[0],
        facefn,
        faciaRotation, // rotation of the root face in the projected (pixel) space
        true // clipPolygon http://blockbuilder.org/Fil/cb7930254c9e7062114678d62d9be5ac
      )

      return m
    }

    return enty
  }

  exports.muonPolyhedral = muonPolyhedral
}))
