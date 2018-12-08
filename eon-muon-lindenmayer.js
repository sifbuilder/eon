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

    let cache = {}

    // lindenmayer
    // http://bl.ocks.org/nitaku/e0f1b570161875b27fc9
    // ### compute a Lindenmayer system given an axiom, a number of steps and rules ###
    // ............................. fractalize
    let fractalize = (lindenmayer) => {
      cache.lindenmayer = lindenmayer

      if (cache.linden === lindenmayer.linden) {
        return cache.lindenmayer
      }

      let linden = lindenmayer.linden
      let axiom = linden.axiom
      let rules = linden.rules
      let steps = linden.steps
      let output = ''

      for (let ch of axiom) { // char in array
        if (rules.hasOwnProperty(ch)) {
          output += rules[ch]
        } else {
          output += ch
        }
      }
      steps = steps - 1
      if (steps <= 0) {
      // let output = '[+OF--PF[---MF--NF]+]++[+OF--PF[---MF--NF]+]++[+OF--PF[---MF--NF]+]++[+OF--PF[---MF--NF]+]++[+OF--PF[---MF--NF]+]'
      // let output =    '[+OFO-O-OPFO[O-O-O-OMOFO--ONF]+]O++O[+OF--PF[---MF--NF]+]'

        lindenmayer.fractal = output

        cache.linden = linden
        // if (1 && 1) console.log('lindenmayer', lindenmayer.fractal)

        return lindenmayer
      }

      linden.steps = steps
      linden.axiom = output

      return fractalize(lindenmayer)
    }

    let forward = function (stat) {
      let {side, pointstart, angunit, level, lineslifo, angles, randomizeStep, randomizeAngle} = stat

      let fkr = 1.0
      let r = 0.5 - Math.random()
      if (Math.abs(r) < 0.5 * randomizeStep / 100) {
        fkr = r
      }

      let pos = lineslifo[level].length - 1
      console.assert(pos >= 0, `line not initalized`)
      let dot = lineslifo[level][pos]

      let angle = angles[level]
      let newdot = [
        dot[0] + side * Math.cos(angle) * fkr,
        dot[1] + side * Math.sin(angle) * fkr,
      ]
      return newdot
    }

    let right = function (stat) {
      let {side, angunit, level, lineslifo, angles, randomizeStep, randomizeAngle} = stat
      let fkr = 1.0
      let r = 0.5 - Math.random()
      if (Math.abs(r) < 0.5 * randomizeAngle / 100) {
        fkr = r
      }
      let newang = angles[level] - angunit * fkr
      return newang
    }

    let left = function (stat) {
      let {side, angunit, level, lineslifo, angles, randomizeStep, randomizeAngle} = stat
      let fkr = 1.0
      let r = 0.5 - Math.random()
      if (Math.abs(r) < 0.5 * randomizeAngle / 100) {
        fkr = r
      }
      let newang = angles[level] + angunit * fkr

      return newang
    }

    // ............................. curve

    // +,-  right/left angle
    // F,f  draw forward
    // G    move forward
    // []   save/restore position
    // |    make a (180 degree) U-turn.
    // randomize step: % randomize step
    // randomize angle: % randomize angle.

    let curve = (lindenmayer) => {
      let angstart
      if (lindenmayer.mayer.angstart !== undefined) {
        angstart = lindenmayer.mayer.angstart
      } else {
        angstart = lindenmayer.mayer.angle
      }
      angstart *= Math.PI / 180
      let angunit = lindenmayer.mayer.angle * Math.PI / 180
      let pointstart = lindenmayer.mayer.start || [0, 0]
      let side = lindenmayer.mayer.side
      let fractal = lindenmayer.fractal

      let randomizeStep = lindenmayer.mayer.randomizeStep || 0
      let randomizeAngle = lindenmayer.mayer.randomizeAngle || 0

      // let lineslifo = Array.of([ pointstart ])
      let lineslifo = Array.of([ ])
      let angles = Array.of(angstart)

      let lines = Array.of([ ])
      let level = 0
      let counter = 0
      let openlines = [0]

      let items = [] // item: status, level, count, line

      let stat = {side, pointstart, angstart, randomizeStep, randomizeAngle, angunit, level, angles, lineslifo}

      for (let ch of fractal) { // char in array
        if (ch === '+') {
          let newangle = right(stat)
          stat.angles[stat.level] = newangle
          // if (1 && 1) console.log('+  :', stat.level, counter, stat.angles)
        } else if (ch === '-') {
          let newangle = left(stat)

          stat.angles[stat.level] = newangle
          // if (1 && 1) console.log('-  :', stat.level, counter, stat.angles)
        } else if (ch === 'O') {
          // if (1 && 1) console.log('------ O')

        } else if (ch === 'F' || ch === 'f') {
          if (stat.lineslifo[stat.level].length === 0) {
            if (stat.level === 0) {
              let dot = pointstart
              stat.lineslifo[stat.level][0] = dot // initialize line
            } else {
              let dot = stat.lineslifo[stat.level - 1 ][stat.lineslifo[stat.level - 1 ].length - 1]
              stat.lineslifo[stat.level][0] = dot // initialize line
            }
          }
          if (stat.lineslifo[stat.level].length === 0) {
            if (stat.angles.length === 0) {
              stat.angles.push(angstart)
            }
          }

          let newdot = forward(stat)
          stat.lineslifo[stat.level].push(newdot) // add dot to line

          let lastOpenLine = openlines[openlines.length - 1]
          lines[lastOpenLine] = stat.lineslifo[stat.level]
          // if (1 && 1) console.log('F  :', stat.level, counter, lines[lastOpenLine])
        } else if (ch === '[') {
          let lineInLevel = stat.lineslifo[stat.level]
          let pointsInLine = lineInLevel.length
          let lastPointInLine = lineInLevel[lineInLevel.length - 1]

          let angleInLevel = stat.angles[stat.level]

          let firstPoint, newangle
          if (pointsInLine === 0) {
            firstPoint = pointstart
          } else {
            firstPoint = lastPointInLine
          }
          if (newangle !== undefined) {
            newangle = angstart
          } else {
            newangle = angleInLevel
          }
          let newline = [firstPoint]

          stat.level = stat.level + 1
          stat.lineslifo[stat.level] = newline
          stat.angles[stat.level] = newangle // inherit angleCum

          // if (1 && 1) console.log('[  :', stat.level, counter, openlines)
          counter = counter + 1
          openlines.push(counter)
          let lastOpenLine = openlines[openlines.length - 1]
          lines[lastOpenLine] = stat.lineslifo[stat.level]
        } else if (ch === ']') {
          lines.push(stat.lineslifo[stat.lineslifo.length - 1]) // _e_

          stat.level = stat.level - 1
          stat.lineslifo.splice(-1, 1) // drop last line
          stat.angles.splice(-1, 1) // drop last angle

          openlines.splice(-1, 1)
        }
      }

      return lines
    }

    // ............................. fractal
    let linden = (lindenmayer) => {
      let fractal = fractalize(lindenmayer).fractal

      let mayer = lindenmayer.mayer
      let geo = curve({
        fractal: fractal,
        mayer: mayer,
      })
      return geo
    }

    // ............................. fractal
    let lindenmayer = (lindenmayer) => {
      let geo = linden(lindenmayer)
      let geoData = {
        type: 'Feature',
        geometry: {
          type: 'MultiLineString',
          coordinates: geo,
        },
        properties: {},
      }
      return geoData
    }

    // ............................. enty
    let enty = {}

    enty.fractalize = fractalize
    enty.curve = curve
    enty.linden = linden
    enty.lindenmayer = lindenmayer
    enty.reset = () => { cache = {}; return enty }

    return enty
  }

  exports.muonLindenmayer = muonLindenmayer
}))
