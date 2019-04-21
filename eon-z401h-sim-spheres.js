/* ******************************************
   *    @eonZ401hSimSpheres
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ401hSimSpheres = global.eonZ401hSimSpheres || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    d3Geo,
    d3Force3d,
    eonCtlWen,
    eonEohalNatform,
    eonEohalMars,
    eonEohalPacer,
    eonEohalTextform,
    eonMuonEoforces,
    eonMuonEoric,
    eonMuonGraticule,
    eonMuonNatform,
    eonMuonProps,
    eonMuonStace,
    eonProtonUniwen,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3-geo'),
    __eo('xs').b('d3-force-3d'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-pacer'),
    __eo('xs').b('eon-eohal-textform'),
    __eo('xs').b('eon-muon-eoforces'),
    __eo('xs').b('eon-muon-eoric'),
    __eo('xs').b('eon-muon-graticule'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-muon-stace'),
    __eo('xs').b('eon-proton-uniwen'),
    __eo('xs').b('eon-render-svg'),
  ])

  let eonMuonStore = __eo('eonMuonStore')
  let d3_force = d3Force3d
  try { eonRenderSvg.scenecolor('black') } catch (e) {}

  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
      sinh = Math.sinh, cosh = Math.cosh, tanh = Math.tanh

    let eotim = {'td': 9800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // ....................... pacerNat
    let pacerNat = {

      eohal: eonEohalPacer,
      eotim: eotim,
      eoric: { gid: 'pacer', cid: 'pacer', fid: 'pacer' },

      eofold: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {orgen: [0, 0, 0], velin: [0, 0, 0], velang: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
      },

      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {orgen: [0, 0, 0], velin: [0, 0, 0], velang: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
      },

      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ [[[0, 200]]], 0, 0],
          scale: 1,
          rotate: [ [[[0, 60]]], [[[0, 60]]], [[[0, 60]]] ],
          prerotate: [[[ ctl.rotation ]]],
          lens: [0, 1, Infinity],
          addNodeToTranslate: 1,
        },
      },

      eocrom: { 'csx': 0, 'cf': 777, 'co': 0.1, 'cs': 666 + 200 * (0.5 - Math.random()), 'cw': 1.5, 'cp': 1},

      eoform: {
        x: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': [[[12, 148]]], 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[9, 9]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ 1, 1, [[[1, 1]]], [[[1, 1]]]],
          'fn0': (e, c, d) => c[0] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * cos(e[3]) * sin(e[3]),
        },
        y: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': [[[12, 148]]], 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[9, 9]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ 1, 1, [[[1, 1]]], [[[1, 1]]]],
          'fn0': (e, c, d) => c[1] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * sin(e[3]) * sin(e[3]),

        },
        z: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 12, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[9, 9]]], 'pa6': 0, 'pb7': -1,
          'dom3': [ -90, 90 ],
          c: [ 1, 1, 1, [[[1, 1]]] ],
          'fn0': (e, c, d) => d.c[3] * c[3] * sin(e[0]) * sin(e[3]),
        },
        w: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'dom3': [ -180, 180 ],
          'fn0': (e, c) => c[3] * cos(e[2]),
        },
      },

      eoforces: {},

      eoload: {

        pacer: {

          initN: 0, eventN: 0, autoN: 1, autoP: 0.1, outtimed: 0, maxN: 60, geospan: 0,
          pacedAnisort: 'anima',
          basePaceOnAniView: 'viewform',
          addItemToPacer: 0,

          eohal: eonEohalMars,

          eoric: function (ani, props) {
            let eoric = eonMuonProps.clone(ani.eoric)
            let q = eonMuonStore.animasInClassHowMany(eoric)
            let nextq = q + props.counter

            eoric.fid = eonMuonEoric.idify(eoric.fid, props.key, nextq)
            eoric.uid = eonMuonEoric.getuid(eoric)
            return eoric
          },

          eofold: function (ani, props) {
            let neweofold = ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform})
            return neweofold
          },

          eonode: function (ani, props) {
            let coords = [0, 0, 0]
            if (props.key === 'init') { // INIT
              let autocount = props.counter

              let ridx = eonMuonGraticule.ridx(4, 6, 1, 1)

              let k = [40 + 20 * Math.random(), 40 + 20 * Math.random()]
              let d = [-140, -40]

              coords = [d[0] + k[0] * ridx(autocount)[0],
                d[1] + k[1] * ridx(autocount)[1],
                0]
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
              properties: {orgen: [0, 0, 0], velin: [0, 0, 0], velang: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
            }
            return res
          },

          eoforces: function (ani, props) {
            let forces = {}

            let forceGravity = eonMuonProps.clone(force_gravity)

            forceGravity.properties.key = ani.eoric.uid
            forceGravity.properties.gravity = 0.1

            forceGravity.properties.filter = d => true

            forces.forceGravity = forceGravity
            return forces
          },

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
        let forces = []
        let nodes = params.nodes

        let forceParams = {
          type: 'energy',
          filter: d => d.eoric.gid === 'ani',
          src: d3_force,
          nodes: nodes,
        }

        let force = eonMuonEoforces.force(forceParams)
        forces.push(force)
        return forces
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
          src: d3_force,
          nodes: nodes,
          strength: strength,
          radius: d => 90,
          filter: d => d.eoric.gid === 'node',
          key: 'collide',
        }

        let force = eonMuonEoforces.force(forceParams)
        forces.push(force)
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
        type: 'gravity',
        src: d3_force,

        gravity: -0.9,

        filter: d => true,
        id: d => d.eoric.uid,
        key: 'gravity',
      },

      field: params => { // force.field
        let forces = []

        let nodes = params.nodes
        let forceParams = Object.assign({}, params, params.properties)

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

    // .................. animas
    let animas = [
      pacerNat, // h.pacer

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ401hSimSpheres = anitem
}))
