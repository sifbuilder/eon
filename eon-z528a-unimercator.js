/* ******************************************
   *    @eonZ528aUnimercator
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ528aUnimercator = global.eonZ528aUnimercator || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
    let [
      topojson,

      eonCtlVersor,
      eonDatWorldTopo110m,

      eonEohalMars,
      eonProtonUnimercator,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('topojson'),

      __eo('xs').b('eon-ctl-versor'),
      __eo('xs').b('eon-dat-world-topo110m'),

      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-proton-unimercator'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    let z = function () {
      // .................. pics

      let eotim = { 'td': 32200, 't0': 0, 't1': 1, 't2': 1, 't3': 1 }

      let proform = {

        projection: eonProtonUnimercator(),
        scale: 100,
        translate: [0, 0],
        rotate: [[[[0, -60]]], [[[0, -60]]], [[[0, -60]]]],
        prerotate: [[[eonCtlVersor.rotation]]],
      }

      // .................. geoearth
      let geoearth = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: { 'gid': 'geoearth', 'cid': 'geoearth', 'fid': 'geoearth' },

        eofold: p => {
          let geometry = Object.assign({},
            topojson.mesh(
              eonDatWorldTopo110m.data(),
              eonDatWorldTopo110m.data().objects.land
            )
          )
          return { type: 'Feature', geometry: geometry, properties: {} }
        },
        eocrom: { 'csx': 0, 'cf': [[[111, 111]]], 'cs': 666, 'cw': 0.9, 'co': [[[0.05, 0.05]]], 'cp': [[[0.9, 0.9]]] },

        eomot: {
          proform: proform,
        },
        eoload: {},

      }

      // .................. animas
      let animas = [

        geoearth, // h.mars g.unimercator

      ]

      return animas
    }

    let enty = () => { }
    enty.z = z
    return enty
  }
  exports.eonZ528aUnimercator = anitem
}))
