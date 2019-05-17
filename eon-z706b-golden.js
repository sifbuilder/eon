/* ******************************************
   *    @eonZ706bGolden
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ706bGolden = global.eonZ706bGolden || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
    let [
      eonCtlWen,
      eonEohalMars,
      eonMuonFibonat,
      eonMuonGraticule,
      eonMuonProps,
      eonProtonNatform,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-muon-fibonat'),
      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('eon-muon-props'),
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

      let eotim = {'td': 13800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      let radians = Math.PI / 180, degrees = 180 / Math.PI,
        sin = Math.sin, cos = Math.cos,
        sqrt2 = Math.sqrt(2)

      let wireForm = {
        'x': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, d) => c[0] * cos(e[0]) * c[2] * cos(e[2]),
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, d) => c[1] * sin(e[0]) * c[2] * cos(e[2]),
        },
        'z': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          'fn0': (e, c, d) => c[3] * sin(e[2]),

        },
      }

      let wireFrame = [ [ [ -180, 180, 90, 5], [ -180, 180, 30, 5] ] ]

      let wireProform = {
        projection: 'uniwen',
        prerotate: [[[ ctl.rotation ]]],
        translate: [0, 0, 0 ],
        scale: 1,
        rotate: [ 0, 0, [[[0, 0.3 * 360, 1 * 360]]]],
        lens: [ 0, 1, Infinity ],
      }

      // .................. fiboForm anima
      let wireAni = {

        eohal: eonEohalMars,

        eofold: p => {
          let eoload = p.eoload || {}

          const samples = eoload.fibonat.samples,
            offsetstep = eoload.fibonat.offsetstep,
            xprecision = eoload.fibonat.xprecision,
            yprecision = eoload.fibonat.yprecision,
            goldenangle = eoload.fibonat.goldenangle

          const offset = offsetstep / samples

          let dots = []
          for (let i = 0; i < samples; i++) {
            const z = ((i * offset) - 1) + (offset / 2)
            const radius = Math.sqrt(1 - Math.pow(z, 2))
            const phi = ((i + 1) % samples) * goldenangle
            const lambda = Math.atan2(z, radius)
            dots.push([phi * degrees, lambda * degrees, 1]) // proform, scale: 1
          }

          let lines = []
          for (let i = 0; i < dots.length - 2; i++) { // -2
            lines.push(

              eonMuonProps.interlink(
                [
                  eonMuonProps.arywinclosed(dots[i][0], dots[i + 1][0], xprecision),
                  eonMuonProps.arywinclosed(dots[i][1], dots[i + 1][1], yprecision),
                ]
              )
            )
          }
          let gj = {
            type: 'Feature',
            geometry: {type: 'MultiLineString', coordinates: lines},
            properties: {},
          }

          return gj
        },

        eotim: eotim,

        eoric: {gid: 'wire', cid: 'wire', fid: 'wireAni'},
        eocrom: { 'csx': 0, 'cf': 666, 'cs': 666, 'cw': 1.3, 'co': 0.03, 'cp': 0.99 },

        eomot: {
          conform: {
            projection: 'natform',
            eoform: wireForm,
          },
          proform: wireProform,
        },
        eoframe: wireFrame,
        eoload: {

          fibonat: {
            samples: [[[1, 30]]],
            offsetstep: [[[0.1, 1]]],
            xprecision: 1,
            yprecision: [[[100, 0.01]]],
            goldenangle: Math.PI * (3.0 - Math.sqrt(5.0)),
          },

        },
      }

      let sphereAni = {

        eohal: eonEohalMars,

        eofold: p => eonMuonGraticule.gjfMultiLineString(p.eoframe),

        eotim: eotim,
        eoric: {gid: 'wire', cid: 'wire', fid: 'sphereAni'},
        eocrom: { 'csx': 0, 'cf': 333, 'cs': 333, 'cw': [[[0.3, 0.01]]], 'co': [[[0.1, 0.01]]], 'cp': 0.99 },

        eomot: {
          conform: { projection: 'natform', eoform: wireForm },

          proform: wireProform,
        },
        eoframe: wireFrame,
        eoload: {

        },
      }

      let animas = [

        wireAni, // h.mars
        sphereAni, // h.mars

      ]
      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ706bGolden = anitem
}))
