/* ******************************************
   *    @eonZ620gTrees
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ620gTrees = global.eonZ620gTrees || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [

      eonEohalMars,

      eonMuonProps,
      eonRenderSvg,
    ] = await Promise.all([

      __eo('xs').b('eon-eohal-mars'),

      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    let eonMuonStore = __eo('eonMuonStore')

    // .................. animas
    let z = function () {
    // .................. pics
      let eotim = {'td': 3800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      // .................. getNewFeature
      let getNewFeature = function (feature, props, i) {
        let { growunit, baseangle,
          maxAngleDelta, directions, eocrom, shrinkage, colordelta } = props

        let linesInNewFeature = []

        let linesInFeature = feature.geometry.coordinates
        for (let j = 0; j < linesInFeature.length; j++) {
          let lineInFeature = linesInFeature[j]

          for (let k = 0; k < directions.length; k++) { // split
            let direction = directions[k]

            let nodesInLine = lineInFeature.length
            console.assert(nodesInLine >= 2, `error in line ${lineInFeature}`)

            let x1 = lineInFeature[nodesInLine - 1][0]
            let y1 = lineInFeature[nodesInLine - 1][1]

            let inang = baseangle

            let dirAngle = inang + maxAngleDelta * Math.random() * direction
            let dirLength = growunit * (Math.pow(shrinkage, i) + Math.random() * Math.pow((1.0 - shrinkage), i))

            const x2 = x1 + dirLength * Math.cos(dirAngle)
            const y2 = y1 + dirLength * Math.sin(dirAngle)

            let lineInNewFeature = [ [x1, y1], [x2, y2] ]
            linesInNewFeature.push(lineInNewFeature)
          }
        }

        let neweocrom = eonMuonProps.clone(eocrom) // eocrom //
        neweocrom.cs = eocrom.cs + colordelta * i
        neweocrom.cw = eocrom.cw * Math.pow(shrinkage, i)

        let newFeature = {
          type: 'Feature',
          geometry: {
            type: 'MultiLineString',
            coordinates: linesInNewFeature,
          },
          properties: {
            eocrom: neweocrom,
          },
        }

        return newFeature
      }

      // .................. updFeature
      let updFeature = function (feature, props, i) {
        let {

          subgrowunit, subdirections, subangfact, subShrinkage } = props

        let linesInFeature = eonMuonProps.clone(feature.geometry.coordinates)

        for (let j = 0; j < linesInFeature.length; j++) {
          let lineInFeature = linesInFeature[j]

          for (let k = 0; k < subdirections.length; k++) { // split
            let direction = subdirections[k]

            let nodesInLine = lineInFeature.length
            console.assert(nodesInLine >= 2, `error in line ${lineInFeature}`)

            let x0 = lineInFeature[nodesInLine - 2][0]
            let y0 = lineInFeature[nodesInLine - 2][1]

            let x1 = lineInFeature[nodesInLine - 1][0]
            let y1 = lineInFeature[nodesInLine - 1][1]

            let inang = Math.atan2(y1 - y0, x1 - x0)
            let maxAngleDelta = Math.PI / subangfact

            let dirAngle = inang + maxAngleDelta * Math.random() * direction

            let dirLength = subgrowunit * (Math.pow(subShrinkage, i) + Math.random() * Math.pow((1.0 - subShrinkage), i))

            const x2 = x1 + dirLength * Math.cos(dirAngle)
            const y2 = y1 + dirLength * Math.sin(dirAngle)

            let updlines = [...lineInFeature, [x2, y2]]

            linesInFeature[j] = updlines
          }
        }
        let updfeature = eonMuonProps.clone(feature)
        updfeature.geometry.coordinates = linesInFeature
        return updfeature
      }

      // .................. buildBranch - from branch end build new branch
      const buildTree = (tree, props) => {
        let { depth,
          subgrow } = props

        let step = Math.floor(depth) // growth orbital

        let treeFeatures = tree.features
        let qFeatures = treeFeatures.length

        let newFeatures = treeFeatures // tree gens to newTree gens

        for (let i = 0; i < qFeatures; i++) { // each gen :: feature
          if (step >= qFeatures) { // if ste is in or above generation
            let feature = treeFeatures[i]

            let newFeature = getNewFeature(feature, props, i)

            newFeatures = [...treeFeatures, newFeature]
          } // split
        } // gen

        if (subgrow === 1 && step < newFeatures.length) {
          let feature = newFeatures[step]

          let updfeature = updFeature(feature, props, step)

          newFeatures[step] = updfeature
        }

        let newTree = {
          type: 'FeatureCollection',
          features: newFeatures,
        }
        return newTree
      }

      // .................. treeAni1
      let treeAni1 = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani1'},

        eofold: ani => {
          let eoload = ani.eoload
          let eocrom = ani.eocrom

          const soma = eoload.soma,
            x0 = eoload.soma.x0,
            y0 = eoload.soma.y0,
            growunit = eoload.soma.growunit,
            baseangle = eoload.soma.baseangle

          soma.eocrom = eocrom

          let uidPreitem = ani.eoric.uid
          let preAnigram = uidPreitem ? eonMuonStore.findAnigramFromUid(uidPreitem) : null
          let tree
          if (preAnigram) {
            tree = preAnigram.eofold
          } else {
          // ent >
            let x1 = x0
            let y1 = y0
            let x2 = x1 + growunit * Math.cos(baseangle)
            let y2 = y1 + growunit * Math.sin(baseangle)
            let linesInFeature = Array.of([ [x1, y1], [x2, y2] ])
            let stemFeature = {
              type: 'Feature',
              geometry: {
                type: 'MultiLineString',
                coordinates: linesInFeature,
              },
              properties: {},
            }
            // ent <

            let features = Array.of(stemFeature)
            tree = {
              type: 'FeatureCollection',
              features: features,
              properties: {},
            }
          }
          let newtree = buildTree(tree, soma)

          return newtree
        },

        eocrom: {csx: 3, cf: 555, cs: 111, cw: 6.9, co: 0.0072, cp: 0.99},

        eoload: {

          soma: {
            x0: 0, y0: -100,
            baseangle: Math.PI / 2, // start angle

            depth: [[[0, 12]]], // depth iter

            growunit: 2, // rate of feature growth in tick
            maxAngleDelta: Math.PI / 2, // max abs ang delta
            directions: [ -1.1, 0.9 ], // deviations

            shrinkage: 0.9, // size shrink
            colordelta: 100, // color delta between gens

            subgrow: 1, // inside growth
            subgrowunit: 1.7, // rate of feature growth in tick
            subangfact: 6, // width of secondary deviation
            subdirections: [0.1], // direction in stems
            subShrinkage: 0.9, // size shrink

            trunkWidth: 12, // initial ent size
            branchColor: [101, 67, 33], // --
            maxDepth: 8, // --
            delay: 10, // --
          },
        },
      }

      // .................. treeAni1
      let treeAni2 = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani2'},

        eofold: ani => {
          let eoload = ani.eoload
          let eocrom = ani.eocrom

          const soma = eoload.soma,
            x0 = eoload.soma.x0,
            y0 = eoload.soma.y0,
            growunit = eoload.soma.growunit,
            baseangle = eoload.soma.baseangle

          soma.eocrom = eocrom

          let uidPreitem = ani.eoric.uid
          let preAnigram = uidPreitem ? eonMuonStore.findAnigramFromUid(uidPreitem) : null
          let tree
          if (preAnigram) {
            tree = preAnigram.eofold
          } else {
          // ent >
            let x1 = x0
            let y1 = y0
            let x2 = x1 + growunit * Math.cos(baseangle)
            let y2 = y1 + growunit * Math.sin(baseangle)
            let linesInFeature = Array.of([ [x1, y1], [x2, y2] ])
            let stemFeature = {
              type: 'Feature',
              geometry: {
                type: 'MultiLineString',
                coordinates: linesInFeature,
              },
              properties: {},
            }
            // ent <

            let features = Array.of(stemFeature)
            tree = {
              type: 'FeatureCollection',
              features: features,
              properties: {},
            }
          }
          let newtree = buildTree(tree, soma)

          return newtree
        },

        eocrom: {csx: 2, cf: 555, cs: 111, cw: 6.9, co: 0.0072, cp: 0.99},

        eoload: {

          soma: {
            x0: -20, y0: -100,
            baseangle: Math.PI / 2, // start angle

            depth: [[[0, 12]]], // depth iter

            growunit: 2, // rate of feature growth in tick
            maxAngleDelta: Math.PI / 2, // max abs ang delta
            directions: [ -1, 1 ], // deviations

            shrinkage: 0.9, // size shrink
            colordelta: 100, // color delta between gens

            subgrow: 1, // inside growth
            subgrowunit: 2, // rate of feature growth in tick
            subangfact: 6, // width of secondary deviation
            subdirections: [0.1], // direction in stems
            subShrinkage: 0.9, // size shrink

            trunkWidth: 12, // initial ent size
            branchColor: [101, 67, 33], // --
            maxDepth: 8, // --
            delay: 10, // --
          },
        },
      }

      // .................. animas
      let animas = [

        treeAni1, // h.mars
        treeAni2, // h.mars

      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ620gTrees = anitem
}))
