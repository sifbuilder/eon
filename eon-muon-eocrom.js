/***********
 *    @muonEocrom
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonEocrom = global.muonEocrom || {})))
}(this, function (exports) {
  'use strict'

  async function muonEocrom (__eo = {}) {
    let [
      d3Scale,
      d3Interpolate,
      // d3,
    ] = await Promise.all([
      __eo('xs').b('d3-scale'),
      __eo('xs').b('d3-interpolate'),
      // __eo('xs').b('d3'),
    ])

    // let d3Scale = d3
    // let d3Interpolate = d3

    function shadeRGBColor (color) {
      let p = 255,
        R = color[0],
        G = color[1],
        B = color[2]
      return t => (
        'rgb(' +
          (Math.round((t - R) * p) + R) + ',' +
          (Math.round((t - G) * p) + G) + ',' +
          (Math.round((t - B) * p) + B) + ')'
      )
    }

    // .................. color
    function color (d = 0) {
      let colors = {}

      let scales = {}

      scales.ambar = d3Scale.scaleLinear().domain([0, 0.50, 1]).range(['black', '#FF2400', '#f8a413']) // 0 - black scarlet ambar
      scales.redblue = d3Scale.scaleLinear().domain([0, 0.33, 0.66, 1]).range(['wheat', 'red', 'blue', 'wheat' ]) // 1
      scales.snow = d3Scale.scaleLinear().domain([0, 0.33, 0.66, 1]).range(['#3e2707', '#8e5e0b', '#f8a413', '#E1E7E4']) // 2 - brown orange ambar ice
      scales.browngreen = d3Scale.scaleLinear().domain([0, 0.2, 0.5, 0.7, 1]).range(['#380100', '#381500', '#382600', '#383f00', '#389700', '#389700']) // 3
      scales.bos = d3Scale.scaleLinear().domain([0, 0.5, 1]).range(['black', '#FF2400', 'Wheat']) // 4 ex. 0
      scales.wheat = d3Scale.scaleLinear().domain([0, 0.5, 1]).range(['black', 'Wheat', '#FF2400']) // 5
      scales.red = d3Scale.scaleLinear().domain([0, 0.5, 1]).range(['#FF2400', 'Yellow']) // 6
      scales.ry = d3Scale.scaleLinear().domain([0, 1]).range(['red', 'gold']) // 7
      scales.bar = d3Scale.scaleLinear().domain([0, 0.5, 1]).range(['black', '#FF2400', 'Yellow']) // 8
      scales.lab = d3Interpolate.interpolateLab('#FF2400', 'yellow') // 9
      scales.hsl = d3Interpolate.interpolateLab('amber', 'steelblue') // 10
      scales.rbl = d3Interpolate.interpolateLab('red', 'blue') // 11
      scales.plasma = d3Interpolate.interpolatePlasma, // 12
      scales.cool = d3Interpolate.interpolateCool, // 13
      scales.warm = d3Interpolate.interpolateWarm, // 14
      scales.magma = d3Interpolate.interpolateMagma, // 15
      scales.inferno = d3Interpolate.interpolateInferno, // 16
      scales.viridis = d3Interpolate.interpolateViridis, // 17
      scales.cubehelex = d3Interpolate.interpolateCubehelexDefault, // 18
      scales.rainbow = d3Interpolate.interpolateRainbow, // 19
      scales.bluered = d3Scale.scaleLinear().domain([0, 0.5, 1]).range(['blue', 'Wheat', 'red' ]) // 20
      scales.blueblack = d3Scale.scaleLinear().domain([0, 0.5, 1]).range(['blue', 'Wheat', 'black' ]) // 21
      scales.redblack = d3Scale.scaleLinear().domain([0, 0.5, 1]).range(['Black', '#FF2400', 'Steelblue' ]) // 22
      scales.whiteblack = d3Scale.scaleLinear().domain([0, 0.5, 1]).range(['Black', 'Yellow', 'White' ]) // 23

      colors.scales = scales
      colors.color = colors.scales.bos
      colors.array = Object.keys(colors.scales).map(key => colors.scales[key])
      return colors.array[Math.round(d)]
    }

    // .................. kolor
    let kolor = (v, d = 0) => {
      return color(d)(v / 1000)
    }

    // .................. getStyle - process style attributes
    let getStyle = function (eocrom) {
      let style = {}

      if (eocrom !== undefined) {
        let colrs = [ // color params
          [ 'fill', 'cf' ],
          [ 'stroke', 'cs' ],
        ]

        for (let i = 0; i < colrs.length; i++) {
          let key = colrs[i][0]
          let code = colrs[i][1]

          if (typeof eocrom[code] === 'number' && typeof eocrom.csx === 'number') {
            let csx = eocrom.csx !== undefined ? eocrom.csx : 0
            style[key] = kolor(eocrom[code], csx)
          } else if (typeof eocrom[code] === 'string') {
            style[key] = eocrom[code]
          } else if (eocrom[key] !== undefined) {
            style[key] = eocrom[key]
          } else if (Array.isArray(eocrom[code])) { // eg. "rgb(251, 107, 11)"
            style[key] = `rgb( ${eocrom[code][0]},  ${eocrom[code][1]},  ${eocrom[code][2]} )`
          } else if (typeof eocrom[code] === 'number' && eocrom.csx === undefined) { // 0xff0000
            let c = eocrom[code] // color = 256^2* r + 256* g + b
            let r = c / (256 ^ 2)
            let g = (c / 256) % 256
            let b = c % 256

            style[key] = `rgb( ${r},  ${g},  ${b} )`
          }
        }

        let nums = [ // numerical params
          [ 'fill-opacity', 'co' ],
          [ 'stroke-width', 'cw' ],
          [ 'stroke-opacity', 'cp' ],
        ]

        for (let i = 0; i < nums.length; i++) {
          let key = nums[i][0]
          let code = nums[i][1]

          if (typeof eocrom[code] === 'number') {
            style[key] = eocrom[code]
          }
        }
      }

      return style
    }

    // .................. getColor
    let getColor = (v, s = 0) => kolor(v, s)

    // .................. @m.eocrom.geocromer(anigram, json)
    let geocromer = function (anigram, json) {
      if (json !== undefined && json !== null) {
        if (json.type === 'Feature') { // Feature
          let feature = json

          let eocrom = {}, featureStyle = {}
          if (feature.properties !== undefined && feature.properties.eocrom !== undefined) {
            eocrom = feature.properties.eocrom
          } else {
            eocrom = anigram.eocrom || anigram.eoload.eocrom || {}
          }

          let jsonStyle = getStyle(eocrom)

          if (feature.properties !== undefined && feature.properties.style !== undefined) {
            featureStyle = feature.properties.style
          }

          if (feature.properties === undefined) feature.properties = {}
          feature.properties.style = Object.assign(jsonStyle, featureStyle)
        } else if (json.type === 'FeatureCollection') {
          for (let i = 0; i < json.features.length; i++) {
            let feature = json.features[i]
            feature = geocromer(anigram, feature)
          }
        } else {
          console.log('m.eocrom.geocromer nothing done')
        }
      }

      return json
    }

    // eocrom definition

    let getdefault = function () {
      let res = { 'csx': 0, 'cf': 500, 'co': 1, 'cs': 500, 'cw': 1, 'cp': 1 }

      return res
    }

    // .................. enty
    let enty = {}
    enty.geocromer = geocromer
    enty.getdefault = getdefault
    enty.getColor = getColor
    enty.kolor = kolor

    return enty
  }

  exports.muonEocrom = muonEocrom
}))
