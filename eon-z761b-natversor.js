/* ******************************************
   *    @eonZ761bNatversor
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ761bNatversor = global.eonZ761bNatversor || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    muonNatform,
    muonProps,
    ctlVersor,
    d3Geo,
    eohalMars,
    eohalNatform,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').m('natform'),
    __eo('xs').m('props'),
    __eo('xs').c('versor'),
    __eo('xs').b('d3-geo'),
    __eo('xs').e('mars'),
    __eo('xs').e('natform'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = ctlWen().control(renderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let eotim = {'td': 11200, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let anima = {

      eohal: eohalMars,
      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),

      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat'},
      eocrom: {'csx': 0, 'cf': 555, 'cs': 333, 'cw': 0.9, 'co': 0.2, 'cp': 0.7},

      eoform: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
        'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 2, 'pa6': 0, 'pb7': -1,
      },
      eomot: {
        proform: {

          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          scale: 1,
          translate: { x: 0, y: 0, z: 0 },
          rotate: [ 0, 0, 0 ],

        },
      },
      eoload: {
      },
    }

    let animatter = {

      eohal: eohalMars,
      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),

      eotim: eotim,
      eoric: {gid: 'animatter', cid: 'animatter', fid: 'animatter'},
      eocrom: {'csx': 0, 'cf': 555, 'cs': 333, 'cw': 0.9, 'co': 0.09, 'cp': 0.7},
      eomot: {
        proform: {

          projection: d3Geo.geoOrthographic(),
          prerotate: [[[ ctl.rotation ]]],
          scale: 90,
          translate: [ 0, 0, 0 ],
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity],

        },
      },

      eoform: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
        'ra2': 20, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
      },
      eoload: {

      },
    }

    // .................. animas
    let animas = [

      anima, // h.mars
      animatter, // h.mars

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ761bNatversor = anitem
}))
