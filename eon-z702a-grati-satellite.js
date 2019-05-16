/* ******************************************
   *    @eonZ702aGratiSatellite
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ702aGratiSatellite = global.eonZ702aGratiSatellite || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonMuonGraticule,
      eonCtlWen,
      eonProtonNatform, // eslint-disable-line no-unused-vars
      eonEohalMars,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-proton-natform'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    // .................. animas
    let z = function () {
    // .................. pics
      let ctl
      try {
        ctl = eonCtlWen().control(eonRenderSvg.svg())
      } catch (e) {
        ctl = () => [0, 0, 0]
      }

      let eotim = {'td': 22800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      let form = {
        'x': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
          'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
          'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
        },
        'z': {
          'm1': 8, 'm2': 1, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // antenna
          'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, [[[160, 180, 180]]] ],
        },
      }

      let g1 = {
        eohal: eonEohalMars,
        eofold: p => eonMuonGraticule.gjfMultiLineString(p.eoframe),
        eotim: eotim,
        eoric: { gid: 'grat', cid: 'grat', fid: 'g1'},
        eocrom: { 'csx': 0, 'cf': 666, 'cs': 666, 'cw': 0.9, 'co': 0.3, 'cp': 0.9 },
        eomot: {
          conform: {
            projection: 'natform',
            eoform: form,
          },
          proform: {
            projection: 'uniwen',
            prerotate: [[[ ctl.rotation ]]],
            translate: [ -150, 0],
            scale: 1,
            rotate: [[[[0, 30, -30, 0]]], -60, [[[0, 360]]] ],
            lens: [ 0, 1, Infinity ],
          },
        },
        eoframe: {
        // geoframe: [ [ [-180, 180, 15, 15], [-90, [[[0, 90]]], 22.5, 22.5] ],
        //   [ [-180, 180, 15, 15], [-90, [[[0, 90]]], 22.5, 22.5] ] ],
          geoframe: [ [ [-180, 180, 15, 15], [-90, 1, 22.5, 22.5] ],
            [ [-180, 180, 15, 15], [-90, 1, 22.5, 22.5] ] ],
        },
        eoload: {
        },
      }

      let g3 = {
        eohal: eonEohalMars,
        eofold: p => eonMuonGraticule.gjfMultiLineString(p.eoframe),
        eotim: eotim,
        eoric: { gid: 'grat', cid: 'grat', fid: 'g3'},
        eocrom: { 'csx': 0, 'cf': 666, 'cs': 666, 'cw': 0.9, 'co': 0.3, 'cp': 0.9 },
        eomot: {
          conform: { projection: 'natform', eoform: form },
          proform: {
            projection: 'uniwen',
            prerotate: [[[ ctl.rotation ]]],
            translate: [ 150, [[[0, 50, -50, 0]]] ],
            scale: 100,
            rotate: [0, 0, [[[0, 360]]] ],
            lens: [ 0, 1, Infinity ],
          },
        },
        eoframe: {
          geoframe: [ [ [-180, 180, 15, 15], [-0, 180, 22.5, 22.5] ],
            [ [-180, 180, 15, 15], [-0, 180, 22.5, 22.5] ] ],
        },
        eoload: {
        },
      }

      // .................. animas
      let animas = [

        g1, // h.mars
        // g2, // h.mars
        g3, // h.mars

      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ702aGratiSatellite = anitem
}))
