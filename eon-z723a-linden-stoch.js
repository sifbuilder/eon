/* ******************************************
 *    @eonZ723aLindenStoch
 *
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonZ723aLindenStoch = global.eonZ723aLindenStoch || {}))
})(this, function (exports) {
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
      protonUniwen,
      renderSvg,
    ] = await Promise.all([
      __eo('xs').c('wen'),
      __eo('xs').e('mars'),
      __eo('xs').e('textform'),
      __eo('xs').m('geoj'),
      __eo('xs').m('lindenmayer'),
      __eo('xs').m('props'),
      __eo('xs').p('uniwen'),
      __eo('xs').r('svg'),
    ])

    try {
      renderSvg.scenecolor('black')
    } catch (e) {}
    let ctl
    try {
      ctl = ctlWen().control(renderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }
    // .................. animas
    let z = function () {
      // .................. pics

      let eotim = { td: 24200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 }
      let eocrom = { csx: 0, cf: 777, cs: 555, cw: 0.9, co: 0.05, cp: 0.7 }

      let lindenmayer1 = {
        linden: {
          axiom: 'F',
          loopq: 5,
          rules: {
            F: {
              probs: [33, 66, 100],
              vals: ['F[+F]F', 'F[-F]F', 'F[+F]F[-F]F'],
            },
          },
        },
        mayer: {
          side: 3.5,
          angunit: 25.7,
          angstart: 90,
          start: [0, -150, 0],
          cant: [[[0.1, 0.1]]],
          randomize: 1,
          randomfactor: 0.1,
        },
      }

      let geo = muonLindenmayer.multiFeature(lindenmayer1)
      geo.features = geo.features.sort(function (a, b) {
        return (
          2 * a.properties.level +
          a.properties.segment -
          (2 * b.properties.level + b.properties.segment)
        )
      })
      geo.features = geo.features.map((f, i) => {
        f.properties.eocrom = muonProps.clone(eocrom)
        let level = f.properties.level || 0
        let cs = f.properties.eocrom.cs
        let newcs = cs + 200 * level

        f.properties.eocrom.cs = newcs
        return f
      })

      let aniForm1 = {
        eohal: eohalMars,
        eotim: eotim,
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani1' },

        eofold: ani => {
          let fq = geo.features.length
          fq = Math.ceil(fq * ani.eoload.tim)

          let gj = {
            type: 'FeatureCollection',
            features: geo.features.slice(0, fq),
          }

          return geo
        },

        eomot: {
          proform: {
            projection: 'uniwen',
            scale: 1,
            translate: [0, 0, 0],
            prerotate: [[[ctl.rotation]]],
            rotate: [0, [[[0, 0 * 360]]], 0],
          },
        },
        eocrom: eocrom,
        eoload: {
          // lindenmayer: lindenmayer,
          tim: [[[0, 1]]],
        },
      }

      // .................. textAni

      let text = `see the trees`

      let textAni = {
        eohal: eohalTextform,
        eotim: eotim,
        eoric: { gid: 'text', cid: 'text', fid: 'text' },
        eofold: ani => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0] },
        }),
        eomot: {
          proform: { projection: 'uniwen', translate: [200, -190] },
        },
        eocrom: { csx: 0, cf: 888, cs: 111, cw: 0.5, co: 0.9, cp: 0.5 },
        eoload: {
          textform: {
            string: [
              [
                [
                  function (t) {
                    let txt = this.text
                    let linenb = this.linenb
                    let sttxt = txt.split('\n')
                    return sttxt[linenb]
                  },
                ],
              ],
            ],
            text: text,
            style: { 'font-size': 5 },
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
          ani.eomot.proform.translate = [160, -160 - 7 * i]
          ani.eoload.textform.linenb = i
          anis['ani' + '_' + i] = ani
        }
        return anis
      }
      // .................. scene
      let scene = Object.assign(
        {},
        getanis(text),
        {
          aniForm1, // h.mars
        }
      )

      return scene
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ723aLindenStoch = anitem
})
