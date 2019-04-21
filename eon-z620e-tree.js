/* ******************************************
   *    @eonZ620eTree
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ620eTree = global.eonZ620eTree || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlWen,
    eonEohalMars,
    eonEohalSol,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-sol'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  let eonMuonStore = __eo('eonMuonStore')

  // .................. animas
  let z = function () {
    // .................. pics
    let eotim = {'td': 3800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // .................. buildBranch - from branch end build new branch
    const buildTree = (tree, props = {}) => {
      let grounit = props.grounit,
        angle = props.angle,
        depth = props.depth,
        maxDepth = props.maxDepth,
        branchWidth = props.branchWidth,
        branchColor = props.branchColor,
        maxAngleDelta = props.maxAngleDelta,
        branchShrinkage = props.branchShrinkage,
        directions = props.directions,
        eocrom = props.eocrom

      let step = Math.floor(depth) // growth orbital

      let treeFeatures = tree.features
      let qFeatures = treeFeatures.length

      let newFeatures = treeFeatures // tree egns to newTree gens
      let newAngle = angle

      for (let i = 0; i < qFeatures; i++) {
        let feature = treeFeatures[i]

        if (step < qFeatures) {
        } else if (step >= qFeatures) {
          let linesInFeature = feature.geometry.coordinates // pre-gen linesInFeature

          let linesInNewFeature = []

          for (let j = 0; j < linesInFeature.length; j++) { // each line is a branch in feature (stem generation)
            let lineInFeature = linesInFeature[j]
            for (let k = 0; k < directions.length; k++) {
              let direction = directions[k]

              // let newAngle = angle + maxAngleDelta * (Math.random() * 0.5)
              // let newLength = grounit * (branchShrinkage + Math.random() * (1.0 - branchShrinkage))

              let nodesInLine = lineInFeature.length
              let x1 = lineInFeature[nodesInLine - 1][0]
              let y1 = lineInFeature[nodesInLine - 1][1]

              let dirAngle = angle + maxAngleDelta * (Math.random() * 0.5 * direction)
              let dirLength = grounit * (Math.pow(branchShrinkage, i) + Math.random() * Math.pow((1.0 - branchShrinkage), i))

              const x2 = x1 + dirLength * Math.cos(dirAngle)
              const y2 = y1 + dirLength * Math.sin(dirAngle)

              let lineInNewFeature = [ [x1, y1], [x2, y2] ]
              linesInNewFeature.push(lineInNewFeature)
            }
          }

          let neweocrom = {
            csx: 3,
            cf: 555,
            cs: eocrom.cs + 100 * i,
            cw: eocrom.cw * Math.pow(branchShrinkage, i),
            co: 0.0072,
            cp: 0.99,
          }

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

          newFeatures = [...treeFeatures, newFeature]
        } // split
      } // gen

      if (step < newFeatures.length) {
        let feature = newFeatures[step]

        let i = step
        let linesInFeature = feature.geometry.coordinates // pre-gen linesInFeature
        let linesInNewFeature = []

        for (let j = 0; j < linesInFeature.length; j++) {
          let lineInFeature = linesInFeature[j]

          let direction = 0.1

          let nodesInLine = lineInFeature.length
          console.assert(nodesInLine >= 2, `error in line ${lineInFeature}`)

          let x0 = lineInFeature[nodesInLine - 2][0]
          let y0 = lineInFeature[nodesInLine - 2][1]

          let x1 = lineInFeature[nodesInLine - 1][0]
          let y1 = lineInFeature[nodesInLine - 1][1]

          let inang = Math.atan2(y1 - y0, x1 - x0)
          let maxAngleDelta = Math.PI / 6

          let dirAngle = inang + maxAngleDelta * (Math.random() * 0.5 * direction)

          let dirLength = grounit * (Math.pow(branchShrinkage, i) + Math.random() * Math.pow((1.0 - branchShrinkage), i))

          const x2 = x1 + dirLength * Math.cos(dirAngle)
          const y2 = y1 + dirLength * Math.sin(dirAngle)

          linesInFeature[j] = [...lineInFeature, [x2, y2]]
        }

        newFeatures[step] = feature
        newFeatures[step].geometry.coordinates = linesInFeature
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

      eofold: ani => {
        let eoload = ani.eoload
        let eocrom = ani.eocrom

        let feature = {
          type: 'Feature',
          geometry: { type: 'MultiLineString', coordinates: [] },
          properties: {},
        }

        const maxDepth = eoload.tree.maxDepth,
          depth = eoload.tree.depth,
          trunkWidth = eoload.tree.trunkWidth,
          branchColor = eoload.tree.branchColor,
          grounit = eoload.tree.grounit0,
          angle = eoload.tree.angle0,
          x0 = eoload.tree.x0,
          y0 = eoload.tree.y0,
          branchShrinkage = eoload.tree.branchShrinkage,
          maxAngleDelta = eoload.tree.maxAngleDelta,
          directions = eoload.tree.directions

        let uidPreitem = ani.eoric.uid
        let preAnigram = uidPreitem ? eonMuonStore.findAnigramFromUid(uidPreitem) : null
        let tree
        if (preAnigram) {
          tree = preAnigram.eofold
        } else {
          let x1 = x0
          let y1 = y0
          let x2 = x1 + grounit * Math.cos(angle)
          let y2 = y1 + grounit * Math.sin(angle)
          let stemFeature = {
            type: 'Feature',
            geometry: {
              type: 'MultiLineString',
              coordinates: Array.of([ [x1, y1], [x2, y2] ]), // MultiLineString
            },
          }
          tree = {
            type: 'FeatureCollection',
            features: Array.of(stemFeature),
            properties: ani.eoload.eocrom,
          }
        }
        let newtree = buildTree(tree, {grounit, angle, depth, maxDepth, trunkWidth, branchColor, maxAngleDelta, branchShrinkage, directions, eocrom})

        return newtree
      },

      eotim: eotim,
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani1'},
      eocrom: {csx: 3, cf: 555, cs: 111, cw: 6.9, co: 0.0072, cp: 0.99},

      eoload: {
        tree: {
          x0: -140,
          y0: -160,
          grounit0: 2, // 60,
          angle0: Math.PI / 2,

          directions: [-2, 2],
          maxDepth: 8,
          depth: [[[0, 12]]],
          trunkWidth: 12,
          branchColor: [101, 67, 33],
          branchShrinkage: 0.9,
          maxAngleDelta: Math.PI / 2,
          delay: 10,

        },
      },
    }

    // .................. treeAni2
    let treeAni2 = {

      eohal: eonEohalMars,

      eofold: ani => {
        let eoload = ani.eoload
        let eocrom = ani.eocrom

        let feature = {
          type: 'Feature',
          geometry: { type: 'MultiLineString', coordinates: [] },
          properties: {},
        }

        const maxDepth = eoload.tree.maxDepth,
          depth = eoload.tree.depth,
          trunkWidth = eoload.tree.trunkWidth,
          branchColor = eoload.tree.branchColor,
          grounit = eoload.tree.grounit0,
          angle = eoload.tree.angle0,
          x0 = eoload.tree.x0,
          y0 = eoload.tree.y0,
          branchShrinkage = eoload.tree.branchShrinkage,
          maxAngleDelta = eoload.tree.maxAngleDelta,
          directions = eoload.tree.directions

        let uidPreitem = ani.eoric.uid
        let preAnigram = uidPreitem ? eonMuonStore.findAnigramFromUid(uidPreitem) : null
        let tree
        if (preAnigram) {
          tree = preAnigram.eofold
        } else {
          let x1 = x0
          let y1 = y0
          let x2 = x1 + grounit * Math.cos(angle)
          let y2 = y1 + grounit * Math.sin(angle)
          let stemFeature = {
            type: 'Feature',
            geometry: {
              type: 'MultiLineString',
              coordinates: Array.of([ [x1, y1], [x2, y2] ]), // MultiLineString
            },
          }
          tree = {
            type: 'FeatureCollection',
            features: Array.of(stemFeature),
            properties: ani.eoload.eocrom,
          }
        }
        let newtree = buildTree(tree, {grounit, angle, depth, maxDepth, trunkWidth, branchColor, maxAngleDelta, branchShrinkage, directions, eocrom})

        return newtree
      },

      eotim: eotim,
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani2'},
      eocrom: {csx: 3, cf: 555, cs: 111, cw: 6.9, co: 0.0072, cp: 0.99},

      eoload: {
        tree: {
          x0: 0,
          y0: -80,
          grounit0: 2, // 60,
          angle0: Math.PI / 2,

          directions: [-2, 2],
          maxDepth: 8,
          depth: [[[0, 12]]],
          trunkWidth: 12,
          branchColor: [101, 67, 33],
          branchShrinkage: 0.9,
          maxAngleDelta: Math.PI / 2,
          delay: 10,

        },
      },
    }

    // .................. treeAni3
    let treeAni3 = {

      eohal: eonEohalMars,

      eofold: ani => {
        let eoload = ani.eoload
        let eocrom = ani.eocrom

        let feature = {
          type: 'Feature',
          geometry: { type: 'MultiLineString', coordinates: [] },
          properties: {},
        }

        const maxDepth = eoload.tree.maxDepth,
          depth = eoload.tree.depth,
          trunkWidth = eoload.tree.trunkWidth,
          branchColor = eoload.tree.branchColor,
          grounit = eoload.tree.grounit0,
          angle = eoload.tree.angle0,
          x0 = eoload.tree.x0,
          y0 = eoload.tree.y0,
          branchShrinkage = eoload.tree.branchShrinkage,
          maxAngleDelta = eoload.tree.maxAngleDelta,
          directions = eoload.tree.directions

        let uidPreitem = ani.eoric.uid
        let preAnigram = uidPreitem ? eonMuonStore.findAnigramFromUid(uidPreitem) : null
        let tree
        if (preAnigram) {
          tree = preAnigram.eofold
        } else {
          let x1 = x0
          let y1 = y0
          let x2 = x1 + grounit * Math.cos(angle)
          let y2 = y1 + grounit * Math.sin(angle)
          let stemFeature = {
            type: 'Feature',
            geometry: {
              type: 'MultiLineString',
              coordinates: Array.of([ [x1, y1], [x2, y2] ]), // MultiLineString
            },
          }
          tree = {
            type: 'FeatureCollection',
            features: Array.of(stemFeature),
            properties: ani.eoload.eocrom,
          }
        }
        let newtree = buildTree(tree, {grounit, angle, depth, maxDepth, trunkWidth, branchColor, maxAngleDelta, branchShrinkage, directions, eocrom})

        return newtree
      },

      eotim: eotim,
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani3'},
      eocrom: {csx: 3, cf: 555, cs: 111, cw: 6.9, co: 0.0072, cp: 0.99},

      eoload: {
        tree: {
          x0: 100,
          y0: -20,
          grounit0: 2, // 60,
          angle0: Math.PI / 2,

          directions: [-2, 2],
          maxDepth: 8,
          depth: [[[0, 12]]],
          trunkWidth: 12,
          branchColor: [101, 67, 33],
          branchShrinkage: 0.9,
          maxAngleDelta: Math.PI / 2,
          delay: 10,

        },
      },
    }

    // .................. animas
    let animas = [

      treeAni1, // h.mars
      treeAni2, // h.mars
      treeAni3, // h.mars

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ620eTree = anitem
}))
