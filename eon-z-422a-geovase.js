/* ******************************************
   *    @z422aGeovase
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.z422aGeovase = global.z422aGeovase || {})))
}(this, function (exports) {
  'use strict'

  // ... ** **
  // .................. anitem
  async function anitem (__eo) {
    // .................. eons
    let [
      d3Geo,
      d3GeoProjection,
      topojson,
      ctlVersor,
      ctlWen,
      datWorldTopo110m,
      eohalMars,
      muonGeom,
      muonGraticule,
      protonNatform,
      protonBase,
      renderSvg,
    ] = await Promise.all([
      __eo('xs').b('d3-geo'),
      __eo('xs').b('d3-geo-projection'),
      __eo('xs').b('topojson'),
      __eo('xs').c('versor'),
      __eo('xs').c('wen'),
      __eo('xs').d('worldTopo110m'),
      __eo('xs').e('mars'),
      __eo('xs').m('geom'),
      __eo('xs').m('graticule'),
      __eo('xs').p('natform'),
      __eo('xs').p('base'),
      __eo('xs').r('svg'),
    ])
    try { renderSvg.scenecolor('black') } catch (e) { }
    // .................. animas
    let z = function () {
      // .................. pics
      let ctl
      try {
        ctl = ctlWen().control(renderSvg.svg())
      } catch (e) {
        ctl = () => [0, 0, 0]
      }

      let eotim = { 'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1 }

      let formSphere = {

        'x': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
        },
        'z': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
        },

      }

      // ............................. earthAni
      let earthAni = {

        eohal: eohalMars,
        eotim: eotim,
        eoric: { gid: 'earthAni', cid: 'earthAni', fid: 'earthAni' },

        eofold: () => {
          return Object.assign({},
            topojson.feature(
              datWorldTopo110m.data(),
              datWorldTopo110m.data().objects.land
            )
          )
        },

        eomot: {
          conform: {

            projection: protonBase
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

        eohal: eohalMars,
        eotim: eotim,
        eoric: { gid: 'g', cid: 'g', fid: 'g2' },

        eofold: ani => muonGraticule.gjfMultiLineString(ani.eoload.eoframe),
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
  exports.z422aGeovase = anitem
}))
