/***********
 *    @muonStore
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonStore = global.muonStore || {})))
}(this, function (exports) {
  'use strict'

  // md: # md:{filename}
  // md: **manage anitems store**
  // md: ## refs
  // md: * `https://bl.ocks.org/mbostock/6081914 transitions`
  // md: * `https://github.com/d3/d3-ease#easeElasticOut`
  // md:
  // md:
  // md: ## methods
  // md: * [apply](#apply) - adds, replace, delete anitems
  // md:   @action: {UPDANIMA, UPDANIGRAM}
  // md: * [ween](#ween) - process anitem through halo.ween
  // md:   @anitem
  // md: * [gramm](#gramm) - process anitem through halo.gramm
  // md:   manage anitem's time
  // md:   process anitem with anitem's halo.gramm
  // md:   process anitem.avatars
  // md: * animasInGroupHowMany
  // md:   @anima
  // md:   return live animas in group `anima.payload.rid.gid`
  // md: * animasInClassHowMany
  // md:   @anima
  // md:   return live animas in class `anima.payload.rid.cid`
  // md: * findIndexFromRic
  // md:   @ric
  // md:   @list
  // md:   get anitem in @list by @ric {gid, cid, fid}
  // md: * findIndex
  // md:   @anitem
  // md:   @list
  // md:   get anitem in @list by @anitem.ric {gid, cid, fid}
  // md: * findByUid
  // md:   @anitem
  // md:   @list
  // md:   get anitem in @list by mric.getuid(@anitem)
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
      anigrams: [] // behavior - anigrams may have avatars
    }

    // .................. apply
    function _apply (action = {}) {

      // .................. UPDANIMA
      if (action.type === 'UPDANIMA') {
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


        return state.animas
      }

      // .................. UPDANIGRAM
      if (action.type === 'UPDANIGRAM') {
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
    async function ween(anima, newItems = []) {

      let anigram = manitem.anigram(anima)
      let haloRef = __mapper('xs').eonize(anigram.halo, 'halo')
      let newAnimas = __mapper(haloRef).ween(anigram) // ANIMA HALO.GRAMM

      if (newAnimas !== null && newAnimas.length > 0) {
        _apply({'type': 'UPDANIMA', 'animas': newAnimas})
          newItems = newItems.concat(mprops.a(newAnimas))
      }
      return newItems

      // return __mapper(haloRef)  // anigram halo
        // .then(halo => {
            // return halo.ween(anigram) // ANIMA HALO.GRAMM
              // .then(newAnimas => {
                  // if (newAnimas !== null && newAnimas.length > 0) {
                    // _apply({'type': 'UPDANIMA', 'animas': newAnimas})
                      // newItems = newItems.concat(mprops.a(newAnimas))
                  // }
                  // return newItems
            // })
        // })

      // let anigram = manitem.anigram(anima)
      // if (anigram.halo !== undefined && typeof anigram.halo === 'string') {
        // __mapper('xs').h(anigram.halo)
          // .then( halo => {
            // if (halo === null) console.log('halo ', anigram.halo, ' not found')
            // let weened = halo.ween(anima) // ANIMA HALO.WEEN
            // weened.forEach(newItem => { // qualify each ween
              // newItem.payload.uid = mric.getuid(newItem) // uid for children
              // newItems.push(newItem)
            // })
          // })
      // }
      // return newItems
    }

    // .................. gramm
    function gramm(anima, newItems = []) {
      let anigram = manitem(anima).anigram()
      let haloRef = __mapper('xs').eonize(anigram.halo, 'halo')
    
      // let newAnigrams = __mapper(haloRef).gramm(anigram) // ANIMA HALO.GRAMM
      // if (newAnigrams !== null && newAnigrams.length > 0) {
        // _apply({'type': 'UPDANIGRAM', 'anigrams': newAnigrams})
          // newItems = newItems.concat(mprops.a(newAnigrams))
      // }
      // if (newItems !== undefined && newItems.length > 0) { // avatars in NEW animas
        // for (let i = 0; i < newItems.length; i++) {
          // let newItem = newItems[i] // each new item
          // if (newItem.avatars !== undefined && newItem.avatars !== null) { // AVATARS
            // let avatars = (typeof newItem.avatars === 'object') ? Object.values(newItem.avatars) : newItem.avatars

            // for (let j = 0; j < avatars.length; j++) {
              // let newSubItems = []
              // let avatar = avatars[j]

              // avatar.payload.uid = mric.getuid(avatar) // uid for children
              // avatar.payload.tim = anigram.payload.tim // time from anima
              // avatar.payload.parentuid = newItem.payload.uid // parentuid from newItem

              // newSubItems = enty.gramm(avatar) // AVATAR GRAMM halogram
              // _apply({'type': 'UPDANIGRAM', 'anigrams': newSubItems})
            // }
          // }
        // }
      // }
      // return newItems    
    
    
      let halo = __mapper(haloRef)  // anigram halo

            return halo.gramm(anigram) // ANIMA HALO.GRAMM
              .then(newAnigrams => {
                  if (newAnigrams !== null && newAnigrams.length > 0) {
                    _apply({'type': 'UPDANIGRAM', 'anigrams': newAnigrams})
                      newItems = newItems.concat(mprops.a(newAnigrams))
                  }

                  if (newItems !== undefined && newItems.length > 0) { // avatars in NEW animas
                    for (let i = 0; i < newItems.length; i++) {
                      let newItem = newItems[i] // each new item
                      if (newItem.avatars !== undefined && newItem.avatars !== null) { // AVATARS
                        let avatars = (typeof newItem.avatars === 'object') ? Object.values(newItem.avatars) : newItem.avatars

                        for (let j = 0; j < avatars.length; j++) {
                          let newSubItems = []
                          let avatar = avatars[j]

                          avatar.payload.uid = mric.getuid(avatar) // uid for children
                          avatar.payload.tim = anigram.payload.tim // time from anima
                          avatar.payload.parentuid = newItem.payload.uid // parentuid from newItem

                          newSubItems = enty.gramm(avatar) // AVATAR GRAMM halogram
                          _apply({'type': 'UPDANIGRAM', 'anigrams': newSubItems})
                        }
                      }
                    }
                  }
              return newItems
            })

    
    
      // return __mapper(haloRef)  // anigram halo
        // .then(halo => {
            // return halo.gramm(anigram) // ANIMA HALO.GRAMM
              // .then(newAnigrams => {
                  // if (newAnigrams !== null && newAnigrams.length > 0) {
                    // _apply({'type': 'UPDANIGRAM', 'anigrams': newAnigrams})
                      // newItems = newItems.concat(mprops.a(newAnigrams))
                  // }

                  // if (newItems !== undefined && newItems.length > 0) { // avatars in NEW animas
                    // for (let i = 0; i < newItems.length; i++) {
                      // let newItem = newItems[i] // each new item
                      // if (newItem.avatars !== undefined && newItem.avatars !== null) { // AVATARS
                        // let avatars = (typeof newItem.avatars === 'object') ? Object.values(newItem.avatars) : newItem.avatars

                        // for (let j = 0; j < avatars.length; j++) {
                          // let newSubItems = []
                          // let avatar = avatars[j]

                          // avatar.payload.uid = mric.getuid(avatar) // uid for children
                          // avatar.payload.tim = anigram.payload.tim // time from anima
                          // avatar.payload.parentuid = newItem.payload.uid // parentuid from newItem

                          // newSubItems = enty.gramm(avatar) // AVATAR GRAMM halogram
                          // _apply({'type': 'UPDANIGRAM', 'anigrams': newSubItems})
                        // }
                      // }
                    // }
                  // }
              // return newItems
            // })
        // })


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