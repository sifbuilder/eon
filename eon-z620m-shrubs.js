/* ******************************************
 *    @eonZ620mShrubs
 *
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonZ620mShrubs = global.eonZ620mShrubs || {}))
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

      let lindenmayer1 = () => ({
        linden: {
          axiom: 'F',
          loopq: 5,
          rules: {
            F: {
              probs: [33, 66, 100],
              vals: ['F[+F]F', 'F[-F]F', 'F[+F]F[-F]F'],
            },
          },
        },
        mayer: {
          side: 3.5,
          angunit: 25.7,
          angstart: 90,
          start: [0, -175, 0],
          cant: [[[0.1, 0.1]]],
          randomize: 1,
          randomfactor: 0.1,
        },
      })

      // let geo = muonLindenmayer.multiFeature(lindenmayer1)
      // geo.features = geo.features.sort(function (a, b) {
      //   return (
      //     2 * a.properties.level +
      //     a.properties.segment -
      //     (2 * b.properties.level + b.properties.segment)
      //   )
      // })
      // geo.features = geo.features.map((f, i) => {
      //   f.properties.eocrom = muonProps.clone(eocrom)
      //   let level = f.properties.level || 0
      //   let cs = f.properties.eocrom.cs
      //   let newcs = cs + 200 * level

      //   f.properties.eocrom.cs = newcs
      //   return f
      // })
    // .................. aniForm
      let aniForm = {
        eohal: eohalMars,
        eotim: eotim,
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani1' },

        eofold: ani => {

          let gj = {
            type: 'Point',
            coordinates: [0,0,0],
          }

          return gj
        },

        eomot: {
          proform: {
            projection: 'uniwen',
            scale: 1,
            translate: [0, 0, 0],
            prerotate: [[[ctl.rotation]]],
            rotate: [0, [[[0, 0 * 360]]], 0],
          },
        },
        eocrom: eocrom,
        eoload: {
          // lindenmayer: lindenmayer,
          tim: [[[0, 1]]],
        },
      }

      let qh = 4 // 10
      let qv = 2 // 4
      let treeanis = new Array(qh * qv)
      let tidx = muonProps.tidx(qh, qv, 1, 1)

      let hvar = 10
      let hsep = 40
      let vmar = 0
      let vsep = 50

      for (let iv = 0; iv < qv; iv++) {
        for (let ih = 0; ih < qh; ih++) {
          let idx = tidx(ih, iv)

          let anii = muonProps.clone(aniForm)
          anii.eoric.fid = 'ani' + idx

          let dist = (0.5 - ih % 2)
          let htol = (0.5 - Math.random())
          let crom = Math.floor(0.5 + Math.random())

          // anii.eoload.soma = muonProps.clone(soma)
          // anii.eoload.soma.x0 = (hvar * htol) + dist * (hsep * ih)
          // anii.eoload.soma.y0 = vmar - (vsep * iv)

          anii.eofold = function (ani) {

            // let x0 = (hvar * htol) + dist * (hsep * ih)
            // let y0 = vmar - (vsep * iv)
            // let gj = {
            //   type: 'Point',
            //   coordinates: [x0,y0,0],
            // }
            // return gj

            let geo = muonLindenmayer.multiFeature(lindenmayer1())
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
          anii.eocrom = eocrom[crom]

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
  exports.eonZ620mShrubs = anitem
})
