/***********
 *    @muonStore
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonStore = global.muonStore || {})))
}(this, function (exports) {
  'use strict'

  // md: # eon-muon-store
  // md: **manage anitems store**
  // md: ## refs
  // md: * `https://bl.ocks.org/mbostock/6081914 transitions`
  // md: * `https://github.com/d3/d3-ease#easeElasticOut`
  // md:
  // md:
  // md: ## methods
  // md: * [apply](#apply) - adds, replace, delete anitems
  // md:  @action: {UPDANIMA, UPDANIGRAM}
  // md: * [ween](#ween) - process anitem through halo.ween
  // md:   @anitem
  // md: * [gramm](#gramm) - process anitem through halo.gramm
  // md:   manage anitem's time
  // md:   process anitem with anitem's halo.gramm
  // md:   process anitem.avatars
  // md: * animasInGroupHowMany
  // md:   @anima
  // md:   return live animas in group `anima.eoload.rid.gid`
  // md: * animasInClassHowMany
  // md:   @anima
  // md:   return live animas in class `anima.eoload.rid.cid`
  // md: * findIndexFromRic
  // md:   @eoric
  // md:   @list
  // md:   get anitem in @list by @eoric {gid, cid, fid}
  // md: * findIndex
  // md:   @anitem
  // md:   @list
  // md:   get anitem in @list by @anitem.eoric {gid, cid, fid}
  // md: * findByUid
  // md:   @anitem
  // md:   @list
  // md:   get anitem in @list by muonEoric.getuid(@anitem)
  // md: * findFromUid
  // md:   @uid
  // md:   @list
  // md:   get anitem in @list by @uid
  // md: * findIndexAnigramFromUid
  // md: * findAnigramFromUid
  // md: * findAnimaFromUid
  // md: * born
  // md: * unborn
  // md: * getAnimaByUID
  // md: * animas
  // md: * anigrams
  // md: * animasAll
  // md: * animasLive
  // md: * token
  // md: * getNid
  // md: * getAnigramIdx
  // md: * getAnigram
  // md: * getAnimaIdx
  // md: * getAnima
  // md:
  // md:
  // md: # license
  // md: MIT

  async function muonStore (__mapper) {
    let [
      muonEotim,
      muonEoric,
      manitem,
      muonProps,
    ] = await Promise.all([
      __mapper('xs').m('eotim'),
      __mapper('xs').m('eoric'),
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
        let updAnimas = muonProps.fa(action.animas) // get new animas as array
        let elapsed = action.elapsed || 0

        for (let i = 0; i < updAnimas.length; i++) {
          let updAnima = muonProps.o(updAnimas[i]) // each new anima

          let uid = (updAnima.uid !== undefined) // uid
            ? updAnima.uid
            : muonEoric.getuid(updAnima)

          let index = enty.findFromUid(uid, state.animas)
          if (index !== -1) { // anima exists
            if (updAnima.delled === 1) {
              state.animas.splice(index, 1) // delete anima
            } else {
              state.animas[index] = updAnima // replace
            }
          } else { // new anima
            updAnima.eotim = muonEotim.timing(updAnima.eotim, elapsed) // set eotim elapsed
            updAnima.uid = uid // set uid if new anima
            updAnima.nid = enty.getNid() // node id in animas collection

            state.aniset[updAnima.uid] = updAnima // set new anima by uid
            state.animas[state.animas.length] = updAnima // register new anima
          }
        }

        return updAnimas
      }

      if (action.type === 'UPDANIGRAM') { // .................. UPDANIGRAM
        let newAnigrams = muonProps.fa(action.anigrams)

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
          avatar.uid = muonEoric.getuid(avatar)
          avatar.eotim = item.eotim
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

    // .................. weenDyn
    async function weenDyn (anitem) { // ok trace
      let halo = anitem.halo
      if (typeof (halo) === 'object') {
        halo = await Promise.resolve(halo)
      } else {
        halo = await __mapper('xs').h(halo)
      }

      let anigram = anitem
      // let snapped = await manitem.snapani(anitem)
      // let anigram = await manitem.functorize(snapped)

      let newItems = halo.ween(anigram)

      return newItems
      // _apply({type: 'UPDANIMA', animas: newItems})  // UPDANIMA for sim
    }

    // .................. ween
    function ween (anitem) { // ok trace
      let halo = anitem.halo
      if (typeof (halo) === 'object') {
        // halo = halo

      } else {
        halo = __mapper(__mapper('xs').ceonize(halo, 'halo'))
      }

      let anigram = anitem
      // let snapped = await manitem.snapani(anitem)
      // let anigram = await manitem.functorize(snapped)

      let newItems = halo.ween(anigram)

      return newItems
      // _apply({type: 'UPDANIMA', animas: newItems})  // UPDANIMA for sim
    }

    // .................. grammDyn
    function grammDyn (anitem) {
      return manitem.snapani(anitem)
        .then(snapped => manitem.functorize(snapped))
        .then(anigram => (typeof (anitem.halo) === 'object') ? Promise.resolve(anitem.halo) : __mapper('xs').h(anigram.halo)
          .then(halo => Promise.resolve(halo.gramm(anigram))
            .then(newItems => {
              _apply({type: 'UPDANIGRAM', anigrams: newItems}) // UPDANIGRAM
              newItems.forEach(newItem => {
                let avatars = gavatars(newItem)

                avatars.forEach(avatar => {
                  avatar.eotim = anigram.eotim // eotim from anigram
                  avatar.uid = muonEoric.getuid(avatar) // uid from avatar
                  avatar.parentuid = newItem.uid // parentuid from newItem

                  gramm(avatar)
                })
              })
            })
          )
        )
    }
    function gramm (anitem) {
      let snapped = manitem.snapani(anitem)
      let anigram = manitem.functorize(snapped)
      let halo = (typeof (anitem.halo) === 'object')
        ? anitem.halo
        : __mapper(__mapper(__mapper('xs').ceonize(anigram.halo, 'halo'))) // expected in __mapper
      let newItems = muonProps.a(halo.gramm(anigram))
      console.log('m.store', newItems)
      _apply({type: 'UPDANIGRAM', anigrams: newItems}) // UPDANIGRAM
      newItems.forEach(newItem => {
        let avatars = gavatars(newItem)
        avatars.forEach(avatar => {
          avatar.eotim = anigram.eotim // eotim from anigram
          avatar.uid = muonEoric.getuid(avatar) // uid from avatar
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
          .filter(d => d.eoric.gid === anima.eoric.gid).length

    enty.animasInClassHowMany = anima =>
      (anima === undefined)
        ? 0
        : enty.animasLive()
          .filter(d => (d.eoric.gid === anima.eoric.gid &&
                    d.eoric.cid === anima.eoric.cid)).length

    enty.anigramsInClassHowMany = anigram =>
      (anigram === undefined)
        ? 0
        : enty.anigrams()
          .filter(d => (d.eoric.gid === anigram.eoric.gid &&
                    d.eoric.cid === anigram.eoric.cid)).length

    enty.findIndexFromRic = (eoric, list) =>
      list.findIndex(d =>
        d.eoric.gid === eoric.gid &&
                d.eoric.cid === eoric.cid &&
                d.eoric.fid === eoric.fid
      )

    enty.findIndex = (item, list) =>
      enty.findIndexFromRic(item.eoric, list)

    enty.findByUid = (item, list) => enty.findFromUid(muonEoric.getuid(item), list)
    enty.findFromUid = (uid, list) => list.findIndex(d => d.uid === uid)

    enty.findIndexAnigramFromUid = uid => enty.anigrams().findIndex(d => d.uid === uid)
    enty.findAnigramFromUid = uid => state.anigrams.find(d => d.uid === uid)
    enty.findAnimaFromUid = uid => state.animas.find(d => d.uid === uid)

    enty.born = d => d.eotim !== undefined && d.eotim.unitElapsed !== undefined && d.eotim.unitElapsed > epsilon
    enty.unborn = d => d.eotim === undefined && d.eotim.elapsed === undefined && d.eotim.unitElapsed === undefined && d.eotim.unitElapsed < epsilon
    enty.getAnimaByUID = uid => state.animas.find(d => d.uid === uid)

    enty.animas = () => state.animas
    enty.anigrams = () => state.anigrams
    enty.animasAll = () => state.animas // animas including delled
    enty.animasLive = () => state.animas.filter(d => d.delled !== 1 && d.delled !== true)
    enty.token = () => state.animas.length + 1
    enty.getNid = () => state.animas.length + 1

    enty.getAnigramIdx = eoric => enty.findIndexFromRic(eoric, state.anigrams)
    enty.getAnigram = eoric => state.anigrams[enty.getAnigramIdx(eoric)] || null

    enty.getAnimaIdx = eoric => enty.findIndexFromRic(eoric, state.animas)
    enty.getAnima = eoric => state.animas[enty.getAnimaIdx(eoric)] || null

    return enty
  }

  exports.muonStore = muonStore
}))
