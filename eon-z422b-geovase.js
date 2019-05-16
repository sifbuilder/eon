/* ******************************************
   *    @eonZ422bGeovase
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ422bGeovase = global.eonZ422bGeovase || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
    // .................. eons
    let [
      d3Geo,

      topojson,

      eonDatWorldTopo110m,
      eonEohalMars,

      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('d3-geo'),

      __eo('xs').b('topojson'),

      __eo('xs').b('eon-dat-world-topo110m'),
      __eo('xs').b('eon-eohal-mars'),

      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    // .................. animas
    let z = function () {
      // .................. pics

      let eotim = { 'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1 }

      // ............................. earthAni
      let earthAni = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: { gid: 'earthAni', cid: 'earthAni', fid: 'earthAni' },

        eofold: () => {
          return Object.assign({},
            topojson.feature(
              eonDatWorldTopo110m.data(),
              eonDatWorldTopo110m.data().objects.land
            )
          )
        },

        eomot: {
          conform: {

            projection: d3Geo.geoOrthographic(), // 'base'
            translate: [0, 0, 0],
            scale: 100,
            rotate: [[[[0, 4 * 180]]], 0, 0],
            stream: function (x, y) {
              this.stream.point(x / 1, -y / 4)
            },

          },
          proform: {

            projection: 'uniwen',
            translate: [0, 0, 0],
            scale: [1, -1],
            rotate: [0, [[[0, 4 * 180]]], 0],
            lens: [0, 1, Infinity],

          },
        },
        eocrom: { 'csx': 0, 'cf': 444, 'cs': 444, 'cw': 0.1, 'co': 0.9, 'cp': 0.9 },
        eoload: {},

      }

      // ............................. animas
      let animas = [
        earthAni,
      ]

      return animas
    }

    let enty = () => { }
    enty.z = z
    return enty
  }
  exports.eonZ422bGeovase = anitem
}))
