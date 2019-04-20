/* ******************************************
   *    @eonZ752dD3gratSvgScene
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ752dD3gratSvgScene = global.eonZ752dD3gratSvgScene || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    muonGraticule,
    ctlWen,
    protonNatform,
    eohalMars,
    eohalNatform,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').m('graticule'),
    __eo('xs').c('wen'),
    __eo('xs').p('natform'),
    __eo('xs').e('mars'),
    __eo('xs').e('natform'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = ctlWen().control(renderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let eotim = {'td': 19800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}
    let form = {

      'x': {
        'm1': 6, 'm2': 6, 'n1': 60, 'n2': 100, 'n3': 30, 'a': 1, 'b': 1,
        'm1': 2, 'm2': 2, 'n1': 1, 'n2': 1, 'n3': 1, 'a': 1, 'b': 1, //
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
        'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 8, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
      // fn0: (a,b,c,d) => a**0 * b**0 * c**0 * d**1

      },
      'y': {
        'm1': 2, 'm2': 2, 'n1': 1, 'n2': 1, 'n3': 1, 'a': 1, 'b': 1,			// biform
        'm1': 2, 'm2': 2, 'n1': 1, 'n2': 1, 'n3': 1, 'a': 1, 'b': 1, //
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
        'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 8, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
      // fn0: (a,b,c,d) => a**0 * b**0 * c**0 * d**1

      },
      'z': {
        'm1': 2, 'm2': 2, 'n1': 1, 'n2': 1, 'n3': 1, 'a': 1, 'b': 1,			// biform
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
        'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4, 'pa6': 0, 'pb7': -1,
        'dom3': [-90, 90],
      // fn0: (a,b,c,d) => a**0 * b**0 * c**0 * d**1
      // fn0: (a,b,c,d) => { let r = Complex({re: a, im: b}).toVector()[0];  return r }

      },
    }

    let conform = {
      projection: 'natform',
      eoform: form,
    }

    let proform = {

      prerotate: [[[ ctl.rotation ]]],
      projection: 'uniwen',
      translate: [ 0, 0, 0],
      rotate: [ 0, [[[0, 360]]], 0 ],
      scale: 1,

    }

    // .................. gratiform
    let gratiform = {

      eohal: eohalMars,

      eofold: p => muonGraticule.gjfMultiLineString({multiframe: p.eoload.geoframe}),
      eotim: eotim,
      eoric: { gid: 'gratiform', cid: 'gratiform', fid: 'gratiform' },

      eocrom: { 'csx': 0, 'cf': [[[666, 666]]], 'cs': 333, 'cw': 0.9, 'co': [[[0.03, 0.03, 0.03]]], 'cp': [[[0.9, 0.9, 0.9]]]},

      eomot: {
        conform: conform,

        proform: proform,
      },

      eoload: {
        geoframe: [
          [-180, 180, 90, 90], // X
          [-90, 90, 45, 45], // Y
        ],
      },
    }

    // .................. animaApi
    let animas = [

      gratiform, // h.mars p.natform
    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ752dD3gratSvgScene = anitem
}))
