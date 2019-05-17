/* ******************************************
   *    @eonZ723bFfa
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ723bFfa = global.eonZ723bFfa || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonCtlWen,
      eonEohalMars,
      eonMuonGeoj,
      eonMuonLindenmayer,
      eonProtonUniwen,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-muon-geoj'),
      __eo('xs').b('eon-muon-lindenmayer'),
      __eo('xs').b('eon-proton-uniwen'),
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

      let aniForm = {

        eotim: { td: 18200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 },
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani' },
        eohal: eonEohalMars,

        eofold: ani => {
        // fractal geoframe algorithms http://flam3.com/flame.pdf
        // Sierpinski’s Gasket
          let fn1 = ([x, y]) => [ x / 2, y / 2 ]
          let fn2 = ([x, y]) => [ (x + 1) / 2, y / 2 ]
          let fn3 = ([x, y]) => [ x / 2, (y + 1) / 2 ]
          let fns = [fn1, fn2, fn3]
          let cs = [100, 500, 900]

          // Initials
          let p0 = [ 0 + 1 * (0.5 - Math.random()), 0 + 1 * (0.5 - Math.random())], pn
          let c0 = 900 + 50 * (0.5 - Math.random()), cn
          let iters = 500 + 100 * (0.5 - Math.random())
          let pointRadius = 6.99 + 2 * (0.5 - Math.random())

          let features = []

          for (let i = 0; i < iters; i++) {
            let fx = Math.floor(fns.length * Math.random()) // random index
            let fn = fns[fx] // random function
            let cn = cs[fx] // random color

            let coords
            if (i === 0) {
              pn = fn(p0) // new point
              cn = c0
              coords = [ p0, pn ]
            } else {
              let p = fn(pn) // new point
              coords = [ pn, p ]
              pn = p
              cn = (c0 + cn) / 2 // new color
            }

            let x = pn[0]
            let y = pn[1]
            let r = Math.sqrt(x * x + y * y)
            let r2 = x * x + y * y
            let theta = Math.atan2(y, x)
            let fi = Math.atan2(x, y)

            // pn = [x / r2, y / r2 ]
            // pn = [x , y ]
            // pn = [Math.sin(Math.PI * x) , Math.sin(Math.PI * y) ]
            pn = [x * Math.sin(r2) - y * Math.cos(r2), x * Math.cos(r2) + y * Math.sin(r2) ]

            let f = {
              type: 'Feature',
              geometry: {
              // type: 'LineString', //'Point', //
              // coordinates: coords, // [[i * 3,i * 3], [ (i+1) * 3, (i+1) * 3]],
                type: 'Point', //
                coordinates: pn, // [[i * 3,i * 3], [ (i+1) * 3, (i+1) * 3]],
              },
              properties: {
                pointRadius: pointRadius,
                eocrom: { 'csx': 0, 'cf': cn, 'cs': cn, 'cw': 1.99, 'co': 0.6, 'cp': 0.1 },
              },
            }
            features.push(f)
          }
          let gj = {
            type: 'FeatureCollection',
            features: features,
          }
          return gj
        },

        eocrom: { 'csx': 0, 'cf': [[[444, 666]]], 'cs': [[[766, 999]]], 'cw': [[[0.7, 0.9]]], 'co': [[[0.1, 0.1]]], 'cp': [[[0.9, 0.9]]]},
        eomot: {
          proform: {
            projection: 'uniwen',
            scale: 200,
            translate: {'x': 0, 'y': 0 },
            prerotate: [[[ ctl.rotation ]]],
            rotate: [ 60, 0, -90 ],
          },
        },
        eoload: {},
      }

      let aniForm2 = {

        eotim: { td: 18200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 },
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani2' },
        eohal: eonEohalMars,

        eofold: ani => {
        // fractal geoframe algorithms http://flam3.com/flame.pdf
        // Sierpinski’s Gasket
          let fn1 = ([x, y]) => [ x / 2, y / 2 ]
          let fn2 = ([x, y]) => [ (x + 1) / 2, y / 2 ]
          let fn3 = ([x, y]) => [ x / 2, (y + 1) / 2 ]
          let fns = [fn1, fn2, fn3]
          let cs = [100, 500, 900]

          // Initials
          let p0 = [ 0 + 1 * (0.5 - Math.random()), 0 + 1 * (0.5 - Math.random())], pn
          let c0 = 900 + 50 * (0.5 - Math.random()), cn
          let iters = 500 + 100 * (0.5 - Math.random())
          let pointRadius = 6.99 + 2 * (0.5 - Math.random())

          let features = []

          for (let i = 0; i < iters; i++) {
            let fx = Math.floor(fns.length * Math.random()) // random index
            let fn = fns[fx] // random function
            let cn = cs[fx] // random color

            let coords
            if (i === 0) {
              pn = fn(p0) // new point
              cn = c0
              coords = [ p0, pn ]
            } else {
              let p = fn(pn) // new point
              coords = [ pn, p ]
              pn = p
              cn = (c0 + cn) / 2 // new color
            }

            let x = pn[0]
            let y = pn[1]
            let r = Math.sqrt(x * x + y * y)
            let r2 = x * x + y * y
            let theta = Math.atan2(y, x)
            let fi = Math.atan2(x, y)

            // pn = [x / r2, y / r2 ]
            // pn = [x , y ]
            // pn = [Math.sin(Math.PI * x) , Math.sin(Math.PI * y) ]
            pn = [x * Math.sin(r2) - y * Math.cos(r2), x * Math.cos(r2) + y * Math.sin(r2) ]

            let f = {
              type: 'Feature',
              geometry: {
                type: 'LineString', // 'Point', //
                coordinates: coords, // [[i * 3,i * 3], [ (i+1) * 3, (i+1) * 3]],
              // type: 'Point', //
              // coordinates:  pn, // [[i * 3,i * 3], [ (i+1) * 3, (i+1) * 3]],
              },
              properties: {
                pointRadius: pointRadius,
                eocrom: { 'csx': 0, 'cf': cn, 'cs': cn, 'cw': 1.99, 'co': 0.6, 'cp': 0.1 },
              },
            }
            if (cn < 750) features.push(f)
          }
          let gj = {
            type: 'FeatureCollection',
            features: features,
          }
          return gj
        },

        eocrom: { 'csx': 0, 'cf': [[[444, 666]]], 'cs': [[[766, 999]]], 'cw': [[[0.7, 0.9]]], 'co': [[[0.1, 0.1]]], 'cp': [[[0.9, 0.9]]]},
        eomot: {
          proform: {
            projection: 'uniwen',
            scale: 200,
            translate: {'x': 0, 'y': 0 },
            prerotate: [[[ ctl.rotation ]]],
            rotate: [ 60, 0, -90 ],
          },
        },
        eoload: {},
      }

      // .................. animas
      let animas = [
        aniForm2, // h.mars
        aniForm, // h.mars
      ]
      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ723bFfa = anitem
}))
