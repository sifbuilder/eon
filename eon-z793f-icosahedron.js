/* ******************************************
   *    @eonZ793fIcosahedron
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ793fIcosahedron = global.eonZ793fIcosahedron || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3,
    d3Geo,
    THREE,
    ctlWen,
    eohalMars,
    eohalSol,
    eohalTextform,
    muonGeom,
    muonNatform,
    muonNets,
    muonProps,
    muonGeovoro,
    renderPortview,
    renderWebgl,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').b('d3-geo'),
    __eo('xs').b('three'),
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').e('sol'),
    __eo('xs').e('textform'),
    __eo('xs').m('geom'),
    __eo('xs').m('natform'),
    __eo('xs').m('nets'),
    __eo('xs').m('props'),
    __eo('xs').m('geovoro'),
    __eo('xs').r('portview'),
    __eo('xs').r('webgl'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
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
icosahedron
:number
4
:symbol
{3,5}	@I sub 5 @
:dual
dodecahedron
:sfaces
20 20{3}
:svertices
12 12(@3 sup 5@)
:net
20 3
3 0 5 6
3 5 11 12
3 1 6 7
3 6 12 13
3 2 7 8
3 7 13 14
3 3 8 9
3 8 14 15
3 4 9 10
3 9 15 16
3 12 6 5
3 17 12 11
3 13 7 6
3 18 13 12
3 14 8 7
3 19 14 13
3 15 9 8
3 20 15 14
3 16 10 9
3 21 16 15
:solid
20 3
3 31 32 33
3 32 26 30
3 31 33 29
3 33 30 28
3 31 29 25
3 29 28 23
3 31 25 27
3 25 23 22
3 31 27 32
3 27 22 26
3 30 33 32
3 24 30 26
3 28 29 33
3 24 28 30
3 23 25 29
3 24 23 28
3 22 27 25
3 24 22 23
3 26 32 27
3 24 26 22
:hinges
19
0 1 10 1 2.4118649973628269
10 2 1 2 2.4118649973628269
1 1 11 1 2.4118649973628269
2 1 12 1 2.4118649973628269
12 2 3 2 2.4118649973628269
3 1 13 1 2.4118649973628269
10 0 3 0 2.4118649973628269
4 1 14 1 2.4118649973628269
14 2 5 2 2.4118649973628269
5 1 15 1 2.4118649973628269
12 0 5 0 2.4118649973628269
6 1 16 1 2.4118649973628269
16 2 7 2 2.4118649973628269
7 1 17 1 2.4118649973628269
14 0 7 0 2.4118649973628269
8 1 18 1 2.4118649973628269
18 2 9 2 2.4118649973628269
9 1 19 1 2.4118649973628269
16 0 9 0 2.4118649973628269
:dih
1
30 3 3 2.4118649973628269
:vertices
34 22
-.577350269189626[(-1/3)*sqrt(3)] 0[0] 0[0]
-.577350269189626[(-1/3)*sqrt(3)] 1[1] 0[0]
-.577350269189626[(-1/3)*sqrt(3)] 2[2] 0[0]
-.577350269189626[(-1/3)*sqrt(3)] 3[3] 0[0]
-.577350269189626[(-1/3)*sqrt(3)] 4[4] 0[0]
.288675134594813[(1/6)*sqrt(3)] -.5[-1/2] 0[0]
.288675134594813[(1/6)*sqrt(3)] .5[1/2] 0[0]
.288675134594813[(1/6)*sqrt(3)] 1.5[3/2] 0[0]
.288675134594813[(1/6)*sqrt(3)] 2.5[5/2] 0[0]
.288675134594813[(1/6)*sqrt(3)] 3.5[7/2] 0[0]
.288675134594813[(1/6)*sqrt(3)] 4.5[9/2] 0[0]
1.15470053837925[(2/3)*sqrt(3)] -1[-1] 0[0]
1.15470053837925[(2/3)*sqrt(3)] 0[0] 0[0]
1.15470053837925[(2/3)*sqrt(3)] 1[1] 0[0]
1.15470053837925[(2/3)*sqrt(3)] 2[2] 0[0]
1.15470053837925[(2/3)*sqrt(3)] 3[3] 0[0]
1.15470053837925[(2/3)*sqrt(3)] 4[4] 0[0]
2.02072594216369[(7/6)*sqrt(3)] -.5[-1/2] 0[0]
2.02072594216369[(7/6)*sqrt(3)] .5[1/2] 0[0]
2.02072594216369[(7/6)*sqrt(3)] 1.5[3/2] 0[0]
2.02072594216369[(7/6)*sqrt(3)] 2.5[5/2] 0[0]
2.02072594216369[(7/6)*sqrt(3)] 3.5[7/2] 0[0]
4.5347306707864466 .45086650750727166 -2.7105927916411461
4.8699598980430714 -.13351918098297879 -3.4495885509528638
4.9390373174018747 -.43917147561223518 -2.4999544188142807
5.0464776897031958 .85054314428490783 -3.4711015520403509
5.1582473020808707 .35598734283537632 -1.9345612493631154
5.2246491039270289 1.1530748137194615 -2.5347631857738492
5.7006595858044515 -.58956856368085759 -3.1302815054715127
5.7670613876506104 .20751890720322767 -3.7304834418822456
5.8788310000282858 -.28703689424630494 -2.1939431392050111
5.9862713723296064 1.0026777256508387 -3.1650902724310798
6.0553487916884101 .69702543102158254 -2.2154561402924972
6.3905780189450343 .1126397425313317 -2.9544518996042161
:EOF`

    // .................. facesAni anima
    let facesAni = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {gid: 'facesAni', cid: 'facesAni', fid: 'facesAni'},

      eofold: anitem => {
        let tim = anitem.eoload.tim
        let colors = anitem.eoload.colors

        let parts = muonNets.parse({text: def})

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
            shading: 1,
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
          translate: [ 0, 0, 0 ],
          rotate: [ 0, 0, [[[0, 12]]] ],
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
      eohal: eohalSol,

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
    let net = muonNets.parse({text: def})

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
      eohal: eohalTextform,
      eotim: eotim,
      eoric: {gid: 'txtg', cid: 'txtcT', fid: 'txtfT'},

      eofold: ani => {
        let natipros = { eoform: ani.eoload.eoform, ghv: 1, gsa: 1, gco: 0 }
        return muonNatform.natMultiLineString(natipros)
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
        let ani = muonProps.clone(textAni)
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
  exports.eonZ793fIcosahedron = anitem
}))