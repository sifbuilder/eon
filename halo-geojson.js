/**********************
 *    @haloGeojson
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloGeojson = global.haloGeojson || {})))
}(this, function (exports) { "use strict"

  let haloGeojson = function haloGeojson(__mapper = {}) {

    let f = __mapper("props")(),
      mgeoj = __mapper("xs").m("geoj"),
      mprofier = __mapper("xs").m("profier"),
      mboform = __mapper("xs").m("boform"),
      mric = __mapper("xs").m("ric"),
      mstace = __mapper("xs").m("stace"),
      manitem = __mapper("xs").m("anitem"),
      mstore = __mapper("xs").m("store"),
      mquad = __mapper("xs").m("quad"),
      hnat = __mapper("xs").h("nat"),
      mgeom = __mapper("xs").m("geom")				

		
    /**********************
   *    @gramify
   */
    let gramm = function (anima, newAnigrams=[]) {
      let anigram = manitem(anima).anigram(),											// anigram
        halo = 				anigram.halo,  															// halo
        geoform = 		anigram.geoform || manitem.coreGeoform(),  	// geoform
        payload = 		anigram.payload,            								// payload
        boform = 			payload.boform,             							// boform
        ric =   			payload.ric,               								// ric
        tim =   			payload.tim,               								// tim
        proform =			payload.proform,            							// proform
        conform = 		payload.conform,            							// conform
        uid = 				payload.uid,          										// uid
        parentuid = 	payload.parentuid,          							// parentuid
        geonode = 		payload.geonode || manitem.coreGeonode(),	// geonode
        json

			
      if (1 && 1)	console.log("h.geojson gramm", anigram)
      json = f.v(geoform, anigram)

      json = mprofier.projier(f.v(conform, anigram), anigram)(json)
      json = mprofier.proformer(f.v(proform, anigram), anigram)(json)



      let fileffect =  {
        "projection": "uniwen",
        "translate": [  geonode.geometry[0], geonode.geometry[1], geonode.geometry[2] ]}
      json =  mprofier.projier(fileffect, anigram)(json)

		
		
      json = mgeoj.featurize(json) 										// featurize
      json = mboform.boformer(anigram, json)	// boform
      json = mgeoj.zorder(json) 											// order
      json = mric.qualier(ric, anigram, json)					// qualify

      if (1 && 1)	console.log("h.geojson json", json)
				
      newAnigrams = json.features.map( (d, i) => {
        let newAnigram = Object.assign({}, anigram)
					newAnigram.payload.feature = d
					newAnigram.payload.ric = d.properties.ric
					newAnigram.payload.uid = d.id
        return newAnigram
      })

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
