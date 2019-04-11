/* ******************************************
 *    @eonZ813oReticule
 *
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonZ813oReticule = global.eonZ813oReticule || {}))
})(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
    // .................. eons
    let [
      ctlWen,
      eohalMars,
      muonNatform,
      muonProps,
      renderSvg,
    ] = await Promise.all([
      __eo('xs').c('wen'),
      __eo('xs').e('mars'),
      __eo('xs').m('natform'),
      __eo('xs').m('props'),
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

      let radians = Math.PI / 180,
        degrees = 180 / Math.PI,
        sin = Math.sin,
        cos = Math.cos,
        sqrt = Math.sqrt

      let fact = n => (n - 1 > 0 ? n * fact(n - 1) : n)
      let fact0 = 1,
        fact1 = 1,
        fact2 = 2,
        fact3 = 6,
        fact4 = 24,
        fact5 = 120,
        fact6 = 720,
        fact7 = 5040,
        fact8 = 40320,
        fact9 = 362880
      let infact0 = 1 / fact0,
        infact1 = 1 / fact1,
        infact2 = 1 / fact2,
        infact3 = 1 / fact3,
        infact4 = 1 / fact4,
        infact5 = 1 / fact5,
        infact6 = 1 / fact6,
        infact7 = 1 / fact7,
        infact8 = 1 / fact8,
        infact9 = 1 / fact9

      let sinp = [infact0, 0, -infact2, 0, infact4, 0, -infact6, 0, infact8]
      let cosp = [0, infact1, 0, -infact3, 0, infact5, 0, -infact7, 0, infact9]
      let exp = [
        infact0,
        infact1,
        infact2,
        infact3,
        infact4,
        infact5,
        infact6,
        infact7,
        infact8,
        infact9,
      ]

      // ............................. pics
      let eotim = {
        td: 12600,
        t0: 0,
        t1: 1,
        t2: 1,
        t3: 1,
        nostop: 1,
      }

      let conform = {
        x: {
          m1: 4,
          m2: 4,
          n1: 2,
          n2: 2,
          n3: 2,
          a: 1,
          b: 1, // circ
          ra2: 60,
          v0: 0,
          v1: 1,
          w4: 0,
          seg5: 12,
          pa6: 0,
          pb7: -1,
          dom3: [-180, 180],
          fn0: (e, c) => {
            return c[0] * e[0] * c[3] * cos(e[3])
          },
        },
        y: {
          m1: 4,
          m2: 4,
          n1: 2,
          n2: 2,
          n3: 2,
          a: 1,
          b: 1, // circ
          ra2: 60,
          v0: 0,
          v1: 1,
          w4: 0,
          seg5: 12,
          pa6: 0,
          pb7: -1,
          dom3: [-180, 180],
          c: [ -0.17, 0, 0],
          fn0: (e, c, dax) => {
            console.log(dax.c[0])
            return (1 / Math.exp(Math.abs(e[1] / 2))) * cos(dax.c[0] * e[0])
          },
        },

        z: {
          m1: 4,
          m2: 4,
          n1: 2,
          n2: 2,
          n3: 2,
          a: 1,
          b: 1, // circ
          ra2: 60,
          v0: 0,
          v1: 1,
          w4: 0,
          seg5: 12,
          pa6: 0,
          pb7: -1,
          dom3: [-180, 180],
          fn0: (e, c) => {
            return c[0] * e[0] * c[3] * sin(e[3])
          },
        },

        w: {
          m1: 4,
          m2: 4,
          n1: 2,
          n2: 2,
          n3: 2,
          a: 1,
          b: 1, // circ
          ra2: 60,
          v0: 0,
          v1: 1,
          w4: 0,
          seg5: 36,
          pa6: 0,
          pb7: -1,
          dom3: [0, 90],
        },
      }

      let eocrom = {
        csx: 1,
        cf: 666,
        co: 0.06,
        cs: 333,
        cw: 0.7,
        cp: 0.9,
      }

      // ............................. natAni
      let natAni = {
        eohal: eohalMars,
        eotim,
        eoric: { gid: 'q', cid: 'q', fid: 'q' },

        eofold: ani => muonNatform.natMultiLineString({ eoform: ani.eoload.eoform }),

        eomot: {
          proform: {
            projection: 'uniwen',
            scale: 1,
            prerotate: [[[ctl.rotation]]],
            translate: [0, 0, 0],
            rotate: [30, [[[0, 360]]], 0],
            lens: [0, 1, Infinity],
          },
        },

        eoload: {
          eocrom: eocrom,
          eoform: conform,
        },
      }

      // ............................. scene
      let scene = {
        natAni,
      }
      return scene
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ813oReticule = anitem
})
