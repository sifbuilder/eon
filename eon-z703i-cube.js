/* ******************************************
   *    @eonZ703iCube
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ703iCube = global.eonZ703iCube || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlWen,
    eonEohalScene,
    eonEohalMars,
    eonMuonProps,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-scene'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-props'),
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

    let eotim = {'td': 99200, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // .................. wenPolygon anima
    let wenPolygon = {

      eohal: eonEohalMars,

      eofold: (p) => {
        let points = [
            [-1, -1, 1], // 0
            [ 1, -1, 1], // 1
            [ 1, 1, 1], // 2
            [-1, 1, 1], // 3

            [-1, -1, -0], // 5
            [ 1, -1, -0], // 4
            [ 1, 1, -0], // 7
            [-1, 1, -0], // 6
          ],
          faces = [
            {
              pointsx: [0, 1, 2, 3, 0],
              name: 'front',
              eocrom: {'csx': 0, 'cf': 222, 'cs': 688, 'cw': 0.7, 'co': [[[0.799, 0.799]]], 'cp': 0.799}},
            {
              pointsx: [4, 5, 6, 7, 4],
              name: 'back',
              eocrom: {'csx': 0, 'cf': 444, 'cs': 833, 'cw': 0.7, 'co': [[[0.799, 0.799]]], 'cp': 0.799}},
            {
              pointsx: [1, 5, 6, 2, 1],
              name: 'right',
              eocrom: { cf: 444, cs: 555, co: [[[0.2, 0.2, 0.2, 0.2]]], cp: 1 }},
            {
              pointsx: [4, 0, 3, 7, 4],
              name: 'left',
              eocrom: { cf: 555, cs: 655, co: [[[0.2, 0.2, 0.2, 0.2]]], cp: 1 }},
            {
              pointsx: [3, 2, 6, 7, 3],
              name: 'bottom',
              eocrom: { cf: 666, cs: 755, co: [[[0.9, 0.9, 0.9, 0.9]]], cp: 1 }},
            {
              pointsx: [4, 5, 1, 0, 4],
              name: 'top',
              eocrom: { cf: 777, cs: 855, co: [[[0.9, 0.9, 0.9, 0.9]]], cp: 1 }},

          ]

        let jsonFaces = {type: 'FeatureCollection', features: []}

        for (let i = 0, l = faces.length; i < l; i++) {
          let face = faces[i] // face pointsx position
          let geometry = {type: 'Polygon', coordinates: []}

          geometry.coordinates = Array.of(face.pointsx.map(k => points[k])) // eg [-1, 1, 1]

          let feature = {type: 'Feature', geometry: {}, properties: {}}
          feature.properties.sort = 'form'
          feature.geometry = geometry
          jsonFaces.features.push(feature)
        }

        let gj = {type: 'FeatureCollection', features: []}
        gj.features = [...jsonFaces.features] // merge features

        return gj
      },
      eotim: eotim,
      eoric: {'gid': 'wenPolygon', 'cid': 'wenPolygon', 'fid': 'wenPolygon'},
      eocrom: {'csx': 0, 'cf': [[[222, 333, 222, 333, 222, 333, 222]]], 'cs': 777, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

      eomot: {
        proform: {

          projection: 'uniwen',
          translate: [ 400 - 400, 200 - 200],
          scale: 90,
          rotate: [0, 0, 0],
          lens: [0, 1, Infinity],
          prerotate: [[[ ctl.rotation ]]],
        },
      },
      eoload: {
      },

    }

    // .................. animas
    let animas = [

      wenPolygon, // h.mars eonMuonGeom.uniwen

    ]
    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ703iCube = anitem
}))