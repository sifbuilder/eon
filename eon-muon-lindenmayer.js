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
    let fractalizeIter = (config) => {
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
    // ............................. fractalize    
    let fractalize = (config) => {
      let axiom = config.axiom
      let output = ''

      for (let ch of axiom) { // char in array
        if (config.rules.hasOwnProperty(ch)) {
          output += config.rules[ch]
        } else {
          output += ch
        }
      }
      config.axiom = output
      config.steps = config.steps -1
      if (config.steps <= 0) {
        return output
      }

      return fractalize(config)
    }
    // ............................. curve    
    let curve = (config) => {
      let angle = (config.pars.angle * Math.PI / 180) || Math.PI / 2
      let start = config.pars.start || [0,0]
      let side = config.pars.side
      let fractal = config.fractal
      
      let angleCum = angle
      
      let forward = function (_path, _side, _angleCum) {
          let q = _path[_path.length - 1]
          let step = [
            q[0] + _side * Math.cos(_angleCum),
            q[1] + _side * Math.sin(_angleCum)]
          return step
      }
      let right = function (_angleCum, _angle) {
        _angleCum += _angle
        return _angleCum
      }
      let left = function (_angleCum, _angle) {
        _angleCum -= _angle
        return _angleCum
      }

      let lines = Array.of([ start ])
      let pointer = 0

      let line = lines[pointer]
      // +,-  right/left angle
      // F,f  draw forward
      // G    move forward
      // []   save/restore position
      for (let ch of fractal) { // char in array
        if (ch === '+') {
          angleCum = right(angleCum, angle)
        } else if (ch === '-') {
          angleCum = left(angleCum, angle)
        } else if (ch === 'F' || ch === 'f') {
          line.push(forward(line, side, angleCum))
        } else if (ch === '[') {
          pointer = pointer + 1
          if (pointer < lines.length) {
            line = lines[pointer]
          } else {
            line = []
            lines.push(line)
          }
          
        } else if (ch === ']') {
          pointer = pointer - 1
          console.assert(pointer >= 0)
          line = lines[pointer]
        } else if (ch === 'G') {
        }
      }

      return lines
    }
   // ............................. fractal
    let linden = (config) => {
        let fractal = fractalize(config)
        let pars = config.pars
        let geo = curve({
          fractal: fractal,
          pars: pars,
        })
        return geo

    }

    // ............................. enty
    let enty = {}

    enty.fractalize = fractalize
    enty.curve = curve
    enty.linden = linden

    return enty
  }

  exports.muonLindenmayer = muonLindenmayer
}))
