/* ******************************************
   *    @eonZ720dD3fourierSquare
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ720dD3fourierSquare = global.eonZ720dD3fourierSquare || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3,
    d3Geo,
    d3Force3d,
    THREE,
    ctlWen,
    eohalCore,
    eohalMars,
    eohalSol,
    eohalPacer,
    eohalFourier,
    muonEoforces,
    muonFourier,
    muonGeoj,
    muonGeom,
    muonProps,
    muonGeovoro,
    muonNatform,
    muonProfier,
    muonProj3ct,
    muonStace,
    muonCastel,
    renderPortview,
    // renderSvg,
    renderWebgl,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').b('d3-geo'),
    __eo('xs').b('d3-force-3d'),
    __eo('xs').b('three'),
    __eo('xs').c('wen'),
    __eo('xs').e('core'),
    __eo('xs').e('mars'),
    __eo('xs').e('sol'),
    __eo('xs').e('pacer'),
    __eo('xs').e('fourier'),
    __eo('xs').m('eoforces'),
    __eo('xs').m('fourier'),
    __eo('xs').m('geoj'),
    __eo('xs').m('geom'),
    __eo('xs').m('props'),
    __eo('xs').m('geovoro'),
    __eo('xs').m('natform'),
    __eo('xs').m('profier'),
    __eo('xs').m('proj3ct'),
    __eo('xs').m('stace'),
    __eo('xs').m('castel'),
    __eo('xs').r('portview'),
    // __eo('xs').r('svg'),
    __eo('xs').r('webgl'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) { }
  let muonStore = __eo('muonStore')
  let d3_force = d3Force3d

  let z = function () {
  // .................. pics

    let epsilon = 1e-6, epsilon2 = epsilon * epsilon, asin = Math.asin
    let atan = Math.atan, abs = Math.abs
    let pi = Math.PI, degrees = 180 / pi, asin1_3 = Math.asin(1 / 3)
    let theta = atan(0.5) * degrees

    const eotim = {'td': 23800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

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

    let basicSquare = [ // svg
      [
        // [0, 0.50], [0, 0.75],
        // [0, 1.00], [0.25, 1.00], [0.50, 1.00], [0.75, 1.00],
        // [1.00, 1.00], [1.00, 0.75], [1.00, 0.50], [1.00, 0.25],
        // [1.00, 0], [0.75, 0], [0.50, 0], [0.25, 0],
        // [0, 0], [0, 0.25],
        [0, 0.50], [0, 0.75],
        [0, 1.00], [0.25, 1.00], [0.50, 1.00], [0.75, 1.00],
        [1.00, 1.00], [1.00, 0.75], [1.00, 0.50], [1.00, 0.25],
        [1.00, 0], [0.75, 0], [0.50, 0], [0.25, 0],
        [0, 0], [0, 0.25],
      ],
    ] // MultiLineString
    data.geometry.coordinates = basicSquare

    let proform = {
      projection: 'uniwen',
      translate: [ -50, 50 ],
      scale: [100, -100],
      rotate: [ 0, 0 ],
      lens: [0, 1, Infinity],
    }

    // ...  get geoData from uniwen projection with inverse y-scale
    // ...  the get the data features (transforms)
    // ...  span data along [0, 1] interval
    // ...  and create FeatureCollection with trasform features

    let geoData = muonProj3ct(data, muonProfier.formion(proform, z))
    let transforms = muonFourier.transformedCoefs(geoData)
    transforms = muonGeoj.ntime(transforms, [0, 1])

    // ... rayline LineString

    let rayline = {

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

    }

    // ... traceline LineString trace

    let traceline = {

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
              let point = muonStace.getLocus([null, null, null], ani)

              point = muonGeoj.geotrim(point) // ... geotrim to fix [num, num, NaN]

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

            console.assert(coords !== undefined && coords !== null, `coords ${coords} undefined `)
            let geometry = {
              type: 'LineString',
              coordinates: coords,
            }
            console.assert(muonGeoj.isValid(geometry), `geo ${geometry} not valid `)
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
    }

    // ... fourierAni carries the transforms in the eofold
    // ...  h.fourier
    // ...  bears traceline and rayline avatars
    // ...  the rayline is a LineString between each two transforms
    // ...  the traceline is a paced LineString on the last transform

    let fourierAni = {

      eohal: 'fourier',
      eotim: eotim,
      eoric: { gid: 'fourier', cid: 'fourier', fid: 'fourier'},

      eofold: p => ({
        type: 'FeatureCollection',
        features: transforms,
      }),

      eocrom: {'csx': 0, 'cf': 555, 'cs': 999, 'cw': 0.95, 'co': 0.92, 'cp': 0.99},

      eoload: {
        fourier: {

          pacedAnisort: 'anigram',

          transforms: transforms,
          interval: [0.0, 0.99],
          tolerance: 0.1,

          doteocrom: {'csx': 0, 'cf': 888, 'cs': 999, 'cw': 0.9, 'co': 0.01, 'cp': 0.7},

          // ... fourierAni.eoload.fourier avatars are defined by name: traceline, rayline

          avatars: {

            traceline: traceline,
            rayline: rayline,

          },
        },
      },
    }
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

    // .................. facesAniN anima
    let facesAniN = {

      eotim: eotim,
      eoric: {gid: 'facesAniN', cid: 'facesAniN', fid: 'facesAniN'},
      eohal: eohalMars,

      eofold: anitem => {
        let eoload = anitem.eoload
        let json = {
          type: 'Feature',
          geometry: {
            type: 'MultiPoint',
            coordinates: eoload.vertices(eoload.pars),
          },
          properties: {
            sort: 'form',
            eoMultiPolygon: 1,
            faces: eoload.faces(eoload.pars).reduce((p, q) => [...p, ...muonGeom.convextriang(q)], []),
            lights: eoload.lights(eoload.pars),
          },
        }

        return json
      },

      eocrom: {'csx': 0, 'cf': 999, 'cs': 777, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

      eomot: {
        proform: {

          projection: 'uniwen',
          translate: [
            0,
            0,
            0,
          ],

          scale: [
            100,
            100,
            100,
          ],

          // rotate: [ [[[0,9,0]]], [[[0,360]]], [[[0,9,0]]] ],
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity ],

        },
      },
      eoload: {
        pars: {},
        vertices: pars =>
          [[0.5, 0.5, 0],
            [0.5, 0.5, -0.5],
            [0.5, -0.5, 0],
            [0.5, -0.5, -0.5],
            [-0.5, 0.5, 0],
            [-0.5, 0.5, -0.5],
            [-0.5, -0.5, 0],
            [-0.5, -0.5, -0.5]],

        faces: pars =>
          [[0, 1, 5, 4],
            [0, 4, 6, 2],
            [0, 2, 3, 1],
            [7, 3, 2, 6],
            [7, 6, 4, 5],
            [7, 5, 1, 3]],

        lights: pars => [],

      },
    }

    // .................. facesAniN anima
    let facesAniS = {

      eotim: eotim,
      eoric: {gid: 'facesAniN', cid: 'facesAniN', fid: 'facesAniS'},
      eohal: eohalMars,

      eofold: anitem => {
        let eoload = anitem.eoload
        let json = {
          type: 'Feature',
          geometry: {
            type: 'MultiPoint',
            coordinates: eoload.vertices(eoload.pars),
          },
          properties: {
            sort: 'form',
            eoMultiPolygon: 1,
            faces: eoload.faces(eoload.pars).reduce((p, q) => [...p, ...muonGeom.convextriang(q)], []),
            lights: eoload.lights(eoload.pars),
          },
        }

        return json
      },

      eocrom: {'csx': 0, 'cf': 999, 'cs': 777, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

      eomot: {
        proform: {

          projection: 'uniwen',
          translate: [
            0,
            0,
            0,
          ],

          scale: [
            100,
            100,
            100,
          ],

          // rotate: [ [[[0,9,0]]], [[[0,360]]], [[[0,9,0]]] ],
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity ],

        },
      },
      eoload: {
        pars: {},
        vertices: pars =>
          [[0.5, 0.5, 0.5],
            [0.5, 0.5, -0],
            [0.5, -0.5, 0.5],
            [0.5, -0.5, -0],
            [-0.5, 0.5, 0.5],
            [-0.5, 0.5, -0],
            [-0.5, -0.5, 0.5],
            [-0.5, -0.5, -0]],

        faces: pars =>
          [[0, 1, 5, 4],
            [0, 4, 6, 2],
            [0, 2, 3, 1],
            [7, 3, 2, 6],
            [7, 6, 4, 5],
            [7, 5, 1, 3]],

        lights: pars => [],

      },
    }

    // ............................. forceGravity
    let forceGravity = function (params) { // force
      let nodes = params.nodes
      let properties = params.properties || {}
      let payload = params.properties.payload || {}

      let args = payload.args || []
      let opts = payload.opts || {}

      let key = properties.key
      let type = properties.type
      let filter = properties.filter

      let gravity = opts.gravity // gravity
      console.assert(gravity !== Number.NaN, 'gravity is NaN')

      let fforce = function force (...args) {
        for (let i = 0; i < nodes.length; ++i) {
          let node = nodes[i]
          let g = muonProps.v(gravity, node)
          console.assert(g !== Number.NaN, `gravity ${g} is NaN`)

          node.vy += g
        }
      }
      fforce.initialize = () => {} // initialize

      let sys = {
        nodes: nodes,
        filter: filter,
        force: fforce,
      }

      let ffforce = muonEoforces.isolate(sys)
      console.assert(key || type !== null)
      let field = {
        key: key || type,
        force: ffforce,
      }

      return field // return force
    }

    let force_gravity = { // aniForce:{properties, field}
      properties: {
        gravity: -0.7,
      },
      field: params => { // force.field
        let forces = []

        let nodes = params.nodes
        let gravity = params.gravity || params.properties.gravity
        let key = params.properties.key || 'gravity'

        let properties = {
          type: 'gravity',
          src: d3_force,
          nodes: nodes,
          payload: { // passed to force in m.eoforces
            args: [],
            opts: {
              gravity: gravity, // gravity
            },
          },
          filter: d => d.eoric.fid === 'facesAniS',
          id: d => d.eoric.uid,
          key: key,
        }

        params.properties = properties
        return forceGravity(params)
      },
    }
    // .................... fieldAni
    let fieldAni = {

      eohal: eohalCore,
      eotim: eotim,
      eoric: {gid: 'field', cid: 'field', fid: 'field'},

      eofold: null,
      eoload: {},

    }
    fieldAni.eoforces = {
      force_gravity, // apply gravity to git.paced anitems
    }
    // .................. animas
    let animas = [
      facesAniN, // h.mars
      facesAniS, // h.mars
      fourierAni, // h.mars
      lightHemisphereAni, // h.sol
      spotLight, // h.sol
      fieldAni, // h.core

    ]
    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ720dD3fourierSquare = anitem
}))