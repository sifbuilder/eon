/***********
 *    @muonAnitem
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonAnitem = global.muonAnitem || {})))
}(this, function (exports) {
  'use strict'

  async function muonAnitem (__mapper = {}) {
    let [
      mgeonode,
      mgeoj,
      msnap,
    ] = await Promise.all([
      __mapper('xs').m('geonode'),
      __mapper('xs').m('geoj'),
      __mapper('xs').m('snap'),
    ])

    let state = {}
    state.anitem = {}

    const functor = (d, ...p) => (typeof d === 'function') ? d(...p) : d

    // ............................. setAnitem
    let setAnitem = function (d = {}) {
      let a = state.anitem = {}

      let c = {

        halo: d.halo, // halo

        geofold: d.geofold, // geofold

        payload: d.payload, // payload

        avatars: d.avatars, // avatars

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
        dz: state.anitem.payload.dz,
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
      let parent = __mapper('xs').m('store').findAnigramFromUid(parentuid) // mstack

      if (parent !== undefined) {
        // let geoj = parent.payload.ent
        let geoj = parent.geofold
        coords = mgeoj.getCoords(geoj)
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
      properties: {},
    })

    // ............................. coreGeonode
    let coreGeonode = () => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: null },
      properties: {orgen: null, velin: null, velang: null, prevous: null, geodelta: null},
    })


    // ............................. functorize
    let functorize = function (ani, t) {
      let anigram = ani
      if (ani !== undefined) {
        if (t !== undefined) {
          anigram = msnap.snap(ani, t)
        } else if (ani.payload.tim && ani.payload.tim.unitTime !== undefined) {
          let t = ani.payload.tim.unitTime
          anigram = msnap.snap(ani, t)
        }
        if (anigram.payload === undefined) anigram.payload = {}

        anigram.geofold = functor((anigram.geofold), anigram)	// geofold
        anigram.payload.conform = functor(anigram.payload.conform, anigram)		// conform
        anigram.payload.proform = functor(anigram.payload.proform, anigram)		// proform

      }
      return anigram
    }

    let enty = () => {}
    enty.functorize = functorize


    return enty
  }

  exports.muonAnitem = muonAnitem
}))
