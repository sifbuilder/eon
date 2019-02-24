/**********************
   *    @muonLindenmayer
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonLindenmayer = global.muonLindenmayer || {})))
}(this, function (exports) {
  'use strict'

  async function muonLindenmayer (__eo = {}) {
    let [
      muonProps,
      muonMatrix4,
      muonVector3,
    ] = await Promise.all([
      __eo('xs').m('props'),
      __eo('xs').m('Matrix4'),
      __eo('xs').m('Vector3'),
    ])

    let Vector3 = muonVector3
    let Matrix4 = muonMatrix4

    let cache = {}

    let chn = (ch = 'F', n = 1) => ch.repeat(Math.floor(n))

    // ............................. fractalize
    let fractalize = (lindenmayer) => {
      cache.lindenmayer = lindenmayer

      if (cache.linden === lindenmayer.linden) {
        return cache.lindenmayer
      }

      let linden = lindenmayer.linden
      let axiom = muonProps.value(linden.axiom)
      let rules = muonProps.value(linden.rules)
      let loops = linden.loops !== undefined ? Math.floor(linden.loops) : linden.loops

      // feet in each F step
      let feet = linden.feet !== undefined ? Math.floor(linden.feet) : linden.feet

      let output = ''

      for (let ch of axiom) { // char in array
        let rule = ch

        if (loops > 0) { // apply rules if in loop
          if (rules.hasOwnProperty(ch)) {
            rule = rules[ch]
          }
        }

        let newrule = rule
        if (feet !== undefined && feet > 0) { // footify
          if (rule === 'F') {
            newrule = rule.replace(/^f|F$/, chn(rule, feet), 'g')
          } else if (rule === 'f') {
            newrule = rule.replace(/^f|F$/, chn(rule, feet), 'g')
          }
        }

        output += newrule
      }
      loops = loops - 1
      if (loops <= 0) { // looppify
        lindenmayer.fractal = output

        cache.linden = linden

        return lindenmayer
      }

      linden.loops = loops
      linden.axiom = output

      return fractalize(lindenmayer)
    }

    let forward = function (stat) {
      let {side,
        level,
        lineslifo,
        matrices,
        randomizeStep,
      } = stat

      let newdot = []

      // side: length of step
      let fkr = 1.0
      let r = 0.5 - Math.random()
      if (Math.abs(r) < 0.5 * randomizeStep / 100) {
        fkr = r
      }
      side = side * fkr

      let pos = lineslifo[level].length - 1
      console.assert(pos >= 0, `line not initalized`)
      let dot = lineslifo[level][pos]
      dot[2] = dot[2] || 0 // 3D _e_
      let v3 = new Vector3(...dot)

      let t0 = new Matrix4().set(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 0)

      let v3s = new Vector3().set(side, side, side)
      let t1 = t0.scale(v3s)

      let t2 = matrices[level]

      let tm = t1.multiply(t2).toArray()
      let t3 = new Matrix4().makeTranslation(...tm)

      newdot = v3.applyMatrix4(t3).toArray()

      return newdot
    }

    // ............................. curve

    // +,-  right/left angle
    // F,f  draw forward
    // G    move forward
    // []   save/restore position
    // |    make a (180 degree) U-turn.
    // randomize loop: % randomize loop
    // randomize angle: % randomize angle
    //
    // the curve adds the start charater
    // if loops is 0, coords is Ffs steps plus 1

    // + Turn left by angle δ, using rotation matrix RU(δ)  // z
    // − Turn right by angle δ, using rotation matrix RU(−δ)
    // & Pitch down by angle δ, using rotation matrix RL(δ) // y
    // ∧ Pitch up by angle δ, using rotation matrix RL(−δ)
    // # Roll left by angle δ, using rotation matrix RH(δ)  // x
    // ~ Roll right by angle δ, using rotation matrix RH(−δ)
    // | Turn around, using rotation matrix RU(180◦)

    let curve = (lindenmayer) => {
      let angstart
      if (lindenmayer.mayer.angstart !== undefined) {
        angstart = lindenmayer.mayer.angstart
      } else {
        angstart = lindenmayer.mayer.angle
      }
      angstart *= Math.PI / 180
      let angunit = lindenmayer.mayer.angle * Math.PI / 180
      let pointstart = lindenmayer.mayer.start || [0, 0, 0]
      let side = lindenmayer.mayer.side
      let fractal = lindenmayer.fractal

      let randomizeStep = lindenmayer.mayer.randomizeStep || 0
      let randomizeAngle = lindenmayer.mayer.randomizeAngle || 0
      let randomize = lindenmayer.mayer.randomize || 0

      let lineslifo = Array.of([ ])
      let angles = Array.of(angstart)

      let startmat = new Matrix4().makeRotationZ(angstart)
      let matrices = Array.of(startmat) // _e_

      let lines = Array.of([ ])
      let level = 0 // level is [] context level
      let counter = 0
      let openlines = [0]

      let stat = {side, pointstart, angstart, randomizeStep, randomizeAngle, angunit, level, angles, matrices, lineslifo}
      for (let ch of fractal) { // char in array
        let fkr = 1 + (0.5 - Math.random()) * randomize

        // & Pitch down by angle δ, using rotation matrix RL(δ) // Y+
        if (ch === '&') {
          let rotmat = new Matrix4().makeRotationY(angunit * fkr)
          stat.matrices[stat.level] = stat.matrices[stat.level].clone().multiply(rotmat)

        // ∧ Pitch up by angle δ, using rotation matrix RL(−δ) // Y-
        } else if (ch === '^') {
          let rotmat = new Matrix4().makeRotationY(-angunit * fkr)
          stat.matrices[stat.level] = stat.matrices[stat.level].clone().multiply(rotmat)

        // # Roll left by angle δ, using rotation matrix RH(δ) // X+
        } else if (ch === '#') { //
          let rotmat = new Matrix4().makeRotationX(angunit * fkr)
          stat.matrices[stat.level] = stat.matrices[stat.level].clone().multiply(rotmat)

        // ~ Roll right by angle δ, using rotation matrix RH(−δ) // X-
        } else if (ch === '~') {
          let rotmat = new Matrix4().makeRotationX(-angunit * fkr)
          stat.matrices[stat.level] = stat.matrices[stat.level].clone().multiply(rotmat)

        // | Turn around, using rotation matrix RU(180◦)
        } else if (ch === '|') {
          let rotmat = new Matrix4().makeRotationZ(-Math.PI * fkr)
          stat.matrices[stat.level] = stat.matrices[stat.level].clone().multiply(rotmat)

        // ignore
        } else if (ch === 'O') {

        // RU - turn right  - decrease angle // Z-
        } else if (ch === '+') {
          let rotmat = new Matrix4().makeRotationZ(-angunit * fkr)
          let newmat = stat.matrices[stat.level].clone().multiply(rotmat)
          stat.matrices[stat.level] = newmat

        // RU - turn left - increase angle ._| // Z+
        } else if (ch === '-') {
          let rotmat = new Matrix4().makeRotationZ(angunit * fkr)
          let newmat = stat.matrices[stat.level].clone().multiply(rotmat)
          stat.matrices[stat.level] = newmat

        // Forward
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
            if (stat.matrices.length === 0) {
              let newmat = new Matrix4().makeRotationZ(angstart)
              stat.matrices.push(newmat)
            }
          }

          let newdot = forward(stat)
          stat.lineslifo[stat.level].push(newdot) // add dot to line

          let lastOpenLine = openlines[openlines.length - 1]
          lines[lastOpenLine] = stat.lineslifo[stat.level]

        // Up context
        } else if (ch === '[') {
          let lineInLevel = stat.lineslifo[stat.level]
          let pointsInLine = lineInLevel.length
          let lastPointInLine = lineInLevel[lineInLevel.length - 1]

          let firstPoint, newmatrix // , newangle
          if (pointsInLine === 0) {
            firstPoint = pointstart
          } else {
            firstPoint = lastPointInLine
          }

          newmatrix = stat.matrices[stat.level] // incomming level

          let newline = [firstPoint]

          stat.level = stat.level + 1 // new level
          stat.lineslifo[stat.level] = newline
          stat.matrices[stat.level] = newmatrix.clone() // inherit matrix

          counter = counter + 1
          openlines.push(counter)
          let lastOpenLine = openlines[openlines.length - 1]
          lines[lastOpenLine] = stat.lineslifo[stat.level]

        // Down context
        } else if (ch === ']') {
          lines.push(stat.lineslifo[stat.lineslifo.length - 1]) // _e_

          stat.level = stat.level - 1
          stat.lineslifo.splice(-1, 1) // drop last line
          stat.matrices.splice(-1, 1) // drop last matrix
          openlines.splice(-1, 1)
        }
      }

      return lines
    }

    // ............................. linden
    let linden = lindenmayer => {
      let fractal = fractalize(lindenmayer).fractal

      let mayer = lindenmayer.mayer
      let geo = curve({
        fractal: fractal,
        mayer: mayer,
      })
      return geo
    }

    // ............................. lindenmayer
    let lindenmayer = lindenmayer => {
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
