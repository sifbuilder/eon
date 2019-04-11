/* ******************************************
   *    @eonZ723dPeano
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ723dPeano = global.eonZ723dPeano || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    ctlWen,
    eohalMars,
    eohalTextform,
    muonGeoj,
    muonLindenmayer,
    muonProps,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').e('textform'),
    __eo('xs').m('geoj'),
    __eo('xs').m('lindenmayer'),
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

    let eotim = { td: 9200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 }
    let eocrom = { 'csx': 0, 'cf': 111, 'cs': 333, 'cw': 1.4, 'co': 0.3, 'cp': 0.7 }

    // .................. aniForm1
    let aniForm1 = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani1' },

      eofold: ani => {
        let geo = muonLindenmayer.multiFeature(ani.eoload.lindenmayer)

        geo.features = geo.features.sort(function (a, b) {
          return (2 * a.properties.level + a.properties.segment) -
            (2 * b.properties.level + b.properties.segment)
        })
        geo.features = geo.features.map((f, i) => {
          f.properties.eocrom = muonProps.clone(eocrom)
          let contextlevel = f.properties.contextlevel || 0

          let colorlevel = f.properties.colorlevel || 0
          let diameterlevel = (f.properties.diameterlevel || 0)

          let cs = f.properties.eocrom.cs
          let cf = f.properties.eocrom.cf
          let cw = f.properties.eocrom.cw
          let newcs = cs + 600 * contextlevel
          let newcf = cf + 600 * colorlevel
          let newcw = Math.max(1, cw - diameterlevel)

          f.properties.eocrom.cs = newcs
          f.properties.eocrom.cf = newcf
          f.properties.eocrom.cw = newcw
          return f
        })

        let fq = geo.features.length
        // fq = Math.ceil(fq * ani.eoload.tim)

        let gj = {
          type: 'FeatureCollection',
          features: geo.features.slice(0, fq),
        }

        return gj
      },

      eomot: {
        proform: {
          projection: 'uniwen',
          scale: 1,
          translate: [ 0, 100, 0 ],
          prerotate: [[[ ctl.rotation ]]],
          rotate: [ 0, -6, 0 ],
        },
      },
      eocrom: eocrom,
      eoload: {
        tim: [[[0, 0.5, 1]]],
        lindenmayer: {

          linden: {
            axiom: 'A',
            loopq: 4,
            rules: {
              A: '[[&FL!A]~~~~~~~’',
              F: 'S ~~~~~ F',
              S: 'F ~~~~~ L',
              L: '[’’’^^{-f+f+f-|-f+f+f}]',

            },
          },
          mayer: {
            side: 36,
            angunit: 22.5,
            angstart: 90,
            start: [0, -150, 0],
            cant: [[[0.1, 0.1]]],
          },
        },

      },
    }

    // .................. aniForm2
    let lindenmayer = {

      linden: {
        axiom: 'AFA+F+AFA',
        loopq: 2,
        rules: {
          A: '-BF+AFA+FB-',
          B: '+AF-BFB-FA+',
        },
      },
      mayer: {
        side: [[[12, 5.7]]],
        angunit: [[[-90, 0]]],
        angstart: 0,
        start: [0, 0, 0],
        cant: [[[0.1, 0.1]]],
      },
    }

    let eomot = {
      proform: {
        projection: 'uniwen',
        scale: 1,
        translate: [ -190, -100, 0 ],
        prerotate: [[[ ctl.rotation ]]],
        rotate: [ 0, 0, 0 ],
      },
    }

    let aniForm2 = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani2' },

      eofold: ani => {
        let geo = muonLindenmayer.multiFeature(ani.eoload.lindenmayer)

        geo.features = geo.features.sort(function (a, b) {
          return (2 * a.properties.level + a.properties.segment) -
            (2 * b.properties.level + b.properties.segment)
        })
        geo.features = geo.features.map((f, i) => {
          return f
        })

        let fq = geo.features.length
        fq = Math.ceil(fq * ani.eoload.tim)

        let gj = {
          type: 'FeatureCollection',
          features: geo.features.slice(0, fq),
        }

        return gj
      },

      eomot: eomot,
      eocrom: { 'csx': 0, 'cf': 111, 'cs': 333, 'cw': [[[19, 0.4]]], 'co': 0.03, 'cp': 0.99 },
      eoload: {
        tim: [[[0, 0.5, 1]]],
        lindenmayer: lindenmayer,

      },
    }
    // .................. textAni

    let text = `dream plants with algorithmic patterns`

    // .................. aniFormText
    let eomotAniText = {
      proform: {
        projection: 'uniwen',
        scale: 1,
        translate: {'x': -20, 'y': 150 },
        prerotate: [[[ ctl.rotation ]]],
        rotate: [ 0, 0, 0 ],
      },
    }

    let aniFormText = {

      eotim: eotim,
      eoric: { gid: 'ani', cid: 'ani2', fid: 'ani2' },
      eohal: eohalTextform,

      eofold: ani => {
        let geoData = muonLindenmayer.lineString(ani.eoload.lindenmayer)

        return geoData
      },

      eocrom: { 'csx': 7, 'cf': [[[999, 999]]], 'cs': 999, 'cw': [[[0.3, 0.3]]], 'co': 0.9, 'cp': [[[0.001, 0.5]]]},

      eomot: eomot,
      eoload: {

        textform: {
          string: [[[function (t) {
            return this.text
          }]]],
          text: text,
          style: {
            rotate: [[[ 0, 0 ]]],
            'font-size': [[[12, 16]]],
            'font-family': 'Verdana', // BankFuturistic, Arial
            'kerning': 4, // 1
            'lengthAdjust': 'spacing', // spacingAndGlyphs
            'letter-spacing': [[[12, 12, 1]]],
            'text-anchor': 'start', // start, middle, end
            'textLength': 0,
            'word-spacing': [[[2, 2]]],
          },
        },

        lindenmayer: lindenmayer,

      },
    }

    // .................. scene
    let scene = [
      aniForm1,
      aniFormText,
      aniForm2,
    ]

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ723dPeano = anitem
}))