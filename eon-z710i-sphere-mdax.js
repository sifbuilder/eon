/* ******************************************
   *    @eonZ710iSphereMdax
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ710iSphereMdax = global.eonZ710iSphereMdax || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonMuonNatform,
    eonMuonProps,
    eonCtlWen,
    eonEohalNatform,
    eonEohalMars,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-muon-natform'),
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

    let radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt

    let conform1dax = {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
      'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4, 'pa6': 0, 'pb7': -1,
    }

    let conform2dax = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4, 'pa6': 0, 'pb7': -1,
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4, 'pa6': 0, 'pb7': -1,
      },
    }

    let conform3dax = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4, 'pa6': 0, 'pb7': -1,
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4, 'pa6': 0, 'pb7': -1,
      },
      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4, 'pa6': 0, 'pb7': -1,
      },
    }

    let conform4dax = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4, 'pa6': 0, 'pb7': -1,
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4, 'pa6': 0, 'pb7': -1,
      },
      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4, 'pa6': 0, 'pb7': -1,
      },
      r: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4, 'pa6': 0, 'pb7': -1,
      },
    }

    let proform1dax = {
      projection: 'uniwen',
      scale: [1, 1],
      prerotate: [[[ ctl.rotation ]]],
      translate: [ +100, +100, 0],
      rotate: [ 0, 0, 0 ],
      lens: [0, 1, Infinity],
    }

    let proform2dax = {
      projection: 'uniwen',
      scale: [1, 1],
      prerotate: [[[ ctl.rotation ]]],
      translate: [ +100, -100, 0 ],
      rotate: [ 0, 0, 0 ],
      lens: [0, 1, Infinity],
    }
    let proform3dax = {
      projection: 'uniwen',
      scale: [1, 1],
      prerotate: [[[ ctl.rotation ]]],
      translate: [ -100, +100, 0 ],
      rotate: [ 0, 0, 0 ],
      lens: [0, 1, Infinity],
    }
    let proform4dax = {
      projection: 'uniwen',
      scale: [1, 1],
      prerotate: [[[ ctl.rotation ]]],
      translate: [ -100, -100, 0 ],
      rotate: [ 0, 0, 0 ],
      lens: [0, 1, Infinity],
    }

    // .................. natAni1dax
    let natAni1dax = {
      eohal: eonEohalMars,
      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
      eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat1'},
      eomot: {
        proform: proform1dax,
      },
      eocrom: { 'csx': 0, 'cf': [[[111, 111, 111]]], 'co': [[[0.09, 0.09]]], 'cs': [[[888, 888]]], 'cw': [[[1.9, 1.9]]], 'cp': [[[0.7, 0.9]]]},
      eoform: conform1dax,
      eoload: {
      },
    }
    let natAni2dax = {
      eohal: eonEohalMars,
      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
      eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat2'},
      eomot: {
        proform: proform2dax,
      },
      eocrom: { 'csx': 0, 'cf': [[[111, 111, 111]]], 'co': [[[0.09, 0.09]]], 'cs': [[[888, 888]]], 'cw': [[[1.9, 1.9]]], 'cp': [[[0.7, 0.9]]]},
      eoform: conform2dax,
      eoload: {
      },
    }
    let natAni3dax = {
      eohal: eonEohalMars,
      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
      eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat3'},
      eomot: {
        proform: proform3dax,
      },
      eocrom: { 'csx': 0, 'cf': [[[111, 111, 111]]], 'co': [[[0.09, 0.09]]], 'cs': [[[888, 888]]], 'cw': [[[1.9, 1.9]]], 'cp': [[[0.7, 0.9]]]},
      eoform: conform3dax,
      eoload: {
      },
    }
    let natAni4dax = {
      eohal: eonEohalMars,
      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
      eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat4'},
      eomot: {
        proform: proform4dax,
      },
      eocrom: { 'csx': 0, 'cf': [[[111, 111, 111]]], 'co': [[[0.09, 0.09]]], 'cs': [[[888, 888]]], 'cw': [[[1.9, 1.9]]], 'cp': [[[0.7, 0.9]]]},
      eoform: conform4dax,
      eoload: {
      },
    }

    // .................. animas
    let animas = [

      natAni1dax, // h.mars g.uniwen
      natAni2dax, // h.mars g.uniwen
      natAni3dax, // h.mars g.uniwen
      natAni4dax, // h.mars g.uniwen

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ710iSphereMdax = anitem
}))
