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
      muonMatrix3,
      muonMatrix4,
      muonVector3,
    ] = await Promise.all([
      __eo('xs').m('props'),
      __eo('xs').m('Matrix3'),
      __eo('xs').m('Matrix4'),
      __eo('xs').m('Vector3'),
    ])

    let Vector3 = muonVector3
    let Matrix3 = muonMatrix3
    let Matrix4 = muonMatrix4

    let cos = Math.cos, sin = Math.sin

    let cache = {}

    let chn = (ch = 'F', n = 1) => ch.repeat(Math.floor(n))

    // lindenmayer
    // http://bl.ocks.org/nitaku/e0f1b570161875b27fc9
    // ### compute a Lindenmayer system given an axiom, a number of loops and rules ###
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
      // feet (moves) for each F in rule
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
        pointstart,
        angunit,
        level,
        lineslifo,
        angles,
        randomizeStep,
        randomizeAngle,
      } = stat

      let fkr = 1.0
      let r = 0.5 - Math.random()
      if (Math.abs(r) < 0.5 * randomizeStep / 100) {
        fkr = r
      }
      side = side * fkr

      let pos = lineslifo[level].length - 1
      console.assert(pos >= 0, `line not initalized`)
      let dot = lineslifo[level][pos]
      // dot[2] = dot[2] || 0  // _e_
      let newdot = []
      let v3 = new Vector3(dot[0], dot[1], dot[2 || 0])

      let a = angles[level] // angle


      // RU(α) = cos α    sin α     0
      //        − sin α   cos α     0
      //          0       0         1
     // let m4a = new Matrix3().set(  side * cos(a),  side * sin(a), 0,   1,
                                  // - side * sin(a),  side * cos(a) , 0,   1,
                                  // 0,          0                 , 1,    1,
                                  // 1,          0                 , 0,    1
      // )
      // let t0 = new Matrix4()
      // let t1 = new Matrix4().makeRotationZ(a)
      // let t2 = new Matrix4().makeScale(side)
      // let t3 = new Matrix4().makeTranslation( ...dot )
      // let tm = t0
        // .multiply(t1)
        // .multiply(t2)
        // .multiply(t3)
      // newdot = v3.applyMatrix4(tm).toArray()




      let v3a = new Vector3().set(  cos(a),
                                    - sin(a),
                                    1
      )
      v3a = v3a.multiplyScalar(side)
      newdot = v3.add(v3a).toArray()


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
    // randomize loop: % randomize loop
    // randomize angle: % randomize angle
    //
    // the curve adds the start charater
    // if loops is 0, coords is Ffs steps plus 1


// RU(α) = cos α sin α 0
      // − sin α cos α 0
      // 0       0  1

// RL(α) = cos α 0   − sin α
        // 0     1   0
        // sin α 0   cos α

// RH(α) = 1 0 0
        // 0 cos α − sin α
        // 0 sin α cos α

// The following symbols control turtle orientation in

    // + Turn left by angle δ, using rotation matrix RU(δ)  // z
    // − Turn right by angle δ, using rotation matrix RU(−δ)
    // & Pitch down by angle δ, using rotation matrix RL(δ) // y
    // ∧ Pitch up by angle δ, using rotation matrix RL(−δ)
    // \ Roll left by angle δ, using rotation matrix RH(δ)  // x
    // / Roll right by angle δ, using rotation matrix RH(−δ)
    // | Turn around, using rotation matrix RU(180◦)

// n=2, δ=90◦
// A
// A → B-F+CFC+F-D&F∧D-F+&&CFC+F+B//
// B → A&F∧CFB∧F∧D∧∧-F-D∧|F∧B|FC∧F∧A//
// C → |D∧|F∧B-F+C∧F∧A&&FA&F∧C+F+B∧F∧D//
// D → |CFB-F+B|FA&F∧A&&FB-F+B|FC//


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

      let lineslifo = Array.of([ ])
      let angles = Array.of(angstart)

      let lines = Array.of([ ])
      let level = 0
      let counter = 0
      let openlines = [0]

      let items = [] // item: status, level, count, line

      let stat = {side, pointstart, angstart, randomizeStep, randomizeAngle, angunit, level, angles, lineslifo}

      for (let ch of fractal) { // char in array

        if (0) {


        // & Pitch down by angle δ, using rotation matrix RL(δ) // y
        } else if (ch === '&') {

        // ∧ Pitch up by angle δ, using rotation matrix RL(−δ)
        } else if (ch === '∧') {

        // \ Roll left by angle δ, using rotation matrix RH(δ)  // x
        } else if (ch === '\\') { // escape

        // / Roll right by angle δ, using rotation matrix RH(−δ)
        } else if (ch === '/') {

        // | Turn around, using rotation matrix RU(180◦)
        } else if (ch === '|') {



        } else if (ch === '+') {

          let newangle = right(stat)
          stat.angles[stat.level] = newangle

        } else if (ch === '-') {

          let newangle = left(stat)
          stat.angles[stat.level] = newangle

        } else if (ch === 'O') {

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
