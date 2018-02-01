/**********************
 *    @haloGeojson
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloGeojson = global.haloGeojson || {})))
}(this, function (exports) {
  'use strict'

  let haloGeojson = function haloGeojson (__mapper = {}) {
    let f = __mapper('props')(),
      manitem = __mapper('xs').m('anitem'),
      mric = __mapper('xs').m('ric'),
      mboform = __mapper('xs').m('boform'),
      mgeoj = __mapper('xs').m('geoj'),
      mprofier = __mapper('xs').m('profier'),
      mstore = __mapper('xs').m('store'),
      mproj3ct = __mapper('xs').m('proj3ct')

    /**********************
   *    @gramify
   */
    let gramm = function (anima, newAnigrams = []) {
      let anigram = manitem(anima).anigram(),										// anigram
        halo = 				anigram.halo, // halo
        geoform = 		anigram.geoform, // geoform
        payload = 		anigram.payload, // payload
        boform = 			payload.boform, // boform
        ric = 				payload.ric, // ric
        tim = 				payload.tim, // tim
        proform 	=		payload.proform, // f.v(payload.proform, anigram), // proform
        conform = 		payload.conform, // conform
        uid = 				payload.uid, // uid
        parentuid = 	payload.parentuid, // parentuid
        geonode = 	payload.geonode, // geonode
        gj = 					f.v(geoform, anigram)


      gj = mprofier.conformer(anigram)(gj)

		

      gj = mprofier.proformer(anigram)(gj)

			if (geonode) {								// if payload.geonode
			
				let fieldEffect =  {
						"projection": "uniwen",
						"translate": [  geonode.geometry.coordinates[0], geonode.geometry.coordinates[1], geonode.geometry.coordinates[2] ]}
				gj =  mprofier.projier(fieldEffect, anigram)(gj)
				
				geonode = mprofier.proformer(anigram)(geonode)	// projected position
				
			}


				if (0 && 1)	console.log('h.geojson.gramm geonode', geonode)
		
			
      gj = mgeoj.featurize(gj) 										// featurize
      gj = mboform.boformer(anigram, gj)			// boform
      gj = mgeoj.zorder(gj) 											// order
      gj = mric.qualier(ric, anigram, gj)					// qualify


		

      newAnigrams = gj.features.map((d, i) => {	// d is feature
        let newAnigram = {}

					newAnigram.payload = {}
					newAnigram.payload.avatars = anigram.payload.avatars // inherit avatars
					newAnigram.payload.ric = d.properties.ric		// hoist ric
					newAnigram.payload.uid = d.properties.uid		// hoist uid
					newAnigram.payload.preani = mstore.findAnigramFromUid(d.properties.uid)
					newAnigram.payload.geonode = geonode								// assign projected geonode


					newAnigram.geoform = d				// inherit geoform



        return newAnigram
      })

      // if (1 && 1)	console.log('h.geojson newAnigrams:', newAnigrams.length, newAnigrams)
      return newAnigrams
    }

    /**********************
   *    @enty
   */
    let haloGeojson_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloGeojson_gramm = anima => gramm(anima)

    let haloGeojson = {}
    haloGeojson.ween = anima => haloGeojson_ween(anima)
    haloGeojson.gramm = anima => haloGeojson_gramm(anima)

    let enty = haloGeojson

    return enty
  }

  exports.haloGeojson = haloGeojson
}))
