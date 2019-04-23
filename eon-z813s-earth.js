/* ******************************************
   *    @eonZ813sEarth
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ813sEarth = global.eonZ813sEarth || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      d3Geo,
      d3Geoprojection,
      topojson,      
      eonCtlWen,
      eonDatWorldTopo110m,      
      eonEohalMars,
      eonEohalSol,
      eonMuonGamma,
      eonMuonGraticule,
      eonMuonNatform,
      eonProtonNatform,
      eonProtonOrthographic,      
      eonRenderPortview,
      eonRenderSvg,
      // eonRenderWebgl,
    ] = await Promise.all([
      __eo('xs').b('d3-geo'),
      __eo('xs').b('d3-geo-projection'),
      __eo('xs').b('topojson'),      
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-dat-world-topo110m'),      
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-sol'),
      __eo('xs').b('eon-muon-gamma'),
      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-proton-natform'),
      __eo('xs').b('eon-proton-orthographic'),      
      __eo('xs').b('eon-render-portview'),
      __eo('xs').b('eon-render-svg'),
      // __eo('xs').b('eon-render-webgl'),
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
      let eotim = {'td': 20000, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tf: t => t}

      let radians = Math.PI / 180, degrees = 180 / Math.PI,
        sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
        pow = Math.pow

      // let fact = n => n - 1 > 0 ? n * fact(n - 1) : n
      let fact = x => eonMuonGamma.fact(x)
      let infact = x => 1 / fact(x)

      let cost = [
        1,
        [[[0, 0]]],
        [[[0, 0, -1]]],
        [[[0, 0, 0]]],
        [[[0, 0, 0, 1]]],
        [[[0, 0, 0, 0]]],
        [[[0, 0, 0, 0, -1]]],
        [[[0, 0, 0, 0, 0]]],
        [[[0, 0, 0, 0, 0, 1, 1]]],
        [[[0, 0, 0, 0, 0, 0]]]
      ]
      let sint = [
        0,
        [[[1, 1, 1]]],
        [[[0, 0]]],
        [[[0, 0, -1]]],
        [[[0, 0, 0]]],
        [[[0, 0, 0, 1]]],
        [[[0, 0, 0, 0]]],
        [[[0, 0, 0, 0, -1]]],
        [[[0, 0, 0, 0, 0]]],
        [[[0, 0, 0, 0, 0, 1, 1]]],
      ]

      let conform2 = {
        x: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          t: [[[0, Math.PI]]],
          e: [ cost, 1, 1, cost ],


          fn0: (e, c, dax) => {
            let series = eonMuonNatform.daxify(dax.e) // to dax
            let _t = dax.t
            let x = e
            let res = 1

            let taylor = eonMuonNatform.taylor
            for (let i = 0; i < x.length; i++) {
              res = res * c[i] * taylor(series[i])(x[i])
            }

            return res
          },

        },
        y: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          t: [[[0, Math.PI]]],
          c: [ 1, 1, 1, 1],
          e: [ 1, sint, 1, cost ],
          fn0: (e, c, dax) => {
            let series = eonMuonNatform.daxify(dax.e) // to dax
            let _c = dax.c
            let _t = dax.t
            let x = e
            let res = 1

            let taylor = eonMuonNatform.taylor
            for (let i = 0; i < x.length; i++) {
              res = res * c[i] * taylor(series[i])(x[i])
            }

            return res
          },

        },
        z: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
          'dom3': [-90, 90],
          t: [[[0, Math.PI]]],
          c: [],
          e: [ 1, 1, 1, sint ],
          fn0: (e, c, dax) => {
            let series = eonMuonNatform.daxify(dax.e) // to dax
            let _c = dax.c
            let _t = dax.t
            let x = e
            let res = 1

            let taylor = eonMuonNatform.taylor
            for (let i = 0; i < x.length; i++) {
              res = res * c[i] * taylor(series[i])(x[i])
            }

            return res
          },
        },
        w: {
          m1: 4, m2: 4, n1: 2, n2: 2, n3: 2, a: 1, b: 1, // circ
          ra2: 1, v0: 0, v1: 1, w4: 0, seg5: 24, pa6: 0, pb7: -1,
          dom3: [-90, 90],
          fn0: (e, c, d) => {
            return cos(e[2])
          },
        },
      }

      let eocrom = { 'csx': 0, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.69, 0.6, 0.69]]],
        'cs': [[[666, 333, 666]]], 'cw': [[[0.7, 0.7, 0.7]]], 'cp': [[[0.9, 0.9]]]}

      // ............................. natAni2
      let natAni2 = {

        eohal: eonEohalMars,
        eoric: {gid: 'q', cid: 'q', fid: 'q2'},
        eotim: eotim,
        eofold: p => {
          let gjMultiLineString = Object.assign({},
            topojson.mesh(
              eonDatWorldTopo110m.data(),
              eonDatWorldTopo110m.data().objects.land
            )
          )
          let res = {
            type: 'Feature',
            geometry: gjMultiLineString,
            properties: {},
          }
          return res
        },
        // eofold: ani => {
        //   let natipros = {
        //     eoform: ani.eoload.eoform,
        //     ghv: 0, // horizontal geodesics
        //     gsa: 0, // asymetric distribution of geodesics around the origin
        //     gco: 0, // open line
        //   }
        //   return eonMuonNatform.natMultiLineString(natipros) // Feature.LineString

        // },

        eomot: {
          conform: {
            projection: 'natform',
            eoform: conform2,
          },          
          ereform: {
            projection: 'uniwen', scale: [ [[[0.5, 0.5, 0.7, 1.5]]], [[[0.5, 0.5, 0.7, 1.5]]], [[[0.5, 0.5, 0.7, 1.5]]]],
            translate: [0, 0, 0],
            rotate: [ [[[-0, -6, -12, -18, -24]]], [[[-60, -54, -48, -42, -36]]], 0 ],
          },
          proform: {
            projection: 'uniwen', scale: [1, 1, 1], translate: [0, 0, 0], rotate: [[[ctl.rotation]]],
          },
        },

        eoload: {
          eocrom: eocrom,
          eoform: conform2,
        },

      }

      // ............................. animas
      let animas = [

        natAni2, // h.natform

      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ813sEarth = anitem
}))
