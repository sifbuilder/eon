/* ******************************************
   *    @eonZ713aMultiline
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ713aMultiline = global.eonZ713aMultiline || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    d3,
    d3Geo,
    THREE,
    d3Force3d,
    ctlWen,
    eohalMars,
    eohalSol,
    muonGraticule,
    muonGeom,
    protonNatform,
    renderPortview,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').b('d3-geo'),
    __eo('xs').b('three'),
    __eo('xs').b('d3-force-3d'),
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').e('sol'),
    __eo('xs').m('graticule'),
    __eo('xs').m('geom'),
    __eo('xs').p('natform'),
    __eo('xs').r('portview'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) { }
  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = ctlWen().control(renderSvg.svg())
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

    let geoframe = [ [ [ -180, 180, 90, 90], [ -90, 90, 70, 70] ] ]

    let proform = {
      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [0, 0, 0],
      scale: 1,
      rotate: [ 90, 0, 0],
      lens: [ 0, 1, Infinity ],
    }

    // .................. natAni
    let natAni = {

      eohal: eohalMars,
      eotim,
      eoric: {gid: 'ani', cid: 'ani', fid: 'ani'},

      eofold: ani => muonGraticule.gjfMultiLineString(ani.eoload.eoframe),

      eomot: {
        conform: {
          projection: 'natform',
          eoform: conform,
        },   
        proform: proform,
      },

      eoload: {
        eocrom: { 'csx': 0, 'cf': 222, 'cs': 888, 'cw': 0.9, 'co': 0.99, 'cp': 0.9 },
        eoframe: geoframe,        
      },
    }

    // .................. animas
    let animas = [

      natAni,

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ713aMultiline = anitem
}))
