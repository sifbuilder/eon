/* ******************************************
   *    @eonZ579aFuturecube
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ579aFuturecube = global.eonZ579aFuturecube || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
    let [
      muonNatform,
      muonGraticule,
      topojson,
      datWorldTopo110m,
      d3Geo,
      d3Geoprojection,
      geoFuturi,
      ctlWen,
      eohalMars,
      renderSvg,
    ] = await Promise.all([
      __eo('xs').m('natform'),
      __eo('xs').m('graticule'),
      __eo('xs').b('topojson'),
      __eo('xs').d('worldTopo110m'),
      __eo('xs').b('d3-geo'),
      __eo('xs').b('d3-geo-projection'),
      __eo('xs').g('futuri'),
      __eo('xs').c('wen'),
      __eo('xs').e('mars'),
      __eo('xs').r('svg'),
    ])
    try { renderSvg.scenecolor('black') } catch (e) { }
    // .................. animas
    let z = function () {
      // .................... pics
      let eotim = { 'td': 19800, 't0': 0, 't1': 1, 't2': 1, 't3': 1 }

      let proformCube = {

        projections: 'uniwen',
        translate: [0, 0],
        scale: 60,
        rotate: [-5, 50, 0],
        lens: [[[[0, 0, 1, 1, 1, 0]]], [[[0, 0, 1, 1, 1, 0]]], 4],

      }

      let eoframe = {

        extent: [[-180, 180, [[[30, 45, 30, 45, 30]]], [[[30, 45, 30, 45, 30]]]], [-90, 90, [[[12, 6, 12, 6, 12]]], [[[12, 6, 12, 6, 12]]]]],

      }

      let proformFuture = {

        projection: geoFuturi(),
        scale: 30,
        translate: [0, 0, 0],
        rotate: [28, -4, 0],
        trees: [[-1, 0, 1, 5, 0, 2]],
        treeidx: [[[0, 0, 0]]],
        faciaRotation: Math.PI / 1,

      }

      let geograt = {

        eohal: eohalMars,
        eofold: () => {
          return Object.assign({},
            topojson.feature(
              datWorldTopo110m.data(),
              datWorldTopo110m.data().objects.land
            )
          )
        },

        eotim: eotim,
        eoric: { gid: 'geograt', cid: 'geograt', fid: 'geograt' },
        eocrom: { 'csx': 0, 'cf': [[[111, 111]]], 'cs': 666, 'cw': 0.3, 'co': [[[0.05, 0.05]]], 'cp': [[[0.9, 0.9]]] },
        eomot: {
          proform: proformFuture,
        },
        eoframe: eoframe,
        eoload: {
        },

      }

      let geoearth = {

        eohal: eohalMars,
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
        eomot: {
          proform: proformFuture,
        },
        eocrom: {
          'csx': 0,
          'cf': [[[555, 333, 555, 333, 555, 333, 555]]],
          'cs': 333, 'cw': 0.2, 'co': 0.4, 'cp': 0.9,
        },

        eoload: {
        },

      }

      let geosphere = {

        eohal: eohalMars,
        eofold: { type: 'Sphere' },
        eotim: eotim,
        eoric: { gid: 'geosphere', cid: 'geosphere', fid: 'geosphere' },
        eocrom: { 'csx': 0, 'cf': 444, 'cs': 333, 'cw': 0.9, 'co': 0.04, 'cp': 0.9 },
        eomot: {
          proform: proformFuture,
        },
        eoload: {
        },

      }

      let animas = [
        geograt, // h.mars g.futuri
        geoearth, // h.mars g.futuri
        geosphere, // h.mars  g.futuri
      ]

      return animas
    }

    let enty = () => { }
    enty.z = z
    return enty
  }
  exports.eonZ579aFuturecube = anitem
}))