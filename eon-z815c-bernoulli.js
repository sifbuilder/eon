/* ******************************************
   *    @eonZ815cBernoulli
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ815cBernoulli = global.eonZ815cBernoulli || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlWen,
    eonEohalMars,
    eonEohalTextform,
    eonMuonNatform,
    eonMuonProps,
    eonMuonSnap,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-textform'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-muon-snap'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  // .................. pics
  let ctl
  try {
    ctl = eonCtlWen().control(eonRenderSvg.svg())
  } catch (e) {
    ctl = () => [0, 0, 0]
  }

  let text = `Bessel functions are the solutions y(x)
of Bessel's differential equation
   x² d²y/dx² + dy/dy + (x² - α²) y = 0
This equation describes behaviours of
electromagnetic waves,
pressure of rotational flows,
heat conduction in cylindrical objects or
vibration of thin circular acoustic membrane.
These functions appear as solutions to the radial
Schrödinger equation for a free particle
and when solving for patterns of
acoustical radiation,
friction in circular pipelines
and signal processing.
First defined by Daniel Bernoulli,
they were generalized by Friedrich Bessel
ref. wikipedia`

  // .................. animas
  let z = function () {
    let radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
      sinh = Math.sinh, cosh = Math.cosh, tanh = Math.tanh

    // let fact = n => (n === 0) ? 1 : n * fact( n - 1 )
    // https://stackoverflow.com/questions/3959211/what-is-the-fastest-factorial-function-in-javascript
    function fact (op) {
      // Lanczos Approximation of the Gamma Function
      // As described in Numerical Recipes in C (2nd ed. Cambridge University Press, 1992)
      let z = op + 1
      let p = [1.000000000190015, 76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 1.208650973866179E-3, -5.395239384953E-6]

      let d, d1, d2, d3, d4

      d1 = Math.sqrt(2 * Math.PI) / z
      d2 = p[0]

      for (let i = 1; i <= 6; ++i) { d2 += p[i] / (z + i) }

      try {
        d3 = Math.pow((z + 5.5), (z + 0.5))
        d4 = Math.exp(-(z + 5.5))
      } catch (e) {
        if (1 && 1) console.log('e', e)
      }

      d = d1 * d2 * d3 * d4

      return d
    }

    // ............................. pics

    let summands = 23
    let level = [[[0.3, 6, 0.1]]]
    let range = 17

    let eotim = {'td': 9600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

    let conformAni = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [0, 360],
        c: [ 1, range, 1, 1], // . , range, ., .
        'fn0': (e, c, d) => {
          let x = d.c[1] * e[0] / (2 * Math.PI) // range * [2 * Math.PI] / (2 * Math.PI)
          return x
        },
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [0, 360],
        c: [ level, range, summands, 1], // order, range, summs, .
        'fn0': (e, c, d) => {
          let summs = d.c[2]
          let w = Array.from(new Array(summs), (d, i) => 1)
          let v = d.c[0]

          let x = d.c[1] * e[0] / (2 * Math.PI) // e[0]: [0, 2 * Math.PI] * 14

          let res = 0
          let y = w.reduce((p, q, k) => {
            let f, f1, f2, f3, f4
            try {
              f1 = Math.pow(-1, k)
              f2 = Math.pow(x / 2, v + 2 * k)
              f3 = 1 / fact(k)
              f4 = 1 / fact(v + k)
            } catch (e) {
              if (1 && 1) console.log('e', e)
            }

            f = f1 * f2 * f3 * f4

            p = p + f
            return p
          }, 0)

          return y
        },

      },
      'z': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[24, 24]]], 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ 1, 1, [[[5, 5]]], [[[5, 5]]] ],
        fn0: (e, c, d) => sin(e[3]),
      },

      'w': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'dom3': [ -180, 180 ],
        fn0: (e, c, d) => cos(e[2]),
      },
    }

    let eocromRed = { 'csx': 1, 'cf': 333, 'co': 0.069, 'cs': 333, 'cw': 1.3, 'cp': 0.99 }

    // ............................. natAniRed
    let natAniRed = {
      eohal: eonEohalMars,
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'qred'},
      eofold: ani => {
        let natipros = {
          eoform: ani.eoform,
          ghv: 1, // horizontal geodesics
          gsa: 0, // asymetric distribution of geodesics around the origin
          gco: 0, // open line
        }

        let res = eonMuonNatform.natMultiLineString(natipros) // Feature.LineString

        return res
      },
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 10, 90 ],
          translate: [ 0, 0 ],
          rotate: [0, 0],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: eocromRed,
      eoform: conformAni,
      eoload: {},
    }
    // .................. textA
    let proformTA = {
      projection: 'uniwen',
      scale: 1,
      prerotate: [[[ ctl.rotation ]]],
      translate: [ -100, -140, 0 ],
      rotate: [0, 0, 0],
      lens: [0, 1, Infinity ],
    }

    let conformAB = {
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
    }

    let eocromTA = { 'csx': 0, 'cf': 999, 'co': 0.19, 'cs': 999, 'cw': 0.39, 'cp': 0.99 }

    let textA = {
      eohal: eonEohalTextform,
      eotim: eotim,
      eoric: {gid: 'txtg', cid: 'txtTA', fid: 'txtfA'},

      eofold: ani => {
        let natipros = { eoform: ani.eoload.eoform, ghv: 1, gsa: 1, gco: 0 }
        return eonMuonNatform.natMultiLineString(natipros)
      },
      eomot: {
        proform: proformTA,
      },
      eocrom: eocromTA,

      eoload: {
        eoform: conformAB,
        textform: {
          string: [[[function (t) {
            let order = eonMuonSnap.snap([[[0.1, 6, 0.1]]], t).toFixed(2)
            let range = 17 // **
            let summands = 23 // **

            return `First kind Bessel functions: summands: ${summands}, order: ${order} `
          }]]],
          style: {
            rotate: [[[ 0, 0 ]]],
            'font-size': [[[9, 9]]],
            'font-family': 'Verdana', // BankFuturistic, Arial
            'kerning': 4,
            'lengthAdjust': 'spacing', // spacingAndGlyphs
            'letter-spacing': 1,
            'text-anchor': 'start', // start, middle, end
            'textLength': 0,
            'word-spacing': 1,
          },
        },
      },
    }

    // .................. textAni
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
          prerotate: [[[ ctl.rotation ]]],
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
            let ttxt = txt // textsegment( txt, t)
            let sttxt = ttxt.split('\n')

            return sttxt[linenb]
          }]]],
          text: text,
          style: {
            rotate: [[[ 0, 0 ]]],

            'font-size': 9,
            'font-family': 'Verdana', // BankFuturistic, Arial
            'kerning': 4,
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
      let anis = []
      let ani = eonMuonProps.clone(textAni)
      let a = txt.split('\n')
      let x0 = -275
      let xd = 0
      let y0 = 150
      let yd = -18
      let fontSize = [[[11, 11]]]
      let linesep = 3
      for (let i = 0; i < a.length; i++) {
        let anii = eonMuonProps.clone(textAni)
        anii.eoric.fid = textAni.eoric.fid + '_' + i
        anii.eoric.cid = textAni.eoric.cid + '_' + i
        let ty = [[[y0 - (fontSize[0][0][0] + linesep) * i,
          y0 - (fontSize[0][0][1] + linesep) * i]]]
        anii.eomot.proform.translate = [x0 + xd * i,
          ty ]
        anii.eoload.textform.style['font-size'] = fontSize
        anii.eoload.textform.linenb = i
        anis.push(anii)
      }
      return anis
    }
    // ............................. scene
    let scene = [
      ...getanis(text),
      natAniRed,
      textA,
    ]

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ815cBernoulli = anitem
}))