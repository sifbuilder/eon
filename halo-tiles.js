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
	let gramm = function (anima, newAnigrams = []) {

      let anigram = manitem(anima).anigram(), // anigram
        halo = anigram.halo, // halo
        geofold = anigram.geofold, // geofold
        payload = anigram.payload, // payload
        avatars = anigram.avatars // avatars


      let boform = payload.boform, // boform
        ric = payload.ric, // ric
        tim = payload.tim, // tim
        vim = payload.vim, // vim
        proform = payload.proform, // proform
        conform = payload.conform, // conform
        uid = payload.uid, // uid
        parentuid = payload.parentuid // parentuid


      let gj
      gj = f.v(geofold, anigram) // get geofold
      gj.properties = gj.properties || {} // recall genode
      gj.properties.geonode = gj.properties.geonode || {} // recall genode properties


      let graticule = payload.graticule

			let range = (anigram.range !== undefined ) ? anigram.range : null
			let tile = (anigram.tile !== undefined ) ? anigram.tile : null
			let verts =  mgraticule.gvertices(graticule)  // Feature.LineString
      let vertices = verts.geometry.coordinates
			let faces = mgraticule.gfaces(graticule)	// faces

			for (let i=0; i<faces.length; i++) {  // each face is a single ring polygon
      
        let idx = i
        let gid = ric.gid                             // from ava ric
        let cid = ric.cid
        let fid = ric.cid + '_' + idx
        let _ric = {gid, cid, fid}      
      
      
          let newItem = {}
          newItem.halo = 'ent'
          newItem.payload = Object.assign({}, anigram.payload)
          newItem.payload.ric = _ric
                  
          newItem.geofold = {type: "Polygon",coordinates: []}	
          
					let face = faces[i]
					let facering = [vertices[face[0]], vertices[face[1]], vertices[face[2]] ]
          
          newItem.geofold.coordinates = Array.of([...facering, facering[0]])
          let newGrams = __mapper('xs').h('ent').gramm(newItem)
          newAnigrams = [...newAnigrams, ...newGrams] // add items

			}




			return newAnigrams
		}

    // .................... enty
    let haloTiles_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloTiles_gramm = anima => gramm(anima)

    let haloTiles = {}
    haloTiles.ween = anima => haloTiles_ween(anima)
    haloTiles.gramm = anima => haloTiles_gramm(anima)

    let enty = haloTiles

    return enty
  }

  exports.haloTiles = haloTiles
}))
