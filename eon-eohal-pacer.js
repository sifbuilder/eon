/**********************
 *    @eohalPacer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalPacer = global.eohalPacer || {})))
}(this, function (exports) {
  'use strict'

  // # eon-eohal-pacer
  // **create new items at init, on auto or upon event**

  // ### functions

  // * ##### _geojsor
  // usage: `_geojsor(@ani, @prob`
  // ani.pacer.initN
  // ani.pacer.eventN
  // ani.pacer.autoN
  // ani.pacer.autoP
  // ani.pacer.outtimed
  // ani.pacer.maxN
  // ani.pacer.geospan
  // ani.pacer.geoaad: {0,1} if 1, pace items are added to pacer (eg. LineString trace)
  // ani.pacer.geotype: {LineString}
  // ani.pacer.geobase: {geo, ere, pro}

  // ### methods

  // * ##### gramm
  // `@a.p.pacer.initSitus`  : situs for init items
  // `@a.p.pacer.autoSitus`  : situs for auto items, calls `m.stace.getLocus(this.stace, ani)`
  // usage: `eoload.pacer.autoSitus(anigram)`
  // autositus in zindex: `function(a) {return muonStace.getLocus(this.stace, ani) }` gets `ani.p.pacer.stance`
  // auto time is `a.p.eotim.unitPassed - a.p.pacer.outed`
  // `@a.p.pacer.eventSitus` : situs for event items
  // `count` new items to pacer from init, auto and event

  // `@a.p.pacer.fidder`  : new item `fid` identifier
  // `@a.p.pacer.geojsor(@anigram, @counter)` : gets new item

  // ## license
  // MIT

  async function eohalPacer (__mapper = {}) {
    let [
      ctlRayder,
      ctlWen,
      ctlVersor,
      eohalTurnform,
      muonEoric,
      muonGeom,
      muonStace,
      muonProps,
      muonProfier,
      muonProj3ct,
      muonGeoj,
    ] = await Promise.all([
      __mapper('xs').c('rayder'),
      __mapper('xs').c('wen'),
      __mapper('xs').c('versor'),
      __mapper('xs').e('turnform'),
      __mapper('xs').m('eoric'),
      __mapper('xs').m('geom'),
      __mapper('xs').m('stace'),
      __mapper('xs').m('props'),
      __mapper('xs').m('profier'),
      __mapper('xs').m('proj3ct'),
      __mapper('xs').m('geoj'),
    ])

    let muonStore = __mapper('muonStore')
    let renderSvg = __mapper('renderSvg')

    // ............................. pacer
    function eohale (anitem) {
      let newItems = []

      let eohal = anitem.eohal,
        eoload = anitem.eoload,
        eoric = anitem.eoric,
        eotim = anitem.eotim

      let pacer = eoload.pacer || {}, // pacer
        mousesignal = pacer.mousesignal || 0, // mousesignal
        geospan = pacer.geospan || 0, // geospan between paceitems
        geoaad = pacer.geoaad || 0, // geoaad paceitem to previous anitem
        geosort = pacer.geosort || 'anigram', // paceitem sort
        geoType = pacer.geotype || 'LineString', //
        base = pacer.geobase || 'eoform' //

      let uidAnima = muonEoric.getuid(eoric)
      let uidAnigram = muonEoric.getuid(eoric)
      let uidParent = anitem.parentuid
      let ricPreitem = (anitem.eoload.pacer.eoric !== undefined)
        ? anitem.eoload.pacer.eoric(anitem)
        : anitem.eoric
      let uidPreitem = muonEoric.getuid(ricPreitem)

      let animas = muonStore.animas()
      let anigrams = muonStore.anigrams()


      // the anima is the pacer anitem uid

      let anima = muonStore.findAnimaFromUid(uidAnima)

      // the anigram is the trace anigram

      let anigram = anitem


      // the parent anima

      let parentAnima = uidParent ? muonStore.findAnimaFromUid(uidParent) : null

      let preAnima = uidPreitem ? muonStore.findAnimaFromUid(uidPreitem) : null


      // count: key:items pairs to be generated by pacer
      let count = {}

      // if mouse up reset the controls on svg

      // if (ctlRayder.mouse() && ctlRayder.mouse().type === 'mouseup') {
      // ctlWen.reset(renderSvg.svg())
      // ctlVersor.reset(renderSvg.svg())
      // }

      // if mouse grabbed, enable event count, pacer.eventN

      let grabbed = ctlRayder.grabbed()
      if (grabbed !== false) { //
        count.event = Math.floor(pacer.eventN) // if in state or was event
        count.grabbed = grabbed
      }

      // init, pacer.initN

      if (pacer.eoinited === undefined || pacer.eoinited !== 1) {
        count.init = Math.floor(pacer.initN) // count INIT
      }

      // cycletime since last outed item, relevant if auto

      let cycletime = eotim.unitPassed - (pacer.outed || 0)

      // if the cycletime is longer than auto pace
      //  and unitPassed is beyong autoT ...

      if (cycletime >= pacer.autoP &&
            eotim.unitPassed > (pacer.autoT || 0)
      ) {
        count.auto = Math.floor(pacer.autoN) // count AUTO

        let paceanima
        if (anima !== undefined) {
          paceanima = anima // pacer ir nanima
        } else {
          paceanima = parentanima // pacer in avatar
        }

        // set eoinited: the anitem has started the pacer

        paceanima.eoload.pacer.eoinited = 1 //  eoinited

        // set pacer.outed: item was outed at eotim.unitPassed time

        paceanima.eoload.pacer.outed = eotim.unitPassed // updated with anima

        // if in auto mode, pace on each cycle
        // save anitem to preserve eoinited and outed

        let animas = Array.of(paceanima)

        // save anima .......... to persist eoinited and outed

        muonStore.apply({type: 'UPDANIMA', caller: 'h.pacer', animas: animas})
      }


      // count: eg: {init:4, auto:1, event:3}


      if (Object.keys(count).length > 0) { // on pace count, eg {init: 6, auto: 1}
        // for each key in count

        for (let counter = 0; counter < Object.keys(count).length; counter++) {
          // key is the sort of count { init, auto, event }

          let key = Object.keys(count)[counter]

          // qitems is the number of items to be paced
          // generate qitems items of type key, eg. 6 (at init, on auto, when event)

          let qitems = count[key]

          // count, key, qitems, kq

          for (let i = 0; i < qitems; i++) {
            let props = { count: count, key: key, counter: i }

            let newItem

            if (anitem.eoload.pacer.geosort === 'anima') {

              newItem = muonProps.clone(anima) // anima

            } else {

              newItem = muonProps.clone(anigram) // anigram

            }

            delete newItem.eoload

            // NOT pacer.AAD if not pacer.add, pacer generates anitems
            // eofold is Feature

            // complete newItem definition

            let ownProps = Object.getOwnPropertyNames(pacer)
            for (let prop of ownProps) {
              if (newItem[prop] !== undefined) {
                let newpropval = muonProps.v(pacer[prop], anitem, props)
                newItem[prop] = newpropval
              }
            }
  


            // md: anima is stored

            let eohal = __mapper(__mapper('xs').ceonize(newItem.eohal, 'eohal'))
            if (geosort === 'anima') {

              // md: eohal.ween
              let newItemsInCount = eohal.ween(newItem)

              newItemsInCount = muonProps.a(newItemsInCount)
              newItems = [...newItems, ...newItemsInCount] // add items
              muonStore.apply({type: 'UPDANIMA', caller: 'h.pacer', animas: newItems})

            } else {

              // md: eohal.gramm
              let newItemsInCount = muonProps.a(eohal.gramm(newItem))

              newItems = [...newItems, ...newItemsInCount] // add items

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
        return Array.of(anitem)
      } else {
        return eohale(anitem)
      }
    }

    let eohal = {
      ween: anitem => ween(anitem),
      gramm: anitem => gramm(anitem),
    }

    // ....................... enty
    let enty = eohal

    return enty
  }

  exports.eohalPacer = eohalPacer
}))
