/* ******************************************
   *    @eonZ708aCuberEarth
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ708aCuberEarth = global.eonZ708aCuberEarth || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    topojson,
    ctlWen,
    datWorldTopo110m,
    eohalMars,
    muonGeom,
    muonGraticule,
    protonNatform,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').b('topojson'),
    __eo('xs').c('wen'),
    __eo('xs').d('worldTopo110m'),
    __eo('xs').e('mars'),
    __eo('xs').m('geom'),
    __eo('xs').m('graticule'),
    __eo('xs').p('natform'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) { }
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

    let formCube = {

      'x': {
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
        'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],

      },
      'y': {
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
        'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],

      },
      'z': {
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
        'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
        'pr8': d => Math.cos(d),
        'dom3': [-180, 180],

      },
    }

    let formGratiCube = {

      'x': {
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,

      },
      'y': {
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,

      },
      'z': {
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
        'ra2': 120 / Math.sqrt(2), 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
      },

    }

    let formSphere = {

      'x': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
      },
      'y': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
      },
      'z': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
      },

    }

    let proform = {

      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [ 0, 0],
      scale: 1,
      rotate: [-5, 50, [[[45, 45]]] ], // [-5,50,0], //
      lens: [0, 1, Infinity], // [ [[[0,0,1,1,1,0]]], [[[0,0,1,1,1,0]]] ],  //  [1,0]

    }

    let proformCube = {

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
      rotate: [-5, 50, 0 ], // [-5,50,0], //
      lens: [0, 1, Infinity], // [ [[[0,0,1,1,1,0]]], [[[0,0,1,1,1,0]]] ],  //  [1,0]

    }

    // ............................. earthAni
    let earthAni = {

      eohal: eohalMars,
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

      eocrom: { 'csx': 0, 'cf': 444, 'cs': 444, 'cw': 0.1, 'co': 0.9, 'cp': 0.9},

      eomot: {
        conform: {
          projection: 'natform',
          eoform: formCube,
        },
        proform: proform,
      },
      eoload: {},

    }

    // .............................  cubeAni
    let cubeAni = {

      eohal: eohalMars,

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
            .map(muonGeom.normalize) // eg. [0.5773, -0.577, 0.5773]
            .map(muonGeom.spherical) // eg. [-0.7853, 0.6154]
            .map(muonGeom.to_degrees)
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
        proform: proform,
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

      eohal: eohalMars,
      eotim: eotim,
      eoric: { gid: 'graticubeAni', cid: 'graticubeAni', fid: 'graticubeAni'},

      eofold: anitem => muonGraticule.gjfMultiLineString(anitem.eoframe),

      eomot: {
        conform: { projection: 'natform', eoform: formGratiCube },

        proform: proform,
      },

      eocrom: { 'csx': 0, 'cf': [[[666, 666]]], 'cs': 666, 'cw': 3.39, 'co': [[[0.5, 0.5]]], 'cp': [[[0.9, 0.9]]]},

      eoframe: {
        multiframe: [ [-180, 180, 90, 90 ], [-90, 90, 45, 45] ],
      },
      eoload: {},
    }

    // .............................  graticircAni
    let graticircAni = {

      eohal: eohalMars,

      eofold: p => muonGraticule.gjfMultiLineString(p.eoframe), // hMultiLine
      eotim: eotim,
      eoric: { gid: 'graticubeAni', cid: 'graticubeAni', fid: 'graticircAni'},

      eocrom: { 'csx': 0, 'cf': [[[555, 555]]], 'cs': 666, 'cw': 0.39, 'co': [[[0.5, 0.5]]], 'cp': [[[0.9, 0.9]]]},

      eomot: {
        conform: {
          projection: 'natform',
          eoform: formSphere,
        },
        proform: proform,
      },

      eoframe: {
        multiframe: [ [-180, 180, 90, 90 ], [-90, 90, 45, 45] ],
      },

      eoload: {},

    }

    // ............................. animas
    let animas = [
      earthAni, // h.mars p.natform g.uniwen
      cubeAni, // h.mars g.uniwen
      graticubeAni, // h.mars
      graticircAni, // h.mars
    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ708aCuberEarth = anitem
}))