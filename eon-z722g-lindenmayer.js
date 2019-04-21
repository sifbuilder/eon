/* ******************************************
   *    @eonZ722gLindenmayer
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ722gLindenmayer = global.eonZ722gLindenmayer || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlWen,
    eonEohalMars,
    eonMuonGeoj,
    eonMuonLacer,
    eonMuonLindenmayer,
    eonMuonProps,
    eonMuonSnap,
    eonProtonUniwen,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-geoj'),
    __eo('xs').b('eon-muon-lacer'),
    __eo('xs').b('eon-muon-lindenmayer'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-muon-snap'),
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

    let chn = (ch = 'F', n = 1) => ch.repeat(n)

    let aniForm = {

      eohal: eonEohalMars,
      eotim: { td: 12800, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 0 },
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani' },

      eofold: ani => {
        let t = ani.eotim.unElapsed

        let gj1 = eonMuonLindenmayer.multiLine(ani.eoload.lindenmayer1)
        let coors1 = gj1.geometry.coordinates[0]

        let gj2 = eonMuonLindenmayer.multiLine(ani.eoload.lindenmayer2)
        let coors2 = gj2.geometry.coordinates[0]

        let coors = [[[ [ coors1, coors2 ] ]]] // tripleArray
        let ws = eonMuonSnap.snap(coors, t, 0, ani) // LineString

        let gj = {
          type: 'Feature',
          geometry: {
            type: 'MultiLineString',
            coordinates: [],
          },
          properties: {},
        }
        gj.geometry.coordinates = Array.of(ws) // Line to MultiLineStrinmg

        return gj
      },

      eocrom: { 'csx': 0, 'cf': [[[444, 666]]], 'cs': 666, 'cw': [[[0.9, 0.9]]], 'co': [[[0.1, 0.2]]], 'cp': [[[0.9, 0.9]]]},
      eomot: {
        proform: {

          projection: 'uniwen',
          //          0       1   2     3     4     5
          scale: [[[0.600, 0.660, 0.720, 0.780, 0.860, 0.920, 0.940]]],
          translate: {x: -275, y: -100 },
          prerotate: [[[ ctl.rotation ]]],
          rotate: [ 0, 0, 0 ],

        },
      },
      eoload: {
        lindenmayer1: { //
          linden: {
            axiom: 'AFA+F+AFA',
            loopq: 0,
            feet: 341,
            rules: {
              A: '-BF+AFA+FB-',
              B: '+AF-BFB-FA+',
            },
          },
          mayer: {
            side: 1,
            angunit: 36,
            angstart: 36,
            start: [0, 0],
          },
        },

        lindenmayer2: { //
          linden: {
            axiom: 'AFA+F+AFA',
            loopq: 4.999,
            feet: 1,
            rules: { // coors 4**(loopq+1)
              A: '-BF+AFA+FB-',
              B: '+AF-BFB-FA+',
            },
          },
          mayer: {
            side: 1,
            angunit: 36,
            angstart: 36,
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
  exports.eonZ722gLindenmayer = anitem
}))