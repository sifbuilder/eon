/* ******************************************
   *    @eonZ722jPenrose
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ722jPenrose = global.eonZ722jPenrose || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlWen,
    eonEohalMars,
    eonMuonGeoj,
    eonMuonLindenmayer,
    eonProtonUniwen,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-geoj'),
    __eo('xs').b('eon-muon-lindenmayer'),
    __eo('xs').b('eon-proton-uniwen'),
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

    let aniForm = {

      eotim: { td: 4200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 },
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani' },
      eohal: eonEohalMars,

      eofold: ani => {
        let gj = eonMuonLindenmayer.multiLine(ani.eoload.lindenmayer)

        gj = eonMuonGeoj.timeSeg(gj, ani.eotim.unElapsed)
        return gj
      },

      eocrom: { 'csx': 0, 'cf': 666, 'cs': 666, 'cw': 0.9, 'co': 0.01, 'cp': 0.9 },
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: 1,
          translate: [ 0, 0, 0 ],
          prerotate: [[[ ctl.rotation ]]],
          rotate: [ 0, 0, 0 ],
        },
      },
      eoload: {

        lindenmayer: { // Penrose3
          linden: {
            axiom: '[N]++[N]++[N]++[N]++[N]',
            loopq: 4,
            rules: {
              M: 'OF++PF----NF[-OF----MF]++',
              N: '+OF--PF[---MF--NF]+',
              O: '-MF++NF[+++OF++PF]-',
              P: '--OF++++MF[+PF++++NF]--NF',
              F: '',
            },
          },
          mayer: {
            // side: 24,
            side: 10,
            angunit: 36,
            // angunit: 90,
            angstart: 0,
            start: [0, 0, 0],
          },
        },

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
  exports.eonZ722jPenrose = anitem
}))