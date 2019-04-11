/* ******************************************
   *    @eonZ708fGeoearthPrt
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ708fGeoearthPrt = global.eonZ708fGeoearthPrt || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    muonGeom,
    muonGraticule,
    topojson,
    datWorldTopo110m,
    muonNatform,
    ctlWen,
    ctlVersor,
    d3Geo,
    d3Geoprojection,
    protonOrthographic,
    eohalMars,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').m('geom'),
    __eo('xs').m('graticule'),
    __eo('xs').b('topojson'),
    __eo('xs').d('worldTopo110m'),
    __eo('xs').m('natform'),
    __eo('xs').c('wen'),
    __eo('xs').c('versor'),
    __eo('xs').b('d3-geo'),
    __eo('xs').b('d3-geo-projection'),
    __eo('xs').p('orthographic'),
    __eo('xs').e('mars'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) { }
  // .................. animas
  let z = function () {
    let eotim = {'td': 10800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

    // ..................
    let proformEarth = {

      projection: protonOrthographic,
      // prerotate: [[[ protonOrthographic.rotation ]]],
      prerotate: [[[ ctlVersor
        .projection({projection: protonOrthographic})
        .rotation,
      ]]],
      translate: [0, 0, 0],
      scale: 100,
      rotate: [ [[[0, 360]]], 0, 0 ],

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
  exports.eonZ708fGeoearthPrt = anitem
}))