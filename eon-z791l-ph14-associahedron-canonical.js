/* ******************************************
   *    @eonZ791lPh14AssociahedronCanonical
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ791lPh14AssociahedronCanonical = global.eonZ791lPh14AssociahedronCanonical || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
    let [
      d3,
      d3Geo,
      THREE,
      eonCtlWen,
      eonEohalMars,
      eonEohalSol,
      eonEohalTextform,
      eonMuonNatform,
      eonMuonGeom,
      eonMuonProps,
      eonRenderPortview,
      eonRenderSvg,
      eonRenderWebgl,
    ] = await Promise.all([
      __eo('xs').b('d3'),
      __eo('xs').b('d3-geo'),
      __eo('xs').b('three'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-sol'),
      __eo('xs').b('eon-eohal-textform'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-geom'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-render-portview'),
      __eo('xs').b('eon-render-svg'),
      __eo('xs').b('eon-render-webgl'),
    ])
    try {
      if (__eo('eonRenderWebgl') == undefined) {
        eonRenderSvg.scenecolor('black')
      }
    } catch (e) {}
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }
    let z = function () {
    // .................. pics

      let epsilon = 1e-6, epsilon2 = epsilon * epsilon, asin = Math.asin,
        atan = Math.atan, abs = Math.abs,
        sin = Math.sin, cos = Math.cos,
        sqrt = Math.sqrt,
        pi = Math.PI, degrees = 180 / pi, asin1_3 = Math.asin(1 / 3),
        theta = atan(0.5) * degrees

      const eotim = {'td': 16000, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

      // .................. facesAni anima
      let facesAni = {

        eotim: eotim,
        eoric: {gid: 'facesAni', cid: 'facesAni', fid: 'facesAni'},
        eohal: eonEohalMars,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = {
            type: 'Feature',
            geometry: {
              type: 'MultiPoint',
              coordinates: eoload.vertices(eoload.pars),
            },
            properties: {
              pointRadius: 0.01,
              sort: 'form',
              eoMultiPolygon: 1,
              faces: eoload.faces(eoload.pars).reduce((p, q) => [...p, ...eonMuonGeom.convextriang(q)], []),
              lights: eoload.lights(eoload.pars),
            },
          }

          return json
        },

        eocrom: {'csx': 0, 'cf': 999, 'cs': 777, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

        eomot: {
          proform: {

            projection: 'uniwen',
            translate: [
              0,
              30,
              0,
            ],

            scale: [
              60,
              60,
              60,
            ],

            rotate: [ [[[90, 90, 36, 90, 90]]], [[[0, 0, 360, 2 * 360, 2 * 360]]], [[[9, 9, 24, 9, 9]]] ],
            lens: [0, 1, Infinity ],

          },
        },
        eoload: {
        /*
            Dave McCooey
            dmccooey@mac.com

            Associahedron (canonical)

          */

          vertices: pars => [[0, 0, 2.242640687119285], [0, 0, -2.242640687119285], [0, 1.7320508075688772, 1.2426406871192852], [0, 1.7320508075688772, -1.2426406871192852], [1.5, -0.8660254037844386, 1.2426406871192852], [1.5, -0.8660254037844386, -1.2426406871192852], [-1.5, -0.8660254037844386, 1.2426406871192852], [-1.5, -0.8660254037844386, -1.2426406871192852], [2.1213203435596424, 0.21013299903701255, 0], [-2.1213203435596424, 0.21013299903701255, 0], [1.2426406871192852, 1.7320508075688772, 0], [-1.2426406871192852, 1.7320508075688772, 0], [0.8786796564403574, -1.9421838066058899, 0], [-0.8786796564403574, -1.9421838066058899, 0]], // end vertices

          faces: pars => [[0, 2, 11, 9, 6], [0, 4, 8, 10, 2], [0, 6, 13, 12, 4], [1, 3, 10, 8, 5], [1, 5, 12, 13, 7], [1, 7, 9, 11, 3], [2, 10, 3, 11], [4, 12, 5, 8], [6, 9, 7, 13]], // end faces

          lights: pars =>
            [
              {
                type: 'SpotLight',
                color: 0xe4eef9,
                intensity: 0.01,
                position: [0, 0, 2120],
                normalize: 1,
                castShadow: 1,
              },
            ],
        },
      }

      // .................. cameraOrthoAni anima
      let lightHemisphereAni = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'lightHemisphereAni'},
        eohal: eonEohalSol,

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
            skyColor: [[[222, 999]]],
            groundColor: 111,
            intensity: 0.2,
            position: [0, 0, 200],
          },
        },
      }

      // .................. spotLight anima
      let spotLight = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'spotLight'},
        eohal: eonEohalSol,

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
            color: [[[222, 777]]], // 0xe4eef9,
            intensity: 0.9,
            position: [-200, 200, 200],
            normalize: 1,
            castShadow: 1,
          },
        },
      }

      // .................. cameraPersAni anima
      let cameraPersAni = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'cameraPersAni'},
        eohal: eonEohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: anitem.eoload.camera,
          }

          return json
        },
        eoload: {
          camera: {
            sort: 'camera',
            type: 'PerspectiveCamera',
            name: 'Perspective',
            fov: 100, // field of view
            aspect: eonRenderPortview.width() / eonRenderPortview.height(),
            near: 0.001,
            far: 300,
            position: [0, 0, 200 ],
            rotation: [0, 60, 0],
            distance2nodesFactor: 100,
            lookAt: [0, 0, 0],
          },
        },
      }
      let text = `Associahedron (canonical) 
      Vertices:  	14 
      Faces:	    9 
      Edges:    	21 
      Symmetry:  	3-fold Prismatic (D3h)
      `

      // .................. textAni
      let textAni = {
        eohal: eonEohalTextform,
        eotim: eotim,
        eoric: {gid: 'txtg', cid: 'txtTA', fid: 'txtfA'},

        eofold: ani => {
          let natipros = { eoform: ani.eoload.eoform, ghv: 1, gsa: 1, gco: 0 }
          return eonMuonNatform.natMultiLineString(natipros)
        },
        eomot: {
          proform: {
            projection: 'uniwen',
            scale: [ 0.2, 0.2 ],
            prerotate: [[[ ctl.rotation ]]],
            translate: [ 50, -150, 0 ],
            rotate: [0, 0, 0],
            lens: [0, 1, Infinity ],
          },
        },
        eocrom: { 'csx': 0, 'cf': 999, 'co': 0.19, 'cs': 999, 'cw': 0.99, 'cp': 0.99 },

        eoload: {
          eoform: {
            x: {
              'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
              'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
              'dom3': [ 0, 7 * 360 ],
              'fn0': (e, c) => e[0],
            },
            y: {
              'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
              'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
              'dom3': [0, 360],
              'fn0': (e, c) => 0 * sin(e[0]),
            },
          },
          textform: {
            string: [[[function (t) {
              let txt = this.text
              let linenb = this.linenb
              let sttxt = txt.split('\n')
              return sttxt[linenb]
            }]]],
            text: text,
            style: {
              rotate: [[[ 0, 0 ]]],
              'font-size': 9,
              'font-family': 'Verdana', // BankFuturistic, Arial
              'kerning': 4, // 1
              'lengthAdjust': 'spacing', // spacingAndGlyphs
              'letter-spacing': 1,
              'text-anchor': 'start', // start, middle, end
              'textLength': 0,
              'word-spacing': 1,
            },
          },
        },
      }
      let getanis = function (txt = '') {
        let anis = {}
        let a = txt.split('\n')
        for (let i = 0; i < a.length; i++) {
          let ani = eonMuonProps.clone(textAni)
          ani.eoric.fid = textAni.eoric.fid + '_' + i
          ani.eoric.cid = textAni.eoric.cid + '_' + i
          ani.eomot.proform.translate = [-50, -105 - 15 * i]
          ani.eoload.textform.linenb = i
          anis['ani' + '_' + i] = ani
        }
        return anis
      }
      // .................. animas
      let animas = [

        facesAni, // h.mars
        cameraPersAni, // h.sol
        lightHemisphereAni, // h.sol
        spotLight, // h.sol
        ...Object.values(getanis(text)),

      ]
      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ791lPh14AssociahedronCanonical = anitem
}))
