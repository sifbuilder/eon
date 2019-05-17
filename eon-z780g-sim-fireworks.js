/* ******************************************
   *    @eonZ780gSimFireworks
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ780gSimFireworks = global.eonZ780gSimFireworks || {})))
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
      eonMuonAnitem,
      eonMuonEoric,
      eonMuonEotim,
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
      __eo('xs').b('eon-muon-eotim'),
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

      let spring = {
        x: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 180, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ 1, 1, 1, 1],
          'fn0': (e, c, dax) => {
            let a = 6 // a: frequency
            let h = 90 // h: height
            let r = 90 // r: radius
            let x = e[0]
            let y = e[1]
            let z = e[2]
            let w = e[3]
            let d = 0.157 // radians * 36 / 360 // 0.157  , z.seg5: 36, xy.dom: 360
            let res = cos(x) * cos(dax.c[0] * y)
            return res
          },
        },
        y: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 180, 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ 1, 1, 1, 1],
          'fn0': (e, c, dax) => {
            let a = 6 // a: frequency
            let h = 90 // h: height
            let r = 90 // r: radius
            let x = e[0]
            let y = e[1]
            let z = e[2]
            let w = e[3]
            let d = 0.157 // radians * 36 / 360 // 0.157  , z.seg5: 36, xy.dom: 360
            let res = sin(y) * cos(dax.c[0] * y)
            return res
          },
        },
        z: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4, 'pa6': 0, 'pb7': -1,
          'dom3': [0, 180],
          c: [ [[[94, 104]]], 1, 1, 1],
          'fn0': (e, c, dax) => {
            let a = 6 // a: frequency
            let h = 90 // h: height
            let r = 90 // r: radius
            let x = e[0] // dom:[-180, 180] : [-1.57, 1.57]
            let y = e[1] // dom:[-180, 180] : [-1.57, 1.57]
            let z = e[2]
            let w = e[3] // [0, 3.14] : [0, 2 * 1.57]
            let d = 0.157 // radians * 36 / 360 // 0.157  , z.seg5: 36, xy.dom: 360
            let seg5 = dax.seg5
            let cycles = seg5 - 1
            let res = z + 0.5 * (x + y) / seg5
            return res
          },
        },
        w: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
          'dom3': [0, 90],
          'fn0': (e, c, dax) => {
            return e[2]
          },
        },
      }

      // ............................. eohale
      let eohale = anima => {
        if (!anima.eogelded) {
          let animas = []

          let count = 200 // _e_
          let auid = anima.eoric.uid

          for (let i = 0; i < count; i++) {
            let ani = eonMuonProps.cloneObj(anima)
            ani.eohal = eonEohalMars
            ani.eoric = nuid(i)
            ani.eocrom = { 'csx': 0, 'cf': 888, 'co': 0.9, 'cs': 666, 'cw': 0.9, 'cp': 0.8 }

            if (i < count / 2) {
              let eocrom = { 'csx': 0, 'cf': 888, 'co': 0.9, 'cs': 666, 'cw': 0.9, 'cp': 0.8 }
              ani.eocrom = eonMuonProps.clone(eocrom)
              ani.eocrom.csx = 0
              ani.eocrom.cf = 333 + 10 * i

              let eoric = { gid: 'gold', cid: 'c', fid: auid + 'f' + i }
              eoric.uid = eonMuonEoric.getuid(eoric)
              ani.eoric = eoric
            } else {
              let eocrom = { 'csx': 0, 'cf': 888, 'co': 0.9, 'cs': 666, 'cw': 0.9, 'cp': 0.8 }
              ani.eocrom = eonMuonProps.clone(eocrom)
              ani.eocrom.csx = 1
              ani.eocrom.cf = 333 + 10 * i

              let eoric = { gid: 'red', cid: 'c', fid: auid + 'f' + i }
              eoric.uid = eonMuonEoric.getuid(eoric)
              ani.eoric = eoric
            }

            ani.eonode = {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [ 0, 0, 0 ],
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

      // .................... nodeAniA
      let nodeAniA = {

        eohal: ineohal,
        eotim: eotim,
        eoric: {gid: 'g', cid: 'g', fid: 'ga'},

        eofold: {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: {
            pointRadius: [[[ 6, 5.5, 5, 3, 2, 1, 0]]],
          },
        },

        eonode: {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: {
            pointRadius: [[[ 6, 6, 6, 3, 2, 1, 1]]],
            orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
          },
        },

        eomot: {

          proform: {
            projection: 'uniwen',
            prerotate: [[[ ctl.rotation ]]],
            translate: [-20, -60, 0],
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
          },
          y: {
            'm1': 7.28, 'm2': 0.67, 'n1': 10.19, 'n2': 14.4, 'n3': -7.48, 'a': 5.38, 'b': 4.45,	// heart
            'v0': 0, 'v1': 1,
            'ra2': 12,
            'w4': 90,
            'seg5': 60,
          },
        },
        eoload: {},
      }

      // .................... nodeAniB
      let nodeAniB = {

        eohal: ineohal,
        eotim: eotim,
        eoric: {gid: 'g', cid: 'g', fid: 'gb'},

        eofold: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0, 0],
          },
          properties: {
            pointRadius: [[[ 6, 5.5, 5, 3, 2, 1, 0]]],
          },
        },

        eonode: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0, 0],
          },
          properties: {
            pointRadius: [[[ 6, 6, 6, 3, 2, 1, 1]]],
            orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
          },
        },

        eomot: {

          proform: {
            projection: 'uniwen',
            prerotate: [[[ ctl.rotation ]]],
            translate: [20, -120, 0],
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
          },
          y: {
            'm1': 7.28, 'm2': 0.67, 'n1': 10.19, 'n2': 14.4, 'n3': -7.48, 'a': 5.38, 'b': 4.45,	// heart
            'v0': 0, 'v1': 1,
            'ra2': 12,
            'w4': 90,
            'seg5': 60,
          },
        },
        eoload: {},
      }

      // .................... nodeAniC
      let nodeAniC = {

        eohal: ineohal,
        eotim: eotim,
        eoric: {gid: 'g', cid: 'g', fid: 'gc'},

        eofold: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0, 0],
          },
          properties: {
            pointRadius: [[[ 6, 5.5, 5, 3, 2, 1, 0]]],
          },
        },

        eonode: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0, 0],
          },
          properties: {
            pointRadius: [[[ 6, 6, 6, 3, 2, 1, 1]]],
            orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
          },
        },

        eomot: {

          proform: {
            projection: 'uniwen',
            prerotate: [[[ ctl.rotation ]]],
            translate: [0, -120, 0],
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
          },
          y: {
            'm1': 7.28, 'm2': 0.67, 'n1': 10.19, 'n2': 14.4, 'n3': -7.48, 'a': 5.38, 'b': 4.45,	// heart
            'v0': 0, 'v1': 1,
            'ra2': 12,
            'w4': 90,
            'seg5': 60,
          },
        },
        eoload: {},
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

        let fName = __eo([type, 'force'])

        let gravity = opts.gravity // gravity

        let fforce = function force (...args) {
          for (let i = 0; i < nodes.length; ++i) {
            let node = nodes[i]
            node.vy += gravity // node.vx += 0.001 * Math.random()
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
          gravity: [[[ 0.0, 0.0, 0.0, -0.9, -0.9, -0.9, -0.2 ]]],

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

      let force_antigravity = {

        properties: {
          gravity: [[[ 2.9, 2.9, 2.9, 0.0, 0.0, 0.0, 0.0 ]]],

        },

        field: params => { // force.field
          let forces = []

          let nodes = params.nodes
          let gravity = params.gravity || params.properties.gravity
          let key = params.properties.key || 'antigravity'

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
              strength: [[[ 0, 0, 0, 0.3, 0.3, 0, 0 ]]],
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
              strength: [[[ 0, 0, 0, -20.9, 0, 0, 0 ]]],
              distanceMin: -1,
              distanceMax: 160,
              theta: 1,
            },
          },
          src: d3_force,
          id: d => d.eoric.uid,
          filter: d => true,
          type: 'manyBody',
          key: 'manyBody',

        },

        field: params => {
          return eonMuonEoforces.force(params)
        },
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

      // .................... fieldAni
      let fieldAni = {

        eohal: eonEohalCore,
        eotim: eotim,
        eoric: {gid: 'field', cid: 'field', fid: 'field'},

        eofold: null,
        eoload: {},

        eoforces: {
          force_gravity, // apply gravity to git.paced anitems
          force_antigravity, // apply gravity to git.paced anitems
          force_collide, // repulse, applies to all items
          force_manybody, //
        // force_radial,  // force radially from center of force
        // force_centerGold, // applies to gid:gold items
        // force_centerRed, // applies to gid:gold items
        // force_xGold, // applies to gid:gold items, align to x:60 (args, opts)
        // force_xRed, // applies to gid:red items, align to x:-60
        // force_yGold, // applies to gid:gold items, align to y:60
        // force_yRed,  // applies to gid:red items, align to y:-60
        // force_zGold,
        // force_zRed,
        },
      }

      // .................. animas
      let animas = [

        nodeAniA, // h.mars
        // nodeAniB, // h.mars
        // nodeAniC, // h.mars
        // fieldAni, // h.core

      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ780gSimFireworks = anitem
}))
