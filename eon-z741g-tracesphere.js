/* ******************************************
   *    @eonZ741gTracesphere
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ741gTracesphere = global.eonZ741gTracesphere || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonEohalMars,
    eonEohalNatform,
    eonEohalPacer,
    eonMuonStace,
    eonMuonNatform,
    eonMuonEoric,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-eohal-pacer'),
    __eo('xs').b('eon-muon-stace'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-eoric'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  let eonMuonStore = __eo('eonMuonStore')

  // .................. animas
  let z = function () {
    // .................. pics

    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}
    let traceForm = {

      'x': {
        'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
        'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
      },
      'y': {
        'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
        'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
      },
    }

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

    let traceGeochrom = { 'csx': 0, 'cf': [[[333, 333]]], 'co': [[[0.09, 0.09]]], 'cs': [[[444, 444]]], 'cw': [[[0.7, 0.7]]], 'cp': [[[0.99, 0.99]]]}

    // ............................. sphereAni
    let sphereAni = {

      eohal: eonEohalMars,

      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),

      eotim,
      eoric: {'gid': 'nat', 'cid': 'nat', 'fid': 'sphere'},

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

    // ............................. traceLine
    let traceLine = {

      eohal: eonEohalPacer,

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
          eohal: eonEohalMars,
          pacedAnisort: 'anigram',
          basePaceOnAniView: 'geo',
          initN: 0, eventN: 0, autoN: 1, autoP: 0, autoT: 0, outtimed: 0, maxN: 60, geospan: 0, addItemToPacer: 1,

          stace: function (ani, props) {
            let stace
            if (props.key === 'init') { // INIT
              stace = {x: 0, y: 0, z: 0 }
            } else if (props.key === 'auto') { // AUTO
              stace = eonMuonStace.getLocus(ani.eoload.pacer.stace, ani) // AUTO
            } else if (props.key === 'event') { // EVENT
              stace = {x: 0, y: 0, z: 0 }
            }
            return stace
          },

          eonode: function (ani, props) {
            let stace = [0, 0, 0]
            if (props.key === 'init') { // INIT
              // stace is ani's transformed eonode
              stace = eonMuonStace.getLocus([null, null, null], ani)
            } else if (props.key === 'auto') { // AUTO
              stace = eonMuonStace.getLocus([null, null, null], ani)
            } else if (props.key === 'event') { // EVENT
              if (eonCtlRayder.grabbed() !== undefined) {
                let grabbed = eonCtlRayder.grabbed()
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

    // ............................. avatars
    sphereAni.avatars = {

      traceLine, // h.pacer

    }
    // ............................. animas
    let animas = [

      sphereAni, // h.natform

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ741gTracesphere = anitem
}))
