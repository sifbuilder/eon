/* ******************************************
   *    @eonZ523aGeocox
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ523aGeocox = global.eonZ523aGeocox || {})))
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
      eonProtonCox,
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
      __eo('xs').b('eon-proton-cox'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    // .................. animas
    let z = function () {
      let ctl = eonCtlVersor().control(eonRenderSvg.svg())

      // .................. pics
      let eotim = { 'td': 18200, 't0': 0, 't1': 1, 't2': 1, 't3': 1 }
      const sqrt2 = Math.sqrt(2)

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
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'm1': [[[3, 3]]], 'm2': [[[3, 3]]], 'n1': 1, 'n2': 1, 'n3': 1, 'a': 1, 'b': 1, // tri
          'ra2': [[[30, 30, 262 / sqrt2, 162 / sqrt2, 162 / sqrt2, 162 / sqrt2, 262 / sqrt2]]],
          'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,

        },
      }

      let eoframe = {

        'geoframe': [[[-180, 180, 45, 45], [-90, 90, 22.5, 22.5]]],

      }

      // ............................. geograt
      let geograt = {

        eotim,
        eohal: eonEohalMars,
        eoric: { 'gid': 'geograt', 'cid': 'geograt', 'fid': 'geograt' },

        eofold: p => eonMuonGraticule.gjfMultiLineString(p.eoframe),

        eomot: {
          proform: {

            projection: 'cox',

            prerotate: [[[eonCtlVersor.rotation]]],
            scale: [100],
            translate: [0, 0],
            rotate: [[[[0, -60]]], [[[0, -60]]], [[[0, -60]]]],
            step: [[[0, 0, 1.1, 1.1, 0, 0]]],

            prtlat: [[[1, 1]]],
            prtlagr: [[[0.5, 0.5]]],
            prtrad: [[[2.0, 2.0]]],

          },
        },

        eocrom: { 'csx': 0, 'cf': [[[111, 111]]], 'cs': 666, 'cw': 0.3, 'co': [[[0.05, 0.05]]], 'cp': [[[0.9, 0.9]]] },
        eoframe: eoframe,
        eoload: {},

      }

      // ............................. geoearth
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
        eotim: eotim,
        eoric: { 'gid': 'geoearth', 'cid': 'geoearth', 'fid': 'geoearth' },
        eocrom: { 'csx': 0, 'cf': [[[555, 333, 555, 333, 555, 333, 555]]], 'cs': 333, 'cw': 0.2, 'co': 0.4, 'cp': 0.9 },

        eomot: {
          proform: {

            prtlat: [[[1, 1]]],
            prtlagr: [[[0.5, 0.5]]],
            prtrad: [[[2.0, 2.0]]],

            projection: 'cox',
            prerotate: [[[eonCtlVersor.rotation]]],
            scale: [100],
            translate: [0, 0],
            rotate: [[[[0, -60]]], [[[0, -60]]], [[[0, -60]]]],
            step: [[[0, 0, 1.1, 1.1, 0, 0]]],

          },
        },
        eoload: {
          cox: {
            prtlat: [[[1, 1]]],
            prtlagr: [[[0.5, 0.5]]],
            prtrad: [[[2.0, 2.0]]],
          },

        },

      }

      // ............................. animas
      let animas = [
        geograt, // h.mars g.cox
        geoearth, // h.mars g.cox

      ]

      return animas
    }

    let enty = () => { }
    enty.z = z
    return enty
  }
  exports.eonZ523aGeocox = anitem
}))