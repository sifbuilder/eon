/* ******************************************
   *    @eonZ189eChristmasLace
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ189eChristmasLace = global.eonZ189eChristmasLace || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    ctlWen,
    eohalMars,
    muonNatform,
    muonProps,
    muonGeom,
    muonGraticule,
    muonProfier,
    muonProj3ct,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').m('natform'),
    __eo('xs').m('props'),
    __eo('xs').m('geom'),
    __eo('xs').m('graticule'),
    __eo('xs').m('profier'),
    __eo('xs').m('proj3ct'),
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

    let radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt

    let fact = n => n - 1 > 0 ? n * fact(n - 1) : n
    let fact0 = 1,
      fact1 = 1,
      fact2 = 2,
      fact3 = 6,
      fact4 = 24,
      fact5 = 120,
      fact6 = 720,
      fact7 = 5040,
      fact8 = 40320,
      fact9 = 362880
    let infact0 = 1 / fact0,
      infact1 = 1 / fact1,
      infact2 = 1 / fact2,
      infact3 = 1 / fact3,
      infact4 = 1 / fact4,
      infact5 = 1 / fact5,
      infact6 = 1 / fact6,
      infact7 = 1 / fact7,
      infact8 = 1 / fact8,
      infact9 = 1 / fact9

    let sinp = [infact0, 0, -infact2, 0, infact4, 0, -infact6, 0, infact8]
    let cosp = [0, infact1, 0, -infact3, 0, infact5, 0, -infact7, 0, infact9]
    let exp = [infact0, infact1, infact2, infact3, infact4, infact5, infact6, infact7, infact8, infact9]

    // ............................. pics
    let eotim = {'td': 12600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tf: t => 1 - 4 * (t - 0.5) * (t - 0.5)}

    let conform = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 180, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c) => {
          let a = 6 // a: frequency
          let h = 90 // h: height
          let r = 90 // r: radius
          let x = e[0]
          let y = e[1]
          let z = e[2]
          let w = e[3]
          let d = 0.157 // radians * 36 / 360 // 0.157  , z.seg5: 36, xy.dom: 360
          let res = cos(x) * cos(4 * y)
          // let res = ( (h - z) / h ) * r * cos( a * z )

          return res
        },
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 180, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, dax) => {
          let a = 6 // a: frequency
          let h = 90 // h: height
          let r = 90 // r: radius
          let x = e[0]
          let y = e[1]
          let z = e[2]
          let w = e[3]
          let d = 0.157 // radians * 36 / 360 // 0.157  , z.seg5: 36, xy.dom: 360
          let res = sin(y) * cos(4 * y)
          // let res = ( (h - z) / h ) * r * sin( a * z )

          return res
        },

      },

      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
        'dom3': [0, 90],
        c: [ [[[94, 104]]], 1, 1, 1],
        'fn0': (e, c, dax) => {
          let a = 6 // a: frequency
          let h = 90 // h: height
          let r = 90 // r: radius
          let x = e[0] // dom:[-180, 180] : [-1.57, 1.57]
          let y = e[1] // dom:[-180, 180] : [-1.57, 1.57]
          let z = e[2]
          let w = e[3] // [0, 3.14] : [0, 2 * 1.57]
          let d = 0.157 // radians * 36 / 360 // 0.157  , z.seg5: 36, xy.dom: 360
          let s = dax.c[0]

          // let res = 0.001 * x * s + cos(s * z)

          let res = z + x * d / 4

          return res
        },
      },

      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
        'dom3': [0, 90],
        'fn0': (e, c, dax) => {
          return e[2]
        },

      },

    }

    // let eocrom = { 'csx': 1, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
    let eocrom = { 'csx': 0, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
      'cs': [[[666, 333, 666]]], 'cw': [[[0.7, 0.7, 0.7]]], 'cp': [[[0.9, 0.9]]]}

    // ............................. natAni
    let natAni = {

      eohal: eohalMars,

      eofold: ani => {
        let natipros = {
          eoform: ani.eoform,
          ghv: 1, // horizontal geodesics
          gsa: 0, // symetric distribution of geodesics around the origin
          gco: 0, // closed line
        }
        let form = muonNatform.natMultiLineString(natipros)

        return form
      },
      eotim,

      eoric: {gid: 'q', cid: 'q', fid: 'q'},
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 1, 1 ],
          prerotate: [[[ ctl.rotation ]]],
          translate: [ [0, 60, 0] ],
          rotate: [ 90, 0, 0 ],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: eocrom,

      eoform: conform,
      eoload: {

      },

    }

    // ............................. animas
    let animas = [

      natAni, // h.natform

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ189eChristmasLace = anitem
}))