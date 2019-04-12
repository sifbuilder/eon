/* ******************************************
   *    @eonZ722wLindenD3
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ722wLindenD3 = global.eonZ722wLindenD3 || {})))
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

    let eotim = { td: 18200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 }

    let aniForm2 = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani2' },

      eofold: ani => {
        let geo = muonLindenmayer.multiLine(ani.eoload.lindenmayer)

        geo.geometry.coordinates = geo.geometry.coordinates.map(ring => muonProps.cant(ring, ani.eoload.lindenmayer.mayer.cant))

        let geoData = muonGeoj.segtime(geo, ani.eotim)

        return geoData
      },

      eomot: {
        proform: {
          projection: 'uniwen',
          scale: 1,
          translate: [ 0, 0, 0 ],
          prerotate: [[[ ctl.rotation ]]],
          rotate: [ [[[0, -35, -180]]], [[[0, -110, -180]]], [[[0, 135, 180]]] ],
        },
      },
      eocrom: { 'csx': 0, 'cf': 777, 'cs': 666, 'cw': 1.9, 'co': 0.05, 'cp': 0.9 },
      eoload: {
        lindenmayer: {

          linden: {
            axiom: 'A',
            loopq: 2,
            rules: {
              A: 'B-F+CFC+F-D&F^D-F+&&CFC+F+B~~',
              B: 'A&F^CFB^F^D^^-F-D^|F^B|FC^F^A~~',
              C: '|D^|F^B-F+C^F^A&&FA&F^C+F+B^F^D~~',
              D: '|CFB-F+B|FA&F^A&&FB-F+B|FC~~',
            },
          },
          mayer: {
            side: 24,
            angunit: 90,
            angstart: 0,
            start: [0, -100, 0],
            cant: [[[0.1, 0.1]]],
          },
        },

      },
    }

    // .................. textAni
    let textAni = {
      eohal: eohalTextform,
      eotim: eotim,
      eoric: {'gid': 'text', 'cid': 'text', 'fid': 'text'},
      eofold: ani => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0] },
      }),
      eocrom: { 'csx': 0, 'cf': 888, 'cs': 111, 'cw': 0.5, 'co': 0.9, 'cp': 0.5},
      eomot: {
        proform: { projection: 'uniwen', translate: [ 200, -190 ] },
      },
      eoload: {
        textform: {
          string: 'antonio machado "spoke in verse and lived in poetry"',
          style: { 'font-size': 3 },
        },
      },
    }
    // .................. animas
    let scene = {
      aniForm2,
      textAni,
    }
    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ722wLindenD3 = anitem
}))