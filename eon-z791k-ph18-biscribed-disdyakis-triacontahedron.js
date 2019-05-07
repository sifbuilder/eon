/* ******************************************
   *    @eonZ791kPh18BiscribedDisdyakisTriacontahedron
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ791kPh18BiscribedDisdyakisTriacontahedron = global.eonZ791kPh18BiscribedDisdyakisTriacontahedron || {})))
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
      eonMuonGeovoro,
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
      __eo('xs').b('eon-muon-geovoro'),
      __eo('xs').b('eon-render-portview'),
      __eo('xs').b('eon-render-svg'),
      __eo('xs').b('eon-render-webgl'),
    ])
    // try { eonRenderSvg.scenecolor('black') } catch (e) {}
    let z = function () {
    // .................. pics
      let ctl
      try {
        ctl = eonCtlWen().control(eonRenderSvg.svg())
      } catch (e) {
        ctl = () => [0, 0, 0]
      }

      let epsilon = 1e-6, epsilon2 = epsilon * epsilon, asin = Math.asin,
        atan = Math.atan, abs = Math.abs,
        sin = Math.sin, cos = Math.cos,
        sqrt = Math.sqrt,
        pi = Math.PI, degrees = 180 / pi, asin1_3 = Math.asin(1 / 3),
        theta = atan(0.5) * degrees

      const eotim = {'td': 10000, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

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
              100,
              100,
              100,
            ],

            rotate: [ [[[90, 90, 36, 90, 90]]], [[[0, 0, 360, 2 * 360, 2 * 360]]], [[[9, 9, 24, 9, 9]]] ],
            lens: [0, 1, Infinity ],

          },
        },
        eoload: {
        /*
            Dave McCooey
            dmccooey@mac.com

            Biscribed Disdyakis Triacontahedron

          */
          pars: {
            C0: 0.309016994374947424102293417183, //  = (sqrt(5) - 1) / 4
            C1: 0.356822089773089931941969843046, //  = (sqrt(15) - sqrt(3)) / 6
            C2: 0.525731112119133606025669084848, //  = sqrt(10 * (5 - sqrt(5))) / 10
            C3: 0.577350269189625764509148780502, //  = sqrt(3) / 3
            C4: 0.809016994374947424102293417183, //  = (1 + sqrt(5)) / 4
            C5: 0.850650808352039932181540497063, //  = sqrt(10 * (5 + sqrt(5))) / 10
            C6: 0.934172358962715696451118623548, //  = (sqrt(3) + sqrt(15)) / 6
          },
          vertices: pars =>
            [ [ 0, 0, 1 ],
              [ 0, 0, -1 ],
              [ 1, 0, 0 ],
              [ -1, 0, 0 ],
              [ 0, 1, 0 ],
              [ 0, -1, 0 ],
              [ 0, pars.C1, pars.C6 ],
              [ 0, pars.C1, -pars.C6 ],
              [ 0, -pars.C1, pars.C6 ],
              [ 0, -pars.C1, -pars.C6 ],
              [ pars.C6, 0, pars.C1 ],
              [ pars.C6, 0, -pars.C1 ],
              [ -pars.C6, 0, pars.C1 ],
              [ -pars.C6, 0, -pars.C1 ],
              [ pars.C1, pars.C6, 0 ],
              [ pars.C1, -pars.C6, 0 ],
              [ -pars.C1, pars.C6, 0 ],
              [ -pars.C1, -pars.C6, 0 ],
              [ pars.C2, 0, pars.C5 ],
              [ pars.C2, 0, -pars.C5 ],
              [ -pars.C2, 0, pars.C5 ],
              [ -pars.C2, 0, -pars.C5 ],
              [ pars.C5, pars.C2, 0 ],
              [ pars.C5, -pars.C2, 0 ],
              [ -pars.C5, pars.C2, 0 ],
              [ -pars.C5, -pars.C2, 0 ],
              [ 0, pars.C5, pars.C2 ],
              [ 0, pars.C5, -pars.C2 ],
              [ 0, -pars.C5, pars.C2 ],
              [ 0, -pars.C5, -pars.C2 ],
              [ pars.C0, 0.5, pars.C4 ],
              [ pars.C0, 0.5, -pars.C4 ],
              [ pars.C0, -0.5, pars.C4 ],
              [ pars.C0, -0.5, -pars.C4 ],
              [ -pars.C0, 0.5, pars.C4 ],
              [ -pars.C0, 0.5, -pars.C4 ],
              [ -pars.C0, -0.5, pars.C4 ],
              [ -pars.C0, -0.5, -pars.C4 ],
              [ pars.C4, pars.C0, 0.5 ],
              [ pars.C4, pars.C0, -0.5 ],
              [ pars.C4, -pars.C0, 0.5 ],
              [ pars.C4, -pars.C0, -0.5 ],
              [ -pars.C4, pars.C0, 0.5 ],
              [ -pars.C4, pars.C0, -0.5 ],
              [ -pars.C4, -pars.C0, 0.5 ],
              [ -pars.C4, -pars.C0, -0.5 ],
              [ 0.5, pars.C4, pars.C0 ],
              [ 0.5, pars.C4, -pars.C0 ],
              [ 0.5, -pars.C4, pars.C0 ],
              [ 0.5, -pars.C4, -pars.C0 ],
              [ -0.5, pars.C4, pars.C0 ],
              [ -0.5, pars.C4, -pars.C0 ],
              [ -0.5, -pars.C4, pars.C0 ],
              [ -0.5, -pars.C4, -pars.C0 ],
              [ pars.C3, pars.C3, pars.C3 ],
              [ pars.C3, pars.C3, -pars.C3 ],
              [ pars.C3, -pars.C3, pars.C3 ],
              [ pars.C3, -pars.C3, -pars.C3 ],
              [ -pars.C3, pars.C3, pars.C3 ],
              [ -pars.C3, pars.C3, -pars.C3 ],
              [ -pars.C3, -pars.C3, pars.C3 ],
              [ -pars.C3, -pars.C3, -pars.C3 ] ],

          faces: pars =>

            [ [ 18, 0, 8 ],
              [ 18, 8, 32 ],
              [ 18, 32, 56 ],
              [ 18, 56, 40 ],
              [ 18, 40, 10 ],
              [ 18, 10, 38 ],
              [ 18, 38, 54 ],
              [ 18, 54, 30 ],
              [ 18, 30, 6 ],
              [ 18, 6, 0 ],
              [ 19, 1, 7 ],
              [ 19, 7, 31 ],
              [ 19, 31, 55 ],
              [ 19, 55, 39 ],
              [ 19, 39, 11 ],
              [ 19, 11, 41 ],
              [ 19, 41, 57 ],
              [ 19, 57, 33 ],
              [ 19, 33, 9 ],
              [ 19, 9, 1 ],
              [ 20, 0, 6 ],
              [ 20, 6, 34 ],
              [ 20, 34, 58 ],
              [ 20, 58, 42 ],
              [ 20, 42, 12 ],
              [ 20, 12, 44 ],
              [ 20, 44, 60 ],
              [ 20, 60, 36 ],
              [ 20, 36, 8 ],
              [ 20, 8, 0 ],
              [ 21, 1, 9 ],
              [ 21, 9, 37 ],
              [ 21, 37, 61 ],
              [ 21, 61, 45 ],
              [ 21, 45, 13 ],
              [ 21, 13, 43 ],
              [ 21, 43, 59 ],
              [ 21, 59, 35 ],
              [ 21, 35, 7 ],
              [ 21, 7, 1 ],
              [ 22, 2, 11 ],
              [ 22, 11, 39 ],
              [ 22, 39, 55 ],
              [ 22, 55, 47 ],
              [ 22, 47, 14 ],
              [ 22, 14, 46 ],
              [ 22, 46, 54 ],
              [ 22, 54, 38 ],
              [ 22, 38, 10 ],
              [ 22, 10, 2 ],
              [ 23, 2, 10 ],
              [ 23, 10, 40 ],
              [ 23, 40, 56 ],
              [ 23, 56, 48 ],
              [ 23, 48, 15 ],
              [ 23, 15, 49 ],
              [ 23, 49, 57 ],
              [ 23, 57, 41 ],
              [ 23, 41, 11 ],
              [ 23, 11, 2 ],
              [ 24, 3, 12 ],
              [ 24, 12, 42 ],
              [ 24, 42, 58 ],
              [ 24, 58, 50 ],
              [ 24, 50, 16 ],
              [ 24, 16, 51 ],
              [ 24, 51, 59 ],
              [ 24, 59, 43 ],
              [ 24, 43, 13 ],
              [ 24, 13, 3 ],
              [ 25, 3, 13 ],
              [ 25, 13, 45 ],
              [ 25, 45, 61 ],
              [ 25, 61, 53 ],
              [ 25, 53, 17 ],
              [ 25, 17, 52 ],
              [ 25, 52, 60 ],
              [ 25, 60, 44 ],
              [ 25, 44, 12 ],
              [ 25, 12, 3 ],
              [ 26, 4, 16 ],
              [ 26, 16, 50 ],
              [ 26, 50, 58 ],
              [ 26, 58, 34 ],
              [ 26, 34, 6 ],
              [ 26, 6, 30 ],
              [ 26, 30, 54 ],
              [ 26, 54, 46 ],
              [ 26, 46, 14 ],
              [ 26, 14, 4 ],
              [ 27, 4, 14 ],
              [ 27, 14, 47 ],
              [ 27, 47, 55 ],
              [ 27, 55, 31 ],
              [ 27, 31, 7 ],
              [ 27, 7, 35 ],
              [ 27, 35, 59 ],
              [ 27, 59, 51 ],
              [ 27, 51, 16 ],
              [ 27, 16, 4 ],
              [ 28, 5, 15 ],
              [ 28, 15, 48 ],
              [ 28, 48, 56 ],
              [ 28, 56, 32 ],
              [ 28, 32, 8 ],
              [ 28, 8, 36 ],
              [ 28, 36, 60 ],
              [ 28, 60, 52 ],
              [ 28, 52, 17 ],
              [ 28, 17, 5 ],
              [ 29, 5, 17 ],
              [ 29, 17, 53 ],
              [ 29, 53, 61 ],
              [ 29, 61, 37 ],
              [ 29, 37, 9 ],
              [ 29, 9, 33 ],
              [ 29, 33, 57 ],
              [ 29, 57, 49 ],
              [ 29, 49, 15 ],
              [ 29, 15, 5 ] ],

          lights: pars =>
            [
              // {
            // type: 'AmbientLight',
            // name: 'AmbientLight',
            // color: 0xeeeeee,
            // intensity: 0.9,
            // position: [110, 110, 110],
              // },
              // {
            // type: 'DirectionalLight',
            // name: 'DirectionalLight',
            // color: 0xe4eef9,
            // intensity: 0.7,
            // position: [0, 0, 120],
            // normalize: 1,
            // castShadow: 1,
              // },
              // {
            // type: 'PointLight',
            // color: 0xe4eef9,
            // intensity: 0.7,
            // position: [0, 0, 120],
            // normalize: 1,
            // castShadow: 1,
              // },
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
      // .................. cameraOrthoAni anima
      let cameraOrthoAni = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'cameraOrthoAni'},
        eohal: eonEohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: {
              sort: 'camera',
              type: 'OrthographicCamera',
              name: 'Orthographic',
              left: -eonRenderPortview.width() / 2,
              right: eonRenderPortview.width() / 2,
              top: eonRenderPortview.height() / 2,
              bottom: -eonRenderPortview.height() / 2,
              near: -200,
              far: 200,

              position: [0, 0, 20],
              rotation: [0, 60, 0],
              distance2nodesFactor: 300,
              lookAt: [0, 0, 0],
            },
          }

          return json
        },

      }

      // .................. cameraOrthoAni anima
      let cameraOrthoHelper = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'cameraOrthoHelper'},
        eohal: eonEohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: {
              sort: 'cameraHelper',
              type: 'OrthographicCamera',
              name: 'Orthographic',
              left: -eonRenderPortview.width() / 2,
              right: eonRenderPortview.width() / 2,
              top: eonRenderPortview.height() / 2,
              bottom: -eonRenderPortview.height() / 2,
              near: -200,
              far: 200,

              position: [-200, 0, 200],
              rotation: [0, 0, 0],
              distance2nodesFactor: 300,
              lookAt: [0, 0, 0],
            },
          }

          return json
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
      // .................. cameraPersHelper anima
      let cameraPersHelper = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'cameraPersHelper'},
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
            sort: 'cameraHelper',
            type: 'PerspectiveCamera',
            name: 'cameraPersHelper',

            fov: 90, // field of view
            aspect: eonRenderPortview.width() / eonRenderPortview.height(),
            near: -100,
            far: 100,

            position: [200, 200, 200],
            rotation: [0, 0, 0],
            // distance2nodesFactor: 300,
            lookAt: [0, 0, 0],
          },
        },
      }
      // .................. gridHelper anima
      let gridHelper = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'gridHelper'},
        eohal: eonEohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: {
              sort: 'gridHelper',
              type: 'GridHelper',
              name: 'gridHelper',
              isToUpdate: 0,

              size: 200, // field of view
              divisions: 5,

              position: [0, -100, 0 ],
            },
          }

          return json
        },

      }
      let text = `Biscribed Disdyakis Triacontahedron
      Vertices:  	62
      Faces:	    120
      Edges:    	180
      Symmetry:  	Full Icosahedral
      Dual Solid: Biscribed Truncated Icosidodecahedron      
      `

      let textsegment = function (text, t) {
        let s = text // source
        let a = Array.from(s) // discretize source
        let q = a.length // length, number of elems
        let n = Math.ceil(q * t) // elems in time
        let v = a.slice(0, n) // segment in time
        let s1 = v.join('') // rejoin segment

        return s1
      }
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
            // text: `Biscribed Disdyakis Triacontahedron`,
            style: {
              rotate: [[[ 0, 0 ]]],
              // 'dx': 444,
              // 'dy': 444,
              'font-size': 9,
              'font-family': 'Verdana', // BankFuturistic, Arial
              // 'height': 56,
              'kerning': 4, // 1
              'lengthAdjust': 'spacing', // spacingAndGlyphs
              'letter-spacing': 1,
              'text-anchor': 'start', // start, middle, end
              'textLength': 0,
              // 'width': 111,
              'word-spacing': 1,
            // 'writing-mode': 'tb',
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
        // cameraPersHelper, // h.sol
        // cameraOrthoAni, // h.sol
        // cameraOrthoHelper, // h.sol
        // gridHelper, // h.sol
        lightHemisphereAni, // h.sol
        spotLight, // h.sol
        // textAni, // h.textFrom
        ...Object.values(getanis(text)),

      ]
      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ791kPh18BiscribedDisdyakisTriacontahedron = anitem
}))
