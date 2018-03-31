/***********
 *    @muonAnitem
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonAnitem = global.muonAnitem || {})))
}(this, function (exports) {
  'use strict'

  let muonAnitem = function muonAnitem (__mapper = {}) {
    let f = __mapper('props')(),
      mgeonode = __mapper('xs').m('geonode')

    /***************************************
 *        @anitem
 *
 */
    let anitem = {}

    let setAnitem = function (d = {}) {
      let a = anitem = {}

      let c = {

        halo: d.halo, // type

        geofold: d.geofold, // geometry

        payload: d.payload // properties

      }

      a = Object.assign(a, c)
      return a
    }
    /***************************************
 *        node
 *
 */
    let node = function () {
      if (anitem.payload === undefined) anitem.payload = {}

      let node = {
        x: anitem.payload.x,
        y: anitem.payload.y,
        z: anitem.payload.z,
        _x: anitem.payload._x, // past
        _y: anitem.payload._y, // past
        _z: anitem.payload._z, // past
        vx: anitem.payload.vx,
        vy: anitem.payload.vy,
        vz: anitem.payload.vz,
        fx: anitem.payload.fx,
        fy: anitem.payload.fy,
        fz: anitem.payload.fz,
        dx: anitem.payload.dx,
        dy: anitem.payload.dy,
        dz: anitem.payload.dz
      }

      return node
    }
    
    let nodeProformedSitus = function (ani) {
      let r = [0,0,0]
      if (ani.geofold &&
            ani.geofold.properties.geonode &&
              ani.geofold.properties.geonode.properties.nodeProformed !== undefined) {
        r = ani.geofold.properties.geonode.properties.nodeProformed.geometry.coordinates
      }
      
      if (0 && 1) console.log("nodeProformedSitus", r)
      return r
    }
    
    let nodeSitus = function (ani) {
      if (2 && 2 && !ani)console.log(` * error: manitem.nodeSitus:ani: ${ani}`)
      let r = [0,0,0]
      if (ani.geofold && 
            ani.geofold.properties.geonode ) {
        r = ani.geofold.properties.geonode.geometry.coordinates
      }
      
      if (0 && 1) console.log("nodeProformedSitus", r)
      return r
    }
    
   
    /* **********
  *   @parentCoords - get paranet coords from avatar payload
  *       
  */
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

    /* **********
  *   @parentSitus - get paranet situs from avatar payload
  */
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

    /***********
  *   @coreGeoform
  */
    let coreGeoform = () => p => ({ // geofold
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [0,0,0]},
      properties: {}
    })

    /***********
  *   @coreGeonode
  */
    let coreGeonode = () => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: null },
      properties: {orgen: null, velin: null, velang: null, prevous: null, geodelta: null}
    })

    /***********
  *   @enty
  */
    let enty = function (anima, t) {
      
if (0 && 1) console.log("anima", anima)      
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

    enty.halo = (_) => { return _ !== undefined ? (anitem.halo = _, anitem) : anitem.halo }
    enty.geofold = (_) => { return _ !== undefined ? (anitem.geofold = _, anitem) : anitem.geofold }
    enty.payload = (_) => { return _ !== undefined ? (anitem.payload = _, anitem) : anitem.payload }

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
      return anitem // give anitem back
    }

    enty.parentCoords = parentCoords
    enty.parentSitus = parentSitus
    enty.node = node // anitem => node

    enty.conform = _ => { return _ !== undefined ? (anitem.payload.conform = _, anitem) : anitem.payload.conform }
    enty.conform$2 = _ => { return _ !== undefined ? (anitem.payload.conform = _, anitem) : (delete anitem.payload.conform.z, anitem.payload.conform) }

    enty.form = (_) => { return _ !== undefined ? (anitem.payload.form = _, anitem) : anitem.payload.form }
    enty.form$2 = (_) => { return _ !== undefined ? (anitem.payload.form = _, anitem) : (delete anitem.payload.form.z, anitem.payload.form) }

    enty.ereform = (_) => { return _ !== undefined ? (anitem.payload.ereform = _, anitem) : anitem.payload.ereform }

    enty.proform = (_) => { return _ !== undefined ? (anitem.payload.proform = _, anitem) : anitem.payload.proform }

    enty.ric = (_) => { return _ !== undefined ? (anitem.payload.ric = _, anitem) : anitem.payload.ric }
    enty.tim = (_) => { return _ !== undefined ? (anitem.payload.tim = _, anitem) : anitem.payload.tim }
    enty.boform = (_) => { return _ !== undefined ? (anitem.payload.boform = _, anitem) : anitem.payload.boform }

    enty.avatars = (_) => { return _ !== undefined ? (anitem.payload.avatars = _, anitem) : anitem.payload.avatars }
    enty.parentuid = (_) => { return _ !== undefined ? (anitem.payload.parentuid = _, anitem) : anitem.payload.parentuid }
    enty.uid = (_) => { return _ !== undefined ? (anitem.payload.uid = _, anitem) : anitem.payload.uid }

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
