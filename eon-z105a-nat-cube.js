/* ******************************************
   *    @eonZ105aNatCube
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ105aNatCube = global.eonZ105aNatCube || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    ctlWen,
    eohalNatform,
    eohalMars,
    muonAnimas,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').c('wen'),
    __eo('xs').e('natform'),
    __eo('xs').e('mars'),
    __eo('xs').m('animas'),
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

    let eotim = {td: 16800, t0: 0, t1: 1, t2: 1, t3: 1}

    let eocrom = { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.19, 0.19]]], 'cs': [[[777, 777]]], 'cw': [[[0.99, 0.99]]], 'cp': [[[0.9, 0.9]]]}

    // ............................. natAni
    let natAni1 = {
      eohal: eohalNatform,
      eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat1'},

      eofold: null,
      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ -200, 0, 0], // mot
          scale: 1,
          rotate: [ [[[0, 90]]], [[[0, 90]]], [[[0, 90]]] ],
          prerotate: [[[ ctl.rotation ]]],
          lens: [0, 1, Infinity],
          addNodeToTranslate: 1, // eonode
        },
      },

      eocrom: eocrom,
      eoform: {

        'x': {
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
        },

      },

      eoload: {},
    }

    // ............................. natAni
    let natAni2 = {
      eohal: eohalNatform,
      eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat2'},

      eofold: null,

      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ 0, 0, 0], // mot
          scale: 1,
          rotate: [ [[[0, 90]]], [[[0, 90]]], [[[0, 90]]] ],
          prerotate: [[[ ctl.rotation ]]],
          lens: [0, 1, Infinity],
          addNodeToTranslate: 1, // eonode
        },
      },

      eocrom: eocrom,
      eoform: {

        'x': {
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'ra2': 120 * Math.sqrt(2), 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 40, 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'ra2': 120 * Math.sqrt(2), 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 40, 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
        },
        'z': {
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 40, 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
        },

      },

      eoload: {},
    }

    // ............................. natAni
    let natAni3 = {
      eohal: eohalNatform,
      eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat3'},

      eofold: null,

      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ 200, 0, 0], // mot
          scale: 1,
          rotate: [ [[[0, 90]]], [[[0, 90]]], [[[0, 90]]] ],
          prerotate: [[[ ctl.rotation ]]],
          lens: [0, 1, Infinity],
          addNodeToTranslate: 1, // eonode
        },
      },

      eocrom: eocrom,
      eoform: {

        'x': {
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
        },

      },

      eoload: {},
    }

    // ............................. animas
    let animas = [
      natAni1, // h.natform
      natAni2, // h.natform
      natAni3, // h.natform

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ105aNatCube = anitem
}))