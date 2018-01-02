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

      let payload = p.payload,
        text = payload.text,         // needs text
        boform = p.boform || {}

      let json = {
          type:  "Feature",
          geometry: {

            "type": "Point",
            "coordinates": [0, 0]

          },
          properties: {
            text: text.text,
            style: {

              ["rotate"]: text.style["rotate"],
              ["font-size"]: text.style["font-size"],
              ["font-family"]: text.style["font-family"],
              ["text-anchor"]: text.style["text-anchor"],

              "width": text.style.width,
              "height": text.style.height,

              "dx": text.style.dx,
              "dy": text.style.dy,

              "textLength": text.style.textLength,
              "lengthAdjust": text.style.lengthAdjust,

              "fill": text.style.fill || f.kolor(boform.cf,boform.csx),
              "stroke": text.style.stroke  || f.kolor(boform.cs,boform.csx),
              "fill-opacity": text.style["fill-opacity"] || boform.co,
              "stroke-opacity": text.style["stroke-opacity"] || boform.cp,
              "stroke-width": text.style["stroke-width"] || boform.cw,

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

    let haloText_ween = anima => (anima.inited !== 1) ? (anima.inited = anima.gelded = 1, [anima]) : []
    let haloText_gramn = anima => gramn(anima)

    let haloText = {}
        haloText.ween = anima => haloText_ween(anima)
        haloText.gramn = anima => haloText_gramn(anima)

    let enty = haloText

    return enty

  }

  exports.haloText = haloText

}));
