/* ******************************************
   *    @eonZ620lTrees
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ620lTrees = global.eonZ620lTrees || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonCtlWen,
      eonEohalMars,
      eonEohalSol,
      eonMuonProps,
      eonMuonSoma,
      eonMuonGeoj,
      eonMuonLacer,
      eonMuonLindenmayer,
      eonMuonSnap,
      eonProtonUniwen,
      eonRenderPortview,
      eonRenderSvg,

    ] = await Promise.all([
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-sol'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-muon-soma'),
      __eo('xs').b('eon-muon-geoj'),
      __eo('xs').b('eon-muon-lacer'),
      __eo('xs').b('eon-muon-lindenmayer'),
      __eo('xs').b('eon-muon-snap'),
      __eo('xs').b('eon-proton-uniwen'),
      __eo('xs').b('eon-render-portview'),
      __eo('xs').b('eon-render-svg'),

    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    let eonMuonStore = __eo('eonMuonStore')

    // .................. animas
    let z = function () {
      let animas = []

      let width = eonRenderPortview.width(), height = eonRenderPortview.height()

      let eocrom = [
        {csx: 2, cf: 555, cs: 111, cw: 4.9, co: 0.0072, cp: 0.99},
        {csx: 3, cf: 555, cs: 111, cw: 4.9, co: 0.0072, cp: 0.99},
      ]

      // .................. somaAni
      let somaAni = {

        eohal: eonEohalMars,
        eotim: {'td': 9800, 't0': 0, 't1': 1, 't2': 1, 't3': 1},
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani2'},

        eofold: null,

        eocrom: {csx: 3, cf: 555, cs: 111, cw: 6.9, co: 0.0072, cp: 0.69},
        eoload: {},
      }

      let soma = {
        x0: 0, y0: -160,
        growthDir: Math.PI / 2,

        depth: [[[0, 6]]], // [[[0, 12]]], // depth iter

        growunit: 8, // rate of feature growth in tick
        maxSpreadAngle: 1 * Math.PI / 2, // max abs ang delta
        mitoDirections: [ -1.1, 0, 0.9 ], // [ -1.1, 0.9 ], // number of deviations

        shrinkage: 0.8, // 0.9, // size shrink
        colordelta: 200, // 100, // color delta between gens

        subgrow: 1, // inside growth
        subgrowunit: [1, 0.1, 1], // rate of feature growth in tick
        subSpreadAngle: Math.PI / 12, // width of secondary deviation
        subMitoDirs: [0.1], // direction in stems
        subShrinkage: 0.9, // size shrink
        subgrowrate: (i, q) => 1,

      }

      let qh = 10
      let qv = 4
      let treeanis = new Array(qh * qv)
      let tidx = eonMuonProps.tidx(qh, qv, 1, 1)

      let hvar = 10
      let hsep = 40
      let vmar = 0
      let vsep = 50

      for (let iv = 0; iv < qv; iv++) {
        for (let ih = 0; ih < qh; ih++) {
          let idx = tidx(ih, iv)

          let anii = eonMuonProps.clone(somaAni)
          anii.eoric.fid = 'ani' + idx

          let dist = (0.5 - ih % 2)
          let htol = (0.5 - Math.random())
          let crom = Math.floor(0.5 + Math.random())

          anii.eoload.soma = eonMuonProps.clone(soma)
          anii.eoload.soma.x0 = (hvar * htol) + dist * (hsep * ih)
          anii.eoload.soma.y0 = vmar - (vsep * iv)

          anii.eofold = eonMuonSoma.somafold
          anii.eocrom = eocrom[crom]

          treeanis[idx] = anii
        }
      }

      // .................. animas

      animas = animas.concat(treeanis)

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ620lTrees = anitem
}))
