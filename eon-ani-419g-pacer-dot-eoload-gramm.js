/* ******************************************
   *    @ani419gPacerDotEoloadGramm
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.ani419gPacerDotEoloadGramm = global.ani419gPacerDotEoloadGramm || {})))
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
    let ani = function () {
      // .................. pics
      let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}
  
      // ............................. natAni
      let geoLined = {
  
        eohal: eohalPacer,
        eotim: eotim,
        eoric: {gid: 'traces', cid: 'traces', fid: 'traceLine'},
  
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
          properties: {
            orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
          },
        },
  
        eoform: [ [[[-220, 220]]], 0, 0],
        eocrom: {'csx': 0, 'cf': 777, 'cs': 777, 'cw': 0.99, 'co': 0.4, 'cp': 0.99},
  
        eoload: {
  
          pacer: {
  
            initN: 0, eventN: 0, autoN: 1, autoP: 0, autoT: 0, 
            outtimed: 0, maxN: 60, 
            geospan: 0,
  
            paceAnisOfSort: 'anima',
            basePaceOnAniView: 'eoform',
            addItemToPacer: 1, // addItemToPacer for trace
  
            eohal: eohalMars,
  
            eofold: function (ani, props) {
  if (1 && 1) console.log('eofold', ani)            
              let coords
              if (props.key === 'init') { // INIT
                coords = ani.eonode.geometry.coordinates // eonode
  
              } else if (props.key === 'auto') { // AUTO
  if (1 && 1) console.log('eofold', ani.eoform)
                coords = ani.eoform // eofold
  
              } else if (props.key === 'event') { // EVENT
                coords = ani.eonode.geometry.coordinates
              }
  
              return {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: coords, },
                properties: {},
              }
            },
  
            eonode: function (ani, props) {
              let coords = [0, 0, 0]
              if (props.key === 'init') { // INIT
                // coords is ani's transformed eonode
  
                coords = [0, 0, 0]
                
              } else if (props.key === 'auto') { // AUTO
                coords = [0, 0, 0]
  
              } else if (props.key === 'event') { // EVENT
                if (ctlRayder.grabbed() !== undefined) {
                  let grabbed = ctlRayder.grabbed()
                  let x = grabbed[0]
                  let y = grabbed[1]
                  let z = 0
                  coords = {x, y, z }
                }
              }
  
              let res = {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: coords, },
                properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
              }
              return res
            },
  
          },
        },
      }
  
      // .................. scene
      let scene = {
        geoLined, // h.pacer
      }
  
      return scene
    }
  
    let enty = () => {}
    enty.ani = ani
    return enty
  }
  exports.ani419gPacerDotEoloadGramm = anitem
}))