/* ******************************************
   *    @eonZ708bEarthTorus
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ708bEarthTorus = global.eonZ708bEarthTorus || {})))
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
    // renderSvg,
    renderWebgl,
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
    // __eo('xs').r('svg'),
    __eo('xs').r('webgl'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) { }
  // .................. animas
  let z = function () {
    let ctl
    try {
      ctl = ctlWen().control(renderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    // .................. pics
    let radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
      sinh = Math.sinh, cosh = Math.cosh, tanh = Math.tanh,
      exp = Math.exp

    // .................. pics
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

    let eotim = {'td': 19800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, 'nostop': 1}

    let conformTorus = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 60, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 20, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [ 2, 1, [[[10, 10, 10]]], 5], // [ 1, 1, 10, 5]
        fn0: (e, c, d) => {
          let c0 = d.c[0]
          let R = d.c[2]
          let r = d.c[3]
          let rx = c[0]
          let x = e[0]
          let y = e[1]
          let z = e[2]
          let res = (R + r * cos(x)) * cos(c0 * z)
          return res
        },
      },

      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 60, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 20, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [ 2, 1, [[[10, 10, 10]]], 5], // [ 1, 1, 10, 5]
        fn0: (e, c, d) => {
          let c0 = d.c[0]
          let R = d.c[2]
          let r = d.c[3]
          let x = e[0]
          let y = e[1]
          let z = e[2]
          let res = (R + r * cos(x)) * sin(c0 * z)
          // let res = (R + r * sin(x)) * cos(z)
          return res
        },
      },

      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 60, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 20, 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ 1, 1, [[[10, 10, 10]]], 5], // [ 1, 1, 10, 5]
        fn0: (e, c, d) => {
          let c0 = d.c[0]
          let R = d.c[2]
          let r = d.c[3]
          let x = e[0]
          let y = e[1]
          let z = e[2]
          let w = e[3]
          let res = r * sin(x) // r * sin(z)
          return res
        },
      },

      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 20, 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        fn0: (e, c, d) => {
          let R = d.c[2]
          let r = d.c[3]
          let x = e[0]
          let y = e[1]
          let z = e[2]
          let res = cos(y)
          return res
        },
      },

    }

    let ereformEarth = {

      projection: 'uniwen',
      translate: [ 0, 0, 0],
      scale: [1, -0.5, 1],
      rotate: [0, 0, 90 ],
      lens: [0, 1, Infinity],

    }

    let proformTorus = {

      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [ 0, 0],
      scale: [0.19, 0.19, 0.19],
      rotate: [75, 0, 20 ],
      lens: [0, 1, Infinity],

    }

    let proformEarth = {

      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [ 0, 0],
      scale: [0.19 * 1.001, 0.19 * 1.001, 0.19 * 1.001],
      rotate: [75, 0, 20 ], // [-5, 50, [[[45, 45]]] ],
      lens: [0, 1, Infinity],

    }

    // ............................. earthAni
    let earthAni = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {'gid': 'earthAni', 'cid': 'earthAni', 'fid': 'earthAni'},

      eofold: p => {
        let res, opt = 'MultiLineString'
        if (opt === 'MultiLineString') { // MultiLineString topojson.mesh
          let gjMultiLineString = topojson.mesh(
            datWorldTopo110m.data(),
            datWorldTopo110m.data().objects.land
          )
          res = {
            type: 'Feature',
            geometry: gjMultiLineString,
            properties: {},
          }
        } else { // MultiPolygon topojson.feature
          let gjFCMultiPolygon = topojson.feature(
            datWorldTopo110m.data(),
            datWorldTopo110m.data().objects.land
          )
          res = gjFCMultiPolygon
        }
        return res
      },

      eomot: {

        ereform: ereformEarth,
        conform: {
          projection: 'natform',
          eoform: conformTorus,
        },
        proform: proformEarth,

      },
      eocrom: { 'csx': 0, 'cf': 555, 'cs': 333, 'cw': 0.2, 'co': 0.21, 'cp': 0.9},
      eoload: {},

    }

    // ............................. torusAni
    let torusAni = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q1'},

      eofold: ani => {
        let res, opt = 'MultiPolygon'

        if (opt === 'MultiLineString') {
          res = muonGraticule.gjfMultiLineString(ani.eoload.eoframe)
        } else { // MultiPolygon
          res = muonGraticule.gjfMultiPolygon(ani.eoload.eoframe)
        }
        return res
      },

      eomot: {
        conform: {
          projection: 'natform',
          eoform: conformTorus,
        },
        proform: proformTorus,
      },

      eocrom: {'csx': 0, 'cf': 111, 'cs': 777, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

      eoload: {

        eoframe: { multiframe: [ [-180, 180, 30, 30 ], [-90, 90, 30, 30] ] },

      },
    }
    // .................. cameraOrthoAni anima
    let lightHemisphereAni = {

      eotim: eotim,
      eoric: {gid: 'camera', cid: 'camera', fid: 'lightHemisphereAni'},
      eohal: eohalSol,

      eofold: anitem => {
        let eoload = anitem.eoload
        let json = { // Feature
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: anitem.eoload.light,
        }

        return json
      },
      eoload: {
        light: {
          sort: 'light',
          type: 'HemisphereLight',
          name: 'HemisphereLight',
          skyColor: [[[999, 222]]],
          groundColor: [[[999, 222]]],
          intensity: 0.7,
          position: [ [[[0, 400]]], [[[0, 400]]], [[[0, 400]]]],
        },
      },

    }

    // .................. spotLight anima
    let spotLight = {

      eotim: eotim,
      eoric: {gid: 'camera', cid: 'camera', fid: 'spotLight'},
      eohal: eohalSol,

      eofold: anitem => {
        let eoload = anitem.eoload
        let json = { // Feature
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: anitem.eoload.light,
        }
        return json
      },
      eoload: {
        light: {
          sort: 'light',
          type: 'SpotLight',
          name: 'spotLight',
          color: [[[777, 222]]], // 0xe4eef9,
          intensity: 0.99,
          position: [ [[[0, 200]]], [[[0, 200]]], [[[0, 200]]]],
          normalize: 1,
          castShadow: 1,
        },
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
      earthAni, // h.mars p.natform g.uniwen
      torusAni, // h.mars p.natform g.uniwen
      cameraPersAni, // h.sol
      lightHemisphereAni, // h.sol
      spotLight, // h.sol
    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ708bEarthTorus = anitem
}))