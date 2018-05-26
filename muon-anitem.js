/***********
 *    @muonAnitem
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonAnitem = global.muonAnitem || {})))
}(this, function (exports) {
  'use strict'

  // md: # md:{filename}
  // md: **manage anitem definition**
  // md: ## functions
  // md: * [node](#node) - get sim node from anitem payload
  // md:   @anitem
  // md: * [setAnitem](#setAnitem) - rebuild the anitem root components
  // md:   @anitem
  // md: * nodeProformedSitus -
  // md: * nodeSitus -
  // md: * parentCoords -
  // md: * parentSitus -
  // md: * coreGeoform -
  // md: * coreGeonode -
  // md:
  // md:
  // md: ## methods
  // md: * halo -
  // md: * geofold -
  // md: * payload -
  // md: * nodeProformedSitus -
  // md: * nodeSitus -
  // md: * coreGeoform -
  // md: * coreGeonode -
  // md: * anigram -
  // md: * parentCoords -
  // md: * parentSitus -
  // md: * node -
  // md: * conform -
  // md: * conform$2 -
  // md: * form -
  // md: * form$2 -
  // md: * ereform -
  // md: * proform -
  // md: * ric -
  // md: * tim -
  // md: * boform -
  // md: * avatars -
  // md: * parentuid -
  // md: * uid -
  // md: * dims -
  // md: * anilocation -
  // md: * x -
  // md: * y -
  // md: * z -
  // md: * iscoord -
  // md: * isnat -
  // md: * basicclone -
  // md:
  // md:
  // md: # license
  // md: MIT

  let muonAnitem = function muonAnitem (__mapper = {}) {
    let f = __mapper('props')(),
      mgeonode = __mapper('xs').m('geonode')

    let state = {}
    state.anitem = {}

    // ............................. setAnitem
    let setAnitem = function (d = {}) {
      let a = state.anitem = {}

      let c = {

        halo: d.halo, // halo

        geofold: d.geofold, // geofold

        payload: d.payload, // payload

        avatars: d.avatars // avatars

      }

      a = Object.assign(a, c)
      return a
    }

    // ............................. node
    let node = function () {
      if (state.anitem.payload === undefined) state.anitem.payload = {}

      let node = {
        x: state.anitem.payload.x,
        y: state.anitem.payload.y,
        z: state.anitem.payload.z,
        _x: state.anitem.payload._x, // past
        _y: state.anitem.payload._y, // past
        _z: state.anitem.payload._z, // past
        vx: state.anitem.payload.vx,
        vy: state.anitem.payload.vy,
        vz: state.anitem.payload.vz,
        fx: state.anitem.payload.fx,
        fy: state.anitem.payload.fy,
        fz: state.anitem.payload.fz,
        dx: state.anitem.payload.dx,
        dy: state.anitem.payload.dy,
        dz: state.anitem.payload.dz
      }

      return node
    }

    // ............................. nodeProformedSitus
    let nodeProformedSitus = function (ani) {
      let r = [0, 0, 0]
      if (ani.geofold &&
            ani.geofold.properties.geonode &&
              ani.geofold.properties.geonode.properties.nodeProformed !== undefined) {
        r = ani.geofold.properties.geonode.properties.nodeProformed.geometry.coordinates
      }

      return r
    }

    // ............................. nodeSitus
    let nodeSitus = function (ani) {
      if (2 && 2 && !ani)console.log(` * error: manitem.nodeSitus:ani: ${ani}`)
      let r = [0, 0, 0]
      if (ani.geofold &&
            ani.geofold.properties.geonode) {
        r = ani.geofold.properties.geonode.geometry.coordinates
      }

      return r
    }

    // ............................. parentCoords
    let parentCoords = function (payload, coords = []) {
      // if whole anitem has been passed, focus on payload
      if (payload && payload.payload !== undefined) payload = payload.payload

      let parentGeometry
      let parentuid = payload.parentuid
      let parent = __mapper('xs').m('store').findAnigramFromUid(parentuid)

      if (parent !== undefined) {
        // let geoj = parent.payload.ent
        let geoj = parent.geofold
        coords = __mapper('xs').m('geoj').getCoords(geoj)
      }

      return coords
    }

    // ............................. parentSitus
    let parentSitus = function (payload, coords = []) {
      // if whole anitem has been passed, focus on payload
      if (payload && payload.payload !== undefined) payload = payload.payload

      let parentGeometry
      let parentuid = payload.parentuid
      let parent = __mapper('xs').m('store').findAnigramFromUid(parentuid)

      if (parent !== undefined) {
        parent.payload.geonode = mgeonode.init(parent.payload.geonode)
        coords = parent.payload.geonode.geometry.coordinates
      }

      return coords
    }

    // ............................. coreGeoform
    let coreGeoform = () => p => ({ // geofold
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [0, 0, 0]},
      properties: {}
    })

    // ............................. coreGeonode
    let coreGeonode = () => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: null },
      properties: {orgen: null, velin: null, velang: null, prevous: null, geodelta: null}
    })

    // ............................. enty
    let enty = function (anima, t) {
      let anigram = {}
      if (anima !== undefined) {
        if (t !== undefined) {
          anigram = __mapper('xs').m('snap')(anima, t)
        } else if (anima.payload.tim && anima.payload.tim.unitTime !== undefined) {
          let t = anima.payload.tim.unitTime
          anigram = __mapper('xs').m('snap')(anima, t)
        }
        if (anigram.payload === undefined) anigram.payload = {}

        anigram.geofold = f.v((anigram.geofold), anigram)	// geofold
        anigram.payload.conform = f.v(anigram.payload.conform, anigram)		// conform
        anigram.payload.proform = f.v(anigram.payload.proform, anigram)		// proform

        setAnitem(anigram)
      }
      return enty
    }

    enty.halo = (_) => { return _ !== undefined ? (state.anitem.halo = _, state.anitem) : state.anitem.halo }
    enty.geofold = (_) => { return _ !== undefined ? (state.anitem.geofold = _, state.anitem) : state.anitem.geofold }
    enty.payload = (_) => { return _ !== undefined ? (state.anitem.payload = _, state.anitem) : state.anitem.payload }

    enty.nodeProformedSitus = nodeProformedSitus
    enty.nodeSitus = nodeSitus

    enty.coreGeoform = coreGeoform			// default halo geofold
    enty.coreGeonode = coreGeonode			// default halo geonode

    enty.anigram = (ani, t) => {		// anigam
      if (ani !== undefined) { // if give anima
        if (t !== undefined) { // if given time
          ani = __mapper('xs').m('snap')(ani, t) // anima snap  to anigram
        }
        setAnitem(ani) // build anitem
      }
      return state.anitem // give anitem back
    }

    enty.parentCoords = parentCoords
    enty.parentSitus = parentSitus
    enty.node = node // anitem => node

    enty.conform = _ => { return _ !== undefined ? (state.anitem.payload.conform = _, state.anitem) : state.anitem.payload.conform }
    enty.conform$2 = _ => { return _ !== undefined ? (state.anitem.payload.conform = _, state.anitem) : (delete state.anitem.payload.conform.z, state.anitem.payload.conform) }

    enty.form = (_) => { return _ !== undefined ? (state.anitem.payload.form = _, state.anitem) : state.anitem.payload.form }
    enty.form$2 = (_) => { return _ !== undefined ? (state.anitem.payload.form = _, state.anitem) : (delete state.anitem.payload.form.z, state.anitem.payload.form) }

    enty.ereform = (_) => { return _ !== undefined ? (state.anitem.payload.ereform = _, state.anitem) : state.anitem.payload.ereform }

    enty.proform = (_) => { return _ !== undefined ? (state.anitem.payload.proform = _, state.anitem) : state.anitem.payload.proform }

    enty.ric = (_) => { return _ !== undefined ? (state.anitem.payload.ric = _, state.anitem) : state.anitem.payload.ric }
    enty.tim = (_) => { return _ !== undefined ? (state.anitem.payload.tim = _, state.anitem) : state.anitem.payload.tim }
    enty.boform = (_) => { return _ !== undefined ? (state.anitem.payload.boform = _, state.anitem) : state.anitem.payload.boform }

    enty.avatars = (_) => { return _ !== undefined ? (state.anitem.avatars = _, state.anitem) : state.anitem.avatars }
    enty.parentuid = (_) => { return _ !== undefined ? (state.anitem.payload.parentuid = _, state.anitem) : state.anitem.payload.parentuid }
    enty.uid = (_) => { return _ !== undefined ? (state.anitem.payload.uid = _, state.anitem) : state.anitem.payload.uid }

    enty.dims = () => ['x', 'y', 'z']
    enty.anilocation = a => [ a.x, a.y, a.z ]
    enty.x = a => a.x
    enty.y = a => a.y
    enty.z = a => a.z

    enty.iscoord = _ => _.x !== undefined || _.y !== undefined || _.z !== undefined
    enty.isnat = _ => _.m1 !== undefined && _.n1 !== undefined && _.a !== undefined
    enty.basicclone = anigram => {
      let clone = {}
      clone.payload = {}
      clone.payload.tim = anigram.payload.tim
      clone.payload.ric = {}
      clone.payload.ric.gid = anigram.payload.ric.gid
      clone.payload.ric.cid = anigram.payload.ric.cid
      clone.payload.ric.fid = anigram.payload.ric.fid
      return clone
    }

    return enty
  }

  exports.muonAnitem = muonAnitem
}))
