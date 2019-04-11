/* ******************************************
   *    @eonZ020aBorg
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ020aBorg = global.eonZ020aBorg || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    ctlWen,
    eohalNatform,
    muonStace,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').c('wen'),
    __eo('xs').e('natform'),
    __eo('xs').m('stace'),
    __eo('xs').r('svg'),
  ])
  let muonStore = __eo('muonStore ')
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

    let eotim = {td: 16800, t0: 0, t1: 1, t2: 1, t3: 1}
    let formPlanet = {
      'm1': -144, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
      'tx': 0,
      'ty': 0,
      'rot': -0,
      'rad': 1,
      'seg5': [[[3, 180]]],
      'cf': 522, 'cs': 222,
      'v0': 0, 'v1': -1,
    }

    let formSolar = {
      'm1': 4.718177045786351, 'm2': 19.396126213759022, 'n1': 15.313427387158098, 'n2': 10.738988564746812, 'n3': 15.119538381452617, 'b': 7.059625076609466, 'a': -13.981619631491435,
      'tx': 0,
      'ty': 0,
      'rot': 0,
      'rad': 45,
      'segs': 720,
      'pta': 0,
      'ptb': -1,
      'v0': 0, 'v1': 1,
      'cf': 522, 'cs': 422,
    }

    let stace = {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 4, 'b': 2, // circle
      'ra2': 30, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
    }

    let eocromCirc = { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.39, 0.39]]], 'cs': [[[111, 666]]], 'cw': [[[0.3, 0.9]]], 'cp': [[[0.7, 0.9]]]}

    let proform = {

      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      translate: [ [0, 0, 0], [[[ stace ]]] ],
      scale: 1,
      rotate: [ 0, 0, 90 ],
      lens: [0, 1, 12],

    }

    // ............................. animas
    let solarAni = {
      eohal: eohalNatform,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'solar'},

      eofold: ani => {
        let res = {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0] },
        }

        return res
      },

      eonode: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0, 0] },
        properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
      },
      eocrom: { 'csx': 0, 'cf': [[[444, 999]]], 'co': [[[0.9, 0.9]]], 'cs': [[[555, 999]]], 'cw': [[[2.7, 2.7]]], 'cp': [[[0.9, 0.9]]]},
      eomot: {
        proform,
      },
      eoload: {
        eoform: formSolar,

      },
    }

    let planetAni = {
      eohal: eohalNatform,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'planet'},

      eofold: ani => {
        let res = {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0] },
        }

        return res
      },

      eocrom: eocromCirc,
      eomot: {
        proform,
      },
      eoform: formPlanet,
      eoload: {
        pacer: {

          pacedAnisort: 'anima',
          basePaceOnAniView: 'eoform',
          initN: 0, eventN: 1, autoN: 0, autoP: 0.1, outtimed: 0, maxN: 60, geospan: 0,

          addItemToPacer: 0,

          eohal: (ani, props) => 'natform',
          eoric: function (ani, props) {
            let fidsuffix = ''
            if (props.key === 'event') {
              let hm = muonStore.anigramsInClassHowMany(ani)
              fidsuffix = `_${hm}`
            }

            let eoric = {
              gid: 'planet',
              cid: 'planet',
              fid: `pointTrace${fidsuffix}`,
            }
            return eoric
          },
          eonode: function (ani, props) {
            let stace = [0, 0, 0]
            if (props.key === 'init') { // INIT
              stace = muonStace.getLocus([null, null, null], ani)
            } else if (props.key === 'auto') { // AUTO
              stace = muonStace.getLocus([null, null, null], ani)
            } else if (props.key === 'event') { // EVENT
              stace = props.count.grabbed
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

          eoform: {
            'm1': -144, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
            'tx': 0,
            'ty': 0,
            'rot': -0,
            'rad': 1,
            'seg5': 12,
            'cf': 522, 'cs': 222,
            'v0': 0, 'v1': -1,
          },
          eoload: {},
        },
      },

    }

    // ............................. scene animas
    let animas = [
      solarAni, // h.natform
      planetAni, // h.natform
    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ020aBorg = anitem
}))