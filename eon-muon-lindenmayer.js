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

    let feature = {
      type: 'Feature',
      geometry: {
        type: 'MultiLineString',
        coordinates: [],
      },
      properties: {},
    }

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
        let rule = ch // each char is a production rule

        if (loopq > 0) { // apply rules if in loop
          if (rules.hasOwnProperty(ch)) {
            let res
            if (typeof rules[ch] === 'object') {
              let vals = rules[ch].vals
              let probs = rules[ch].probs
              let rand = Math.random() * 100
              res = vals[0]
              for (let i = 0; i < probs.length; i++) {
                let svar = probs[i]
                if (rand < svar) {
                  res = vals[i]
                  break
                }
              }
            } else {
              res = rules[ch]
            }

            rule = res
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
      if (loopq <= 0) { // after last loop ...
        lindenmayer.fractal = output
        cache.linden = linden
        return lindenmayer // end iteration
      }

      lindenmayer.linden.loopq = loopq - 1 // reduce loopq loopn
      lindenmayer.linden.axiom = output // axion from previous iteration

      return fractalize(lindenmayer)
    }

    let forward = function (stat) {
      let {side,
        contextleveln = 0, // context contextleveln eg. [[[ := 3
        linesStack,
        matrices,
        randomizeStep,
      } = stat

      let newdot = []

      let pos = linesStack[contextleveln].length - 1
      console.assert(pos >= 0, `line not initalized`)
      let dot = linesStack[contextleveln][pos]
      dot[2] = dot[2] || 0 // 3D _e_
      let v3 = new Vector3(...dot)

      let t0 = new Matrix4().set(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 0)

      let v3s = new Vector3().set(side, side, side)
      let t1 = t0.scale(v3s)

      let t2 = matrices[contextleveln] // history of matrix at n[

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

    // ! Diameter level - length
    // ’ Context level - color

    // generate multiline == multifeature

    let curve = (lindenmayer) => {
      let { angunit, angstart, start = [0, 0, 0], side, randomizeStep = 0, randomizeAngle = 0, randomize = 0, randomfactor = 0.1 } = lindenmayer.mayer

      console.assert(angunit !== undefined, `angle undefined`)
      angunit = angunit * Math.PI / 180

      if (angstart !== undefined) {
        angstart *= Math.PI / 180
      } else {
        angstart = angunit
      }

      let pointstart = (start !== undefined) ? start : [0, 0, 0]
      let fractal = lindenmayer.fractal

      let linesStack = Array.of([]) // initialize linesStack stack
      let segments = Array.of([]) // initialize segments stack

      let matrices = [] // initialize matrices stack
      let startmat = new Matrix4().makeRotationZ(angstart)
      matrices.push(startmat) // add first matrix

      let features = Array.of({
        type: 'Feature',
        geometry: { type: 'MultiLineString', coordinates: [] },
        properties: {},
      })
      let multilines = []

      let contextleveln = 0 // contextleveln is context contextleveln
      let segmentn = 0
      let openSegmentsIdx = [0]

      let stat = {side, pointstart, angstart, randomizeStep, randomizeAngle, randomfactor, angunit, contextleveln, matrices, linesStack, segments, openSegmentsIdx, segmentn, features, multilines}

      for (let ch of fractal) { // for each char in array
        let fkr = 1 + randomfactor * (0.5 - Math.random()) * randomize

        // & Pitch down by angle δ, using rotation matrix RL(δ) // Y+
        if (ch === '&') {
          let rotmat = new Matrix4().makeRotationY(angunit * fkr)
          stat.matrices[stat.contextleveln] = stat.matrices[stat.contextleveln].clone().multiply(rotmat)

        // ∧ Pitch up by angle δ, using rotation matrix RL(−δ) // Y-
        } else if (ch === '^') {
          let rotmat = new Matrix4().makeRotationY(-angunit * fkr)
          stat.matrices[stat.contextleveln] = stat.matrices[stat.contextleveln].clone().multiply(rotmat)

        // # Roll left by angle δ, using rotation matrix RH(δ) // X+
        } else if (ch === '#') { //
          let rotmat = new Matrix4().makeRotationX(angunit * fkr)
          stat.matrices[stat.contextleveln] = stat.matrices[stat.contextleveln].clone().multiply(rotmat)

        // ~ Roll right by angle δ, using rotation matrix RH(−δ) // X-
        } else if (ch === '~') {
          let rotmat = new Matrix4().makeRotationX(-angunit * fkr)
          stat.matrices[stat.contextleveln] = stat.matrices[stat.contextleveln].clone().multiply(rotmat)

        // | Turn around, using rotation matrix RU(180◦)
        } else if (ch === '|') {
          let rotmat = new Matrix4().makeRotationZ(-Math.PI * fkr)
          stat.matrices[stat.contextleveln] = stat.matrices[stat.contextleveln].clone().multiply(rotmat)

        // ignore
        } else if (ch === 'O') {

        // diameter contextlevel
        } else if (ch === '!') {
          let properties = stat.features[stat.segmentn].properties || {}
          let diameterlevel = properties.diameterlevel || 0
          let newdiameterlevel = diameterlevel + 1
          stat.features[stat.segmentn].properties = Object.assign(properties,
            {
              diameterlevel: newdiameterlevel,
            })

        // color contextlevel
        } else if (ch === '’') {
          let properties = stat.features[stat.segmentn].properties || {}
          let colorlevel = properties.colorlevel || 0
          let newcolorlevel = colorlevel + 1
          stat.features[stat.segmentn].properties = Object.assign(properties,
            {
              colorlevel: newcolorlevel,
            })

        // RU - turn right  - decrease angle // Z-
        } else if (ch === '+') {
          let rotmat = new Matrix4().makeRotationZ(-angunit * fkr)
          let newmat = stat.matrices[stat.contextleveln].clone().multiply(rotmat)
          stat.matrices[stat.contextleveln] = newmat

        // RU - turn left - increase angle ._| // Z+
        } else if (ch === '-') {
          let rotmat = new Matrix4().makeRotationZ(angunit * fkr)
          let newmat = stat.matrices[stat.contextleveln].clone().multiply(rotmat)
          stat.matrices[stat.contextleveln] = newmat

        // Forward
        } else if (ch === 'F' || ch === 'f') {
          if (stat.linesStack[stat.contextleveln].length === 0) { // if new linesStack
            let dot
            if (stat.contextleveln === 0) { // dot is first
              dot = pointstart
            } else { // dot is last from lower contextleveln linesStack
              let lastElemIdx = stat.linesStack[stat.contextleveln - 1 ].length - 1
              dot = stat.linesStack[stat.contextleveln - 1 ][lastElemIdx]
            }
            stat.linesStack[stat.contextleveln][0] = dot // initialize line
          }

          if (stat.linesStack[stat.contextleveln].length === 0) { // if new contextlevel
            if (stat.matrices.length === 0) {
              let newmat = new Matrix4().makeRotationZ(angstart) // root mat
              stat.matrices.push(newmat)
            }
          }

          let newdot = forward(stat) // get new dot
          stat.linesStack[stat.contextleveln].push(newdot) // add new dot to this-contextleveln linesStack

          let openSegmentn = stat.openSegmentsIdx[stat.openSegmentsIdx.length - 1]

          stat.features[openSegmentn].geometry.coordinates = Array.of(stat.linesStack[stat.contextleveln])

        // Up context
        } else if (ch === '[') {
          let firstPoint

          let lineInPreLevel = stat.linesStack[stat.contextleveln]
          let pointsInLine = lineInPreLevel.length

          if (pointsInLine === 0) {
            firstPoint = pointstart // _e_
          } else {
            let lastPointInPreLine = lineInPreLevel[lineInPreLevel.length - 1]
            firstPoint = lastPointInPreLine
          }

          let newmat = stat.matrices[stat.contextleveln].clone() // from contextleveln
          let newsegment = [firstPoint] // init new segment

          stat.contextleveln += 1 // eg.  in {0,7} up one contextleveln with new context
          stat.linesStack[stat.contextleveln] = newsegment // new segment to stack
          stat.matrices[stat.contextleveln] = newmat // new matrix (not changed)

          stat.segmentn += 1 // eg. 215 in openSegmentsIdx [0, 1, 2, 192, 214, 215]
          stat.openSegmentsIdx.push(stat.segmentn) //

          stat.segments[stat.segmentn] = newsegment

          let newfeature = muonProps.clone(feature)
          newfeature.geometry.coordinates.push(newsegment)
          let properties = newfeature.properties || {}

          newfeature.properties = Object.assign(properties,
            {
              contextlevel: stat.contextleveln,
              segment: stat.segmentn,
            })

          stat.features[stat.segmentn] = newfeature

        // Down context
        } else if (ch === ']') {
          stat.contextleveln -= 1 // (fluctuate) contextlevel contextleveln one down when close context
          stat.linesStack.splice(-1, 1) // drop last contextlevel
          stat.matrices.splice(-1, 1) // drop last matrix
          stat.openSegmentsIdx.splice(-1, 1) // drop last open line eg. [0, 1, 2, 192, 214]
        }
      }

      return stat.features
    }

    // ............................. lineString
    let lineString = lin => {
      let geo = multiFeature(lin).features

      let line = geo.reduce((p, q) => {
        let res = []
        let coords = q.geometry.coordinates.reduce((p, q) => {
          let res = [ ...p, ...q ] // reduce each line
          return res
        }, [])
        if (q.geometry.coordinates.length > 0) {
          res = [ ...p, ...coords ] // _e_
        }
        return res
      }, [])

      let geoData = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: line,
        },
        properties: {
          doc: 'reduced from FeatureCollection',
        },
      }

      return geoData
    }
    // ............................. multiLine
    let multiLine = lin => {
      let geo = multiFeature(lin).features

      let lines = geo.reduce((p, q) => {
        let res = p
        if (q.geometry.coordinates.length > 0) {
          res.push(q.geometry.coordinates[0])
        }
        return res
      }, [])

      let geoData = muonProps.clone(feature) // Feature MultiLineString
      geoData.geometry.coordinates = lines
      return geoData
    }

    // ............................. multiFeature
    let multiFeature = d => {
      let features = curve({
        fractal: fractalize(d).fractal,
        mayer: d.mayer,
      })
      let gj = {
        type: 'FeatureCollection',
        features: features,
      }
      return gj
    }

    // ............................. enty
    let enty = {}

    enty.fractalize = fractalize
    enty.curve = curve
    enty.multiFeature = multiFeature
    enty.multiLine = multiLine
    enty.lineString = lineString
    enty.reset = () => { cache = {}; return enty }

    return enty
  }

  exports.muonLindenmayer = muonLindenmayer
}))
