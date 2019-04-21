/* ******************************************
   *    @eonZ708wTorusInterleaved
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ708wTorusInterleaved = global.eonZ708wTorusInterleaved || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    topojson,
    eonCtlWen,
    datWorldTopo110m,
    eonEohalMars,
    eonMuonGeom,
    eonMuonGraticule,
    eonMuonNatform,
    eonProtonNatform,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('topojson'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').d('worldTopo110m'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-geom'),
    __eo('xs').b('eon-muon-graticule'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-proton-natform'),
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

    let formTorus = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 40, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [ 1, 1, 10, 5],
        fn0: (e, c, d) => c[0] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * cos(2 * e[2] + 1 * d.c[0] * e[1]), // 1
      },

      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 40, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [ 1, 1, 10, 5],
        fn0: (e, c, d) => c[1] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * sin(2 * e[2] + 1 * d.c[0] * e[1]), // 1

      },

      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 40, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [ 1, 1, 1, 5 ],
        fn0: (e, c, d) => d.c[3] * c[3] * sin(e[0]),
      },

      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 10, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 40, 'pa6': 0, 'pb7': -1,
        'dom3': [ -[[[0, 180]]], [[[0, 180]]] ],
        'fn0': (e, c) => c[3] * cos(e[2]),
      },

    }

    let formGratiCube = {

      x: {
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,

      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,

      },
      z: {
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
        'ra2': 120 / Math.sqrt(2), 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
      },

    }

    let formSphere = {

      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
      },
      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
      },

    }

    // let  proformTorus =  {
    // projection: 'uniwen',
    // scale: [ 1, 1, 1 ],
    // prerotate: [[[ ctl.rotation ]]],
    // translate: [ [0, 0, 0] ],
    // rotate: [ -[[[0, 5, 0]]], [[[10, 30, 10]]], 0 ],
    // rotate: [ 0, 0, 0 ],
    // lens: [ 0, 1, Infinity ],
    // }

    let proformTorus = {

      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [ 0, 0],
      scale: 1,
      rotate: [-5, 50, [[[45, 45]]] ], // [-5,50,0], //
      lens: [0, 1, Infinity], // [ [[[0,0,1,1,1,0]]], [[[0,0,1,1,1,0]]] ],  //  [1,0]

    }

    let proformEarth = {

      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [ 0, 0],
      scale: 1,
      rotate: [-5, 50, 45 ],
      lens: [0, 1, Infinity],

    }
    // let proformEarth = {

    // projection: 'uniwen',
    // prerotate: [[[ ctl.rotation ]]],
    // translate: [ 0, 0],
    // scale: 1,
    // rotate: [-5, 50, 0 ],
    // lens: [0, 1, Infinity],

    // }

    // ............................. earthAni
    let earthAni = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {'gid': 'earthAni', 'cid': 'earthAni', 'fid': 'earthAni'},

      eofold: p => {
        let geometry = Object.assign({},
          topojson.mesh(
            datWorldTopo110m.data(),
            datWorldTopo110m.data().objects.land
          )
        )
        return { type: 'Feature', geometry: geometry, properties: {} }
      },

      eomot: {
        conform: {
          projection: 'natform',
          eoform: formTorus,
        },
        proform: proformEarth,
      },
      eocrom: { 'csx': 0, 'cf': 444, 'cs': 444, 'cw': 0.9, 'co': 0.4, 'cp': 0.9},
      eoload: {},

    }

    // .............................  cubeAni
    let cubeAni = {

      eohal: eonEohalMars,
      eofold: anitem => {
        let eoload = anitem.eoload,
          eoric = anitem.eoric

        let json = {type: 'FeatureCollection', features: []}
        let points = eoload.points // eoload.points
        let faces = eoload.faces // eoload.faces
        for (let i = 0, l = faces.length; i < l; i++) {
          let face = faces[i] // face pointsx position
          let geometry = {type: 'Polygon', coordinates: []}
          geometry.coordinates = face.pointsx.map(k => points[k]) // eg [-1, 1, 1]
            .map(eonMuonGeom.normalize) // eg. [0.5773, -0.577, 0.5773]
            .map(eonMuonGeom.spherical) // eg. [-0.7853, 0.6154]
            .map(eonMuonGeom.to_degrees)
          geometry.coordinates = Array.of(geometry.coordinates)
          let feature = {type: 'Feature', geometry: {}, properties: {}}
          feature.properties.eoric = eoric
          feature.properties.eoric.cid = 'face'
          feature.properties.eoric.fid = i // face.name
          feature.properties.sort = 'form'
          feature.geometry = geometry
          feature.properties.eocrom = face.eocrom
          json.features.push(feature)
        }

        return json
      },

      eotim: eotim,
      eoric: {gid: 'cubeAni', cid: 'cubeAni', fid: 'cubeAni'},
      eocrom: { 'csx': 0, 'cf': 333, 'cs': 111, 'cw': 0.1, 'co': 0.9, 'cp': 0.9},

      eomot: {
        conform: { projection: 'natform', eoform: formSphere },

        proform: proformEarth,
      },
      eoload: {
        points: [
          [-1, -1, 1], // 0
          [ 1, -1, 1], // 1
          [ 1, 1, 1], // 2
          [-1, 1, 1], // 3
          [ 1, -1, -1], // 4
          [-1, -1, -1], // 5
          [-1, 1, -1], // 6
          [ 1, 1, -1], // 7
        ],
        faces: [
          {
            pointsx: [0, 1, 2, 3, 0],
            name: 'front',
            eocrom: { cf: 222, cs: 355, co: [[[0.7, 0.7]]], cp: 1 }},
          {
            pointsx: [4, 5, 6, 7, 4],
            name: 'back',
            eocrom: { cf: 888, cs: 455, co: [[[0.7, 0.7]]], cp: 1 }},
          {
            pointsx: [1, 4, 7, 2, 1],
            name: 'right',
            eocrom: { cf: 444, cs: 555, co: [[[0.7, 0.7]]], cp: 1 }},
          {
            pointsx: [5, 0, 3, 6, 5],
            name: 'left',
            eocrom: { cf: 555, cs: 655, co: [[[0.7, 0.7]]], cp: 1 }},
          {
            pointsx: [3, 2, 7, 6, 3],
            name: 'bottom',
            eocrom: { cf: 666, cs: 755, co: [[[0.7, 0.7]]], cp: 1 }},
          {
            pointsx: [5, 4, 1, 0, 5],
            name: 'top',
            eocrom: { cf: 777, cs: 855, co: [[[0.7, 0.7]]], cp: 1 }},

        ],

      },
    }
    // .............................  graticubeAni
    let graticubeAni = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: { gid: 'graticubeAni', cid: 'graticubeAni', fid: 'graticubeAni'},

      eofold: anitem => eonMuonGraticule.gjfMultiLineString(anitem.eoframe),

      eomot: {
        conform: { projection: 'natform', eoform: formGratiCube },

        proform: proformEarth,
      },

      eocrom: { 'csx': 0, 'cf': [[[666, 666]]], 'cs': 666, 'cw': 3.39, 'co': [[[0.5, 0.5]]], 'cp': [[[0.9, 0.9]]]},

      eoframe: { multiframe: [ [-180, 180, 90, 90 ], [-90, 90, 45, 45] ] },

      eoload: {},

    }
    // .............................  graticircAni
    let graticircAni = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: { gid: 'graticircAni', cid: 'graticircAni', fid: 'graticircAni'},

      eofold: p => eonMuonGraticule.gjfMultiLineString(p.eoframe),

      eomot: {
        conform: {
          projection: 'natform',
          eoform: formSphere,
        },
        proform: proformEarth,
      },

      eocrom: { 'csx': 0, 'cf': [[[555, 555]]], 'cs': 666, 'cw': 0.39, 'co': [[[0.5, 0.5]]], 'cp': [[[0.9, 0.9]]]},
      eoframe: { multiframe: [ [-180, 180, 90, 90 ], [-90, 90, 45, 45] ] },
      eoload: {
      },

    }
    // ............................. torusAni1
    let torusAni1 = {

      eohal: eonEohalMars,
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q1'},

      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
      eomot: {
        proform: proformTorus,
      },
      eocrom: { 'csx': 0, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
        'cs': [[[222, 222, 222]]], 'cw': [[[0.99, 0.9, 0.99]]], 'cp': [[[0.99, 0.99]]]},
      eoform: formTorus,
      eoload: {},
    }

    // ............................. animas
    let animas = [
      // earthAni, // h.mars p.natform g.uniwen
      torusAni1, // h.mars p.natform g.uniwen
      // cubeAni, // h.mars g.uniwen
      // graticubeAni, // h.mars
      // graticircAni, // h.mars

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ708wTorusInterleaved = anitem
}))