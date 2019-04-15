/* ******************************************
 *    @eonZ620nShrubs
 *
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonZ620nShrubs = global.eonZ620nShrubs || {}))
})(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
    // .................. eons
    let [
      ctlWen,
      eohalMars,
      eohalTextform,
      muonGeoj,
      muonLindenmayer,
      muonProps,
      protonUniwen,
      renderSvg,
    ] = await Promise.all([
      __eo('xs').c('wen'),
      __eo('xs').e('mars'),
      __eo('xs').e('textform'),
      __eo('xs').m('geoj'),
      __eo('xs').m('lindenmayer'),
      __eo('xs').m('props'),
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
    // .................. animas
    let z = function () {
      // .................. pics

      let eotim = { td: 24200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 }
      let eocrom = { csx: 0, cf: 777, cs: 555, cw: 0.9, co: 0.05, cp: 0.7 }

      // .................. lindenmayer
      let lindenmayer = (data = {}) => ({
        linden: {
          axiom: data.axiom || 'F',
          loopq: data.loopq || 5,
          rules: data.rules || {
            F: {
              probs: [33, 66, 100],
              vals: ['F[+F]F', 'F[-F]F', 'F[+F]F[-F]F'],
            },
          },
        },
        mayer: {
          side: data.side || 3.5,
          angunit: data.angunit || 25.7,
          angstart: data.angstart || 90,
          start: data.start || [0, -175, 0],
          cant: data.cant || [[[0.1, 0.1]]],
          randomize: data.randomize || 1,
          randomfactor: data.randomfactor || 0.1,
        },
      })

      // .................. shrub
      let shrub = (data = {}) => {
        let { lindenmayer } = data
        data.start = [data.x0 || 0, data.y0 || 0, data.z0 || 0]

        let geo = muonLindenmayer.multiFeature(lindenmayer(data))
        geo.features = geo.features.sort(function (a, b) {
          return (
            2 * a.properties.level +
            a.properties.segment -
            (2 * b.properties.level + b.properties.segment)
          )
        })
        geo.features = geo.features.map((f, i) => {
          f.properties.eocrom = muonProps.clone(eocrom)
          let level = f.properties.level || 0
          let cs = f.properties.eocrom.cs
          let newcs = cs + 200 * level

          f.properties.eocrom.cs = newcs
          return f
        })
        return geo
      }

      let qh = 4 // rows
      let qv = 2 // columns
      let treeanis = new Array(qh * qv)
      let tidx = muonProps.tidx(qh, qv, 1, 1) // index from coords
      let ridx = muonProps.ridx(qh, qv, 1, 1) // coords from index

      let hvar = 10
      let hsep = 40
      let vmar = 0
      let vsep = 50
      let igeo = []
      for (let iv = 0; iv < qv; iv++) {
        for (let ih = 0; ih < qh; ih++) {
          let dist = 0.5 - (ih % 2)
          let htol = 0.5 - Math.random()

          let idx = tidx(ih, iv)
          let x0 = hvar * htol + dist * (hsep * ih)
          let y0 = vmar - vsep * iv
          igeo[idx] = shrub({ lindenmayer, x0, y0 })
        }
      }

      // .................. aniForm
      let aniForm = {
        eohal: eohalMars,
        eotim: eotim,
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani1' },

        eofold: ani => ({ type: 'Point', coordinates: [0, 0, 0] }),

        eomot: {
          proform: {
            projection: 'uniwen',
            scale: 1,
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
          },
        },
        eocrom: eocrom,
        eoload: {
          tim: [[[0, 1]]],
        },
      }

      for (let iv = 0; iv < qv; iv++) {
        for (let ih = 0; ih < qh; ih++) {
          let idx = tidx(ih, iv)

          let anii = muonProps.clone(aniForm)
          anii.eoric.fid = 'ani' + idx
          anii.eofold = igeo[idx]
          anii.eocrom = eocrom[Math.floor(0.5 + Math.random())]
          anii.eomot = {
            proform: {

              projection: 'uniwen',
              prerotate: [[[ ctl.rotation ]]],
              translate: [ [0, 0, 0], [[[ {
                'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 4, 'b': 2, // circle
                'ra2': 30, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360,
              } ]]] ],
              scale: 1,
              rotate: [ 0, 0, 0 ],
              lens: [0, 1, 12],

            },
          }
          treeanis[idx] = anii
        }
      }

      // .................. scene
      let animas = [].concat(treeanis)

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ620nShrubs = anitem
})
