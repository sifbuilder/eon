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
        let newAnigrams = muonProps.fa(action.anigrams)

        for (let i = 0; i < newAnigrams.length; i++) {
          if (newAnigrams[i] !== undefined) {
            let newItem = newAnigrams[i] // new anigram

            if (Array.isArray(newItem)) {
              newItem = newItem[0]
            }

            let uid = newItem.eoric.uid
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
          avatar.eoric.parentuid = item.eoric.uid
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
      let eohal = anitem.eohal
      if (typeof (eohal) === 'object') {
        eohal = await Promise.resolve(eohal)
      } else {
        eohal = await __mapper('xs').e(eohal)
      }

      let anigram = anitem
      let newItems = eohal.ween(anigram)

      return newItems
    }

    // .................. ween
    function ween (anitem) { // ok trace
      let eohal = anitem.eohal
      if (typeof (eohal) === 'object') {
        // eohal = eohal
      } else {
        eohal = __mapper(__mapper('xs').ceonize(eohal, 'eohal'))
      }

      let anigram = anitem
      let newItems = eohal.ween(anigram)

      return newItems
    }

    // .................. grammDyn
    function grammDyn (anitem) {
      return manitem.snapani(anitem)
        .then(snapped => manitem.functorize(snapped))
        .then(anigram => (typeof (anitem.eohal) === 'object') ? Promise.resolve(anitem.eohal) : __mapper('xs').e(anigram.eohal)
          .then(eohal => Promise.resolve(eohal.gramm(anigram))
            .then(newItems => {
              _apply({type: 'UPDANIGRAM', anigrams: newItems}) // UPDANIGRAM
              newItems.forEach(newItem => {
                let avatars = gavatars(newItem)

                avatars.forEach(avatar => {
                  avatar.eotim = anigram.eotim // eotim from anigram
                  avatar.eoric.uid = muonEoric.getuid(avatar) // uid from avatar
                  avatar.eoric.parentuid = newItem.eoric.uid // parentuid from newItem

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
      let eohal = (typeof (anitem.eohal) === 'object')
        ? anitem.eohal
        : __mapper(__mapper(__mapper('xs').ceonize(anigram.eohal, 'eohal'))) // expected in __mapper
      let newItems = muonProps.a(eohal.gramm(anigram))
      _apply({type: 'UPDANIGRAM', anigrams: newItems}) // UPDANIGRAM
      newItems.forEach(newItem => {
        let avatars = gavatars(newItem)
        avatars.forEach(avatar => {
          avatar.eotim = anigram.eotim // eotim from anigram
          avatar.eoric.uid = muonEoric.getuid(avatar) // uid from avatar
          avatar.eoric.parentuid = newItem.eoric.uid // parentuid from newItem

          gramm(avatar)
        })
      })
    }
    // .................. enty
    let enty = {}

    enty.apply = _apply
    enty.gramm = gramm
    enty.ween = ween

    enty.anigrams = () => Object.values(state.anigrams)
    enty.animasAll = () => Object.values(state.animas) // animas including eodelled
    enty.animasLive = () => Object.values(state.animas).filter(d => d.eodelled !== 1)
    enty.animas = Object.values(enty.animasLive)

    
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



    enty.findFromUid = (uid, list) => list[uid]
    enty.findAnigramFromUid = uid => state.anigrams[uid]
    enty.findAnimaFromUid = uid => state.animas[uid]

    return enty
  }

  exports.muonStore = muonStore
}))
