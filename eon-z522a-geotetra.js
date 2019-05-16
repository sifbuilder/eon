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
      let ctl
      try {
        ctl = eonCtlVersor().control(eonRenderSvg.svg())
      } catch (e) {
        ctl = () => [0, 0, 0]
      }

      let eotim = { 'td': 18200, 't0': 0, 't1': 1, 't2': 1, 't3': 1 }

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
              eonDatWorldTopo110m.data(),
              eonDatWorldTopo110m.data().objects.land
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
