/* ******************************************
   *    @eonZ793cOctahedron
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ793cOctahedron = global.eonZ793cOctahedron || {})))
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
      eonMuonGeom,
      eonMuonNatform,
      eonMuonNets,
      eonMuonProps,
      eonMuonGeovoro,
      eonRenderPortview,
      eonRenderWebgl,
    ] = await Promise.all([
      __eo('xs').b('d3'),
      __eo('xs').b('d3-geo'),
      __eo('xs').b('three'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-sol'),
      __eo('xs').b('eon-eohal-textform'),
      __eo('xs').b('eon-muon-geom'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-nets'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-muon-geovoro'),
      __eo('xs').b('eon-render-portview'),
      __eo('xs').b('eon-render-webgl'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    let z = function () {
      // .................. pics

      let epsilon = 1e-6, epsilon2 = epsilon * epsilon, asin = Math.asin
      let atan = Math.atan, abs = Math.abs
      let pi = Math.PI, degrees = 180 / pi, asin1_3 = Math.asin(1 / 3)
      let sqrt = Math.sqrt
      let theta = atan(0.5) * degrees,
        sin = Math.sin, cos = Math.cos

      const eotim = {'td': 9800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

      let def = `
:name
octahedron
:number
2
:symbol
{3,4}	@S sub 3 @
:dual
cube
:sfaces
8 8{3}
:svertices
6 6(@3 sup 4@)
:net
8 3
3 1 5 6
3 1 6 2
3 2 6 7
3 6 9 7
3 0 2 3
3 2 7 3
3 3 7 8
3 3 8 4
:solid
8 3
3 12 15 14
3 12 14 10
3 10 14 13
3 14 15 13
3 12 10 11
3 10 13 11
3 11 13 15
3 11 15 12
:hinges
7
0 2 1 0 1.9106332362490186
1 1 2 0 1.9106332362490186
2 1 3 2 1.9106332362490186
2 2 5 0 1.9106332362490186
4 1 5 2 1.9106332362490186
6 0 5 1 1.9106332362490186
7 0 6 2 1.9106332362490186
:dih
1
12 3 3 1.9106332362490185
:vertices
16 10
-1.44337567297406[(-5/6)*sqrt(3)] 1.5[3/2] 0[0]
-.577350269189626[(-1/3)*sqrt(3)] 0[0] 0[0]
-.577350269189626[(-1/3)*sqrt(3)] 1[1] 0[0]
-.577350269189626[(-1/3)*sqrt(3)] 2[2] 0[0]
-.577350269189626[(-1/3)*sqrt(3)] 3[3] 0[0]
.288675134594813[(1/6)*sqrt(3)] -.5[-1/2] 0[0]
.288675134594813[(1/6)*sqrt(3)] .5[1/2] 0[0]
.288675134594813[(1/6)*sqrt(3)] 1.5[3/2] 0[0]
.288675134594813[(1/6)*sqrt(3)] 2.5[5/2] 0[0]
1.15470053837925[(2/3)*sqrt(3)] 1[1] 0[0]
-.28867513459481281 2.5000000000000002 -1.6329931618554524
-3.8163916471489756e-17 2.0000000000000001 -.81649658092772641
-2.0122792321330962e-16 2.9999999999999991 -.81649658092772675
.57735026918962622 2.0000000000000002 -1.6329931618554525
.57735026918962629 3.0000000000000002 -1.6329931618554523
.86602540378443893 2.4999999999999999 -.81649658092772675
:EOF`

      // .................. facesAni anima
      let facesAni = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: {gid: 'facesAni', cid: 'facesAni', fid: 'facesAni'},

        eofold: anitem => {
          let tim = anitem.eoload.tim
          let colors = anitem.eoload.colors

          let parts = eonMuonNets.parse({text: def})

          let net = {
            type: 'Feature',
            geometry: {
              type: 'MultiPoint',
              coordinates: parts.verts,
            },
            properties: {
              sort: 'threeobject',
              faces: parts.faces,
              hinges: parts.hinges,
              colors: colors,
              renderData: {
                t: tim,
                docenter: 1,
              },
            },
          }

          return net
        },

        eocrom: {'csx': 0, 'cf': 999, 'cs': 777, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

        eomot: {
          proform: {

            projection: 'uniwen',
            scale: [ [[[1, 3]]], [[[1, 3]]], [[[1, 3]]]],
            translate: [ 0, 0, 0 ],
            rotate: [ 0, 0, 0 ],
            lens: [0, 1, Infinity],
          },

        },
        eoload: {
          tim: [[[0, 0.2, 1]]],
          colors: [
            [ 0.7, 0.5, 0.2], // gold
            [ 0.0, 0.2, 0.99 ],
            [ 0.0, 0.99, 0.09 ],
          ],
        },
      }

      // .................. cameraOrthoAni anima
      let cameraOrthoAni = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'cameraOrthoAni'},
        eohal: eonEohalSol,

        eofold: ani => {
          let json = {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: ani.eoload.properties,
          }
          return json
        },
        eoload: {
          properties: {

            sort: 'camera',
            type: 'OrthographicCamera',
            name: 'Orthographic',

            left: -(3 / 2) * 3.0,
            right: (3 / 2) * 3.0,
            top: 3.0,
            bottom: -3.0,
            near: 0.001,
            far: 20,

            position: [0, 0, -9],
            rotation: [0, 0, 0],
            distance2nodesFactor: 1,
            lookAt: [0, 0, 0],
          },

        },
      }
      // .................. textAni
      let net = eonMuonNets.parse({text: def})

      let text = `(${net.number}) ${net.name}
symbol: ${net.symbol}
dual: ${net.dual}`

      let textsegment = function (text, t) {
        let s = text // source
        let a = Array.from(s) // discretize source
        let q = a.length // length, number of elems
        let n = Math.ceil(q * t) // elems in time
        let v = a.slice(0, n) // segment in time
        let s1 = v.join('') // rejoin segment

        return s1
      }

      let textAni = {
        eohal: eonEohalTextform,
        eotim: eotim,
        eoric: {gid: 'txtg', cid: 'txtcT', fid: 'txtfT'},

        eofold: ani => {
          let natipros = { eoform: ani.eoload.eoform, ghv: 1, gsa: 1, gco: 0 }
          return eonMuonNatform.natMultiLineString(natipros)
        },
        eomot: {
          proform: {
            projection: 'uniwen',
            scale: [ 0.2, 0.2 ],

            translate: [ 0, 0, 0 ], // iter
            rotate: [0, 0, 0],
            lens: [0, 1, Infinity ],
          },
        },
        eocrom: { 'csx': 7, 'cf': 999, 'co': 0.9, 'cs': 999, 'cw': 0.1, 'cp': 0.99},

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

              'font-size': [[[12, 12]]],
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
          ani.eomot.proform.translate = [75, -150 - 15 * i]
          ani.eoload.textform.linenb = i
          anis['ani' + '_' + i] = ani
        }
        return anis
      }
      // .................. cameraOrthoAni anima
      let ambientLight = {

        eotim: eotim,
        eoric: {gid: 'light', cid: 'light', fid: 'AmbientLight'},
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
            type: 'AmbientLight',
            name: 'AmbientLight',
            color: 0xeeeeee,
            intensity: 0.6,
            position: [400, 400, 400],
          },
        },

      }
      // .................. scene
      let scene = Object.assign(
        {},
        getanis(text),
        {
          facesAni, // h.mars
          cameraOrthoAni, // h.sol
          ambientLight, // h.sol
        }
      )

      return scene
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ793cOctahedron = anitem
}))
