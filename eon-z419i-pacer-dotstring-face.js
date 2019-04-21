/* ******************************************
   *    @eonZ419iPacerDotstringFace
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ419iPacerDotstringFace = global.eonZ419iPacerDotstringFace || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlRayder,
    eonCtlWen,
    eonEohalMars,
    eonEohalNatform,
    eonEohalPacer,
    eonEohalImgform,
    eonMuonNatform,
    eonMuonStace,
    eonMuonGeoj,
    eonProtonUniwen,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-rayder'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-eohal-pacer'),
    __eo('xs').b('eon-eohal-imgform'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-stace'),
    __eo('xs').b('eon-muon-geoj'),
    __eo('xs').b('eon-proton-uniwen'),
    __eo('xs').b('eon-render-svg'),
  ])

  let eonMuonStore = __eo('eonMuonStore')
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    // .................. pics
    let eotim = {'td': 998800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // ... geoLined is ani h.pacer
    let geoLined = {

      eohal: eonEohalPacer,

      // ... eofold is LineString
      eofold: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: null,
        },
        properties: {},
      },

      // ... eonode has the sim properties
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

      // ... the eofold changes form with eofom

      eoform: [ [[[0, 120]]], 0, 0],
      eotim: eotim,
      eoric: {gid: 'g', cid: 'c', fid: 'f'},
      eocrom: {'csx': 0, 'cf': 777, 'cs': 777, 'cw': 0.99, 'co': 0.4, 'cp': 0.99},

      eoload: {

        pacer: {

          initN: 0, eventN: 1, autoN: 0, autoP: 0, autoT: 0, outtimed: 0, maxN: 60, geospan: 0,

          pacedAnisort: 'anigram',
          basePaceOnAniView: '',
          addItemToPacer: 1, // addItemToPacer for trace

          eohal: eonEohalMars,

          eofold: function (ani, props) {
            let preani = eonMuonStore.findAnigramFromUid(ani.eoric.uid) // anigram
            let coords
            if (props.key === 'init') { // INIT
              coords = ani.eonode.geometry.coordinates // eonode
            } else if (props.key === 'auto') { // AUTO
              coords = (preani && preani.eofold.geometry.coordinates)
                ? [...preani.eofold.geometry.coordinates, ani.eoform ]
                : Array.of(ani.eoform) // LineString
            } else if (props.key === 'event') { // EVENT
              if (eonCtlRayder.grabbed() !== undefined) {
                let grabbed = props.count.grabbed
                let x = grabbed[0]
                let y = grabbed[1]
                let z = 0
                let point = [ x, y, z ]

                coords = (preani && preani.eofold.geometry.coordinates)
                  ? [...preani.eofold.geometry.coordinates, point ]
                  : Array.of(point) // LineString

                if (1 && 1) console.log('coords', coords)
              }
            }

            let geometry = {
              type: 'LineString',
              coordinates: coords,
            }
            console.assert(eonMuonGeoj.isValid(geometry))

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
              if (eonCtlRayder.grabbed() !== undefined) {
                let grabbed = eonCtlRayder.grabbed()
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
    // ............................. imgAni
    let imgAni = {
      eohal: 'imgform',
      eofold: p => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [ 0, 0 ],
        },
        properties: {
          sort: 'img',
          attr: {
            'width': p.eoload.img.style.width,
            'height': p.eoload.img.style.height,
            'rotate': p.eoload.img.style.rotate,
            'xlink:href': p.eoload.img.url,
          },
          'xlink:href': p.eoload.img.url,
          style: p.eoload.img.style,
        },
      }),

      eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat'},
      eocrom: { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.9, 0.9]]], 'cs': [[[111, 666]]], 'cw': [[[0.3, 0.9]]], 'cp': [[[0.7, 0.9]]]},

      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ -230, 140 ],
        },
      },
      eoload: {
        img: {
          url: 'eon-zimg-triangulation.jpg',
          style: {
            width: 400,
            height: 300,
            rotate: 0,
          },
        },
      },
    }

    // .................. animas
    let animas = [
      geoLined, // h.pacer

      imgAni, // h.imgform
    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ419iPacerDotstringFace = anitem
}))
