/* ******************************************
   *    @eonZ722rPeano
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ722rPeano = global.eonZ722rPeano || {})))
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

      let eotim = { td: 9200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 }

      let aniForm1 = {

        eotim: eotim,
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani1' },
        eohal: eonEohalMars,

        eofold: ani => {
          let geo = eonMuonLindenmayer.multiFeature(ani.eoload.lindenmayer)

          let geoData = {
            type: 'Feature',
            geometry: {
              type: 'MultiLineString',
              coordinates: geo,
            },
            properties: {},
          }
          console.assert(geoData.geometry.type === 'MultiLineString')
          return geoData

          coords = eonMuonGeoj.getCoords(geoData)
          let nb = coords.length
          let unElapsed = ani.eotim.unElapsed // unit time elapsed
          let tf = d => d
          let t = tf(unElapsed)

          let nbt = Math.ceil(nb * t)
          let csi = t => eonMuonGeoj.getCoordsInRange(geoData, nbt)
          coords = csi(t).geometry.coordinates

          let ngj = {
            type: 'Feature',
            geometry: { type: 'MultiLineString', coordinates: [] },
            properties: {
              eocrom: { 'csx': 0, 'cf': 666, 'cs': 888, 'cw': 0.8, 'co': 0.1, 'cp': 0.9},
            },
          }

          ngj.geometry.coordinates = coords

          return ngj
        },

        eocrom: { 'csx': 0, 'cf': [[[444, 666]]], 'cs': 666, 'cw': [[[0.9, 0.9]]], 'co': [[[0.1, 0.2]]], 'cp': [[[0.9, 0.9]]]},
        eomot: {
          proform: {
            projection: 'uniwen',
            scale: 1,
            translate: {'x': -20, 'y': 0 },
            prerotate: [[[ ctl.rotation ]]],
            rotate: [ 0, 0, 0 ],
          },
        },
        eoload: {
          lindenmayer: { //
            linden: {
              axiom: 'L',
              loopq: 3,
              feet: 2,
              rules: {
                L: 'LFRFL-F-RFLFR+F+LFRFL',
                R: 'RFLFR+F+LFRFL-F-RFLFR',
              },
            },
            mayer: {
              side: 6,
              angunit: 90,
              start: [0, -100],
            },
          },

        },
      }

      let aniForm2 = {

        eotim: eotim,
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani2' },
        eohal: eonEohalMars,

        eofold: ani => {
          let geo = eonMuonLindenmayer.multiFeature(ani.eoload.lindenmayer)

          let geoData = {
            type: 'Feature',
            geometry: {
              type: 'MultiLineString',
              coordinates: geo,
            },
            properties: {},
          }
          return geoData

          let coords = eonMuonGeoj.getCoords(geoData)
          let nb = coords.length
          let unElapsed = ani.eotim.unElapsed // unit time elapsed
          let tf = d => d
          let t = tf(unElapsed)

          let nbt = Math.ceil(nb * t)
          let csi = t => eonMuonGeoj.getCoordsInRange(geoData, nbt)
          coords = csi(t).geometry.coordinates

          let ngj = {
            type: 'Feature',
            geometry: { type: 'MultiLineString', coordinates: [] },
            properties: {
              eocrom: { 'csx': 0, 'cf': 666, 'cs': 888, 'cw': 0.8, 'co': 0.1, 'cp': 0.9},
            },
          }

          console.assert(geoData.geometry.type === 'MultiLineString')
          ngj.geometry.coordinates = coords

          return ngj
        },

        eocrom: { 'csx': 0, 'cf': [[[444, 666]]], 'cs': 666, 'cw': [[[0.9, 0.9]]], 'co': [[[0.1, 0.2]]], 'cp': [[[0.9, 0.9]]]},
        eomot: {
          proform: {
            projection: 'uniwen',
            scale: 1,
            translate: {'x': 120, 'y': 0 },
            prerotate: [[[ ctl.rotation ]]],
            rotate: [ 0, 0, 0 ],
          },
        },
        eoload: {
          lindenmayer: { //
            linden: {
              axiom: 'AFA+F+AFA',
              loopq: 4,
              feet: 1,
              rules: {
                A: '-BF+AFA+FB-',
                B: '+AF-BFB-FA+',
              },
            },
            mayer: {
              side: 6,
              angunit: 90,
              start: [0, -100],
            },
          },

        },
      }

      // .................. animas
      let animas = [
        aniForm1, // h.mars
        aniForm2, // h.mars
      ]
      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ722rPeano = anitem
}))
