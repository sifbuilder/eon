/* ******************************************
   *    @eonZ723gD3Leaves
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ723gD3Leaves = global.eonZ723gD3Leaves || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    ctlWen,
    eohalMars,
    eohalSol,
    eohalTextform,
    muonGeoj,
    muonLindenmayer,
    muonProps,
    renderPortview,
    renderSvg,
    // renderWebgl,
  ] = await Promise.all([
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').e('sol'),
    __eo('xs').e('textform'),
    __eo('xs').m('geoj'),
    __eo('xs').m('lindenmayer'),
    __eo('xs').m('props'),
    __eo('xs').r('portview'),
    __eo('xs').r('svg'),
    // __eo('xs').r('webgl'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
  let ctl
  try {
    ctl = ctlWen().control(renderSvg.svg())
  } catch (e) {
    ctl = () => [0, 0, 0]
  }

  // .................. animas
  let z = function () {
    // .................. pics

    let eotim = { td: 36200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 }
    let eocrom = { 'csx': 0, 'cf': 111, 'cs': 333, 'cw': 1.4, 'co': 0.9, 'cp': 0.7 }

    let lindenmayer = {

      linden: {
        axiom: 'A',
        // axiom: 'F',
        loopq: 6,
        rules: {
          // F: 'F[-F]F[+F][F]',
          A: '[&F[-F]F[+F][F]!A]~~~~~’[&F[-F]F[+F][F]!A]~~~~~~~’[&F[-F]F[+F][F]!A]',
        //   A: { 
        //     probs: [33,66,100],
        //     vals: [
        //     '[&F[-F]F[+F][F]!A]~~~~~’[&F[-F]F[+F][F]!A]~~~~~~~’[&F[-F]F[+F]',
        //     '[&F[-F]F[+F]~~~~~’[&F[-F]F[+F][F]!A]~~~~~~~’[&F[-F]F[+F][F]!A]',
        //     '[&F[-F]F[+F][F]!A]~~~~~’[&F[-F]F[+F]~~~~~~~’[&F[-F]F[+F][F]!A]'
        //     ]
        //   },

          F: 'S ~~~~~ F',
          S: 'F L',
          L: '[’’’^^{-f+f+f-|-f+f+f}]',
          // F: { probs: [33,66,100],
          // vals: ['F[+F]F', 'F[-F]F', 'F[+F]F[-F]F']
          // },
        },
      },
      mayer: {
        side: 16,
        angunit: 22.5,
        angstart: 90,
        start: [0, -150, 0],
        cant: 0.1,
      },
    }
    let geo = muonLindenmayer.multiFeature(lindenmayer)

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

    // .................. aniForm
    let aniForm = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani2' },

      eofold: ani => {
        let fq = geo.features.length
        fq = Math.ceil(fq * ani.eoload.tim)

        let gj = {
          type: 'FeatureCollection',
          features: geo.features.slice(0, fq),
        }

        return gj
      },

      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [[[1, 0.5]]],
          translate: [ 0, -0, 0 ],
          prerotate: [[[ ctl.rotation ]]],
          rotate: [ 90, [[[0, 1 * 360]]], 0  ],
        },
      },
      eocrom: eocrom,
      eoload: {
        tim: [[[0, 0.5, 1]]],
        lindenmayer: lindenmayer,

      },
    }

    // .................. textAni
    let text = `plants dreams`

    let textAni = {
      eohal: eohalTextform,
      eotim: eotim,
      eoric: {gid: 'text', cid: 'text', fid: 'text'},
      eofold: ani => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0] },
      }),
      eomot: {
        proform: { projection: 'uniwen', translate: [ 200, -190 ] },
      },
      eocrom: { 'csx': 0, 'cf': 888, 'cs': 111, 'cw': 0.5, 'co': 0.9, 'cp': 0.5},
      eoload: {
        textform: {
          string: [[[function (t) {
            let txt = this.text
            let linenb = this.linenb
            let sttxt = txt.split('\n')
            return sttxt[linenb]
          }]]],
          text: text,
          style: { 'font-size': 5 },
        },
      },
    }

    let getanis = function (txt = '') {
      return txt.split('\n').map((l, i) => {
        let ani = muonProps.clone(textAni)
        ani.eoric.fid = textAni.eoric.fid + '_' + i
        ani.eoric.cid = textAni.eoric.cid + '_' + i
        ani.eomot.proform.translate = [120, -160 - 7 * i]
        ani.eoload.textform.linenb = i
        return ani
      })
    }

    // .................. cameraOrthoAni anima
    let cameraOrthoHelper = {

      eotim: eotim,
      eoric: {gid: 'camera', cid: 'camera', fid: 'cameraOrthoAni'},
      eohal: eohalSol,

      eofold: anitem => {
        let eoload = anitem.eoload
        let json = { // Feature
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: {
            sort: 'camera',
            type: 'OrthographicCamera',
            name: 'Orthographic',
            left: -renderPortview.width() / 2,
            right: renderPortview.width() / 2,
            top: renderPortview.height() / 2,
            bottom: -renderPortview.height() / 2,
            near: 0.001,
            far: 200,

            position: [0, 0, 220],
            rotation: [0, 0, 0],
            distance2nodesFactor: 300,
            lookAt: [0, 0, 0],
          },
        }

        return json
      },

    }
    // .................. scene
    let scene = [
      ...getanis(text),
      aniForm,
      cameraOrthoHelper,
    ]

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ723gD3Leaves = anitem
}))