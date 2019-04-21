/* ******************************************
   *    @eonZ731cGeoVersor
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ731cGeoVersor = global.eonZ731cGeoVersor || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    d3Geo,
    topojson,
    eonCtlVersor,
    eonCtlWen,
    datWorldTopo110m,
    eonEohalTextform,
    eonEohalMars,
    eonEohalNatform,
    eonMuonGraticule,
    eonMuonGeoj,
    eonRenderSvg,
    // eonRenderWebgl,
  ] = await Promise.all([
    __eo('xs').b('d3-geo'),
    __eo('xs').b('topojson'),
    __eo('xs').b('eon-ctl-versor'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').d('worldTopo110m'),
    __eo('xs').b('eon-eohal-textform'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-muon-graticule'),
    __eo('xs').b('eon-muon-geoj'),
    __eo('xs').b('eon-render-svg'),
    // __eo('xs').b('eon-render-webgl'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = eonCtlVersor().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    var epsilon = 1e-6
    var epsilon2 = 1e-12
    let eotim = {'td': 36800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let pFront = function (x, y) {
      let forward = (x, y) => d3Geo.geoOrthographicRaw(x, -y)
      forward.invert = (x, y) => d3Geo.geoOrthographicRaw.invert(x, -y)
      return forward
    }

    let frontProjection = d3Geo.geoProjection(pFront())
      .clipAngle(90)
      .translate([0, 0, 0])
      .rotate([0, 0, 0])

    let proformFront = {

      projection: frontProjection,
      prerotate: [[[ function (t) {
        let rot = eonCtlVersor
          .projection({projection: frontProjection})
          .rotation()
        return rot
      } ]]],

      translate: [ -150, 50 ],
      scale: 100,
      rotate: [ 0, 0, 0 ],

    }

    let geoOrthographicPrj = (x, y) => d3Geo.geoOrthographicRaw(x, -y)
    geoOrthographicPrj.invert = (x, y) => d3Geo.geoOrthographicRaw.invert(x, -y)

    let geoOrthographic = d3Geo.geoProjection(geoOrthographicPrj)
      .clipAngle(90)
      .translate([0, 0, 0])
      .rotate([0, 0, 0])

    let proform = {

      projection: geoOrthographic,
      // projection: d3Geo.geoOrthographic()
      // .scale(1)
      // .clipAngle(90 + epsilon),
      scale: 180,
      translate: [ 0, 0 ], // [ -150, 50 ],
      rotate: [ 0, 0, 0 ],
      prerotate: [[[ t => {
        let rot = eonCtlVersor
          .projection({projection: geoOrthographic})
          .rotation()
        let res = [180 + rot[0], -rot[1], -rot[2]]
        return res
      }]]],

    }

    // .................. geograt1

    let geoearth1 = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {'gid': 'geo', 'cid': 'geo', 'fid': 'geoearth1'},

      eofold: () => {
        return Object.assign({},
          topojson.feature(
            datWorldTopo110m.data(),
            datWorldTopo110m.data().objects.land
          )
        )
      },

      eomot: {
        proform: proformFront,
      },

      eocrom: { 'csx': 0, 'cf': [[[555, 555, 555, 555, 555, 555, 555]]], 'cs': 333, 'cw': 0.2, 'co': 0.4, 'cp': 0.9},

      eoload: {},

    }
    // .................. geograt1
    let geograt1 = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {'gid': 'geo', 'cid': 'geo', 'fid': 'geograt1'},

      eofold: ani => eonMuonGraticule.gjfMultiLineString(ani.eoload.eoframe),

      eomot: {
        proform: proformFront,
      },

      eocrom: { 'csx': 0, 'cf': [[[111, 111]]], 'cs': 666, 'cw': 0.7, 'co': [[[0.05, 0.05]]], 'cp': [[[0.9, 0.9]]]},

      eoload: {

        eoframe: {
          geoframe: [ [ [-180, 180, 30, 3], [-90, 90, 30, 3] ],
            [ [-180, 180, 30, 3], [-90, 90, 30, 3] ] ],
        },

      },
    }

    // .................. textAni
    let textAni = {

      eohal: eonEohalTextform,
      eoric: {'gid': 'text', 'cid': 'text', 'fid': 'text'},
      eotim: eotim,

      eocrom: { 'csx': 0, 'cf': [[[888, 777]]], 'cs': 111, 'cw': [[[0.1, 0.7]]], 'co': [[[0.6, 0.99]]], 'cp': [[[0.5, 0.5]]]},

      eofold: ani => {
        let res = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0],
          },
        }
        return res
      },

      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ -275, 150 ],
        },
      },

      eoload: {
        textform: {
          string: function () {
            let rot = this.rotation
            let euls = rot.map(d => Math.floor(10 * d) / 10)
            let res = `λ = ${euls[0]}, φ = ${euls[1]}, γ = ${euls[2]}`
            return res
          },

          rotation: [[[ eonCtlVersor.rotation ]]],
          style: {
            rotate: [[[ 0, 0 ]]],
            'font-size': [[[16, 16]]],
            'font-family': 'BankFuturistic',
            'text-anchor': 'center',

          },
        },

      },
    }

    // .................. geosphere1
    let geosphere1 = {

      eohal: eonEohalMars,

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
          translate: [ -150, 50 ],
          rotate: [ [[[0, 0]]], 0, 0 ],
          prerotate: [[[ ctl.rotation ]]],

        },
      },
      eoload: {
      },

    }

    // .................. geoearth2

    let geoMercatorPrj = (x, y) => d3Geo.geoMercatorRaw(x, -y)
    geoMercatorPrj.invert = (x, y) => d3Geo.geoMercatorRaw.invert(x, -y)

    let geoMercator = d3Geo.geoProjection(geoMercatorPrj)
      .clipAngle(90)
      .translate([0, 0, 0])
      .rotate([0, 0, 0])

    let geoearth2 = {

      eohal: eonEohalMars,
      eoric: {'gid': 'geo', 'cid': 'geo', 'fid': 'geoearth2'},
      eotim: eotim,

      eofold: () => {
        let gj = Object.assign({},
          topojson.feature(
            datWorldTopo110m.data(),
            datWorldTopo110m.data().objects.land
          )
        )

        return eonMuonGeoj.trim(gj)
      },
      eocrom: { 'csx': 0, 'cf': [[[555, 555, 555, 555, 555, 555, 555]]], 'cs': 333, 'cw': 0.2, 'co': 0.4, 'cp': 0.9},
      eomot: {
        proform: {

          projection: geoMercator,
          scale: 30,
          translate: [ 400 - 300, 250 - 200 ],
          rotate: [ [[[0, 0]]], 0, 0 ],
          prerotate: [[[ function (t) {
            let rot = eonCtlVersor
              .projection({projection: geoMercator})
              .rotation()
            return rot
          } ]]],

        },
      },
      eoload: {
      },

    }

    // .................. geograt2
    let geograt2 = {

      eohal: eonEohalMars,

      eofold: p => eonMuonGraticule.gjfMultiLineString(p.eoframe),
      eotim: eotim,
      eoric: {'gid': 'geo', 'cid': 'geo', 'fid': 'geograt2'},
      eocrom: { 'csx': 0, 'cf': [[[111, 111]]], 'cs': 666, 'cw': 0.3, 'co': [[[0.05, 0.05]]], 'cp': [[[0.9, 0.9]]]},
      eomot: {
        proform: {

          projection: d3Geo.geoMercator(),
          scale: 30,
          translate: [ 100, 50 ],
          rotate: [ 0, 0, 0 ],
          prerotate: [[[ function (t) {
            let rot = eonCtlVersor
              .projection({projection: d3Geo.geoMercator()})
              .rotation()
            return rot
          } ]]],

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

      eohal: eonEohalMars,

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
          translate: [ 100, 50 ],
          rotate: [ [[[0, 0]]], 0, 0 ],

          prerotate: [[[ function (t) {
            let rot = eonCtlVersor
              .projection({projection: d3Geo.geoMercator()})
              .rotation()
            return rot
          } ]]],

        },
      },
      eoload: {
      },

    }

    let scene = {

      geoearth1, // h.mars g.orthographic
      geograt1, // h.mars
      geosphere1, // h.mars
      geoearth2, // h.mars g.mercator
      geograt2, // h.mars
      geosphere2, // h.mars
      textAni, // h.text
    }

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ731cGeoVersor = anitem
}))
