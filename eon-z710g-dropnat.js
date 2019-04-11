/* ******************************************
   *    @eonZ710gDropnat
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ710gDropnat = global.eonZ710gDropnat || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    d3,
    ctlWen,
    eohalNatform,
    eohalMars,
    eohalSol,
    muonNatform,
    muonProps,
    renderSvg,
    renderWebgl,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').c('wen'),
    __eo('xs').e('natform'),
    __eo('xs').e('mars'),
    __eo('xs').e('sol'),
    __eo('xs').m('natform'),
    __eo('xs').m('props'),
    __eo('xs').r('svg'),
    __eo('xs').r('webgl'),
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

    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt

    let conform = {
      'x': {
        'm1': 1, 'm2': 1, 'n1': 0.5, 'n2': 0.5, 'n3': 0.5, 'a': 1, 'b': 1, // drop
        'ra2': 190, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 64, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[0] * cos(e[0]),
      },
      'y': {
        'm1': 1, 'm2': 1, 'n1': 0.5, 'n2': 0.5, 'n3': 0.5, 'a': 1, 'b': 1, // drop
        'ra2': 190, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 64, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, d) => c[1] * sin(e[0]) * cos(e[3]),
      },
      'z': {
        'm1': 1, 'm2': 1, 'n1': 0.5, 'n2': 0.5, 'n3': 0.5, 'a': 1, 'b': 1, // drop
        'ra2': 190, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 64, 'pa6': 0, 'pb7': -1,
        'dom3': [-90, 90],
        'fn0': (e, c, d) => c[1] * sin(e[0]) * sin(e[3]),
      },
      'w': {
        'm1': 1, 'm2': 1, 'n1': 0.5, 'n2': 0.5, 'n3': 0.5, 'a': 1, 'b': 1, // drop
        'ra2': 190, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
        'dom3': [-90, 90],
        'fn0': (e, c, d) => e[3],
      },
    }

    let proform = {

      projection: 'uniwen',
      scale: [1, 1],

      // projection:  d3.geoOrthographic(),
      // scale: 100,

      prerotate: [[[ ctl.rotation ]]],
      translate: [ [0, 0, 0] ],
      rotate: [ 0, 0, 60 ],
      lens: [0, 1, Infinity],
    }

    // .................. natAni
    let natAni = {

      eohal: eohalMars,

      eofold: ani => muonNatform.natMultiPolygon({eoform: ani.eoload.eoform}),
      eotim,

      eoric: {gid: 'nat', cid: 'nat', fid: 'nat'},

      eomot: {
        proform: proform,
      },

      eocrom: { 'csx': 0, 'cf': [[[111, 111, 111]]], 'co': [[[0.09, 0.09]]], 'cs': [[[888, 888]]], 'cw': [[[1.9, 1.9]]], 'cp': [[[0.7, 0.9]]]},

      eoload: {
        eoform: conform,
      },

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
          skyColor: [[[999, 999]]],
          groundColor: [[[999, 999]]],
          intensity: 0.2,
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
          color: [[[222, 777, 222]]], // 0xe4eef9,
          intensity: 0.99,
          position: [-400, 400, 400],
          normalize: 1,
          castShadow: 1,
        },
      },

    }
    // .................. animas
    let animas = [

      natAni, // h.mars g.uniwen

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ710gDropnat = anitem
}))