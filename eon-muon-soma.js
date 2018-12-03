/**********************
   *    @muonSoma
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonSoma = global.muonSoma || {})))
}(this, function (exports) {
  'use strict'

  async function muonSoma (__mapper = {}) {
    let [
      muonProps,
    ] = await Promise.all([
      __mapper('xs').m('props'),
    ])

    let muonStore = __mapper('muonStore')
    // soma: {
    // eocrom: {csx: 3, cf: 555, cs: 111, cw: 6.9, co: 0.0072, cp: 0.99},
    // x0: -40, y0: -100,

    // growthDir: [[[1 * Math.PI / 2 ,  1 * Math.PI / 2 ]]],

    // depth: [[[0, 9]]], // [[[0, 12]]], // depth iter

    // growunit: 2, // rate of feature growth in tick
    // maxSpreadAngle: 1 * Math.PI / 2, // max abs ang delta
    // mitoDirections: [ -1.1, 0.1, 0.9 ], // [ -1.1, 0.9 ], // deviations

    // shrinkage: 0.7, // 0.9, // size shrink
    // colordelta: 160, // 100, // color delta between gens

    // subgrow: 1, // inside growth
    // subgrowunit: 0.3, // rate of feature growth in tick
    // subSpreadAngle: Math.PI / 6, // width of secondary deviation
    // subMitoDirs: [0.1], // direction in stems
    // subShrinkage: 0.9, // size shrink
    // subgrowrate: (i,q) => 8 * (q - Math.abs(i - (q /2))) / q

    // }

    // .................. mitoSoma
    let mitoSoma = function (feature, props, i) {
      let { growunit, growthDir, depth, maxDepth, branchWidt, branchColor, maxSpreadAngle, mitoDirections, eocrom, shrinkage, colordelta, subgrow, subgrowunit, subMitoDirs, subSpreadAngle, subShrinkage } = props

      let linesInNewFeature = []

      let somasInMito = feature.geometry.coordinates
      for (let j = 0; j < somasInMito.length; j++) {
        let somaInMito = somasInMito[j]

        for (let k = 0; k < mitoDirections.length; k++) { // split
          let direction = mitoDirections[k]

          let nodesInLine = somaInMito.length
          console.assert(nodesInLine >= 2, `error in line ${somaInMito}`)

          let x1 = somaInMito[nodesInLine - 1][0]
          let y1 = somaInMito[nodesInLine - 1][1]

          let inang = growthDir

          let dirAngle = inang + maxSpreadAngle * Math.random() * direction
          let dirLength = growunit * (Math.pow(shrinkage, i) + Math.random() * Math.pow((1.0 - shrinkage), i))

          const x2 = x1 + dirLength * Math.cos(dirAngle)
          const y2 = y1 + dirLength * Math.sin(dirAngle)

          let lineInNewFeature = [ [x1, y1], [x2, y2] ]
          linesInNewFeature.push(lineInNewFeature)
        }
      }

      let neweocrom = muonProps.clone(eocrom) // eocrom //
      neweocrom.cs = eocrom.cs + colordelta * i
      neweocrom.cw = eocrom.cw * Math.pow(shrinkage, i)

      let newMito = {
        type: 'Feature',
        geometry: {
          type: 'MultiLineString',
          coordinates: linesInNewFeature,
        },
        properties: {
          eocrom: neweocrom,
        },
      }

      return newMito
    }

    // .................. growSoma
    let growSoma = function (feature, props, i) {
      let { growunit, growthDir, depth, maxDepth, branchWidt, branchColor, maxSpreadAngle, mitoDirections,
        eocrom, shrinkage, colordelta, subgrow, subgrowunit, subMitoDirs, subSpreadAngle, subShrinkage, subgrowrate } = props

      let somasInMito = muonProps.clone(feature.geometry.coordinates)

      let qsomas = somasInMito.length
      for (let j = 0; j < qsomas; j++) {
        let somaInMito = somasInMito[j]

        let splits = subMitoDirs.length
        for (let k = 0; k < splits; k++) { // split
          let direction = subMitoDirs[k]

          let nodesInLine = somaInMito.length
          console.assert(nodesInLine >= 2, `error in line ${somaInMito}`)

          let x0 = somaInMito[nodesInLine - 2][0]
          let y0 = somaInMito[nodesInLine - 2][1]

          let x1 = somaInMito[nodesInLine - 1][0]
          let y1 = somaInMito[nodesInLine - 1][1]

          let inang = Math.atan2(y1 - y0, x1 - x0)

          let kangle = subSpreadAngle
          if (Array.isArray(subSpreadAngle)) {
            let angpos = k % splits
            kangle = subSpreadAngle[angpos]
          }

          let strightness = 0.5
          let dirAngle = inang + strightness * Math.random() * kangle * direction // _e_

          let dist = subgrowrate(j, qsomas)

          let ksubgrowth = subgrowunit
          if (Array.isArray(subgrowunit)) {
            let lenpos = k % splits
            ksubgrowth = subgrowunit[lenpos]
          }

          let dirLength = dist * ksubgrowth * (Math.pow(subShrinkage, i) + Math.random() * Math.pow((1.0 - subShrinkage), i))

          const x2 = x1 + dirLength * Math.cos(dirAngle)
          const y2 = y1 + dirLength * Math.sin(dirAngle)

          let updlines = [...somaInMito, [x2, y2]]

          somasInMito[j] = updlines
        }
      }
      let updfeature = muonProps.clone(feature)
      updfeature.geometry.coordinates = somasInMito
      return updfeature
    }

    // .................. neoSoma
    let neoSoma = function (props = {}) {
      let {x0, y0, growunit, growthDir, eocrom} = props

      let x1 = x0
      let y1 = y0
      let x2 = x1 + growunit * Math.cos(growthDir)
      let y2 = y1 + growunit * Math.sin(growthDir)
      let somasInMito = Array.of([ [x1, y1], [x2, y2] ])
      let stemFeature = {
        type: 'Feature',
        geometry: {
          type: 'MultiLineString',
          coordinates: somasInMito,
        },
        properties: {
          eocrom: eocrom,
        },
      }

      let features = Array.of(stemFeature)
      let soma = {
        type: 'FeatureCollection',
        features: features,
      }
      return soma
    }

    // .................. devSoma
    const devSoma = (soma, props) => {
      let { growunit, growthDir, depth, maxDepth, branchWidt, branchColor, maxSpreadAngle, mitoDirections,
        eocrom, shrinkage, colordelta, subgrow, subgrowunit, subMitoDirs, subSpreadAngle, subShrinkage } = props

      let step = Math.floor(depth) // growth orbital

      let somaFeatures = soma.features
      let qFeatures = somaFeatures.length

      let newMitos = somaFeatures // soma gens to newSoma gens

      for (let i = 0; i < qFeatures; i++) { // each gen :: feature
        if (step === qFeatures) { // if step is in or above generation
          let feature = somaFeatures[i]

          let newMito = mitoSoma(feature, props, i)

          newMitos = [...somaFeatures, newMito]
        }
      }

      if (subgrow === 1 && step < newMitos.length) {
        let feature = newMitos[step]

        let updfeature = growSoma(feature, props, step) // grow soma

        newMitos[step] = updfeature
      }

      let newSoma = {
        type: 'FeatureCollection',
        features: newMitos,
      }
      return newSoma
    }

    // .................. somafold
    let somafold = ani => {
      let eoload = ani.eoload

      const props = eoload.soma,
        x0 = props.x0,
        y0 = props.y0,
        growunit = props.growunit,
        growthDir = props.growthDir

      let eocrom = props.eocrom || ani.eocrom
      props.eocrom = eocrom

      let uidPreitem = ani.eoric.uid
      let preAnigram = uidPreitem ? muonStore.findAnigramFromUid(uidPreitem) : null
      let soma
      if (preAnigram) {
        soma = preAnigram.eofold // take preani
      } else {
        soma = neoSoma({x0, y0, growunit, growthDir, eocrom}) // neo soma
      }

      return devSoma(soma, props) // devsoma
    }

    // .................. somaAni
    let somaAni = {

      eohal: 'mars',
      eotim: {'td': 6800, 't0': 0, 't1': 1000, 't2': 1, 't3': 1},
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani2'},

      eofold: somafold,

      eocrom: {csx: 3, cf: 555, cs: 111, cw: 6.9, co: 0.0072, cp: 0.99},
      eoload: {},
    }

    // .................. soma
    let soma = (i, p) => {
      let ani = muonProps.clone(somaAni) // soma ani
      ani.eoload.soma = p // soma eoload
      ani.eoric.fid = 'ani' + i // i soma fid

      return ani
    }

    // ............................. enty
    let enty = {}

    enty.soma = soma
    enty.somafold = somafold

    return enty
  }

  exports.muonSoma = muonSoma
}))
