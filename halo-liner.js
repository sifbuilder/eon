/**********************
 *    @haloLiner
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloLiner = global.haloLiner || {})))
}(this, function (exports) { "use strict"

  let haloLiner = function haloLiner(__mapper = {}) {

    let f = __mapper({"props": muonProps.muonProps()}).props(),
			g = __mapper("xs").m("geom"),
			mwen = __mapper("xs").m("wen"),
			mmouse = __mapper("xs").m("mouse"),
			cwen = __mapper("xs").c("wen"),
			cversor = __mapper("xs").c("versor"),
			mstace =	__mapper("xs").m("stace"),
      manitem = __mapper("xs").m("anitem"),
			svg = __mapper("renderSvg").svg()
		
    let r = __mapper("xs").r("renderer"),
      width = r.width(),
      height = r.height()



    // -------------------------------  haloLinerHalo_ween
    let haloLinerHalo_ween = function haloLinerHalo_gramm(anima, newItems = []) {

      if (anima.payload.inited !== 1) { anima.payload.inited = anima.payload.gelded = 1; newItems = Array.of(anima) }
      return newItems

    }
    // -------------------------------  haloLinerHalo_gramm
    let haloLinerHalo_gramm = function (anima, newItems = []) {

      if (0 && 1) console.log("h.liner haloLinerHalo_gramm anima",anima)

      let anigram = __mapper("xs").m("anitem")(anima).anigram(),	// anigram
        halo = 				anigram.halo,  															// halo
        geoform = 		anigram.geoform || manitem.coreGeoform(), 	// geoform
        payload = 		anigram.payload,            								// payload
        boform = 			payload.boform,             								// boform
        ric =   			payload.ric,               									// ric
        tim =   			payload.tim,               									// tim
        proform =			payload.proform,            								// proform
        conform = 		payload.conform,            								// conform
        uid = 				payload.uid,          											// uid
        parentuid = 	payload.parentuid,          								// parentuid
        geonode = 		payload.geonode, 														// geonode
				pacer = 			payload.pacer  || {}												// pacer

      let initSitus = (payload.pacer.initSitus === undefined) ? d => ({x: width / 2, y: height / 2, z: 0 }) : payload.pacer.initSitus
      let eventSitus = (payload.pacer.eventSitus === undefined) ? d => ({x: mouse.event.x, y: mouse.event.y, z: 0 }) : payload.pacer.eventSitus
      let autoSitus = (payload.pacer.autoSitus === undefined) ?  d => ({x: Math.random() * width / 2, y: Math.random() * height / 2, z: 0 }) : payload.pacer.autoSitus
					autoSitus = d => mstace.getLocus(d)
					
			let fider = (payload.pacer.fider !== undefined) ? payload.pacer.fider :
						anitem => "item" + __mapper("xs").m("store").anigrams()
              .filter(d => d.payload.ric.gid === anitem.payload.ric.gid &&  d.payload.ric.cid === anitem.payload.ric.cid)
              .length
							
			let geometrier = (payload.pacer.geometrier !== undefined) ? payload.pacer.geometrier :
						point => ({type: "Point", coordinates: Object.values(point),})


      let count = {}          						// items to be generated on cycle
      let mouse = {}                      // mouse control
      if (1) {

        mouse.mouseDown = mmouse.mouseDown()        // down
        mouse.mouseUp = mmouse.mouseUp()             // up
        mouse.mouseMove = mmouse.mouseMove()        // move
        mouse.mouseDownShared = mmouse.mouseDownShared()       // shareddown
        mouse.event = mmouse.event()                // event
				if (mouse.event === "mousedown")  if (0 && 1) console.log("h.pacer ",mouse.event.type)

        if (mouse.event && mouse.event.type === "mouseup") {    // if up then reset
          cwen.reset(svg)
          cversor.reset(svg)
        }

        if (mouse.event !== undefined && mouse.mouseDown === 1  && mouse.event.type === "mousedown" ) {  // on down event ...
          count.event = Math.floor(pacer.eventN)                //  take count
					if (0 && 1) console.log("pacer count", count.event)				

        }

        if (pacer.inited === undefined || pacer.inited !== 1) {

          count.init = Math.floor(pacer.initN)           // count INIT

        }

        let cyletime = tim.unitPassed - (pacer.outed||0)

        if (cyletime >= pacer.autoP) {                 		// if cycle time above autopath
          count.auto = Math.floor(pacer.autoN)        		// count AUTO
          pacer.outed = tim.unitPassed                		// updated with anima

          anima.payload.inited = 1                               	//  inited
          anima.payload.pacer.outed = pacer.outed         //  outed at time units
          let animas = Array.of(anima)
          __mapper("xs").m("store").apply({"type":"UPDANIMA","caller":"h.liner",animas}) // upd ANIMA
        }

      }																										// PACE COUNT

      if (Object.keys(count).length > 0) {									// on pace count

        let situs
        for (let i=0; i<Object.keys(count).length; i++) {   // for each COUNT

          let key = Object.keys(count)[i]                   // count sort

          if (count[key] > 0) {                           	// if count on this sort
            if (key === "init") {                         	// init defaults center

              situs = initSitus(anigram)

            } else if (key === "auto") {                  // auto defauts random

              situs = autoSitus(anigram)

            } else if (key === "event") {                   // event defaults event

              situs = eventSitus(anigram)
            }

						
						
	        let newItem = __mapper("xs").m("store").findAnigramFromUid(uid) 	// anigram exists ?
          if (newItem === undefined)  {
              newItem = __mapper("xs").b("clone")(anigram)     	// if first cycle clone anigram
          } else {
              newItem.payload = anigram.payload
          }					
						
						
						
						
						
          if (1 && 1) console.log(" ************* situs", situs, newItem)

					let _geonode = newItem.payload.geonode
					let coordinates = Object.values(situs)
					let prevous = (_geonode && _geonode.geometry) ? _geonode.geometry.coordinates : null
						
					let	geonode = {
							type: "Feature",
							geometry: {
									type: "Point",
									coordinates: coordinates,
							},
							properties: {
								prevous: prevous
							}
						}


						
						
         // newItem._x = newItem.x														// pre situs
          // newItem._y = newItem.y
          // newItem._z = newItem.z

          // newItem.x = situs.x																			// situs
          // newItem.y = situs.y
          // newItem.z = situs.z

          // let _feature = {}

          // if (newItem.payload._feature !== undefined) {							// if previous feature

            // _feature = newItem.payload._feature
            // let coords = __mapper("xs").m("geoj").getCoords(_feature)

            // let coord = Object.values(situs) // [x,y,z]

            // let loc = coords[coords.length - 1]							// _e_

            // let dx = coord[0] - loc[0]
            // let dy = coord[1] - loc[1]
            // let dz = coord[2] - loc[2]
            // let d = dx * dx + dy * dy + dz * dz

            // if (d > pixspan) coords.push(coord)    // add segment if above pixspan distance

            // _feature.geometry.coordinates = coords
            // _feature.properties.boform = boform

          // } else {

            // _feature = {type: "Feature", geometry: {}, properties: {}}
            // _feature.id = "lineform" + i									// each element in count
            // _feature.geometry = {type: "LineString",coordinates: [],}
            // _feature.properties.boform = boform

            // _feature.geometry.coordinates = Array.of(Object.values(situs))	// [x,y,0]

          // }

          // if (0 && 1) console.log("_feature", _feature)
          // newItem.geoform = newItem.payload._feature = _feature	// set geoform feature and keep history
						
						
						
						
						
						
            let _ric = ric
							_ric.gid = "nat"
							_ric.cid = "nat"
							_ric.fid = fider(anigram)

            let _feature = {}
							_feature = {type: "Feature", geometry: {}, properties: {}}
							_feature.geometry = geometrier(situs)
							_feature.properties.boform = boform
							
						let node = {type: "Feature", geometry: {}, properties: {}}
								node = Object.assign(node, geonode)
								node.geometry = geometrier(situs)
								node.properties.orgin = node.properties.orgin || node.geometry.coordinates 
								node.properties.velin = node.properties.velin || [0,0,0]
								node.properties.velang = node.properties.velang || [0,0,0]
								node.properties.stape = node.properties.stape || [0,0,0]
							
            let newItem = __mapper("xs").b("clone")(anigram)  // 
								newItem.halo = "geojson"
								newItem.payload.ric = _ric
								newItem.geoform = _feature	// set geoform feature
								newItem.payload._feature = _feature	// keep history
								newItem.payload.node = node
						
						
						
						
						
						
            newItems = [...newItems,
								...__mapper("xs").h("geojson").gramm(newItem) ]

						__mapper("xs").m("store").apply({"type":"UPDANIGRAM","caller":"h.liner","anigrams":newItems})
								

						
						
						
          }

        }

      }

      __mapper("xs").m("store").apply({"type":"UPDANIGRAM","caller":"h.pacer","anigrams":newItems})

      return newItems

    }

    let haloLinerHalo = {}
    haloLinerHalo.ween = anima => haloLinerHalo_ween(anima)
    haloLinerHalo.gramm = anima => haloLinerHalo_gramm(anima)

    /**********************
   *    @enty
   */
    let enty = haloLinerHalo

    return enty

  }

  exports.haloLiner = haloLiner

}));
