/* ******************************************
   *    @eonZ703hPolygons
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ703hPolygons = global.eonZ703hPolygons || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlWen,
    eonEohalMars,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
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

    let eotim = {'td': 19200, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // .................. idPolygon anima
    let idPolygon = {

      eotim: eotim,
      eoric: {'gid': 'idPolygon', 'cid': 'idPolygon', 'fid': 'idPolygon'},
      eohal: eonEohalMars,

      eofold: (p) => {
        let coordinaes = [
          [-1, -1, 1],
          [ 1, -1, 1],
          [ 1, 1, 1],
          [ -1, 1, 1],
          [-1, -1, 1],
        ]

        let eoric = p.eoric
        let eocrom = p.eocrom

        let geometry = {type: 'Polygon', coordinates: []}

        geometry.coordinates = Array.of(coordinaes) // eg [-1, 1, 1]

        let feature = {type: 'Feature', geometry: {}, properties: {}}
        let _ric = {gid: eoric.gid, cid: eoric.cid, fid: 'orange'}
        feature.properties.eoric = _ric

        feature.properties.sort = 'form'
        feature.geometry = geometry
        feature.properties.eocrom = eocrom

        let gj = {type: 'FeatureCollection', features: []}
        gj.features.push(feature)
        return gj
      },

      eocrom: {'csx': 0, 'cf': [[[666, 777, 666, 777, 666, 777, 666]]], 'cs': 777, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},
      eomot: {
        proform: {
          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          translate: [ -100, 0 ],
          scale: 90,
          rotate: [-5, 50, 0], // [0, 0, 0], //
          lens: [0, 1, Infinity],
        },
      },
      eoload: {
      },

    }
    // .................. wenPolygon anima
    let wenPolygon = {

      eotim: eotim,
      eoric: {'gid': 'wenPolygon', 'cid': 'wenPolygon', 'fid': 'wenPolygon'},
      eohal: eonEohalMars,

      eofold: (p) => {
        let coordinaes = [
          [-1, -1, 1],
          [ 1, -1, 1],
          [ 1, 1, 1],
          [ -1, 1, 1],
          [-1, -1, 1],
        ]

        let eoric = p.eoric
        let eocrom = p.eocrom

        let geometry = {type: 'Polygon', coordinates: []}

        geometry.coordinates = Array.of(coordinaes) // eg [-1, 1, 1]

        let feature = {type: 'Feature', geometry: {}, properties: {}}
        let _ric = {gid: eoric.gid, cid: eoric.cid, fid: 'red'}
        feature.properties.eoric = _ric

        feature.properties.sort = 'form'
        feature.geometry = geometry
        feature.properties.eocrom = eocrom

        let gj = {type: 'FeatureCollection', features: []}
        gj.features.push(feature)
        return gj
      },
      eocrom: {'csx': 0, 'cf': [[[222, 333, 222, 333, 222, 333, 222]]], 'cs': 777, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

      eomot: {
        proform: {
          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          translate: [ 100, 0],
          scale: 90,
          rotate: [-5, 50, 0], // [0, 0, 0],
          lens: [0, 1, Infinity],
        },
      },
      eoload: {},

    }

    // .................. animas
    let animas = [
      idPolygon, // h.mars eonMuonGeom.uniwen
      wenPolygon, // h.mars eonMuonGeom.uniwen

    ]
    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ703hPolygons = anitem
}))