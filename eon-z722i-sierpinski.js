/* ******************************************
   *    @eonZ722iSierpinski
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ722iSierpinski = global.eonZ722iSierpinski || {})))
  }(this, function (exports) {
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

    let aniForm = {

      eotim: { td: 24200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 },
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani' },
      eohal: eohalMars,

      eofold: ani => {
        let gj = muonLindenmayer.multiLine(ani.eoload.lindenmayer)
        return muonGeoj.timeSeg(gj, ani.eotim.unElapsed) // return gj
      },

      eocrom: { 'csx': 0, 'cf': [[[444, 666]]], 'cs': 666, 'cw': [[[0.9, 0.9]]], 'co': [[[0.1, 0.2]]], 'cp': [[[0.9, 0.9]]]},
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: 1,
          translate: {'x': 0, 'y': 0 },
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
            side: 24,
            angunit: 36,
            angstart: 0,
            start: [0, 0],
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
  exports.eonZ722iSierpinski = anitem
}))