/* ******************************************
   *    @eonZ741hEohalForm
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ741hEohalForm = global.eonZ741hEohalForm || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    muonProps,
    muonStace,
    muonNatform,
    muonEoric,
    eohalMars,
    eohalNatform,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').m('props'),
    __eo('xs').m('stace'),
    __eo('xs').m('natform'),
    __eo('xs').m('eoric'),
    __eo('xs').e('mars'),
    __eo('xs').e('natform'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
  let muonStore = __eo('muonStore')

  // .................. animas
  let z = function () {
    // .................. pics

    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let natForm = {
      'x': {
        'm1': 3, 'm2': 3, 'n1': 1, 'n2': 1.2, 'n3': 1.2, 'a': 1, 'b': 1, // reaulau
        'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 36, 'w4': 0, 'pa6': 0, 'pb7': -1,
      },
      'y': {

        'm1': 3, 'm2': 3, 'n1': 1, 'n2': 1.2, 'n3': 1.2, 'a': 1, 'b': 1, // reaulau
        'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 36, 'w4': 0, 'pa6': 0, 'pb7': -1,
      },
    }

    let natStace = {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 4, 'b': 2, // ellipse
      'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
    }

    let natGeochrom = { 'csx': 0, 'cf': [[[222, 444, 275]]], 'co': [[[0.59, 0.59]]], 'cs': [[[444, 444]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.7, 0.9]]]}

    // ............................. eohal

    let eohalIsolation_anify = anima => { // ANIFY
      let newAnimas = []
      let animas = (anima.eoinited !== 1) ? (anima.eoinited = anima.eogelded = 1, [anima]) : []

      const perimeter = 12, length = 30

      const getId = (col, row) => `${col},${row}`

      let nodes = [], links = []
      for (let colIdx = 0; colIdx < perimeter; colIdx++) {
        for (let rowIdx = 0; rowIdx < length; rowIdx++) {
          const id = getId(colIdx, rowIdx)
          nodes.push({id})

          if (rowIdx > 0) { // Link vertically
            links.push({ source: getId(colIdx, rowIdx - 1), target: id })
          }

          // Link horizontally
          links.push({ source: getId((colIdx || perimeter) - 1, rowIdx), target: id })
        }
      }
      let r = { nodes, links }

      let nbr = 2
      for (let i = 0; i < nbr; i++) {
        let ani = muonProps.cloneObj(natAni) // clone of model anima
        ani.eoric.gid = 'nat'
        ani.eoric.cid = (i % 2) ? 'orange' : 'gold'
        ani.eoric.fid = 'item' + i // identify

        let uid = muonEoric.getuid(ani.eoric)
        ani.uid = uid
        ani.eocrom.cf = (i % 2) ? 777 : 333
        ani.eocrom.cs = (i % 2) ? 777 : 333

        let preani = muonStore.animas()[ani.eoric.ric]

        if (preani) {
          ani = preani
        } else { // create anima
          ani.eohal = 'natform' // eohal ENT

          ani.eofold = { // will create anigram
            type: 'Feature',
            geometry: {type: 'Point', coordinates: [i * 10, 0, 0]}, // sparation
          }

          ani.eonode.properties.orgen = [0, 0, 0 ]
        }
        newAnimas.push(ani)
      }

      return newAnimas
    }

    let eohalIsolation_gramify = anima => [] // GRAMIFY))

    let eohalIsolationHalo = {}
    eohalIsolationHalo.anify = anima => eohalIsolation_anify(anima)
    eohalIsolationHalo.gramify = anima => eohalIsolation_gramify(anima)

    // ............................. natAni
    let natAni = {

      eohal: eohalIsolationHalo, // 'mars',

      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),

      eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat'},

      eonode: {
        type: 'Feature',
        geometry: {type: 'Point', coordinates: [0, 0, 0]},
        properties: {orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
      },

      eomot: {
        proform: {
          projection: 'uniwen',
          translate:
          [
            [ [[[0, 100]]], 0, 100 ],
            [[[ {
              'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 4, 'b': 2, // circle
              'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
            } ]]],
          ],
          scale: 1,
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity],
        },
      },

      eocrom: { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.49, 0.49]]], 'cs': [[[666, 666]]], 'cw': [[[0.3, 0.9]]], 'cp': [[[0.7, 0.9]]]},

      eoform: {

        'x': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 12, 'w4': 0, 'pa6': 0, 'pb7': 360,
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 12, 'w4': 0, 'pa6': 0, 'pb7': 360,
        },
        'z': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 12, 'w4': 0, 'pa6': 0, 'pb7': 360,
        },

      },
      eoload: {
      },
    }

    // ............................. animas
    let animas = [

      natAni, // h.eohalIsolationHalo

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ741hEohalForm = anitem
}))