/* ******************************************
   *    @eonZ705aGratiform
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ705aGratiform = global.eonZ705aGratiform || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
    let [
      eonCtlWen,
      eonEohalMars,
      eonMuonGraticule,
      eonProtonNatform,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('eon-proton-natform'),
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

      let sin = Math.sin, cos = Math.cos

      let eotim = {'td': 3800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      let formNat = {
        'x': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'ra2': 120, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, d) => c[0] * cos(e[0]) * c[2] * cos(e[2]),

        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'ra2': 120, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, d) => c[1] * sin(e[0]),
        },
        'z': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, d) => e[2],

        },
        'w': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, d) => c[2],

        },
      }

      let geoframe = [ [ [ -180, 180, 90, 5], [ -180, 180, 30, 5] ] ]

      let proform = {
        projection: 'uniwen',
        prerotate: [[[ ctl.rotation ]]],
        translate: [0, 0, 0],
        scale: 0.5,
        rotate: [ 0, 0, 0],
        lens: [ 0, 1, Infinity ],
      }

      // .................. gratiForm anima
      let gratiForm = {

        eohal: eonEohalMars,

        eofold: p => eonMuonGraticule.gjfMultiLineString(p.eoframe),

        eotim: eotim,
        eoric: {'gid': 'grat', 'cid': 'grat', 'fid': 'gratiForm'},
        eocrom: { 'csx': 0, 'cf': 666, 'cs': [[[555, 777]]], 'cw': [[[1.3, 1.9]]], 'co': 0.01, 'cp': 0.9 },

        eomot: {
          conform: {
            projection: 'natform',
            eoform: formNat,
          },

          proform: proform,
        },
        eoframe: geoframe,
        eoload: {},

      }

      // .................. animas
      let animas = [

        gratiForm, // h.mars

      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ705aGratiform = anitem
}))
