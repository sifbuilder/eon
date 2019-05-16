/* ******************************************
   *    @eonZ422aGeovase
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ422aGeovase = global.eonZ422aGeovase || {})))
}(this, function (exports) {
  'use strict'

  // ... ** **
  // .................. anitem
  async function anitem (__eo) {
    // .................. eons
    let [
      d3Geo,

      topojson,

      eonCtlWen,
      eonDatWorldTopo110m,
      eonEohalMars,

      eonMuonGraticule,

      eonProtonBase,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('d3-geo'),

      __eo('xs').b('topojson'),

      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-dat-world-topo110m'),
      __eo('xs').b('eon-eohal-mars'),

      __eo('xs').b('eon-muon-graticule'),

      __eo('xs').b('eon-proton-base'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    // .................. animas
    let z = function () {
      // .................. pics
      let ctl
      try {
        ctl = eonCtlWen().control(eonRenderSvg.svg())
      } catch (e) {
        ctl = () => [0, 0, 0]
      }

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

            projection: eonProtonBase
              .projection(d3Geo.geoOrthographic())
              .transform(function (x, y) {
                this.stream.point(x / 1, y / 4)
              }),
            prerotate: [[[ctl.rotation]]],
            translate: [0, 0, 0],
            scale: 100,
            rotate: [0, 0, 0],

          },
          proform: {

            projection: 'uniwen',
            translate: [0, 0, 0],
            scale: [1, -1],
            rotate: [0, 0, 0],

          },
        },
        eocrom: { 'csx': 0, 'cf': 444, 'cs': 444, 'cw': 0.1, 'co': 0.9, 'cp': 0.9 },
        eoload: {},
      }
      // ............................. geoGraticule
      let geoGraticule = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: { gid: 'g', cid: 'g', fid: 'g2' },

        eofold: ani => eonMuonGraticule.gjfMultiLineString(ani.eoload.eoframe),
        eomot: {
          proform: {
            projection: d3Geo.geoOrthographic(),
            scale: 100,
            translate: [0, 0],
            prerotate: [[[ctl.rotation]]],
            rotate: [0, 0, 0],
            lens: [0, 1, Infinity],
          },
        },
        eocrom: { 'csx': 0, 'cf': 555, 'cs': 888, 'cw': 0.7, 'co': 0.005, 'cp': 0.9 },
        eoload: {
          eoframe: {
            geoframe: [[[-180, 180, 15, 15], [-20, 90, 15, 15]]],
          },

        },
      }

      // ............................. animas
      let animas = [
        geoGraticule,
        earthAni,

      ]

      return animas
    }

    let enty = () => { }
    enty.z = z
    return enty
  }
  exports.eonZ422aGeovase = anitem
}))
