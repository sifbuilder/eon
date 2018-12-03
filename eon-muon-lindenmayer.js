/**********************
   *    @muonLindenmayer
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonLindenmayer = global.muonLindenmayer || {})))
}(this, function (exports) {
  'use strict'

  async function muonLindenmayer (__mapper = {}) {
    let [
      muonProps,
    ] = await Promise.all([
      __mapper('xs').m('props'),
    ])

    // lindenmayer
    // http://bl.ocks.org/nitaku/e0f1b570161875b27fc9
    // ### compute a Lindenmayer system given an axiom, a number of steps and rules ###
    let fractalize = (config) => {
      let input = config.axiom
      let output

      for (let i in [0, config.steps]) {
        output = ''
        for (let ch of input) { // char in array
          if (config.rules.hasOwnProperty(ch)) {
            output += config.rules[ch]
          } else {
            output += ch
          }
        }
        input = output
      }

      return output
    }

    let curve = (config) => {
      let angle = 0.0
      let path = [ [0, 0] ]
      for (let ch of config.fractal) { // char in array
        if (ch === '+') {
          angle += config.angle
        } else if (ch === '-') {
          angle -= config.angle
        } else if (ch === 'F') {
          let q = path[path.length - 1]
          let step = [
            q[0] + config.side * Math.cos(angle),
            q[1] + config.side * Math.sin(angle)]
          path.push(step)
        }
      }
      return path
    }

    // ............................. enty
    let enty = {}

    enty.fractalize = fractalize
    enty.curve = curve

    return enty
  }

  exports.muonLindenmayer = muonLindenmayer
}))
