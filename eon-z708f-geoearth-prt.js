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
      eonMuonGeom,
      eonMuonGraticule,
      topojson,
      eonDatWorldTopo110m,
      eonMuonNatform,
      eonCtlWen,
      eonCtlVersor,
      d3Geo,
      d3Geoprojection,
      eonProtonOrthographic,
      eonEohalMars,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-muon-geom'),
      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('topojson'),
      __eo('xs').b('eon-dat-world-topo110m'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-ctl-versor'),
      __eo('xs').b('d3-geo'),
      __eo('xs').b('d3-geo-projection'),
      __eo('xs').b('eon-proton-orthographic'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    // .................. animas
    let z = function () {
      let eotim = {'td': 10800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

      // ..................
      let proformEarth = {

        projection: eonProtonOrthographic,
        // prerotate: [[[ eonProtonOrthographic.rotation ]]],
        prerotate: [[[ eonCtlVersor
          .projection({projection: eonProtonOrthographic})
          .rotation,
        ]]],
        translate: [0, 0, 0],
        scale: 100,
        rotate: [ [[[0, 360]]], 0, 0 ],

      }

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
