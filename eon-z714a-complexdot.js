/* ******************************************
   *    @eonZ714aComplexdot
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ714aComplexdot = global.eonZ714aComplexdot || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlWen,
    eonMuonNatform,
    eonMuonProps,
    eonMuonGraticule,
    lcomplex,
    eonEohalMars,
    eonEohalNatform,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-muon-graticule'),
    __eo('xs').b('eon-lib-complex'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) { }
  let Complex = __eo('eonLibComplex')

  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos

    let proform = {
      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [0, 0, 0],
      scale: 1,
      rotate: [ 0, [[[0, 360]]], 0 ],
      lens: [ 0, 1, Infinity ],
    }

    // .................. natAni
    let natAni = {

      eohal: eonEohalMars,

      eofold: d => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: Complex({re: 0, im: 0})
            .add(
              d.eoload.zenform[0] * Math.cos(d.eoload.zenform[1]),
              d.eoload.zenform[0] * Math.sin(d.eoload.zenform[1])
            )
            .toVector(),
        },
        properties: {
          pointRadius: 6,
          eonode: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [0, 0],
            },
            properties: {
              orgen: [0, 0],
              velin: [0, 0],
              velang: [0, 0],
              prevous: [0, 0],
              geodelta: [0, 0],
            },
          },
        },
      }),
      eotim,
      eoric: {gid: 'ani', cid: 'ani', fid: 'ani'},
      eocrom: { 'csx': 0, 'cf': 222, 'cs': 888, 'cw': 0.9, 'co': 0.99, 'cp': 0.9 },
      eomot: {
        proform: proform,
      },

      eoload: {
        zenform: [ [[[0, 100]]], [[[0, Math.PI]]] ],

      },
    }

    // .................. animas
    let animas = [

      natAni, // h.mars g.uniwen

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ714aComplexdot = anitem
}))
