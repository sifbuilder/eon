/* ******************************************
   *    @eonZ401bSimD3vorts
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ401bSimD3vorts = global.eonZ401bSimD3vorts || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3Force3d,
    ctlWen,
    eohalCore,
    eohalLinkform,
    eohalMars,
    muonEoric,
    muonEoforces,
    muonProps,
    muonSim,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3-force-3d'),
    __eo('xs').c('wen'),
    __eo('xs').e('core'),
    __eo('xs').e('linkform'),
    __eo('xs').e('mars'),
    __eo('xs').m('eoric'),
    __eo('xs').m('eoforces'),
    __eo('xs').m('props'),
    __eo('xs').m('sim'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
  let muonStore = __eo('muonStore')
  let d3_force = d3Force3d

  var data = {
    'nodes': [
      [31 + -144, 30 + 138, 0], // 00
      [31 + 82, 30 + 137, 0], // 01
      [31 + 82, 30 + -155, 0], // 02
      [31 + -145, 30 + -155, 0], // 03
      [31 + -89, 30 + 35, 0], // 04
      [31 + -80, 30 + 42, 0], // 05
      [31 + -71, 30 + 43, 0], // 06
      [31 + -62, 30 + 42, 0], // 07
      [31 + -52, 30 + 38, 0], // 08
      [31 + -10, 30 + 35, 0], // 09
      [31 + -1, 30 + 40, 0], // 10
      [31 + 9, 30 + 42, 0], // 11
      [31 + 19, 30 + 39, 0], // 12
      [31 + 25, 30 + 34, 0], // 13
      [31 + -86, 30 + 10, 0], // 14
      [31 + -69, 30 + 19, 0], // 15
      [31 + -51, 30 + 7, 0], // 16
      [31 + -68, 30 + -1, 0], // 17
      [31 + -67, 30 + 12, 0], // 18
      [31 + -12, 30 + 8, 0], // 19
      [31 + 8, 30 + 21, 0], // 20
      [31 + 23, 30 + 11, 0], // 21
      [31 + 8, 30 + -1, 0], // 22
      [31 + 9, 30 + 12, 0], // 23
      [31 + -48, 30 + -53, 0], // 24
      [31 + -41, 30 + -48, 0], // 25
      [31 + -33, 30 + -54, 0], // 26
      [31 + -22, 30 + -48, 0], // 27
      [31 + -16, 30 + -54, 0], // 28
      [31 + -59, 30 + -91, 0], // 29
      [31 + -41, 30 + -95, 0], // 30
      [31 + -32, 30 + -93, 0], // 31
      [31 + -20, 30 + -93, 0], // 32
      [31 + -3, 30 + -91, 0], // 33
      [31 + -101, 30 + -55, 0], // 34
      [31 + -96, 30 + -79, 0], // 35
      [31 + -89, 30 + -104, 0], // 36
      [31 + -78, 30 + -120, 0], // 37
      [31 + -62, 30 + -135, 0], // 38
      [31 + -35, 30 + -151, 0], // 39
      [31 + -3, 30 + -141, 0], // 40
      [31 + 13, 30 + -131, 0], // 41
      [31 + 24, 30 + -109, 0], // 42
      [31 + 40, 30 + -61, 0], // 43
    ],
    'links': [
      // [0,1],
      // [0,3],
      // [0,4],
      // [0,5],
      // [0,6],
      // [0,7],
      // [0,34],
      // [1,2],
      // [1,7],
      // [1,10],
      // [1,11],
      // [1,12],
      // [1,13],
      // [1,21],
      // [1,43],
      // [2,3],
      // [2,39],
      // [2,40],
      // [2,41],
      // [2,42],
      // [2,43],
      // [3,34],
      // [3,35],
      // [3,36],
      // [3,37],
      // [3,38],
      // [3,39],
      [4, 5],
      [4, 14],
      [4, 15],
      [4, 34],
      [5, 6],
      [5, 15],
      [6, 7],
      [6, 15],
      [7, 8],
      [7, 10],
      [7, 15],
      [8, 9],
      [8, 10],
      [8, 15],
      [8, 16],
      [9, 10],
      [9, 19],
      [9, 20],
      [10, 11],
      [10, 20],
      [11, 12],
      [11, 20],
      [12, 13],
      [12, 20],
      [13, 20],
      [13, 21],
      [13, 43],
      [14, 15],
      [14, 17],
      [14, 18],
      [14, 34],
      [15, 16],
      [15, 18],
      [16, 9],
      [16, 17],
      [16, 18],
      [16, 19],
      [16, 25],
      [17, 18],
      [17, 24],
      [17, 25],
      [17, 34],
      [19, 20],
      [19, 22],
      [19, 23],
      [19, 25],
      [19, 27],
      [20, 21],
      [20, 23],
      [21, 22],
      [21, 23],
      [21, 43],
      [22, 23],
      [22, 27],
      [22, 28],
      [22, 43],
      [24, 25],
      [24, 26],
      [24, 29],
      [24, 30],
      [24, 34],
      [24, 35],
      [25, 26],
      [25, 27],
      [26, 27],
      [26, 28],
      [26, 30],
      [26, 31],
      [26, 32],
      [27, 28],
      [28, 32],
      [28, 33],
      [28, 43],
      [29, 30],
      [29, 35],
      [29, 36],
      [29, 37],
      [29, 38],
      [30, 31],
      [30, 38],
      [30, 39],
      [31, 32],
      [31, 39],
      [32, 33],
      [32, 39],
      [32, 40],
      [33, 40],
      [33, 41],
      [33, 42],
      [33, 43],
      [34, 35],
      [35, 36],
      [36, 37],
      [37, 38],
      [38, 39],
      [39, 40],
      [40, 41],
      [41, 42],
      [42, 43],

    ],
  }

  // ............................. nuid
  let nuid = i => {
    let eoric = { gid: 'node', cid: 'node', fid: 'node' + i }
    eoric.uid = muonEoric.getuid(eoric)
    return eoric
  }

  // ............................. luid
  let luid = i => {
    let eoric = { gid: 'link', cid: 'link', fid: 'link' + i }
    eoric.uid = muonEoric.getuid(eoric)
    return eoric
  }

  // ............................. eohale
  let eohale = anima => {
    if (!anima.eogelded) {
      let animas = []
      let nodes = []

      for (let i = 0; i < data.nodes.length; i++) {
        let node = {
          x: data.nodes[i][0],
          y: data.nodes[i][1],
          z: data.nodes[i][2],
        }
        nodes.push(node)

        let ani = muonProps.cloneObj(anima)
        ani.eohal = eohalMars
        ani.eoric = nuid(i)
        ani.eonode.geometry.coordinates = Object.values(node)
        ani.eocrom = { 'csx': 0, 'cf': 888, 'co': 0.5, 'cs': 666, 'cw': 0.9, 'cp': 0.8 }

        animas.push(ani)
      }
      for (let i = 0; i < data.links.length; i++) {
        let nidfrom = data.links[i][0]
        let nidto = data.links[i][1]

        let line = {}
        line.userData = {
          source: data.links[i][0],
          target: data.links[i][1],
        }

        let ani = muonProps.cloneObj(anima)
        ani.eohal = eohalLinkform
        ani.eoric = luid(i)
        ani.eocrom = { 'csx': 0, 'cf': 888, 'co': 0.5, 'cs': 666, 'cw': 0.9, 'cp': 0.8 }
        ani.eoload = {}
        ani.eoload.link = {
          source: nuid(nidfrom).uid,
          target: nuid(nidto).uid,
        }

        animas.push(ani)
      }

      // ... org anima is becomes gelded after halo anify
      // ... org anima is becomes delled after halo anify

      let updanima = muonProps.cloneObj(anima)
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

  let ineohal = {
    anify: anitem => eohal_anify(anitem),
    gramify: anitem => eohal_gramify(anitem),
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

    let eotim = {'td': 12800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // .................... natVort
    let natVort = {

      eohal: ineohal,
      eotim: eotim,
      eoric: {gid: 'g', cid: 'g', fid: 'g'},

      eofold: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {},
      },

      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {
          orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
        },
      },

      eomot: {

        ereform: {
          projection: 'uniwen',
          translate: [0, 0, 0],
          scale: 1,
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity],
          addNodeToTranslate: 1,
          applyProtonToNode: 0,
        },
        proform: {
          projection: 'uniwen',
          prerotate: [[[ ctl.rotation ]]],
          translate: [0, 0, 0],
          scale: 1,
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity],
          addNodeToTranslate: 0,
          applyProtonToNode: 0,
        },
      },

      eocrom: { 'csx': 0, 'cf': 888, 'co': 0.5, 'cs': 666, 'cw': 0.9, 'cp': 0.8 },
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
        gravity: -0.7,
      },
      field: params => { // force.field
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
          filter: d => true,
          id: d => d.eoric.uid,
          key: key,
        }

        params.properties = properties
        return forceGravity(params)
      },
    }

    // .................... field_link
    let force_link = {

      properties: {
        payload: {
          args: [],
          opts: {
            distance: 30,
            strength: () => 0.1,
            id: d => d.eoric.uid, // nodeById fn
            iterations: 1,
          },
        },
        type: 'link',
        src: d3_force,
        filter: d => d.eoric.gid === 'node',
        key: 'link',
      },

      field: params => {
        let links = params.nodes.filter(d => (d.eoric.gid === 'link'))

        params.properties.payload.args = Array.of(links)

        return muonEoforces.force(params)
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
      force_gravity,
      force_link,
    }

    // .................. scene
    let scene = {

      natVort, // h.mars
      fieldAni, // h.core

    }

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ401bSimD3vorts = anitem
}))