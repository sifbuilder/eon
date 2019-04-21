/* ******************************************
   *    @eonZ419gPacerDotEoloadGramify
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ419gPacerDotEoloadGramify = global.eonZ419gPacerDotEoloadGramify || {})))
}(this, function (exports) {
  'use strict'


// .................. anitem
async function anitem (__eo) {
    // .................. eons
    let [
      eonCtlRayder,
      eonCtlWen,
      eonEohalNatform,
      eonEohalMars,
      eonEohalPacer,
      eonEohalTextform,
      eonMuonNatform,
      eonMuonStace,
      eonProtonUniwen,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-rayder'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-natform'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-pacer'),
      __eo('xs').b('eon-eohal-textform'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-stace'),
      __eo('xs').b('eon-proton-uniwen'),
      __eo('xs').b('eon-render-svg'),
    ])
  
    let eonMuonStore = __eo('eonMuonStore')
    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    // .................. animas
    let z = function () {
      // .................. pics
      let eotim = {'td': 10000, 't0': 0, 't1': 1, 't2': 1, 't3': 1}
  
      // ............................. natAni
      let geoLined = {
  
        eohal: eonEohalPacer,
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
  
            pacedAnisort: 'anima',
            basePaceOnAniView: 'eoform',
            addItemToPacer: 1, // addItemToPacer for trace
  
            eohal: eonEohalMars,
  
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
                if (eonCtlRayder.grabbed() !== undefined) {
                  let grabbed = eonCtlRayder.grabbed()
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
    enty.z = z
    return enty
  }
  exports.eonZ419gPacerDotEoloadGramify = anitem
}))