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

  // .................. anitem
  async function anitem (__eo) {
    // .................. eons
    let [
      d3Force3d,
      eonCtlRayder,
      eonCtlWen,
      eonEohalMars,
      eonEohalPacer,
      eonMuonEoforces,
      eonMuonEoric,
      eonMuonGraticule,
      eonMuonNatform,
      eonMuonSim, // eslint-disable-line no-unused-vars
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('d3-force-3d'),
      __eo('xs').b('eon-ctl-rayder'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-pacer'),
      __eo('xs').b('eon-muon-eoforces'),
      __eo('xs').b('eon-muon-eoric'),
      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-sim'),
      __eo('xs').b('eon-render-svg'),
    ])
    let d3_force = d3Force3d
    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    let ctl
    try { ctl = eonCtlWen().control(eonRenderSvg.svg()) } catch (e) { ctl = () => [0, 0, 0] }
    let eonMuonStore = __eo('eonMuonStore')
    // .................. animas
    let z = function () {
      // .................. pics

      let sin = Math.sin, cos = Math.cos

      let eotim = {'td': 10000, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      // ....................... pacerNat
      let pacerNat = {

        eohal: eonEohalPacer,
        eotim: eotim,
        eoric: { gid: 'natpace', cid: 'natpace', fid: 'natpace' },
        eoload: {

          pacer: {

            pacedby: {
              initN: 24, eventN: 0, autoN: 0, autoP: 0.01, autoT: 0.1,
              outtimed: 0, maxN: 60,
              geospan: 0,
              pacedAnisort: 'anima',
              basePaceOnAniView: 'viewform', // undefined, base on resulting geofold
              addItemToPacer: 0, // geometries will not be accumulated

            },

            anima: {
              eotim: eotim,
              eohal: eonEohalMars,

              eoric: function (ani, props) {
                // let eoric = ani.eoric
                let eoric = { gid: 'g', cid: 'c', fid: 'paced' }

                if (props !== undefined) {
                  if (props.key === 'init') { // INIT
                    let q = eonMuonStore.animasInClassHowMany(eoric)
                    let nextq = q++ // store updated between items
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
                }

                return eoric
              },

              eofold: function (ani, props) {
                return a => eonMuonNatform.natMultiLineString({eoform: a.eoload.eoform})
              },

              eonode: function (ani, props) {
                // eoric repeated in pacedItem eonode from pacedItem eoric

                let stace = [0, 0, 0]
                if (props.key === 'init') { // INIT
                  let autocount = props.counter

                  let ridx = eonMuonGraticule.ridx(4, 6, 1, 1)

                  let k = [40, 40]
                  let d = [-140, -40]
                  stace = [d[0] + k[0] * ridx(autocount)[0],
                    d[1] + k[1] * ridx(autocount)[1],
                    0]
                } else if (props.key === 'auto') { // AUTO
                  let eoric = { gid: 'g', cid: 'c', fid: 'paced' }

                  let ridx = eonMuonGraticule.ridx(4, 6, 1, 1)

                  let q = eonMuonStore.animasInClassHowMany(eoric)

                  let k = [40, 40]
                  let d = [-140, -40]
                  stace = [d[0] + k[0] * ridx(q)[0],
                    d[1] + k[1] * ridx(q)[1],
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
                  geometry: { type: 'Point', coordinates: coordinates },
                  properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
                }
                return res
              },

              eomot: {
                proform: {
                  projection: 'uniwen',
                  translate: [ 0, 0, 0], // mot
                  scale: 1,
                  rotate: [ [[[0, 360]]], [[[0, 360]]], [[[0, 360]]] ],
                  prerotate: [[[ ctl.rotation ]]],
                  lens: [0, 1, Infinity],
                  addNodeToTranslate: 1, // eonode
                },
              },

              eoload: {
                eocrom: { 'csx': 0, 'cf': 777, 'co': 0.1, 'cs': [[[999, 999, 999]]], 'cw': 0.5, 'cp': 1},

                eoform: {
                  x: {
                    'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
                    'ra2': 20, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[18, 18]]], 'pa6': 0, 'pb7': -1,
                    'dom3': [-180, 180],
                    c: [ 1, 1, [[[1, 1]]], [[[1, 1]]]],
                    'fn0': (e, c, d) => c[0] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * cos(e[3]) * sin(e[3]),
                  },
                  y: {
                    'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
                    'ra2': 20, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[18, 18]]], 'pa6': 0, 'pb7': -1,
                    'dom3': [-180, 180],
                    c: [ 1, 1, [[[1, 1]]], [[[1, 1]]]],
                    'fn0': (e, c, d) => c[1] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * sin(e[3]) * sin(e[3]),

                  },
                  z: {
                    'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
                    'ra2': 20, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[18, 18]]], 'pa6': 0, 'pb7': -1,
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

              },
            },
          },
        },
      }

      // ............................. forceGravity
      let forceGravity = function (params) { // force
        let nodes = params.nodes
        let properties = params.properties || {}
        let payload = params.properties.payload || {}

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

      // .................. scene
      let scene = {
        pacerNat, // h.pacer
      }

      return scene
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ401fSimSpheres = anitem
}))
