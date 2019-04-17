/***********
 *    @muonStore
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonStore = global.muonStore || {})))
}(this, function (exports) {
  'use strict'

  async function muonStore (__eo) {
    let [
      muonAnitem,
      muonEoric,
      muonEotim,
    ] = await Promise.all([
      __eo('xs').m('anitem'),
      __eo('xs').m('eoric'),
      __eo('xs').m('eotim'),
    ])
      .catch(function (err) {
        console.log('A m.store promise failed to resolve', err)
      })

    let epsilon = 1e-5

    let state = {
      animas: [], // animas array
      anigrams: [], // anigrams
    }

    const a = d => {
      let ret = []
      if (d === undefined) { // ret = []
      } else if (d === null) { // ret = []
      } else if (Array.isArray(d)) {
        ret = [...d]
      } else {
        ret = [d]
      }
      return ret
    }

    // ... **manage anitems store**
    const fa = d => { // force array
      let ret
      if (Array.isArray(d)) ret = d
      else if (d === null) ret = []
      else if (d === undefined) ret = []
      else if (typeof d === 'object') ret = Object.values(d)
      else ret = d
      return a(ret)
    }
    const o = obj => {
      if (obj == null || typeof obj !== 'object') return obj
      let copy = obj.constructor()
      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
      }
      return copy
    }

    // .................. apply
    function _apply (action = {}) {
      if (action.type === 'UPDANIMA') { // .................. UPDANIMA
        let updAnimas = fa(action.animas) // get new animas as array
        let elapsed = action.elapsed || 0

        for (let i = 0; i < updAnimas.length; i++) {
          let updAnima = o(updAnimas[i]) // each new anima

          let uid = (updAnima.eoric.uid !== undefined) // uid
            ? updAnima.eoric.uid
            : muonEoric.getuid(updAnima)

          let anima = state.animas[uid] 

          if (anima !== undefined) { // anima exists
            if (updAnima.eodelled === 1) {
              delete state.animas[uid] // delete anima
            } else {
              state.animas[uid] = updAnima // replace
            }
          } else { // new anima
            updAnima.eotim = muonEotim.timing(updAnima.eotim, elapsed) // set eotim elapsed
            updAnima.eoric.uid = uid // set uid if new anima
            state.animas[updAnima.eoric.uid] = updAnima // set new anima by uid
          }
        }

        return updAnimas
      }

      if (action.type === 'UPDANIGRAM') { // .................. UPDANIGRAM
        let newAnigrams = fa(action.anigrams)

        for (let i = 0; i < newAnigrams.length; i++) {
          if (newAnigrams[i] !== undefined) {
            let newItem = newAnigrams[i] // new anigram

            if (Array.isArray(newItem)) {
              newItem = newItem[0]  // _e_
            }

            let uid = newItem.eoric.uid || muonEoric.getuid(newItem)
            state.anigrams[uid] = newItem // replace anigram
          }
        }

        return newAnigrams
      }
    }

    // .................. getavatars
    const getavatars = items => {
      items.forEach(item => {
        sequence(gavatars(item), avatar => {
          avatar.eoric.uid = muonEoric.getuid(avatar)
          avatar.eotim = item.eotim
          avatar.eoric.pid = item.eoric.uid
          gramify(avatar)
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

    // .................. anifyDyn
    async function anifyDyn (anitem) { // ok trace
      let eohal = anitem.eohal
      if (typeof (eohal) === 'object') {
        eohal = await Promise.resolve(eohal)
      } else {
        eohal = await __eo('xs').e(eohal)
      }

      let anigram = anitem
      let newItems = eohal.anify(anigram)

      return newItems
    }

    // .................. anify
    function anify (anitem) { // ok trace

      let eohal = anitem.eohal
      if (typeof (eohal) === 'object') {

        // eohal

      } else {
        eohal = __eo([eohal, 'eohal'])
      }

      console.assert(eohal, `eohal not defined`)
      let anima = anitem

      let newAnimas = []
      if (eohal) newAnimas = eohal.anify(anima)
      console.log('m.store anify newItems:', newAnimas)


      return newAnimas
    }

    // .................. gramifyDyn
    function gramifyDyn (anitem) {
      return muonAnitem.snapani(anitem)
        .then(snapped => muonAnitem.functorize(snapped))
        .then(anigram => (typeof (anitem.eohal) === 'object') ? Promise.resolve(anitem.eohal) : __eo('xs').e(anigram.eohal)
          .then(eohal => Promise.resolve(eohal.gramify(anigram))
            .then(newItems => {
              _apply({type: 'UPDANIGRAM', anigrams: newItems}) // UPDANIGRAM
              newItems.forEach(newItem => {
                let avatars = gavatars(newItem)

                avatars.forEach(avatar => {
                  avatar.eotim = anigram.eotim // eotim from anigram
                  avatar.eoric.uid = muonEoric.getuid(avatar) // uid from avatar
                  avatar.eoric.pid = newItem.eoric.uid // pid from newItem

                  gramify(avatar)
                })
              })
            })
          )
        )
    }
    function gramify (anitem) {
      let snapped = muonAnitem.snapani(anitem)
      let anigram = muonAnitem.functorize(snapped)
      let eohal = (typeof (anitem.eohal) === 'object')
        ? anitem.eohal
        : __eo([anitem.eohal, 'eohal']) // expected in __eo

      console.assert(eohal !== null, `eohal ${anigram.eohal} not found`)

      let newItems = []
      console.assert(eohal, `eohal not defined`)
      if (eohal) newItems = a(eohal.gramify(anigram))
      _apply({type: 'UPDANIGRAM', anigrams: newItems}) // UPDANIGRAM
      newItems.forEach(newItem => {
        let avatars = gavatars(newItem)
        avatars.forEach(avatar => {
          avatar.eotim = anigram.eotim // eotim from anigram
          avatar.eoric.uid = muonEoric.getuid(avatar) // uid from avatar
          avatar.eoric.pid = newItem.eoric.uid // pid from newItem

          gramify(avatar)
        })
      })
    }

    // ............................. ancestor
    let ancestor = function (anitem) {
      let uidSelf = anitem.eoric.uid
      let uidParent = anitem.eoric.pid

      let selfAnigram = uidSelf ? muonStore.findAnigramFromUid(uidSelf) : null
      let selfAnima = uidSelf ? muonStore.findAnimaFromUid(uidSelf) : null

      if (selfAnima !== undefined) return selfAnima

      // there can be an anima without anigram
      let parentAnigram = uidParent ? muonStore.findAnigramFromUid(uidParent) : null
      let parentAnima = uidParent ? muonStore.findAnimaFromUid(uidParent) : null

      if (!parentAnigram && !parentAnima) return null

      let anima = parentAnima || ancestor(parentAnigram)

      return anima
    }
    // ............................. animasInClass
    let animasInClass = item => {
      let eoric
      let qmany = 0
      if (item.eoric !== undefined) {
        eoric = item.eoric
      } else {
        if (typeof item === 'object') {
          eoric = item
        }
      }
      if (eoric !== undefined) {
        let anitems = enty.animas()
        qmany = anitems
          .filter(d => (d.eoric.gid === eoric.gid && d.eoric.cid === eoric.cid))
      }
      return qmany
    }
    // ............................. animasInClassHowMany
    let animasInClassHowMany = item => animasInClass(item).length

    // ............................. anigramsInClassHowMany
    let anigramsInClassHowMany = item => {
      let eoric
      let qmany = 0
      if (item.eoric !== undefined) {
        eoric = item.eoric
      } else {
        eoric = item
      }
      if (eoric !== undefined) {
        let anitems = enty.anigrams()
        qmany = anitems
          .filter(d => (d.gid === eoric.gid &&
                    d.cid === eoric.cid)).length
      }
      return qmany
    }
    // ............................. anianimasInGroupmasInGroupHowMany
    let animasInGroup = anima =>
      (anima === undefined)
        ? 0
        : enty.animasLive()
          .filter(d => d.eoric.gid === anima.eoric.gid)

    // ............................. animasInGroupHowMany
    let animasInGroupHowMany = anima => animasInGroup(anima).length

    // ............................. findAnima
    let findItem = (item, list) => {
      let anitems = list

      let res
      if (item) {
        if (typeof item === 'object' && item.eoric !== undefined) {
          let eoric = item.eoric
          res = findAnima(eoric)
        } else if (typeof item === 'object' && item.uid !== undefined) {
          res = anitems[item.uid]
        } else if (typeof item === 'object' && item.gid !== undefined) {
          let uid = muonEoric.idify(item.gid, item.cid, item.fid)


          res = anitems[uid]
        } else if (typeof item === 'string') {
          res = anitems[item]
        }
      }
      return res
    }
    // ............................. findAnima
    let findAnima = item => {
      let anitems = state.animas
      return findItem(item, anitems)
    }
    // ............................. findAnima
    let findAnigram = item => {
      let anitems = state.anigrams
      return findItem(item, anitems)
    }
    // .................. enty
    let enty = () => {}

    enty.apply = _apply
    enty.gramify = gramify
    enty.anify = anify

    enty.ancestor = ancestor

    enty.animasAll = () => Object.values(state.animas) // animas including eodelled
    enty.animasLive = () => Object.values(state.animas).filter(d => d.eodelled !== 1)
    enty.animas = () => enty.animasLive()
    enty.anigrams = () => Object.values(state.anigrams)
    enty.state = () => state

    enty.animasInGroup = animasInGroup
    enty.animasInGroupHowMany = animasInGroupHowMany
    enty.animasInClass = animasInClass
    enty.animasInClassHowMany = animasInClassHowMany

    enty.anigramsInClassHowMany = anigramsInClassHowMany

    enty.findFromUid = (uid, list) => list[uid]
    enty.findAnima = findAnima
    enty.findAnimaFromUid = uid => state.animas[uid]
    enty.findAnigram = findAnigram
    enty.findAnigramFromUid = uid => state.anigrams[uid]

    return enty
  }

  exports.muonStore = muonStore
}))
