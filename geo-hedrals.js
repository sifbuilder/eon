/***************************
 *        @geoHedrals
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.geoHedrals = global.geoHedrals || {})));
}(this, function (exports) { 'use strict';

let geoHedrals = function geoHedrals(__mapper = {}) {

  let renderer = __mapper("renderRenderer"),
      width = renderer.width(),
      height = renderer.height()

  let f = __mapper("props")()
  let g = __mapper("xs").m("geom")
  let mwen = __mapper("xs").m("wen")

  let versor = __mapper("xs").b("versor")()
  let cwen = __mapper("xs").c("wen")()

  let pi = Math.PI, degrees = 180 / pi, radians = pi / 180

  /****************************
   *    @enty
   */
let enty = function( p={} ) {

    if (!p.faciaRotation) p.faciaRotation = Math.PI / 4 // faciaRotation
    if (!p.geoRotation) p.geoRotation = c => [-c[0], -c[1], 0] // geoRotation
    if (!p.prjRaw) p.prjRaw = d3.geoGnomonicRaw    // prjRaw
    p.tree = f.entxx("tree", "trees", "treeidx", p) // tree
    if (!p.tree) p.tree = [-1]


    let {vertices, faces} = p

    if (vertices !== undefined) {      // assume faces from degreed spherical verties

      vertices = d3.merge([ vertices,])   // spher degrees eg. [-45, 35.2643]
        //          .map(g.normalize).map(g.spherical).map(g.to_degrees)
      faces = faces.map(function(face) {  // faces : points => vertices
        return face.map(function(p) {     // eg. [1, 0, 3, 2, 1]
          return vertices[p]
        })      // eg. [-45, 35], [-135, 35], [135, 35], [45, 354], [-45, 35]
      })
    } else {                           // assume faces as degreed spherical polygons

      faces = f.v(faces)
    }


    p.faces = faces 


    return __mapper("xs").b("polyhedral")(p)        // get polyhedral projection

}

  return enty

}

exports.geoHedrals = geoHedrals

}));
