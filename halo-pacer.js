/**********************
 *    @haloPacer
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloPacer = global.haloPacer || {})))
}(this, function (exports) { "use strict"

  let haloPacer = function haloPacer(__mapper = {}) {

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



    // -------------------------------  haloPacerHalo_ween
    let haloPacerHalo_ween = function haloPacerHalo_gramm(anima, newItems = []) {

      if (anima.payload.inited !== 1) { anima.payload.inited = anima.payload.gelded = 1; newItems = Array.of(anima) }
      return newItems

    }
    // -------------------------------  haloPacerHalo_gramm
    let haloPacerHalo_gramm = function (anima, newItems = []) {

      if (0 && 1) console.log("h.liner haloPacerHalo_gramm anima",anima)

      let anigram = __mapper("xs").m("anitem")(anima).anigram(),
        halo = 				anigram.halo,  															// halo
        geoform = 		anigram.geoform || manitem.coreGeoform(),  	// geoform
        payload = 		anigram.payload,            								// payload
        boform = 			payload.boform,             							// boform
        ric =   			payload.ric,               								// ric
        tim =   			payload.tim,               								// tim
        proform =			payload.proform,            							// proform
        conform = 		payload.conform,            							// conform
        uid = 				payload.uid,          										// uid
        parentuid = 	payload.parentuid,          							// parentuid
        geonode = 		payload.geonode, 	// geonode
				pacer = payload.pacer  || {}					// pacer

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
								node.properties.origin = node.properties.origin || node.geometry.coordinates 
								node.properties.velocity = node.properties.velocity || [0,0,0]
								node.properties.stape = node.properties.stape || [0,0,0]
							
            let newItem = __mapper("xs").b("clone")(anigram)  // 
								newItem.halo = "geojson"
								newItem.payload.ric = _ric
								newItem.geoform = _feature	// set geoform feature
								newItem.payload._feature = _feature	// keep history
								newItem.payload.node = node
						
            newItems = [...newItems,
								...__mapper("xs").h("geojson").gramm(newItem) ]
						
            // newAnigrams = [...newAnigrams, ...newItems]


          }

        }

      }

      __mapper("xs").m("store").apply({"type":"UPDANIGRAM","caller":"h.pacer","anigrams":newItems})
      // __mapper("xs").m("store").apply({"type":"UPDANIMA","caller":"h.pacer","animas":newItems})

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

}));
