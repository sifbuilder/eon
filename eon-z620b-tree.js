/* ******************************************
   *    @eonZ620bTree
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ620bTree = global.eonZ620bTree || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [

      eonEohalMars,

      eonRenderSvg,
    ] = await Promise.all([

      __eo('xs').b('eon-eohal-mars'),

      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    let eonMuonStore = __eo('eonMuonStore')

    // .................. animas
    let z = function () {
    // .................. pics
      let eotim = {'td': 3800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      // .................. buildBranch - from branch end build new branch
      const buildBranch = (length, angle, depth, maxDepth, branchWidth, branchColor, maxAngleDelta, branchShrinkage, tree, directions) => {
        let step = Math.floor(depth)
        let newTree = []

        let newDepth = Math.floor(depth - 1) // depth: 2, 1, 0 , newDepth: 1, 0
        if (newDepth <= 0) { return tree }

        // let newBranchColor = shadeRGBColor(branchColor, 0.1)

        for (let i = 0; i < tree.length; i++) {
          let branch = tree[i]
          let branchLength = branch.length
          if (step <= branchLength) {
            newTree.push(branch)
          } else if (step >= branchLength) {
            let newAngle = angle + maxAngleDelta * (Math.random() * 0.5)
            let newLength = length * (branchShrinkage + Math.random() * (1.0 - branchShrinkage))

            let x1 = branch[branch.length - 1][0]
            let y1 = branch[branch.length - 1][1]

            let newStems = directions
              .filter(d => true)
              .map(direction => {
                let dirAngle = newAngle + maxAngleDelta * (Math.random() * 0.5 * direction)
                let dirLength = newLength * (branchShrinkage + Math.random() * (1.0 - branchShrinkage))

                const x2 = x1 + dirLength * Math.cos(dirAngle)
                const y2 = y1 + dirLength * Math.sin(dirAngle)

                let newbranch = [...branch, [x2, y2] ]
                return newbranch
              })

            newTree = [...newTree, ...newStems]
          }
        }

        return newTree
      }

      // .................. buildTree - from tree init to leaves
      const buildTree = (x0, y0, length, angle, depth, maxDepth, trunkWidth, branchColor, maxAngleDelta, branchShrinkage, tree, directions) => {
        if (tree === undefined || tree.length === 0) {
          let x1 = x0
          let y1 = y0
          let x2 = x1 + length * Math.cos(angle)
          let y2 = y1 + length * Math.sin(angle)
          tree = Array.of([ [x1, y1], [x2, y2] ]) // MultiLineString geometry
        }

        let newtree = buildBranch(length, angle, depth, maxDepth, trunkWidth, branchColor, maxAngleDelta, branchShrinkage, tree, directions)
        return newtree
      }

      // .................. treeAni1
      let treeAni1 = {

        eohal: eonEohalMars,

        eofold: ani => {
          let eoload = ani.eoload

          let feature = {
            type: 'Feature',
            geometry: { type: 'MultiLineString', coordinates: [] },
            properties: {},
          }

          let uidPreitem = ani.eoric.uid
          let preAnigram = uidPreitem ? eonMuonStore.findAnigramFromUid(uidPreitem) : null
          let preGeoj = preAnigram ? preAnigram.eofold : feature // geo Feature.MultiLineString

          let preTree
          if (preGeoj.type === 'FeatureCollection') {
            preTree = preGeoj.features[0].geometry.coordinates
          } else {
            preTree = preGeoj.geometry.coordinates
          }

          const maxDepth = eoload.tree.maxDepth,
            depth = eoload.tree.depth,
            trunkWidth = eoload.tree.trunkWidth,
            branchColor = eoload.tree.branchColor,
            length = eoload.tree.length0,
            angle = eoload.tree.angle0,
            x0 = eoload.tree.x0,
            y0 = eoload.tree.y0,
            branchShrinkage = eoload.tree.branchShrinkage,
            maxAngleDelta = eoload.tree.maxAngleDelta,
            directions = eoload.tree.directions

          let tree = buildTree(x0, y0, length, angle, depth, maxDepth, trunkWidth, branchColor, maxAngleDelta, branchShrinkage, preTree, directions)

          feature.geometry.coordinates = tree

          let newFeatureCollection = {type: 'FeatureCollection', features: []}
          newFeatureCollection.features.push(feature)
          return newFeatureCollection
        },

        eotim: eotim,
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani1'},
        eocrom: {'csx': 0, 'cf': 555, 'cs': 777, 'cw': 0.9, 'co': 0.0072, 'cp': 0.7},

        eoload: {
          tree: {
            x0: -120,
            y0: -120,
            length0: 60,
            angle0: Math.PI / 2,

            directions: [-2, 0, 2],
            maxDepth: 7, // 11
            depth: [[[0, 7]]], // 11
            trunkWidth: 12,
            branchColor: 'rgb(101, 67, 33)',
            branchShrinkage: 0.7, // 0.8,
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

          let feature = {
            type: 'Feature',
            geometry: { type: 'MultiLineString', coordinates: [] },
            properties: {},
          }

          let uidPreitem = ani.eoric.uid
          let preAnigram = uidPreitem ? eonMuonStore.findAnigramFromUid(uidPreitem) : null
          let preGeoj = preAnigram ? preAnigram.eofold : feature // geo Feature.MultiLineString

          let preTree
          if (preGeoj.type === 'FeatureCollection') {
            preTree = preGeoj.features[0].geometry.coordinates
          } else {
            preTree = preGeoj.geometry.coordinates
          }

          const maxDepth = eoload.tree.maxDepth,
            depth = eoload.tree.depth,
            trunkWidth = eoload.tree.trunkWidth,
            branchColor = eoload.tree.branchColor,
            length = eoload.tree.length0,
            angle = eoload.tree.angle0,
            x0 = eoload.tree.x0,
            y0 = eoload.tree.y0,
            branchShrinkage = eoload.tree.branchShrinkage,
            maxAngleDelta = eoload.tree.maxAngleDelta,
            directions = eoload.tree.directions

          let tree = buildTree(x0, y0, length, angle, depth, maxDepth, trunkWidth, branchColor, maxAngleDelta, branchShrinkage, preTree, directions)

          feature.geometry.coordinates = tree

          let newFeatureCollection = {type: 'FeatureCollection', features: []}
          newFeatureCollection.features.push(feature)
          return newFeatureCollection
        },

        eotim: eotim,
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani2'},
        eocrom: {'csx': 0, 'cf': 555, 'cs': 777, 'cw': 0.9, 'co': 0.0072, 'cp': 0.7},

        eoload: {
          tree: {
            x0: 20,
            y0: -40,
            length0: 40,
            angle0: Math.PI / 2,

            directions: [-1, 0, 1],
            maxDepth: 7, // 11
            depth: [[[0, 7]]], // 11
            trunkWidth: 12,
            branchColor: 'rgb(101, 67, 33)',
            branchShrinkage: 0.7, // 0.8,
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

          let feature = {
            type: 'Feature',
            geometry: { type: 'MultiLineString', coordinates: [] },
            properties: {},
          }

          let uidPreitem = ani.eoric.uid
          let preAnigram = uidPreitem ? eonMuonStore.findAnigramFromUid(uidPreitem) : null
          let preGeoj = preAnigram ? preAnigram.eofold : feature // geo Feature.MultiLineString

          let preTree
          if (preGeoj.type === 'FeatureCollection') {
            preTree = preGeoj.features[0].geometry.coordinates
          } else {
            preTree = preGeoj.geometry.coordinates
          }

          const maxDepth = eoload.tree.maxDepth,
            depth = eoload.tree.depth,
            trunkWidth = eoload.tree.trunkWidth,
            branchColor = eoload.tree.branchColor,
            length = eoload.tree.length0,
            angle = eoload.tree.angle0,
            x0 = eoload.tree.x0,
            y0 = eoload.tree.y0,
            branchShrinkage = eoload.tree.branchShrinkage,
            maxAngleDelta = eoload.tree.maxAngleDelta,
            directions = eoload.tree.directions

          let tree = buildTree(x0, y0, length, angle, depth, maxDepth, trunkWidth, branchColor, maxAngleDelta, branchShrinkage, preTree, directions)

          feature.geometry.coordinates = tree

          let newFeatureCollection = {type: 'FeatureCollection', features: []}
          newFeatureCollection.features.push(feature)
          return newFeatureCollection
        },

        eotim: eotim,
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani3'},
        eocrom: {'csx': 0, 'cf': 555, 'cs': 777, 'cw': 0.9, 'co': 0.0072, 'cp': 0.7},

        eoload: {
          tree: {
            x0: 120,
            y0: 20,
            length0: 20,
            angle0: Math.PI / 2,

            directions: [-1, 1],
            maxDepth: 7, // 11
            depth: [[[0, 7]]], // 11
            trunkWidth: 12,
            branchColor: 'rgb(101, 67, 33)',
            branchShrinkage: 0.7, // 0.8,
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
  exports.eonZ620bTree = anitem
}))
