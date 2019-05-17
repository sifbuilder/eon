/* ******************************************
   *    @eonZ707aCube
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ707aCube = global.eonZ707aCube || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
    let [
      eonCtlEul,
      eonCtlWen,
      eonEohalMars,
      eonMuonFibonat,
      eonMuonGeom,
      eonMuonGraticule,
      eonMuonProps,
      eonProtonNatform,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-eul'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-muon-fibonat'),
      __eo('xs').b('eon-muon-geom'),
      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-proton-natform'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    // .................. animas
    let z = function () {
    // .................. pics
      let ctl
      try {
        ctl = eonCtlEul().control(eonRenderSvg.svg())
      } catch (e) {
        ctl = () => [0, 0, 0]
      }

      const eotim = {'td': 23800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      const cubeForm = {

        'x': {
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'ra2': 250, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'ra2': 250, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
        },
        'z': {
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'ra2': 250 / Math.sqrt(2), 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
        },

      }

      // .................. cubeAni anima
      let cubeAni = {

        eohal: eonEohalMars,

        eofold: anitem => {
          let eoload = anitem.eoload
          let eoric = anitem.eoric

          let gj = {type: 'FeatureCollection', features: []}

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

            let _ric = {}
            _ric.gid = eoric.gid
            _ric.cid = 'face'
            _ric.fid = i

            let feature = {
              type: 'Feature',
              geometry: geometry,
              properties: {},
            }
            feature.properties.eoric = _ric
            feature.properties.eocrom = face.eocrom

            gj.features.push(feature)
          }
          return gj
        },

        eotim: eotim,
        eoric: {'gid': 'cubeAni', 'cid': 'cubeAni', 'fid': 'cubeAni'},
        eocrom: { 'csx': 0, 'cf': 111, 'cs': 111, 'cw': 0.1, 'co': 0.9, 'cp': 0.9},

        eomot: {
          conform: {
            projection: 'natform',
            eoform: cubeForm,
          },

          proform: {

            projection: 'uniwen',
            translate: [ 320 - 300, 200 - 200],
            scale: 1,
            rotate: [-5, 50, 0],
            lens: [0, 1, Infinity], // [ [[[0, 0, 1, 1, 1, 0]]], [[[0, 0, 1, 1, 1, 0]]], 400 ], // [0,1], // [1,0]
            prerotate: [[[ ctl.rotation ]]],
          },
        },
        eoload: {

          points: [
            [(-1), (-1), (1)], // 0
            [(1), (-1), (1)], // 1
            [(1), (1), (1)], // 2
            [(-1), (1), (1)], // 3
            [(1), (-1), (-1)], // 4
            [(-1), (-1), (-1)], // 5
            [(-1), (1), (-1)], // 6
            [(1), (1), (-1)], // 7
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

        cubeAni, // h.mars

      ]
      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ707aCube = anitem
}))
