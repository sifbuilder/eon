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
    ctlWen,
    eohalCore,
    eohalLinkform,
    eohalNatform,
    eohalMars,
    muonAnitem,
    muonEoric,
    muonEotim,
    muonEoforces,
    muonGeom,
    muonNatform,
    muonProps,
    renderPortview,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3-geo'),
    __eo('xs').b('d3-force-3d'),
    __eo('xs').c('wen'),
    __eo('xs').e('core'),
    __eo('xs').e('linkform'),
    __eo('xs').e('natform'),
    __eo('xs').e('mars'),
    __eo('xs').m('anitem'),
    __eo('xs').m('eoric'),
    __eo('xs').m('eotim'),
    __eo('xs').m('eoforces'),
    __eo('xs').m('geom'),
    __eo('xs').m('natform'),
    __eo('xs').m('props'),
    __eo('xs').r('portview'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
  let muonStore = __eo('muonStore')
  let d3_force = d3Force3d

  let width = renderPortview.width(), height = renderPortview.height()

  // ............................. nuid
  let nuid = i => {
    let eoric = { gid: 'node', cid: 'node', fid: 'node' + i }
    eoric.uid = muonEoric.getuid(eoric)
    return eoric
  }

  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = ctlWen().control(renderSvg.svg())
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
          let ani = muonProps.cloneObj(anima)
          ani.eohal = eohalMars
          ani.eoric = nuid(i)
          ani.eocrom = { 'csx': 0, 'cf': 888, 'co': 0.9, 'cs': 666, 'cw': 0.9, 'cp': 0.8 }

          if (i < count / 2) {
            let eocrom = { 'csx': 0, 'cf': 888, 'co': 0.9, 'cs': 666, 'cw': 0.9, 'cp': 0.8 }
            ani.eocrom = muonProps.clone(eocrom)
            ani.eocrom.csx = 0
            ani.eocrom.cf = 333 + 10 * i

            let eoric = { gid: 'gold', cid: 'c', fid: auid + 'f' + i }
            eoric.uid = muonEoric.getuid(eoric)
            ani.eoric = eoric
          } else {
            let eocrom = { 'csx': 0, 'cf': 888, 'co': 0.9, 'cs': 666, 'cw': 0.9, 'cp': 0.8 }
            ani.eocrom = muonProps.clone(eocrom)
            ani.eocrom.csx = 1
            ani.eocrom.cf = 333 + 10 * i

            let eoric = { gid: 'red', cid: 'c', fid: auid + 'f' + i }
            eoric.uid = muonEoric.getuid(eoric)
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

        updanima = muonProps.cloneObj(anima)
        updanima.eogelded = 1
        updanima.eodelled = 1
        animas.push(updanima)

        muonStore.apply({
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

      field: params => muonEoforces.force(params),
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
        return muonEoforces.force(params)
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

    // .................... fieldAni
    let fieldAni = {

      eohal: eohalCore,
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