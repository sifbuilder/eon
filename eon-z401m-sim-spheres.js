/* ******************************************
   *    @eonZ401mSimSpheres
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ401mSimSpheres = global.eonZ401mSimSpheres || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3Geo,
    d3Force3d,
    eonCtlWen,
    eonEohalNatform,
    eonEohalMars,
    eonEohalPacer,
    eonEohalTextform,
    eonMuonAnitem,
    eonMuonEoforces,
    eonMuonEoric,
    eonMuonGraticule,
    eonMuonNatform,
    eonMuonProps,
    eonMuonSnap,
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
    __eo('xs').b('eon-muon-anitem'),
    __eo('xs').b('eon-muon-eoforces'),
    __eo('xs').b('eon-muon-eoric'),
    __eo('xs').b('eon-muon-graticule'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-muon-snap'),
    __eo('xs').b('eon-muon-stace'),
    __eo('xs').b('eon-proton-uniwen'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  let eonMuonStore = __eo('eonMuonStore')
  let d3_force = d3Force3d
  // .................. animas
  let z = function () {
    // .................. pics
    let radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt,
      sinh = Math.sinh, cosh = Math.cosh, tanh = Math.tanh

    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1 } // nostop: 1}

    // ............................. natAni
    let natAni1 = {
      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat1'},

      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),

      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ 0, -160, 0], // mot
          scale: [1, 1, 1],
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity],
        },
      },

      eocrom: { 'csx': 0, 'cf': [[[333, 333, 333]]], 'co': [[[0.19, 0.19]]], 'cs': [[[444, 444]]], 'cw': [[[0.99, 0.99]]], 'cp': [[[0.9, 0.9]]]},

      eoform: {

        x: {
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 400, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
        },
        y: {
          'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
          'ra2': 12, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
        },

      },

      eoload: {},
    }
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
          translate: [ 0, 0, 0], // mot
          scale: 1,
          rotate: [ 0, -200, 0 ],

          lens: [0, 1, Infinity],
          addNodeToTranslate: 1, // eonode
        },
      },

      eocrom: { 'csx': 0, 'cf': [[[111, 444, 999, 888]]], 'co': [[[0.3, 0.9]]], 'cs': [[[999, 999, 1, 1, 1]]], 'cw': [[[0.4, 1.2]]], 'cp': 1},

      eoform: {
        x: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': [[[3, 30, 60, 64]]], 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[12, 24, 24]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ 1, 1, [[[1, 1]]], [[[1, 1]]]],
          'fn0': (e, c, d) => c[0] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * cos(e[3]) * sin(e[3]),
        },
        y: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': [[[3, 30, 60, 64]]], 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[12, 24, 24]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ 1, 1, [[[1, 1]]], [[[1, 1]]]],
          fn0: (e, c, d) => c[1] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * sin(e[3]) * sin(e[3]),

        },
        z: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': [[[3, 30, 60, 64]]], 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[24, 24, 24]]], 'pa6': 0, 'pb7': -1,
          'dom3': [ -90, 90 ],
          c: [ 1, 1, 1, [[[1, 1]]] ],
          fn0: (e, c, d) => d.c[3] * c[3] * sin(e[0]) * sin(e[3]),
        },
        w: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          dom3: [ -180, 180 ],
          fn0: (e, c) => c[3] * cos(e[2]),
        },
      },

      eoforces: {},

      eoload: {

        pacer: {

          initN: 1, eventN: 0, autoN: 1, autoP: 0.08, outtimed: 0, maxN: 60, geospan: 0,
          pacedAnisort: 'anima',
          basePaceOnAniView: 'viewform',
          addItemToPacer: 0,

          eohal: eonEohalNatform,

          eoric: function (ani, props) {
            let eoric = eonMuonProps.clone(ani.eoric)

            if (props.key === 'init') { // INIT
              let q = eonMuonStore.animasInClassHowMany(eoric)
              let nextq = q + props.counter
              eoric.fid = eonMuonEoric.idify(eoric.fid, props.key, nextq)
            } else if (props.key === 'auto') { // AUTO
              let q = eonMuonStore.animasInClassHowMany(eoric)
              let nextq = q + props.counter
              eoric.fid = eonMuonEoric.idify(eoric.fid, props.key, nextq)
            } else if (props.key === 'event') { // EVENT
              let q = eonMuonStore.animasInClassHowMany(eoric)
              let nextq = q + props.counter
              eoric.fid = eonMuonEoric.idify(eoric.fid, props.key, nextq)
            }

            eoric.uid = eonMuonEoric.getuid(eoric)
            return eoric
          },

          eofold: function (ani, props) {
            let neweofold = ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform})
            return neweofold
          },

          eocrom: function (ani, props) {
            let neweocrom = ani.eocrom
            return neweocrom
          },

          eonode: function (ani, props) {
            let stace = [0, 0, 0]
            if (props.key === 'init') { // INIT
              let autocount = props.counter
              let C1 = -150
              let C2 = 2
              stace = [
                0 + (0.5 - Math.random()) * 500,
                Math.pow(-1, autocount) * C1 * Math.max(1, autocount % C2),
                0]
            } else if (props.key === 'auto') { // AUTO
              let autocount = props.counter
              let C1 = -150
              let C2 = 2
              stace = [
                0 + (0.5 - Math.random()) * 200,
                Math.pow(-1, autocount) * C1 * Math.max(1, autocount % C2),
                0]
            } else if (props.key === 'event') { // EVENT
              if (eonCtlRayder.grabbed() !== undefined) {
                let grabbed = eonCtlRayder.grabbed()
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
              properties: {orgen: [0, 0, 0], velin: [0, 0, 0], velang: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
            }
            return res
          },

          eoforces: function (ani, props) {
            let forces = {}

            let forceGravity = eonMuonProps.clone(force_gravity)
            forceGravity.properties.key = d => d.eoric.uid
            forceGravity.properties.gravity = d => {
              let gravity = 0

              let tue = d.eotim.unElapsed
              let tup = d.eotim.unPassed
              let tud = d.eotim.unitDelta
              let rx = eonMuonProps.v(eonMuonSnap.snap(d.eoform.x.ra2, tup), d)
              let ry = eonMuonProps.v(eonMuonSnap.snap(d.eoform.y.ra2, tup), d)
              let r = Math.sqrt(rx * rx + ry * ry)

              console.assert(r !== Number.NaN)
              let gravrad = 60
              let gravforce = 1.9
              if (r > gravrad) gravity = gravforce // GRAVITY
              return gravity
            }

            forceGravity.properties.filter = d => d.eoric.cid === 'paced'
            forces.forceGravity = forceGravity
            return forces
          },

        },
      },
    }

    // ............................. forceGravity
    let forceGravity = function (params) { // force
      let nodes = params.nodes
      let properties = params.properties || {}
      let payload = params.properties.payload || {}
      let key = properties.key
      let type = properties.type
      let filter = properties.filter

      let fforce = function force (...args) {
        let opts = payload.opts || {}

        for (let i = 0; i < nodes.length; ++i) {
          let node = nodes[i]
          /* */

          node.vy += eonMuonProps.v(opts.gravity, node)

          /* */
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

    // ............................. box
    let eonForceBox = function (params) { // force
      let nodes = params.nodes
      let properties = params.properties || {}
      let payload = params.properties.payload || {}

      let key = properties.key
      let type = properties.type
      let filter = properties.filter

      let fName = __eo([type, 'force'])

      let fforce = function force (...args) { // fforce
        let opts = payload.opts || {}

        let west = (opts.west !== undefined) ? opts.west : -Infinity
        let east = (opts.east !== undefined) ? opts.east : Infinity
        let north = (opts.north !== undefined) ? opts.north : -Infinity
        let south = (opts.south !== undefined) ? opts.south : Infinity
        let act = (opts.act !== undefined) ? opts.act : 'reverse'

        for (let i = 0; i < nodes.length; ++i) {
          let node = nodes[i]

          let r = node.r || 1

          let xw = node.x - r + (node.vx || 0) // west
          let xe = node.x + r + (node.vx || 0) // est
          let yn = node.y - r + (node.vy || 0) // north
          let ys = node.y + r + (node.vy || 0) // south

          if (act === 'reverse') {
            if (xw < west) node.vx *= -1 // west
            if (xe > east) node.vx *= -1 // east
            if (yn < north) node.vy *= -1 // north
            if (ys > south) node.vy *= -1 // south
          } else if (act === 'erase') {
            if (xw < west || xe > east || yn < north || ys > south) {
              eonMuonStore.apply({type: 'DELANIMA', caller: 'force limit', anima: node})
            }
          }
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

    let force_box = { // aniForce:{properties, field}
      properties: {
        'west': 0 - 100,
        'east': 600 + 100,
        'north': 0 - 100,
        'south': 400 + 100,
        'act': 'erase',
      },
      field: params => { // force.field
        let forces = []

        let nodes = params.nodes
        let key = params.properties.key || 'box'

        let properties = {
          type: 'box',
          src: d3_force,
          nodes: nodes,
          payload: { // passed to force in m.eoforces
            args: [],
            opts: {
              west: params.properties.west,
              east: params.properties.east,
              north: params.properties.north,
              south: params.properties.south,
              act: params.properties.act,
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

    // ............................. bowl
    let eonForceBowl = function (params) { // force
      let nodes = params.nodes
      let properties = params.properties || {}
      let payload = params.properties.payload || {}
      let key = properties.key
      let type = properties.type
      let filter = properties.filter

      let fforce = function force (...args) {
        let opts = payload.opts || {}

        /* */
        let x0 = (opts.x0 !== undefined) ? opts.x0 : 0
        let y0 = (opts.y0 !== undefined) ? opts.y0 : 0
        let r = (opts.r !== undefined) ? opts.r : 1
        let act = (opts.act !== undefined) ? opts.act : 'reverse'
        /* */

        for (let i = 0; i < nodes.length; ++i) {
          let node = nodes[i]
          /* */

          let dx = node.x - x0,
            dy = node.y - y0,
            d2 = dx * dx + dy * dy

          let dd2x = (node.x + node.vx) - x0
          let dd2y = (node.y + node.vy) - y0
          let dd2 = dd2x * dd2x + dd2y * dd2y

          if (d2 < r * r && dd2 >= r * r) {
            if (act === 'reverse') {
              let angle = Math.atan2(dy, dx)
              let angle1 = Math.atan2(node.vy, node.vx)
              let angle2 = Math.PI - angle1 + 2 * angle
              let norm = Math.sqrt(node.vx * node.vx + node.vy * node.vy)

              node.vx = norm * Math.cos(angle2)
              node.vy = norm * Math.sin(angle2)
            } else if (act === 'erase') {
              eonMuonStore.apply({'type': 'DELANIMA', 'caller': 'force limit', 'anima': node})
            }
          } else if (d2 > r * r && dd2 <= r * r) {
            var angle = Math.atan2(dy, dx),
              angle1 = Math.atan2(node.vy, node.vx),
              angle2 = Math.PI - angle1 + 2 * angle,
              norm = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
            node.vx = norm * Math.cos(angle2)
            node.vy = norm * Math.sin(angle2)
          }

          /* */
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

    let force_bowl = { // aniForce:{properties, field}
      properties: {
        gravity: -0.9,
      },
      field: params => { // force.field
        let forces = []

        let nodes = params.nodes
        let gravity = params.gravity || params.properties.gravity
        let key = params.properties.key || 'bowl'

        let properties = {
          type: 'bowl',
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
    // ............................. crash
    // ............................. crop
    // ............................. curb

    // .................. scene
    let scene = {
      pacerNat, // h.pacer
      natAni1,

    }

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ401mSimSpheres = anitem
}))
