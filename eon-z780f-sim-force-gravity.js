/* ******************************************
   *    @eonZ780fSimForceGravity
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ780fSimForceGravity = global.eonZ780fSimForceGravity || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3Force3d,
    ctlRayder,
    eohalCore,
    eohalNatform,
    eohalMars,

    muonEoric,
    muonEoforces,
    muonNatform,
    muonProps,
    renderPortview,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3-force-3d'),
    __eo('xs').c('rayder'),
    __eo('xs').e('core'),
    __eo('xs').e('natform'),
    __eo('xs').e('mars'),

    __eo('xs').m('eoric'),
    __eo('xs').m('eoforces'),
    __eo('xs').m('natform'),
    __eo('xs').m('props'),
    __eo('xs').r('portview'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
  let muonStore = __eo('muonStore')
  let d3_force = d3Force3d

  // .................. animas
  let z = function () {
    // .................... pics
    let eotim = {'td': 12800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // .................... natAni
    let natAni = {

      eohal: eohalMars,
      eoric: {gid: 'ani', cid: 'ani', fid: 'ani2'},
      eotim: eotim,

      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoload.eoform}),

      eonode: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0, 0],
        },
        properties: {orgen: [0, 0, 0], velin: [0, 0, 0], velang: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0], hyperdelta: [0, 0, 0]},
      },

      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ 0, -100, 0],
          scale: 1,
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity],
          addNodeToTranslate: 1, // eonode
        },
      },

      eoload: {
        eocrom: { 'csx': 0, 'cf': 888, 'co': 0.5, 'cs': 666, 'cw': 0.9, 'cp': 0.8 },

        eoform: {
          'x': {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
            'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 12, 'w4': 90, 'pa6': 0, 'pb7': 360,
          },
          'y': {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
            'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 12, 'w4': 90, 'pa6': 0, 'pb7': 360,
          },
          'z': {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
            'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 12, 'w4': 90, 'pa6': 0, 'pb7': 360,
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
      let field = {
        key: key || type,
        force: ffforce,
      }

      return field // return force
    }

    let force_gravity = { // aniForce:{properties, field}
      properties: {
        gravity: -0.075,
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
          filter: d => true,
          id: d => d.eoric.uid,
          key: key,
        }

        params.properties = properties
        return forceGravity(params)
      },
    }

    // .................... fieldAni
    let fieldAni = {

      eohal: eohalCore,
      eotim: eotim,
      eoric: {gid: 'core', cid: 'core', fid: 'core'},

      eofold: null,
      eoload: {},

    }

    fieldAni.eoforces = {
      force_gravity,
    }

    // .................. scene
    let scene = {

      natAni, // h.mars
      fieldAni, // h.core

    }

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ780fSimForceGravity = anitem
}))