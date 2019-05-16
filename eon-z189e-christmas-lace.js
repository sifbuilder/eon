/* ******************************************
   *    @eonZ189eChristmasLace
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ189eChristmasLace = global.eonZ189eChristmasLace || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonCtlWen,
      eonEohalMars,
      eonMuonNatform,

      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-muon-natform'),

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

      let sin = Math.sin, cos = Math.cos

      // ............................. pics
      let eotim = {'td': 12600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tf: t => 1 - 4 * (t - 0.5) * (t - 0.5)}

      let conform = {
        x: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 180, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c) => {
            let x = e[0]
            let y = e[1]
            let res = cos(x) * cos(4 * y)

            return res
          },
        },
        y: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 180, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, dax) => {
            let y = e[1]
            let res = sin(y) * cos(4 * y)
            // let res = ( (h - z) / h ) * r * sin( a * z )

            return res
          },

        },

        z: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
          'dom3': [0, 90],
          c: [ [[[94, 104]]], 1, 1, 1],
          'fn0': (e, c, dax) => {
            let x = e[0] // dom:[-180, 180] : [-1.57, 1.57]

            let z = e[2]

            let d = 0.157 // radians * 36 / 360 // 0.157  , z.seg5: 36, xy.dom: 360

            // let res = 0.001 * x * s + cos(s * z)

            let res = z + x * d / 4

            return res
          },
        },

        w: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
          'dom3': [0, 90],
          'fn0': (e, c, dax) => {
            return e[2]
          },

        },

      }

      // let eocrom = { 'csx': 1, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
      let eocrom = { 'csx': 0, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
        'cs': [[[666, 333, 666]]], 'cw': [[[0.7, 0.7, 0.7]]], 'cp': [[[0.9, 0.9]]]}

      // ............................. natAni
      let natAni = {

        eohal: eonEohalMars,

        eofold: ani => {
          let natipros = {
            eoform: ani.eoform,
            ghv: 1, // horizontal geodesics
            gsa: 0, // symetric distribution of geodesics around the origin
            gco: 0, // closed line
          }
          let form = eonMuonNatform.natMultiLineString(natipros)

          return form
        },
        eotim,

        eoric: {gid: 'q', cid: 'q', fid: 'q'},
        eomot: {
          proform: {
            projection: 'uniwen',
            scale: [ 1, 1 ],
            prerotate: [[[ ctl.rotation ]]],
            translate: [ [0, 60, 0] ],
            rotate: [ 90, 0, 0 ],
            lens: [0, 1, Infinity ],
          },
        },
        eocrom: eocrom,

        eoform: conform,
        eoload: {

        },

      }

      // ............................. animas
      let animas = [

        natAni, // h.natform

      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ189eChristmasLace = anitem
}))
