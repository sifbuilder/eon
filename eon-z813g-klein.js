/* ******************************************
   *    @eonZ813gKlein
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ813gKlein = global.eonZ813gKlein || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    topojson,
    ctlWen,
    datWorldTopo110m,
    eohalMars,
    eohalSol,
    muonGeom,
    muonGraticule,
    muonNatform,
    protonNatform,
    renderPortview,
    renderSvg,
    // renderWebgl,
  ] = await Promise.all([
    __eo('xs').b('topojson'),
    __eo('xs').c('wen'),
    __eo('xs').d('worldTopo110m'),
    __eo('xs').e('mars'),
    __eo('xs').e('sol'),
    __eo('xs').m('geom'),
    __eo('xs').m('graticule'),
    __eo('xs').m('natform'),
    __eo('xs').p('natform'),
    __eo('xs').r('portview'),
    __eo('xs').r('svg'),
    // __eo('xs').r('webgl'),
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
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
      sinh = Math.sinh, cosh = Math.cosh, tanh = Math.tanh,
      exp = Math.exp,
      epsilon = 1e-5

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

    let cost = [infact0, 0, -infact2, 0, infact4, 0, -infact6, 0, infact8]
    let sint = [0, infact1, 0, -infact3, 0, infact5, 0, -infact7, 0, infact9]
    let cosht = [infact0, 0, +infact2, 0, infact4, 0, +infact6, 0, infact8]
    let sinht = [0, infact1, 0, +infact3, 0, infact5, 0, +infact7, 0, infact9]
    let expt = [infact0, infact1, infact2, infact3, infact4, infact5, infact6, infact7, infact8, infact9]

    // ............................. pics
    let eotim = {'td': 9600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tf: t => t}

    let conformKlein = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 6, 'pa6': 0, 'pb7': -1,
        dom3: [ -180, 180 ],
        c: [ [[[13, 9]]], -2, [[[3, 9]]], [[[30, 40]]] ],
        // c: [ 13, -2, 3, 30 ],
        fn0: (e, c, d) => {
          let x = e[0]
          let y = e[1]
          let z = e[2]
          let c0 = d.c[0] // [[[13,9]]]
          let c1 = d.c[1] // -2
          let c2 = d.c[2] // [[[3,9]]]
          let c3 = d.c[3] // [[[30,40]]]
          let res =
          // (1 + 0.5 * cos(x)) * cos(2 * z)
          // cos(2 * z) + 0.5 * cos(x) * cos(2 * z)

          // cos(z) * cos(z)
          // - sin(z) * sin(z)
          // + 0.5 * cos(x) *  cos(z) * cos(z)
          // - 0.5 * cos(x) *  sin(z) * sin(z)

          (c1 / c0) * cos(z) * (

            5 * Math.pow(cos(z), 1) * sin(z) * cos(x) +

             c2 * cos(x) -
             c3 * sin(z) +

             90 * Math.pow(cos(z), 4) * sin(z) -
             60 * Math.pow(cos(z), 6) * sin(z)
          )
          return res
        },
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 6, 'pa6': 0, 'pb7': -1,
        dom3: [ -180, 180 ],
        c: [ [[[13, 15]]], [[[5, 0]]], [[[5, 0]]], [[[80, 0]]], [[[80, 0]]] ],
        // c: [ 13, 5, 5, 80, 80 ],
        fn0: (e, c, d) => {
          let x = e[0]
          let y = e[1]
          let z = e[2]
          let c0 = d.c[0] // [[[13,15]]]
          let c1 = d.c[1] // [[[5,0]]]
          let c2 = d.c[2] // [[[5,0]]]
          let c3 = d.c[3] // [[[80,0]]]
          let c4 = d.c[4] // [[[80,0]]]
          let res =
          // (1 + 0.5 * cos(x)) * sin(2 * z)

          // sin(2 * z)  + 0.5 * cos(x) * sin(2 * z)
          // 2 * sin(z) * cos(z) + 0.5 * cos(x) * 2 * sin(z) * cos(z)

          -0.05 * sin(z) *
              (
                3 * cos(x) * Math.pow(cos(z), 0) -
                 3 * cos(x) * Math.pow(cos(z), 2) -
                 48 * cos(x) * Math.pow(cos(z), 4) +
                 48 * cos(x) * Math.pow(cos(z), 6) -

                 60 * sin(z) +

                 c1 * cos(x) * sin(z) * Math.pow(cos(z), 1) -
                 c2 * cos(x) * sin(z) * Math.pow(cos(z), 3) -
                 c3 * cos(x) * sin(z) * Math.pow(cos(z), 5) +
                 c4 * cos(x) * sin(z) * Math.pow(cos(z), 7)
              )
          return res
        },
      },
      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 80, 'pa6': 0, 'pb7': -1,
        'dom3': [ 0, 180 ],
        c: [ [[[13, 1]]], [[[3, 1]]], [[[5, 0]]], 1, [[[3, 1]]] ],
        // c: [ 13, 3, 5, 1, 1 ],
        fn0: (e, c, d) => {
          let x = e[0]
          let y = e[1]
          let z = e[2]
          let c0 = d.c[0] // [[[13,15]]]
          let c1 = d.c[1] // [[[3,1]]]
          let c2 = d.c[2] // [[[5,0]]]
          let c3 = d.c[3] // 1
          let c4 = d.c[4] // [[[3,1]]]

          let res = // sin(x)
            1 *
            (1 + 1 * cos(z) * sin(z) // z slant
            ) *
            sin(x)
          return res
        },
      },
      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 6, 'pa6': 0, 'pb7': -1,
        dom3: [ -180, 180 ],
        fn0: (e, c, d) => sin(e[2] * (1 + epsilon * sin(e[0]))),
      },

    }

    // ............................. kleinAni
    let kleinAni = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q1'},

      eofold: ani => {
        let res
        res = muonNatform.natMultiLineString({eoform: ani.eoload.eoform})
        // res = muonGraticule.gjfMultiLineString(ani.eoload.eoframe)
        // res = muonGraticule.gjfMultiPolygon(ani.eoload.eoframe)

        return res
      },
      eomot: {
        // conform: {
        // projection: 'natform',
        // eoform: conformKlein,
        // },
        proform: {
          projection: 'uniwen',
          scale: [ 0.5, 0.5 ],
          prerotate: [[[ ctl.rotation ]]],
          translate: [ [0, -100, 0] ],
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: { 'csx': 0, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
        'cs': [[[333, 333, 333]]], 'cw': [[[0.99, 0.9, 0.99]]], 'cp': [[[0.99, 0.99]]]},

      eoload: {
        eoform: conformKlein,
        eoframe: { multiframe: [ [-180, 180, 30, 30 ], [-90, 90, 30, 30] ] },
      },
    }
    // ............................. bandAni
    let bandAni = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q2'},

      eofold: ani => {
        let res
        // res = muonNatform.natMultiLineString({eoform: ani.eoload.eoform})
        res = muonGraticule.gjfMultiLineString(ani.eoload.eoframe)
        // res = muonGraticule.gjfMultiPolygon(ani.eoload.eoframe)

        return res
      },
      eomot: {
        conform: {
          projection: 'natform',
          eoform: conformKlein,
        },
        proform: {
          projection: 'uniwen',
          scale: [ 0.5, 0.5 ],
          prerotate: [[[ ctl.rotation ]]],
          translate: [ [0, -100, 0] ],
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: { 'csx': 0, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
        'cs': [[[333, 333, 333]]], 'cw': [[[0.99, 0.9, 0.99]]], 'cp': [[[0.99, 0.99]]]},

      eoload: {
        eoform: conformKlein,
        eoframe: { multiframe: [ [-180, 180, 10, 10 ], [ [[[-9, -90]]], [[[-9, 90]]], 10, 10] ] },
      },
    }

    // .................. cameraPersAni anima
    let cameraPersAni = {

      eotim: eotim,
      eoric: {gid: 'camera', cid: 'camera', fid: 'cameraPersAni'},
      eohal: eohalSol,

      eofold: anitem => {
        let eoload = anitem.eoload
        let json = { // Feature
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: {
            sort: 'camera',
            type: 'PerspectiveCamera',
            name: 'Perspective',
            fov: 60, // field of view s the field of view. angle in degrees.
            aspect: renderPortview.width() / renderPortview.height(),
            near: 0.001,
            far: 1600,

            position: [0, 0, 400 ],
            rotation: [0, 0, 0 ],

            vellin: [0, 0, 0 ],
            velang: [0, 0, 0 ],

            distance2nodesFactor: 100,
            lookAt: [0, 0, 0],
          },
        }
        return json
      },
    }
    // ............................. animas
    let animas = [

      kleinAni, // h.mars
      bandAni, // h.mars
      cameraPersAni, // h.sol
    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ813gKlein = anitem
}))