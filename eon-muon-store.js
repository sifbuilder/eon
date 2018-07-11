/***********
 *    @muonStore
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonStore = global.muonStore || {})))
}(this, function (exports) {
  'use strict'

  async function muonStore (__mapper) {
    let [
      mtim,
      mric,
      manitem,
      mprops,
    ] = await Promise.all([
      __mapper('xs').m('tim'),
      __mapper('xs').m('ric'),
      __mapper('xs').m('anitem'),
      __mapper('xs').m('props'),
    ])

    let epsilon = 1e-5

    let state = {
      animas: [], // animas array
      aniset: {}, // animas by uid
      anigrams: [], // behavior - anigrams may have avatars
    }

    // .................. apply
    function _apply (action = {}) {
      if (action.type === 'UPDANIMA') { // .................. UPDANIMA
        let updAnimas = mprops.fa(action.animas) // get new animas as array
        let elapsed = action.elapsed || 0

        for (let i = 0; i < updAnimas.length; i++) {
          let updAnima = mprops.o(updAnimas[i]) // each new anima

          let uid = (updAnima.payload.uid !== undefined) // uid
            ? updAnima.payload.uid
            : mric.getuid(updAnima)

          let index = enty.findFromUid(uid, state.animas)
          if (index !== -1) { // anima exists
            if (updAnima.payload.delled === 1) {
              state.animas.splice(index, 1) // delete anima
            } else {
              state.animas[index] = updAnima // replace
            }
          } else { // new anima
            updAnima.payload.tim = mtim.timing(updAnima.payload.tim, elapsed) // set tim elapsed
            updAnima.payload.uid = uid // set uid if new anima
            updAnima.payload.nid = enty.getNid() // node id in animas collection

            state.aniset[updAnima.payload.uid] = updAnima // set new anima by uid
            state.animas[state.animas.length] = updAnima // register new anima
          }
        }

        return enty.animasLive()
      }

      if (action.type === 'UPDANIGRAM') { // .................. UPDANIGRAM
        let newAnigrams = mprops.fa(action.anigrams)

        for (let i = 0; i < newAnigrams.length; i++) {
          if (newAnigrams[i] !== undefined) {
            let newItem = newAnigrams[i] // new anigram
            let uid = newItem.payload.uid
            let index = enty.findFromUid(uid, state.anigrams) // find index from d.payload.uid
            if (index === -1) index = state.anigrams.length // add holder if new
            state.anigrams[index] = newItem // replace anigram
          }
        }

        return state.anigrams
      }
    }

    // .................. ween
     function ween (anitem, newItems = []) {
      return Promise.resolve(manitem.functorize(anitem))
        .then(anigram => __mapper('xs').h(anigram.halo)
          .then(halo => halo.gramm(anigram))
          .then(newAnigrams => _apply({type: 'UPDANIMA', anigrams: newAnigrams})))
          
    }

    // .................. gramm
    function gramm (anitem, newItems = []) {
      return Promise.resolve(manitem.functorize(anitem))
        .then(anigram => __mapper('xs').h(anigram.halo)
          .then(halo => halo.gramm(anigram))
          .then(newAnigrams => _apply({type: 'UPDANIGRAM', anigrams: newAnigrams})))
    }

    // .................. enty
    let enty = {}

    enty.apply = _apply
    enty.gramm = gramm
    enty.ween = ween

    enty.findFromUid = (uid, list) => list.findIndex(d => d.payload.uid === uid) // mstore
    enty.anigrams = () => state.anigrams // manimation
    enty.animasLive = () => state.animas.filter(d => d.delled !== 1 && d.delled !== true) // manimation
    enty.getNid = () => state.animas.length + 1 // mstore

    return enty
  }

  exports.muonStore = muonStore
}))
