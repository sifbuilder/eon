/* ******************************************
   *    @eonZ401kD3simUpsphere
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ401kD3simUpsphere = global.eonZ401kD3simUpsphere || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
    let [
      d3,
      d3Geo,
      THREE,
      d3Force3d,
      eonCtlWen,
      eonEohalMars,
      eonEohalSol,
      eonMuonGraticule,
      eonMuonGeom,
      eonProtonNatform,
      eonRenderPortview,
      eonRenderWebgl,
    // eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('d3'),
      __eo('xs').b('d3-geo'),
      __eo('xs').b('three'),
      __eo('xs').b('d3-force-3d'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-sol'),
      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('eon-muon-geom'),
      __eo('xs').b('eon-proton-natform'),
      __eo('xs').b('eon-render-portview'),
      __eo('xs').b('eon-render-webgl'),
    // __eo('xs').b('eon-render-svg'),
    ])

    // ... **3 sim**
    // ... proform addNodeToTranslate

    let eonMuonStore = __eo('eonMuonStore')
    let d3_force = d3Force3d

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
        'x': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[18, 18]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ 1, 1, [[[5, 5]]], [[[5, 5]]]],
          fn0: (e, c, d) => c[0] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * cos(e[2]) * sin(e[3]),
        },
        'y': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[18, 18]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ 1, 1, [[[5, 5]]], [[[5, 5]]]],
          fn0: (e, c, d) => c[1] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * sin(e[2]) * sin(e[3]),

        },

        'z': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[18, 18]]], 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
          c: [ 1, 1, 1, [[[5, 5]]] ],
          fn0: (e, c, d) => d.c[3] * c[3] * sin(e[0]) * sin(e[3]),
        },

        'r': {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'dom3': [ -720, 720 ],
          fn0: (e, c) => c[3] * cos(e[2]),
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
      let force_energy = { // aniForce
        properties: {
          alpha: 1,
          alphaMin: 0.001,
          alphaDecay: 0,
          alphaTarget: 0,
        },

        field: function field (params = {}) {
          let nodes = params.nodes

          let forceParams = {
            type: 'energy',
            filter: function (d) {
              return d.eoric.gid === 'ani'
            },
            src: d3_force,
            nodes: nodes,
          }

          let field = {
            key: 'energy',
            force: eonMuonEoforces.force(forceParams),
          }

          return Array.of(field)
        },
      }

      // ............................. force_collide
      let force_collide = {

        properties: {
          strength: 0.03,
        },

        field: params => {
          let nodes = params.nodes
          let forces = []

          let strength = params.properties.strength

          let forceParams = {
            type: 'collide',
            strength: strength,
            radius: d => 90,
            filter: d => d.eoric.gid === 'node',
            src: d3_force,
            nodes: nodes,
          }

          let force = eonMuonEoforces.force(forceParams)
          let field = {
            key: 'collide',
            force: force,
          }

          forces.push(field)
          return forces
        },
      }

      // ............................. forceGravity
      let forceGravity = function (params) { // force
        let nodes = params.nodes
        let gravity = params.gravity

        function force () { // d3force builtin (vs muon d3force)
          for (let i = 0; i < nodes.length; ++i) {
            let node = nodes[i]
            node.vy += gravity // node.vx += 0.001 * Math.random()
          }
        }

        function initialize () {
          if (!nodes) return
        }

        let field = {
          key: params.key,
          force: force,
        }
        return field
      }

      let force_gravity = { // aniForce:{properties, field}
        properties: {
          gravity: -10.9,
        },

        field: params => { // force.field
          let forces = []

          let nodes = params.nodes
          let gravity = params.gravity || params.properties.gravity
          let key = params.properties.key || 'gravity'

          let forceParams = {
            type: 'gravity',
            src: d3_force,
            nodes: nodes,
            gravity: gravity,
            filter: d => d.eoric.gid === 'ani',
            id: d => d.eoric.uid,
            key: key,
          }

          let force = forceGravity(forceParams)
          forces.push(force)
          return forces
        },
      }

      // .................... field_link
      let force_link = {
        properties: {
          strength: 0.001,
        },

        field: params => {
          let forces = []

          let nodes = params.nodes
          let strength = params.strength || params.properties.strength
          let filter = d => true
          let id = d => d.eoric.uid
          let links = params.properties.links || nodes.filter(d => (d.eoric.gid === 'link'))
          let key = params.properties.key || 'link'

          let forceParams = {
            type: 'link',		// key in plugin forces
            src: d3_force,
            nodes: nodes,
            strength: d => strength,
            filter: d => true,
            id: d => d.eoric.uid,
            links: nodes.filter(d => (d.eoric.gid === 'link')),
            key: key,
          }

          let force = eonMuonEoforces.force(forceParams)

          let field = {
            key: 'link',
            force: force,
          }
          forces.push(field)

          return forces
        },
      }

      // ............................. force_manybody
      let force_manybody = { // aniForce

        properties: {
          strength: -1.9,
          theta: 0.9,
          distanceMin: 0,
          distanceMax: Infinity,
        },

        field: params => {
          let forces = []

          let nodes = params.nodes

          let strength = params.properties.strength

          let forceParams = {
            type: 'manybody', // f.manybody
            strength: strength,
            filter: d => d.eoric.gid === 'node',
            src: d3_force, // d3
            nodes: nodes,
          }

          let force = eonMuonEoforces.force(forceParams)
          let field = {
            key: 'charge',
            force: force,
          }

          forces.push(field)
          return forces
        },
      }

      // ............................. force_viscosity
      let force_viscosity = {
        properties: {
          velocityDecay: 0.0002,
        },

        field: function (params = {}) { // field.field
          let nodes = params.nodes // nodes

          let forceParams = {
            type: 'void',
            filter: d => true,
            dim: 3,
            filter: function (d) {
              return d.eoric.gid === 'ani'
            },
            src: d3_force,
            nodes: nodes,
          }

          let field = {
            key: 'viscosity',
            force: eonMuonEoforces.force(forceParams),
          }

          return Array.of(field)
        },
      }

      // ............................. circform1
      let circform1 = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: {gid: 'ani', cid: 'ani', fid: 'circform1'},

        basePaceOnAniView: '',

        eofold: p => {
          let vertices = eonMuonGraticule.gjfMultiPoint(p.eoload.eoframe).geometry.coordinates
          let quads = eonMuonGraticule.qfaces(p.eoload.eoframe)
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

        eocrom: { 'csx': 0, 'cf': 333, 'cs': 333, 'cw': 0.9, 'co': 0.6, 'cp': 0.9 },

        eomot: {

          conform: {
            projection: 'natform',
            eoform: formCirc,
          },

          proform: {
            projection: 'uniwen',
            translate: [0, 0, 0],
            scale: 1,
            rotate: [ 0, 0, 0 ],
            lens: [ 0, 1, Infinity ],
            addNodeToTranslate: 1,
          },
        },

        eoload: {

          eoframe: {

            multiframe: [ [ -180, 180, 30, 30], [ -180, 180, 30, 30] ],

          },
        },
      }

      circform1.eoforces = {
      // force_energy,
      // force_viscosity,
      // force_manybody,
        force_gravity,
      // force_collide,
      // force_link,
      }
      // .................. animas
      let animas = [
        circform1, // h.mars
        cameraPersAni, // h.sol
        ambientLight, // h.sol
        spotLight, // h.sol

      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ401kD3simUpsphere = anitem
}))
