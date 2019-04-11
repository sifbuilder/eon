/* ******************************************
   *    @eonZ856bMinkowski
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ856bMinkowski = global.eonZ856bMinkowski || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    d3Polygon,
    ctlWen,
    eohalMars,
    eohalNatform,
    muonGraticule,
    muonMinkowski,
    muonNatform,
    muonProps,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3-polygon'),
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').e('natform'),
    __eo('xs').m('graticule'),
    __eo('xs').m('minkowski'),
    __eo('xs').m('natform'),
    __eo('xs').m('props'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
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

    let pi = Math.PI,
      radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
      sinh = Math.sinh, cosh = Math.cosh, tanh = Math.tanh,
      exp = Math.exp,
      epsilon = 1e-5

    let conformSphere = {
      'x': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 122, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[60, 60]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ 1, 1, 1, 1],
        fn0: (e, c, d) => cos(e[0]),
      },
      'y': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 122, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[60, 60]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ 1, 1, 1, 1],
        fn0: (e, c, d) => sin(e[0]),
      },
    }

    let conformA = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 3, 'pa6': 0, 'pb7': 100,
        'dom3': [ -180, 180 ],
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 3, 'pa6': 0, 'pb7': 100,
        'dom3': [ -180, 180 ],
      },
    }

    let conformB = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[1, 18]]], 'pa6': 0, 'pb7': 100,
        'dom3': [ -180, 180 ],
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[1, 18]]], 'pa6': 0, 'pb7': 100,
        'dom3': [ -180, 180 ],
      },
    }

    let proform = {
      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      scale: 0.5,
      translate: [ 150, 50 ],
      rotate: [ 0, 0, 0 ],
    }

    // .................. natAni
    let natAni = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {'gid': 'geoani', 'cid': 'geoani', 'fid': 'geoani'},

      eofold: ani => {
        let A = ani.eoload.A
        let B = ani.eoload.B
        let sum = muonMinkowski(A, B)
        let sumring = [...sum, sum[0]]

        let res = {
          type: 'Feature',
          geometry: {
            type: 'MultiLineString',
            coordinates: [A, B, sumring],
          },
          properties: {},
        }

        return res
      },

      eocrom: { 'csx': 0, 'cf': [[[666, 666]]], 'cs': 666, 'cw': [[[0.99, 0.99]]], 'co': [[[0.27, 0.27]]], 'cp': [[[0.99, 0.99]]]},

      eomot: {
        proform: {
          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          scale: 50,
          translate: [ 0, 0 ],
          rotate: [ 0, 0, 0 ],
        },
      },
      eoload: {

        A: [ [0, 0], [1, 0], [1, 1], [0, 1], [0, 0]],
        B: [ [0, 0], [-1, 1], [1.5, 0], [0, 0]],

      },
    }
    // .................. natA
    let natA = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'natA'},

      eofold: ani => {
        let natipros = {
          eoform: ani.eoload.eoform,
          ghv: 1, // horizontal
          gsa: 0, // asymetric
          gco: 0, // open
        }
        let nat = muonNatform.natMultiLineString(natipros)
        if (1 && 1) console.log('nat', nat)

        return nat
      },
      eonode: {
        type: 'Feature',
        geometry: {type: 'Point', coordinates: [0, 0, 0]},
        properties: {orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
      },
      eomot: {
        proform: proform,
      },

      eocrom: { 'csx': 0, 'cf': 999, 'co': 0.19, 'cs': 999, 'cw': 0.99, 'cp': 0.99 },
      eoload: {
        eoform: conformA,
      },
    }
    // .................. natB
    let natB = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'natB'},

      eofold: ani => {
        let natipros = {
          eoform: ani.eoload.eoform,
          ghv: 1, // horizontal
          gsa: 0, // asymetric
          gco: 0, // open
        }
        let nat = muonNatform.natMultiLineString(natipros)

        return nat
      },
      eonode: {
        type: 'Feature',
        geometry: {type: 'Point', coordinates: [0, 0, 0]},
        properties: {orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
      },
      eomot: {
        proform: proform,
      },

      eocrom: { 'csx': 0, 'cf': 666, 'co': 0.069, 'cs': 444, 'cw': 0.99, 'cp': 0.99 },
      eoload: {
        eoform: conformB,
      },
    }
    // .................. natB
    let natAB = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'natAB'},

      eofold: ani => {
        let natA = {eoform: ani.eoload.eoformA, ghv: 1, gsa: 0, gco: 0}
        let A = muonNatform.natMultiLineString(natA).geometry.coordinates

        let natB = {eoform: ani.eoload.eoformB, ghv: 1, gsa: 0, gco: 0}
        let B = muonNatform.natMultiLineString(natB).geometry.coordinates

        let sum = muonMinkowski(A, B)
        let sumring = [...sum, sum[0]]

        let res = {
          type: 'Feature',
          geometry: {
            type: 'MultiLineString',
            coordinates: [sumring],
          },
          properties: {},
        }

        return res
      },
      eonode: {
        type: 'Feature',
        geometry: {type: 'Point', coordinates: [0, 0, 0]},
        properties: {orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
      },
      eomot: {
        proform: proform,
      },

      eocrom: { 'csx': 20, 'cf': 666, 'co': 0.069, 'cs': 222, 'cw': 0.99, 'cp': 0.99 },
      eoload: {
        eoformA: conformA,
        eoformB: conformB,
      },
    }
    // -------------------------------  geograt1
    let geograt1 = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {'gid': 'geo', 'cid': 'geo', 'fid': 'geograt1'},

      eofold: ani => muonGraticule.gjfMultiLineString(ani.eoload.eoframe),

      eomot: {
        proform: proform,
      },

      eocrom: { 'csx': 0, 'cf': 111, 'cs': 666, 'cw': 0.3, 'co': 0.05, 'cp': 0.9},

      eoload: {

        eoframe: {
          multiframe: [ [-180, 180, 30, 3],
            [-180, 180, 30, 3] ],
        },

      },
    }
    // .................. scene
    let scene = {

      natA, // h.mars g.uniwen
      natB, // h.mars g.uniwen
      natAB, // h.mars g.uniwen
      geograt1, // h.mars

    }

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ856bMinkowski = anitem
}))