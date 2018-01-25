/**********************
   *    @muonRic
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonRic = global.muonRic || {})))
}(this, function (exports) {
  'use strict'

  let muonRic = function muonRic (__mapper = {}) {
    let props = __mapper('props')()

    // ric.halo: anima type
    // ric.gid: group id
    // ric.cid: class id
    // ric.fid: form id

    // aid: anima id
    // nid: number id
    // uid: unique id
    // delled: is deleted {0,1}
    // inited: is inited {0,1}
    // gelded: is gelded {0,1} - no further replication
    // sort: render sort

    /***************************
 *        @getAnigramRic
 */
    let getAnigramRic = function getAnigramRic (anigram, idx = 0) {
      // single item in subgroup manged by position
      // 0 gid, cid,  fid
      // 1 gid,       fid
      // 2 cid,       fid

      let parent = anigram.payload.parent

      let ric = anigram.payload.ric
      ric.halo = anigram.payload.ric.halo

      if (anigram.payload.ric.gid === undefined) { // no  gid  in anigram
        ric.gid = (parent.ric.gid || 'gid') + '_' + idx // set gid by position
      } else {
        ric.gid = anigram.payload.ric.gid // gid defined in anigram
      }

      if (anigram.payload.ric.cid === undefined) { // no  cid  in anigram
        ric.cid = parent.ric.cid + '_' + '_' + idx // cid from parent and index - larms
      } else {
        ric.cid = anigram.payload.ric.cid // cid set in anigram
      }

      let itemsInClass = __mapper('muonStore').anigrams().filter(d => d.ric.gid === ric.gid && d.ric.cid === ric.cid).length

      if (anigram.payload.ric.fid === undefined) { // no fid in anigram
        ric.fid = ric.cid + '_' + idx + itemsInClass
      } else if (typeof anigram.payload.ric.fid === 'function') {
        ric.fid = anigram.payload.ric.fid() // fid - allow for random
      } else if (idx > 0) { // fid defined but multiple subanigrams in form
        ric.fid = anigram.payload.ric.fid + '_' + '_' + idx // fid for multi position
      } else {
        ric.fid = anigram.payload.ric.fid // fid - diff by pos
      }

      return ric
    }
    /* **************************
 *        @qualier
 *				ani.ric => ani.feature.pros.ric => feature.id => ani.uid
 */

    let qualier = function (ric = {}, anigram, json) {
      if (1 && 1) console.log('m.ric.qualier ric', ric)

      if (json.type === undefined) {
				
        console.log('type undefined')
				
      } else if (typeof ric !== 'object') {
				
        console.log('ric is not an object')
				
      } else if (json.type === 'Feature') {

				let gid = ric.gid
        let cid = ric.cid
        let fid = ric.cid

				if (1 && 1) console.log(" ------------- ric", gid, cid, fid)				
				
        let feature = json
        let properties = feature.properties || {}

        if (ric.fid === undefined) fid = i || ''
        else if (typeof ric.fid === 'function') fid = ric.fid(0, ric, anigram)
        else fid = ric.fid // identify each feature in the collection

        properties.ric = {gid, cid, fid}
        properties.uid = __mapper('xs').m('ric').buildUIDFromRic(properties.ric)
				
        feature.id = properties.uid
				feature.properties = properties
				
				json = feature

				
      } else if (json.type === 'FeatureCollection') {
				
        let features = json.features
        for (let i = 0; i < features.length; i++) {
          let feature = features[i]

          let properties = feature.properties || {}

          let gid = ric.gid
          let cid = ric.cid
          let fid = ric.fid
					
	if (1 && 1) console.log(" ------------- ric", gid, cid, fid)	
		
          if (ric.fid === undefined) 							fid = cid + (i || '')
          else if (typeof ric.fid === 'function') fid = fid(i, ric, anigram)
          else 																		fid = fid + (i || '')
	
						feature.properties.ric = ric || anigram.payload.ric || {}
						
						feature.properties.ric.gid = gid
						feature.properties.ric.cid = cid
						feature.properties.ric.fid = fid
						
						feature.properties.uid = __mapper('xs').m('ric').buildUIDFromRic(feature.properties.ric)
						feature.id = feature.properties.uid
						feature.properties.nid = i
						
        }
        json.features = features
				
      } else {
        console.log('m.boform.boformer nothing done')
      }

      return json
    }

    /**********************
   *    @enty
   */
    let enty = function enty () {}
    enty.getAnigramRic = getAnigramRic // build ric from anigram, i
    enty.buildUIDFromRic = ric => ric.gid + '_' + ric.cid + '_' + ric.fid
    enty.buildUID = anitem => enty.buildUIDFromRic(anitem.payload.ric)
    enty.qualier = qualier

    return enty
  }

  exports.muonRic = muonRic
}))
