/**********************
 *    @haloPacer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloPacer = global.haloPacer || {})))
}(this, function (exports) {
  'use strict'

  // md: # md:{filename}
  // md: **create new items at init, on auto or upon event**
  // md: * `@a.p.pacer.add`, if 1, pace items are added to pacer (eg. LineString trace)
  // md: * `@a.p.pacer.initSitus`  : situs for init items
  // md: * `@a.p.pacer.autoSitus`  : situs for auto items, calls `m.stace.getLocus(this.stace, a.payload)`
  // md: call: `payload.pacer.autoSitus(anigram)` 
  // md: autositus in zindex: `function(a) {return mstace.getLocus(this.stace, a.payload) }` gets `a.p.pacer.stance`
  // md: auto time is `a.p.tim.unitPassed - a.p.pacer.outed`
  // md: * `@a.p.pacer.eventSitus` : situs for event items
  // md:   `count` new items to pacer from init, auto and event
  // md:
  // md: * `@a.p.pacer.fidder`  : new item `fid` identifier
  // md: * `@a.p.pacer.geojsor(@anigram, @counter)` : gets new item

  let haloPacer = function haloPacer (__mapper = {}) {
    let mgeom = __mapper('xs').m('geom'),
      mwen = __mapper('xs').m('wen'),
      crayder = __mapper('xs').c('rayder'),
      cwen = __mapper('xs').c('wen'),
      cversor = __mapper('xs').c('versor'),
      mstace = __mapper('xs').m('stace'),
      manitem = __mapper('xs').m('anitem'),
      mric = __mapper('xs').m('ric'),
      mstore = __mapper('xs').m('store'),
      hent = __mapper('xs').h('ent')

    let r = __mapper('xs').r('renderport'),
      width = r.width(),
      height = r.height()

    let haloPacerHalo_ween = anima => []

    let haloPacerHalo_gramm = function (anima, newItems = []) {
      let anigram = manitem(anima).anigram(), // anigram
        halo = anigram.halo, // halo
        geofold = anigram.geofold || manitem.coreGeoform(), // geofold
        payload = anigram.payload, // payload
        boform = payload.boform, // boform
        ric = payload.ric, // ric
        tim = payload.tim, // tim
        proform = payload.proform, // proform
        conform = payload.conform, // conform
        uid = payload.uid, // uid
        parentuid = payload.parentuid // parentuid

      let pacer = payload.pacer || {}, // pacer
        mousesignal = pacer.mousesignal || 0, // mousesignal
        span = pacer.span || 0, // span between items
        aad = pacer.aad || 0, // aad to previtem
        outted = pacer.outted || 0 // outted

      // ....................... defaults
      payload.pacer.initSitus = (payload.pacer.initSitus === undefined) // initSitus
        ? d => ({x: 0, y: 0, z: 0 })
        : payload.pacer.initSitus

      payload.pacer.eventSitus = (payload.pacer.eventSitus === undefined) // eventSitus mouse or touch
        ? d => ({x: crayder.pointer().x, y: crayder.pointer().y, z: 0 })
        : payload.pacer.eventSitus

      payload.pacer.autoSitus = (payload.pacer.autoSitus === undefined) // autoSitus
        ? d => ({x: Math.random(), y: Math.random(), z: 0 })
        : payload.pacer.autoSitus

      payload.pacer.fidder = (payload.pacer.fidder === undefined) // identifier
        ? anitem => anitem.payload.ric.fid
        : payload.pacer.fidder

      payload.pacer.geojsor = (payload.pacer.geojsor === undefined)
        ? d => ({type: 'Point', coordinates: null}) //  default
        : payload.pacer.geojsor // (ani, counter) => geometry

      // ....................... count
      let count = {} // items in cycle

      // ....................... controls
      if (crayder.mouse() && crayder.mouse().type === 'mouseup') { // if mouse up then reset
        let svg = __mapper('renderSvg').svg()
        cwen.reset(svg)
        cversor.reset(svg)
      }

      if ((crayder.mouse() !== undefined && crayder.mouseDown() === 1) ||
          (crayder.touch() !== undefined && crayder.touchStart() === 1)) { // on mouse DOWN
        if (mousesignal === 0 || crayder.mouse().type === 'mousedown') { //
          count.event = Math.floor(pacer.eventN) //  if in state or was event
        }
      }

      // ....................... init
      if (pacer.inited === undefined || pacer.inited !== 1) {
        count.init = Math.floor(pacer.initN) // count INIT
      }

      // ....................... auto
      let cycletime = tim.unitPassed - (pacer.outed || 0)
      if (cycletime >= pacer.autoP &&
            tim.unitPassed > (pacer.autoT || 0)
            
      ) { // if cycle time above autopath
        count.auto = Math.floor(pacer.autoN) // count AUTO
        anima.payload.inited = 1 //  inited
        anima.payload.pacer.outed = tim.unitPassed // updated with anima
        let animas = Array.of(anima) // upd ANIMA
        // mstore.apply({'type': 'UPDANIMA', 'caller': 'h.pacer', animas})
        mstore.apply({'type': 'UPDANIGRAM', 'caller': 'h.pacer', animas})
      }

      if (Object.keys(count).length > 0) { // on pace count
        let situs // situs of new anitem dependent on kind

        for (let counter = 0; counter < Object.keys(count).length; counter++) { // in count
          let key = Object.keys(count)[counter] // count sort

          if (count[key] > 0) { // if count on this sort
            if (key === 'init') { // init defaults center
            
              situs = payload.pacer.initSitus(anigram)
              
            } else if (key === 'auto') { // auto defauts random
            
              situs = payload.pacer.autoSitus(anigram)
              
            } else if (key === 'event') { // event defaults event
            
              situs = payload.pacer.eventSitus(anigram)
              
            }
            if (situs && typeof situs === 'object') situs = Object.values(situs)

            let _ric = ric
            _ric.fid = payload.pacer.fidder(anigram) // fidder set in the payload or default
            let uid = mric.getuid(_ric) // uid

            let newItem = payload.pacer.geojsor(anigram, counter) // newItem from geojsor counter in key.count
            newItem.payload = Object.assign({}, newItem.payload, anigram.payload) // newItem.payload

            if (aad) { // .................... if aad,  add to LineString
              if (!newItem.geofold.geometry) { // if newItem has lost geometry (cause projection)
                let payload = newItem.payload // generate newItem.geofold.geometry again with geojsor
                newItem = payload.pacer.geojsor(anigram, counter) // call geojsor as pacer method for this
                newItem.payload = payload // inherit payload
              }

              //  add situs to newItem coords
              //  coords are final space coords (after h.ent, stored at m.animation)
              let coords = newItem.geofold.geometry.coordinates || [] // domain coords

              // let geocoords = newItem.geofold.properties.geocoords // pre coords

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
              // newItem.geofold.properties.geocoords = geocoords

              let newItemsInCount = hent.gramm(newItem) // h.ent newItem
              newItems = [...newItems, ...newItemsInCount] // add new items
              
            } else { // ............... if NOT aad
              if (newItem === undefined) { // if the newItem has NOT been CREATED yet ....
                newItem = payload.pacer.geojsor(anigram, counter) // newItem anigram, counter per paced type
                newItem.payload.id = uid
                newItem.payload = Object.assign({}, newItem.payload, anigram.payload)
              } else {
                newItem = payload.pacer.geojsor(anigram, counter) // anigram, counter per paced type
                newItem.payload.id = uid
                newItem.payload = Object.assign({}, newItem.payload, anigram.payload)
              }

              if (newItem.geofold && newItem.geofold.geometry.type === 'Point') { // POINT
                let presitus = newItem.geofold.geometry.coordinates

                if (presitus !== null) { // if paced item DOES exist
                  let d = mgeom.distance3d(presitus, situs) // distance from previous situs

                  if (d >= span) { // if distance from previous point greater than span
                    newItem.geofold.geometry.coordinates = [0, 0, 0]
                    newItem.payload.proform = {
                      projection: 'uniwen',
                      translate: situs
                    } // proform

                    let newAnigrams = hent.gramm(newItem) // process newItem as h.ent

                    newItems = [...newItems, ...newAnigrams] // add new anigrams
                  }
                } else { // paced item NOT exists
                  newItem.geofold.geometry.coordinates = [0, 0, 0]
                  newItem.payload.proform = {
                    projection: 'uniwen',
                    translate: situs
                  } // proform

                  let newGrams = __mapper('xs').h('ent').gramm(newItem)
                  newItems = [...newItems, ...newGrams] // add items
                }
              } else { // ..... else TRACE NAT
                let halo = newItem.halo

                newItem.payload.proform = { // transfer trace situs to halo through proform
                  projection: 'uniwen',
                  translate: situs
                } // proform

                let newGrams = __mapper('xs').h(halo).gramm(newItem)
                newItems = [...newItems, ...newGrams] // add items
              }
            }
          }
        }
      }

      return newItems
    }

    let haloPacerHalo = function () {}
    haloPacerHalo.ween = anima => haloPacerHalo_ween(anima)
    haloPacerHalo.gramm = anima => haloPacerHalo_gramm(anima)

    // ....................... enty
    let enty = haloPacerHalo

    return enty
  }

  exports.haloPacer = haloPacer
}))
