/* ******************************************
   *    @eonZ701eAce4
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ701eAce4 = global.eonZ701eAce4 || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
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

      let sin = Math.sin, cos = Math.cos

      // .................. pics
      // https://en.wikipedia.org/wiki/Surface_of_revolution
      let eotim = {'td': 23800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      let formGrat1 = {
        'x': {
          'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
          // 'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,  // square
          // 'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,  // circ
          'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, d) => c[0] * cos(e[0]) * c[2] * cos(e[2]),

        },
        'y': {
          'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
          // 'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,  // square
          // 'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,  // circ
          'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, d) => c[1] * sin(e[1]) * c[2] * cos(e[2]),
        },
        'z': {
          'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
          // 'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,  // circ
          // 'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,  // square
          'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, d) => c[1] * sin(e[3]) * c[2] * cos(e[1]),

        },
        'r': {
        // 'm1': -8, 'm2': -3.5, 'n1': 16.24, 'n2': 6, 'n3': 13, 'a': 9, 'b': 0.2, // booster
        // 'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,  // circ
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, d) => c[2] * cos(e[2]),

        },
      }

      let formCirc = {
        'x': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, d) => c[0] * cos(e[0]) * c[2] * cos(e[2]),

        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, d) => c[1] * sin(e[0]) * c[2] * cos(e[2]),
        },
        'z': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 180, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, d) => c[3] * sin(e[3]),

        },
      }

      // .................. gratform1
      let gratform1 = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: {'gid': 'grat', 'cid': 'grat', 'fid': 'gratform1'},

        eofold: p => eonMuonGraticule.gjfMultiLineString(p.eoframe),

        eomot: {
          conform: {

            projection: 'natform',
            eoform: formGrat1,

          },

          proform: {
            projection: 'uniwen',
            prerotate: [[[ ctl.rotation ]]],
            translate: [0, 0, 0],
            scale: 1,
            rotate: [ 0, 0, 0],
            lens: [ 0, 1, Infinity ],
          },
        },

        eocrom: { 'csx': 0, 'cf': 666, 'cs': 666, 'cw': 0.9, 'co': 0.3, 'cp': 0.9 },

        eoframe: {

          geoframe: [ [ [ -180, 180, 15, 1], [ -180, 180, 15, 1] ] ],

        },
        eoload: {
        },

      }

      // .................. circform
      let circform = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: {'gid': 'grat', 'cid': 'grat', 'fid': 'circform2'},

        eofold: p => eonMuonGraticule.gjfMultiLineString(p.eoframe),

        eomot: {
          conform: {
            projection: 'natform',
            eoform: formCirc,
          },

          proform: {
            projection: 'uniwen',
            prerotate: [[[ ctl.rotation ]]],
            translate: [0, 0, 0],
            scale: 1,
            rotate: [ 0, 0, 0],
            lens: [ 0, 1, Infinity ],
          },
        },

        eocrom: { 'csx': 0, 'cf': 333, 'cs': 333, 'cw': 0.2, 'co': 0.1, 'cp': 0.9 },

        eoframe: {

          geoframe: [ [ [ -180, 180, 15, 1], [ -180, 180, 15, 1] ] ],

        },
        eoload: {},
      }

      // .................. animas
      let animas = [

        gratform1, // h.mars
        circform, // h.mars

      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ701eAce4 = anitem
}))
