/***********
 *    @haloText
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.haloText = global.haloText || {})))
}(this, function (exports) { "use strict"

  let haloText = function (__mapper = {}) {

    let f = __mapper("props")()

    let _geoform = function (p) {     // geoform
    
      let json = {
          type:  "Feature",
          geometry: {

            "type": "Point",
            "coordinates": [0, 0]

          },
          properties: {
            text: p.payload.text.text,
            style: {

              ["rotate"]: p.payload.text.style["rotate"],
              ["font-size"]: p.payload.text.style["font-size"],
              ["font-family"]: p.payload.text.style["font-family"],
              ["text-anchor"]: p.payload.text.style["text-anchor"],

              "width": p.payload.text.width,
              "height": p.payload.text.height,

              "dx": p.payload.text.dx,
              "dy": p.payload.text.dy,

              "textLength": p.payload.text.textLength,
              "lengthAdjust": p.payload.text.lengthAdjust,

              "fill": p.payload.text.style.fill || f.kolor(p.boform.cf,p.boform.csx),
              "stroke": p.payload.text.style.stroke  || f.kolor(p.boform.cs,p.boform.csx),
              "fill-opacity": p.payload.text.style["fill-opacity"] || p.boform.co,
              "stroke-opacity": p.payload.text.style["stroke-opacity"] || p.boform.cp,
              "stroke-width": p.payload.text.style["stroke-width"] || p.boform.cw,

            }
          }
      }
      return json
      
    }

    let gramn = function gramn(anima, newAnigrams = []) {

      let ani = __mapper("xs").m("anitem")(anima),
        anigram = ani.anigram(),             // anigram
        stace =   ani.stace(),               // stace
        ereform = ani.ereform(),             // ereform
        proform = ani.proform(),             // proform
        conform = ani.conform(),             // conform
        geoform = ani.geoform() || _geoform  // geoform

      let json = (typeof geoform === "function") ? geoform(anigram) : geoform  // geoform

      if (stace) json = __mapper("xs").m("stace").getLocifier(anigram)(json)  // lociform

      let newAnigram = anigram
      newAnigram.sort = "text"
      newAnigram.feature = json
      newAnigram.feature.id = newAnigram.uid

      newAnigrams.push(newAnigram)

      return newAnigrams
    }

/***************************
 *        @enty
 */
    let enty = function () {}
    enty.ween = anima => (anima.inited !== true) ? (anima.inited = true, [anima]) : []
    enty.gramn = anima  => gramn(anima)

    return enty

  }

  exports.haloText = haloText

}));
