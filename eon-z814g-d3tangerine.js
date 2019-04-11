/* ******************************************
   *    @eonZ814gD3tangerine
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ814gD3tangerine = global.eonZ814gD3tangerine || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3,
    d3Geo,
    THREE,
    d3Force3d,
    ctlWen,
    eohalMars,
    eohalSol,
    muonGraticule,
    muonGeom,
    muonNatform,
    protonNatform,
    renderPortview,
    renderWebgl,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').b('d3-geo'),
    __eo('xs').b('three'),
    __eo('xs').b('d3-force-3d'),
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').e('sol'),
    __eo('xs').m('graticule'),
    __eo('xs').m('geom'),
    __eo('xs').m('natform'),
    __eo('xs').p('natform'),
    __eo('xs').r('portview'),
    __eo('xs').r('webgl'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    // .................. pics
    let pi = Math.PI,
      radians = Math.PI / 180, degrees = 180 / Math.PI,
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
    let eotim = {'td': 18600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tf: t => t}

    let conformTangerine = {
      'x': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 160, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[60, 60]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ 1, 1, 1, 1],
        'fn0': (e, c, d) => cos(e[0]) * cos(e[2]),
      },
      'y': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 160, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[60, 60]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ 1, 1, 1, 1],
        'fn0': (e, c, d) => sin(e[0]) * cos(e[2]),
      },
      'z': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 160, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[60, 60]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-90, 90],
        c: [ 1, 1, 1, 1],
        'fn0': (e, c, d) => sin(e[2] + (pi / 18) * cos(6 * e[0])),
      },
      'w': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'dom3': [ -180, 180 ],
        'fn0': (e, c, d) => d.c[3] * sin(e[2] * (1 + epsilon * sin(e[0]))),
      },

    }

    let conformLightTangerine = {
      'x': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 160, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[360, 360]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ [[[-180, 180]]], [[[-180, 180 + 360]]] ], // [ -180, 180 ],
        c: [ 1, 1, 1, 1],
        'fn0': (e, c, d) => cos(e[0]) * cos(e[2]),
      },
      'y': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 160, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[360, 360]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ [[[-180, 180]]], [[[-180, 180 + 360]]] ], // [ -180, 180 ],
        c: [ 1, 1, 1, 1],
        'fn0': (e, c, d) => sin(e[0]) * cos(e[2]),
      },
      'z': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 160, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[12, 12]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-90, 90], // [ [[[-90,90]]], [[[-80,80]]] ],
        c: [ 1, 1, 1, 1],
        'fn0': (e, c, d) => sin(e[2] + (pi / 18) * cos(6 * e[0])),
      },
      'w': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'dom3': [ -180, 180 ],
        'fn0': (e, c, d) => d.c[3] * sin(e[2] * (1 + epsilon * sin(e[0]))),
      },

    }

    // ............................. tangerineAni
    let tangerineAni = {

      eohal: eohalMars,
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q21'},

      eofold: p => muonNatform.natMultiPolygon({eoform: p.eoform}),

      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 1, 1 ],
          translate: [ [0, 0, 0] ],
          rotate: [
            [[[0, -75, -180, -270, -360 ]]], //, 225, 0  , 0, 0]]],    //  ]]], //
            [[[0, 0, 0, 0, 0 ]]], //, 180, 90 , 0, 0]]],    //  ]]], //
            [[[0, 0, 30, 180, 360 ]]], //,   0, 0  , 0, 0]]],    //  ]]], //
          ],
          lens: [0, 1, Infinity ],
        },
      },

      eocrom: {'csx': 0, 'cf': 999, 'cs': 555, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

      eoform: conformTangerine,
      eoload: {},
    }
    // ............................. natTraces
    let natTraces = {

      eohal: eohalMars,
      eoric: {gid: 'q', cid: 'q', fid: 'q22'},
      eotim,

      eofold: p => muonGraticule.gjfMultiLineString(p.eoframe),

      eomot: {
        conform: {
          projection: 'natform',
          eoform: conformTangerine,
        },
        proform: {
          projection: 'uniwen',
          scale: [ 1, 1 ],
          translate: [ [0, 0, 0] ],
          rotate: [
            [[[0, -75, -180, -270, -360 ]]], //, 225, 0  , 0, 0]]],    //  ]]], //
            [[[0, 0, 0, 0, 0 ]]], //, 180, 90 , 0, 0]]],    //  ]]], //
            [[[0, 0, 30, 180, 360 ]]], //,   0, 0  , 0, 0]]],    //  ]]], //
          ],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: {'csx': 0, 'cf': 999, 'cs': 444, 'cw': 1.33, 'co': 0.099, 'cp': 0.999},
      // eoframe: [ [ [ -180, 180, 30, 30], [ -90, 90, 30, 30] ] ],
      eoframe: [ [ [ [[[-180, 180]]], [[[-180, 180 + 360]]], 930, 6], [ -90, 90, 30, 6] ] ],
      eoload: {},

    }

    // ............................. lightTangerineAni
    let lightTangerineAni = {

      eohal: eohalMars,
      eofold: p => muonNatform.natMultiPolygon(p.eoform, {h: 1}),
      eotim,
      eoric: {gid: 'g', cid: 'g', fid: 'g1'},

      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 1, 1 ],
          translate: [ [0, 0, 0] ],
          rotate: [ -[[[0, 5, 0]]], [[[10, 30, 10]]], 0 ],
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: { 'csx': 0, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
        'cs': [[[555, 555, 555]]], 'cw': [[[2.99, 2.99, 2.99]]], 'cp': [[[0.99, 0.99]]]},
      eoform: conformLightTangerine,
      eoload: {
      },
    }

    // .................. cameraPersAni anima
    let cameraPersAni = {

      eotim: eotim,
      eoric: {gid: 'camera', cid: 'camera', fid: 'cameraPersAni'},
      eohal: eohalSol,

      eofold: ani => {
        let eoload = ani.eoload
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

            position: [0, 0, 600 ],
            rotation: [0, 0, 0 ],

            vellin: [0, 0, 0 ],
            velang: [0, 0, 0 ],

            distance2nodesFactor: 100,
            lookAt: [0, 0, 0],
          },
        }
        return json
      },
      eoload: {},

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
          skyColor: [[[111, 999]]],
          groundColor: [[[999, 111]]],
          intensity: 0.4,
          position: [0, 0, 0],
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
          geometry: {
            type: 'Point',
            coordinates: [0, 0, 0],
          },
          properties: anitem.eoload.light,
        }
        return json
      },
      eoload: {
        light: {
          sort: 'light',
          type: 'SpotLight',
          name: 'spotLight',
          color: [[[222, 777]]], // 0xe4eef9,
          intensity: 0.99,
          position: [-400, 400, 400],
          normalize: 1,
          castShadow: 1,
        },
      },

    }

    // ............................. animas
    let animas = [

      cameraPersAni, // h.sol
      tangerineAni, // h.mars
      natTraces, // h.mars
      lightHemisphereAni, // h.sol
      spotLight, // h.sol
    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ814gD3tangerine = anitem
}))