/**********************
 *    @eohalPacer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalPacer = global.eohalPacer || {})))
}(this, function (exports) {
  'use strict'

  // ... **create new items at init, on auto or upon event**
  // ... the pacer works on animas or anigrams depending on pacer.pacedAnisort
  // ... anigrams are gramm-eohalled with the paced halo and returned
  // ... animas are ween-eohalled with the paced halo and saved to the store
  // ...
  // ... ### functions
  // ...
  // ... * ##### _geojsor
  // ... usage: `_geojsor(@ani, @prob`
  // ... ani.pacer.initN
  // ... ani.pacer.eventN
  // ... ani.pacer.autoN
  // ... ani.pacer.autoP
  // ... ani.pacer.outtimed
  // ... ani.pacer.maxN
  // ... ani.pacer.geospan
  // ... ani.pacer.addItemToPacer: {0,1} if 1, pace items are added to pacer (eg. LineString trace)
  // ... ani.pacer.geotype: {LineString}
  // ... ani.pacer.basePaceOnAniView: {geo, ere, pro}
  // ...
  // ... ### methods
  // ...
  // ... * ##### gramm
  // ... `@a.p.pacer.initSitus`  : situs for init items
  // ... `@a.p.pacer.autoSitus`  : situs for auto items, calls `m.stace.getLocus(this.stace, ani)`
  // ... usage: `eoload.pacer.autoSitus(anigram)`
  // ... autositus in zindex: `function(a) {return muonStace.getLocus(this.stace, ani) }` gets `ani.p.pacer.stance`
  // ... auto time is `a.p.eotim.unPassed - a.p.pacer.eoouted`
  // ... `@a.p.pacer.eventSitus` : situs for event items
  // ... `count` new items to pacer from init, auto and event
  // ...
  // ... `@a.p.pacer.fidder`  : new item `fid` identifier
  // ... `@a.p.pacer.geojsor(@anigram, @counter)` : gets new item

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

    // ............................. getCounter
    function getCounter (data = {}, context = {}) {
      let res = {}
      let count = {}

      let pacer = context.pacer
      let eotim = context.eotim
      let geospan = context.geospan
      let hostAnitem = context.hostAnitem
      let pacedUid = context.pacedUid

      let newgrabbed = data.newgrabbed

      let dist = (!context.grabbed)
        ? Infinity
        : muonGeom.distance3d(context.grabbed, newgrabbed)

      if (newgrabbed !== false) {
        if (dist > geospan) { //
          context.grabbed = newgrabbed
          count.event = Math.floor(pacer.eventN) // EVEMT
          count.grabbed = context.grabbed
        }
      }

      if (hostAnitem.eoinited === undefined || hostAnitem.eoinited[pacedUid] === undefined) {
        if (eotim.unPassed >= (pacer.initT || 0)) {
          count.init = Math.floor(pacer.initN) // INIT
        }
      }

      let eoouted = (hostAnitem.eoouted && hostAnitem.eoouted[pacedUid])
        ? hostAnitem.eoouted[pacedUid]
        : 0
      let cycletime = eotim.unPassed - eoouted

      let autoT = pacer.autoT || 0
      let autoP = pacer.autoP || 0
      let autoN = pacer.autoN

      if (eotim.unPassed >= autoT) {
        if (cycletime > autoP) {
          count.auto = Math.floor(autoN) //    AUTO
        }
      }

      res.count = count
      return res
    }
    // ............................. getNewItems
    let getNewItems = function (data = {}, context = {}) {

      let counter = data.i
      let count = data.count
      let key = data.key

      let pacedAnitem = context.pacedAnitem
      let pacedAnisort = context.pacedAnisort
      let pacer = context.pacer

      let props = {count, key, counter}

      let newItem = muonProps.clone(pacedAnitem) // anigram

      let unElapsed = newItem.eotim.unElapsed
      newItem.eotim.t0 = unElapsed
      newItem.eotim.unStart = unElapsed

      newItem.eotim = muonEotim.timing(newItem.eotim, newItem.eotim.msElapsed)

      delete newItem.eoload
      delete newItem.avatars

      // newItem.eoric.pid = uidAnima
      let ownProps = Object.getOwnPropertyNames(pacer)
      for (let prop of ownProps) {
        if (newItem[prop] !== undefined) {
          let newpropval = muonProps.v(pacer[prop], pacedAnitem, props)
          newItem[prop] = newpropval
        }
      }

      let eohal = typeof newItem.eohal === 'object'
        ? newItem.eohal
        : __eo([newItem.eohal, 'eohal'])

      let newItemsInCount
      if (pacedAnisort === 'anima') {
        newItemsInCount = eohal.ween(newItem)
      } else if (pacedAnisort === 'anigram') {
        newItemsInCount = eohal.gramm(newItem)
      }

      return {newItems: muonProps.a(newItemsInCount)}
    }
    // ............................. getitems
    let getitems = function (data, context) {
      let hostAnitem, pacedAnitem

      let anitem = context.anitem
      let pacedAnisort = context.pacedAnisort || 'anigram'
      console.assert(pacedAnisort === 'anima' || pacedAnisort === 'anigram')

      let uidParent = anitem.eoric.pid

      if (pacedAnisort === 'anima') { // is anima
        let parentAnima = uidParent ? muonStore.findAnimaFromUid(uidParent) : null
        if (parentAnima === null) { // anima has no parent
          hostAnitem = anitem // hostAnima is anitem (self)
          pacedAnitem = anitem.eoload.pacer.anima // pacedAnima is in eoload.pacer.anima
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
          pacedAnitem = anitem.eoload.pacer.anigram // pacedAnigram is in eoload.pacer.anigram
        }
      }

      return {hostAnitem, pacedAnitem}
    }

    // ............................. eohale
    // ... @anitem : anitem

    function eohale (anitem) {
      let epsilon = 1e-3

      // ... default pacer properties:
      // ... geospan: epsilon  - span between two paceitems
      // ... addItemToPacer:       0   - add paceitems to preanitem
      // ... pacedAnisort: anigram  - generated paceitem {anigram, anima}
      // ... geotype: LineString  - type of geojson geometry
      // ... basePaceOnAniView: eoform   - geoform in change of model projections

      let eoric = anitem.eoric,
        eotim = anitem.eotim,
        eoload = anitem.eoload

      let pacer = eoload.pacer || {},
        geospan = pacer.geospan || epsilon,
        pacedAnisort = pacer.pacedAnisort || 'anigram',
        geotype = pacer.geotype || 'LineString',
        addItemToPacer = pacer.addItemToPacer || 0,
        basePaceOnAniView = pacer.basePaceOnAniView || 'eoform'

      pacedAnisort = pacedAnisort || 'anigram'
      console.assert(pacedAnisort === 'anima' || pacedAnisort === 'anigram')

      // -------------------  // HOST/PACED

      let uidParent = anitem.eoric.pid
      let uidPreitem = muonEoric.getuid(eoric)

      let preAnima = uidPreitem ? muonStore.findAnimaFromUid(uidPreitem) : null
      let preAnigram = uidPreitem ? muonStore.findAnigramFromUid(uidPreitem) : null

      let parentAnigram = uidParent ? muonStore.findAnigramFromUid(uidParent) : null
      let parentAnima = uidParent ? muonStore.findAnimaFromUid(uidParent) : null

      let pacedUid, pacedAnitem // paced

      if (pacedAnisort === 'anima') { // pace anima
        if (parentAnima) {
          pacedAnitem = parentAnima // host is parent
        } else {
          pacedAnitem = preAnima || anitem // host is self
        }
      } else { // pace anigram
        if (parentAnigram) {
          pacedAnitem = parentAnigram // host is parent
        } else {
          pacedAnitem = preAnigram || anitem // host is self
        }
      }

      pacedUid = pacedAnitem.eoric.uid
      console.assert(pacedAnitem !== undefined)

      let hostAnima = pacedAnitem // gline_cline_fline

      // let items = getitems({}, {anitem, pacedAnisort})
      // let hostAnitem = items.hostAnitem
      // let pacedAnitem = items.pacedAnitem
      // let pacedUid = pacedAnitem.eoric.uid
      
      let hostAnitem = hostAnima

      // -------------------  // COUNT

      let newgrabbed = ctlRayder.getGrabbed()
      let count = {}
      let data = {newgrabbed}
      let context = {pacer, eotim, geospan, hostAnitem, pacedUid}
      count = getCounter(data, context).count

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
            let data = {count, key, i}
            let context = {pacedAnitem, pacedAnisort, pacer}
            let newItemsInCount = getNewItems(data, context).newItems

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

    // ............................. ween
    function ween (anitem) {
      console.assert(anitem.eoload.pacer !== undefined, `anitem.eoload.pacer is undefined`)
      if (anitem.eoload.pacer.pacedAnisort === 'anima') {
        let newitems = eohale(anitem)
        return newitems
      } else {
        let newitems = Array.of(anitem)
        return newitems
      }
    }

    // ............................. gramm
    function gramm (anitem) {
      console.assert(anitem.eoload.pacer !== undefined, `anitem.eoload.pacer is undefined`)
      if (anitem.eoload.pacer.pacedAnisort === 'anima') {
        let newitems = Array.of(anitem)
        return newitems
      } else {
        let newitems = eohale(anitem)
        return newitems
      }
    }

    let eohal = {
      ween: anitem => ween(anitem),
      gramm: anitem => gramm(anitem),
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
