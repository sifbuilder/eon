/* ******************************************
   *    @eonZ723h3dLeaves
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ723h3dLeaves = global.eonZ723h3dLeaves || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonCtlWen,
      eonEohalMars,
      eonEohalTextform,
      eonMuonGeoj,
      eonMuonLindenmayer,
      eonMuonProps,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-textform'),
      __eo('xs').b('eon-muon-geoj'),
      __eo('xs').b('eon-muon-lindenmayer'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }
    // .................. animas
    let z = function () {
    // .................. pics

      let eotim = { td: 36200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 }
      let eocrom = { 'csx': 0, 'cf': 111, 'cs': 333, 'cw': 1.4, 'co': 0.3, 'cp': 0.7 }

      // .................. lindenmayer
      let lindenmayer = (data = {}) => ({

        linden: {
          axiom: 'A',
          loopq: 5,
          rules: {
            // A: '[F&L!A]~~~~~’[F&L!A]~~~~~~~’[F&L!A]',
            A: {
              probs: [20, 50, 100],
              vals: ['[F&L!A]~~~~~’[F&L!A]~~~~~~~’[F&L!A]~~~’[F&L!A]',
                '[F&L!A]~~~~~’[F&L!AF&L!A]~~~~~~~’[F&L!A]~~~’[F&L!A]',
                '[F&L!AF&L!A]~~~~~’[F&L!A]~~~~~~~’[F&L!AF&L!A]~~~~’[F&L!AF&L!A]'],
            },
            F: 'S ~~~~~ F',
            S: 'F L',
            L: '[’’’^^]',

          },
        },
        mayer: {
          side: 16,
          angunit: 22.5,
          angstart: 90,
          start: [0, -150, 0],
          cant: [[[0.1, 0.1]]],
        },
      })
      // .................. shrub
      let shrub = (data = {}) => {
        let { lindenmayer } = data
        data.start = [data.x0 || 0, data.y0 || 0, data.z0 || 0]

        let geo = eonMuonLindenmayer.multiFeature(lindenmayer(data))
        geo.features = geo.features.sort(function (a, b) {
          return (
            2 * a.properties.level +
            a.properties.segment -
            (2 * b.properties.level + b.properties.segment)
          )
        })
        geo.features = geo.features.map((f, i) => {
          f.properties.eocrom = eonMuonProps.clone(eocrom)
          let level = f.properties.level || 0
          let cs = f.properties.eocrom.cs
          let newcs = cs + 200 * level

          f.properties.eocrom.cs = newcs
          return f
        })
        return geo
      }

      let lindengeo = shrub({ lindenmayer })

      let aniForm2 = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani2' },

        eofold: ani => {
          let geo = lindengeo

          geo.features = geo.features.sort(function (a, b) {
            return (2 * a.properties.level + a.properties.segment) -
            (2 * b.properties.level + b.properties.segment)
          })
          geo.features = geo.features.map((f, i) => {
            f.properties.eocrom = eonMuonProps.clone(eocrom)
            let contextlevel = f.properties.contextlevel || 0

            let colorlevel = f.properties.colorlevel || 0
            let diameterlevel = (f.properties.diameterlevel || 0)

            let cs = f.properties.eocrom.cs
            let cf = f.properties.eocrom.cf
            let cw = f.properties.eocrom.cw
            let newcs = cs + 600 * contextlevel
            let newcf = cf + 600 * colorlevel
            let newcw = Math.max(1, cw - diameterlevel)

            f.properties.eocrom.cs = newcs
            f.properties.eocrom.cf = newcf
            f.properties.eocrom.cw = newcw
            return f
          })

          let fq = geo.features.length
          fq = Math.ceil(fq * ani.eoload.tim)

          let gj = {
            type: 'FeatureCollection',
            features: geo.features.slice(0, fq),
          }

          return gj
        },

        eomot: {
          proform: {
            projection: 'uniwen',
            scale: 1,
            translate: [ 0, 0, 0 ],
            prerotate: [[[ ctl.rotation ]]],
            rotate: [ [[[0, -9, -18]]], [[[0, -364]]], 0 ],
          },
        },
        eocrom: eocrom,
        eoload: {
          tim: [[[0, 0.5, 1]]],

        },
      }

      // .................. textAni

      // .................. scene
      let scene = {
        aniForm2, // h.mars
      }

      return scene
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ723h3dLeaves = anitem
}))
