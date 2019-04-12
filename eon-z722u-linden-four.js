/* ******************************************
   *    @eonZ722uLindenFour
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ722uLindenFour = global.eonZ722uLindenFour || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    d3,
    ctlWen,
    eohalMars,
    muonCastel,
    muonGeoj,
    muonLindenmayer,
    muonProps,
    protonUniwen,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').m('castel'),
    __eo('xs').m('geoj'),
    __eo('xs').m('lindenmayer'),
    __eo('xs').m('props'),
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

    let eotim = { td: 12200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 }

    let aniForm2 = {

      eotim: eotim,
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani2' },
      eohal: eohalMars,

      eofold: ani => {
        let geo = muonLindenmayer.multiLine(ani.eoload.lindenmayer)

        geo.geometry.coordinates = geo.geometry.coordinates.map(ring => muonProps.cant(ring, ani.eoload.lindenmayer.mayer.cant))

        let geoData = muonGeoj.segtime(geo, ani.eotim)

        return geoData
      },

      eocrom: { 'csx': 0, 'cf': [[[444, 777, 777]]], 'cs': 666, 'cw': [[[0.9, 0.9]]], 'co': [[[0.01, 0.09, 0.07]]], 'cp': [[[0.9, 0.9]]]},
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
        lindenmayer: {
          linden: {
            axiom: 'F-F-F-F',
            loopq: [[[0, 4]]],
            rules: {
              F: 'F+F-F-FF+F+F-F',
            },
          },
          mayer: {
            side: [[[36, 4.5]]],
            angunit: 90,
            angstart: 0,
            start: [0, 0],
            cant: [[[0, 0]]],
          },
        },

      },
    }

    // .................. animas
    let animas = [
      aniForm2, // h.mars
    ]
    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ722uLindenFour = anitem
}))