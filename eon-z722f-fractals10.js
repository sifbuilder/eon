/* ******************************************
   *    @eonZ722fFractals10
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ722fFractals10 = global.eonZ722fFractals10 || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      ctlWen,
      ctlVersor,
      datRhyno,
      eohalMars,
      eohalSol,
      eohalNatform,
      eohalPacer,
      eohalFourier,
      Complex,
      muonEoric,
      muonFourier,
      muonGeoj,
      muonProj3ct,
      muonProfier,
      muonProps,
      muonStace,
      muonCastel,
      protonOrthographic,
      renderSvg,
      renderPortview,
    // renderWebgl,
    ] = await Promise.all([
      __eo('xs').c('wen'),
      __eo('xs').c('versor'),
      __eo('xs').d('rhyno'),
      __eo('xs').e('mars'),
      __eo('xs').e('sol'),
      __eo('xs').e('natform'),
      __eo('xs').e('pacer'),
      __eo('xs').e('fourier'),
      __eo('xs').l('complex'),
      __eo('xs').m('eoric'),
      __eo('xs').m('fourier'),
      __eo('xs').m('geoj'),
      __eo('xs').m('proj3ct'),
      __eo('xs').m('profier'),
      __eo('xs').m('props'),
      __eo('xs').m('stace'),
      __eo('xs').m('castel'),
      __eo('xs').p('orthographic'),
      __eo('xs').r('svg'),
      __eo('xs').r('portview'),
    // __eo('xs').r('webgl'),
    ])
    try { renderSvg.scenecolor('black') } catch (e) { }
    let muonStore = __eo('muonStore')

    // .................. animas
    let z = function () {
    // let ctl = ctlVersor().control(renderSvg.svg())

    // .................. pics

      const pi = Math.PI, pi2 = 2 * pi,
        turn = 2 * Math.PI // 360

      let eotim = {'td': 63800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      // ...     data is svg MCZ...MCZ
      let svgdata = {
        width: '2.77778in', height: '3.45833in',
        viewBox: '0 0 300 300',
        path: {
          id: 'mbn',
          fill: 'none', stroke: 'black', 'strokeWidth': '1',
          d: `M 0.00,0.00
           C 100.00,0.00 200.00,0.00 300.00,0.00 Z`, // LineString
        }, // path
      }
      let data = muonCastel.castels(svgdata, {start: 0, stop: 0.9, step: 1 / 3}) // MultiLineString

      let basicSquare = [
        [
          [0, 0], [0, 25], [0, 50], [0, 75],
          [0, 100], [25, 100], [50, 100], [75, 100],
          [100, 100], [100, 75], [100, 50], [100, 25],
          [100, 0], [75, 0], [50, 0], [25, 0], [0, 0],
        ],
      ] // MultiLineString
      data.geometry.coordinates = basicSquare

      let proform = {
        projection: 'uniwen',
        translate: [ -100, 100 ],
        scale: [1, -1],
        rotate: [ 0, 0 ],
        lens: [0, 1, Infinity],
      }

      let proform2 = { // proform in the geographic domain
        projection: protonOrthographic,
        // prerotate: [[[ protonOrthographic.rotation ]]],
        // prerotate: [[[ ctlVersor
        // .projection({projection: protonOrthographic })
        // .rotation,
        // ]]],
        translate: [0, 0, 0],
        scale: 100,
        rotate: [ [[[0, 360]]], 0, 0 ],

      }

      // ...  get geoData from uniwen projection with inverse y-scale
      // ...  the get the data features (transforms)
      // ...  span data along [0, 1] interval
      // ...  and create FeatureCollection with trasform features

      let geoData = muonProj3ct(data, muonProfier.formion(proform2, z))
      let transforms = muonFourier.transformedCoefs(geoData)
      transforms = muonGeoj.ntime(transforms, [0, 1])

      if (1 && 1) console.log('transforms', transforms)

      // ... rayline LineString

      let rayline = i => ({

        eohal: eohalMars,
        eotim: eotim,
        eoric: { gid: 'pol', cid: 'pol', fid: 'pol'},

        eofold: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: []},
          properties: {},
        },

        eocrom: { 'csx': 0, 'cf': 555, 'cs': 777, 'cw': 0.99, 'co': 1, 'cp': 1},
        eoload: {},

      })

      // ... traceline LineString trace

      let traceline = i => ({

        eohal: eohalPacer,
        eotim: eotim,
        eoric: {gid: 'ava', cid: 'ava', fid: 'traceline'},

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

        eocrom: {'csx': 0, 'cf': 444, 'cs': 666, 'cw': 0.99, 'co': 0.4, 'cp': 0.99},

        eoload: {
          pacer: { // addItemToPacer for trace

            initN: 0, eventN: 0, autoN: 1, autoP: 0, autoT: 0, outtimed: 0, maxN: 60,

            addItemToPacer: 1,
            geospan: 0,

            pacedAnisort: 'anigram',
            basePaceOnAniView: 'viewform',

            eohal: eohalMars,

            eofold: function (ani, props) {
              let coords
              if (props.key === 'init') { // INIT
                coords = ani.eonode.geometry.coordinates
              } else if (props.key === 'auto') { // AUTO
              // ... ani is the LineString avatar of
              // ... Point avatar
              // ... the location is got from ani parentani

                let point = muonStace.getLocus([{pos: 0}, {pos: 0}], z)

                point = muonGeoj.geotrim(point)

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
                }
              } else if (props.key === 'event') { // EVENT
                coords = ani.eonode.geometry.coordinates
              }

              console.assert(coords !== undefined && coords !== null, `pacer eofold coords undefined`)
              let geometry = {
                type: 'LineString',
                coordinates: coords,
              }
              console.assert(muonGeoj.isValid(geometry), `pacer eofold geojson not valid`)

              return {
                type: 'Feature',
                geometry: geometry,
                properties: {},
              }
            },

            eonode: function (ani, props) {
              let stace = [0, 0, 0]
              if (props.key === 'init') { // INIT
                stace = muonStace.getLocus([null, null, null], ani)
              } else if (props.key === 'auto') { // AUTO

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
      })

      let params = {depth: 6, rad: 30, sides: 6, wbase: 1, anginit: 180, name: 'as12', row: 1, col: 2}

      let getanis = function (params = {}) { // getanis
        let anis = []
        let _NAME = params.name || 'anis'
        _ROW = params.row || 2,
        _COL = params.col || 2,
        _LEVEL = params.depth || 2,
        _CF = params.cf || (d => 222 * 1), // cfonlevel
        _SIDES = params.sides || 5,
        _RAD = params.rad || 90,
        PHASED = params.anginit || 0 // 0 internal, 180 extenal
        const cyclet = _LEVEL * _LEVEL * 1000

        let fractalForm = {

          eohal: eohalMars,

          eofold: a => {
            let res = {
              type: 'Feature',
              geometry: {
                type: 'Point',

                coordinates: Complex({re: 0, im: 0})
                  .add(a.eoload.fractal.coef(a)) // set on zcoef = (rad, ang)
                  .toVector(),

              },
              properties: {
                pointRadius: a.eoload.fractal.rad,
                eonode: {
                  type: 'Feature',
                  geometry: {type: 'Point', coordinates: [0, 0]},
                  properties: {orgen: [0, 0], velin: [0, 0], velang: [0, 0], prevous: [0, 0], geodelta: [0, 0]},
                },
              },
            }
            return res
          },

          eotim: {'td': cyclet * _LEVEL, 't0': 0, 't1': 1, 't2': 1, 't3': 1},
          eoric: {'gid': _NAME, 'cid': _NAME, 'fid': _NAME},
          eocrom: {'csx': 0, 'cf': 555, 'cs': 333, 'cw': 0.9, 'co': 0.2, 'cp': 0.7},
          eomot: {
            proform: { projection: 'uniwen', scale: 1, translate: [ -0, 0 ], rotate: [ 0, 0 ] }, // identity
          },

          eoload: {
            fractal: {}, // set coef

          },
        }

        // amplitude of sinus (level)
        let radOnLevel = d => (d === 0) ? _RAD : _RAD / (Math.pow(2, d))

        // complex number
        let zcoef = (rad, ang) => Complex({re: rad * Math.cos(ang), im: rad * Math.sin(ang)})

        // for each cycloid: anis or fractal
        for (let level = 0; level < _LEVEL; level++) {
          anis[level] = muonProps.cloneObj(anis[level - 1] || fractalForm)

          //
          anis[level].eoric = {gid: 'nat', cid: _NAME + level, fid: _NAME + level} // id

          anis[level].eoload.fractal.an = [] // [0..._LEVEL)

          for (let j = 0; j < level; j++) {
            let ang
            ang = (j === 0) ? [[[ 0, turn ]]] : [[[ 0, (1 - _SIDES) ** (j) * turn ]]]
            let rad = radOnLevel(j)
            anis[level].eoload.fractal.an[j] = {rad, ang}
          }

          anis[level].eoload.fractal.coef = d => {
            let z = d.eoload.fractal.an.reduce((p, q) => {
              let aj = zcoef(q.rad, q.ang)
              return p.add(aj)
            }, Complex({re: 0, im: 0}))
            return z
          }

          anis[level].eoload.fractal.rad = radOnLevel(level)
          anis[level].eocrom.cf = _CF(level) // eocrom
          if (level === _LEVEL - 1) {
          // add trace line to last-level cycloid
            anis[level].avatars = {traceline: traceline(0)}
          }
        }

        return anis
      }
      let otheranis = getanis(params)
      // .................. cameraOrthoAni anima
      let lightHemisphereAni = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'lightHemisphereAni'},
        eohal: eohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: anitem.eoload.light,
          }

          return json
        },
        eoload: {
          light: {
            sort: 'light',
            type: 'HemisphereLight',
            name: 'HemisphereLight',
            skyColor: [[[111, 999]]],
            groundColor: [[[999, 111]]],
            intensity: 0.2,
            position: [0, 0, 0],
          },
        },

      }

      // .................. spotLight anima
      let spotLight = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'spotLight'},
        eohal: eohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: anitem.eoload.light,
          }
          return json
        },
        eoload: {
          light: {
            sort: 'light',
            type: 'SpotLight',
            name: 'spotLight',
            color: [[[222, 777]]], // 0xe4eef9,
            intensity: 0.99,
            position: [-100, 100, 100],
            normalize: 1,
            castShadow: 1,
          },
        },

      }

      // .................. cameraPersAni anima
      let cameraPersAni = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'cameraPersAni'},
        eohal: eohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: {
              sort: 'camera',
              type: 'PerspectiveCamera',
              name: 'Perspective',
              fov: 60, // field of view s the field of view. angle in degrees.
              aspect: renderPortview.width() / renderPortview.height(),
              near: 0.001,
              far: 600,

              position: [0, 0, 200 ],
              rotation: [0, 0, 0 ],

              vellin: [0, 0, 0 ],
              velang: [1, 1, 1 ],

              distance2nodesFactor: 100,
              lookAt: [0, 0, 0],
            },
          }
          return json
        },
      }
      // .................. animas
      let animas = [

        ...otheranis, // h.fourier
        cameraPersAni, // h.sol
        lightHemisphereAni, // h.sol
        spotLight, // h.sol
      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ722fFractals10 = anitem
}))
