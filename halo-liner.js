/**********************
 *    @haloLiner
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloLiner = global.haloLiner || {})))
}(this, function (exports) { "use strict"

  let haloLiner = function haloLiner(__mapper = {}) {

  let f = __mapper({"props": muonProps.muonProps()}).props()
  let g = __mapper("xs").m("geom")
  let w = __mapper("xs").m("wen")
  let mmouse = __mapper("xs").m("mouse")

  let r = __mapper("xs").r("renderer"),
    width = r.width(),
    height = r.height()


  // -------------------------------  haloLinerHalo_ween
  let haloLinerHalo_ween = function haloLinerHalo_gramn(anima, newItems = []) {

    if (anima.inited !== 1) { anima.inited = anima.gelded = 1; newItems = Array.of(anima) }
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
      stace =   ani.stace(),        // stace
      proform = ani.proform(),      // proform
      conform = ani.conform(),      // conform
      geoform = ani.geoform()       // geoform

    let liner = payload.liner       // liner specific payload
    let pixspan = payload.span || 15 / 1400


    if (0 && 1) console.log("liner payload", payload)
     
    
    if (1) {
      let count = {}          // items to be generated on cycle

      let mouse = {}                              // mouse control
      mouse.mouseDown = mmouse.mouseDown()        // down
      mouse.mouseUp = mmouse.mouseUp()             // up
      mouse.mouseMove = mmouse.mouseMove()        // move
      mouse.mouseDownShared = mmouse.mouseDownShared()       // shareddown
      mouse.event = mmouse.event()                // event

      if (mouse.event && mouse.event.type === "mouseup") {    // if up then reset
          __mapper("xs").c("wen").reset(__mapper("renderSVG").svg())
          __mapper("xs").c("versor").reset(__mapper("renderSVG").svg())
      }

      if (mouse.event !== undefined && mouse.mouseDown === 1 ) {  // on down event ...

        count.event = Math.floor(liner.eventN)                //  take count

      }

      if (liner.inited === undefined || liner.inited !== 1) {

        count.init = Math.floor(liner.initN)           // count INIT

      }

      let cyletime = tim.unitPassed - (liner.outed||0)
      if (cyletime >= liner.autoP) {                 // if cycle time above autopath
        count.auto = Math.floor(liner.autoN)        // count AUTO
        liner.outed = tim.unitPassed                // updated with anima

        anima.inited = 1                               // .......... inited
        anima.payload.liner.outed = liner.outed            // .......... outed at time units
        let animas = Array.of(anima)
        __mapper("xs").m("store").apply({"type":"UPDANIMA","caller":"h.liner",animas}) // upd
      }

      if (0 && 1) console.log("liner count", count)
      
      let n = 0
      for (let i=0; i<Object.keys(count).length; i++) {   // for each COUNT

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

            // x = (mouse.event.x - 300)/ 300      // _e_ project
            // y = (mouse.event.y - 200)/ 200
            x = mouse.event.x
            y = mouse.event.y
            z = 0

          }

          let newItem = __mapper("xs").m("store").findAnigramFromUid(uid) // anigram
          if (newItem === undefined)  {
              newItem = __mapper("xs").b("clone")(anigram)      // first cycle
          } else {
              newItem.boform = anigram.boform                   // _e_
              newItem.stace = anigram.stace
              newItem.payload = anigram.payload
              newItem.proform = anigram.proform
              newItem.avatars = anigram.avatars
              newItem.forces = anigram.forces
          }

          if (0 && 1) console.log("newItem",newItem)



          newItem._x = newItem.x
          newItem._y = newItem.y
          newItem._z = newItem.z

          newItem.x = x
          newItem.y = y
          newItem.z = 0

          let _feature = {}

          if (newItem._feature !== undefined) {

            _feature = newItem._feature
            let coords = _feature.geometry.coordinates
            let coord = [x,y,z]

            let loc = _feature.geometry.coordinates[_feature.geometry.coordinates.length - 1]
            let dx = coord[0] - loc[0]
            let dy = coord[1] - loc[1]
            let dz = coord[2] - loc[2]
            let d = dx * dx + dy * dy + dz * dz

            if (d > pixspan) coords.push(coord)    // add segment if above pixspan distance

            _feature.geometry.coordinates = coords
            _feature.properties.boform = boform

          } else {

            _feature = {type: "Feature", geometry: {}, properties: {}}
            _feature.id = "lineform" + i
            _feature.geometry = {type: "LineString",coordinates: [],}
            _feature.properties.boform = boform


            let coord = [x,y,0]
            _feature.geometry.coordinates = Array.of(coord)

          }


          let geoform = () => _feature


          newItem.geoform = geoform
          newItem._feature = _feature       // keep reference system

          if (0 && 1) console.log("_feature", _feature)


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

  exports.haloLiner = haloLiner

}));
