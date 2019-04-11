/* ******************************************
 *    @eonZ419rPacerLine
 *
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonZ419rPacerLine = global.eonZ419rPacerLine || {}))
})(this, function (exports) {
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
      muonEoric,
      muonGeoj,
      muonGraticule,
      muonNatform,
      muonProps,
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
      __eo('xs').m('eoric'),
      __eo('xs').m('geoj'),
      __eo('xs').m('graticule'),
      __eo('xs').m('natform'),
      __eo('xs').m('props'),
      __eo('xs').m('stace'),
      __eo('xs').p('uniwen'),
      __eo('xs').r('svg'),
    ])

    try {
      renderSvg.scenecolor('black')
    } catch (e) {}
    let ctl
    try {
      ctl = ctlWen().control(renderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }
    let muonStore = __eo('muonStore')
    // .................. animas
    let z = function () {
      // .................. pics
      let eotim = { td: 10000, t0: 0, t1: 1, t2: 1, t3: 1 }

      // ....................... pacerNat
      let pacerNat = {
        eohal: eohalPacer,
        eoric: { gid: 'nat', cid: 'nat', fid: 'nat' },
        eoload: {
          pacer: {
            pacedby: {
              initN: 0,
              eventN: 0,
              autoN: 1,
              autoP: 0.036,
              autoT: 0.1,
              outtimed: 0,
              maxN: 60,
              geospan: 0,
              basePaceOnAniView: '', // undefined, base on resulting geofold
              addItemToPacer: 1, // geometries will not be accumulated
            },

            anigram: {
              eotim: eotim,
              eohal: eohalMars,

              eoric: function (ani, props) {
                let eoric = { gid: 'g', cid: 'c', fid: 'paced' }
                console.assert(ani.eoric.uid !== undefined)
                eoric.pid = ani.eoric.uid
                return eoric
              },

              eofold: function (ani, props) {
                let coords = [0, 0]
                let eoric = { gid: 'g', cid: 'c', fid: 'paced' }

                // let preani = muonStore.findAnima(eoric)
                let preani = muonStore.findAnigram(eoric) // _e_

                let point = [
                  200 * (0.5 - Math.random()),
                  200 * (0.5 - Math.random()),
                ]

                if (preani === undefined) {
                  coords = Array.of(coords)
                } else {
                  let precoords
                  if (preani.eofold.geometry) {
                    precoords = preani.eofold.geometry.coordinates
                  }

                  if (preani.eofold.type === 'FeatureCollection') {
                    precoords = preani.eofold.features[0].geometry.coordinates // _e_
                  }

                  coords = [...precoords, point]
                }

                let geometry = {
                  type: 'LineString',
                  coordinates: coords,
                }
                console.assert(muonGeoj.isValid(geometry), `gj coords not valid in ${geometry}`)

                let feature = {
                  type: 'Feature',
                  geometry: geometry,
                  properties: {},
                }

                return feature
              },

              eonode: function (ani, props) {
                // eoric repeated in pacedItem eonode from pacedItem eoric
                let eoric = { gid: 'g', cid: 'c', fid: 'paced' }
                let stace = [0, 0, 0]

                let coordinates = stace
                let res = {
                  type: 'Feature',
                  geometry: { type: 'Point', coordinates: coordinates },
                  properties: {
                    orgen: null,
                    velin: [0, 0, 0],
                    velang: [0, 0, 0],
                    prevous: null,
                    geodelta: null,
                  },
                }
                return res
              },

              eomot: {
                proform: {
                  projection: 'uniwen',
                  translate: [0, 0, 0], // mot
                  scale: 1,
                  rotate: [[[[0, 360]]], [[[0, 360]]], [[[0, 360]]]],
                  prerotate: [[[ctl.rotation]]],
                  lens: [0, 1, Infinity],
                  addNodeToTranslate: 1, // eonode
                },
              },

              eoload: {
                eocrom: {
                  csx: 0,
                  cf: 777,
                  co: 0.1,
                  cs: [[[999, 111, 999]]],
                  cw: 0.5,
                  cp: 1,
                },

                eoform: {
                  x: {
                    m1: 4,
                    m2: 4,
                    n1: 100,
                    n2: 100,
                    n3: 100,
                    a: 1,
                    b: 1, // square
                    ra2: 20 * Math.sqrt(2),
                    v0: 0,
                    v1: 1,
                    w4: 0,
                    seg5: 8,
                    pa6: 0,
                    pb7: -1,
                    dom3: [-180, 180],
                  },
                  y: {
                    m1: 4,
                    m2: 4,
                    n1: 100,
                    n2: 100,
                    n3: 100,
                    a: 1,
                    b: 1, // square
                    ra2: 20 * Math.sqrt(2),
                    v0: 0,
                    v1: 1,
                    w4: 0,
                    seg5: 8,
                    pa6: 0,
                    pb7: -1,
                    dom3: [-180, 180],
                  },
                  z: {
                    m1: 4,
                    m2: 4,
                    n1: 100,
                    n2: 100,
                    n3: 100,
                    a: 1,
                    b: 1, // square
                    ra2: 20,
                    v0: 0,
                    v1: 1,
                    w4: 0,
                    seg5: 8,
                    pa6: 0,
                    pb7: -1,
                    dom3: [-180, 180],
                  },
                },
              },
            },
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
  exports.eonZ419rPacerLine = anitem
})
