/* ******************************************
   *    @eonZ722xD3Leaves
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ722xD3Leaves = global.eonZ722xD3Leaves || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlWen,
    eonEohalMars,
    eonEohalTextform,
    eonMuonGeoj,
    eonMuonLindenmayer,
    eonMuonProps,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-textform'),
    __eo('xs').b('eon-muon-geoj'),
    __eo('xs').b('eon-muon-lindenmayer'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}

  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let eotim = { td: 24200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 }

    let aniForm2 = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani2' },

      eofold: ani => {
        let geoData = eonMuonLindenmayer.multiLine(ani.eoload.lindenmayer)

        let coords = geoData.geometry.coordinates.map(ring => eonMuonProps.cant(ring, ani.eoload.lindenmayer.mayer.cant))

        geoData.geometry.coordinates = coords

        let ngj = eonMuonGeoj.segtime(geoData, ani.eotim) // geoData //

        return ngj
      },

      eomot: {
        proform: {
          projection: 'uniwen',
          scale: 1,
          translate: [ 0, 0, 0 ],
          prerotate: [[[ ctl.rotation ]]],
          rotate: [ 0, [[[0, 360]]], 0 ],
        },
      },
      eocrom: { 'csx': 0, 'cf': 777, 'cs': [[[555, 888, 555]]], 'cw': [[[0.9, 0.5, 0.9]]], 'co': 0.05, 'cp': 0.7 },
      eoload: {
        lindenmayer: {

        // http://algorithmicbotany.org/papers/abop/abop-ch1.pdf
        // The symbols ! and  are used to decrement the diameter of segments
        // and increment the current index to the color table, respectively

          linden: {
            axiom: 'A',
            loopq: 7,
            rules: {
              A: '[&FL!A]~~~~~’[&FL!A]~~~~~~~’[&FL!A]',
              F: 'S ~~~~~ F',
              S: 'F L',
              L: '[’’’^^{-f+f+f-|-f+f+f}]',

            },
          },
          mayer: {
            side: 9,
            angunit: 22.5,
            angstart: 90,
            start: [0, -150, 0],
            cant: [[[0.1, 0.1]]],
          },
        },

      },
    }

    // .................. textAni

    let text = `see the withered petals and the yellow leaves,
that's become the garden that ere was of thee
antonio machado`

    let textAni = {
      eohal: eonEohalTextform,
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
        let ani = eonMuonProps.clone(textAni)
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
        aniForm2, // h.mars
      }
    )

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ722xD3Leaves = anitem
}))