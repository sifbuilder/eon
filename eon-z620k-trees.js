/* ******************************************
   *    @eonZ620kTrees
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ620kTrees = global.eonZ620kTrees || {})))
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
    eonRenderSvg,

    eonMuonGeoj,
    eonMuonLacer,
    eonMuonLindenmayer,
    eonMuonSnap,
    eonProtonUniwen,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-sol'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-muon-soma'),
    __eo('xs').b('eon-render-svg'),

    __eo('xs').b('eon-muon-geoj'),
    __eo('xs').b('eon-muon-lacer'),
    __eo('xs').b('eon-muon-lindenmayer'),
    __eo('xs').b('eon-muon-snap'),
    __eo('xs').b('eon-proton-uniwen'),

  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  let eonMuonStore = __eo('eonMuonStore')

  // .................. animas
  let z = function () {
    let aniFormA = {

      eotim: { td: 24200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 },
      eoric: { gid: 'ani', cid: 'ani', fid: 'aniA' },
      eohal: eonEohalMars,

      eofold: ani => {
        let gj = eonMuonLindenmayer.multiLine(ani.eoload.lindenmayer)
        return gj
      },

      eocrom: { 'csx': 6, 'cf': [[[111, 999]]], 'cs': 666, 'cw': [[[0.9, 0.9]]], 'co': [[[0.7, 0.7]]], 'cp': [[[0.9, 0.9]]]},
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [0.33, 0.33, 0.33],
          translate: {x: -150, y: 100 },

          rotate: [ 0, 0, 0 ],
        },
      },
      eoload: {

        lindenmayer: { // Penrose3
          linden: {
            axiom: '[N]++[N]++[N]++[N]++[N]',
            loopq: 4,
            rules: {
              M: 'OF++PF----NF[-OF----MF]++',
              N: '+OF--PF[---MF--NF]+',
              O: '-MF++NF[+++OF++PF]-',
              P: '--OF++++MF[+PF++++NF]--NF',
              F: '',
            },
          },
          mayer: {
            side: 24,
            angunit: 36,
            angstart: 0,
            start: [0, 0],
          },
        },

      },
    }

    // .................. pics
    let aniForm = {

      eohal: eonEohalMars,
      eotim: { td: 12800, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 0 },
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani' },

      eofold: ani => {
        let t = ani.eotim.unElapsed

        let gj1 = eonMuonLindenmayer.multiLine(ani.eoload.lindenmayer1)
        let coors1 = gj1.geometry.coordinates[0]

        return gj1
      },

      eocrom: { 'csx': 6, 'cf': 999, 'cs': 111, 'cw': 0.9, 'co': 0.99, 'cp': 0.9},
      eomot: {
        proform: {

          projection: 'uniwen',
          //          0       1   2     3     4     5
          scale: 3.50,
          translate: {x: -275, y: -100 },
          rotate: [ 0, 0, 0 ],

        },
      },
      eoload: {
        lindenmayer1: { //
          linden: {
            axiom: 'AFA+F+AFA',
            loopq: 3,
            feet: 1,
            rules: {
              A: '-BF+AFA+FB-',
              B: '+AF-BFB-FA+',
            },
          },
          mayer: {
            side: 1,
            angunit: 36,
            angstart: 36,
            start: [0, 0],
          },
        },

      },
    }

    // .................. somaAni
    let somaAni = {

      eohal: eonEohalMars,
      eotim: {'td': 6800, 't0': 0, 't1': 1, 't2': 1, 't3': 1},
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani2'},

      eofold: null,

      eocrom: {csx: 3, cf: 555, cs: 111, cw: 6.9, co: 0.0072, cp: 0.69},
      eoload: {},
    }

    let p = {
      // eocrom: {csx: 2, cf: 555, cs: 111, cw: 2.9, co: 0.0072, cp: 0.99},
      // eocrom: {csx: 3, cf: 555, cs: 111, cw: 6.9, co: 0.0072, cp: 0.99},
      x0: 0, y0: -160,
      growthDir: Math.PI / 2,

      depth: [[[0, 7]]], // [[[0, 12]]], // depth iter

      growunit: 8, // rate of feature growth in tick
      maxSpreadAngle: 1 * Math.PI / 2, // max abs ang delta
      mitoDirections: [ -1.1, 0, 0.9 ], // [ -1.1, 0.9 ], // number of deviations

      shrinkage: 0.8, // 0.9, // size shrink
      colordelta: 150, // 100, // color delta between gens

      subgrow: 1, // inside growth
      subgrowunit: [1, 0.1, 1], // rate of feature growth in tick
      subSpreadAngle: Math.PI / 12, // width of secondary deviation
      subMitoDirs: [0.1], // direction in stems
      subShrinkage: 0.9, // size shrink
      subgrowrate: (i, q) => 1,
    }

    let q = 20
    let treeanis = []
    for (let i = 0; i < q; i++) {
      let anii = eonMuonProps.clone(somaAni)
      anii.eoload.soma = p
      anii.eoload.soma.x0 = 100
      anii.eoload.soma.y0 = -100
      anii.eoric.fid = 'ani' + i

      anii.eofold = eonMuonSoma.somafold

      treeanis.push(anii)
    }

    // .................. animas
    let animas = []
    animas.push(aniFormA)
    animas.push(aniForm)
    animas = animas.concat(treeanis)

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ620kTrees = anitem
}))


