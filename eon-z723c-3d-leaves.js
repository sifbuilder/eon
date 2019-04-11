/* ******************************************
   *    @eonZ723c3dLeaves
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ723c3dLeaves = global.eonZ723c3dLeaves || {})))
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

    let eotim = { td: 36200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 }
    let eocrom = { 'csx': 0, 'cf': 111, 'cs': 333, 'cw': 1.4, 'co': 0.3, 'cp': 0.7 }

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
          scale: 1,
          translate: [ 0, 0, 0 ],
          prerotate: [[[ ctl.rotation ]]],
          rotate: [ [[[0, -9, -18]]], [[[0, -32, -64]]], 0 ],
        },
      },
      eocrom: eocrom,
      eoload: {
        tim: [[[0, 0.5, 1]]],
        lindenmayer: {

        // http://algorithmicbotany.org/papers/abop/abop-ch1.pdf
        // The symbols ! and  are used to decrement the diameter of segments
        // and increment the current index to the color table, respectively

          linden: {
            axiom: 'A',
            loopq: 4,
            rules: {
              A: '[&FL!A]~~~~~’[&FL!A]~~~~~~~’[&FL!A]',
              F: 'S ~~~~~ F',
              S: 'F L',
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

    // .................. textAni

    let text = `three-dimensional bush-like structure
The Algorithmic Beauty of Plants
Przemyslaw Prusinkiewicz
Aristid Lindenmayer
https://en.wikipedia.org/wiki/The_Algorithmic_Beauty_of_Plants`

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
      let anis = {}
      let a = txt.split('\n')
      for (let i = 0; i < a.length; i++) {
        let ani = muonProps.clone(textAni)
        ani.eoric.fid = textAni.eoric.fid + '_' + i
        ani.eoric.cid = textAni.eoric.cid + '_' + i
        ani.eomot.proform.translate = [120, -160 - 7 * i]
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
        aniForm2, // h.mars
      }
    )

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ723c3dLeaves = anitem
}))