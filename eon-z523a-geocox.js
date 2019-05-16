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

      eonMuonGraticule,
      topojson,
      eonDatWorldTopo110m,

      eonCtlVersor,

      eonEohalMars,
      eonRenderSvg,
    ] = await Promise.all([

      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('topojson'),
      __eo('xs').b('eon-dat-world-topo110m'),

      __eo('xs').b('eon-ctl-versor'),

      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    // .................. animas
    let z = function () {
      // .................. pics
      let eotim = { 'td': 18200, 't0': 0, 't1': 1, 't2': 1, 't3': 1 }

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
              eonDatWorldTopo110m.data(),
              eonDatWorldTopo110m.data().objects.land
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
