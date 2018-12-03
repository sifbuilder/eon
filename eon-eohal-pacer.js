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
  // ... the pacer works on animas or anigrams depending on pacer.geosort
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
  // ... ani.pacer.geoaad: {0,1} if 1, pace items are added to pacer (eg. LineString trace)
  // ... ani.pacer.geotype: {LineString}
  // ... ani.pacer.geobase: {geo, ere, pro}
  // ...
  // ... ### methods
  // ...
  // ... * ##### gramm
  // ... `@a.p.pacer.initSitus`  : situs for init items
  // ... `@a.p.pacer.autoSitus`  : situs for auto items, calls `m.stace.getLocus(this.stace, ani)`
  // ... usage: `eoload.pacer.autoSitus(anigram)`
  // ... autositus in zindex: `function(a) {return muonStace.getLocus(this.stace, ani) }` gets `ani.p.pacer.stance`
  // ... auto time is `a.p.eotim.unitPassed - a.p.pacer.eoouted`
  // ... `@a.p.pacer.eventSitus` : situs for event items
  // ... `count` new items to pacer from init, auto and event
  // ...
  // ... `@a.p.pacer.fidder`  : new item `fid` identifier
  // ... `@a.p.pacer.geojsor(@anigram, @counter)` : gets new item

  async function eohalPacer (__mapper = {}) {
    let [
      ctlRayder,
      muonAnitem,
      muonEoric,
      muonEotim,
      muonGeom,
      muonGeoj,
      muonProps,
    ] = await Promise.all([
      __mapper('xs').c('rayder'),
      __mapper('xs').m('anitem'),
      __mapper('xs').m('eoric'),
      __mapper('xs').m('eotim'),
      __mapper('xs').m('geom'),
      __mapper('xs').m('geoj'),
      __mapper('xs').m('props'),
    ])

    let muonStore = __mapper('muonStore')

    let state = {}

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

    // ... pacer
    // ... @anitem : anima

    function eohale (anitem) {
      let newItems = []

      let epsilon = 1e-3

      let eohal = anitem.eohal,
        eoric = anitem.eoric,
        eotim = anitem.eotim,
        eoload = anitem.eoload

      // ... default pacer properties:
      // ... geospan: epsilon  - span between two paceitems
      // ... geoaad:       0   - add paceitems to preanitem
      // ... geosort: anigram  - generated paceitem {anigram, anima}
      // ... geotype: LineString  - type of geojson geometry
      // ... geobase: eoform   - geoform in change of model projections

      let pacer = eoload.pacer || {},
        geospan = pacer.geospan || epsilon,
        geoaad = pacer.geoaad || 0,
        geosort = pacer.geosort || 'anigram',
        geotype = pacer.geotype || 'LineString',
        geobase = pacer.geobase || 'eoform'

      let uidAnima = muonEoric.getuid(eoric)
      let uidAnigram = muonEoric.getuid(eoric)
      let uidParent = anitem.eoric.pid

      let ricPreitem = anitem.eoric
      let uidPreitem = muonEoric.getuid(ricPreitem)

      let animas = muonStore.animas()
      let anigrams = muonStore.anigrams()

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
      // ... anitem and parentitem may be anima
      // ... or anigram, eg. anima.avatar(nat).avatar(pacedline)

      // let anigram = muonAnitem.snapani(anitem)
      let anigram = anitem
      let parentAnigram = uidParent ? muonStore.findAnigramFromUid(uidParent) : null
      let parentAnima = uidParent ? muonStore.findAnimaFromUid(uidParent) : null

      let preAnima = uidPreitem ? muonStore.findAnimaFromUid(uidPreitem) : null
      let anima = muonStore.findAnimaFromUid(uidAnima)

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

      let hostUid, hostAnima // host - is ancestor anima

      hostAnima = ancestor(anitem)

      hostUid = hostAnima.eoric.uid

      let pacerUid, pacerAnitem // paced
      if (geosort === 'anima') {
        if (parentAnima) {
          pacerAnitem = parentAnima
        } else {
          pacerAnitem = anima
        }
      } else {
        pacerAnitem = anigram
      }
      pacerUid = pacerAnitem.eoric.uid

      console.assert(hostAnima !== undefined)
      console.assert(pacerAnitem !== undefined)

      // ... anima has pacer in eoload or in avatar
      // ... count: key:items pairs to be generated by pacer
      // ... if mouse grabbed, enable event count, pacer.eventN
      // ... check distance to previous location

      let count = {}
      let grabbed
      grabbed = ctlRayder.grabbed()

      let dist = state.grabbed === undefined
        ? Infinity
        : muonGeom.distance3d(state.grabbed, grabbed)

      if (grabbed && dist > geospan) { //
        state.grabbed = grabbed
        count.event = Math.floor(pacer.eventN) // if in state or was event
        count.grabbed = state.grabbed
      }

      // ... if not eoinited enable pacer init (pacer.initN), else ignore

      if (hostAnima.eoinited === undefined || hostAnima.eoinited[pacerUid] === undefined) {
        if (eotim.unitPassed >= (pacer.initT || 0)) {
          count.init = Math.floor(pacer.initN) // count INIT

          hostAnima.eoinited = (hostAnima.eoinited === undefined)
            ? {[pacerUid]: eotim.unitPassed}
            : Object.assign(hostAnima.eoinited, {[pacerUid]: eotim.unitPassed})
        }
      }

      // ... cycletime since last eoouted item, relevant if auto
      // ... if the cycletime is longer than auto pace
      // ...  and unitPassed is beyong autoT ...
      // ...  then process autoT
      // ... pacerUid is the paced anitem uid
      // ... if pacer is avatar, each is inited.
      // ... eoinited is set per pacer to eotim.unitPassed
      // ... set pacer.eoouted: item was eoouted at eotim.unitPassed time
      // ... if in auto mode, pace on each cycle

      let eoouted = (hostAnima.eoouted && hostAnima.eoouted[pacerUid])
        ? hostAnima.eoouted[pacerUid]
        : 0
      let cycletime = eotim.unitPassed - eoouted

      let autoT = pacer.autoT || 0
      let autoP = pacer.autoP || 0
      let autoN = pacer.autoN

      if (eotim.unitPassed >= autoT) {
        if (cycletime > autoP) {
          count.auto = Math.floor(autoN) //    AUTO

          hostAnima.eoouted = (hostAnima.eoouted === undefined)
            ? {[pacerUid]: eotim.unitPassed}
            : Object.assign(hostAnima.eoouted, {[pacerUid]: eotim.unitPassed})
        }
      }
      if (1 && 1) console.log(' ********* ')

      if (geosort === 'anima') {
        // z.419b ani.ava(pacer)
        // update host anima
        muonStore.apply({type: 'UPDANIMA', caller: 'h.pacer', animas: Array.of(hostAnima)})
      } else {
        // newItems.push(hostAnima) // host anima updated with pacer output // _e_tbc
      }

      // ... COUNT items
      // ...   eg: {init:4, auto:1, event:3}
      // ...   init runs once
      // ...   auto runs on each cycle
      // ...   event runs on mouse event

      if (Object.keys(count).length > 0) {
        for (let counter = 0; counter < Object.keys(count).length; counter++) {
          // ... if count items to pace
          // ... for each type of pace count, eg {init: 6, auto: 1}
          // ...    key is the sort of count { init, auto, event }
          // ...    qitems is the number of items to be paced
          // ... generate qitems items of type key, eg. 6 (at init, on auto, when event)

          let key = Object.keys(count)[counter]
          let qitems = count[key]
          for (let i = 0; i < qitems; i++) {
            let props = {
              count: count,
              key: key,
              counter: i,
            }

            // ... for each count newitem ...
            // ...   if pacer to pace animas , newitem is pacerAnitem
            // ...     if anigrams , newitem is anigram
            // ... remove eoload from newItem
            // ... pid is the anima uid
            // ...
            // ... then override newItem propeties with pacer functors

            let newItem = muonProps.clone(pacerAnitem) // anigram

            let elapsed = newItem.eotim.elapsed
            newItem.eotim.t0 = newItem.eotim.unitTime * (newItem.eotim.t1 - newItem.eotim.t0)
            newItem.eotim = muonEotim.timing(newItem.eotim, elapsed)

            delete newItem.eoload
            delete newItem.avatars

            // newItem.eoric.pid = uidAnima
            let ownProps = Object.getOwnPropertyNames(pacer)
            for (let prop of ownProps) {
              if (newItem[prop] !== undefined) {
                let newpropval = muonProps.v(pacer[prop], anigram, props)
                newItem[prop] = newpropval
              }
            }

            // ... define newitem eohal
            // ... if paced anima, eohal.ween the newitem, then store
            // ... if paced anigram, eohal.gramm the newitem, then return

            let eohal = __mapper(__mapper('xs').ceonize(newItem.eohal, 'eohal'))

            let newItemsInCount
            if (geosort === 'anima') {
              newItemsInCount = eohal.ween(newItem)
            } else {
              newItemsInCount = eohal.gramm(newItem)
            }

            newItemsInCount = muonProps.a(newItemsInCount)
            newItems = [...newItems, ...newItemsInCount]
            if (geosort === 'anima') {
              muonStore.apply({type: 'UPDANIMA', caller: 'h.pacer', animas: newItems})
            }
          }
        }
      }

      return newItems
    }

    // ............................. ween
    function ween (anitem) {
      if (anitem.eoload.pacer.geosort === 'anima') {
        return eohale(anitem)
      } else {
        return Array.of(anitem)
      }
    }

    // ............................. gramm
    function gramm (anitem) {
      if (anitem.eoload.pacer.geosort === 'anima') {
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

    return enty
  }

  exports.eohalPacer = eohalPacer
}))
