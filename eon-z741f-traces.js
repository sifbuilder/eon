/* ******************************************
   *    @eonZ741fTraces
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ741fTraces = global.eonZ741fTraces || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    ctlWen,
    eohalMars,
    eohalNatform,
    eohalPacer,
    muonProps,
    muonNatform,
    muonEoric,
    muonStace,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').c('wen'),
    __eo('xs').e('mars'),
    __eo('xs').e('natform'),
    __eo('xs').e('pacer'),
    __eo('xs').m('props'),
    __eo('xs').m('natform'),
    __eo('xs').m('eoric'),
    __eo('xs').m('stace'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
  let muonStore = __eo('muonStore')

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

    let natForm = {

      'x': {

        'm1': 3, 'm2': 3, 'n1': 1, 'n2': 1.2, 'n3': 1.2, 'a': 1, 'b': 1, // reaulau
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 2, 'b': 1, // ellipse
        'ra2': 32, 'v0': 0, 'v1': 1, 'seg5': 180, 'w4': 0, 'pa6': 0, 'pb7': 360,
      },

      'y': {

        'm1': 3, 'm2': 3, 'n1': 1, 'n2': 1.2, 'n3': 1.2, 'a': 1, 'b': 1, // reaulau
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 2, 'b': 1, // ellipse
        'ra2': 32, 'v0': 0, 'v1': 1, 'seg5': 180, 'w4': 0, 'pa6': 0, 'pb7': 360,

      },

    }

    let natStace = {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
    }

    let natProform = {
      'projection': 'uniwen',
      'prerotate': [[[ ctl.rotation ]]],

      'translate': [ [ -0, -0 ], [[[ natStace ]]] ], //
      'scale': 1,
      'rotate': [ 0, 0, 0 ],
      'lens': [0, 1, Infinity],

    }

    let natGeochrom = { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.29, 0.29]]], 'cs': [[[555, 666]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.7, 0.9]]]}

    let traceGeochrom = { 'csx': 0, 'cf': [[[777, 777]]], 'co': [[[0.09, 0.09]]], 'cs': [[[777, 777]]], 'cw': [[[0.7, 0.7]]], 'cp': [[[0.99, 0.99]]]}

    // ....................... natAnitem anima
    let natAnitem = {

      eohal: eohalMars,

      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),

      eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat'},
      eocrom: natGeochrom,
      proform: natProform,
      eoform: natForm,

      eonode: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0, 0] },
        properties: {orgen: null, velin: null, velang: null, prevous: null, geodelta: null},
      },

      eoload: {
      },
    }

    // ....................... traceLine avatar
    let traceLine = {

      eohal: eohalPacer,

      eofold: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: null,
        },
        properties: {},
      },
      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {},
      },

      eotim,
      eoric: {gid: 'traces', cid: 'traces', fid: 'traceLine'},
      eocrom: {'csx': 0, 'cf': 444, 'cs': 666, 'cw': 0.99, 'co': 0.4, 'cp': 0.99},

      eoload: {
        pacer: { // addItemToPacer for trace
          eohal: eohalMars,
          pacedAnisort: 'anigram',
          basePaceOnAniView: 'geo',
          initN: 0, eventN: 0, autoN: 1, autoP: 0, autoT: 0, outtimed: 0, maxN: 60, geospan: 0, addItemToPacer: 1,

          stace: function (ani, props) {
            let stace
            if (props.key === 'init') { // INIT
              stace = {x: 0, y: 0, z: 0 }
            } else if (props.key === 'auto') { // AUTO
              stace = muonStace.getLocus(ani.eoload.pacer.stace, ani) // AUTO
            } else if (props.key === 'event') { // EVENT
              stace = {x: 0, y: 0, z: 0 }
            }
            return stace
          },

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
    // ....................... traceform
    let traceform = {

      eohal: eohalPacer,

      eotim,
      eoric: {gid: 'trace', cid: 'trace', fid: 'traceform'},
      eocrom: traceGeochrom,

      form: {
        x: {
          'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
        },
        y: {
          'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
        },
      },

      eomot: {
        proform: {

          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          scale: 1,
          translate: {
            x: { pos: [[[0, 0]]] },
            y: { pos: [[[0, 0]]] },
            z: 0,
          },
          rotate: [ 0, 0, 0 ],

        },
      },

      eoload: {
        pacer: {
          initN: 0, eventN: 0, autoN: 1, autoP: 0.01, outtimed: 0, maxN: 60, geospan: 0, addItemToPacer: 1,

          geofolder: function (ani, prob) {
            let eofold = {
              type: 'Feature',
              geometry: { type: 'LineString', coordinates: null },
              properties: {},
            }

            let eoric = ani.eoric
            let uid = muonEoric.getuid(eoric)

            let anitem = muonStore.findAnigramFromUid(uid)
            if (anitem !== undefined && anitem.eofold !== undefined) {
              eofold = anitem.eofold

              if (eofold.properties.formGeoformed) { // revert geometry to geoformed
                eofold.geometry = eofold.properties.formGeoformed.geometry
              }
            }

            return eofold
          },

        },
      },
    }

    // ....................... animaApi
    natAnitem.avatars = {

      traceLine, // h.pacer

    }

    let animas = [

      natAnitem, // h.natform

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ741fTraces = anitem
}))