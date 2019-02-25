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

      for (let ch of axiom) { // for each char in the axiom array ...
        let rule = ch         // each char is a production rule

        if (loops > 0) {      // apply rules if in loop
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
      if (loops <= 0) {         // after last loop ...
        lindenmayer.fractal = output
        cache.linden = linden
        return lindenmayer      // end iteration
      }

      lindenmayer.linden.loops = loops - 1  // reduce loops level
      lindenmayer.linden.axiom = output // axion from previous iteration

      return fractalize(lindenmayer)
    }

    let forward = function (stat) {
      let {side,
        level,
        loopslifo,
        matrices,
        randomizeStep,
      } = stat

      let newdot = []

      // side: length of step
      // let fkr = 1.0
      // let r = Math.random()
      // if (Math.abs(r) > 0.5) fkr = r
      // side = side * fkr

      let pos = loopslifo[level].length - 1
      console.assert(pos >= 0, `line not initalized`)
      let dot = loopslifo[level][pos]
      dot[2] = dot[2] || 0        // 3D _e_
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
    // ^ Pitch up by angle δ, using rotation matrix RL(−δ)
    // # Roll left by angle δ, using rotation matrix RH(δ)  // x
    // ~ Roll right by angle δ, using rotation matrix RH(−δ)
    // | Turn around, using rotation matrix RU(180◦)


    // generate multiline == multifeature

    let curve = (lindenmayer) => {

      let { angle, angstart, start, side, randomizeStep=0, randomizeAngle=0, randomize=0, randomfactor=0.1 } = lindenmayer.mayer

      console.assert(angle !== undefined, `angle undefined`)
      let angunit = angle * Math.PI / 180

      if (angstart === undefined) angstart = angle
      angstart *= Math.PI / 180

      let pointstart = (start !== undefined) ? start : [0, 0, 0]
      let fractal = lindenmayer.fractal

      let loopslifo = Array.of([])     // initialize loopslifo stack
      let lines = Array.of([])         // initialize lines stack

      let angles = []            // initialize angles stack
      angles.push(angstart)   // add first angle

      let matrices = []               // initialize matrices stack
      let startmat = new Matrix4().makeRotationZ(angstart)
      matrices.push(startmat)   // add first matrix


      let level = 0             // level is [] context level
      let counter = 0
      let openlines = [0]

      let stat = {side, pointstart, angstart, randomizeStep, randomizeAngle, randomfactor, angunit, level, angles, matrices, loopslifo ,lines}


      for (let ch of fractal) { // for each char in array
        let fkr = 1 + randomfactor * (0.5 - Math.random()) * randomize

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
          if (stat.loopslifo[stat.level].length === 0) {  // if new loopslifo
            let dot
            if (stat.level === 0) { // dot is first 
            
              dot = pointstart  
              
            } else {    // dot is last from lower level loopslifo
              
              let lastelemidx = stat.loopslifo[stat.level - 1 ].length - 1
              dot = stat.loopslifo[stat.level - 1 ][lastelemidx]
              
            }
            stat.loopslifo[stat.level][0] = dot // initialize line
          }
          if (stat.loopslifo[stat.level].length === 0) {  // if new linslifo
            if (stat.matrices.length === 0) {
              let newmat = new Matrix4().makeRotationZ(angstart)  
              stat.matrices.push(newmat)
            }
          }

          let newdot = forward(stat)  // get new dot
          stat.loopslifo[stat.level].push(newdot) // add new dot to this-level loopslifo 

          let lastOpenLine = openlines[openlines.length - 1]
          lines[lastOpenLine] = stat.loopslifo[stat.level]  // line set to loopslifo

        // Up context
        } else if (ch === '[') {
          let lineInLevel = stat.loopslifo[stat.level]
          let pointsInLine = lineInLevel.length

          let firstPoint, newmatrix // , newangle
          if (pointsInLine === 0) {
            firstPoint = pointstart // _e_
          } else {
            let lastPointInLine = lineInLevel[lineInLevel.length - 1]
            firstPoint = lastPointInLine
          }

          newmatrix = stat.matrices[stat.level] // incomming level

          let newline = [firstPoint]  // init new line with first point

          stat.level = stat.level + 1 // new level
          stat.loopslifo[stat.level] = newline
          stat.matrices[stat.level] = newmatrix.clone() // inherit matrix

          counter = counter + 1
          openlines.push(counter)
          let lastOpenLine = openlines[openlines.length - 1]
          stat.lines[lastOpenLine] = stat.loopslifo[stat.level]

          if (1 && 1) console.log('loopslifo', stat.loopslifo.length)
          if (1 && 1) console.log('lines', stat.lines.length)

        // Down context
        } else if (ch === ']') {
          
          let lastLinesLifoIdx = stat.loopslifo.length - 1
          if (stat.loopslifo[lastLinesLifoIdx].length > 1) {
            stat.lines.push(stat.loopslifo[lastLinesLifoIdx]) // _e_
          }
          stat.level = stat.level - 1
          stat.loopslifo.splice(-1, 1) // drop last line
          stat.matrices.splice(-1, 1) // drop last matrix
          openlines.splice(-1, 1)
        }
      }


      return stat.lines
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
