/* ******************************************
 *    @z419tPacerTrace
 *
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.z419tPacerTrace = global.z419tPacerTrace || {}))
})(this, function (exports) {
  'use strict'

  // .................. anitem
  async function anitem (__eo) {
    // .................. eons
    let [
      ctlRayder,
      ctlWen,
      eohalNatform,
      eohalMars,
      eohalPacer,
      eohalTextform,
      muonEoric,
      muonGeoj,
      muonGraticule,
      muonNatform,
      muonProps,
      muonStace,
      protonUniwen,
      renderSvg,
    ] = await Promise.all([
      __eo('xs').c('rayder'),
      __eo('xs').c('wen'),
      __eo('xs').e('natform'),
      __eo('xs').e('mars'),
      __eo('xs').e('pacer'),
      __eo('xs').e('textform'),
      __eo('xs').m('eoric'),
      __eo('xs').m('geoj'),
      __eo('xs').m('graticule'),
      __eo('xs').m('natform'),
      __eo('xs').m('props'),
      __eo('xs').m('stace'),
      __eo('xs').p('uniwen'),
      __eo('xs').r('svg'),
    ])

    try {
      renderSvg.scenecolor('black')
    } catch (e) {}
    let ctl
    try {
      ctl = ctlWen().control(renderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }
    let muonStore = __eo('muonStore')
    // .................. animas
    let z = function () {
      // .................. pics
      let eotim = { td: 10000, t0: 0, t1: 1, t2: 1, t3: 1 }

      // ....................... pacerNat
      let pacerNat = {
        eohal: eohalMars, // eohalPacer,
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
            eohal: eohalMars, // eohalPacer,
            eoric: { gid: 'ava', cid: 'ava', fid: 'line' },
            eotim: eotim,
            eofold: ani => {
              let parentani = muonStore.findAnigramFromUid(ani.eoric.pid)
              let point = parentani.eofold.features[0].geometry.coordinates

              let coordinates = [point]

              let preani = muonStore.findAnigramFromUid(ani.eoric.uid)
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
            eohal: eohalMars, // eohalPacer,
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
  exports.z419tPacerTrace = anitem
})
