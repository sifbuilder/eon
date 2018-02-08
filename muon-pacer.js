/**********************
 *    @muonPacer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonPacer = global.muonPacer || {})))
}(this, function (exports) {
  'use strict'

  let muonPacer = function muonPacer (__mapper = {}) {
    let f = __mapper({'props': muonProps.muonProps()}).props(),
      mgeom = __mapper('xs').m('geom'),
      mwen = __mapper('xs').m('wen'),
      mmouse = __mapper('xs').m('mouse'),
      cwen = __mapper('xs').c('wen'),
      cversor = __mapper('xs').c('versor'),
      mstace = __mapper('xs').m('stace'),
      manitem = __mapper('xs').m('anitem'),
      mric = __mapper('xs').m('ric'),
      mstore = __mapper('xs').m('store'),
      svg = __mapper('renderSvg').svg()

    let r = __mapper('xs').r('renderer'),
      width = r.width(),
      height = r.height()

    // -------------------------------  muonPacerHalo_gramm
    let pacer = function (payload, newItems = []) {
      let boform = payload.boform, // boform
        ric = payload.ric, // ric
        tim = payload.tim, // tim
        proform = payload.proform, // proform
        conform = payload.conform, // conform
        uid = payload.uid, // uid
        parentuid = payload.parentuid, // parentuid
        pacer = payload.pacer || {}, // pacer
        mousesignal = pacer.mousesignal || 0, // mousesignal
        span = pacer.span || 0, // span between items
        aad = pacer.aad || 0 // aad to previtem

      let initSitus, eventSitus, autoSitus, fider, geojsor

      /* ****
       *    defaults
       */
      initSitus = (payload.pacer.initSitus === undefined) // initSitus
        ? d => ({x: width / 2, y: height / 2, z: 0 })
        : payload.pacer.initSitus

      eventSitus = (payload.pacer.eventSitus === undefined) // eventSitus
        ? d => ({x: mouse.event.x, y: mouse.event.y, z: 0 })
        : payload.pacer.eventSitus

      autoSitus = (payload.pacer.autoSitus === undefined) // autoSitus
        ? d => ({x: Math.random() * width / 2, y: Math.random() * height / 2, z: 0 })
        : payload.pacer.autoSitus

      fider = (payload.pacer.fider === undefined) // identifier
        ? () => payload.ric.fid
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
      let mouse = {} // mouse control

      mouse.mouseDown = mmouse.mouseDown() // down
      mouse.mouseUp = mmouse.mouseUp() // up
      mouse.mouseMove = mmouse.mouseMove() // move
      mouse.mouseDownShared = mmouse.mouseDownShared() // shareddown
      mouse.event = mmouse.event() // event

      if (mouse.event === 'mousedown') if (0 && 1) console.log('h.pacer ', mouse.event.type)

      if (mouse.event && mouse.event.type === 'mouseup') { // if mouse up then reset
        cwen.reset(svg)
        cversor.reset(svg)
      }

      if (mouse.event !== undefined && mouse.mouseDown === 1) { // on mouse DOWN
        if (mousesignal === 0 || mouse.event.type === 'mousedown') { //
          count.event = Math.floor(pacer.eventN) //  if in state or was event
        }
      }

      if (pacer.inited === undefined || pacer.inited !== 1) {
        count.init = Math.floor(pacer.initN) // count INIT
      }

      let cyletime = tim.unitPassed - (pacer.outed || 0)

      if (cyletime >= pacer.autoP) { // if cycle time above autopath
        count.auto = Math.floor(pacer.autoN) // count AUTO
        pacer.outed = tim.unitPassed // updated with anima
      }

      console.log('count', count)

      if (Object.keys(count).length > 0) { // on pace count
        let situs
        for (let i = 0; i < Object.keys(count).length; i++) { // for each COUNT
          let key = Object.keys(count)[i] // count sort

          if (count[key] > 0) { // if count on this sort
            if (key === 'init') { // init defaults center
              situs = initSitus(payload)
            } else if (key === 'auto') { // auto defauts random
              if (0 && 1) console.log('h.pacer muonPacerHalo_gramm situs', situs)
              situs = autoSitus(payload) // eg.  d => mstace.getLocus(d)
            } else if (key === 'event') { // event defaults event
              situs = eventSitus(payload)
            }

            let _ric = ric
            _ric.fid = fider(payload, i) // fider set in the payload or default

            let uid = mric.buildUIDFromRic(_ric) // uid
            let newItem = mstore.findAnigramFromUid(uid) // anigram DOES exist ??

            if (newItem === undefined) { // if not, create new anigram
              newItem = {}
              newItem.halo = 'geofold'

              newItem.geoform = geojsor(payload, i) 		// anigram, counter
              newItem.geoform.id = uid

              newItem.payload = {}
            }
            newItem.payload.ric = _ric // item id
            newItem.payload.tim = payload.tim // item time
            newItem.payload.boform = payload.boform // item style
            newItem.payload.avatars = payload.avatars // items may have avatars

            let vsitus = Object.values(situs) // {x:280,y:229,z:0} => [x,y,0]

            if (aad && newItem.geoform.geometry.type === 'LineString') { // CUM LINE
              let coords = newItem.geoform.geometry.coordinates // geocoords of new item
              if (coords && coords.length > 0) {
                let loc = coords[coords.length - 1] // last point in cummul string
                let dx = vsitus[0] - loc[0]
                let dy = vsitus[1] - loc[1]
                let dz = vsitus[2] - loc[2]
                let d = dx * dx + dy * dy + dz * dz // distance from vsitus to last point

                if (d > span) coords.push(vsitus) // add segment if above pixspan distance
              } else {
                coords = Array.of(vsitus)
              }
              newItem.geoform.geometry.coordinates = coords

              newItems = [...newItems, ...__mapper('xs').h('geofold').gramm(newItem)] // add items
            } else if (newItem.geoform.geometry.type === 'Point') {			// POINT
              let itemcoords = newItem.geoform.geometry.coordinates

              if (itemcoords !== null) { // paced item DOES exist
                let loc = itemcoords
                let dx = vsitus[0] - loc[0]
                let dy = vsitus[1] - loc[1]
                let dz = vsitus[2] - loc[2]
                let d = dx * dx + dy * dy + dz * dz

                if (d >= span) {
                  newItem.geoform.geometry.coordinates = [0, 0, 0]
                  newItem.payload.proform = {'projection': 'uniwen', 'translate': vsitus}	// proform
                  newItems = [...newItems, ...__mapper('xs').h('geofold').gramm(newItem)]	// add items
                }
              } else {											// paced item NOT exists
                newItem.geoform.geometry.coordinates = [0, 0, 0]
                newItem.payload.proform = {'projection': 'uniwen', 'translate': vsitus}	// proform
                newItems = [...newItems, ...__mapper('xs').h('geofold').gramm(newItem)]	// add items
              }
            } else {
              let itemcoords = newItem.geoform.geometry.coordinates
              let geonode = newItem.payload.geonode.properties.geonode
              let geonodecoords = geonode.geometry.coordinates

              if (geonodecoords == undefined || geonodecoords == null) geonodecoords = [0, 0]
              newItem.geoform.geometry.coordinates = itemcoords
              newItem.payload.geonode.geometry.coordinates = geonodecoords
              newItem.payload.proform = {'projection': 'uniwen', 'translate': vsitus}	// proform
              newItems = [...newItems, ...__mapper('xs').h('geofold').gramm(newItem)]	// add items
            }
          }
        }
      }

      return newItems
    }

    /**********************
   *    @enty
   */
    let enty = pacer

    return enty
  }

  exports.muonPacer = muonPacer
}))
