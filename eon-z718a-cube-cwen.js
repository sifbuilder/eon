/* ******************************************
   *    @eonZ718aCubeCwen
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ718aCubeCwen = global.eonZ718aCubeCwen || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    muonProps,
    ctlWen,
    eohalMars,
    eohalNatform,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').m('props'),
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').e('natform'),
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

    let rotInit = [0, 45, 0],
      rotation = [0, 0, 0],
      rotMatrix,
      stars = []

    // .................. aniCube anima
    let aniCube = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {'gid': 'aniCube', 'cid': 'aniCube', 'fid': 'aniCube'},

      eofold: p => {
        let eoload = p.eoload
        let eoric = p.eoric

        let json = {type: 'FeatureCollection', features: []}

        let points = eoload.points // eoload.points
        let faces = eoload.faces // eoload.faces

        for (let i = 0, l = faces.length; i < l; i++) {
          let face = faces[i] // face pointsx position

          let geometry = {type: 'Polygon', coordinates: []}

          geometry.coordinates = Array.of(face.pointsx.map(k => points[k])) // eg [-1, 1, 1]

          let feature = {type: 'Feature', geometry: {}, properties: {}}

          feature.properties.eoric = {gid: eoric.gid, cid: 'face', fid: i}
          feature.properties.sort = 'form'
          feature.geometry = geometry
          feature.properties.eocrom = face.eocrom
          json.features.push(feature)
        }

        return json // FeatureCollection.features[i].geometry.coordinates[i]::[-1, -1, 1]
      },

      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ 300 - 300, 200 - 200],
          scale: 100,
          rotate: [-5, 50, 0],
          lens: [ [[[0, 0, 1, 1, 1, 0]]], [[[0, 0, 1, 1, 1, 0]]], 4 ],
          prerotate: [[[ ctl.rotation ]]],
        },
      },
      eocrom: { 'csx': 0, 'cf': 111, 'cs': 111, 'cw': 0.1, 'co': 0.9, 'cp': 0.9},

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
            eocrom: { cf: 222, cs: 355, co: [[[0.2, 0.09, 0.9, 0.2]]], cp: 1 }},
          {
            pointsx: [4, 5, 6, 7, 4],
            name: 'back',
            eocrom: { cf: 888, cs: 455, co: [[[0.2, 0.09, 0.9, 0.2]]], cp: 1 }},
          {
            pointsx: [1, 4, 7, 2, 1],
            name: 'right',
            eocrom: { cf: 444, cs: 555, co: [[[0.2, 0.09, 0.9, 0.2]]], cp: 1 }},
          {
            pointsx: [5, 0, 3, 6, 5],
            name: 'left',
            eocrom: { cf: 555, cs: 655, co: [[[0.2, 0.09, 0.9, 0.2]]], cp: 1 }},
          {
            pointsx: [3, 2, 7, 6, 3],
            name: 'bottom',
            eocrom: { cf: 666, cs: 755, co: [[[0.2, 0.09, 0.9, 0.2]]], cp: 1 }},
          {
            pointsx: [5, 4, 1, 0, 5],
            name: 'top',
            eocrom: { cf: 777, cs: 855, co: [[[0.2, 0.09, 0.9, 0.2]]], cp: 1 }},

        ],

      },
    }

    let animas = [
      aniCube, // h.mars g.uniwen

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ718aCubeCwen = anitem
}))
