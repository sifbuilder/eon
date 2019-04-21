/* ******************************************
   *    @eonZ522aGeotetra
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ522aGeotetra = global.eonZ522aGeotetra || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
    // .................. eons
    let [
      eonMuonProps,
      eonMuonGeom,
      eonMuonGraticule,
      topojson,
      datWorldTopo110m,
      eonMuonNatform,
      eonCtlWen,
      eonCtlVersor,
      d3Geo,
      d3Geoprojection,
      eonProtonTetra,
      eonEohalMars,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-muon-geom'),
      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('topojson'),
      __eo('xs').d('worldTopo110m'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-ctl-versor'),
      __eo('xs').b('d3-geo'),
      __eo('xs').b('d3-geo-projection'),
      __eo('xs').b('eon-proton-tetra'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    // .................. animas
    let z = function () {
      // .................. pics
      let ctl
      try {
        ctl = eonCtlVersor().control(eonRenderSvg.svg())
      } catch (e) {
        ctl = () => [0, 0, 0]
      }

      let eotim = { 'td': 18200, 't0': 0, 't1': 1, 't2': 1, 't3': 1 }

      let form = {

        'x': {

          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'ra2': 162, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,

        },
        'y': {

          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'ra2': 162, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,

        },
        'z': {

          'm1': 3, 'm2': 3, 'n1': 1, 'n2': 1, 'n3': 1, 'a': 1, 'b': 1, // tri
          'ra2': [[[30, 30, 262 / Math.sqrt(2), 162 / Math.sqrt(2), 162 / Math.sqrt(2), 162 / Math.sqrt(2), 262 / Math.sqrt(2)]]],
          'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,

        },
      }

      let eoframe = {

        geoframe: [[[-180, 180, 45, 45], [-90, 90, 22.5, 22.5]]],

      }

      let proform = {

        projection: 'tetra',
        prerotate: [[[ctl.rotation]]],
        scale: 50,
        center: [0, 0, 0],
        translate: [0, 0, 0],
        rotate: [0, 0, 0],

        tetraCef1: [[[Math.PI / 6, Math.PI / 2]]],

      }

      // .............................  geograt
      let geograt = {

        eohal: eonEohalMars,

        eofold: p => eonMuonGraticule.gjfMultiLineString(p.eoframe),

        eotim,

        eomot: {
          proform,
        },

        eoric: { gid: 'geograt', cid: 'geograt', fid: 'geograt' },

        eocrom: { 'csx': 0, 'cf': [[[666, 666]]], 'cs': 666, 'cw': 0.9, 'co': [[[0.05, 0.05]]], 'cp': [[[0.9, 0.9]]] },
        eoframe: eoframe,
        eoload: {

        },
      }

      // .............................  geoearth
      let geoearth = {

        eohal: eonEohalMars,

        eofold: () => {
          return Object.assign({},
            topojson.feature(
              datWorldTopo110m.data(),
              datWorldTopo110m.data().objects.land
            )
          )
        },
        eotim,

        eomot: {
          proform,
        },
        eoric: { 'gid': 'geoearth', 'cid': 'geoearth', 'fid': 'geoearth' },
        eocrom: { 'csx': 0, 'cf': [[[555, 333, 555, 333, 555, 333, 555]]], 'cs': 333, 'cw': 0.2, 'co': 0.4, 'cp': 0.9 },
        eoload: {

        },

      }
      // .............................  geosphere
      let geosphere = {

        eohal: eonEohalMars,

        eofold: {
          type: 'Feature',
          geometry: {
            type: 'Sphere',
          },
          properties: {},
        },
        eotim,

        eomot: {
          proform,
        },
        eoric: { 'gid': 'geosphere', 'cid': 'geosphere', 'fid': 'geosphere' },
        eocrom: { 'csx': 0, 'cf': 444, 'cs': 333, 'cw': 0.9, 'co': 0.04, 'cp': 0.9 },
        eoload: {
        },

      }

      // ............................. animas
      let animas = [

        geograt, // h.mars
        geoearth, // h.mars
        geosphere, // h.mars

      ]

      return animas
    }

    let enty = () => { }
    enty.z = z
    return enty
  }
  exports.eonZ522aGeotetra = anitem
}))