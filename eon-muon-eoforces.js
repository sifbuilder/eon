/***********
   *    @muonEoforces
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonEoforces = global.muonEoforces || {})))
}(this, function (exports) {
  'use strict'

  async function muonEoforces (__eo = {}) {
    let [
      d3Force3d,
    ] = await Promise.all([
      __eo('xs').b('d3-force-3d'),
    ])

    let d3_force = d3Force3d

    // ...................... isolate
    let isolate = function (sys) { // filter, force, nodes, sys, type
      let nodes = sys.nodes || []
      let force = sys.force
      let filter = sys.filter

      if (force !== null) {
        let simNodes = nodes.filter(filter) // filter nodes
        let dim = sys.dim || 3 // sys for dim

        var initialize = force.initialize
        force.initialize = () => initialize.call(force, simNodes, dim)

        return force
      }
    }

    // ...................... force
    function force (params) {
      let nodes = params.nodes
      let fforce = params.force
      let properties = params.properties || {}
      let payload = params.properties.payload || {}

      let args = payload.args || []
      let opts = payload.opts || {}

      let key = properties.key
      let type = properties.type
      let filter = properties.filter

      let fName = __eo('xeon').ceonize(type, 'force')

      if (fforce !== undefined) { // force is passed from z.eon
        //

      } else if (__eo(fName)) { // force is registered in mapper
        fforce = __eo(fName)
      } else if (d3Force3d[fName] !== undefined) { // force is taken from physics
        fforce = d3Force3d[fName]
      }
      fforce = fforce(...args)
      for (var kee in opts) {
        if (fforce[kee] !== undefined) {
          fforce = fforce[kee](opts[kee])
        }
      }
      console.assert(fforce !== null, `force ${fName} not found`)

      let sys = {
        nodes: nodes,
        filter: filter,
        force: fforce,
      }

      let ffforce = isolate(sys)
      console.assert(key || type !== null)
      let field = 	{
        key: key || type,
        force: ffforce,
      }

      return field // return force
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

      let fName = __eo('xeon').ceonize(type, 'force')

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

      let ffforce = muonEoforces.isolate(sys)
      console.assert(key || type !== null)
      let field = 	{
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

      let fName = __eo('xeon').ceonize(type, 'force')

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

      let ffforce = muonEoforces.isolate(sys)
      console.assert(key || type !== null)
      let field = 	{
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
      let field = 	{
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
          filter: d => d.eoric.gid === 'paced',
          id: d => d.eoric.uid,
          key: key,
        }

        params.properties = properties
        return forceGravity(params)
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
            strength: 0.3, // strength
          },
        },
        type: 'collide',
        filter: d => true, // d.eoric.gid === 'paced',
        id: d => d.eoric.uid,
        key: 'collide',
      },

      field: params => muonEoforces.force(params),
    }
    // ............................. forceManyBody
    let force_manybody = { // aniForce

      properties: {

        payload: {
          args: [],
          opts: {
            strength: -30.900,
            distanceMin: 1,
            distanceMax: 160,
            theta: 1,
          },
        },
        src: d3_force,
        id: d => d.eoric.uid,
        filter: d => true, // d.eoric.gid === 'node',
        type: 'manyBody',
        key: 'manyBody',

      },

      field: params => muonEoforces.force(params),
    }
    // ............................. forceRadial
    let force_radial = { // aniForce

      properties: {

        payload: {
          args: [
            30, // radius,
            20, // x,
            20, // y,
            20, // z
          ],
          opts: {
            strength: -0.10,
            // radius: 30,
            // x: 0,
            // y: 0,
            // z: 0,
          },
        },
        src: d3_force,
        id: d => d.eoric.uid,
        filter: d => true, // d.eoric.gid === 'node',
        type: 'radial',
        key: 'radial',

      },

      field: params => muonEoforces.force(params),
    }
    // ............................. forceCenterGold

    let force_centerGold = { // aniForce

      properties: {
        payload: {
          args: [
            60, // x
            0, // y
            0, // z
          ],
        },
        src: d3_force,
        id: d => d.eoric.uid,
        filter: d => d.eoric.gid === 'gold',
        type: 'center',
        key: 'center_gold',

      },

      field: params => muonEoforces.force(params),
    }

    // ............................. forceCenterRed

    let force_centerRed = { // aniForce

      properties: {
        payload: {
          args: [
            -60, // x
            0, // y
            0, // z
          ],
        },
        src: d3_force,
        id: d => d.eoric.uid,
        filter: d => d.eoric.gid === 'red',
        type: 'center',
        key: 'center_red',

      },

      field: params => muonEoforces.force(params),
    }
    // ............................. forceXGold

    let force_xGold = { // aniForce

      properties: {
        payload: {
          args: [
            60, // pass to m.eoforces.force type
          ],
          opts: { // apply to m.eoforces.force type if method
            x: 60,
            strength: 1,
          },
        },
        src: d3_force,
        id: d => d.eoric.uid,
        filter: d => d.eoric.gid === 'gold',
        type: 'x',
        key: 'x_gold',
      },

      field: params => muonEoforces.force(params),

    }
    // ............................. forceXRed

    let force_xRed = { // aniForce

      properties: {
        payload: {
          args: [
            -60, // x
          ],
          opts: {
            x: -60,
            strength: 1,
          },
        },
        src: d3_force,
        id: d => d.eoric.uid,
        filter: d => d.eoric.gid === 'red',
        type: 'x',
        key: 'x_red',
      },

      field: params => muonEoforces.force(params),
    }

    // ............................. forceYGold

    let force_yGold = { // aniForce

      properties: {
        payload: {
          args: [
            60, // y
          ],
          opts: {
            y: 60,
            strength: 1,
          },
        },
        src: d3_force,
        id: d => d.eoric.uid,
        filter: d => d.eoric.gid === 'gold',
        type: 'y',
        key: 'y_gold',
      },

      field: params => muonEoforces.force(params),
    }

    // ............................. forceYRed

    let force_yRed = { // aniForce

      properties: {
        payload: {
          args: [
            -60, // y
          ],
          opts: {
            y: -60,
            strength: 1,
          },
        },
        src: d3_force,
        id: d => d.eoric.uid,
        filter: d => d.eoric.gid === 'red',
        type: 'y',
        key: 'y_red',
      },

      field: params => muonEoforces.force(params),
    }

    // ............................. forceZGold

    let force_zGold = { // aniForce

      properties: {
        payload: {
          args: [
            60, // z
          ],
          opts: {
            z: 60,
            strength: 1,
          },
        },
        src: d3_force,
        id: d => d.eoric.uid,
        filter: d => d.eoric.gid === 'gold',
        type: 'z',
        key: 'z_gold',
      },

      field: params => muonEoforces.force(params),
    }

    // ............................. forceZRed
    let force_zRed = { // aniForce

      properties: {
        payload: {
          args: [
            -60, // z
          ],
          opts: {
            z: -60,
            strength: 1,
          },
        },
        src: d3_force,
        id: d => d.eoric.uid,
        filter: d => d.eoric.gid === 'red',
        type: 'z',
        key: 'z_red',
      },

      field: params => muonEoforces.force(params),

    }
    // ............................. forceLink
    let force_link = {

      properties: {
        payload: {
          args: [
            [], // links
          ],
          opts: {
            links: [],
            id: d => d.eoric.uid, // nodeById fn
            strength: () => 1,
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
        return muonEoforces.force(params)
      },

    }
    // ...................... enty
    let enty = () => {}
    enty.force = force
    enty.isolate = isolate
    return enty
  }

  exports.muonEoforces = muonEoforces
}))
