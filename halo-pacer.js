/**********************
 *    @haloPacer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloPacer = global.haloPacer || {})))
}(this, function (exports) {
  'use strict'

  let haloPacer = function haloPacer (__mapper = {}) {
    let f = __mapper({'props': muonProps.muonProps()}).props(),
      mgeom = __mapper('xs').m('geom'),
      mwen = __mapper('xs').m('wen'),
      crayder = __mapper('xs').c('rayder'),
      cwen = __mapper('xs').c('wen'),
      cversor = __mapper('xs').c('versor'),
      mstace = __mapper('xs').m('stace'),
      manitem = __mapper('xs').m('anitem'),
      mric = __mapper('xs').m('ric'),
      mstore = __mapper('xs').m('store')

    let r = __mapper('xs').r('renderer'),
      width = r.width(),
      height = r.height()

    // -------------------------------  haloPacerHalo_ween
    let haloPacerHalo_ween = function haloPacerHalo_gramm (anima, newItems = []) {
      if (anima.payload.inited !== 1) { anima.payload.inited = anima.payload.gelded = 1; newItems = Array.of(anima) }
      return newItems
    }
    // -------------------------------  haloPacerHalo_gramm
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

      let initSitus, eventSitus, autoSitus, fider, geojsor

      /* ****
       *    defaults
       */
      initSitus = (payload.pacer.initSitus === undefined) // initSitus
        ? d => ({x: width / 2, y: height / 2, z: 0 })
        : payload.pacer.initSitus

      eventSitus = (payload.pacer.eventSitus === undefined) // eventSitus
        ? d => ({x: crayder.event().x, y: crayder.event().y, z: 0 })
        : payload.pacer.eventSitus

      autoSitus = (payload.pacer.autoSitus === undefined) // autoSitus
        ? d => ({x: Math.random() * width / 2, y: Math.random() * height / 2, z: 0 })
        : payload.pacer.autoSitus

      fider = (payload.pacer.fider === undefined) // identifier
        ? anitem => anitem.payload.ric.fid
        : payload.pacer.fider

      geojsor = (payload.pacer.geojsor === undefined)
        ? d => ({type: 'Point', coordinates: null}) //  default
        : payload.pacer.geojsor // (ani, counter) => geometry

      /* ****
       *    count
       */
      let count = {} // items in cycle

      /* ****
       *    controls
       */
      if (crayder.event() && crayder.event().type === 'mouseup') { // if mouse up then reset
        let svg = __mapper('renderSvg').svg()
        cwen.reset(svg)
        cversor.reset(svg)
      }

      if (crayder.event() !== undefined && crayder.mouseDown() === 1) { // on mouse DOWN
        if (mousesignal === 0 || crayder.event().type === 'mousedown') { //
          count.event = Math.floor(pacer.eventN) //  if in state or was event
        }
      }

      if (pacer.inited === undefined || pacer.inited !== 1) {
        count.init = Math.floor(pacer.initN) // count INIT
      }

      let cycletime = tim.unitPassed - (pacer.outed || 0)

      if (cycletime >= pacer.autoP &&
            tim.unitPassed > (pacer.autoT || 0)
      ) { // if cycle time above autopath
        count.auto = Math.floor(pacer.autoN) // count AUTO

        anima.payload.inited = 1 //  inited
        anima.payload.pacer.outed = tim.unitPassed // updated with anima
        let animas = Array.of(anima) // upd ANIMA
        mstore.apply({'type': 'UPDANIMA', 'caller': 'h.pacer', animas})
      }

      // count anitems in this iteration
      //
      if (Object.keys(count).length > 0) { // on pace count
        let situs // situs of new anitem dependent on kind

        for (let i = 0; i < Object.keys(count).length; i++) {
          // for each item in COUNT

          let key = Object.keys(count)[i] // count sort

          if (count[key] > 0) { // if count on this sort
            // newItem situs may be paradefined
            //
            if (key === 'init') { // init defaults center
              situs = initSitus(anigram)
            } else if (key === 'auto') { // auto defauts random
              situs = autoSitus(anigram) // eg. d => mstace.getLocus(null, d
            } else if (key === 'event') { // event defaults event
              situs = eventSitus(anigram)
            }
            if (typeof situs === 'object') situs = Object.values(situs) // {x:280,y:229,z:0} => [x,y,0]

            // the anigram ric and the newItem fid conform the newItem id
            //
            let _ric = ric
            _ric.fid = fider(anigram) // fider set in the payload or default
            let uid = mric.getuid(_ric) // uid
            let newItem = mstore.findAnigramFromUid(uid) // anigram DOES exist ??

            if (aad) {
            //
            //
            //      CUM LINE    if add anitem to LineString
            //
            //

            //  if the newItem has NOT been CREATED yet ....
            //
              if (newItem === undefined) { // if not, create new anigram
              //  the newItem is generated by the halo anigram geojsor
              //
              // generate the paced fold from the genigram

                newItem = geojsor(anigram, i) // anigram, counter per paced type
                newItem.payload.id = uid
                newItem.payload = Object.assign({}, newItem.payload, anigram.payload)
              } else {

              // the geofold is recreated ... remove for form accumulation _e_

              // newItem = geojsor(anigram, i) // anigram, counter per paced type
              // newItem.payload.id = uid
              // newItem.payload =  Object.assign({}, newItem.payload, anigram.payload)

              }
              newItem.payload = Object.assign({}, newItem.payload, anigram.payload)

              // geocoords of new item
              let coords = newItem.geofold.geometry.coordinates

              if (coords && coords.length > 0) {
                let presitus = coords[coords.length - 1] // last point in cummul string

                let d = mgeom.distance3d(presitus, situs) // 3d distance

                if (d > span) {
                  // if beyond pixspan distance

                  coords.push(situs) // add dot to LineString
                }
              } else {
                coords = Array.of(situs)
              }

              //
              newItem.geofold.geometry.coordinates = coords

              // n.ent of newItem
              let newItemsInCount = __mapper('xs').h('ent').gramm(newItem)

              newItems = [...newItems, ...newItemsInCount] // add items
            } else {
              //  if the newItem has NOT been CREATED yet ....
              //
              if (newItem === undefined) { // if not, create new anigram
                //  the newItem is generated by the halo anigram geojsor
                //
                // generate the paced fold from the genigram

                newItem = geojsor(anigram, i) // anigram, counter per paced type
                newItem.payload.id = uid
                newItem.payload = Object.assign({}, newItem.payload, anigram.payload)
              } else {
                // the geofold is recreated ... remove for form accumulation _e_

                newItem = geojsor(anigram, i) // anigram, counter per paced type
                newItem.payload.id = uid
                newItem.payload = Object.assign({}, newItem.payload, anigram.payload)
              }

              if (newItem.geofold && newItem.geofold.geometry.type === 'Point') { // POINT
                //
                //
                //      if POINT
                //
                //

                let presitus = newItem.geofold.geometry.coordinates

                if (presitus !== null) { // if paced item DOES exist
                  // distance from previous situs
                  let d = mgeom.distance3d(presitus, situs)

                  // if distance from previous point greater than span
                  if (d >= span) {
                    newItem.geofold.geometry.coordinates = [0, 0, 0]
                    newItem.payload.proform = {
                      projection: 'uniwen',
                      translate: situs
                    } // proform

                    // process newItem as h.ent
                    let newAnigrams = __mapper('xs').h('ent').gramm(newItem)

                    // add new anigrams
                    newItems = [...newItems, ...newAnigrams]
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
              } else {
                //
                //
                //      TRACE NAT
                //
                //

                let halo = newItem.halo

                // transfer trace situs through proform
                newItem.payload.proform = {
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

    let haloPacerHalo = function haloPacerHalo () {}
    haloPacerHalo.ween = anima => haloPacerHalo_ween(anima)
    haloPacerHalo.gramm = anima => haloPacerHalo_gramm(anima)

    /**********************
   *    @enty
   */
    let enty = haloPacerHalo

    return enty
  }

  exports.haloPacer = haloPacer
}))
