/* ******************************************
   *    @eonZ419fPacerNatEoloadGramify
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ419fPacerNatEoloadGramify = global.eonZ419fPacerNatEoloadGramify || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    ctlRayder,
    ctlWen,
    eohalNatform,
    eohalMars,
    eohalPacer,
    eohalTextform,
    muonNatform,
    muonStace,
    protonUniwen,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').c('rayder'),
    __eo('xs').c('wen'),
    __eo('xs').e('natform'),
    __eo('xs').e('mars'),
    __eo('xs').e('pacer'),
    __eo('xs').e('textform'),
    __eo('xs').m('natform'),
    __eo('xs').m('stace'),
    __eo('xs').p('uniwen'),
    __eo('xs').r('svg'),
  ])

  let muonStore = __eo('muonStore')
  try { renderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    // .................. pics
    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // ............................. natAni
    let aniPaced = {

      eohal: eohalPacer,
      eotim: eotim,
      eoric: {gid: 'pacer', cid: 'pacer', fid: 'pacer'},

      eofold: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
      },

      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [ 0, 0, 0],
        },
        properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
      },

      eocrom: {'csx': 0, 'cf': 777, 'cs': 777, 'cw': 0.99, 'co': 0.4, 'cp': 0.99},
      eoform: {
        'x': {
          'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 16, 'v0': 0, 'v1': 1, 'seg5': 12, 'w4': 0, 'pa6': 0, 'pb7': 360,
        },
        'y': {
          'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 16, 'v0': 0, 'v1': 1, 'seg5': 12, 'w4': 0, 'pa6': 0, 'pb7': 360,
        },
      },

      eoload: {

        pacer: {

          initN: 0, eventN: 0, autoN: 1, autoP: 0, autoT: 0, outtimed: 0, maxN: 60, geospan: 0,

          pacedAnisort: 'anigram',
          basePaceOnAniView: 'viewform',
          addItemToPacer: 1, // addItemToPacer for trace

          eohal: eohalNatform,

          eofold: function (ani, props) {
            let coords
            if (props.key === 'init') { // INIT
              coords = ani.eonode.geometry.coordinates // eonode
            } else if (props.key === 'auto') { // AUTO
              coords = ani.eoform // eofold
            } else if (props.key === 'event') { // EVENT
              coords = ani.eonode.geometry.coordinates
            }
            return {
              type: 'Feature',
              geometry: {type: 'Point', coordinates: coords},
              properties: {},
            }
          },

          eonode: function (ani, props) {
            let stace = [0, 0, 0]
            if (props.key === 'init') { // INIT
              stace = [0, 0, 0]
            } else if (props.key === 'auto') { // AUTO
              stace = [0, 0, 0]
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
              geometry: { type: 'Point', coordinates: coordinates },
              properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
            }
            return res
          },

          eomot: {
            proform: {
              projection: 'uniwen',
              translate: [ [[[-200, 200]]], 0, 0],
              scale: 1,
              rotate: [0, 0, 0],
              lens: [0, 1, Infinity],
            },
          },

        },
      },
    }

    // .................. scene
    let scene = {
      aniPaced, // h.pacer
    }

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ419fPacerNatEoloadGramify = anitem
}))