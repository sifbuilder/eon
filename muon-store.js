/***********
 *    @muonStore
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonStore = global.muonStore || {})))
}(this, function (exports) {
  'use strict'

  // ref: https://bl.ocks.org/mbostock/6081914 transitions
  //      https://github.com/d3/d3-ease#easeElasticOut

  let muonStore = function muonStore (__mapper) {
    let f = __mapper('props')()

    let state = {}
    state.animas = [] // animas array
    state.aniset = {} // animas by uid
    state.anigrams = [] // behavior - an anigram may have many avatars

    let apply = function apply (action = {}) {
      /***************************
 *        @UPDANIMA
 */
      if (action.type === 'UPDANIMA') {
        let updAnimas = f.fa(action.animas) // get new animas as array
        let elapsed = action.elapsed || 0

        for (let i = 0; i < updAnimas.length; i++) {
          let updAnima = f.o(updAnimas[i]) // each new anima

          let uid = (updAnima.payload.uid !== undefined) // uid
            ? updAnima.payload.uid
            : __mapper('xs').m('ric').buildUID(updAnima)

          let index = enty.findFromUid(uid, state.animas)
          if (index !== -1) { // anima exists
            if (updAnima.payload.delled === 1) {
              state.animas.splice(index, 1) // delete anima
            } else {
              state.animas[index] = updAnima // replace
            }
          } else { // new anima
            updAnima.payload.tim = __mapper('xs').m('tim')(updAnima.payload.tim, elapsed) // set tim elapsed
            updAnima.payload.uid = uid // set uid if new anima
            updAnima.payload.nid = __mapper('xs').m('store').getNid() // node id in animas collection

            state.aniset[updAnima.payload.uid] = updAnima // set new anima by uid
            state.animas[state.animas.length] = updAnima // register new anima
          }
        }

        return state.animas
      }
      /***************************
 *        @UPDANIGRAM
 */
      if (action.type === 'UPDANIGRAM') {
        let newAnigrams = action.anigrams

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

    /* **************************
 *        @ween
 *        ween every generation
 */
    let ween = function (anima, newItems = []) {
      let anigram = __mapper('xs').m('anitem').anigram(anima)

      if (anigram.halo === undefined) console.error('halo not defined')
      if (anigram.halo === null) console.error('halo is null')
      let halo = (anigram.halo !== undefined && typeof anigram.halo === 'object')
        ? anigram.halo // halo in anima
        : __mapper('xs').h(anigram.halo) // halo in store
      if (halo === null) console.log('halo ', anigram.halo, ' not found')
      let weened = halo.ween(anima) // ANIMA HALO.WEEN
      weened.forEach(d => { // qualify each ween
        d.payload.uid = __mapper('xs').m('ric').buildUID(d) // uid for children
        newItems.push(d)
      })

      return newItems
    }

    /* **************************
 *        @gramm
 */
    let gramm = function (anima, newItems = []) {
      let anigram = __mapper('xs').m('anitem').anigram(anima)

      let tim = anigram.payload.tim,
        elapsed = tim.elapsed,
        wait = tim.wait

      let newAnigrams = []
      let halo																		// anigram halo

      if (anima && (elapsed && elapsed >= wait)) { // if anima in time
        if (anigram.halo !== undefined &&
					(typeof anigram.halo === 'function' || typeof anigram.halo === 'object')) {
          halo = anigram.halo // halo in anima
        } else {
          halo = __mapper('xs').h(anigram.halo) // or halo in store
        }

        if (!halo) console.log('halo ', halo, ' not defined')

        else newAnigrams = halo.gramm(anima) // ANIMA HALO.GRAMM

        if (newAnigrams !== null && newAnigrams.length > 0) {
          __mapper('xs').m('store').apply({'type': 'UPDANIGRAM', 'caller': 'm.store', 'anigrams': newAnigrams})
          newItems = newItems.concat(f.a(newAnigrams))
        } // else console.log('halo ', halo, ' returns no anigram')
      }

      if (newItems !== undefined && newItems.length > 0) { // check if avatars in NEW animas
        for (let i = 0; i < newItems.length; i++) {
          let newItem = newItems[i] // each new item

          if (newItem.payload.avatars !== undefined && newItem.payload.avatars !== null) { // AVATARS
            let avatars = (typeof newItem.payload.avatars === 'object') ? Object.values(newItem.payload.avatars) : newItem.payload.avatars
            for (let j = 0; j < avatars.length; j++) {
              let newSubItems = []
              let avatar = avatars[j]

              avatar.payload.uid = __mapper('xs').m('ric').buildUID(avatar) // uid for children
              avatar.payload.tim = anigram.payload.tim // time from anima
              avatar.payload.parentuid = newItem.payload.uid // parentuid from newItem

              newSubItems = enty.gramm(avatar) // AVATAR GRAMM halogram
              __mapper('xs').m('store').apply({'type': 'UPDANIGRAM', 'caller': 'm.store', 'anigrams': newSubItems})

              newItems = newItems.concat(f.a(newSubItems))
            }
          }
        }
      }

      return newItems
    }
    /***************************
 *        @enty
 */
    function enty () {}

    enty.apply = apply
    enty.gramm = gramm
    enty.ween = ween

    enty.animasInGroupHowMany = anima =>
      (anima === undefined)
        ? 0
        : enty.animasLive()
          .filter(d => d.payload.ric.gid === anima.payload.ric.gid).length

    enty.animasInClassHowMany = anima =>
      (anima === undefined)
        ? 0
        : enty.animasLive()
          .filter(d => (d.payload.ric.gid === anima.payload.ric.gid &&
                    d.payload.ric.cid === anima.payload.ric.cid)).length

    enty.findIndex = (item, list) =>
      list.findIndex(d =>
        d.payload.ric.gid === item.ric.gid &&
                d.payload.ric.cid === item.ric.cid &&
                d.payload.ric.fid === item.ric.fid
      )

    enty.findIndexFromRic = (ric, list) =>
      list.findIndex(d =>
        d.payload.ric.gid === ric.gid &&
                d.payload.ric.cid === ric.cid &&
                d.payload.ric.fid === ric.fid
      )

    enty.findByUid = (item, list) => {
      let uid = __mapper('xs').m('ric').buildUID(item)
      return enty.findFromUid(uid, list)
    }

    enty.findFromUid = (uid, list) => list.findIndex(d => d.payload.uid === uid)

    enty.findIndexAnigramFromUid = uid => enty.anigrams().findIndex(d => d.payload.uid === uid)
    enty.findAnigramFromUid = uid => state.anigrams.find(d => d.payload.uid === uid)
    enty.findAnimaFromUid = uid => state.animas.find(d => d.payload.uid === uid)

    enty.born = d => d.payload.tim !== undefined && d.payload.tim.unitElapsed !== undefined && d.payload.tim.unitElapsed > f.epsilon
    enty.unborn = d => d.payload.tim === undefined && d.payload.tim.elapsed === undefined && d.payload.tim.unitElapsed === undefined && d.payload.tim.unitElapsed < f.epsilon
    enty.getAnimaByUID = uid => state.animas.find(d => d.payload.uid === uid)

    enty.animas = () => state.animas
    enty.anigrams = () => state.anigrams
    enty.animasAll = () => state.animas // animas including delled
    enty.animasLive = () => state.animas.filter(d => d.delled !== 1 && d.delled !== true)
    enty.token = () => state.animas.length + 1
    enty.getNid = () => state.animas.length + 1

    enty.getAnigramIdx = ric => enty.findIndexFromRic(ric, state.anigrams)
    enty.getAnigram = ric => state.anigrams[enty.getAnigramIdx(ric)] || null

    enty.getAnimaIdx = ric => enty.findIndexFromRic(ric, state.animas)
    enty.getAnima = ric => state.animas[enty.getAnimaIdx(ric)] || null

    return enty
  }

  exports.muonStore = muonStore
}))
