/***********
 *    @muonBoform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonBoform = global.muonBoform || {})))
}(this, function (exports) {
  'use strict'

  let muonBoform = function (__mapper = {}) {
    let f = __mapper('props')()
    let mstore = __mapper('xs').m('store')

    let getStyle = function (boform) {
      let style = {}
      if (boform !== undefined) {
        if (boform.csx === undefined) boform.csx = 0

        if (boform.cf !== undefined && boform.csx !== undefined) style['fill'] = f.kolor(boform.cf, boform.csx)
        if (boform.cf !== undefined && boform.csx !== undefined) style['stroke'] = f.kolor(boform.cs, boform.csx)
        if (boform.co !== undefined) style['fill-opacity'] = boform.co
        if (boform.cw !== undefined) style['stroke-width'] = boform.cw
        if (boform.cp !== undefined) style['stroke-opacity'] = boform.cp
      }

      return style
    }

    /* *********************
   *    @m.boform.boformer(boform, anigram, json)
   */
    let boformer = function (anigram, json) {
      if (json !== undefined && json !== null) {
        if (json.type === undefined) {
          console.log('type undefined')
        } else if (typeof anigram.payload.boform !== 'object') {
          console.log('boform is not an object')
        } else if (json.type === 'Feature') {
          let feature = json
          let anigramBoform = anigram.payload.boform
          let featureBoform = {}, featureStyle = {}
          if (feature.properties !== undefined && feature.properties.boform !== undefined) {
            featureBoform = feature.properties.boform
          }
          let boform = Object.assign(anigramBoform, featureBoform)
          let jsonStyle = getStyle(boform)

          if (feature.properties !== undefined && feature.properties.style !== undefined) {
            featureStyle = feature.properties.style
          }

          feature.properties.style = Object.assign(jsonStyle, featureStyle)
        } else if (json.type === 'FeatureCollection') {
          for (let i = 0; i < json.features.length; i++) {
            let feature = json.features[i]
            feature = boformer(anigram, feature)
          }
        } else {
          console.log('m.boform.boformer nothing done')
        }
      }

      return json
    }

    /***********
  *         @enty
  */
    function enty () { return enty }
    enty.boformer = boformer

    return enty
  }

  exports.muonBoform = muonBoform
}))
