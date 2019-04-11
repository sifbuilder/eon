/* ******************************************
   *    @eonZ189dChristmasTreestarsArray
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ189dChristmasTreestarsArray = global.eonZ189dChristmasTreestarsArray || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    // ctlRayder,
    ctlWen,
    eohalFuel,
    eohalNatform,
    eohalPacer,
    eohalTextform,
    eohalMars,
    muonEoric,
    muonGeoj,
    muonGraticule,
    muonNatform,
    muonProps,
    muonStace,
    protonUniwen,
    renderSvg,
  ] = await Promise.all([
    // __eo('xs').c('rayder'),
    __eo('xs').c('wen'),
    __eo('xs').e('fuel'),
    __eo('xs').e('natform'),
    __eo('xs').e('pacer'),
    __eo('xs').e('textform'),
    __eo('xs').e('mars'),
    __eo('xs').m('eoric'),
    __eo('xs').m('geoj'),
    __eo('xs').m('graticule'),
    __eo('xs').m('natform'),
    __eo('xs').m('props'),
    __eo('xs').m('stace'),
    __eo('xs').p('uniwen'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
  let muonStore = __eo('muonStore')

  // .................. animas
  let z = function () {
    // .................. pics
    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // ....................... natTree
    let natTree = {

      eohal: eohalMars,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'natTree'},

      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),
      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {
          orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
        },
      },
      eoform: {
        x: {
          'm1': 3, 'm2': 3, 'n1': 100, 'n2': 200, 'n3': 200, 'a': 1, 'b': 1,
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 3, 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
        },
        y: {
          'm1': 3, 'm2': 3, 'n1': 100, 'n2': 200, 'n3': 200, 'a': 1, 'b': 1,
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 3, 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
        },
      },
      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ 0, 0 ], //
          scale: [1, 1.5, 1],
          rotate: [ 0, 0, 30 ],
          lens: [0, 1, Infinity],
        },
      },
      eocrom: { 'csx': 0, 'cf': [[[100, 300]]], 'co': [[[0.29, 0.29]]], 'cs': [[[333, 333]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.7, 0.9]]]},

      eoload: {

      },

    }

    // ....................... natStar
    let natStar = {

      eohal: eohalPacer,
      eotim: eotim,
      eoric: { gid: 'pacer', cid: 'pacer', fid: 'pacer' },

      eofold: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {orgen: [0, 0, 0], velin: [0, 0, 0], velang: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
      },

      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {orgen: [0, 0, 0], velin: [0, 0, 0], velang: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
      },

      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ 0, 0, 0], // mot
          scale: 1,
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity],
          addNodeToTranslate: 1, // eonode
        },
      },

      eocrom: { 'csx': 0, 'cf': 777, 'co': 0.1, 'cs': 666 + 200 * (0.5 - Math.random()), 'cw': 1.5, 'cp': 1},

      eoform: {
        x: {
          'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': 15, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
        },
        y: {
          'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': 15, 'w4': 0, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
        },
      },

      eoload: {

        pacer: {

          initN: 10, eventN: 0, autoN: 1, autoP: 0.1, outtimed: 0, maxN: 60, geospan: 0,
          pacedAnisort: 'anima', // anima - avatar -> anigram
          basePaceOnAniView: 'viewform',
          addItemToPacer: 0,

          eohal: eohalNatform, // takes form from eoform
          eoric: function (ani, props) {
            let eoric = muonProps.clone(ani.eoric)
            eoric.gid = 'paced'
            eoric.cid = 'paced'
            eoric.fid = muonEoric.idify(eoric.fid, props.counter)
            eoric.uid = muonEoric.getuid(eoric)
            return eoric
          },

          eofold: function (ani, props) {
            let neweofold = muonNatform.natMultiLineString({eoform: ani.eoform})

            return neweofold
          },

          eonode: function (ani, props) {
            let coords = [0, 0, 0]
            if (props.key === 'init') { // INIT
              let autocount = props.counter

              let rows = 4
              let cols = 6
              let hstep = 1
              let vstep = 1

              let ridx = muonGraticule.ridx(rows, cols, hstep, vstep)
              let matrixCoord = ridx(autocount)

              let dRadX = 20
              let dRadY = 20
              let dLenX = 2 * dRadX
              let dLenY = 2 * dRadY
              let dCenter = [-140, -40]

              let delta = [
                dLenX + dRadX * Math.random(),
                dLenY + dRadY * Math.random(),
              ]

              coords = [
                dCenter[0] + delta[0] * matrixCoord[0],
                dCenter[1] + delta[1] * matrixCoord[1],
                0]
            } else if (props.key === 'auto') { // AUTO
              coords = [
                0 + 100 * Math.random(),
                0,
                0,
              ]
            } else if (props.key === 'event') { // EVENT
              if (ctlRayder.grabbed() !== undefined) {
                let grabbed = ctlRayder.grabbed()
                let x = grabbed[0]
                let y = grabbed[1]
                let z = 0
                coords = {x, y, z }
              }
            }

            let coordinates = coords
            let res = {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: coordinates,
              },
              properties: {orgen: [0, 0, 0], velin: [0, 0, 0], velang: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
            }
            return res
          },

        },
      },

    }

    natTree.avatars = { // pacer anigram if in avatar
      natStar,
    }

    // .................. animas
    let animas = [
      natTree,
      natStar,
    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ189dChristmasTreestarsArray = anitem
}))
