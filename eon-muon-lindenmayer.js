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
      let loopq = linden.loopq !== undefined ? Math.floor(linden.loopq) : linden.loopq

      // feet in each F step
      let feet = linden.feet !== undefined ? Math.floor(linden.feet) : linden.feet

      let output = ''

      for (let ch of axiom) { // for each char in the axiom array ...
        let rule = ch         // each char is a production rule

        if (loopq > 0) {      // apply rules if in loop
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
      if (loopq <= 0) {         // after last loop ...
        lindenmayer.fractal = output
        cache.linden = linden
        return lindenmayer      // end iteration
      }

      lindenmayer.linden.loopq = loopq - 1  // reduce loopq loopLevel
      lindenmayer.linden.axiom = output // axion from previous iteration

      return fractalize(lindenmayer)
    }

    let forward = function (stat) {
      let {side,
        loopLevel,  // context loopLevel
        linesLifo,
        matrices,
        randomizeStep,
      } = stat

      let newdot = []

      let pos = linesLifo[loopLevel].length - 1
      console.assert(pos >= 0, `line not initalized`)
      let dot = linesLifo[loopLevel][pos]
      dot[2] = dot[2] || 0        // 3D _e_
      let v3 = new Vector3(...dot)

      let t0 = new Matrix4().set(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 0)

      let v3s = new Vector3().set(side, side, side)
      let t1 = t0.scale(v3s)

      let t2 = matrices[loopLevel]

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
    // if loopq is 0, coords is Ffs steps plus 1

    // + Turn left by angle δ, using rotation matrix RU(δ)  // z
    // − Turn right by angle δ, using rotation matrix RU(−δ)
    // & Pitch down by angle δ, using rotation matrix RL(δ) // y
    // ^ Pitch up by angle δ, using rotation matrix RL(−δ)
    // # Roll left by angle δ, using rotation matrix RH(δ)  // x
    // ~ Roll right by angle δ, using rotation matrix RH(−δ)
    // | Turn around, using rotation matrix RU(180◦)


    // generate multiline == multifeature

    let curve = (lindenmayer) => {

      let { angunit, angstart, start, side, randomizeStep=0, randomizeAngle=0, randomize=0, randomfactor=0.1 } = lindenmayer.mayer

      console.assert(angunit !== undefined, `angle undefined`)
      angunit = angunit * Math.PI / 180

      if (angstart === undefined) angstart = angle
      angstart *= Math.PI / 180

      let pointstart = (start !== undefined) ? start : [0, 0, 0]
      let fractal = lindenmayer.fractal

      let linesLifo = Array.of([])     // initialize linesLifo stack
      let lines = Array.of([])         // initialize lines stack

      let matrices = []               // initialize matrices stack
      let startmat = new Matrix4().makeRotationZ(angstart)
      matrices.push(startmat)   // add first matrix

      let features = Array.of({
          type: 'Feature',
          geometry: {
            type: 'MultiLineString',
            coordinates: [],
          },
          properties: {},
        })
      let multilines = []
      
      let loopLevel = 0             // loopLevel is context loopLevel
      let lineCounter = 0
      let openlines = [0]

      let stat = {side, pointstart, angstart, randomizeStep, randomizeAngle, randomfactor, angunit, loopLevel, matrices, linesLifo, lines, openlines, lineCounter, features, multilines}


      for (let ch of fractal) { // for each char in array
        let fkr = 1 + randomfactor * (0.5 - Math.random()) * randomize

        // & Pitch down by angle δ, using rotation matrix RL(δ) // Y+
        if (ch === '&') {
          let rotmat = new Matrix4().makeRotationY(angunit * fkr)
          stat.matrices[stat.loopLevel] = stat.matrices[stat.loopLevel].clone().multiply(rotmat)

        // ∧ Pitch up by angle δ, using rotation matrix RL(−δ) // Y-
        } else if (ch === '^') {
          let rotmat = new Matrix4().makeRotationY(-angunit * fkr)
          stat.matrices[stat.loopLevel] = stat.matrices[stat.loopLevel].clone().multiply(rotmat)

        // # Roll left by angle δ, using rotation matrix RH(δ) // X+
        } else if (ch === '#') { //
          let rotmat = new Matrix4().makeRotationX(angunit * fkr)
          stat.matrices[stat.loopLevel] = stat.matrices[stat.loopLevel].clone().multiply(rotmat)

        // ~ Roll right by angle δ, using rotation matrix RH(−δ) // X-
        } else if (ch === '~') {
          let rotmat = new Matrix4().makeRotationX(-angunit * fkr)
          stat.matrices[stat.loopLevel] = stat.matrices[stat.loopLevel].clone().multiply(rotmat)

        // | Turn around, using rotation matrix RU(180◦)
        } else if (ch === '|') {
          let rotmat = new Matrix4().makeRotationZ(-Math.PI * fkr)
          stat.matrices[stat.loopLevel] = stat.matrices[stat.loopLevel].clone().multiply(rotmat)

        // ignore
        } else if (ch === 'O') {

        // RU - turn right  - decrease angle // Z-
        } else if (ch === '+') {
          let rotmat = new Matrix4().makeRotationZ(-angunit * fkr)
          let newmat = stat.matrices[stat.loopLevel].clone().multiply(rotmat)
          stat.matrices[stat.loopLevel] = newmat

        // RU - turn left - increase angle ._| // Z+
        } else if (ch === '-') {
          let rotmat = new Matrix4().makeRotationZ(angunit * fkr)
          let newmat = stat.matrices[stat.loopLevel].clone().multiply(rotmat)
          stat.matrices[stat.loopLevel] = newmat

        // Forward
        } else if (ch === 'F' || ch === 'f') {
          if (stat.linesLifo[stat.loopLevel].length === 0) {  // if new linesLifo
            let dot
            if (stat.loopLevel === 0) { // dot is first

              dot = pointstart

            } else {    // dot is last from lower loopLevel linesLifo

              let lastElemIdx = stat.linesLifo[stat.loopLevel - 1 ].length - 1
              dot = stat.linesLifo[stat.loopLevel - 1 ][lastElemIdx]

            }
            stat.linesLifo[stat.loopLevel][0] = dot // initialize line
          }
          if (stat.linesLifo[stat.loopLevel].length === 0) {  // if new loop
            if (stat.matrices.length === 0) {
              let newmat = new Matrix4().makeRotationZ(angstart)
              stat.matrices.push(newmat)
            }
          }

          let newdot = forward(stat)  // get new dot
          stat.linesLifo[stat.loopLevel].push(newdot) // add new dot to this-loopLevel linesLifo

          lines[stat.lineCounter] = stat.linesLifo[stat.loopLevel]  // line set to linesLifo

          stat.features[stat.lineCounter].geometry.coordinates = Array.of(stat.linesLifo[stat.loopLevel])
          
        // Up context
        } else if (ch === '[') {
          
          let firstPoint // , newangle
          
          let lineInLevel = stat.linesLifo[stat.loopLevel]
          let pointsInLine = lineInLevel.length

          if (pointsInLine === 0) {
            firstPoint = pointstart // _e_
          } else {
            let lastPointInLine = lineInLevel[lineInLevel.length - 1]
            firstPoint = lastPointInLine
          }

          let newmat = stat.matrices[stat.loopLevel] // from loopLevel

          stat.loopLevel += 1 // eg.  in {0,7} up one loopLevel with new context
          stat.linesLifo[stat.loopLevel] = [firstPoint]  // init new line with first point
          stat.matrices[stat.loopLevel] = newmat.clone() // inherit matrix

          stat.lineCounter += 1  // eg. 215
          stat.openlines.push(stat.lineCounter)  // eg. [0, 1, 2, 192, 214, 215]
          stat.lines[stat.lineCounter] = stat.linesLifo[stat.loopLevel]

          stat.features[stat.lineCounter] = {
            type: 'Feature',
            geometry: {
              type: 'MultiLineString',
              coordinates: Array.of(stat.linesLifo[stat.loopLevel]),
            },
            properties: {
              
            },
          }

        // Down context
        } else if (ch === ']') {

          let lastLineInLifoIdx = stat.linesLifo.length - 1
          if (stat.linesLifo[lastLineInLifoIdx].length > 1) {

            let lastLineInLifo = stat.linesLifo[lastLineInLifoIdx]
            stat.lines.push(lastLineInLifo) // _e_

          }

          stat.loopLevel -= 1   // (fluctuate) loop loopLevel one down when close context
          stat.linesLifo.splice(-1, 1) // drop last loop
          stat.matrices.splice(-1, 1) // drop last matrix
          stat.openlines.splice(-1, 1) // drop last open line eg. [0, 1, 2, 192, 214]

        }
      }

      return stat.features
      // return stat.lines
    }

    // ............................. lindenmayer
    let lindenmayer = lindenmayer => {
      let geo = linden(lindenmayer)
      
        let lines = geo.reduce( (p,q) => {
          let res = p
          if (q.geometry.coordinates.length > 0) {
            res.push(q.geometry.coordinates[0])
          }
          return res
        }, [])

      
      let geoData = {
        type: 'Feature',
        geometry: {
          type: 'MultiLineString',
          coordinates: lines,
        },
        properties: {},
      }
      return geoData
    }

    // ............................. linden
    let linden = d => curve({
        fractal: fractalize(d).fractal ,
        mayer: d.mayer,
      })

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
