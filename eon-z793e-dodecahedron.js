/* ******************************************
   *    @eonZ793eDodecahedron
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ793eDodecahedron = global.eonZ793eDodecahedron || {})))
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
dodecahedron
:number
3
:symbol
{5,3}	@D sub 5 @
:dual
icosahedron
:sfaces
12 12{5}
:svertices
20 20(@5 sup 3@)
:net
12 5
5 10 16 23 24 17
5 37 32 24 23 31
5 25 18 17 24 30
5 4 3 10 17 11
5 1 9 16 10 2
5 22 29 23 16 15
5 15 8 14 21 22
5 0 5 13 14 6
5 12 19 20 13 7
5 33 34 27 20 26
5 36 28 21 27 35
5 27 21 14 13 20
:solid
12 5
5 40 38 39 42 43
5 49 48 42 39 44
5 54 50 43 42 48
5 51 46 40 43 50
5 47 41 38 40 46
5 45 44 39 38 41
5 41 47 53 52 45
5 46 51 56 53 47
5 50 54 57 56 51
5 48 49 55 57 54
5 44 45 52 55 49
5 55 52 53 56 57
:hinges
11
0 0 4 2 2.0344439357957027
0 1 5 2 2.0344439357957027
0 2 1 2 2.0344439357957027
0 3 2 2 2.0344439357957027
0 4 3 2 2.0344439357957027
5 4 6 4 2.0344439357957027
11 0 10 2 2.0344439357957027
11 1 6 2 2.0344439357957027
11 2 7 2 2.0344439357957027
11 3 8 2 2.0344439357957027
11 4 9 2 2.0344439357957027
:dih
1
30 5 5 2.0344439357957027
:vertices
58 38
-1.80170732464719[(-3/16+(-3/80)*sqrt(5))*sqrt(10+2*sqrt(5))+(-3/16+(-1/16)*sqrt(5))*sqrt(10-2*sqrt(5))] -3.92705098312484[(-9/4+(-3/4)*sqrt(5))] 0[0]
-1.80170732464719[(-5/16+(-3/80)*sqrt(5))*sqrt(10+2*sqrt(5))-1/8*sqrt(10-2*sqrt(5))] -1.30901699437495[(-3/4+(-1/4)*sqrt(5))] 0[0]
-1.80170732464719[(-3/16+(-3/80)*sqrt(5))*sqrt(10+2*sqrt(5))+(-3/16+(-1/16)*sqrt(5))*sqrt(10-2*sqrt(5))] -.309016994374947[(1/4+(-1/4)*sqrt(5))] 0[0]
-1.80170732464719[(-1/16+(-13/80)*sqrt(5))*sqrt(10+2*sqrt(5))+(1/16+(-1/16)*sqrt(5))*sqrt(10-2*sqrt(5))] .309016994374947[(-1/4+(1/4)*sqrt(5))] 0[0]
-1.80170732464719[(-3/16+(-13/80)*sqrt(5))*sqrt(10+2*sqrt(5))+1/8*sqrt(10-2*sqrt(5))] 1.30901699437495[(3/4+(1/4)*sqrt(5))] 0[0]
-1.21392207235472[(-5/16+(7/80)*sqrt(5))*sqrt(10+2*sqrt(5))+(-3/16+(-1/16)*sqrt(5))*sqrt(10-2*sqrt(5))] -4.73606797749979[(-5/2-sqrt(5))] 0[0]
-1.21392207235472[(-5/16+(7/80)*sqrt(5))*sqrt(10+2*sqrt(5))+(-3/16+(-1/16)*sqrt(5))*sqrt(10-2*sqrt(5))] -3.11803398874989[(-2+(-1/2)*sqrt(5))] 0[0]
-.85065080835204001[(1/4+(1/40)*sqrt(5))*sqrt(10+2*sqrt(5))+(-7/16+(-3/16)*sqrt(5))*sqrt(10-2*sqrt(5))] -5.23606797749979[(-3-sqrt(5))] 0[0]
-.85065080835204001[(1/4+(1/40)*sqrt(5))*sqrt(10+2*sqrt(5))+(-7/16+(-3/16)*sqrt(5))*sqrt(10-2*sqrt(5))] -2.61803398874989[(-3/2+(-1/2)*sqrt(5))] 0[0]
-.85065080835204001[(-3/16+(-3/80)*sqrt(5))*sqrt(10+2*sqrt(5))+(-1/16+(1/16)*sqrt(5))*sqrt(10-2*sqrt(5))] -1.61803398874989[(-1/2+(-1/2)*sqrt(5))] 0[0]
-.85065080835204001[(-1/10)*sqrt(5)*sqrt(10+2*sqrt(5))] 0[0] 0[0]
-.85065080835204001[(-1/16+(-13/80)*sqrt(5))*sqrt(10+2*sqrt(5))+(3/16+(1/16)*sqrt(5))*sqrt(10-2*sqrt(5))] 1.61803398874989[(1/2+(1/2)*sqrt(5))] 0[0]
-.262865556059567[(1/16+(7/80)*sqrt(5))*sqrt(10+2*sqrt(5))+(-1/4+(-1/8)*sqrt(5))*sqrt(10-2*sqrt(5))] -6.04508497187474[(-13/4+(-5/4)*sqrt(5))] 0[0]
-.262865556059567[(3/16+(7/80)*sqrt(5))*sqrt(10+2*sqrt(5))+(-5/16+(-3/16)*sqrt(5))*sqrt(10-2*sqrt(5))] -4.42705098312484[(-11/4+(-3/4)*sqrt(5))] 0[0]
-.262865556059567[(3/16+(7/80)*sqrt(5))*sqrt(10+2*sqrt(5))+(-5/16+(-3/16)*sqrt(5))*sqrt(10-2*sqrt(5))] -3.42705098312484[(-7/4+(-3/4)*sqrt(5))] 0[0]
-.262865556059567[(1/16+(7/80)*sqrt(5))*sqrt(10+2*sqrt(5))+(-1/4+(-1/8)*sqrt(5))*sqrt(10-2*sqrt(5))] -1.80901699437495[(-5/4+(-1/4)*sqrt(5))] 0[0]
-.262865556059567[(-1/8+(1/40)*sqrt(5))*sqrt(10+2*sqrt(5))] -.80901699437494701[(-1/4+(-1/4)*sqrt(5))] 0[0]
-.262865556059567[(-1/8+(1/40)*sqrt(5))*sqrt(10+2*sqrt(5))] .80901699437494701[(1/4+(1/4)*sqrt(5))] 0[0]
-.262865556059567[(-3/16+(7/80)*sqrt(5))*sqrt(10+2*sqrt(5))-1/8*sqrt(10-2*sqrt(5))] 1.80901699437495[(5/4+(1/4)*sqrt(5))] 0[0]
.688190960235587[(1/4+(1/40)*sqrt(5))*sqrt(10+2*sqrt(5))+(-1/16+(-1/16)*sqrt(5))*sqrt(10-2*sqrt(5))] -5.73606797749979[(-7/2-sqrt(5))] 0[0]
.688190960235587[(3/16+(7/80)*sqrt(5))*sqrt(10+2*sqrt(5))+(-3/16+(-1/16)*sqrt(5))*sqrt(10-2*sqrt(5))] -4.73606797749979[(-5/2-sqrt(5))] 0[0]
.688190960235587[(3/16+(7/80)*sqrt(5))*sqrt(10+2*sqrt(5))+(-3/16+(-1/16)*sqrt(5))*sqrt(10-2*sqrt(5))] -3.11803398874989[(-2+(-1/2)*sqrt(5))] 0[0]
.688190960235587[(1/4+(1/40)*sqrt(5))*sqrt(10+2*sqrt(5))+(-1/16+(-1/16)*sqrt(5))*sqrt(10-2*sqrt(5))] -2.11803398874989[(-1+(-1/2)*sqrt(5))] 0[0]
.688190960235587[(1/8+(1/40)*sqrt(5))*sqrt(10+2*sqrt(5))] -.5[-1/2] 0[0]
.688190960235587[(1/8+(1/40)*sqrt(5))*sqrt(10+2*sqrt(5))] .5[1/2] 0[0]
.688190960235587[(1/40)*sqrt(5)*sqrt(10+2*sqrt(5))+(1/16+(1/16)*sqrt(5))*sqrt(10-2*sqrt(5))] 2.11803398874989[(1+(1/2)*sqrt(5))] 0[0]
1.27597621252806[(1/8+(11/40)*sqrt(5))*sqrt(10+2*sqrt(5))+(-3/8+(-1/8)*sqrt(5))*sqrt(10-2*sqrt(5))] -5.54508497187474[(-11/4+(-5/4)*sqrt(5))] 0[0]
1.27597621252806[(3/16+(7/80)*sqrt(5))*sqrt(10+2*sqrt(5))+(1/16+(-1/16)*sqrt(5))*sqrt(10-2*sqrt(5))] -3.92705098312484[(-9/4+(-3/4)*sqrt(5))] 0[0]
1.27597621252806[(1/4+(3/20)*sqrt(5))*sqrt(10+2*sqrt(5))+(-1/8+(-1/8)*sqrt(5))*sqrt(10-2*sqrt(5))] -2.30901699437495[(-7/4+(-1/4)*sqrt(5))] 0[0]
1.27597621252806[(1/16+(7/80)*sqrt(5))*sqrt(10+2*sqrt(5))+1/8*sqrt(10-2*sqrt(5))] -1.30901699437495[(-3/4+(-1/4)*sqrt(5))] 0[0]
1.27597621252806[(-3/16+(7/80)*sqrt(5))*sqrt(10+2*sqrt(5))+(1/4+(1/8)*sqrt(5))*sqrt(10-2*sqrt(5))] 1.30901699437495[(3/4+(1/4)*sqrt(5))] 0[0]
1.63924747653074[(3/8+(1/40)*sqrt(5))*sqrt(10+2*sqrt(5))] -.80901699437494701[(-1/4+(-1/4)*sqrt(5))] 0[0]
1.63924747653074[(3/8+(1/40)*sqrt(5))*sqrt(10+2*sqrt(5))] .80901699437494701[(1/4+(1/4)*sqrt(5))] 0[0]
2.22703272882321[(1/4+(11/40)*sqrt(5))*sqrt(10+2*sqrt(5))+(-5/16+(-1/16)*sqrt(5))*sqrt(10-2*sqrt(5))] -5.23606797749979[(-3-sqrt(5))] 0[0]
2.22703272882321[(1/8+(11/40)*sqrt(5))*sqrt(10+2*sqrt(5))-1/4*sqrt(10-2*sqrt(5))] -4.23606797749979[(-2-sqrt(5))] 0[0]
2.22703272882321[(1/4+(3/20)*sqrt(5))*sqrt(10+2*sqrt(5))] -3.61803398874989[(-5/2+(-1/2)*sqrt(5))] 0[0]
2.22703272882321[(3/8+(3/20)*sqrt(5))*sqrt(10+2*sqrt(5))+(-1/16+(-1/16)*sqrt(5))*sqrt(10-2*sqrt(5))] -2.61803398874989[(-3/2+(-1/2)*sqrt(5))] 0[0]
2.22703272882321[(1/4+(3/20)*sqrt(5))*sqrt(10+2*sqrt(5))] 0[0] 0[0]
-5.4026554096661251 -4.6432360415347109 -3.8549181907944434
-5.1853396652410706 -3.7236397682787258 -4.1822048563319945
-5.0444969442939336 -5.3000682015266456 -4.5184647432552076
-4.9219631903368564 -4.784878139510705 -2.9895439906028368
-4.6928726835237098 -3.812130175470726 -5.0480256921595847
-4.6058270949103624 -4.7864165280496855 -5.2558457313313264
-4.5703389295666345 -3.2969401134547878 -3.5191049395072154
-4.4075633162386962 -3.952821497041725 -2.7819999874347248
-4.342450620006153 -5.847654899281665 -4.0631848656021673
-4.2667205952915649 -5.529249930289646 -3.1182598743579288
-3.7735106148108719 -3.4401205999697668 -4.9200324800441027
-3.6977805900962842 -3.1217156309777516 -3.9751074887998721
-3.6326678938637387 -5.0165490332176857 -5.2562923669673119
-3.4698922805358034 -5.6724304168046292 -4.5191874148948177
-3.4344041151920706 -4.1829540022097216 -2.7824466230707104
-3.3473585265787243 -5.1572403547886831 -2.9902666622424477
-3.1182680197655795 -4.184492390748714 -5.0487483637992028
-2.9957342658084998 -3.6693023287327682 -3.5198276111468373
-2.854891544861367 -5.2457307619806908 -3.856087498070039
-2.6375758004363108 -4.3261344887247091 -4.1833741636076004
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
            shading: 0,
            showlines: 1,
            showfaces: 1,
            renderData: {
              t: tim,
              docenter: 1,
            },
          },
        }

        return net
      },

      eocrom: {'csx': 0, 'cf': 999, 'cs': 777, 'cw': 1.6, 'co': 0.999, 'cp': 0.999},

      eomot: {
        proform: {

          projection: 'uniwen',
          scale: [ [[[0.5, 2.0]]], [[[0.5, 2.0]]], [[[0.5, 2.0]]]],
          scale: [ 1, 1, 1 ],
          translate: [ 0, 0, 0 ],
          rotate: [ 0, 0, [[[0, 12]]] ],
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

          position: [0, 0, 9],
          rotation: [0, 90, 0],
          velang: [1, 10, 0],
          vellin: [0, 0, 0],
          distance2nodesFactor: 1,
          lookAt: [0, 0, 0],
        },

      },
    }
    // .................. textAni
    let net = eonMuonNets.parse({text: def})

    let text = `(${net.number}) ${net.name}
symbol: ${net.symbol}
dual: ${net.dual}
netlib.org/polyhedra`

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
        ani.eomot.proform.translate = [75, -145 - 15 * i]
        ani.eoload.textform.linenb = i
        anis['ani' + '_' + i] = ani
      }
      return anis
    }
    // .................. ambientLight anima
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
          intensity: 0.5,
          position: [400, 400, 400],
        },
      },

    }
    // .................. lightHemisphereAni anima
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
          skyColor: [[[111, 999]]],
          groundColor: [[[999, 111]]],
          intensity: 0.3,
          position: [0, 0, 0],
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
        lightHemisphereAni, // h.sol
      }
    )

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ793eDodecahedron = anitem
}))