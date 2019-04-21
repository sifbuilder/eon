/* ******************************************
   *    @eonZ780aSimEohal
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ780aSimEohal = global.eonZ780aSimEohal || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3Geo,
    d3Force3d,
    eonCtlWen,
    eonEohalCore,
    eonEohalLinkform,
    eonEohalNatform,
    eonEohalMars,
    muonAntiem,
    eonMuonEoric,
    eonMuonEoforces,
    eonMuonGeom,
    eonMuonNatform,
    eonMuonProps,
    eonRenderPortview,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3-geo'),
    __eo('xs').b('d3-force-3d'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-core'),
    __eo('xs').b('eon-eohal-linkform'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-anitem'),
    __eo('xs').b('eon-muon-eoric'),
    __eo('xs').b('eon-muon-eoforces'),
    __eo('xs').b('eon-muon-geom'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-render-portview'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  let eonMuonStore = __eo('eonMuonStore')
  let d3_force = d3Force3d

  let width = eonRenderPortview.width(), height = eonRenderPortview.height()

  // ............................. nuid
  let nuid = i => {
    let eoric = { gid: 'node', cid: 'node', fid: 'node' + i }
    eoric.uid = eonMuonEoric.getuid(eoric)
    return eoric
  }

  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let tf = t => (1 / Math.PI) * ((Math.PI / 2) + Math.asin(-1 + 2 * t))
    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, tf: t => t}

    // ............................. eohale
    let eohale = anima => {
      if (!anima.eogelded) {
        let animas = []

        let count = 200

        for (let i = 0; i < count; i++) {
          let ani = eonMuonProps.cloneObj(anima)
          ani.eohal = eonEohalMars
          ani.eoric = nuid(i)
          ani.eocrom = { 'csx': 0, 'cf': 888, 'co': 0.9, 'cs': 666, 'cw': 0.9, 'cp': 0.8 }

          if (i < count / 2) {
            ani.eocrom.cf = 999

            let eoric = { gid: 'gold', cid: 'c', fid: 'f' + i }
            eoric.uid = eonMuonEoric.getuid(eoric)
            ani.eoric = eoric
          } else {
            ani.eocrom.cf = 333

            let eoric = { gid: 'red', cid: 'c', fid: 'f' + i }
            eoric.uid = eonMuonEoric.getuid(eoric)
            ani.eoric = eoric
          }

          ani.eonode = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [
                2 * (0.5 - Math.random()) * 10, // x,
                2 * (0.5 - Math.random()) * 10, // y,
                2 * (0.5 - Math.random()) * 10, // z,,
              ],
            },
            properties: {
              orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
            },
          }

          animas.push(ani)
        }

        // ... org anima is becomes gelded after halo anify
        // ... org anima is becomes delled after halo anify

        updanima = eonMuonProps.cloneObj(anima)
        updanima.eogelded = 1
        updanima.eodelled = 1
        animas.push(updanima)

        eonMuonStore.apply({
          type: 'UPDANIMA',
          caller: 'h.ineohal',
          animas: animas,
        })

        return animas
      }
    }

    let eohal_anify = anitem => eohale(anitem)
    let eohal_gramify = anitem => anitem

    let ineohal = { // ineohal
      anify: anitem => eohal_anify(anitem),
      gramify: anitem => eohal_gramify(anitem),
    }

    // .................... nodeAni
    let nodeAni = {

      eohal: ineohal,
      eotim: eotim,
      eoric: {gid: 'g', cid: 'g', fid: 'g'},

      eofold: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {
          pointRadius: 6,
        },
      },

      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {
          pointRadius: 6,
          orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
        },
      },

      eomot: {

        proform: {
          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          translate: [0, 0, 0],
          scale: 1,
          rotate: [ [[[0, 360]]], [[[0, 360]]], 0 ],
          lens: [0, 1, Infinity],
          addNodeToTranslate: 1,
        },

      },

      eocrom: { 'csx': 0, 'cf': 888, 'co': 0.5, 'cs': 666, 'cw': 0.9, 'cp': 0.8 },

      eoform: {
        x: {
          'm1': 7.28, 'm2': 0.67, 'n1': 10.19, 'n2': 14.4, 'n3': -7.48, 'a': 5.38, 'b': 4.45,	// heart
          'v0': 0, 'v1': 1,
          'ra2': 12,
          'w4': 90,
          'seg5': 60,
          'pa6': 0, 'pb7': -1,
        },
        y: {
          'm1': 7.28, 'm2': 0.67, 'n1': 10.19, 'n2': 14.4, 'n3': -7.48, 'a': 5.38, 'b': 4.45,	// heart
          'v0': 0, 'v1': 1,
          'ra2': 12,
          'w4': 90,
          'seg5': 60,
          'pa6': 0, 'pb7': -1,
        },
      },
      eoload: {},
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

      field: params => eonMuonEoforces.force(params),
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

      field: params => eonMuonEoforces.force(params),
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

      field: params => eonMuonEoforces.force(params),
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

      field: params => eonMuonEoforces.force(params),
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

      field: params => eonMuonEoforces.force(params),
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

      field: params => eonMuonEoforces.force(params),

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

      field: params => eonMuonEoforces.force(params),
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

      field: params => eonMuonEoforces.force(params),
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

      field: params => eonMuonEoforces.force(params),
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

      field: params => eonMuonEoforces.force(params),
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

      field: params => eonMuonEoforces.force(params),

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
        return eonMuonEoforces.force(params)
      },

    }

    // .................... fieldAni
    let fieldAni = {

      eohal: eonEohalCore,
      eotim: eotim,
      eoric: {gid: 'field', cid: 'field', fid: 'field'},

      eofold: null,
      eoload: {},

    }
    fieldAni.eoforces = {
      // force_energy,
      // force_viscosity,
      force_gravity, // apply gravity to git.paced anitems
      force_collide, // repulse, applies to all items
      force_manybody, //
      force_radial, // force radially from center of force
      force_centerGold, // applies to gid:gold items
      force_centerRed, // applies to gid:gold items
      force_xGold, // applies to gid:gold items, align to x:60 (args, opts)
      force_xRed, // applies to gid:red items, align to x:-60
      force_yGold, // applies to gid:gold items, align to y:60
      force_yRed, // applies to gid:red items, align to y:-60
      force_zGold,
      force_zRed,
    }

    // .................. animas
    let animas = [

      nodeAni, // h.mars
      fieldAni, // h.core

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ780aSimEohal = anitem
}))