/**********************
 *    @haloPointer
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloPointer = global.haloPointer || {})))
}(this, function (exports) { "use strict"

  let haloPointer = function haloPointer(__mapper = {}) {

    let f = __mapper({"props": muonProps.muonProps()}).props()
    let g = __mapper("xs").m("geom")
    let mwen = __mapper("xs").m("wen")
    let mmouse = __mapper("xs").m("mouse")
    let cwen = __mapper("xs").c("wen")
    let cversor = __mapper("xs").c("versor")
    let mstace =	__mapper("xs").m("stace")

    let r = __mapper("xs").r("renderer"),
      width = r.width(),
      height = r.height()

    let svg = __mapper("renderSVG").svg()

    // -------------------------------  haloLinerHalo_ween
    let haloLinerHalo_ween = function haloLinerHalo_gramn(anima, newItems = []) {

      if (anima.inited !== 1) { anima.inited = anima.gelded = 1; newItems = Array.of(anima) }
      return newItems

    }
    // -------------------------------  haloLinerHalo_gramn
    let haloLinerHalo_gramn = function (anima, newItems = []) {

      if (0 && 1) console.log("h.liner haloLinerHalo_gramn anima",anima)

      let ani = __mapper("xs").m("anitem")(anima),
        anigram = ani.anigram(),            	// anigram
        boform =  ani.boform(),             	// boform
        ric =   	ani.ric(),               		// ric
        tim =   	ani.tim(),               		// tim
        payload = ani.payload(),            	// payload
        proform = ani.proform(),            	// proform
        conform = ani.conform(),            	// conform
        parentuid = ani.parentuid(),          // parentuid
        geoform = ani.geoform(),  						// geoform
        json

      let pacer = payload.pacer  || {}

      let initSitus = () => ({x: width / 2, y: height / 2, z: 0 })
      let eventSitus = () => ({x: mouse.event.x, y: mouse.event.y, z: 0 })
      let autoSitus = () => ({x: Math.random() * width / 2, y: Math.random() * height / 2, z: 0 })

      autoSitus = () => mstace.getLocus(anigram)


      let count = {}          						// items to be generated on cycle
      let mouse = {}                      // mouse control
      if (1) {

        mouse.mouseDown = mmouse.mouseDown()        // down
        mouse.mouseUp = mmouse.mouseUp()             // up
        mouse.mouseMove = mmouse.mouseMove()        // move
        mouse.mouseDownShared = mmouse.mouseDownShared()       // shareddown
        mouse.event = mmouse.event()                // event

        if (mouse.event && mouse.event.type === "mouseup") {    // if up then reset
          cwen.reset(svg)
          cversor.reset(svg)
        }

        if (mouse.event !== undefined && mouse.mouseDown === 1 ) {  // on down event ...

          count.event = Math.floor(pacer.eventN)                //  take count

        }

        if (pacer.inited === undefined || pacer.inited !== 1) {

          count.init = Math.floor(pacer.initN)           // count INIT

        }

        let cyletime = tim.unitPassed - (pacer.outed||0)

        if (cyletime >= pacer.autoP) {                 		// if cycle time above autopath
          count.auto = Math.floor(pacer.autoN)        		// count AUTO
          pacer.outed = tim.unitPassed                		// updated with anima

          anima.inited = 1                               	//  inited
          anima.payload.pacer.outed = pacer.outed         //  outed at time units
          let animas = Array.of(anima)
          __mapper("xs").m("store").apply({"type":"UPDANIMA","caller":"h.liner",animas}) // upd ANIMA
        }

      }																										// PACE COUNT


      if (Object.keys(count).length > 0) {									// on pace count
        if (0 && 1) console.log("pacer count", count)

        let situs
        for (let i=0; i<Object.keys(count).length; i++) {   // for each COUNT

          let key = Object.keys(count)[i]                   // count sort

          if (count[key] > 0) {                           	// if count on this sort
            if (key === "init") {                         	// init defaults center

              situs = initSitus()

            } else if (key === "auto") {                  // auto defauts random

              situs = autoSitus()

            } else if (key === "event") {                   // event defaults event

              situs = eventSitus()
            }

            let newItem = __mapper("xs").b("clone")(anigram)     	// if first cycle clone anigram


            let anigramsInClass = __mapper("xs").m("store").anigrams()
              .filter(d => d.ric.gid === newItem.ric.gid &&  d.ric.cid === newItem.ric.cid)
              .length


            let _ric = ric
            _ric.fid = "item" + anigramsInClass
            newItem.ric = _ric

            let _feature = {}
            _feature = {type: "Feature", geometry: {}, properties: {}}
            _feature.geometry = {type: "Point", coordinates: [],}
            _feature.properties.boform = boform
            _feature.geometry.coordinates = Object.values(situs)

            if (0 && 1) console.log("_feature", _feature)
            newItem.geoform = newItem._feature = _feature	// set geoform feature and keep history

            let newAnigrams = __mapper("xs").h("geojson").gramn(newItem)
            __mapper("xs").m("store").apply({"type":"UPDANIGRAM","caller":"h.liner","anigrams":newItem}) // _e_

            newItems = [...newItems, ...newAnigrams]


          }

        }

      }


      return newItems

    }

    let haloLinerHalo = {}
    haloLinerHalo.ween = anima => haloLinerHalo_ween(anima)
    haloLinerHalo.gramn = anima => haloLinerHalo_gramn(anima)

    /**********************
   *    @enty
   */
    let enty = haloLinerHalo

    return enty

  }

  exports.haloPointer = haloPointer

}))
