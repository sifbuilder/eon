/* ******************************************
   *    @eonZ502aNatEgg
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ502aNatEgg = global.eonZ502aNatEgg || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    ctlWen,
    eohalNatform,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').c('wen'),
    __eo('xs').e('natform'),
    __eo('xs').r('svg'),
  ])

  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = ctlWen().control(renderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let eotim = {td: 16800, t0: 0, t1: 1, t2: 1, t3: 1}
    let formCirc = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 2, 'b': 1, // circ
        'ra2': 60, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 2, 'b': 1, // circ
        'ra2': 60, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
      },
    }

    let formNat = {
      x: {
        'm1': 2, 'm2': 2, 'n1': 0.3, 'n2': -3, 'n3': 8, 'a': 8, 'b': 8, // egg
        'ra2': 60, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
      },
      y: {
        'm1': 2, 'm2': 2, 'n1': 0.3, 'n2': -3, 'n3': 8, 'a': 8, 'b': 8, // egg
        'ra2': 60, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
      },
    }

    let stace = {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 4, 'b': 2, // circle
      'ra2': 30, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
    }

    let eocromNat = { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.9, 0.9]]], 'cs': [[[111, 666]]], 'cw': [[[0.3, 0.9]]], 'cp': [[[0.7, 0.9]]]}

    let eocromCirc = { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.39, 0.39]]], 'cs': [[[111, 666]]], 'cw': [[[0.3, 0.9]]], 'cp': [[[0.7, 0.9]]]}

    let proform = {

      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [ [0, 0, 0], [[[ stace ]]] ],
      scale: 1,
      rotate: [ 0, 0, 60 ],
      lens: [0, 1, 12],

    }

    // ............................. animas
    let nat = {
      eohal: eohalNatform,
      eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat'},
      eofold: null,
      eocrom: eocromNat,
      eomot: {
        proform,
      },
      eoform: formNat,
      eoload: {},
    }

    let circ = {
      eohal: eohalNatform,
      eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'formCirc'},
      eofold: null,
      eocrom: eocromCirc,
      eomot: {
        proform,
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
  exports.eonZ502aNatEgg = anitem
}))