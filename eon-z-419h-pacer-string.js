/* ******************************************
   *    @z419hPacerString
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.z419hPacerString = global.z419hPacerString || {})))
}(this, function (exports) {
  'use strict'

 // .................. anitem
async function anitem (__eo) {
    // .................. eons
    let [
      ctlWen,
      muonNatform,
      muonStace,
      muonGeoj,
      ctlRayder,
      eohalMars,
      eohalNatform,
      eohalPacer,
      eohalTextform,
      protonUniwen,
      renderSvg,
    ] = await Promise.all([
      __eo('xs').c('wen'),
      __eo('xs').m('natform'),
      __eo('xs').m('stace'),
      __eo('xs').m('geoj'),
      __eo('xs').c('rayder'),
      __eo('xs').e('mars'),
      __eo('xs').e('natform'),
      __eo('xs').e('pacer'),
      __eo('xs').e('textform'),
      __eo('xs').p('uniwen'),
      __eo('xs').r('svg'),
    ])
  
    try { renderSvg.scenecolor('black') } catch (e) {}
    let muonStore = __eo('muonStore')
    ctlRayder.control()
    ctlRayder.showpos(true)
  
    // .................. animas
    let ani = function () {
      // .................. pics
      let eotim = {'td': 1000, 't0': 0, 't1': 1, 't2': 1, 't3': 1}
  
      // .................. geoLined
      let geoLined = {
  
        eohal: eohalPacer,
        eotim: eotim,
        eoric: {gid: 'g', cid: 'c', fid: 'f'},
  
        eofold: {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: [ [0, 0], [10, 10] ] },
          properties: {},
        },
        eonode: {
          type: 'Feature',
          geometry: {type: 'Point', coordinates: [0, 0, 0] },
          properties: {
            orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
          },
        },
  
        // ... the eofold changes form with eofom
  
        eoform: [ 0, 0, 0], // [ [[[0, 120]]], 0, 0]
        eocrom: {'csx': 0, 'cf': 777, 'cs': 777, 'cw': 0.99, 'co': 0.4, 'cp': 0.99},
  
        eoload: {
          pacer: {
  
            // initN: 0, eventN: 1, autoN: 0, autoP: 0, autoT: 0,
            initN: 0, eventN: 0, autoN: 1, autoP: 0.1, autoT: 0.1,
            outtimed: 0, maxN: 60,
            geospan: 0,
  
            paceAnisOfSort: 'anigram',
            basePaceOnAniView: '', // 'viewform'
            addItemToPacer: 1, // addItemToPacer for trace
  
            eohal: eohalMars,
  
            eofold: function (ani, props) {
              let coords
              if (props.key === 'init') { // INIT
                let point = ani.eonode.geometry.coordinates
                coords = Array.of(point) // eonode
                
              } else if (props.key === 'auto') { // AUTO
                let point = ani.eoform
       
                point = muonGeoj.geotrim(point) // ... geotrim to fix [num, num, NaN]
                point = [600 * (0.5 - Math.random()), 400 * (0.5 - Math.random()) ]
                console.log('point:', point)
                let preani = muonStore.findAnigramFromUid(ani.eoric.uid)
                if (preani) {
                  if (preani.eofold.type === 'FeatureCollection') {
                    let feature = preani.eofold.features[0]
                    coords = (feature.geometry.coordinates)
                      ? [...feature.geometry.coordinates, point ]
                      : Array.of(point)
                  } else if (preani.eofold.type === 'Feature') {
                    let feature = preani.eofold
                    coords = (feature.geometry.coordinates)
                      ? [...feature.geometry.coordinates, point ]
                      : Array.of(point)
                  }
                } else {
                  coords = Array.of(point)
                }
              } else if (props.key === 'event') { // EVENT
                let preani = muonStore.findAnigramFromUid(ani.eoric.uid)
  
                let grabbed = ctlRayder.getGrabbed()
                if (grabbed !== undefined) {
                  let x = grabbed[0]
                  let y = grabbed[1]
                  let z = 0
                  let point = [ x, y, z ]
  
                  if (preani) {
                    if (preani.eofold.type === 'FeatureCollection') {
                      let feature = preani.eofold.features[0]
                      coords = (feature.geometry.coordinates)
                        ? [...feature.geometry.coordinates, point ]
                        : Array.of(point)
                    } else if (preani.eofold.type === 'Feature') {
                      let feature = preani.eofold
                      coords = (feature.geometry.coordinates)
                        ? [...feature.geometry.coordinates, point ]
                        : Array.of(point)
                    }
                  } else {
                    coords = Array.of(point)
                  }
                }
              }
  
              let geometry = {
                type: 'LineString',
                coordinates: coords,
              }
              console.assert(muonGeoj.isValid(geometry), `geo ${geometry} not valid gj`)
  
              return {
                type: 'Feature',
                geometry: geometry,
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
                let grabbed = ctlRayder.getGrabbed()
                if (grabbed !== undefined) {
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
                properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
              }
              return res
            },
  
          },
        },
      }
      // .................. textAni
      let textAni = {
        eohal: eohalTextform,
        eotim: eotim,
        eoric: {'gid': 'text', 'cid': 'text', 'fid': 'text'},
        eofold: ani => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0] },
        }),
        eocrom: { 'csx': 0, 'cf': 888, 'cs': 111, 'cw': 0.5, 'co': 0.9, 'cp': 0.5},
        eomot: {
          proform: { projection: 'uniwen', translate: [ 100, -190 ] },
        },
        eoload: {
          textform: {
            string: 'paced adding dots',
            style: { 'font-size': 16 },
          },
        },
      }
      // .................. scene
      let scene = {
        geoLined,
        textAni,
      }
  
      return scene
    }
  
    let enty = () => {}
    enty.ani = ani
    return enty
  }
  exports.z419hPacerString = anitem
}))