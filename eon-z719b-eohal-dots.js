/* ******************************************
   *    @eonZ719bEohalDots
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ719bEohalDots = global.eonZ719bEohalDots || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    muonProps,
    muonEoforces,
    muonNatform,
    d3Force3d,
    renderPortview,
    ctlRayder,
    muonEoric,
    eohalMars,
    eohalNatform,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').m('props'),
    __eo('xs').m('eoforces'),
    __eo('xs').m('natform'),
    __eo('xs').b('d3-force-3d'),
    __eo('xs').r('portview'),
    __eo('xs').c('rayder'),
    __eo('xs').m('eoric'),
    __eo('xs').e('mars'),
    __eo('xs').e('natform'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) { }
  let muonStore = __eo('muonStore')
  // .................. animas
  let z = function () {
    let width = renderPortview.width(),
      height = renderPortview.height()

    let eohalIsolation_anify = anima => { // eohal ANIFY
      let animas = (anima.eoinited !== 1) ? (anima.eoinited = anima.eogelded = 1, [anima]) : []

      let nbr = 12

      for (let i = 0; i < nbr; i++) {
        let ani = muonProps.cloneObj(natAni) // clone of model anima
        ani.eoric.gid = 'nat'
        ani.eoric.cid = 'nat'
        ani.eoric.fid = 'item' + i // identify

        let uid = muonEoric.getuid(ani.eoric)
        ani.eoric.uid = uid

        let preani = muonStore.findAnimaFromUid(ani.eoric.uid)

        if (preani) {
          ani = preani
        } else { // create anima
          ani.eohal = 'natform' // create eohal

          ani.eofold = { // will create anigram
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [ 10 * i, 0, 0],
            },
            properties: {pointRadius: 36},
          }

          ani.eonode.properties.orgen = [0, 0, 0 ]
        }
        animas.push(ani)
      }

      muonStore.apply({type: 'UPDANIMA', animas: animas}) // live
      return animas
    }

    let eohalIsolation_gramify = anima => [] // eohal GRAMIFY))

    let isolation = {
      anify: anima => eohalIsolation_anify(anima),
      gramify: anima => eohalIsolation_gramify(anima),
    }

    // .................... pics
    let eotim = {'td': 52800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // .................... natAni
    let natAni = {

      eohal: isolation, // eohal defines anify and gramify behavior

      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),

      eotim: eotim,
      eoric: {gid: 'ani', cid: 'ani', fid: 'natAni'},

      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
      },
      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [0, 0, 0],
          scale: 1,
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, 12],
          addNodeToTranslate: 1,
        },
      },
      eocrom: { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.49, 0.49]]], 'cs': [[[666, 666]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.7, 0.9]]]},

      eoform: {

        'x': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 12, 'w4': [[[90, 90 - 0 * 360]]], 'pa6': 0, 'pb7': 360,
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 12, 'w4': [[[90, 90 - 0 * 360]]], 'pa6': 0, 'pb7': 360,
        },

      },
      eoload: {
      },
    }

    // .................. animas
    let animas = [

      natAni, // h.isolation

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ719bEohalDots = anitem
}))