/* ******************************************
   *    @eonZ731bGeoWen
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ731bGeoWen = global.eonZ731bGeoWen || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    muonGraticule,
    muonGeoj,
    topojson,
    datWorldTopo110m,
    d3Geo,
    ctlWen,
    eohalMars,
    eohalNatform,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').m('graticule'),
    __eo('xs').m('geoj'),
    __eo('xs').b('topojson'),
    __eo('xs').d('worldTopo110m'),
    __eo('xs').b('d3-geo'),
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').e('natform'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = ctlWen().control(renderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let eotim = {'td': 36800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let geoearth1 = {

      eohal: eohalMars,

      eofold: () => {
        let gj = Object.assign({},
          topojson.feature(
            datWorldTopo110m.data(),
            datWorldTopo110m.data().objects.land
          )
        )
        gj = muonGeoj.trim(gj)
        return gj
      },

      eotim: eotim,
      eoric: {'gid': 'geo', 'cid': 'geo', 'fid': 'geoearth1'},
      eocrom: { 'csx': 0, 'cf': [[[555, 555, 555, 555, 555, 555, 555]]], 'cs': 333, 'cw': 0.2, 'co': 0.4, 'cp': 0.9},
      eomot: {
        proform: {

          projection: d3Geo.geoOrthographic(),
          scale: 100,
          translate: [ 150 - 300, 250 - 200 ],
          rotate: [ [[[0, 0]]], 0, 0 ],
          prerotate: [[[ ctl.rotation ]]],

        },
      },
      eoload: {
      },

    }

    // .................. geograt1
    let geograt1 = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {'gid': 'geo', 'cid': 'geo', 'fid': 'geograt1'},

      eofold: ani => muonGraticule.gjfMultiLineString(ani.eoload.eoframe),

      eomot: {
        proform: {

          projection: d3Geo.geoOrthographic(),
          scale: 100,
          translate: [ 150 - 300, 250 - 200 ],
          rotate: [ [[[0, 0]]], 0, 0 ],
          prerotate: [[[ ctl.rotation ]]],

        },
      },

      eocrom: { 'csx': 0, 'cf': [[[111, 111]]], 'cs': 666, 'cw': 0.3, 'co': [[[0.05, 0.05]]], 'cp': [[[0.9, 0.9]]]},

      eoload: {

        eoframe: {
          geoframe: [ [ [-180, 180, 45, 45],
            [-90, 90, 22.5, 22.5] ],
          [ [-180, 180, 45, 45],
            [-90, 90, 22.5, 22.5] ] ],
        },

      },
    }

    // .................. geosphere1
    let geosphere1 = {

      eohal: eohalMars,

      eofold: {
        type: 'Feature',
        geometry: {type: 'Sphere'},
        properties: {},
      },
      eotim: eotim,
      eoric: {'gid': 'geo', 'cid': 'geo', 'fid': 'geosphere1'},
      eocrom: { 'csx': 0, 'cf': 444, 'cs': 333, 'cw': 0.9, 'co': 0.04, 'cp': 0.9},
      eomot: {
        proform: {

          projection: d3Geo.geoOrthographic(),
          scale: 100,
          translate: [ 150 - 300, 250 - 200 ],
          rotate: [ [[[0, 0]]], 0, 0 ],
          prerotate: [[[ ctl.rotation ]]],

        },
      },
      eoload: {
      },

    }

    // .................. geoearth2
    let geoearth2 = {

      eohal: eohalMars,

      eofold: () => {
        let gj = Object.assign({},
          topojson.feature(
            datWorldTopo110m.data(),
            datWorldTopo110m.data().objects.land
          )
        )

        return muonGeoj.trim(gj)
      },
      eotim: eotim,
      eoric: {'gid': 'geo', 'cid': 'geo', 'fid': 'geoearth2'},
      eocrom: { 'csx': 0, 'cf': [[[555, 555, 555, 555, 555, 555, 555]]], 'cs': 333, 'cw': 0.2, 'co': 0.4, 'cp': 0.9},
      eomot: {
        proform: {

          projection: d3Geo.geoMercator(),
          scale: 30,
          translate: [ 400 - 300, 250 - 200 ],
          rotate: [ [[[0, 0]]], 0, 0 ],
          prerotate: [[[ ctl.rotation ]]],

        },
      },
      eoload: {
      },

    }

    // .................. geograt2
    let geograt2 = {

      eohal: eohalMars,

      eofold: p => muonGraticule.gjfMultiLineString(p.eoframe),
      eotim: eotim,
      eoric: {'gid': 'geo', 'cid': 'geo', 'fid': 'geograt2'},
      eocrom: { 'csx': 0, 'cf': [[[111, 111]]], 'cs': 666, 'cw': 0.3, 'co': [[[0.05, 0.05]]], 'cp': [[[0.9, 0.9]]]},
      eomot: {
        proform: {

          projection: d3Geo.geoMercator(),
          scale: 30,
          translate: [ 400 - 300, 250 - 200 ],
          rotate: [ [[[0, 0]]], 0, 0 ],
          prerotate: [[[ ctl.rotation ]]],

        },
      },
      eoframe: {

        geoframe: [ [ [-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ],
          [ [-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ] ],

      },
      eoload: {},
    }

    // .................. geosphere2
    let geosphere2 = {

      eohal: eohalMars,

      eofold: {
        type: 'Feature',
        geometry: {type: 'Sphere'},
        properties: {},
      },

      eotim: eotim,
      eoric: {'gid': 'geo', 'cid': 'geo', 'fid': 'geosphere2'},
      eocrom: { 'csx': 0, 'cf': 444, 'cs': 333, 'cw': 0.9, 'co': 0.04, 'cp': 0.9},
      eomot: {
        proform: {

          projection: d3Geo.geoMercator(),
          scale: 30,
          translate: [ 400 - 300, 250 - 200 ],
          rotate: [ [[[0, 0]]], 0, 0 ],
          prerotate: [[[ ctl.rotation ]]],

        },
      },
      eoload: {
      },

    }

    let animas = [

      geoearth1, // h.mars g.orthographic
      geograt1, // h.mars
      geosphere1, // h.mars
      geoearth2, // h.mars g.mercator
      geograt2, // h.mars
      geosphere2, // h.mars
    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ731bGeoWen = anitem
}))