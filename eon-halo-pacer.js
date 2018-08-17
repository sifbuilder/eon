/**********************
 *    @haloPacer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloPacer = global.haloPacer || {})))
}(this, function (exports) {
  'use strict'

  // # eon-halo-pacer
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
  // ani.pacer.span
  // ani.pacer.aad: {0,1} if 1, pace items are added to pacer (eg. LineString trace)
  // ani.pacer.type: {LineString}
  // ani.pacer.base: {geo, ere, pro}

  // ### methods

  // * ##### gramm
  // `@a.p.pacer.initSitus`  : situs for init items
  // `@a.p.pacer.autoSitus`  : situs for auto items, calls `m.stace.getLocus(this.stace, ani)`
  // usage: `payload.pacer.autoSitus(anigram)`
  // autositus in zindex: `function(a) {return mstace.getLocus(this.stace, ani) }` gets `ani.p.pacer.stance`
  // auto time is `a.p.tim.unitPassed - a.p.pacer.outed`
  // `@a.p.pacer.eventSitus` : situs for event items
  // `count` new items to pacer from init, auto and event

  // `@a.p.pacer.fidder`  : new item `fid` identifier
  // `@a.p.pacer.geojsor(@anigram, @counter)` : gets new item

  // ## license
  // MIT

  async function haloPacer (__mapper = {}) {
    let [
      mric,
      mgeom,
      crayder,
      cwen,
      cversor,
      hent,
      mstace,
      mprops,
      mprofier,
      mproj3ct,
    ] = await Promise.all([
      __mapper('xs').m('ric'),
      __mapper('xs').m('geom'),
      __mapper('xs').c('rayder'),
      __mapper('xs').c('wen'),
      __mapper('xs').c('versor'),
      __mapper('xs').h('ent'),
      __mapper('xs').m('stace'),
      __mapper('xs').m('props'),
      __mapper('xs').m('profier'),
      __mapper('xs').m('proj3ct'),
    ])

    let mstore = __mapper('muonStore')
    let rsvg = __mapper('renderSvg')


    // ............................. pacer
    async function pacer (anitem) {
      let newItems = []

      let halo = anitem.halo,
        payload = anitem.payload,
        ric = payload.ric,
        tim = payload.tim

      let pacer = payload.pacer || {}, // pacer
        mousesignal = pacer.mousesignal || 0, // mousesignal
        span = pacer.span || 0, // span between items
        aad = pacer.aad || 0, // aad item to previous item
        itemsort = pacer.itemsort || "anigram", // pace items
        geoType = pacer.type || "LineString", //
        base = pacer.base || "geo" //

      // count: key:items pairs to be generated by pacer
      let count = {}

      //
      // if mouse up reset the controls on svg
      //
      if (crayder.mouse() && crayder.mouse().type === "mouseup") {
        cwen.reset(rsvg.svg())
        cversor.reset(rsvg.svg())
      }


      // if mouse grabbed, enable event count, pacer.eventN
      if (crayder.grabbed()) { //
        count.event = Math.floor(pacer.eventN) //  if in state or was event
      }


      // init, pacer.initN
      if (pacer.inited === undefined || pacer.inited !== 1) {
        count.init = Math.floor(pacer.initN) // count INIT
      }


      // cycletime since last outed item, relevant if auto
      let cycletime = tim.unitPassed - (pacer.outed || 0)

      // if the cycletime is longer than auto pace
      //  and unitPassed is beyong autoT ...
      if (cycletime >= pacer.autoP &&
            tim.unitPassed > (pacer.autoT || 0)
      ) {
        count.auto = Math.floor(pacer.autoN) // count AUTO

        // set payload.inited: the anitem has started the pacer
        anitem.payload.inited = 1 //  inited

        // set pacer.outed: item was outed at tim.unitPassed time

        anitem.payload.pacer.outed = tim.unitPassed // updated with anima

        // if in auto mode, pace on each cycle
        // save anitem to preserve inited and outed

        let anitems = Array.of(anitem)
        if (itemsort === "anigram") {

          // anigrams do not change state

        } else if (itemsort === "anima") {

          // save anima .......... to persist inited and outed
          mstore.apply({type: 'UPDANIMA', caller: 'h.pacer', animas: anitems})
        }
      }

      //
      // count: eg: {init:4, auto:1, event:3}
      //
      if (Object.keys(count).length > 0) { // on pace count, eg {init: 6, auto: 1}
        let stace // situs of new anitem dependent on kind

        // for each key in count
        for (let counter = 0; counter < Object.keys(count).length; counter++) { // in count
          // key is count sort, eg. { init, auto, event }
          let key = Object.keys(count)[counter]

          // value  is the number of items to be paced
          // generate qitems items of type key, eg. 6 (at init, on auto, when event)
          let qitems = count[key]

          // count, key, qitems, kq
          if (qitems > 0) { // if count on this sort

            for (let i = 0; i < qitems; i++) {


              let props = {
                count: count,
                key: key,
                counter: i,
              }



               let newItem = payload.pacer.geojsor(anitem, props)



              // eg.
              // stace: {
                  // x: { pos: 0, ere: 1 },
                  // y: { pos: 0, ere: 1 },
                  // z: 0
              // },


              stace = newItem.payload.stace


              // situs from ani.geofold.properties.geonode
              // spot from transpot stace, ani
              // locus: situs + spot
              let situs = mstace.getLocus(stace, anitem)

if (1 && 1) console.log('trace situs', situs)

              if (situs && typeof situs === 'object') situs = Object.values(situs)



              // payload.pacer.AAD
              // if pacer.add mode, new items add to pacer generated item (eg. segment point to LineString trace)

              if (aad) {

                //  add situs to newItem geocoords
                //  coords are final space coords (after h.ent, stored at m.animation)

                // geocoords
                let coords = newItem.geofold.geometry.coordinates //

                // precoords
                let precoords = newItem.geofold.properties.geocoords // pre coords

                if (coords && coords.length > 0) {
                  let presitus = coords[coords.length - 1] // last point in paced string

                  let d = mgeom.distance3d(presitus, situs) // distance to new coord
                  if (d >= span) {
                    coords.push(situs) // if beyond span ADD SITUS to LineString
                  }
                } else {
                  coords = Array.of(situs) // coords start with first situs
                }

                newItem.geofold.geometry.coordinates = coords // upd coords
                newItem.geofold.properties.geocoords = precoords

                let newItemsInCount = await hent.gramm(newItem) // h.ent newItem
                newItems = [...newItems, ...newItemsInCount] // add new items

                // NOT pacer.AAD
                // if not pacer.add, each pacer generated item

              } else { //  if NOT AAD

                // geofold is Feature
                // if newItem geofold.geometry.type is Point, then ...

                if (newItem.geofold && newItem.geofold.geometry.type === 'Point') { // POINT
                  // coordinates from geofold
                  let presitus = newItem.geofold.geometry.coordinates

                  // if pacer item DOES  exist
                  if (presitus !== null) {
                    let d = mgeom.distance3d(presitus, situs) // distance from previous situs

                    if (d >= span) { // if distance from previous point greater than span
                      newItem.geofold.geometry.coordinates = [0, 0, 0]
                      newItem.payload.proform = {projection: 'uniwen', translate: situs } // proform

                      // h.ent newItem
                      let newAnigrams = await hent.gramm(newItem) // process newItem as h.ent
                      newItems = [...newItems, ...newAnigrams] // add new anigrams
                    }

                    // if pacer item DOES NOT exist
                  } else {
                    // initialize Point coordinates ...
                    newItem.geofold.geometry.coordinates = [0, 0, 0]

                    // ... to translate to situs thorough uniwen proform
                    newItem.payload.proform = {
                      projection: 'uniwen',
                      translate: situs,
                    }

                    // h.ent.gramm newItem point
                    let newGrams = await hent.gramm(newItem)
                    newItems = [...newItems, ...newGrams] // add items
                  }

                  //
                  // trace NOT AAD, NOT POINT, assume NAT, call gramm of the newItem halo
                  //
                } else {

                  delete newItem.payload.pacer


                  // newItem.payload.proform = {
                          // projection: 'uniwen',
                          // translate: situs
                  // } // proform transfer trace situs to halo
                 
                  let project = mprofier.uniweon({
                          projection: 'uniwen',
                          translate: situs
                  })
                  let geoData = mproj3ct(newItem.geofold, project)                  
                  newItem.geofold = geoData
                  if (1 && 1) console.log('newItem', newItem)
                  
                  // let newGrams = await hent.gramm(newItem)
                  let newGrams = await hent.gramm(newItem)
                  newItems = [...newItems, ...newGrams] // add items
                }
              }
            }
          }
        }
      }

      return newItems
    }

    // ............................. ween
    function ween (anitem, newItems = []) {
      let halo = anitem.halo,
        payload = anitem.payload,
        ric = payload.ric,
        tim = payload.tim

      let pacer = payload.pacer || {}, // pacer
        mousesignal = pacer.mousesignal || 0, // mousesignal
        span = pacer.span || 0, // span between items
        aad = pacer.aad || 0, // aad item to previous item
        item = pacer.item || "anigram" // pace items

      if (item === "anigram") {

      } else {

      }

      return newItems
    }

    // ............................. gramm
    function gramm (anitem) {
      return pacer(anitem)
    }

    let haloPacerHalo = function () {}
    haloPacerHalo.ween = anima => ween(anima)
    haloPacerHalo.gramm = anima => gramm(anima)

    // ....................... enty
    let enty = haloPacerHalo

    return enty
  }

  exports.haloPacer = haloPacer
}))
