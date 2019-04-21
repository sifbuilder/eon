/* ******************************************
   *    @eonZ708eGeoearth
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ708eGeoearth = global.eonZ708eGeoearth || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    d3Geo,
    d3Geoprojection,
    topojson,
    eonCtlVersor,
    eonCtlWen,
    datWorldTopo110m,
    eonEohalMars,
    eonMuonGeom,
    eonMuonGraticule,
    eonMuonNatform,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3-geo'),
    __eo('xs').b('d3-geo-projection'),
    __eo('xs').b('topojson'),
    __eo('xs').b('eon-ctl-versor'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').d('worldTopo110m'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-geom'),
    __eo('xs').b('eon-muon-graticule'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) { }
  // .................. animas
  let z = function () {
    let ctl = eonCtlVersor().control(eonRenderSvg.svg())

    // .................. pics
    let eotim = {'td': 10800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

    let pFront = function (x, y) {
      let forward = (x, y) => d3Geo.geoOrthographicRaw(x, -y)
      forward.invert = (x, y) => d3Geo.geoOrthographicRaw.invert(x, -y)
      return forward
    }

    let frontProjection = d3Geo.geoProjection(pFront())
      .clipAngle(90)

    let proformEarth = {

      projection: frontProjection,
      prerotate: [[[ function (t) {
        let rot = eonCtlVersor
          .projection({projection: frontProjection}) // versor projection
          .rotation()
        return rot
      } ]]],
      translate: [0, 0, 0],
      scale: 100,
      rotate: [ [[[0, 360]]], 0, 0 ],

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
        proform: proformEarth,
      },
      eoric: {'gid': 'geoearth', 'cid': 'geoearth', 'fid': 'geoearth'},
      eocrom: { 'csx': 0, 'cf': 555, 'cs': 333, 'cw': 0.2, 'co': 1, 'cp': 0.9},
      eoload: {
      },

    }

    let animas = [
      geoearth, // h.mars g.orthographic

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ708eGeoearth = anitem
}))