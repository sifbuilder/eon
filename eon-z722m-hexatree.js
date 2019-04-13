/* ******************************************
 *    @eonZ722mHexatree
 *
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonZ722mHexatree = global.eonZ722mHexatree || {}))
})(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
    // .................. eons
    let [
      ctlWen,
      eohalMars,
      muonGeoj,
      muonLindenmayer,
      protonUniwen,
      renderSvg,
    ] = await Promise.all([
      __eo('xs').c('wen'),
      __eo('xs').e('mars'),
      __eo('xs').m('geoj'),
      __eo('xs').m('lindenmayer'),
      __eo('xs').p('uniwen'),
      __eo('xs').r('svg'),
    ])
    try {
      renderSvg.scenecolor('black')
    } catch (e) {}
    // .................. animas
    let z = function () {
      // .................. pics
      let ctl
      try {
        ctl = ctlWen().control(renderSvg.svg())
      } catch (e) {
        ctl = () => [0, 0, 0]
      }

      let aniForm = {
        eotim: { td: 18200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 },
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani' },
        eohal: eohalMars,

        eofold: ani => {
          let lindenmayers = ani.eoload.lindenmayers
          let qLindenmayers = lindenmayers.length
          let pointer = 0 // Math.floor( (qLindenmayers -1) * ani.eotim.unElapsed)

          let gj = muonLindenmayer.multiLine(lindenmayers[pointer])
          return muonGeoj.timeSeg(gj, ani.eotim.unElapsed)
        },

        eocrom: {
          csx: 0,
          cf: [[[444, 666]]],
          cs: 900,
          cw: [[[0.9, 0.9]]],
          co: [[[0.1, 0.1]]],
          cp: [[[0.9, 0.9]]],
        },
        eomot: {
          proform: {
            projection: 'uniwen',
            scale: 1,
            translate: { x: 0, y: 0 },
            prerotate: [[[ctl.rotation]]],
            rotate: [0, 0, 0],
          },
        },
        eoload: {
          lindenmayers: [
            {
              // tree
              linden: {
                axiom: 'FX',
                loopq: 7,
                rules: {
                  X: '[+FX][-FX]',
                },
              },
              mayer: {
                side: 16,
                angunit: [[[120, 90, 90, 60, 60, 60, 60, 60, 30, 15, 15, 15]]],

                angstart: 90,
                start: [0, 0],
              },
            },
          ],
        },
      }

      // .................. animas
      let animas = [
        aniForm, // h.mars
      ]
      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ722mHexatree = anitem
})
