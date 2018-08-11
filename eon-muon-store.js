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
      .catch(function (err) {
        console.log('A m.store promise failed to resolve', err)
      })

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

        return updAnimas
      }

      if (action.type === 'UPDANIGRAM') { // .................. UPDANIGRAM
        let newAnigrams = mprops.fa(action.anigrams)

        for (let i = 0; i < newAnigrams.length; i++) {
          if (newAnigrams[i] !== undefined) {
            let newItem = newAnigrams[i] // new anigram

            if (Array.isArray(newItem)) {
              newItem = newItem[0]
            }

            let uid = newItem.payload.uid
            let index = enty.findFromUid(uid, state.anigrams) // find index from d.payload.uid
            if (index === -1) index = state.anigrams.length // add holder if new
            state.anigrams[index] = newItem // replace anigram
          }
        }

        return newAnigrams
      }
    }

    // .................. getavatars
    const getavatars = items => {
      items.forEach(item => {
        sequence(gavatars(item), avatar => {
          avatar.payload.uid = mric.getuid(avatar)
          avatar.payload.tim = item.payload.tim
          avatar.payload.parentuid = item.payload.uid
          gramm(avatar)
        })
      })
    }

    // .................. gavatars
    let gavatars = item => (typeof item.avatars === 'object') ? Object.values(item.avatars) : (item.avatars || [])

    // .................. sequence
    function sequence (items = [], fromitem) {
      function chain (items, index) {
        return (index === items.length)
          ? Promise.resolve()
          : Promise.resolve(fromitem(items[index])).then(() => chain(items, index + 1))
      }
      return chain(items, 0)
    }

    // .................. ween
    async function ween (anitem) { // ok trace
      let halo
      if (typeof (anitem.halo) === 'object') {
        halo = await Promise.resolve(anitem.halo)
      } else {
        halo = await __mapper('xs').h(anitem.halo)
      }
      await halo.ween(anitem) // UPDANIMA in halo
    }

    // .................. gramm
    function gramm (anitem) {
      return manitem.snapani(anitem)
        .then(geofunctored => manitem.functorpayload(geofunctored))
        .then(snapped => manitem.functorgeofold(snapped))
        .then(anigram => (typeof (anitem.halo) === 'object') ? Promise.resolve(anitem.halo) : __mapper('xs').h(anigram.halo)
          .then(halo => halo.gramm(anigram) // )
            .then(newItems => {
              if (1 && 1) console.log('newItems', anitem, newItems)

              _apply({type: 'UPDANIGRAM', anigrams: newItems})
              newItems.forEach(newItem => {
                let avatars = gavatars(newItem)

                avatars.forEach(avatar => {
                  avatar.payload.tim = anigram.payload.tim // tim from anigram
                  avatar.payload.uid = mric.getuid(avatar) // uid from avatar
                  avatar.payload.parentuid = newItem.payload.uid // parentuid from newItem

                  gramm(avatar)
                  
                })
              })
            })
          )
        )
    }

    // .................. enty
    let enty = {}

    enty.apply = _apply
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

    enty.findIndexFromRic = (ric, list) =>
      list.findIndex(d =>
        d.payload.ric.gid === ric.gid &&
                d.payload.ric.cid === ric.cid &&
                d.payload.ric.fid === ric.fid
      )

    enty.findIndex = (item, list) =>
      enty.findIndexFromRic(item.ric, list)

    enty.findByUid = (item, list) => enty.findFromUid(mric.getuid(item), list)
    enty.findFromUid = (uid, list) => list.findIndex(d => d.payload.uid === uid)

    enty.findIndexAnigramFromUid = uid => enty.anigrams().findIndex(d => d.payload.uid === uid)
    enty.findAnigramFromUid = uid => state.anigrams.find(d => d.payload.uid === uid)
    enty.findAnimaFromUid = uid => state.animas.find(d => d.payload.uid === uid)

    enty.born = d => d.payload.tim !== undefined && d.payload.tim.unitElapsed !== undefined && d.payload.tim.unitElapsed > epsilon
    enty.unborn = d => d.payload.tim === undefined && d.payload.tim.elapsed === undefined && d.payload.tim.unitElapsed === undefined && d.payload.tim.unitElapsed < epsilon
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
