/* ******************************************
   *    @eonZ710aNatCwen
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ710aNatCwen = global.eonZ710aNatCwen || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonMuonProps,
    eonCtlWen,
    eonEohalNatform,
    eonEohalMars,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) { }
  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let proformNat = {
      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [ [0, 0, 0] ],
      scale: 1,
      rotate: [ 0, 0, 0 ],
      lens: [0, 1, 24],
    }
    let proformCirc = {
      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [ [0, 0, 0] ],
      scale: 0.3,
      rotate: [ 0, 0, 0 ],
      lens: [0, 1, 12],
    }

    // -------------------------------  nat
    let nat = {

      eohal: eonEohalNatform,
      eotim,
      eoric: {'gid': 'nat', 'cid': 'nat', 'fid': 'nat'},

      eofold: null,

      eomot: {
        proform: proformNat,
      },

      eocrom: { 'csx': 0, 'cf': [[[888, 555, 111]]], 'co': [[[0.9, 0.9]]], 'cs': [[[555, 666]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.7, 0.9]]]},

      eoform: {'m1': [[[4, 3.93]]], 'm2': [[[4, 3.93]]], 'n1': 2, 'n2': 2, 'n3': [[[2, 1]]], 'a': [[[2, 3]]], 'b': 1},

      eoload: {
      },

    }
    // -------------------------------  circ
    let circ = {

      eohal: eonEohalNatform,

      eofold: null,
      eotim,

      eoric: {'gid': 'nat', 'cid': 'nat', 'fid': 'circ'},
      eomot: {
        proform: proformCirc,
      },

      eocrom: { 'csx': 0, 'cf': [[[222, 222, 444]]], 'co': [[[0.9, 0.9]]], 'cs': [[[555, 666]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.7, 0.9]]]},

      eoform: {'m1': [[[4, 4]]], 'm2': [[[4, 4]]], 'n1': 4, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1},
      eoload: {

      },

    }

    // .................. animas
    let animas = [
      nat, // h.mars g.uniwen
      circ, // h.mars g.uniwen

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ710aNatCwen = anitem
}))

