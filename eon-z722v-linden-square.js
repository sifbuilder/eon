/* ******************************************
   *    @eonZ722vLindenSquare
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ722vLindenSquare = global.eonZ722vLindenSquare || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      d3,
      eonCtlWen,
      eonEohalMars,
      eonMuonCastel,
      eonMuonGeoj,
      eonMuonLindenmayer,
      eonMuonProps,
      eonProtonUniwen,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('d3'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-muon-castel'),
      __eo('xs').b('eon-muon-geoj'),
      __eo('xs').b('eon-muon-lindenmayer'),
      __eo('xs').b('eon-muon-props'),
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

      let eotim = { td: 18200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 }

      let aniForm2 = {

        eotim: eotim,
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani2' },
        eohal: eonEohalMars,

        eofold: ani => {
          let geo = eonMuonLindenmayer.multiLine(ani.eoload.lindenmayer)

          geo.geometry.coordinates = geo.geometry.coordinates.map(ring => eonMuonProps.cant(ring, ani.eoload.lindenmayer.mayer.cant))

          let geoData = eonMuonGeoj.segtime(geo, ani.eotim)

          return geoData
        },

        eocrom: { 'csx': 0, 'cf': [[[444, 777, 777]]], 'cs': 666, 'cw': [[[0.9, 0.9]]], 'co': [[[0.01, 0.9, 0.7]]], 'cp': [[[0.9, 0.9]]]},
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
              loopq: 4,
              rules: {
                F: 'F+F--F+F',
              },
            },
            mayer: {
              side: 9,
              angunit: 90,
              angstart: 0,
              start: [50, -50],
              cant: [[[0.3, 0.3]]],
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
  exports.eonZ722vLindenSquare = anitem
}))
