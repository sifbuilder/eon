/* ******************************************
   *    @eonZ713dTiles
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ713dTiles = global.eonZ713dTiles || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    d3,
    d3Geo,
    THREE,
    d3Force3d,
    eonCtlWen,
    eonEohalMars,
    eonEohalSol,
    eonMuonGraticule,
    eonMuonGeom,
    eonProtonNatform,
    eonRenderPortview,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').b('d3-geo'),
    __eo('xs').b('three'),
    __eo('xs').b('d3-force-3d'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-sol'),
    __eo('xs').b('eon-muon-graticule'),
    __eo('xs').b('eon-muon-geom'),
    __eo('xs').b('eon-proton-natform'),
    __eo('xs').b('eon-render-portview'),
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
    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos

    let conform = {
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
        'dom3': [-90, 90],
        'fn0': (e, c, d) => c[3] * sin(e[3]),

      },
    }



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
      eotim,
      eoric: {gid: 'ani', cid: 'ani', fid: 'ani'},

      eofold: ani => eonMuonGraticule.gjfMultiLineString(ani.eoload.eoframe),

      eomot: {
        conform: {
          projection: 'natform',
          eoform: conform,
        },        

        proform: proform,
      },
      eoload: {
        eocrom: { 'csx': 0, 'cf': 222, 'cs': 888, 'cw': 0.9, 'co': 0.99, 'cp': 0.9 },

        eoframe: [ [ [ -180, 180, [[[72, 36, 72]]], [[[72, 36, 72]]] ],
          [ [[[-90, -360]]], [[[90, 360]]], [[[72, 36, 72]]], [[[72, 36, 72]]] ] ] ],

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
  exports.eonZ713dTiles = anitem
}))
