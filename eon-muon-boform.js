/***********
 *    @muonBoform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonBoform = global.muonBoform || {})))
}(this, function (exports) {
  'use strict'

  async function muonBoform (__mapper = {}) {
    let [
      d3scale,
      d3interpolate,
    ] = await Promise.all([
      __mapper('xs').b('d3-scale'),
      __mapper('xs').b('d3-interpolate'),
    ])

    // .................. color
    function color (d = 0) {
      let colors = {}

      colors.scales = {
        ambar: d3scale.scaleLinear().domain([0, 0.50, 1]).range(['black', '#FF2400', '#f8a413']), // balck   scarlet ambar
        snow: d3scale.scaleLinear().domain([0, 0.33, 0.66, 1]).range(['#3e2707', '#8e5e0b', '#f8a413', '#E1E7E4']), // brown orange ambar ice
        bos: d3scale.scaleLinear().domain([0, 0.5, 1]).range(['black', '#FF2400', 'Wheat']), // ex 0
        wheat: d3scale.scaleLinear().domain([0, 0.5, 1]).range(['black', 'Wheat', '#FF2400']), // 1
        red: d3scale.scaleLinear().domain([0, 0.5, 1]).range(['#FF2400', 'Yellow']), // 2
        ry: d3scale.scaleLinear().domain([0, 1]).range(['red', 'yellow']), // 3
        bar: d3scale.scaleLinear().domain([0, 0.5, 1]).range(['black', '#FF2400', 'Yellow']), // 4
        lab: d3interpolate.interpolateLab('#FF2400', 'yellow'), // 5
        hsl: d3interpolate.interpolateLab('brown', 'steelblue'), // 6
        rbl: d3interpolate.interpolateLab('red', 'blue'), // 7
        plasma: d3interpolate.interpolatePlasma, // 8
        cool: d3interpolate.interpolateCool, // 9
        warm: d3interpolate.interpolateWarm, // 10
        magma: d3interpolate.interpolateMagma, // 11
        inferno: d3interpolate.interpolateInferno, // 12
        viridis: d3interpolate.interpolateViridis, // 13
        cubehelex: d3interpolate.interpolateCubehelexDefault, // 14
        rainbow: d3interpolate.interpolateRainbow, // 15
        bluered: d3scale.scaleLinear().domain([0, 0.5, 1]).range(['blue', 'Wheat', 'red' ]),
        blueblack: d3scale.scaleLinear().domain([0, 0.5, 1]).range(['blue', 'Wheat', 'black' ]), // "red",])  // 0
      }

      colors.color = colors.scales.bos
      colors.array = Object.keys(colors.scales).map(key => colors.scales[key])
      return colors.array[Math.round(d)]
    }

    // .................. kolor
    let kolor = (v, d = 0) => color(d)(v / 1000)

    // .................. getStyle - process style attributes
    let getStyle = function (boform) {
      let style = {}
      if (boform !== undefined) {
        if (boform.csx === undefined) boform.csx = 0

        if (boform.cf !== undefined && boform.csx !== undefined) style['fill'] = kolor(boform.cf, boform.csx)
        if (boform.cf !== undefined && boform.csx !== undefined) style['stroke'] = kolor(boform.cs, boform.csx)
        if (boform.co !== undefined) style['fill-opacity'] = boform.co
        if (boform.cw !== undefined) style['stroke-width'] = boform.cw
        if (boform.cp !== undefined) style['stroke-opacity'] = boform.cp
      }

      return style
    }

    // .................. @m.boform.boformer(anigram, json)
    let boformer = function (anigram, json) {
      if (json !== undefined && json !== null) {
        if (json.type === undefined) {
        } else if (typeof anigram.payload.boform !== 'object') {
        } else if (json.type === 'Feature') { // Feature
          let feature = json

          let boform = {}, featureStyle = {}
          if (feature.properties !== undefined && feature.properties.boform !== undefined) {
            boform = feature.properties.boform
          } else if (anigram.payload.boform) {
            boform = anigram.payload.boform
          } else {
          }

          let jsonStyle = getStyle(boform)

          if (feature.properties !== undefined && feature.properties.style !== undefined) {
            featureStyle = feature.properties.style
          }

          if (feature.properties === undefined) feature.properties = {}
          feature.properties.style = Object.assign(jsonStyle, featureStyle)
        } else if (json.type === 'FeatureCollection') { // FeatureCollection
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

    // .................. enty
    function enty () { return enty }
    enty.boformer = boformer

    return enty
  }

  exports.muonBoform = muonBoform
}))
