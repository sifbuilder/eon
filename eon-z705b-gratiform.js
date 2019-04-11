/* ******************************************
   *    @eonZ705bGratiform
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ705bGratiform = global.eonZ705bGratiform || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    ctlWen,
    eohalMars,
    muonGraticule,
    protonNatform,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').m('graticule'),
    __eo('xs').p('natform'),
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

    let sin = Math.sin, cos = Math.cos

    let eotim = {'td': 23800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let formNat = {
      'x': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, dax) => c[0] * cos(e[0]) * c[2] * cos(e[2]),

      },
      'y': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, dax) => c[1] * sin(e[0]) * c[2] * cos(e[2]),
      },
      'z': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, dax) => c[3] * sin(e[3]),

      },
    }

    let geoframe = [ [ [ -180, 180, 90, 5], [ -180, 180, 30, 5] ] ]

    let proform = {
      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [0, 0, 0],
      scale: 0.5,
      rotate: [ 0, 0, 0],
      lens: [ 0, 1, Infinity ],
    }

    // .................. gratiForm anima
    let gratiForm = {

      eotim,
      eohal: eohalMars,
      eoric: {'gid': 'grat', 'cid': 'grat', 'fid': 'gratiForm'},

      eofold: p => muonGraticule.gjfMultiLineString(p.eoframe), // hMultiLine

      eocrom: { 'csx': 0, 'cf': 666, 'cs': [[[555, 777]]], 'cw': [[[1.3, 1.9]]], 'co': 0.01, 'cp': 0.9 },

      eomot: {
        conform: {
          projection: 'natform',
          eoform: formNat,
        },

        proform: proform,
      },
      eoframe: geoframe,
      eoload: {

      },

    }

    // .................. animas
    let animas = [

      gratiForm, // h.mars

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ705bGratiform = anitem
}))