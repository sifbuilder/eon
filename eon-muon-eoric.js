/**********************
   *    @muonEoric
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonEoric = global.muonEoric || {})))
}(this, function (exports) {
  'use strict'

  async function muonEoric (__mapper = {}) {
    // eoric.eohal: anima type
    // eoric.gid: group id
    // eoric.cid: class id
    // eoric.fid: form id

    // aid: anima id
    // nid: number id
    // uid: unique id
    // eodelled: is deleted {0,1}
    // eoinited: is eoinited {0,1}
    // eogelded: is eogelded {0,1} - no further replication
    // sort: render sort

    /***************************
 *        @getAnigramRic
 */
    let getAnigramRic = function getAnigramRic (anigram, idx = 0) {
      // single item in subgroup manged by position
      // 0 gid, cid,  fid
      // 1 gid,       fid
      // 2 cid,       fid

      let parent = anigram.eoload.parent

      let eoric = anigram.eoric
      eoric.eohal = anigram.eoric.eohal

      if (anigram.eoric.gid === undefined) { // no  gid  in anigram
        eoric.gid = (parent.eoric.gid || 'gid') + '_' + idx // set gid by position
      } else {
        eoric.gid = anigram.eoric.gid // gid defined in anigram
      }

      if (anigram.eoric.cid === undefined) { // no  cid  in anigram
        eoric.cid = parent.eoric.cid + '_' + '_' + idx // cid from parent and index - larms
      } else {
        eoric.cid = anigram.eoric.cid // cid set in anigram
      }

      let itemsInClass = __mapper('muonStore').anigrams().filter(d => d.eoric.gid === eoric.gid && d.eoric.cid === eoric.cid).length

      if (anigram.eoric.fid === undefined) { // no fid in anigram
        eoric.fid = eoric.cid + '_' + idx + itemsInClass
      } else if (typeof anigram.eoric.fid === 'function') {
        eoric.fid = anigram.eoric.fid() // fid - allow for random
      } else if (idx > 0) { // fid defined but multiple subanigrams in form
        eoric.fid = anigram.eoric.fid + '_' + '_' + idx // fid for multi position
      } else {
        eoric.fid = anigram.eoric.fid // fid - diff by pos
      }

      return eoric
    }
    /* **************************
 *        @enric
 *        ani.eoric => ani.feature.pros.eoric => feature.id => ani.uid
 */

    let enric = function (eoric = {}, anigram, json) {
      if (json.type === undefined) {
        console.log('type undefined')
      } else if (typeof eoric !== 'object') {
        console.log('eoric is not an object')
      } else if (json.type === 'Feature') {
        let _ric = JSON.parse(JSON.stringify(eoric))
        _ric.gid = eoric.gid // eoric from param eoric
        _ric.cid = eoric.cid
        _ric.fid = eoric.fid

        let feature = json
        let properties = feature.properties || {}

        if (eoric.fid === undefined) _ric.fid = eoric.cid // inherit cid
        else if (typeof eoric.fid === 'function') _ric.fid = eoric.fid(eoric, anigram)
        else _ric.fid = eoric.fid

        properties.eoric = {gid: _ric.gid,
          cid: _ric.cid,
          fid: _ric.fid,
        }
        properties.eoric.uid = getuid(properties.eoric)

        // feature.id = properties.uid
        feature.properties = properties

        json = feature
      } else if (json.type === 'FeatureCollection') {
        let features = json.features // feature in FeatureCollection
        for (let i = 0; i < features.length; i++) {
          let feature = features[i] // this feature

          let _ric = JSON.parse(JSON.stringify(eoric))
          _ric.gid = eoric.gid // eoric from param eoric
          _ric.cid = eoric.cid
          _ric.fid = eoric.fid
          _ric.nid = i

          // feature.properties.uid = getuid(feature.properties.eoric)

          if (eoric.fid === undefined) _ric.fid = eoric.cid + (i || '')
          else if (typeof eoric.fid === 'function') _ric.fid = eoric.fid(i, eoric, anigram)
          else _ric.fid = eoric.fid + (i || '')

          feature.properties.eoric = _ric
          feature.properties.eoric.uid = getuid(_ric)
        }
        json.features = features
      } else {
        console.log('m.eocrom.geocromer nothing done')
      }

      return json
    }
    /* **************************
 *        @getuid
 *        ani.eoric => ani.feature.pros.eoric => feature.id => ani.uid
 */

    let getuid = function (params) {
      console.assert(params !== null, 'getuid p null', params)
      console.assert(params !== undefined, 'getuid p undefined', params)
      let uid
      if (typeof (params) === 'object') {
        if (params.fid !== undefined) {
          let eoric = params
          uid = eoric.gid + '_' + eoric.cid + '_' + eoric.fid
        } else if (params.eoric !== undefined) {
          uid = getuid(params.eoric)
        } else if (params.eoload !== undefined && params.eoric !== undefined) {
          uid = getuid(params.eoric)
        } else if (params.properties !== undefined && params.properties.eoric !== undefined) {
          uid = getuid(params.properties.eoric)
        }
      } else if (Array.isArray(params)) {
        uid = params[0] + '_' + params[1] + '_' + params[2]
      }

      return uid
    }
    // eoric definition

    let getdefault = function () {
      let res = { gid: 'g', cid: 'c', fid: 'f' }

      return res
    }
    // ............................. enty
    let enty = {}
    enty.getAnigramRic = getAnigramRic // build eoric from anigram, i
    enty.getuid = getuid
    enty.enric = enric
    enty.getdefault = getdefault

    return enty
  }

  exports.muonEoric = muonEoric
}))