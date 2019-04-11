/* ******************************************
   *    @eonZ722qLindentext
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ722qLindentext = global.eonZ722qLindentext || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    ctlWen,
    eohalMars,
    eohalTextform,
    muonLindenmayer,
    muonNatform,
    muonProps,
    protonUniwen,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').e('textform'),
    __eo('xs').m('lindenmayer'),
    __eo('xs').m('natform'),
    __eo('xs').m('props'),
    __eo('xs').p('uniwen'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
  let sin = Math.sin

  let conformT = {
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

  let text = `The Peano curve is the first 
example of a space-filling curve. 
Giuseppe Peano, motivate by an earlier
result of Georg Cantor that the unit 
interval and the unit square have the 
same cardinality, discovered it in 1890 
while demonstrating that a
continuous curve cannot always be 
enclosed in an arbitrarily small region,
thus postulating what later came to be 
known as a fractal.
Peano was born in Piamonte, Italy. He 
axiomatized natural numbers and was 
philosophically interested in 
how to formulate rigurous definitions.
He became so frustrated with publishing 
delays -due to his demand that formulae 
be printed on one line- that he 
purchased a printing press. ref. wikipedia`

  let ctl
  try {
    ctl = ctlWen().control(renderSvg.svg())
  } catch (e) {
    ctl = () => [0, 0, 0]
  }

  let eomotAniText = {
    proform: {
      projection: 'uniwen',
      scale: 1,
      translate: {'x': -20, 'y': 150 },
      prerotate: [[[ ctl.rotation ]]],
      rotate: [ 0, 0, 0 ],
    },
  }

  let lindenmayer = { //
    linden: {
      axiom: 'L',
      loopq: 3,
      feet: 1,
      rules: {
        L: 'LFRFL-F-RFLFR+F+LFRFL',
        R: 'RFLFR+F+LFRFL-F-RFLFR',
      },
    },
    mayer: {
      angstart: 0,
      side: 12,
      angunit: -90,
      start: [0, 0],
    },
  }
  let proformT = {
    projection: 'uniwen',
    scale: [ 0.2, 0.2 ],
    prerotate: [[[ ctl.rotation ]]],
    translate: [ 0, 0, 0 ], // iter
    rotate: [0, 0, 0],
    lens: [0, 1, Infinity ],
  }
  let eocromT = { 'csx': 7, 'cf': 999, 'co': 0.9, 'cs': 999, 'cw': 0.1, 'cp': 0.99}

  // .................. animas
  let z = function () {
    // .................. pics

    let eotim = { td: 19200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 }

    // .................. aniForm1
    let aniForm1 = {

      eotim: eotim,
      eoric: { gid: 'ani', cid: 'ani1', fid: 'ani1' },
      eohal: eohalMars,

      eofold: ani => {
        let geoData = muonLindenmayer.multiFeature(ani.eoload.lindenmayer)

        return geoData
      },

      eocrom: { 'csx': 0, 'cf': [[[444, 666]]], 'cs': 666, 'cw': [[[0.9, 0.9]]], 'co': [[[0.1, 0.1]]], 'cp': [[[0.9, 0.9]]]},

      eomot: eomotAniText,
      eoload: {

        lindenmayer: lindenmayer,

      },
    }

    // .................. aniFormText
    let aniFormText = {

      eotim: eotim,
      eoric: { gid: 'ani', cid: 'ani2', fid: 'ani2' },
      eohal: eohalTextform,

      eofold: ani => {
        let geoData = muonLindenmayer.lineString(ani.eoload.lindenmayer)

        return geoData
      },

      eocrom: { 'csx': 7, 'cf': [[[999, 999]]], 'cs': 999, 'cw': [[[0.3, 0.3]]], 'co': [[[0.001, 0.5]]], 'cp': [[[0.001, 0.5]]]},

      eomot: eomotAniText,
      eoload: {

        textform: {
          string: [[[function (t) {
            return this.text
          }]]],
          text: text,
          style: {
            rotate: [[[ 0, 0 ]]],
            'font-size': [[[48, 8]]],
            'font-family': 'Verdana', // BankFuturistic, Arial
            'kerning': 4, // 1
            'lengthAdjust': 'spacing', // spacingAndGlyphs
            'letter-spacing': 2,
            'text-anchor': 'start', // start, middle, end
            'textLength': 0,
            'word-spacing': 3,
          },
        },

        lindenmayer: lindenmayer,

      },
    }

    // .................. textAni
    let textAni = {
      eohal: eohalTextform,
      eotim: eotim,
      eoric: {gid: 'txtg', cid: 'txtcT', fid: 'txtfT'},

      eofold: ani => {
        let natipros = { eoform: ani.eoload.eoform, ghv: 1, gsa: 1, gco: 0 }
        return muonNatform.natMultiLineString(natipros)
      },
      eomot: {
        proform: proformT,
      },
      eocrom: eocromT,

      eoload: {
        eoform: conformT,
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

            // eocromT
            // 'fill': "rgb(255, 215, 0)",
            // 'fill-opacity': 1,
            // 'stroke': "rgb(255, 215, 0)",
            // 'stroke-width': 0.1,
            // 'stroke-opacity': undefined,

            'font-size': [[[12, 12]]],
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
      let anis = []
      let a = txt.split('\n')
      let x0 = -295
      let xd = 0
      let y0 = 150
      let yd = -18
      for (let i = 0; i < a.length; i++) {
        let ani = muonProps.clone(textAni)
        ani.eoric.fid = textAni.eoric.fid + '_' + i
        ani.eoric.cid = textAni.eoric.cid + '_' + i
        ani.eomot.proform.translate = [x0 + xd * i, y0 + yd * i]
        ani.eoload.textform.linenb = i
        anis.push(ani)
      }
      return anis
    }

    // .................. animas
    let scene = [
      ...getanis(text),
      aniFormText, // h.textform
      aniForm1, // h.mars
    ]

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ722qLindentext = anitem
}))