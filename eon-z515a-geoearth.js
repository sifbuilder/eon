/* ******************************************
   *    @eonZ515aGeoearth
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ515aGeoearth = global.eonZ515aGeoearth || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    d3Geo,
    topojson,
    ctlWen,
    datWorldTopo110m,
    eohalMars,
    muonGraticule,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3-geo'),
    __eo('xs').b('topojson'),
    __eo('xs').c('wen'),
    __eo('xs').d('worldTopo110m'),
    __eo('xs').e('mars'),
    __eo('xs').m('graticule'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
  let ctl
  try {
    ctl = ctlWen().control(renderSvg.svg())
  } catch (e) {
    ctl = () => [0, 0, 0]
  }
  // .................. animas
  let z = function () {
    // .................. pics

    let eotim = {'td': 10800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

    // .................. geoearthDark  DARK
    let pDark = function () {
      let forward = (x, y) => d3Geo.geoOrthographicRaw(-x, -y)
      forward.invert = (x, y) => d3Geo.geoOrthographicRaw.invert(-x, -y)
      return forward
    }

    let darkProjection = d3Geo.geoProjection(pDark())
      .clipAngle(90)
      .translate([0, 0, 0])
      .scale(180)

    let proformDark = {

      projection: darkProjection,
      prerotate: [[[ t => {
        let rot = ctlWen
          .projection({projection: darkProjection}) // versor projection
          .rotation()
        let res = [180 + rot[0], -rot[1], -rot[2]]
        return res
      }]]],

      rotate: [ [[[0, 0 + 2 * 360]]], [[[0, 0 * 360]]], 0 ],

    }

    let geoearthDark = {

      eohal: eohalMars,

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
        proform: proformDark,
      },
      eoric: {'gid': 'geoearth', 'cid': 'geoearth', 'fid': 'geoearthDark'},
      eocrom: { 'csx': 0, 'cf': 333, 'cs': 333, 'cw': 0.2, 'co': 0.4, 'cp': 0.9},
      eoload: {
      },

    }

    // .................. geoearthFront FRONT
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
        let rot = ctlWen
          .projection({projection: frontProjection}) // versor projection
          .rotation()
        return rot
      } ]]],

      translate: [0, 0, 0],
      scale: 180,
      rotate: [ [[[30, 2 * 360]]], [[[0, 0 * 360]]], 0 ],

    }

    let geoearthFront = {

      eohal: eohalMars,
      eotim,
      eoric: {'gid': 'geoearth', 'cid': 'geoearth', 'fid': 'geoearthFront'},

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

      eoload: {
        eocrom: { 'csx': 0, 'cf': 555, 'cs': 333, 'cw': 0.2, 'co': 1, 'cp': 0.9},

      },

    }

    // .................. graticuleFront
    let graticuleFront = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {'gid': 'geoearth', 'cid': 'geoearth', 'fid': 'graticuleFront'},

      eofold: ani => muonGraticule.gjfMultiLineString(ani.eoload.eoframe),
      eomot: {
        proform: proformFront,
      },

      eoload: {
        eocrom: { 'csx': 0, 'cf': [[[555, 555]]], 'cs': 333, 'cw': 0.4, 'co': 0.001, 'cp': 0.9},
        eoframe: {
          geoframe: [ [ [ -180, 180, 30, 30], // x
            [ -180, 180, 15, 15] ] ], // y
        },

      },

    }
    // .................. scene
    let scene = {
      geoearthDark,
      geoearthFront, // h.mars g.orthographic
      graticuleFront, // h.mars

    }

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ515aGeoearth = anitem
}))