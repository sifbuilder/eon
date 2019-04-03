/**********************
 *    @eohalPacer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalPacer = global.eohalPacer || {})))
}(this, function (exports) {
  'use strict'


  async function eohalPacer (__eo = {}) {
    let [
      ctlRayder,
      muonAnitem,
      muonEoric,
      muonEotim,
      muonGeom,
      muonGeoj,
      muonProps,
    ] = await Promise.all([
      __eo('xs').c('rayder'),
      __eo('xs').m('anitem'),
      __eo('xs').m('eoric'),
      __eo('xs').m('eotim'),
      __eo('xs').m('geom'),
      __eo('xs').m('geoj'),
      __eo('xs').m('props'),
    ])

    let muonStore = __eo('muonStore')
    ctlRayder.control()
    let state = {}

    // ... pace models:
    // ...   1 anima paces animas
    // ...   2 anima has avatar that paces anigrams
    // ...   3 anima paces anigrams
    // ...   4 halo creates anima with pacer
    // ...   5 halo creates anigram with pacer
    // ...   6 animas has avatar that has avatar that is pacer
    // ...
    // ...    h.fourier creates anima
    // ...
    // ... pacerAnitem is the host
    // ... it may be parentitem or anitem
    // ... it may be anima or anigram
    // ...    eg. anima.avatar(nat).avatar(pacedline)

    // ... hostUid is the key for eoinited and eoouted
    // ... if avatar, only parent anima is defined
    // ... hostUid is then parent anima uid

    // ... 720a rhyno trace avatar of nat avatar
    // ...    host: ancestor anima
    // ...    pacer: pacer_pacer_pacer

    // ... 401i _pacer(_nat anima)
    // ...    host: pacer_pacer_pacer
    // ...    pacer: pacer_pacer_pacer

    // ... 401f _pacer(_nat anima)
    // ...    host: pacer_pacer_pacer
    // ...    pacer: pacer_pacer_pacer

    // ... 419l  sol with avatar pacer of nat anigrams
    // ...    _sol.avatar(_pacer(_nat anigram))
    // ...    anima is undefined
    // ...    parent anima is pacer
    // ...    the source is anigram
    // ...    parentAnigram is nat, anigram is trace

    // ............................. getitems
    let getitems = function (data, context) {
      let anitem = data.anitem
      let pacedAnisort = data.pacedAnisort
      console.assert(pacedAnisort === 'anima' || pacedAnisort === 'anigram')

      let uidParent = anitem.eoric.pid

      let hostAnitem, pacedAnitem
      if (pacedAnisort === 'anima') { // is anima
        let parentAnima = uidParent ? muonStore.findAnimaFromUid(uidParent) : null
        if (parentAnima === null) { // anima has no parent
          hostAnitem = anitem // hostAnima is anitem (self)
          // pacedAnitem = anitem.eoload.pacer.anima // pacedAnima is in eoload.pacer.anima
          pacedAnitem = anitem
        }
        if (parentAnima !== null) { // anima has parent
          console.assert(parentAnima === null, `pacer anima should not have parent`)
        }
      }

      if (pacedAnisort === 'anigram') { // is anigram - avatar
        let parentAnigram = uidParent ? muonStore.findAnigramFromUid(uidParent) : null
        if (parentAnigram === null) { // anigram has no parent
          hostAnitem = anitem // hostAnima is anitem (self)
          pacedAnitem = anitem.eoload.pacer.anigram // pacedAnigram is in eoload.pacer.anigram
        }
        if (parentAnigram !== null) { // anima has parent
          hostAnitem = parentAnigram // hostAnigram is parent anitem
          // pacedAnitem = anitem.eoload.pacer.anigram // pacedAnigram is in eoload.pacer.anigram
          pacedAnitem = anitem
        }
      }

      return {hostAnitem, pacedAnitem}
    }
    // ............................. getCounter
    function getCounter (data = {}, context = {}) {
      let eotim = data.eotim
      let geospan = data.geospan
      let hostAnitem = data.hostAnitem
      let pacedUid = data.pacedUid
      let newgrabbed = data.newgrabbed
      let bypacer = data.bypacer

      let count = {}

      let dist = (!data.grabbed)
        ? Infinity
        : muonGeom.distance3d(data.grabbed, newgrabbed)

      if (newgrabbed !== false) {
        if (dist > geospan) { //
          data.grabbed = newgrabbed
          count.event = Math.floor(bypacer.eventN) // EVEMT
          count.grabbed = data.grabbed
        }
      }

      if (hostAnitem.eoinited === undefined || hostAnitem.eoinited[pacedUid] === undefined) {
        if (eotim.unPassed >= (bypacer.initT || 0)) {
          count.init = Math.floor(bypacer.initN) // INIT
        }
      }

      let eoouted = (hostAnitem.eoouted && hostAnitem.eoouted[pacedUid])
        ? hostAnitem.eoouted[pacedUid]
        : 0
      let cycletime = eotim.unPassed - eoouted

      let autoT = bypacer.autoT || 0
      let autoP = bypacer.autoP || 0
      let autoN = bypacer.autoN

      if (eotim.unPassed >= autoT) {
        if (cycletime > autoP) {
          count.auto = Math.floor(autoN) //    AUTO
        }
      }

      return {count}
    }

    // ............................. getNewItems
    let getNewItems = function (data = {}, context = {}) {
      let counter = data.i
      let count = data.count
      let key = data.key
      let pacedAnitem = data.pacedAnitem
      let pacedAnisort = data.pacedAnisort
      let pacedfields = data.pacedfields

      let props = {count, key, counter}

      let newItem = muonProps.clone(pacedAnitem)

      let unElapsed = newItem.eotim.unElapsed
      newItem.eotim.t0 = unElapsed
      newItem.eotim.unStart = unElapsed

      newItem.eotim = muonEotim.timing(newItem.eotim, newItem.eotim.msElapsed)

      delete newItem.eoload
      delete newItem.avatars

      // newItem.eoric.pid = uidAnima
      let ownProps = Object.getOwnPropertyNames(pacedfields)
      for (let prop of ownProps) {
        if (newItem[prop] !== undefined) {
          let newpropval = muonProps.v(pacedfields[prop], pacedAnitem, props)
          newItem[prop] = newpropval
        }
      }

      let eohal = typeof newItem.eohal === 'object'
        ? newItem.eohal
        : __eo([newItem.eohal, 'eohal'])

      let newItemsInCount
      if (pacedAnisort === 'anima') {
        newItemsInCount = eohal.anify(newItem)
      } else if (pacedAnisort === 'anigram') {
        newItemsInCount = eohal.gramify(newItem)
      }

      return {newItems: muonProps.a(newItemsInCount)}
    }

    // ............................. eohale
    // ... @anitem : anitem

    function eohale (anitem) {
      let epsilon = 1e-3

      let eotim = anitem.eotim,
        eoload = anitem.eoload

      let pacer = eoload.pacer || {}
      let bypacer = eoload.pacer.bypacer || {},
        geospan = bypacer.geospan || epsilon, // span between two paceitems
        pacedAnisort = bypacer.pacedAnisort || 'anigram', // generated paceitem {anigram, anima}
        geotype = bypacer.geotype || 'LineString', //  type of geojson geometry
        addItemToPacer = bypacer.addItemToPacer || 0, // add paceitems to preanitem
        basePaceOnAniView = bypacer.basePaceOnAniView || 'eoform' // geoform projections

      let pacedfields = pacer.anima

      console.assert(pacedAnisort === 'anima' || pacedAnisort === 'anigram')

      // -------------------  // HOST/PACED

      let items = getitems({anitem, pacedAnisort})
      let hostAnitem = items.hostAnitem
      let pacedAnitem = items.pacedAnitem
      let pacedUid = pacedAnitem.eoric.uid

      // -------------------  // COUNT

      let newgrabbed = ctlRayder.getGrabbed()
      let data = {newgrabbed, bypacer, eotim, geospan, hostAnitem, pacedUid}
      let count = getCounter(data).count

      // -------------------  // UPD HOST ANIMA
      if (hostAnitem.eoinited === undefined) {
        hostAnitem.eoinited = {[pacedUid]: eotim.unPassed}
      } else {
        hostAnitem.eoinited = Object.assign(hostAnitem.eoinited, {[pacedUid]: eotim.unPassed})
      }

      // -------------------  // COUNT
      if (count.auto > 0) {
        if (hostAnitem.eoouted === undefined) {
          hostAnitem.eoouted = {[pacedUid]: eotim.unPassed}
        } else {
          hostAnitem.eoouted = Object.assign(hostAnitem.eoouted, {[pacedUid]: eotim.unPassed})
        }
      }

      // -------------------------- eostore host
      if (pacedAnisort === 'anima') { // z.419b ani.ava(pacer)
        muonStore.apply({type: 'UPDANIMA', caller: 'h.pacer', animas: Array.of(hostAnitem)})
      }

      let newItems = []
      if (Object.keys(count).length > 0) {
        for (let counter = 0; counter < Object.keys(count).length; counter++) {
          let key = Object.keys(count)[counter]
          let qitems = count[key]

          for (let i = 0; i < qitems; i++) {
            let data = {count, key, i, pacedAnitem, pacedAnisort, pacedfields}
            let newItemsInCount = getNewItems(data).newItems

            // -------------------------- eostore paced
            if (pacedAnisort === 'anima') {
              muonStore.apply({type: 'UPDANIMA', caller: 'h.pacer', animas: newItemsInCount})
            }
            newItems = [...newItems, ...newItemsInCount]
          }
        }
      }
      return newItems
    }

    // ............................. anify
    function anify (anitem) {
      console.assert(anitem.eoload.pacer !== undefined, `anitem.eoload.pacer is undefined`)
      if (anitem.eoload.pacer.bypacer.pacedAnisort === 'anima') {
        let newitems = eohale(anitem)
        return newitems
      } else {
        let newitems = Array.of(anitem)

        return newitems
      }
    }

    // ............................. gramify
    function gramify (anitem) {
      console.assert(anitem.eoload.pacer !== undefined, `anitem.eoload.pacer is undefined`)
      if (anitem.eoload.pacer.bypacer.pacedAnisort === 'anima') {
        let newitems = []
        return newitems
      } else {
        let newitems = eohale(anitem)
        return newitems
      }
    }

    let eohal = {
      anify: anitem => anify(anitem),
      gramify: anitem => gramify(anitem),
    }

    // ....................... enty
    let enty = eohal
    enty.grabbed = _ => _ !== undefined ? state.grabbed = _ : state.grabbed
    enty.getCounter = getCounter
    enty.getNewItems = getNewItems

    return enty
  }

  exports.eohalPacer = eohalPacer
}))
