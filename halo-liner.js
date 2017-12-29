/**********************
 *    @haloLiner
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloLiner = global.haloLiner || {})))
}(this, function (exports) { "use strict"

  let haloLiner = function haloLiner(__mapper = {}) {

  let f = __mapper({"props": bosonProps.bosonProps()}).props()
  let g = __mapper("xs").m("geom")
  let w = __mapper("xs").m("wen")

  let r = __mapper("xs").r("renderer"),
    width = r.width(),
    height = r.height()

    
  // -------------------------------  haloLinerHalo_ween
  let haloLinerHalo_ween = function haloLinerHalo_gramn(anima, newItems = []) {

    if (anima.inited !== 1) {
      anima.inited = 1
      newItems = Array.of(anima)    // process anima just once
    }
    return newItems

  }
  // -------------------------------  haloLinerHalo_gramn
  let haloLinerHalo_gramn = function (anima, newItems = []) {

    let ani = __mapper("xs").m("anitem")(anima),
      anigram = ani.anigram(),
      payload = ani.payload(),
      boform = ani.boform(),
      tim = ani.tim(),
      uid = ani.anigram().uid,
      stace =   ani.stace(),                // stace
      proform = ani.proform(),                // proform
      conform = ani.conform(),                // conform
      geoform = ani.geoform()                 // geoform


    let pixspan = 15 / 1400

    let count = {}          // items to be generated on cycle

    let mmouse = __mapper("xs").m("mouse")

    if (1) {                                  //

      let mouse = {}                          // mouse control
      mouse.mouseDown = mmouse.mouseDown()
      mouse.mouseUp = mmouse.mouseUp()


      mouse.mouseMove = mmouse.mouseMove()
      mouse.mouseDownShared = mmouse.mouseDownShared()
      mouse.event = mmouse.event()

      if (mouse.event && mouse.event.type === "mouseup") {
          console.log("mouse.event", mouse.event.type)
          __mapper("xs").c("wen").reset(__mapper("renderSVG").svg())
          __mapper("xs").c("versor").reset(__mapper("renderSVG").svg())
      }

      if (mouse.event !== undefined && mouse.mouseDown === 1 ) {

        count.event = Math.floor(payload.eventN)      // count EVENT

      }

      if (payload.inited === undefined || payload.inited !== 1) {

        count.init = Math.floor(payload.initN)        // count INIT

      }

      let cyletime = tim.unitPassed - (payload.outed||0)
      if (cyletime > payload.autoP) {               // if cycle time above autopath
        count.auto = Math.floor(payload.autoN)    // count AUTO
        payload.outed = tim.unitPassed            // updated with anima

        anima.inited = 1                          // init form
        anima.payload.outed = payload.outed
        __mapper("xs").m("store").apply({"type":"UPDANIMA","caller":"alima","animas":f.a(anima)})
      }


      let n = 0
      for (let i=0; i<Object.keys(count).length; i++) {   // count

        let key = Object.keys(count)[i]                   // key

        if (count[key] > 0) {                           // count on key
          let x, y, z
          if (key === "init") {                         // init
            x = width / 2
            y = height / 2
            z = 0

          } else if (key === "auto") {                  // auto
            x = width * Math.random() / 2
            y = height * Math.random() / 2
            z = 0

          } else if (key === "event") {                   // event

            x = (mouse.event.x - 300)/ 300
            y = (mouse.event.y - 200)/ 200
            // x = mouse.event.x 
            // y = mouse.event.y
            z = 0

          }


          let newItem = __mapper("xs").m("store").findAnigramFromUid(uid) // anigram
          if (newItem === undefined)  newItem = __mapper("xs").b("clone")(anigram)


          newItem.x = x
          newItem.y = y
          newItem.z = 0

          let trace = {}
          
          if (newItem.trace !== undefined) {

            trace = newItem.trace
            let coords = trace.geometry.coordinates
            let coord = [x,y,z]

            let loc = trace.geometry.coordinates[trace.geometry.coordinates.length - 1]
            let dx = coord[0] - loc[0]
            let dy = coord[1] - loc[1]
            let dz = coord[2] - loc[2]
            let d = dx * dx + dy * dy + dz * dz

            if (d > pixspan) coords.push(coord)    // add segment if above pixspan distance

            trace.geometry.coordinates = coords
            trace.properties.boform = boform
            
          } else {

            trace = {
                    type: "Feature",
                    id: "lineform" + i,
                    geometry: {},
                    properties: {}}        
          
            trace.geometry = {
                    type: "LineString",
                    coordinates: [],
            }
            trace.properties.boform = boform
            
            
            let coord = [x,y,0]
            trace.geometry.coordinates = Array.of(coord)

          }

        
          let geoform = () => trace 
          
         
          newItem.geoform = geoform
          newItem.trace = trace       // keep reference system
          let newAnigrams = __mapper("xs").h("geojson").gramify(newItem)
          
          
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

  exports.haloLiner = haloLiner

}));
