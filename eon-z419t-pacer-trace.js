/* ******************************************
 *    @eonZ419tPacerTrace
 *
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonZ419tPacerTrace = global.eonZ419tPacerTrace || {}))
})(this, function (exports) {
  'use strict'

  // .................. anitem
  async function anitem (__eo) {
    // .................. eons
    let [
      eonCtlRayder,
      eonCtlWen,
      eonEohalNatform,
      eonEohalMars,
      eonEohalPacer,
      eonEohalTextform,
      eonMuonEoric,
      eonMuonGeoj,
      eonMuonGraticule,
      eonMuonNatform,
      eonMuonProps,
      eonMuonStace,
      eonProtonUniwen,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-rayder'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-natform'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-pacer'),
      __eo('xs').b('eon-eohal-textform'),
      __eo('xs').b('eon-muon-eoric'),
      __eo('xs').b('eon-muon-geoj'),
      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-muon-stace'),
      __eo('xs').b('eon-proton-uniwen'),
      __eo('xs').b('eon-render-svg'),
    ])

    try {
      eonRenderSvg.scenecolor('black')
    } catch (e) {}
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }
    let eonMuonStore = __eo('eonMuonStore')
    // .................. animas
    let z = function () {
      // .................. pics
      let eotim = { td: 10000, t0: 0, t1: 1, t2: 1, t3: 1 }

      // ....................... pacerNat
      let pacerNat = {
        eohal: eonEohalMars, // eonEohalPacer,
        eoric: { gid: 'ani', cid: 'ani', fid: 'dot' },
        eotim: eotim,
        eofold: {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [[[[0, 200]]], 0, 0] },
          properties: { pointRadius: 6 },
        },
        eonode: {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: {
            orgen: [0, 0],
            velin: [0, 0],
            velang: [0, 0],
            prevous: [0, 0],
            geodelta: [0, 0],
          },
        },
        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [0, 0, 0],
            scale: 1,
            rotate: [0, 0, 0],
            lens: [0, 1, Infinity],
            geoanod: 1,
          },
        },
        eocrom: {
          csx: 0,
          cf: 888,
          co: 0.29,
          cs: 555,
          cw: 0.9,
          cp: 0.9,
        },
        avatars: {
          line: {
            eotim: eotim,
            eohal: eonEohalMars, // eonEohalPacer,
            eoric: { gid: 'ava', cid: 'ava', fid: 'line' },
            eofold: ani => {
              let parentani = eonMuonStore.findAnigramFromUid(ani.eoric.pid)
              let point = parentani.eofold.features[0].geometry.coordinates

              let coordinates = [point]

              let preani = eonMuonStore.findAnigramFromUid(ani.eoric.uid)
              if (preani !== undefined) {
                if (preani.eofold.type === 'FeatureCollection') {
                  let feature = preani.eofold.features[0]
                  coordinates = feature.geometry.coordinates
                } else if (preani.eofold.type === 'Feature') {
                  let feature = preani.eofold
                  coordinates = feature.geometry.coordinates
                }
              }

              coordinates = [...coordinates, point]

              let feature = {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: coordinates,
                },
              }

              return feature
            },
            eocrom: {
              csx: 0,
              cf: 888,
              co: 0.09,
              cs: 555,
              cw: 0.9,
              cp: 0.9,
            },
          },

          point: {
            eohal: eonEohalMars, // eonEohalPacer,
            eoric: { gid: 'ava', cid: 'ava', fid: 'dot' },
            eotim: eotim,
            eofold: {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: [[[[0, 200]]], 0, 0] },
              properties: { pointRadius: 16 },
            },
            eocrom: {
              csx: 0,
              cf: 888,
              co: 0.09,
              cs: 555,
              cw: 0.9,
              cp: 0.9,
            },
          },
        },

      }

      // .................. scene
      let scene = {
        pacerNat, // h.pacer
      }

      return scene
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ419tPacerTrace = anitem
})
