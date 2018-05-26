/**********************
 *		@haloTiles
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.haloTiles = global.haloTiles || {})));
}(this, function (exports) { 'use strict';

// https://bl.ocks.org/mbostock/ece50c027bdf8cc20003a17d93e4f60e
// # d3.geoProject(object, projection) <>
// Projects the specified GeoJSON object using the specified projection, returning a shallow copy of the specified GeoJSON object with projected coordinates. Typically, the input coordinates are spherical and the output coordinates are planar, but the projection can also be an arbitrary geometric transformation.

// # d3.geoIdentity() <>
// The identity transform can be used to scale, translate and clip planar geometry. It implements projection.scale, projection.translate, projection.fitExtent, projection.fitSize and projection.clipExtent.


var haloTiles = function (__mapper = {}) {

    let f = __mapper('props')(),
      manitem = __mapper('xs').m('anitem'),
      mgeom = __mapper('xs').m('geom'),
      mgeoj = __mapper('xs').m('geoj'),
      mgraticule = __mapper('xs').m('graticule')

    // .................... gramm
	let gramn = function (anima, newAnigrams = []) {
    
      let anigram = manitem(anima).anigram() // anigram

      anigram.halo = 'ent' // halo

			let range = (anigram.range !== undefined ) ? anigram.range : null
			let tile = (anigram.tile !== undefined ) ? anigram.tile : null

			let	gjson = a.geojson()						// get value of geo

			let bigPolygons = gjson.coordinates

			let grarr = mgraticule.grarr(a.graticule)	// grat {mms,pps}
				let mersCoords = grarr.mms.coordinates
				let parsCoords = grarr.pps.coordinates
			let coords = [...mersCoords, ...parsCoords]

			let verts =  mgraticule.getVerts(mersCoords,parsCoords)

			let json = {type: "LineString",coordinates: verts}							// init json
					json = mgeoj.jparse(json, threeConformer)	// conform vertex3d
					// json =  __mapper("xs").m("stace").getLocifier(json, anigram)	// localize

			let	vertices = mgeoj.getCoords(json)							// vertices

			let faces = mgraticule.getFaces(mersCoords, parsCoords)	// faces

			// let faces = __mapper("muonGraticule").getFaces(mersCoords, parsCoords, vertex3, range, tile, vertices, bigPolygons[0] )

			let inFaces = []
			for (let i=0; i<faces.length; i++) {
        
					let face = faces[i]
					let geoFace = [verts[face[0]], verts[face[1]], verts[face[2]] ]

					// console.log("face", i, face)
					// console.log("geoFace", i, JSON.stringify(geoFace))

					let inside = mgeom.polygonInMultiPolygon(
							geoFace,
							bigPolygons // _e_
					)

					if (inside) inFaces.push(face)
					// inFaces.push(face)
					// console.log("inside", inside)
			}

			faces = inFaces



			return newAnigrams
		}

    // .................... enty
    let haloNat_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloNat_gramm = anima => gramm(anima)

    let haloNat = {}
    haloNat.ween = anima => haloNat_ween(anima)
    haloNat.gramm = anima => haloNat_gramm(anima)

    let enty = haloTiles

    return enty
  }

  exports.haloNat = haloNat
}))
