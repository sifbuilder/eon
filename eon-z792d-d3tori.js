/* ******************************************
   *    @eonZ792dD3tori
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ792dD3tori = global.eonZ792dD3tori || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3,
    d3Geo,
    THREE,
    d3Force3d,
    eonCtlWen,
    eonEohalMars,
    eonEohalSol,
    eonMuonGraticule,
    eonMuonGeom,
    eonProtonNatform,
    eonRenderPortview,
    eonRenderWebgl,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').b('d3-geo'),
    __eo('xs').b('three'),
    __eo('xs').b('d3-force-3d'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-sol'),
    __eo('xs').b('eon-muon-graticule'),
    __eo('xs').b('eon-muon-geom'),
    __eo('xs').b('eon-proton-natform'),
    __eo('xs').b('eon-render-portview'),
    __eo('xs').b('eon-render-webgl'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    // .................. pics
    let pi = Math.PI, halfpi = Math.PI / 2,
      radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
      sinh = Math.sinh, cosh = Math.cosh, tanh = Math.tanh

    let fact = n => n - 1 > 0 ? n * fact(n - 1) : n
    let fact0 = 1,
      fact1 = 1,
      fact2 = 2,
      fact3 = 6,
      fact4 = 24,
      fact5 = 120,
      fact6 = 720,
      fact7 = 5040,
      fact8 = 40320,
      fact9 = 362880
    let infact0 = 1 / fact0,
      infact1 = 1 / fact1,
      infact2 = 1 / fact2,
      infact3 = 1 / fact3,
      infact4 = 1 / fact4,
      infact5 = 1 / fact5,
      infact6 = 1 / fact6,
      infact7 = 1 / fact7,
      infact8 = 1 / fact8,
      infact9 = 1 / fact9

    let cost = [infact0, 0, -infact2, 0, infact4, 0, -infact6, 0, infact8]
    let sint = [0, infact1, 0, -infact3, 0, infact5, 0, -infact7, 0, infact9]
    let cosht = [infact0, 0, +infact2, 0, infact4, 0, +infact6, 0, infact8]
    let sinht = [0, infact1, 0, +infact3, 0, infact5, 0, +infact7, 0, infact9]
    let exp = [infact0, infact1, infact2, infact3, infact4, infact5, infact6, infact7, infact8, infact9]

    const eotim = {'td': 23800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

    let formCircA = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 15, 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ 2, 2, [[[20, 20]]], 10 ],
        'fn0': (e, c, d) => c[0] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * cos(e[3]),
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 15, 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ 2, 2, [[[20, 20]]], 10 ],
        'fn0': (e, c, d) => c[1] * (d.c[2] + d.c[3] * cos(e[1])) * c[2] * sin(e[3]),
      },
      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 15, 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ 1, 1, 1, 5 ],
        'fn0': (e, c, d) => d.c[3] * sin(e[0]),
      },
    }

    let formCircB = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 15, 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ 2, 2, [[[20, 20]]], 3 ],
        'fn0': (e, c, d) => c[0] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * cos(e[3]),
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 15, 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ 2, 2, [[[20, 20]]], 3 ],
        'fn0': (e, c, d) => c[1] * (d.c[2] + d.c[3] * cos(e[1])) * c[2] * sin(e[3]),
      },
      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 15, 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ 1, 1, 1, 9 ],
        'fn0': (e, c, d) => d.c[3] * sin(e[1]),
      },
    }
    let geoframe = [ [ [ -180, 180, 12, 12],
      [ [[[-180, 0, -180]]], [[[180, 0, 180]]], 12, 12] ] ]
    // [ -180, 180, 12, 12] ] ]

    // .................. torusAniA anima
    let torusAniA = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'torus', cid: 'torus', fid: 'torusA'},

      eofold: p => {
        let vertices = eonMuonGraticule.gjfMultiPoint(p.eoframe).geometry.coordinates
        let quads = eonMuonGraticule.qfaces(p.eoframe)
        let faces = quads.reduce((p, q) => [...p, ...eonMuonGeom.convextriang(q)], [])

        let featureMultiPoint = {
          type: 'Feature',
          geometry: {
            type: 'MultiPoint',
            coordinates: vertices,
          },
          properties: {
            sort: 'form',
            eoMultiPolygon: 1,
            faces: faces,
          },
        }

        return featureMultiPoint
      },

      eocrom: {'csx': 0, 'cf': 999, 'cs': 777, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

      eomot: {

        conform: {
          projection: 'natform',
          eoform: formCircA,
        },

        proform: {
          projection: 'uniwen',
          translate: [0, 0, 0],
          scale: [0.1, 0.1, 0.1],
          rotate: [ [[[0, 0 * 120, 0 * 120]]], [[[0, 0 * 260, 0 * 260]]], [[[0, 0 * 220, 0 * 220]]]], // [ 0, 0, 0 ],
          lens: [ 0, 1, Infinity ],
        },
      },

      eoframe: geoframe,
      eoload: {},
    }

    // .................. torusAniB anima
    let torusAniB = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'torus', cid: 'torus', fid: 'torusB'},

      eofold: p => {
        let vertices = eonMuonGraticule.gjfMultiPoint(p.eoframe).geometry.coordinates
        let quads = eonMuonGraticule.qfaces(p.eoframe)
        let faces = quads.reduce((p, q) => [...p, ...eonMuonGeom.convextriang(q)], [])

        let featureMultiPoint = {
          type: 'Feature',
          geometry: {
            type: 'MultiPoint',
            coordinates: vertices,
          },
          properties: {
            sort: 'form',
            eoMultiPolygon: 1,
            faces: faces,
          },
        }

        return featureMultiPoint
      },

      eocrom: {'csx': 0, 'cf': 999, 'cs': 777, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

      eomot: {

        conform: {
          projection: 'natform',
          eoform: formCircB,
        },

        proform: {
          projection: 'uniwen',
          translate: [0, 0, 0],
          scale: [0.1, 0.1, 0.1],
          rotate: [ [[[0, 0 * 120, 0 * 120]]], [[[0, 0 * 260, 0 * 260]]], [[[0, 0 * 220, 0 * 220]]]], // [ 0, 0, 0 ],
          lens: [ 0, 1, Infinity ],
        },
      },

      eoframe: geoframe,
      eoload: {},
    }

    // .................. animas
    let animas = [

      torusAniA, // h.mars
      torusAniB, // h.mars

    ]
    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ792dD3tori = anitem
}))