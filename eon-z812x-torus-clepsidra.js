/* ******************************************
 *    @eonZ812xTorusClepsidra
 *
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonZ812xTorusClepsidra = global.eonZ812xTorusClepsidra || {}))
})(this, function (exports) {
  'use strict'

  // .................. anitem
  async function anitem (__eo) {
    // .................. eons
    let [
      eonCtlWen,
      eonCtlVersor,
      eonEohalMars,
      eonMuonNatform,
      eonRenderWebgl,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-ctl-versor'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-render-webgl'),
      __eo('xs').b('eon-render-svg'),
    ])
    try {
      eonRenderSvg.scenecolor('black')
    } catch (e) {}
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }
    // .................. animas
    let z = function () {
      // .................. pics

      let sin = Math.sin,
        cos = Math.cos

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

      let cost = [infact0, 0, -infact2, 0, infact4, 0, -infact6, 0, infact8]
      let sint = [0, infact1, 0, -infact3, 0, infact5, 0, -infact7, 0, infact9]
      let pihalf = Math.PI / 2

      // ............................. pics
      let eotim = {
        td: 18600,
        t0: 0,
        t1: 1,
        t2: 1,
        t3: 1,
        nostop: 1,
        // tf: t => 1 + sin(pihalf + pihalf * t),
      }

      let conformLight = {
        x: {
          m1: 4,
          m2: 4,
          n1: 2,
          n2: 2,
          n3: 2,
          a: 1,
          b: 1, // circ
          ra2: 120,
          v0: 0,
          v1: 1,
          w4: 0,
          seg5: [[[4,40]]],
          pa6: 0,
          pb7: -1,
          dom3: [-90, 90],
          c: [5, 1, 5, 1],
          'fn0': (e, c, d) => e[0] * cos(e[0]) * d.c[2] * cos(e[3]),
        },
        y: {
          m1: 4,
          m2: 4,
          n1: 2,
          n2: 2,
          n3: 2,
          a: 1,
          b: 1, // circ
          ra2: 120,
          v0: 0,
          v1: 1,
          w4: 0,
          seg5:  [[[4,40]]],
          pa6: 0,
          pb7: -1,
          dom3: [90, -90],
          c: [ 5, 1, 5, 1],
          e: [cost, 1, 1, sint],
          fn0: (e, c, d) => e[1] * cos(e[1]) * d.c[2] * sin(e[3]),
        },

        z: {
          m1: 4,
          m2: 4,
          n1: 2,
          n2: 2,
          n3: 2,
          a: 1,
          b: 1, // circ
          ra2: 120,
          v0: 0,
          v1: 1,
          w4: 0,
          seg5:  [[[2, 2, 12, 12, 18]]],
          pa6: 0,
          pb7: -1,
          dom3: [-180, 180],
          fn0: (e, c) => c[3] * 5 * sin(e[0]),
        },

        w: {
          m1: 4,
          m2: 4,
          n1: 2,
          n2: 2,
          n3: 2,
          a: 1,
          b: 1, // circ
          dom3: [-180, 180],
          fn0: (e, c) => c[3] * cos(e[2]),
        },
      }

      // ............................. lightAni
      let lightAni = {
        eohal: eonEohalMars,
        eofold: ani => eonMuonNatform.natMultiLineString({ eoform: ani.eoform }),
        // eofold: ani => eonMuonNatform.natMultiPolygon({ eoform: ani.eoform }),
        eotim,
        eoric: { gid: 'q', cid: 'q', fid: 'q1' },
        eomot: {
          proform: {
            projection: 'uniwen',
            scale: [0.3, 0.3],
            prerotate: [[[ctl.rotation]]],
            translate: [0, 0, 0],
            // rotate: [ 0, 0, 0 ],
            rotate: [
              [[[0, 90, 180, 0, 45, 45, ]]],
              [[[0, 180, 360, 36, 36, 90,]]],
              [[[0, 180, 360, 0, 45, 45, ]]],
            ],
            lens: [0, 1, Infinity],
          },
        },
        eocrom: {
          csx: 0,
          cf: [[[666, 333, 666]]],
          co: 0.2,
          cs: 333,
          cw: 0.99,
          cp: 0.99,
        },
        eoform: conformLight,
        eoload: {},
      }

      // ............................. animas
      let animas = [
        lightAni, // h.mars
      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ812xTorusClepsidra = anitem
})
