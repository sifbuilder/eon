/****************************
 *      @haloNat
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloNat = global.haloNat || {})))
}(this, function (exports) { "use strict"

  let haloNat = function haloNat(__mapper = {}) {

    let f = __mapper("props")()
    let r = __mapper("xs").r("renderer"),
      width = r.width(),
      height = r.height()

    let geoform = p => ({
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": Array.of(__mapper("xs").m("nat")
          .multiconform(__mapper("xs").m("nat")
            .nform(p.payload.form || p.form)))
      },
      "id": 0,
      "properties": {}
    })
      
    /****************************
   *    @gramn
   */
    let gramn = function (anima, newAnigrams = []) {
      
      let ani = __mapper("xs").m("anitem")(anima)
      
      anima.geoform = ani.geoform() || geoform

      newAnigrams = __mapper("xs").h("geojson").gramn(anima)

      return newAnigrams
    }
    
   /****************************
   *    @enty
   */
    let haloNat_ween = anima => (anima.inited !== 1) ? (anima.inited = anima.gelded = 1, [anima]) : []
    let haloNat_gramn = anima => gramn(anima)

    let haloNat = {}
        haloNat.ween = anima => haloNat_ween(anima)
        haloNat.gramn = anima => haloNat_gramn(anima)   
     
    let enty = haloNat

    return enty

  }

  exports.haloNat = haloNat

}));
