/* ******************************************
   *    @eonZ420bGeoproj
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ420bGeoproj = global.eonZ420bGeoproj || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    d3Geo,
    d3GeoProjection,
    topojson,
    eonCtlVersor,
    eonCtlWen,
    datWorldTopo110m,
    eonEohalScene,
    eonEohalMars,
    eonMuonGeom,
    eonMuonGraticule,
    eonMuonNatform,
    eonProtonNatform,
    eonProtonBase,
    eonProtonOrthographic,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3-geo'),
    __eo('xs').b('d3-geo-projection'),
    __eo('xs').b('topojson'),
    __eo('xs').b('eon-ctl-versor'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').d('worldTopo110m'),
    __eo('xs').b('eon-eohal-scene'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-geom'),
    __eo('xs').b('eon-muon-graticule'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-proton-natform'),
    __eo('xs').b('eon-proton-base'),
    __eo('xs').b('eon-proton-orthographic'),
    __eo('xs').b('eon-render-svg'),
  ])

  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    let eotim = {'td': 10800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

    // ..................
    let proformEarth = {

      projection: eonProtonOrthographic,
      prerotate: [[[ eonProtonOrthographic.rotation ]]],
      prerotate: [[[ eonCtlVersor
        .projection({projection: eonProtonOrthographic })
        .rotation,
      ]]],
      translate: [0, 0, 0],
      scale: 100,
      rotate: [ [[[0, 360]]], 0, 0 ],

    }

    let eoform = {
      'x': {
        'm1': 4, 'm2': 4, 'n1': [[[100, 100]]], 'n2': [[[100, 100]]], 'n3': [[[100, 100]]], 'a': 1, 'b': 1,
        // "m1":4,"m2":4,"n1":1,"n2":1,"n3":1,"a":1,"b":1, 		// circle
        'm1': 5, 'm2': 5, 'n1': 2, 'n2': 7, 'n3': 7, 'a': 1, 'b': 1, // round star
        'ra2': 40,
        'v0': 0, 'v1': 1,
        'w4': 0, // [[[190, 190 + 0 * 270]]], // [[[0,-360,0]]],
        'seg5': 360, 'pa6': 0, 'pb7': -1,
      },
      'y': {
        'm1': 4, 'm2': 4, 'n1': [[[100, 100]]], 'n2': [[[100, 100]]], 'n3': [[[100, 100]]], 'a': 1, 'b': 1, 		// star
        // "m1":4,"m2":4,"n1":1,"n2":1,"n3":1,"a":1,"b":1, 		// circle
        'm1': 5, 'm2': 5, 'n1': 2, 'n2': 7, 'n3': 7, 'a': 1, 'b': 1, // round star
        'ra2': 40,
        'v0': 0, 'v1': 1,
        'w4': 0, // [[[180, 180 + 1 * 60]]], // [[[0,-360,0]]],
        'seg5': 360, 'pa6': 0, 'pb7': -1,
      },
    }

    let eoframe = {

      geoframe: [ [ [-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ] ],

    }

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
        conform: eoform,
        proform: proformEarth,
      },
      eoric: {'gid': 'geoearth', 'cid': 'geoearth', 'fid': 'geoearth'},
      eocrom: { 'csx': 0, 'cf': 555, 'cs': 444, 'cw': 0.2, 'co': 0.1, 'cp': 0.9},
      eoload: {
      },

    }
    // ............................. geograt
    let geograt = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'geograt', cid: 'geograt', fid: 'geograt'},

      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),

      eomot: {
        eoform: {

          projection: 'uniwen',
          prerotate: [[[ eonCtlVersor.rotation ]]],
          scale: [[[1, 0.1, 1]]],
          translate: [ 0, 0 ],
          rotate: [ 0, 0, [[[0, -2 * 360]]] ],

        },
        proform: {

          projection: d3Geo.geoOrthographic(),
          prerotate: [[[ eonCtlVersor.rotation ]]],
          scale: [100],
          translate: [ 0, 0 ],
          rotate: [ [[[0, -2 * 360]]], 0, 0 ],

        },
      },

      eocrom: { 'csx': 0, 'cf': [[[555, 555]]], 'cs': 666, 'cw': 0.9, 'co': [[[0.95, 0.05]]], 'cp': [[[0.9, 0.9]]]},

      eoform: eoform,
      eoframe: eoframe,
      eoload: {},

    }

    let animas = [
      geoearth, //
      geograt, //
    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ420bGeoproj = anitem
}))