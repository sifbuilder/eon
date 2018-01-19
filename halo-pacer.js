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
      mmouse = __mapper('xs').m('mouse'),
      cwen = __mapper('xs').c('wen'),
      cversor = __mapper('xs').c('versor'),
      mstace =	__mapper('xs').m('stace'),
      manitem = __mapper('xs').m('anitem'),
      mric = __mapper('xs').m('ric'),
      mstore = __mapper('xs').m('store'),
      svg = __mapper('renderSvg').svg()

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
      let anigram = manitem(anima).anigram(),	// anigram
        halo = 				anigram.halo, // halo
        geoform = 		anigram.geoform || manitem.coreGeoform(), 	// geoform
        payload = 		anigram.payload, // payload
        boform = 			payload.boform, // boform
        ric = payload.ric, // ric
        tim = payload.tim, // tim
        proform =			payload.proform, // proform
        conform = 		payload.conform, // conform
        uid = 				payload.uid, // uid
        parentuid = 	payload.parentuid, // parentuid
        geonode = 		payload.geonode, 														// geonode
        pacer = 			payload.pacer || {},												// pacer
        mousesignal = pacer.mousesignal || 0,												// mousesignal
        span = 				pacer.span || 0												// span

			/* ****
			 * 		defaults
			 */
      let initSitus = (payload.pacer.initSitus === undefined) ? d => ({x: width / 2, y: height / 2, z: 0 }) : payload.pacer.initSitus
      let eventSitus = (payload.pacer.eventSitus === undefined) ? d => ({x: mouse.event.x, y: mouse.event.y, z: 0 }) : payload.pacer.eventSitus
      let autoSitus = (payload.pacer.autoSitus === undefined) ? d => ({x: Math.random() * width / 2, y: Math.random() * height / 2, z: 0 }) : payload.pacer.autoSitus

      let fider = (payload.pacer.fider !== undefined) ? payload.pacer.fider	// set idenitifier
        : anitem => anitem.payload.ric.fid

      let geometrier = point => ({type: 'Point', coordinates: null})
      if (payload.pacer.geometry === 'Point') geometrier = point => ({type: 'Point', coordinates: null})
      if (payload.pacer.geometry === 'LineString') geometrier = point => ({type: 'LineString', coordinates: null})

			let count = {} // items in cycle

			/* ****
			 * 		controls
			 */
      let mouse = {} // mouse control
      if (1) {
        mouse.mouseDown = mmouse.mouseDown() 					// down
        mouse.mouseUp = mmouse.mouseUp() 							// up
        mouse.mouseMove = mmouse.mouseMove() 					// move
        mouse.mouseDownShared = mmouse.mouseDownShared() // shareddown
        mouse.event = mmouse.event() 					// event
				
        if (mouse.event === 'mousedown') if (0 && 1) console.log('h.pacer ', mouse.event.type)

        if (mouse.event && mouse.event.type === 'mouseup') { // if mouse up then reset
          cwen.reset(svg)
          cversor.reset(svg)
        }

        if (mouse.event !== undefined && mouse.mouseDown === 1) { // on mouse DOWN
						// pacer.mousesignal: ['state', 'event']
						if (mousesignal === 0 || mouse.event.type === 'mousedown') { // 
							count.event = Math.floor(pacer.eventN) 		//  if in state or was event
						}
        }

        if (pacer.inited === undefined || pacer.inited !== 1) {
          count.init = Math.floor(pacer.initN) 								// count INIT
        }

        let cyletime = tim.unitPassed - (pacer.outed || 0)

        if (cyletime >= pacer.autoP) { 							// if cycle time above autopath

          count.auto = Math.floor(pacer.autoN) 				// count AUTO
          pacer.outed = tim.unitPassed 								// updated with anima

          anima.payload.inited = 1 								//  inited
          anima.payload.pacer.outed = pacer.outed //  outed at time units
          let animas = Array.of(anima)						// upd ANIMA
          __mapper('xs').m('store').apply({'type': 'UPDANIMA', 'caller': 'h.pacer', animas})
        }
      }																										// PACE COUNT

      if (Object.keys(count).length > 0) {									// on pace count
        let situs
        for (let i = 0; i < Object.keys(count).length; i++) { // for each COUNT
          let key = Object.keys(count)[i] // count sort

          if (count[key] > 0) { // if count on this sort
            if (key === 'init') { // init defaults center
              situs = initSitus(anigram)
            } else if (key === 'auto') { // auto defauts random
              if (0 && 1) console.log('h.pacer haloPacerHalo_gramm situs', situs)
              situs = autoSitus(anigram)		// eg.  d => mstace.getLocus(d)
            } else if (key === 'event') { // event defaults event
              situs = eventSitus(anigram)
            }

            let _ric = ric
            _ric.fid = fider(anigram)					// fider set in the payload or default

            let uid = mric.buildUIDFromRic(_ric)
            let newItem = mstore.findAnigramFromUid(uid) 	// anigram exists ?

            if (newItem === undefined) {								// if not create new anigram
              newItem = {}
              newItem.halo = 'geojson'
              newItem.geoform = {type: 'Feature', geometry: {}, properties: {}}
              newItem.geoform.id = uid
              newItem.geoform.geometry = geometrier()
              newItem.payload = {}
            }
            newItem.payload.ric = _ric												// item id
            newItem.payload.tim = anigram.payload.tim					// item time
            newItem.payload.boform = anigram.payload.boform		// item style
            newItem.payload.avatars = anigram.payload.avatars	// items may have avatars

            let coord = Object.values(situs)			// {x:280,y:229,z:0} => [x,y,0]
            let coords = newItem.geoform.geometry.coordinates

            if (newItem.geoform.geometry.type === 'LineString') {
              if (coords && coords.length > 0) {
                let loc = coords[coords.length - 1]
                let dx = coord[0] - loc[0]
                let dy = coord[1] - loc[1]
                let dz = coord[2] - loc[2]
                let d = dx * dx + dy * dy + dz * dz
                if (d > span) coords.push(coord) // add segment if above pixspan distance
              } else {
                coords = Array.of(coord)
              }
            } else if (newItem.geoform.geometry.type === 'Point') {
              if (coords !== null) {
                let loc = coords
                let dx = coord[0] - loc[0]
                let dy = coord[1] - loc[1]
                let dz = coord[2] - loc[2]
                let d = dx * dx + dy * dy + dz * dz

                if (d >= span) coords = coord
              } else {
                coords = coord
              }
            }

            newItem.geoform.geometry.coordinates = coords

            let newItems = __mapper('xs').h('geojson').gramm(newItem)	// pass to h.geojson
            mstore.apply({'type': 'UPDANIGRAM', 'caller': 'h.pacer', 'anigrams': newItems})
          }
        }
      }

      return newItems
    }

    let haloPacerHalo = {}
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
