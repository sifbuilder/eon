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
      uid = ani.anigram().uid


    let pixspan = 15

    let count = {}          // items to be generated on cycle

    let mmouse = __mapper("xs").m("mouse")

    if (1) {                                  // 

      let mouse = {}                          // mouse control
      mouse.mouseDown = mmouse.mouseDown()
      mouse.mouseUp = mmouse.mouseUp()
      mouse.mouseMove = mmouse.mouseMove()
      mouse.mouseDownShared = mmouse.mouseDownShared()
      mouse.event = mmouse.event()

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
      for (let i=0; i<Object.keys(count).length; i++) {

        let key = Object.keys(count)[i]

        if (count[key] > 0) {

          let x, y
          if (key === "init") {
            x = width / 2
            y = height / 2

          } else if (key === "auto") {
            x = width * Math.random() / 2
            y = height * Math.random() / 2

          } else if (key === "event") {

            x = mouse.event.x
            y = mouse.event.y


          }


          let newItem = __mapper("xs").m("store").findAnigramFromUid(uid) // anigram
          if (newItem === undefined)  newItem = __mapper("xs").b("clone")(anigram)


          newItem.x = x
          newItem.y = y


          if (newItem.geometry !== undefined) {

            let coords = newItem.geometry.coordinates
            let coord = [x,y]

            let loc = newItem.geometry.coordinates[newItem.geometry.coordinates.length - 1]
            let dx = coord[0] - loc[0]
            let dy = coord[1] - loc[1]
            let d = dx * dx + dy * dy

            if (d > pixspan) coords.push(coord)    // add segment if above pixspan distance

            newItem.geometry.coordinates = coords

          } else {

            newItem.geometry = { type: "LineString", coordinates: [], }

            let coord = [x,y]

            newItem.geometry.coordinates = Array.of(coord)

          }

          newItem.sort = "geojson"  // json is Polygon geojson
          newItem.gelded = 1        // gelded will not repro
          newItem.inited = 1        // next will be inited and not recycle

          let type = newItem.geometry.type
          let coordinates = newItem.geometry.coordinates

          let feature = {"type": "Feature", "geometry": {}, "properties": {}}

              feature.geometry.type = type
              feature.geometry.coordinates = coordinates
              feature.properties.boform = boform

          newItem.feature = feature
          newItem.sort = "feature"



          newItems.push(newItem)

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
