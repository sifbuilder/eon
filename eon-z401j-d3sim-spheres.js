/* ******************************************
   *    @eonZ401jD3simSpheres
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ401jD3simSpheres = global.eonZ401jD3simSpheres || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3Geo,
    d3Force3d,
    THREE,
    eonCtlWen,
    eonEohalNatform,
    eonEohalMars,
    eonEohalPacer,
    eonEohalTextform,
    eonMuonEoforces,
    eonMuonEoric,
    eonMuonGeom,
    eonMuonGraticule,
    eonMuonNatform,
    eonMuonProps,
    eonMuonStace,
    eonProtonUniwen,
    eonProtonNatform,
    eonRenderPortview,
    eonRenderSvg,
    eonRenderWebgl,
  ] = await Promise.all([
    __eo('xs').b('d3-geo'),
    __eo('xs').b('d3-force-3d'),
    __eo('xs').b('three'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-pacer'),
    __eo('xs').b('eon-eohal-textform'),
    __eo('xs').b('eon-muon-eoforces'),
    __eo('xs').b('eon-muon-eoric'),
    __eo('xs').b('eon-muon-geom'),
    __eo('xs').b('eon-muon-graticule'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-muon-stace'),
    __eo('xs').b('eon-proton-natform'),
    __eo('xs').b('eon-proton-uniwen'),
    __eo('xs').b('eon-render-portview'),
    __eo('xs').b('eon-render-svg'),
    __eo('xs').b('eon-render-webgl'),
  ])

  try { eonRenderSvg.scenecolor('black') } catch (e) {}

  let ctl
  try {
    ctl = eonCtlWen().control(eonRenderSvg.svg())
  } catch (e) {
    ctl = () => [0, 0, 0]
  }

  // .................. animas
  let z = function () {
    // .................. pics
    let pi = Math.PI, halfpi = Math.PI / 2,
      radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
      sinh = Math.sinh, cosh = Math.cosh, tanh = Math.tanh

    let fact = n => n - 1 > 0 ? n * fact(n - 1) : n
    let fact0 = 1,
      fact1 = 1,
      fact2 = 2,
      fact3 = 6,
      fact4 = 24,
      fact5 = 120,
      fact6 = 720,
      fact7 = 5040,
      fact8 = 40320,
      fact9 = 362880
    let infact0 = 1 / fact0,
      infact1 = 1 / fact1,
      infact2 = 1 / fact2,
      infact3 = 1 / fact3,
      infact4 = 1 / fact4,
      infact5 = 1 / fact5,
      infact6 = 1 / fact6,
      infact7 = 1 / fact7,
      infact8 = 1 / fact8,
      infact9 = 1 / fact9

    let cost = [infact0, 0, -infact2, 0, infact4, 0, -infact6, 0, infact8]
    let sint = [0, infact1, 0, -infact3, 0, infact5, 0, -infact7, 0, infact9]
    let cosht = [infact0, 0, +infact2, 0, infact4, 0, +infact6, 0, infact8]
    let sinht = [0, infact1, 0, +infact3, 0, infact5, 0, +infact7, 0, infact9]
    let exp = [infact0, infact1, infact2, infact3, infact4, infact5, infact6, infact7, infact8, infact9]

    // ............................. pics
    // z.dom3: [-180, [[[160,180,180]]] ]
    // eoload.geoframe: [-0, 180, 22.5, 22.5]
    // https://en.wikipedia.org/wiki/Surface_of_revolution
    let eotim = {'td': 23800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let formCirc = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[18, 18]]], 'pa6': 0, 'pb7': -1,
        dom3: [-180, 180],
        c: [ 1, 1, [[[5, 5]]], [[[5, 5]]]],
        fn0: (e, c, d) => c[0] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * cos(e[2]) * sin(e[3]),
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[18, 18]]], 'pa6': 0, 'pb7': -1,
        dom3: [-180, 180],
        c: [ 1, 1, [[[5, 5]]], [[[5, 5]]]],
        fn0: (e, c, d) => c[1] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * sin(e[2]) * sin(e[3]),

      },

      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[18, 18]]], 'pa6': 0, 'pb7': -1,
        dom3: [ -180, 180 ],
        c: [ 1, 1, 1, [[[5, 5]]] ],
        fn0: (e, c, d) => d.c[3] * c[3] * sin(e[0]) * sin(e[3]),
      },

      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        dom3: [ -720, 720 ],
        fn0: (e, c) => c[3] * cos(e[2]),
      },
    }

    let eonMuonStore = __eo('eonMuonStore')
    let d3_force = d3Force3d

    // -------------------------------  circform1
    let circform1 = {

      eohal: eonEohalMars,

      eotim: eotim,
      eoric: {'gid': 'grat', 'cid': 'grat', 'fid': 'circform1'},

      eofold: ani => {
        let vertices = eonMuonGraticule.gjfMultiPoint(ani.eoload.eoframe).geometry.coordinates
        let quads = eonMuonGraticule.qfaces(ani.eoload.eoframe)
        let faces = quads.reduce((p, q) => [...p, ...eonMuonGeom.convextriang(q)], [])

        let featureMultiPoint = {

          type: 'Feature',
          geometry: {
            type: 'MultiPoint',
            coordinates: vertices,
          },
          properties: {
            sort: 'form',
            eoMultiPolygon: 1,
            faces: faces,
          },
        }

        return featureMultiPoint
      },
      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {orgen: [0, 0, 0], velin: [0, 0, 0], velang: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
      },
      eocrom: { 'csx': 0, 'cf': 333, 'cs': 333, 'cw': 0.9, 'co': 0.1, 'cp': 0.9 },

      eomot: {

        conform: {
          projection: 'natform',
          eoform: formCirc,
        },

        proform: {
          projection: 'uniwen',
          translate: [0, 0, 0],
          scale: 0.1,
          rotate: [ 0, 0, 0 ],
          prerotate: (ctl !== undefined) ? [[[ ctl.rotation ]]] : [0, 0, 0],
          lens: [ 0, 1, Infinity ],
        },
      },

      eoload: {

        eoframe: {

          geoframe: [ [ [ -180, 180, 30, 30], [ -180, 180, 30, 30] ] ],

        },
      },
    }

    // .................. cameraPersAni anima
    let cameraPersAni = {

      eotim: eotim,
      eoric: {gid: 'camera', cid: 'camera', fid: 'cameraPersAni'},
      eohal: eonEohalSol,

      eofold: anitem => {
        let eoload = anitem.eoload
        let json = { // Feature
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: {
            sort: 'camera',
            type: 'PerspectiveCamera',
            name: 'Perspective',
            fov: 100, // field of view
            aspect: eonRenderPortview.width() / eonRenderPortview.height(),
            near: -900,
            far: 900,

            position: [0, 0, 2900 ],
            rotation: [0, 0, 0],
            distance2nodesFactor: 100,
            lookAt: [0, 0, 0],
          },
        }

        return json
      },

    }

    // .................. spotLight anima
    let spotLight = {

      eotim: eotim,
      eoric: {gid: 'camera', cid: 'camera', fid: 'spotLight'},
      eohal: eonEohalSol,

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
          intensity: 0.9,
          position: [-1400, 1400, 1400],
          normalize: 1,
          castShadow: 1,
        },
      },
    }

    // .................. cameraOrthoAni anima
    let ambientLight = {

      eotim: eotim,
      eoric: {gid: 'camera', cid: 'camera', fid: 'AmbientLight'},
      eohal: eonEohalSol,

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
          type: 'AmbientLight',
          name: 'AmbientLight',
          color: 0xeeeeee,
          intensity: 0.9,
          position: [1400, 1400, 1400],
        },
      },

    }

    // ............................. force_energy
    let forceEnergy = function (params) { // force
      let nodes = params.nodes
      let properties = params.properties || {}
      let payload = params.properties.payload || {}

      let args = payload.args || []
      let opts = payload.opts || {}

      let key = properties.key
      let type = properties.type
      let filter = properties.filter

      let fName = __eo([type, 'force'])

      let fforce = function force (...args) {
        for (let i = 0; i < nodes.length; ++i) {
          let node = nodes[i]
        }
      }
      fforce.initialize = () => {} // initialize

      let sys = {
        nodes: nodes,
        filter: filter,
        force: fforce,
      }

      let ffforce = eonMuonEoforces.isolate(sys)
      console.assert(key || type !== null)
      let field = {
        key: key || type,
        force: ffforce,
      }

      return field // return force
    }

    let force_energy = { // aniForce

      properties: {
        alpha: 1,
        alphaMin: 0.001,
        alphaDecay: 0,
        alphaTarget: 0,
      },
      field: params => { // force.field
        let forces = []

        let nodes = params.nodes

        let alpha = params.alpha || params.properties.alpha
        let alphaMin = params.alphaMin || params.properties.alphaMin
        let alphaDecay = params.alphaDecay || params.properties.alphaDecay
        let alphaTarget = params.alphaTarget || params.properties.alphaTarget

        let key = params.properties.key || 'energy'

        let properties = {
          type: 'energy',
          src: d3_force,
          nodes: nodes,
          payload: { // passed to force in m.eoforces
            args: [],
            opts: {
              alpha: alpha,
              alphaMin: alphaMin,
              alphaDecay: alphaDecay,
              alphaTarget: alphaTarget,
            },
          },
          filter: d => true,
          key: key,
        }

        params.properties = properties
        return forceEnergy(params)
      },

    }

    // ............................. forceCollide

    let force_collide = {

      properties: {
        payload: {
          args: [
            10, // radius () => 10
          ],
          opts: {
            strength: 0.03, // strength
          },
        },
        type: 'collide',
        filter: d => d.eoric.gid === 'node',
        id: d => d.eoric.uid,
        key: 'collide',
      },

      field: params => eonMuonEoforces.force(params),
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
          let g = eonMuonProps.v(gravity, node)
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

      let ffforce = eonMuonEoforces.isolate(sys)
      console.assert(key || type !== null)
      let field = {
        key: key || type,
        force: ffforce,
      }

      return field // return force
    }

    let force_gravity = { // aniForce:{properties, field}
      properties: {
        gravity: -0.9,
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
          filter: d => d.eoric.gid === 'paced',
          id: d => d.eoric.uid,
          key: key,
        }

        params.properties = properties
        return forceGravity(params)
      },
    }

    // ............................. eonForceLink
    let force_link = {

      properties: {
        payload: {
          args: [
            [], // links
          ],
          opts: {
            links: [],
            id: d => d.eoric.uid, // nodeById fn
            strength: () => 0.001,
            distance: () => 30,
            iterations: 1,
          },
        },
        filter: d => true, // nodes, by id
        type: 'link',
        key: 'link',
      },

      field: params => {
        let linksfilter = d => (d.eoric.gid === 'link')
        let links = params.nodes.filter(linksfilter)
        params.properties.payload.args = Array.of(links) // links
        return eonMuonEoforces.force(params)
      },

    }
    // ............................. forceManyBody
    let force_manybody = { // aniForce

      properties: {

        payload: {
          args: [],
          opts: {
            strength: -1.900,
            distanceMin: 0,
            distanceMax: Infinity,
            theta: 0.9,
          },
        },
        src: d3_force,
        id: d => d.eoric.uid,
        filter: d => d.eoric.gid === 'node',
        type: 'manyBody',
        key: 'manyBody',

      },

      field: params => eonMuonEoforces.force(params),
    }

    // ............................. force_viscosity
    let forceViscosity = function (params) { // force
      let nodes = params.nodes
      let properties = params.properties || {}
      let payload = params.properties.payload || {}

      let args = payload.args || []
      let opts = payload.opts || {}

      let key = properties.key
      let type = properties.type
      let filter = properties.filter

      let fName = __eo([type, 'force'])

      let fforce = function force (...args) {
        for (let i = 0; i < nodes.length; ++i) {
          let node = nodes[i]
        }
      }
      fforce.initialize = () => {} // initialize

      let sys = {
        nodes: nodes,
        filter: filter,
        force: fforce,
      }

      let ffforce = eonMuonEoforces.isolate(sys)
      console.assert(key || type !== null)
      let field = {
        key: key || type,
        force: ffforce,
      }

      return field // return force
    }

    let force_viscosity = { // aniForce

      properties: {
        velocityDecay: 0.0002,
      },
      field: params => { // force.field
        let forces = []

        let nodes = params.nodes

        let velocityDecay = params.velocityDecay || params.properties.velocityDecay

        let key = params.properties.key || 'viscosity'

        let properties = {
          type: 'viscosity',
          src: d3_force,
          nodes: nodes,
          payload: { // passed to force in m.eoforces
            args: [],
            opts: {
              velocityDecay: velocityDecay,

            },
          },
          filter: d => true,
          key: key,
        }

        params.properties = properties
        return forceViscosity(params)
      },

    }

    // .................. appply forces

    circform1.eoforces = {
      force_energy,
      force_viscosity,
      force_manybody,
      force_gravity,
      force_collide,
      force_link,
    }

    // .................. scene
    let scene = {
      cameraPersAni, // h.sol
      circform1, // h.mars
      ambientLight, // h.sol
      spotLight, // h.sol
    }

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ401jD3simSpheres = anitem
}))