/* ******************************************
   *    @eonZ401fSimSpheres
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ401fSimSpheres = global.eonZ401fSimSpheres || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    d3Force3d,
    ctlRayder,
    ctlWen,
    eohalNatform,
    eohalPacer,
    muonEoforces,
    muonEoric,
    muonGraticule,
    muonNatform,
    muonProps,
    protonUniwen,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3-force-3d'),
    __eo('xs').c('rayder'),
    __eo('xs').c('wen'),
    __eo('xs').e('natform'),
    __eo('xs').e('pacer'),
    __eo('xs').m('eoforces'),
    __eo('xs').m('eoric'),
    __eo('xs').m('graticule'),
    __eo('xs').m('natform'),
    __eo('xs').m('props'),
    __eo('xs').p('uniwen'),
    __eo('xs').r('svg'),
  ])

  let d3_force = d3Force3d
  try { renderSvg.scenecolor('black') } catch (e) {}
  let ctl
  try {
    ctl = ctlWen().control(renderSvg.svg())
  } catch (e) {
    ctl = () => [0, 0, 0]
  }

  // .................. animas
  let z = function () {
    // .................. pics

    let sin = Math.sin, cos = Math.cos

    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // ....................... pacerNat
    let pacerNat = {

      eohal: eohalPacer,
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
        ereform: {
          projection: protonUniwen,
          translate: [ 0, 0, 0], // mot
          scale: 1,
          rotate: [ [[[0, 60]]], [[[0, 60]]], [[[0, 60]]] ],
          lens: [0, 1, Infinity],
          addNodeToTranslate: 1, // eonode
        },
        proform: {
          projection: protonUniwen,
          translate: [ 0, 0, 0], // mot
          scale: 1,
          rotate: [[[ ctl.rotation ]]],
          lens: [0, 1, Infinity],
          addNodeToTranslate: 1, // eonode
        },
      },

      eocrom: { 'csx': 0, 'cf': 777, 'co': 0.1, 'cs': 666 + 200 * (0.5 - Math.random()), 'cw': 1.5, 'cp': 1},

      eoform: {
        x: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 12, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[18, 18]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ 1, 1, [[[1, 1]]], [[[1, 1]]]],
          'fn0': (e, c, d) => c[0] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * cos(e[3]) * sin(e[3]),
        },
        y: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 12, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[18, 18]]], 'pa6': 0, 'pb7': -1,
          'dom3': [-180, 180],
          c: [ 1, 1, [[[1, 1]]], [[[1, 1]]]],
          'fn0': (e, c, d) => c[1] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * sin(e[3]) * sin(e[3]),

        },
        z: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
          'ra2': 12, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[18, 18]]], 'pa6': 0, 'pb7': -1,
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

      eoload: {

        pacer: {

          // ... the pacer is in the eoload of the hosting anima
          // ... initN: 1, one paced anitem will be generated, then sleep
          // ... pacedAnisort: anima, hsoting anima will create pacecount resident animas
          // ... basePaceOnAniView: undefined, base on resulting geofold
          // ... geoadd: 0, geometries will not be accumulated

          initN: 24, eventN: 0, autoN: 0, autoP: 0.01, outtimed: 0, maxN: 60, geospan: 0,
          pacedAnisort: 'anima',
          basePaceOnAniView: 'viewform',
          addItemToPacer: 0,

          eohal: eohalNatform,
          eoric: function (ani, props) {
            let eoric = muonProps.clone(ani.eoric)
            eoric.gid = 'paced'
            eoric.cid = 'paced'
            eoric.fid = muonEoric.idify(eoric.fid, props.counter)
            eoric.uid = muonEoric.getuid(eoric)
            return eoric
          },

          eofold: function (ani, props) {
            let neweofold = muonNatform.natMultiLineString({eoform: ani.eoform})
            return neweofold
          },

          eonode: function (ani, props) {
            let coords = [0, 0, 0]
            if (props.key === 'init') { // INIT
              let autocount = props.counter

              let rows = 4
              let cols = 6
              let hstep = 1
              let vstep = 1

              let ridx = muonGraticule.ridx(rows, cols, hstep, vstep)
              let matrixCoord = ridx(autocount)

              let dRadX = 20
              let dRadY = 20
              let dLenX = 2 * dRadX
              let dLenY = 2 * dRadY
              let dCenter = [-140, -40]

              let delta = [
                dLenX + dRadX * Math.random(),
                dLenY + dRadY * Math.random(),
              ]

              coords = [
                dCenter[0] + delta[0] * matrixCoord[0],
                dCenter[1] + delta[1] * matrixCoord[1],
                0]
            } else if (props.key === 'auto') { // AUTO
              coords = [0, 0, 0]
            } else if (props.key === 'event') { // EVENT
              if (ctlRayder.grabbed() !== undefined) {
                let grabbed = ctlRayder.grabbed()
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

        },
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

    pacerNat.eoforces = {

      force_gravity,

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
  exports.eonZ401fSimSpheres = anitem
}))