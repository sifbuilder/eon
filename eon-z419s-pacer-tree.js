/* ******************************************
 *    @eonZ419sPacerTree
 *
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonZ419sPacerTree = global.eonZ419sPacerTree || {}))
})(this, function (exports) {
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
      eonMuonEoric,
      eonMuonGeoj,
      eonMuonGraticule,
      eonMuonNatform,
      eonMuonProps,
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
      __eo('xs').b('eon-muon-eoric'),
      __eo('xs').b('eon-muon-geoj'),
      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-muon-stace'),
      __eo('xs').b('eon-proton-uniwen'),
      __eo('xs').b('eon-render-svg'),
    ])

    try {
      eonRenderSvg.scenecolor('black')
    } catch (e) {}
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }
    let eonMuonStore = __eo('eonMuonStore')
    // .................. animas
    let z = function () {
      // .................. pics
      let eotim = { td: 10000, t0: 0, t1: 1, t2: 1, t3: 1 }

      // ....................... pacerNat
      let pacerNat = {
        eohal: eonEohalPacer,
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

            anima: {
              eotim: eotim,
              eohal: eonEohalMars,

              eoric: function (ani, props) {
                let eoric = { gid: 'g', cid: 'c', fid: 'paced' }

                return eoric
              },

              eofold: function (ani, props) {
                let coords = [0, 0]
                let eoric = { gid: 'g', cid: 'c', fid: 'paced' }

                let preani = eonMuonStore.findAnima(eoric)

                let point = [
                  200 * (0.5 - Math.random()),
                  200 * (0.5 - Math.random()),
                ]

                if (preani === undefined) {
                  coords = Array.of(coords)
                } else {
                  let precoords = preani.eofold.geometry.coordinates
                  coords = [...precoords, point]
                }

                let geometry = {
                  type: 'LineString',
                  coordinates: coords,
                }
                console.assert(eonMuonGeoj.isValid(geometry), `gj coords not valid in ${geometry}`)

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
  exports.eonZ419sPacerTree = anitem
})
