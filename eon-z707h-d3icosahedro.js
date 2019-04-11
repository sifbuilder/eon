/* ******************************************
   *    @eonZ707hD3icosahedro
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ707hD3icosahedro = global.eonZ707hD3icosahedro || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3,
    d3Geo,
    ctlWen,
    eohalMars,
    eohalSol,
    muonGeom,
    muonProps,
    renderPortview,
    renderWebgl,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').b('d3-geo'),
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').e('sol'),
    __eo('xs').m('geom'),
    __eo('xs').m('props'),
    __eo('xs').r('portview'),
    __eo('xs').r('webgl'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) { }
  let z = function () {
  // .................. pics

    let epsilon = 1e-6, epsilon2 = epsilon * epsilon, asin = Math.asin
    let atan = Math.atan, abs = Math.abs
    let pi = Math.PI, degrees = 180 / pi, asin1_3 = Math.asin(1 / 3)
    let theta = atan(0.5) * degrees

    let pars = {
      C0: 0.809016994374947424102293417183, // dihedral angunit: 116.56° (1+sqrt(5))/4
    }

    const eotim = {'td': 19800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

    // .................. facesAni anima
    let facesAni = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {gid: 'facesAni', cid: 'facesAni', fid: 'facesAni'},

      eofold: anitem => {
        let eoload = anitem.eoload,
          vertices = eoload.vertices,
          faces = eoload.faces

        let json = { // Feature
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

        return json
      },

      eocrom: {'csx': 0, 'cf': 999, 'cs': 777, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

      eomot: {
        proform: {

          projection: 'uniwen',
          translate: [ 0, 0, 0 ],
          scale: [200, 200, 200],
          rotate: [[[[0, 90, 190, 190]]], [[[0, 6, 12, -12]]], [[[0, 9, 9, 0]]]],
          lens: [0, 1, Infinity ],

        },
      },
      eoload: {

        vertices: [

          [ 0.5, 0.0, pars.C0 ], // 0 est front
          [ 0.5, 0.0, -pars.C0 ], // 1 east back
          [-0.5, 0.0, pars.C0 ], // 2 west front
          [-0.5, 0.0, -pars.C0 ], // 3 west back

          [ pars.C0, 0.5, 0.0 ], // 4 east up
          [ pars.C0, -0.5, 0.0 ], // 5 east down
          [ -pars.C0, 0.5, 0.0 ], // 6 west up
          [ -pars.C0, -0.5, 0.0 ], // 7 west down

          [[[ [
            [ 0.0, pars.C0, 0.5 ], //  8(8)*  north front -> 8->0
            [ 0.0, pars.C0, 0.5 ], //  8(8)*  north front -> 8->0
            [ 0.5, 0.0, pars.C0 ], //  8(8)*  north front -> 8->0
            [ 0.5, 0.0, pars.C0 ], //  8(8)*  north front -> 8->0
            [ 0.0, pars.C0, 0.5 ], //  8(8)*  north front -> 8->0
            [ 0.0, pars.C0, 0.5 ], //  8(8)*  north front -> 8->0
          ] ]]],

          [[[ [
            [ 0.0, pars.C0, 0.5 ], //  9(8)*  north front -> 9->2
            [ 0.0, pars.C0, 0.5 ], //  9(8)*  north front -> 9->2
            [ -0.5, 0.0, pars.C0 ], //  9(8)*  north front -> 9->2
            [ -0.5, 0.0, pars.C0 ], //  9(8)*  north front -> 9->2
            [ 0.0, pars.C0, 0.5 ], //  9(8)*  north front -> 9->2
            [ 0.0, pars.C0, 0.5 ], //  9(8)*  north front -> 9->2
          ] ]]],

          [[[ [
            [ 0.0, pars.C0, 0.5 ], // 10(8)*  north front -> 10->4
            [ 0.0, pars.C0, 0.5 ], // 10(8)*  north front -> 10->4
            [ pars.C0, 0.5, 0.0 ], // 10(8)*  north front -> 10->4
            [ pars.C0, 0.5, 0.0 ], // 10(8)*  north front -> 10->4
            [ 0.0, pars.C0, 0.5 ], // 10(8)*  north front -> 10->4
            [ 0.0, pars.C0, 0.5 ], // 10(8)*  north front -> 10->4
          ] ]]],

          [[[ [
            [ 0.0, pars.C0, 0.5 ], // 11(8)*  north front -> 11->13(9)
            [ 0.0, pars.C0, 0.5 ], // 11(8)*  north front -> 11->13(9)
            [ 0.0, pars.C0, -0.5 ], // 11(8)*  north front -> 11->13(9)
            [ 0.0, pars.C0, -0.5 ], // 11(8)*  north front -> 11->13(9)
            [ 0.0, pars.C0, 0.5 ], // 11(8)*  north front -> 11->13(9)
            [ 0.0, pars.C0, 0.5 ], // 11(8)*  north front -> 11->13(9)
          ] ]]],

          [[[ [
            [ 0.0, pars.C0, 0.5 ], // 12(8)*  north front -> 12->6
            [ 0.0, pars.C0, 0.5 ], // 12(8)*  north front -> 12->6
            [ -pars.C0, 0.5, 0.0 ], // 12(8)*  north front -> 12->6
            [ -pars.C0, 0.5, 0.0 ], // 12(8)*  north front -> 12->6
            [ 0.0, pars.C0, 0.5 ], // 12(8)*  north front -> 12->6
            [ 0.0, pars.C0, 0.5 ], // 12(8)*  north front -> 12->6
          ] ]]],

          [ 0.0, pars.C0, -0.5], // 13 <- (9) north back
          [ 0.0, -pars.C0, 0.5], // 14 <- (10) south front

          [[[ [
            [ 0.0, -pars.C0, -0.5], // 15(11)  south back -> 15->3
            [ 0.0, -pars.C0, -0.5], // 15(11)  south back -> 15->3
            [ -0.5, 0.0, -pars.C0], // 15(11)  south back -> 15->3
            [ -0.5, 0.0, -pars.C0], // 15(11)  south back -> 15->3
            [ 0.0, -pars.C0, -0.5], // 15(11)  south back -> 15->3
            [ 0.0, -pars.C0, -0.5], // 15(11)  south back -> 15->3
          ] ]]],

          [[[ [
            [ 0.0, -pars.C0, -0.5], // 16(11)  south back -> 16->7
            [ 0.0, -pars.C0, -0.5], // 16(11)  south back -> 16->7
            [ -pars.C0, -0.5, 0.0], // 16(11)  south back -> 16->7
            [ -pars.C0, -0.5, 0.0], // 16(11)  south back -> 16->7
            [ 0.0, -pars.C0, -0.5], // 16(11)  south back -> 16->7
            [ 0.0, -pars.C0, -0.5], // 16(11)  south back -> 16->7
          ] ]]],

          [[[ [
            [ 0.0, -pars.C0, -0.5], // 17(11)  south back -> 17->14(10)
            [ 0.0, -pars.C0, -0.5], // 17(11)  south back -> 17->14(10)
            [ 0.0, -pars.C0, 0.5], // 17(11)  south back -> 17->14(10)
            [ 0.0, -pars.C0, 0.5], // 17(11)  south back -> 17->14(10)
            [ 0.0, -pars.C0, -0.5], // 17(11)  south back -> 17->14(10)
            [ 0.0, -pars.C0, -0.5], // 17(11)  south back -> 17->14(10)
          ] ]]],

          [[[ [
            [ 0.0, -pars.C0, -0.5], // 18(11)  south back -> 18->5
            [ 0.0, -pars.C0, -0.5], // 18(11)  south back -> 18->5
            [ pars.C0, -0.5, 0.0], // 18(11)  south back -> 18->5
            [ pars.C0, -0.5, 0.0], // 18(11)  south back -> 18->5
            [ 0.0, -pars.C0, -0.5], // 18(11)  south back -> 18->5
            [ 0.0, -pars.C0, -0.5], // 18(11)  south back -> 18->5
          ] ]]],

          [[[ [
            [ 0.0, -pars.C0, -0.5], // 19(11)  south back -> 19->1
            [ 0.0, -pars.C0, -0.5], // 19(11)  south back -> 19->1
            [ 0.5, 0.0, -pars.C0], // 19(11)  south back -> 19->1
            [ 0.5, 0.0, -pars.C0], // 19(11)  south back -> 19->1
            [ 0.0, -pars.C0, -0.5], // 19(11)  south back -> 19->1
            [ 0.0, -pars.C0, -0.5], // 19(11)  south back -> 19->1
          ] ]]],

        ],

        faces: [
          [ 0, 2, 14 ], // [ 0, 2, 10 ]
          [ 0, 14, 5 ], // [ 0, 10, 5 ]
          [ 0, 5, 4 ], // [ 0, 5, 4 ]
          [ 0, 4, 8 ], // [ 0, 4, 8 ]* 8->0
          [ 0, 9, 2 ], // [ 0, 8, 2 ]* 9(8)->2
          [ 3, 1, 15 ], // [ 3, 1, 11 ]** 15(11)->3
          [ 3, 16, 7 ], // [ 3, 11, 7 ]** 16(11)->7
          [ 3, 7, 6 ], // [ 3, 7, 6 ]
          [ 3, 6, 13 ], // [ 3, 6, 9 ]
          [ 3, 13, 1 ], // [ 3, 9, 1 ]
          [ 2, 6, 7 ], // [ 2, 6, 7 ]
          [ 2, 7, 14 ], // [ 2, 7, 10 ]
          [ 14, 7, 17 ], // [ 10, 7, 11 ]** 17(11)->10
          [ 14, 18, 5 ], // [ 10, 11, 5 ]** 18(11)->5
          [ 5, 19, 1 ], // [ 5, 11, 1 ]** 19(11)->1
          [ 5, 1, 4 ], // [ 5, 1, 4 ]
          [ 4, 1, 13 ], // [ 4, 1, 9 ]
          [ 4, 13, 10 ], // [ 4, 9, 8 ]* 10(8)->4
          [ 11, 13, 6 ], // [ 8, 9, 6 ]* 11(8)->13(9)
          [ 12, 6, 2 ], // [ 8, 6, 2 ]* 12(8)->6
        ],

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
          groundColor: 755.9649032258285,
          intensity: 0.4,
          position: [0, 0, 0],
          skyColor: 354,
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
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: anitem.eoload.light,
        }
        return json
      },
      eoload: {
        light: {
          sort: 'light',
          type: 'SpotLight',
          name: 'spotLight',
          castShadow: 1,
          color: 238,
          intensity: 0.99,
          normalize: 1,
          position: [-400, 400, 400],

        },
      },

    }
    // .................. cameraPersAni anima
    let cameraPersAni = {

      eotim: eotim,
      eoric: {gid: 'camera', cid: 'camera', fid: 'cameraPersAni'},
      eohal: eohalSol,

      eofold: anitem => {
        let eoload = anitem.eoload
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
            far: 600,

            position: [0, 0, 200 ],
            rotation: [0, 0, 0],

            distance2nodesFactor: 100,
            lookAt: [0, 0, 0],
          },
        }
        return json
      },
    }
    // .................. animas
    let animas = [

      facesAni, // h.mars
      // cameraPersAni, // h.sol
      lightHemisphereAni, // h.sol
      spotLight, // h.sol
    ]
    return animas
  }

  let enty = {}
  enty.z = z
  return enty
}
  exports.eonZ707hD3icosahedro = anitem
}))