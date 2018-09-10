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

          let uid = (updAnima.uid !== undefined) // uid
            ? updAnima.uid
            : mric.getuid(updAnima)

          let index = enty.findFromUid(uid, state.animas)
          if (index !== -1) { // anima exists
            if (updAnima.payload.delled === 1) {
              state.animas.splice(index, 1) // delete anima
            } else {
              state.animas[index] = updAnima // replace
            }
          } else { // new anima
            updAnima.tim = mtim.timing(updAnima.tim, elapsed) // set tim elapsed
            updAnima.uid = uid // set uid if new anima
            updAnima.payload.nid = enty.getNid() // node id in animas collection

            state.aniset[updAnima.uid] = updAnima // set new anima by uid
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

            let uid = newItem.uid
            let index = enty.findFromUid(uid, state.anigrams) // find index from d.uid
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
          avatar.uid = mric.getuid(avatar)
          avatar.tim = item.tim
          avatar.parentuid = item.uid
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
      let halo = anitem.halo
      if (typeof (halo) === 'object') {
        halo = await Promise.resolve(halo)
   
      } else {
        // halo = __mapper(__mapper('xs').ceonize(halo, 'halo'))
        halo = await __mapper('xs').h(halo)
      }

      let anigram = anitem
      // let snapped = await manitem.snapani(anitem)
      // let anigram = await manitem.functorize(snapped)

      let newItems = await halo.ween(anigram)

      return newItems
      // _apply({type: 'UPDANIMA', animas: newItems})  // UPDANIMA for sim
    }

    // .................. gramm
    // function gramm (anitem) {
      // return manitem.snapani(anitem)
        // .then(snapped => manitem.functorize(snapped))
        // .then(anigram => (typeof (anitem.halo) === 'object') ? Promise.resolve(anitem.halo) : __mapper('xs').h(anigram.halo)
          // .then(halo => Promise.resolve(halo.gramm(anigram))
            // .then(newItems => {
              // _apply({type: 'UPDANIGRAM', anigrams: newItems}) // UPDANIGRAM
              // newItems.forEach(newItem => {
                // let avatars = gavatars(newItem)

                // avatars.forEach(avatar => {
                  // avatar.tim = anigram.tim // tim from anigram
                  // avatar.uid = mric.getuid(avatar) // uid from avatar
                  // avatar.parentuid = newItem.uid // parentuid from newItem

                  // gramm(avatar)
                // })
              // })
            // })
          // )
        // )
    // }
    async function gramm (anitem) {
      let snapped = await manitem.snapani(anitem)
      let anigram = await manitem.functorize(snapped)
      let halo = await (typeof (anitem.halo) === 'object') 
        ? anitem.halo 
        : __mapper(__mapper(__mapper('xs').ceonize(anigram.halo, 'halo')))  // expected in __mapper
      let newItems = await halo.gramm(anigram)
      _apply({type: 'UPDANIGRAM', anigrams: newItems}) // UPDANIGRAM
      newItems.forEach(newItem => {
                let avatars = gavatars(newItem)
                avatars.forEach(avatar => {
                  avatar.tim = anigram.tim // tim from anigram
                  avatar.uid = mric.getuid(avatar) // uid from avatar
                  avatar.parentuid = newItem.uid // parentuid from newItem

                  gramm(avatar)
                })
              })
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
          .filter(d => d.ric.gid === anima.ric.gid).length

    enty.animasInClassHowMany = anima =>
      (anima === undefined)
        ? 0
        : enty.animasLive()
          .filter(d => (d.ric.gid === anima.ric.gid &&
                    d.ric.cid === anima.ric.cid)).length

    enty.anigramsInClassHowMany = anigram =>
      (anigram === undefined)
        ? 0
        : enty.anigrams()
          .filter(d => (d.ric.gid === anigram.ric.gid &&
                    d.ric.cid === anigram.ric.cid)).length

    enty.findIndexFromRic = (ric, list) =>
      list.findIndex(d =>
        d.ric.gid === ric.gid &&
                d.ric.cid === ric.cid &&
                d.ric.fid === ric.fid
      )

    enty.findIndex = (item, list) =>
      enty.findIndexFromRic(item.ric, list)

    enty.findByUid = (item, list) => enty.findFromUid(mric.getuid(item), list)
    enty.findFromUid = (uid, list) => list.findIndex(d => d.uid === uid)

    enty.findIndexAnigramFromUid = uid => enty.anigrams().findIndex(d => d.uid === uid)
    enty.findAnigramFromUid = uid => state.anigrams.find(d => d.uid === uid)
    enty.findAnimaFromUid = uid => state.animas.find(d => d.uid === uid)

    enty.born = d => d.tim !== undefined && d.tim.unitElapsed !== undefined && d.tim.unitElapsed > epsilon
    enty.unborn = d => d.tim === undefined && d.tim.elapsed === undefined && d.tim.unitElapsed === undefined && d.tim.unitElapsed < epsilon
    enty.getAnimaByUID = uid => state.animas.find(d => d.uid === uid)

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
