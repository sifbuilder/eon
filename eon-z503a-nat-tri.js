/* ******************************************
   *    @eonZ503aNatTri
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ503aNatTri = global.eonZ503aNatTri || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlWen,
    eonEohalNatform,
    eonMuonNatform,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-render-svg'),
  ])

  // .................. animas
  let z = function () {
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    // .................. pics
    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let formCirc = {

      'x': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 100, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
      },

      'y': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 100, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
      },

    }

    let formNat = {

      'x': {
        'm1': [[[2, 6, 6]]], 'm2': [[[2, 6, 6]]], 'n1': [[[0.3, 2, 2]]], 'n2': [[[-3, 2, 2]]], 'n3': [[[8, 0, 0]]], 'a': [[[8, 2, 3]]], 'b': [[[8, 1, 1]]], // tri
        'ra2': 100, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
      },

      'y': {
        'm1': [[[2, 6, 6]]], 'm2': [[[2, 6, 6]]], 'n1': [[[0.3, 2, 2]]], 'n2': [[[-3, 2, 2]]], 'n3': [[[8, 0, 0]]], 'a': [[[8, 2, 3]]], 'b': [[[8, 1, 1]]], // tri
        'ra2': 100, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
      },

    }

    let proform = {
      'projection': 'uniwen',
      'translate': [ [[[-100, 100]]], [[[-100, 100]]] ], // [[[ stace ]]] ],
      'scale': 1,
      prerotate: [[[ ctl.rotation ]]],
      'rotate': [ 0, 0, [[[0, 0]]] ],
      'lens': [0, 1, 12],
    }
    let eocrom = { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.9, 0.9]]], 'cs': [[[111, 666]]], 'cw': [[[0.3, 0.9]]], 'cp': [[[0.7, 0.9]]]}

    let eocromCirc = { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.19, 0.19]]], 'cs': [[[444, 666]]], 'cw': [[[0.3, 0.9]]], 'cp': [[[0.9, 0.9]]]}

    // ............................. animas
    let nat = {

      eohal: eonEohalNatform,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat'},

      eofold: null,
      eocrom: eocrom,
      eomot: {
        proform: proform,
      },
      eoform: formNat,
      eoload: {},

    }
    let circ = {

      eohal: eonEohalNatform,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'formCirc'},

      eofold: null,
      eocrom: eocromCirc,
      eomot: {
        proform: proform,
      },
      eoform: formCirc,
      eoload: {},

    }

    // ............................. animas
    let animas = [

      nat, // h.natform
      circ, // h.natform

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ503aNatTri = anitem
}))