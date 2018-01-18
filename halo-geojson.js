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
    let [b, g, h, m] = Array(4).fill({})

    let f = __mapper('props')(),
      mstace = __mapper('xs').m('stace'),
      mstore = __mapper('xs').m('store'),
      mquad = __mapper('xs').m('quad'),
      hnat = __mapper('xs').h('nat'),
      mgeom = __mapper('xs').m('geom')

    m.anitem = __mapper('xs').m('anitem')
    m.ric = __mapper('xs').m('ric')
    m.boform = __mapper('xs').m('boform')
    m.geoj = __mapper('xs').m('geoj')
    m.profier = __mapper('xs').m('profier')

    /**********************
   *    @gramify
   */
    let gramm = function (anima, newAnigrams = []) {
      let anigram = m.anitem(anima).anigram(),										// anigram
        halo = 				anigram.halo, // halo
        geoform = 		anigram.geoform || m.anitem.coreGeoform(), // geoform
        payload = 		anigram.payload, // payload
        boform = 			payload.boform, // boform
        ric = payload.ric, // ric
        tim = payload.tim, // tim
        proform =			payload.proform, // proform
        conform = 		payload.conform, // conform
        uid = 				payload.uid, // uid
        parentuid = 	payload.parentuid, // parentuid
        geonode = 		payload.geonode || m.anitem.coreGeonode(),	// geonode
        gj

      gj = f.v(geoform, anigram)

      gj = m.profier.conformer(anigram)(gj)
      gj = m.profier.proformer(anigram)(gj)

      // let fileffect =  {
      // "projection": "uniwen",
      // "translate": [  geonode.geometry[0], geonode.geometry[1], geonode.geometry[2] ]}
      // gj =  m.profier.projier(fileffect, anigram)(gj)

      gj = m.geoj.featurize(gj) 										// featurize
      gj = m.boform.boformer(anigram, gj)	// boform
      gj = m.geoj.zorder(gj) 											// order
      gj = m.ric.qualier(ric, anigram, gj)					// qualify

      if (0 && 1)	console.log('h.geojson.gramm json', gj)

      newAnigrams = gj.features.map((d, i) => {	// d is feature
        let newAnigram = {}
        newAnigram.payload = {}

        newAnigram.payload.avatars = anigram.payload.avatars // inherit avatars

        newAnigram.geoform = d
        newAnigram.payload.ric = d.properties.ric		// hoist properties
        newAnigram.payload.uid = d.properties.uid
        return newAnigram
      })

      if (0 && 1)	console.log('h.geojson newAnigrams:', newAnigrams.length, newAnigrams)
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
