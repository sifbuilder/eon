/* ******************************************
   *    @z815d2dbernoulli
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.z815d2dbernoulli = global.z815d2dbernoulli || {})))
}(this, function (exports) {
  'use strict'

  // ... ** **
  // .................. anitem
  async function anitem (__eo) {
  // .................. eons
    let [
      ctlWen,
      eohalMars,
      eohalSol,
      muonNatform,
      muonGamma,
      renderPortview,
      renderSvg,
      // renderWebgl,
    ] = await Promise.all([
      __eo('xs').c('wen'),
      __eo('xs').e('mars'),
      __eo('xs').e('sol'),
      __eo('xs').m('natform'),
      __eo('xs').m('gamma'),
      __eo('xs').r('portview'),
      __eo('xs').r('svg'),
      // __eo('xs').r('webgl'),
    ])
    try { renderSvg.scenecolor('black') } catch (e) {}
    let ctl
    try { ctl = ctlWen().control(renderSvg.svg()) } catch (e) { ctl = () => [0, 0, 0] }

    // ............................. pics

    let bernx = (e, c, d) => {
      let x = c[1] * e[0] / (2 * Math.PI) // range * [2 * Math.PI] / (2 * Math.PI)
      return x
    }

    // .................. animas
    let z = function () {
    // .................. pics
      let sin = Math.sin, cos = Math.cos

      let summands = 23
      let level = [[[12, 0.0, 12]]]
      let range = 17
      let conformAni = {
        x: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 1 * 60, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 32, 'pa6': 0, 'pb7': -1,
          'dom3': [0, 90], //  [-90, 90], // [-90, 90]
          c: [ 1, range, 1, 1], // . , range, ., .
          fn0: (e, c, d) => bernx(e, d.c, d) * sin(e[0]) * cos(e[3]),
        },
        y: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 1 * 200, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 32, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ level, range, summands, 1], // order, range, summs, .
          fn0: (e, c, d) => muonGamma.bessel(e, d.c, d) * cos(e[0]),
        },
        z: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 1 * 60, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 32, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ level, range, summands, 1], // order, range, summs, .
          fn0: (e, c, d) => bernx(e, d.c, d) * sin(e[0]) * sin(e[3]),
        },
        w: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 32, 'pa6': 0, 'pb7': -1,
          'dom3': [0, 180], // [-180, 180],
          c: [ level, range, summands, 1], // order, range, summs, .
          fn0: (e, c, d) => cos(e[2]),
        },
      }

      let eotim = {'td': 9600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}
      // ............................. natAniRed
      let natAniRed = {
        eohal: eohalMars,
        eotim: eotim,
        eoric: {gid: 'q', cid: 'q', fid: 'qred'},
        eofold: ani => {
          let natipros = {
            eoform: ani.eoload.eoform,
            ghv: 0, // horizontal geodesics
            gsa: 0, // asymetric distribution of geodesics around the origin
            gco: 0, // open line
          }

          // let res = muonNatform.natMultiLineString(natipros) // Feature.LineString
          let res = muonNatform.natMultiPolygon(natipros) // Feature.LineString

          return res
        },
        eomot: {
          ereform: {
            projection: 'uniwen',
            scale: [ 1, 1, 1],
            translate: [ 0, 0, 0 ],
            rotate: [-12, 0, -6],
            lens: [0, 1, Infinity ],
          },
          proform: {
            projection: 'uniwen',
            scale: [ 1, 1, 1],
            translate: [ 0, 0, 0 ],
            rotate: [[[ctl.rotation]]],
            lens: [0, 1, Infinity ],
          },

        },
        eoload: {
          eocrom: { 'csx': 0, 'cf': 333, 'co': 0.269, 'cs': 777, 'cw': 1.3, 'cp': 0.99 },
          eoform: conformAni,
        },
      }
      // .................. cameraPersAni anima
      let cameraPersAni = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'cameraPersAni'},
        eohal: eohalSol,

        eofold: ani => {
          let eoload = ani.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: {
              sort: 'camera',
              type: 'PerspectiveCamera',
              name: 'Perspective',
              fov: 60, // field of view s the field of view. angle in degrees.
              aspect: renderPortview.width() / renderPortview.height(),
              near: 0.001,
              far: 1600,

              position: [ 501, 444, 356 ],
              rotation: [0, 0, 0 ],

              vellin: [0, 0, 0 ],
              velang: [0, 0, 0 ],

              distance2nodesFactor: 100,
              lookAt: [0, 0, 0],
            },
          }
          return json
        },
        eoload: {},

      }
      // .................. cameraOrthoAni anima
      let lightHemisphereAni = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'lightHemisphereAni'},
        eohal: eohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: anitem.eoload.light,
          }
          return json
        },
        eoload: {
          light: {
            sort: 'light',
            type: 'HemisphereLight',
            name: 'HemisphereLight',
            skyColor: [[[111, 999]]],
            groundColor: [[[999, 111]]],
            intensity: 0.4,
            position: [0, 0, 0],
          },
        },
      }

      // .................. spotLight anima
      let spotLight = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'spotLight'},
        eohal: eohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [0, 0, 0],
            },
            properties: anitem.eoload.light,
          }
          return json
        },
        eoload: {
          light: {
            sort: 'light',
            type: 'SpotLight',
            name: 'spotLight',
            color: [[[222, 777]]], // 0xe4eef9,
            intensity: 0.99,
            position: [-360, 400, 400],
            normalize: 1,
            castShadow: 1,
          },
        },

      }
      // ............................. scene
      let scene = [
        cameraPersAni, // h.sol
        spotLight, // h.sol
        natAniRed,
      ]

      return scene
    }

    let enty = () => {}
    enty.z = z

    return enty
  }
  exports.z815d2dbernoulli = anitem
}))
