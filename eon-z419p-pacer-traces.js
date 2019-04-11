/* ******************************************
   *    @eonZ419pPacerTraces
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ419pPacerTraces = global.eonZ419pPacerTraces || {})))
}(this, function (exports) {
  'use strict'

  // .................. anitem
  async function anitem (__eo) {
  // .................. eons
    let [
      ctlRayder,
      ctlWen,
      eohalNatform,
      eohalPacer,
      eohalTextform,
      eohalMars,
      muonGeoj,
      muonNatform,
      muonStace,
      protonUniwen,
      renderSvg,
    ] = await Promise.all([
      __eo('xs').c('rayder'),
      __eo('xs').c('wen'),
      __eo('xs').e('natform'),
      __eo('xs').e('pacer'),
      __eo('xs').e('textform'),
      __eo('xs').e('mars'),
      __eo('xs').m('geoj'),
      __eo('xs').m('natform'),
      __eo('xs').m('stace'),
      __eo('xs').p('uniwen'),
      __eo('xs').r('svg'),
    ])

    let muonStore = __eo('muonStore')
    try { renderSvg.scenecolor('black') } catch (e) {}

    let ctl
    try {
      ctl = ctlWen().control(renderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    // .................. animas
    let z = function () {
    // .................. pics

      let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      // .................. pointTrace
      let pointTrace = {

        eohal: eohalPacer,

        eofold: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0, 0],
          },
          properties: {},
        },

        eonode: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0, 0],
          },
          properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
        },

        eotim: eotim,

        eoric: {
          gid: 'nat',
          cid: 'nat',
          fid: 'pointTrace',
        },

        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [0, 0, 0],
            scale: 1,
            rotate: [0, 0, 0],
            lens: [0, 1, Infinity],
          },
        },

        eocrom: { 'csx': 0, 'cf': [[[444, 999]]], 'co': [[[0.9, 0.9]]], 'cs': [[[555, 999]]], 'cw': [[[2.7, 2.7]]], 'cp': [[[0.9, 0.9]]]},

        eoload: {
          pacer: {
            pacedAnisort: 'anigram',
            basePaceOnAniView: 'eoform',
            initN: 0, eventN: 1, autoN: 0, autoP: 0.1, outtimed: 0, maxN: 60, geospan: 0,
            addItemToPacer: 0,

            eohal: (ani, props) => 'mars',
            eoric: function (ani, props) {
              let counter = props.counter || 0

              let fidsuffix = ''
              if (props.key === 'event') {
                let hm = muonStore.anigramsInClassHowMany(ani)
                let pacecount = hm + 1
                fidsuffix = `_${hm}`
              }

              let eoric = {
                gid: 'nat',
                cid: 'nat',
                fid: `pointTrace${fidsuffix}`,
              }
              return eoric
            },

            eofold: function (ani, props) {
              let stace = [0, 0, 0]
              if (props.key === 'init') { // INIT
                stace = muonStace.getLocus([null, null, null], ani)
              } else if (props.key === 'auto') { // AUTO
                stace = muonStace.getLocus([null, null, null], ani)
              } else if (props.key === 'event') { // EVENT
                if (ctlRayder.grabbed() !== undefined) {
                  let grabbed = ctlRayder.grabbed()
                  let x = grabbed[0]
                  let y = grabbed[1]
                  let z = 0
                  stace = [x, y, z]
                }
              }
              let coordinates = stace
              let res = {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: coordinates,
                },
                properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
              }
              return res
            },

          },
        },
      }

      // ....................... natLeaform
      let natLeaform = {

        eohal: eohalMars,

        // ... eonode reflects the geometry of the form
        // ... updated by transforms
        // ... relative to eonode
        // ... as eonode, properties keep transformed views
        eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),

        eotim: eotim,
        eoric: {'gid': 'nat', 'cid': 'nat', 'fid': 'nat'},
        eocrom: { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.29, 0.29]]], 'cs': [[[555, 666]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.7, 0.9]]]},
        eomot: {
          proform: {
            projection: 'uniwen',
            prerotate: [[[ ctl.rotation ]]],
            translate: [ [ 70, 80 ], [[[ {
              'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 4, 'b': 2, // circle
              'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
            } ]]] ], //
            scale: 1,
            rotate: [ 0, 0, 0 ],
            lens: [0, 1, Infinity],
          },
        },
        // ... eonode is reference to eofold
        // ... updated by sim forces
        // ... as eofold, properties keep transformed views
        eonode: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0, 0],
          },
          // ... orgen, velin, prevous needed in force fields
          properties: {
            orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
          },
        },
        eoform: {
          'x': {
            'm1': 3, 'm2': 3, 'n1': 1, 'n2': 1.2, 'n3': 1.2, 'a': 1, 'b': 1, // reaulau
            'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 24, 'w4': 0, 'pa6': 0, 'pb7': 360,
          },
          'y': {
            'm1': 3, 'm2': 3, 'n1': 1, 'n2': 1.2, 'n3': 1.2, 'a': 1, 'b': 1, // reaulau
            'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 24, 'w4': 0, 'pa6': 0, 'pb7': 360,
          },
        },

        eoload: {},

      }

      // ....................... traceNat
      let traceNat = {

        eoric: { gid: 'nattrace', cid: 'nattrace', fid: 'traceNat', },
        eotim: eotim,
        eohal: eohalPacer,

        eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),

        eonode: {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0], },
          properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
        },

        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [0, 0, 0],
            scale: 1,
            rotate: [ 0, 0, 0 ],
            lens: [0, 1, Infinity],
            addNodeToTranslate: 1, // eonode
          },
        },

        eocrom: { 'csx': 0, 'cf': 777, 'co': 1, 'cs': 666 + 200 * (0.5 - Math.random()), 'cw': 1.5, 'cp': 1},

        eoform: {
          'x': {
            'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
            'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
          },
          'y': {
            'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
            'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
          },
        },

        eoload: {
          pacer: {
            eohal: eohalMars,
            pacedAnisort: 'anigram',
            basePaceOnAniView: 'viewform',
            initN: 0, eventN: 0, autoN: 1, autoP: 0.01, 
            outtimed: 0, maxN: 60, 
            geospan: 0, 
            addItemToPacer: 0,

            eonode: function (ani, props) {


              let stace = [0, 0, 0]

              if (props.key === 'init') { // INIT
              // stace is ani's transformed eonode
                stace = muonStace.getLocus([null, null, null], ani)

              } else if (props.key === 'auto') { // AUTO
                stace = muonStace.getLocus([null, null, null], ani)

              } else if (props.key === 'event') { // EVENT
                if (ctlRayder.grabbed() !== undefined) {
                  let grabbed = ctlRayder.grabbed()
                  let x = grabbed[0]
                  let y = grabbed[1]
                  let z = 0
                  stace = {x, y, z }
                }
              }
console.log('*********** ani:', stace, ani)
              let feature = {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: stace, },
                properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
              }
              return feature
            },

          },
        },
      }

      // ....................... animapi
      natLeaform.avatars = {

        traceNat, // h.pacer

      }

      // .................. scene
      let scene = {
        natLeaform, // h.pacer
      }

      return scene
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ419pPacerTraces = anitem
}))
