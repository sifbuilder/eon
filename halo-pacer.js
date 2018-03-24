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

    let r = __mapper('xs').r('renderport'),
      width = r.width(),
      height = r.height()

    // -------------------------------  haloPacerHalo_ween

    // pacer could apply to halo ween
    // let haloPacerHalo_ween = function  (anima, newItems = []) {
      // if (anima.payload.inited !== 1) { anima.payload.inited = anima.payload.gelded = 1; newItems = Array.of(anima) }
      // return newItems
    // }

// let haloPacerHalo_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []


let haloPacerHalo_ween = anima => []

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

      eventSitus = (payload.pacer.eventSitus === undefined) // eventSitus mouse or touch
        ? d => ({x: crayder.pointer().x, y: crayder.pointer().y, z: 0 })
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

      if (crayder.mouse() && crayder.mouse().type === 'mouseup') { // if mouse up then reset
        let svg = __mapper('renderSvg').svg()
        cwen.reset(svg)
        cversor.reset(svg)
      }

      if (0 && 1) console.log("crayder", crayder.touch(), crayder.touchStart())
      if ( (crayder.mouse() !== undefined && crayder.mouseDown() === 1)
          || (crayder.touch() !== undefined && crayder.touchStart() === 1))
          { // on mouse DOWN
        if (mousesignal === 0 || crayder.mouse().type === 'mousedown') { //
          count.event = Math.floor(pacer.eventN) //  if in state or was event
        }
      }


      /* ****
       *    init
       */
      if (pacer.inited === undefined || pacer.inited !== 1) {
        count.init = Math.floor(pacer.initN) // count INIT
      }

      /* ****
       *    auto
       */
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
if (0 && 1) console.log("count", count)
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
            if (situs && typeof situs === 'object') situs = Object.values(situs) // {x:280,y:229,z:0} => [x,y,0]

            // ///
            // the anigram ric and the newItem fid conform the newItem id
            // //
            let _ric = ric
            _ric.fid = fider(anigram) // fider set in the payload or default
            let uid = mric.getuid(_ric) // uid
            
            // let newItem = mstore.findAnigramFromUid(uid) || geojsor(anigram, i)
            let newItem = payload.pacer.geojsor(anigram, i)

            
// if (0 && 1) console.log("h.pacer newItem", newItem)  
// if (newItem.geofold.properties.formEreformed)  {
  
            // newItem.geofold.geometry = newItem.geofold.properties.formEreformed.geometry
// }


            newItem.payload.uid = uid
            newItem.payload.id = newItem.payload.uid
            newItem.payload.ric = _ric
            
            newItem.payload.tim = anigram.payload.tim // _e_ 
            newItem.payload.boform = anigram.payload.boform   // _e_ 
            
          newItem.payload = Object.assign({}, newItem.payload, anigram.payload)
                
            if (aad) {

              // ///
              //
              //
              //      CUM LINE    if add anitem to LineString
              //
              //
              // //

              // ///
              //  update newItem payload from parent - conform, proform
              //
              // newItem.payload = Object.assign({}, newItem.payload, anigram.payload)
              // ///
              //  generate newItem.geofold.geometry again with geojsor
              //  if newItem has lost geometry (cause projection)
              // //
                if (!newItem.geofold.geometry) {
                    let payload = newItem.payload // newItem has lost geometry
                    newItem = geojsor(anigram, i) // anigram, counter per paced type
                    newItem.payload = payload // payload was
                }

                // ///
                //  add situs to newItem coords
                //  coords are final space coords (after h.ent, stored at m.animation)
                // //
                let coords = newItem.geofold.geometry.coordinates // domain coords
                
                // ///
                //  geoformed coords are pre-formed
                // //
                let geocoords = newItem.geofold.properties.geocoords || []
  
                if (coords && coords.length > 0) {

                   
                  let presitus = coords[coords.length - 1] // last point in paced string

                  
                  //  check span between samples
                  let d = mgeom.distance3d(presitus, situs) // distance to new coord
                  if (d >= span) {

                    
                    coords.push(situs) // if beyond span ADD SITUS to LineString
                    if (0 && 1) console.log("h.pacer add", situs)

                    geocoords.push(situs)


                  }

                } else {

                  coords = Array.of(situs)  // coords start with first situs


                  geocoords = Array.of(situs)


                }

                // ///
                // update coords with coords
                // //
                newItem.geofold.geometry.coordinates = coords
                
                newItem.geofold.properties.geocoords = geocoords

                
                // ///
                //  h.ent will conform, ereform, proform
                //  each pace segment will accumulate at every cycle
                //  no sense on continuous functions
                // //
                let newItemsInCount = __mapper('xs').h('ent').gramm(newItem)
                newItems = [...newItems, ...newItemsInCount] // add items

            // ///
            // if not aad
            // //
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


              // ///
              //
              //      if POINT
              //
              // //

              if (newItem.geofold && newItem.geofold.geometry.type === 'Point') { // POINT

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

    let haloPacerHalo = function () {}
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
