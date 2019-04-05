/* ******************************************
   *    @z419ePacerNatEoloadAnify
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.z419ePacerNatEoloadAnify = global.z419ePacerNatEoloadAnify || {})))
}(this, function (exports) {
  'use strict'

  // .................. anitem
  async function anitem (__eo) {
    // .................. eons
    let [
      ctlRayder,
      ctlWen,
      eohalNatform,
      eohalMars,
      eohalPacer,
      muonEoric,
      muonNatform,
      protonUniwen,
      renderSvg,
    ] = await Promise.all([
      __eo('xs').c('rayder'),
      __eo('xs').c('wen'),
      __eo('xs').e('natform'),
      __eo('xs').e('mars'),
      __eo('xs').e('pacer'),
      __eo('xs').m('eoric'),
      __eo('xs').m('natform'),
      __eo('xs').p('uniwen'),
      __eo('xs').r('svg'),
    ])

    let muonStore = __eo('muonStore')
    try { renderSvg.scenecolor('black') } catch (e) {}
    // .................. animas
    let z = function () {
      // .................. pics
      let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      // ....................... pacerNat
      let pacerNat = {

        eohal: 'pacer',
        eoric: { gid: 'g', cid: 'c', fid: 'pacer' },

        eoload: {

          pacer: {

            pacedby: {
              initN: 2, eventN: 0, autoN: 1, autoP: 0.1, 
              outtimed: 0, maxN: 60, 
              geospan: 0,
              basePaceOnAniView: '',
              addItemToPacer: 0,
            },

            anima: {
              eotim: eotim,
              eohal: 'mars',

              eoric: function (ani, props) {
                let eoric = { gid: 'g', cid: 'c', fid: 'paced' }
console.log(props)
                if (props !== undefined) {
                  if (props.key === 'init') { // INIT
                    let q = muonStore.animasInClassHowMany(eoric)
                    let nextq = q++ // store updated between items
                    eoric.fid = muonEoric.idify(eoric.fid, props.key, nextq)
                  } else if (props.key === 'auto') { // AUTO
                    let q = muonStore.animasInClassHowMany(eoric)
                    let nextq = q + props.counter
                    eoric.fid = muonEoric.idify(eoric.fid, props.key, nextq)
                  } else if (props.key === 'event') { // EVENT
                    let q = muonStore.animasInClassHowMany(eoric)
                    let nextq = q + props.counter
                    eoric.fid = muonEoric.idify(eoric.fid, props.key, nextq)
                  }
                  eoric.uid = muonEoric.getuid(eoric)
                }

                return eoric
              },

              eofold: function (ani, props) {
                return a => muonNatform.natMultiLineString({eoform: a.eoload.eoform})
              },

              eonode: function (ani, props) {
                let eonode = {
                  type: 'Feature',
                  geometry: { type: 'Point', coordinates: [0, 0, 0] },
                  properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
                }

                if (props !== undefined) {
                  let stace = [0, 0, 0]
                  if (props.key === 'init') { // INIT
                    let autocount = props.counter
                    let C1 = 50
                    let C2 = 2
                    stace = [0, Math.pow(-1, autocount) * C1 * Math.max(1, autocount % C2), 0]
                  } else if (props.key === 'auto') { // AUTO
                    stace = [ 0 + 20 * Math.random(), 0 + 20 * Math.random(), 0]
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
                  eonode = {
                    type: 'Feature',
                    geometry: { type: 'Point', coordinates: coordinates },
                    properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
                  }
                }
                return eonode
              },

              eomot: {
                proform: {
                  projection: 'uniwen',
                  translate: [ [[[0, 250]]], 0, 0], // mot
                  scale: 1,
                  rotate: [ 0, 0, 0 ],
                  lens: [0, 1, Infinity],
                  addNodeToTranslate: 1, // eonode
                },
              },

              eoload: {
                eocrom: { 'csx': 0, 'cf': 777, 'co': 1, 'cs': 222 + 200 * (0.5 - Math.random()), 'cw': 1.5, 'cp': 1},
                eoform: {
                  x: {
                    'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
                    'ra2': [[[6, 60]]], 'v0': 0, 'v1': 1, 'seg5': 36, 'w4': 0, 'pa6': 0, 'pb7': 360,
                  },
                  y: {
                    'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
                    'ra2': [[[6, 60]]], 'v0': 0, 'v1': 1, 'seg5': 36, 'w4': 0, 'pa6': 0, 'pb7': 360,
                  },
                },

              },
            }, // end anima

          },
        },
      }

      // .................. scene
      let scene = {
        pacerNat, // h.pacer
      }
      return scene
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.z419ePacerNatEoloadAnify = anitem
}))
